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
        'img',
        'current_position',
        'status',

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
    public function hobbies()
    {
        return $this->hasMany(Hobbie::class, 'document_id');
    }
    public function languages()
    {
        return $this->hasMany(Language::class, 'document_id');
    }
    public function socialMedias()
    {
        return $this->hasMany(SocialMedia::class, 'document_id');
    }
}
