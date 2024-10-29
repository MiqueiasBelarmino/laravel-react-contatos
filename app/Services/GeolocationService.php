<?php
namespace App\Services;

use Illuminate\Support\Facades\Http;

class GeolocationService
{
    protected $apiKey;

    public function __construct()
    {
        $this->apiKey = env('VITE_GOOGLE_MAPS_API_KEY');
    }

    public function getCoordinates($address)
    {
        $response = Http::get('https://maps.googleapis.com/maps/api/geocode/json', [
            'address' => $address,
            'key' => $this->apiKey
        ]);

        if ($response->successful()) {
            $data = $response->json();

            if ($data['status'] === 'OK') {
                $location = $data['results'][0]['geometry']['location'];
                return [
                    'latitude' => $location['lat'],
                    'longitude' => $location['lng']
                ];
            }
        }

        return null;
    }
}
