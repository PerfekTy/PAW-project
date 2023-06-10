<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCardRequest;
use App\Models\Card;

class CardController extends Controller
{
    public function getCards()
    {
        $currentUser = auth()->user();
        $cards = Card::where('user_id', $currentUser->id)->get();
        return $cards;
    }

    public function saveCard(StoreCardRequest $request)
    {
        $data = $request->validated();

        $card = Card::create([
            'fullname' => $data['fullname'],
            'cardnumber' => $data['cardnumber'],
            'expiration' => $data['expiration'],
            'securecode' => $data['securecode'],

        ]);

        return response(['card' => $card]);
    }

    public function destroyCard()
    {
        $currentUser = auth()->user();
        $cards = Card::where('user_id', $currentUser->id)->delete();
        return $cards;
    }
}