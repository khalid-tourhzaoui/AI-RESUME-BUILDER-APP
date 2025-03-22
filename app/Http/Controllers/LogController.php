<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class LogController extends Controller
{
    public function index(Request $request)
    {
        $logDirectory = storage_path('logs');
        $logFiles = File::files($logDirectory);

        $allLogs = [];

        foreach ($logFiles as $logFile) {
            // Exclure le fichier laravel.log
            if ($logFile->getFilename() === 'laravel.log') {
                continue;
            }

            $contents = File::get($logFile->getPathname());
            $logs = $this->parseLogs($contents);

            $allLogs[$logFile->getFilename()] = $logs;
        }

        return response()->json([
            'app_name' => config('app.name'),
            'logs' => $allLogs
        ], 200);
    }

    private function parseLogs($contents)
    {
        // Modèle qui correspond au format de log Laravel
        $pattern = '/\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\] (\w+)\.(\w+): (.*?)(?=\[\d{4}-\d{2}-\d{2} \d{2}|\Z)/s';
        preg_match_all($pattern, $contents, $matches, PREG_SET_ORDER);

        $logs = [];
        foreach ($matches as $match) {
            // Essayer d'extraire une pile d'appels si présente
            $message = $match[4];
            $stack = null;

            // Vérifier si nous avons une pile d'appels
            if (preg_match('/(.+?)(\[Stack trace:.+?)/s', $message, $stackMatch)) {
                $message = trim($stackMatch[1]);
                $stack = trim($stackMatch[2]);
            }

            $logs[] = [
                'timestamp' => $match[1],
                'level' => $match[2],
                'channel' => $match[3],
                'message' => trim($message),
                'stack' => $stack
            ];
        }

        return $logs;
    }
}
