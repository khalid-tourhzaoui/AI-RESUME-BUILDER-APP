<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Education extends Model
{
    use HasFactory;

    protected $table = 'educations';

    protected $fillable = [
        'document_id',
        'university_name',
        'degree',
        'major',
        'description',
        'start_date',
        'end_date',
    ];

    public function document()
    {
        return $this->belongsTo(Document::class, 'document_id');
    }
}
