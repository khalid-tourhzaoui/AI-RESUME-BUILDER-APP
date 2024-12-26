<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SocialMedia extends Model
{
    protected $table = 'social_media';
    protected $fillable = ['name', 'url', 'document_id'];

    public function document()
    {
        return $this->belongsTo(Document::class,'document_id');
    }
}
