<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hobbie extends Model
{
    protected $table = 'hobbies';
    protected $fillable = ['name', 'document_id'];

    public function document()
    {
        return $this->belongsTo(Document::class,'document_id');
    }
}
