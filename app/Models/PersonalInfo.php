<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class PersonalInfo extends Model
{
    use HasFactory;
    protected $table = 'personal_infos';

    protected $fillable = [
        'document_id',
        'first_name',
        'last_name',
        'job_title',
        'address',
        'phone',
        'email',
        'img',
    ];

    public function document()
    {
        return $this->belongsTo(Document::class, 'document_id');
    }
}
