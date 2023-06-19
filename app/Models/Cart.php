<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Cart extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    public function clothes()
    {
        return $this->hasMany(Cloth::class);
    }

    public $table = "cart";
    protected $primaryKey = 'id';
    protected $fillable = [
        'id',
        'name',
        'brand',
        'price',
        'size',
        'user_nickname',
    ];

    public $timestamps = false;
}