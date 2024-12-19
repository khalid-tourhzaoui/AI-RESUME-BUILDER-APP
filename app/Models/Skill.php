<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Skill extends Model
{
    use HasFactory;

    protected $table = 'skills';

    protected $fillable = [
        'document_id',
        'name',
        'rating',
    ];

    public function document()
    {
        return $this->belongsTo(Document::class, 'document_id');
    }
}
