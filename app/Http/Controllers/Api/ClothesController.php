<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreClothesRequest;
use App\Models\Cloth;
use App\Models\Photo;
use Illuminate\Http\Request;

class ClothesController extends Controller
{
    public function addPhoto(Request $request)
    {

        $files = $request->file('files');
        $clothID = $request->input('cloth_id');
        foreach ($files as $file) {
            $path = $file->store('uploads');

            $uploadedFile = new Photo;
            $uploadedFile->filename = $file->getClientOriginalName();
            $uploadedFile->path = $path;
            $uploadedFile->cloth_id = $clothID;
            $uploadedFile->save();

        }
    }

    public function store(StoreClothesRequest $request)
    {
        $data = $request->validated();
        $userID = $request->input('user_id');

        $cloth = Cloth::create([
            'name' => $data['name'],
            'brand' => $data['brand'],
            'price' => $data['price'],
            'gender' => $data['gender'],
            'size' => $data['size'],
            'description' => $data['description'],
            'user_id' => $userID,
        ]);

        return response(['cloth' => $cloth]);
    }
    public function getClothes()
    {
        $currentUser = auth()->user();
        $cards = Cloth::where('user_id', $currentUser->id)->get();
        return $cards;
    }

    public function getPhotos()
    {
        $photos = Photo::all();
        return $photos;
    }

    public function getAllClothes()
    {
        $clothes = Cloth::all();
        return $clothes;
    }
}