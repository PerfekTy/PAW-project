<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCartRequest;
use App\Models\Cart;

class CartController extends Controller
{
    public function getItems()
    {
        $currentUser = auth()->user()->nickname;
        $items = Cart::where('user_nickname', $currentUser)->get();
        return $items;
    }

    public function saveItemsToCart(StoreCartRequest $request)
    {
        $data = $request->all();
        $userID = $request->input('nickname');

        $card = Cart::create([
            'name' => $data['name'],
            'brand' => $data['brand'],
            'price' => $data['price'],
            'size' => $data['size'],
            'user_nickname' => $userID,
        ]);

        return response(['card' => $card]);
    }

    public function deleteItemFromCart()
    {
        $currentUser = auth()->user()->nickname;
        $items = Cart::where('user_nickname', $currentUser)->delete();
        return $items;
    }
}