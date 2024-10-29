<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactRequest;
use App\Http\Resources\ContactResource;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Contact::query();

        $sortField = request("sort_field", "name");
        $sortDirection = request("sort_direction", "ASC");

        if (request("filter")) {
            $filterValue = request("filter");

            $query->where(function ($q) use ($filterValue) {
                $q->where("name", "LIKE", "%{$filterValue}%")
                    ->orWhere("cpf", "LIKE", "%{$filterValue}%");
            });
            
        }

        if (request("type_to_filter") && request("type_to_filter") != "all") {
            $query->where("type", "=", request("type_to_filter"));            
        }
        
        $contacts = $query->orderBy($sortField, $sortDirection)->paginate(10);
        return inertia('Contact/Index', [
            'contacts' => ContactResource::collection($contacts),
            'filteringParams' => request()->query() ?: null
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreContactRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Contact $contact)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contact $contact)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateContactRequest $request, Contact $contact)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        //
    }
}
