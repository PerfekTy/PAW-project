<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Card extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getUserIDAttribute()
    {
        return auth()->id();
    }

    public $table = "users_cards";
    protected $primaryKey = 'id';
    protected $casts = [
        'user_id' => 'integer',
    ];
    protected $fillable = [
        'fullname',
        'cardnumber',
        'expiration',
        'securecode',
        'user_id',
    ];

    public $timestamps = false;
}