<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CardResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'fullname' => $this -> nickname,
            'cardnumber' => $this -> cardnumber,
            'expiration' => $this -> expiration,
            'securecode' => $this -> securecode,
        ];
    }
}