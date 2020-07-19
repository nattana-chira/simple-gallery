<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\User;
use Carbon\Carbon;

class TestUserSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::transaction(function () {
            User::updateOrCreate(
                [
                    'email' => 'test@gmail.com'
                ],
                [
                    'name' => 'John',
                    'email_verified_at' => Carbon::now(),
                    'password' => bcrypt(1234)
                ]);
        });
    }
}
