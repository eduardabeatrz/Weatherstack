<?php


namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Weather extends Model {
    
    use HasFactory;

    protected $fillable = [
        'city',
        'data',
    ];

    # Para garantir que o campo de data vai ser um array pra acessarmos depois.
    protected $casts = [
        'data' => 'array',
    ];

}
