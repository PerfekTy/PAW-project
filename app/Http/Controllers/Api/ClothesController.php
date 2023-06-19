<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreClothesRequest;
use App\Models\Cloth;
use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ClothesController extends Controller
{
    public function addPhoto(Request $request)
    {
        $files = $request->file('files');
        foreach ($files as $file) {
            $path = $file->store('public');
            $fileName = basename($path);
            $uploadedFile = new Photo;
            $uploadedFile->filename = $file->getClientOriginalName();
            $uploadedFile->path = $fileName;
            $uploadedFile->save();
        }
    }

    public function store(StoreClothesRequest $request)
    {
        $data = $request->validated();
        $userID = $request->input('nickname');

        $cloth = Cloth::create([
            'name' => $data['name'],
            'brand' => $data['brand'],
            'price' => $data['price'],
            'gender' => $data['gender'],
            'size' => $data['size'],
            'description' => $data['description'],
            'user_nickname' => $userID,
        ]);

        return response(['cloth' => $cloth]);
    }
    public function getClothes()
    {
        $currentUser = auth()->user();
        $cards = Cloth::where('user_nickname', $currentUser->nickname)->get();
        return $cards;
    }

    public function getPhotos()
    {
        $photos = Photo::all();

        foreach ($photos as $photo) {
            $photo->url = Storage::url($photo->path);
        }

        return $photos;
    }

    public function getAllClothes()
    {
        $clothes = Cloth::all();
        return $clothes;
    }
}