<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    protected $table = 'languages';
    protected $fillable = ['name','level','document_id'];

    public function document()
    {
        return $this->belongsTo(Document::class,'document_id');
    }
}
