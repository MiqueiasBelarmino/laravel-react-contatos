<?php

namespace App\Http\Controllers;

use App\Services\ViaCepService;
use Illuminate\Http\Request;

class ViaCepController extends Controller
{
    protected $viaCepService;

    public function __construct(ViaCepService $viaCepService)
    {
        $this->viaCepService = $viaCepService;
    }

    public function getAddress(Request $request)
    {
        $zipCode = $request->input('zip_code');

        try {
            $address = $this->viaCepService->getAddressByZipCode($zipCode);
            return response()->json($address);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
