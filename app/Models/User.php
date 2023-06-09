<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    public function cards()
    {
        return $this->hasMany(Card::class);
    }

    public function clothes()
    {
        return $this->hasMany(Cloth::class);
    }

    public function cartItems()
    {
        return $this->hasMany(Cart::class);
    }

    public $table = "users";
    protected $primaryKey = 'id';
    protected $fillable = [
        'nickname',
        'fullname',
        'email',
        'gender',
        'password',
    ];

    public $timestamps = false;
}