<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Experience extends Model
{
    use HasFactory;

    protected $table = 'experiences';

    protected $fillable = [
        'document_id',
        'title',
        'company_name',
        'city',
        'country',
        'currently_working',
        'work_summary',
        'start_date',
        'end_date',
    ];

    public function document()
    {
        return $this->belongsTo(Document::class, 'document_id');
    }
}
