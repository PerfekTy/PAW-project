<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCourierRequest;
use App\Models\Courier;

class DeliveryController extends Controller
{
    public function storeCourier(StoreCourierRequest $request)
    {
        $data = $request->validated();
        $userID = $request->input('nickname');

        $courier = Courier::create([
            'address' => $data['address'],
            'city' => $data['city'],
            'postal' => $data['postal'],
            'country' => $data['country'],
            'user_nickname' => $userID,
        ]);

        return response(['courier' => $courier]);
    }

    public function getCourier()
    {
        $currentUser = auth()->user();
        $courier = Courier::where('user_nickname', $currentUser->nickname)->get();
        return $courier;
    }

}