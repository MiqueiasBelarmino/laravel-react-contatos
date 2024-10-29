<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class ViaCepService
{
    public function getAddressByZipCode($zipCode)
    {
        $response = Http::get("https://viacep.com.br/ws/{$zipCode}/json/");

        if ($response->failed()) {
            throw new \Exception("Failed to fetch address data from ViaCEP.");
        }

        return $response->json();
    }
}
