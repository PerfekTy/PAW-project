<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCartRequest;
use App\Http\Requests\StoreToCartRequest;
use App\Models\Cart;
use App\Models\Checkout;
use App\Models\Cloth;

class CartController extends Controller
{
    public function getItems()
    {
        $currentUser = auth()->user()->id;
        $items = Cart::where('user_id', $currentUser)->get();

        return $items;
    }

    public function saveItemsToCart(StoreToCartRequest $request, $id)
    {
        $user = auth()->user();
        $cartItem = $user->cartItems()->where('id', $id)->first();

        if ($cartItem) {
            return $cartItem;
        } else {
            $data = $request->all();
            $userID = $request->input('user_id');

            $card = Cart::create([
                'name' => $data['name'],
                'brand' => $data['brand'],
                'price' => $data['price'],
                'size' => $data['size'],
                'user_id' => $userID,
            ]);

            return response(['card' => $card]);
        }
    }

    public function storeCart(StoreCartRequest $request)
    {
        $userID = $request->input('user_id');

        $checkout = Checkout::create([
            'user_id' => $userID,
            'date' => now(),
        ]);

        return response(['checkout' => $checkout]);
    }

    public function deleteItemFromCart($id)
    {
        $cartItem = Cart::where('id', $id)->first();

        if ($cartItem) {
            $cartItem->delete();
        }
    }

    public function deleteAllItemsFromCart()
    {
        $currentUser = auth()->user()->id;
        $cart = Cart::where('user_id', $currentUser)->delete();

        return response(['cart' => $cart]);
    }
}