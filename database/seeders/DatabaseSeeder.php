<?php

namespace Database\Seeders;

use App\Models\Contact;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Contact::truncate();
        User::truncate();

        $user = User::factory()->create([
            'name' => 'Miqueias Belarmino',
            'email' => 'miqueias@example.com',
            'password' => bcrypt('miqueias')
        ]);

        Contact::factory(10)->create([
            'owner_id' => $user->id
        ]);
    }
}
