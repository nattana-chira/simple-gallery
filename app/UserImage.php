<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserImage extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'path', 'user_id'
    ];
}
