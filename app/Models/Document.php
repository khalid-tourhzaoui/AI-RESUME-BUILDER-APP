<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Document extends Model
{
    use HasFactory;

    protected $table = 'documents';

    protected $fillable = [
        'document_id',
        'user_id',
        'title',
        'summary',
        'theme_color',
        'thumbnail',
        'current_position',
        'status',
        'author_name',
        'author_email',
    ];

    public function education()
    {
        return $this->hasMany(education::class, 'document_id');
    }

    public function experience()
    {
        return $this->hasMany(Experience::class, 'document_id');
    }

    public function personalInfo()
    {
        return $this->hasOne(PersonalInfo::class, 'document_id');
    }

    public function skills()
    {
        return $this->hasMany(Skill::class, 'document_id');
    }
}
