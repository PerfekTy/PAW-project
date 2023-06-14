<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCardRequest;
use App\Models\Card;
use Illuminate\Support\Facades\Auth;

class CardController extends Controller
{
    public function getCards()
    {
        $currentUser = auth()->user()->id;
        $cards = Card::where('user_id', $currentUser)->get();
        return $cards;
    }

    public function saveCard(StoreCardRequest $request)
    {
        $data = $request->validated();
        $userID = $request->input('user_id');

        $card = Card::create([
            'fullname' => $data['fullname'],
            'cardnumber' => $data['cardnumber'],
            'expiration' => $data['expiration'],
            'securecode' => $data['securecode'],
            'user_id' => $userID,
        ]);

        return response(['card' => $card]);
    }

    public function destroyCard()
    {
        $currentUser = auth()->user()->id;
        $cards = Card::where('user_id', $currentUser)->delete();
        return $cards;
    }
}