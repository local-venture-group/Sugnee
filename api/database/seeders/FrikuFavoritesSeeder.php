<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FrikuFavoritesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 1; $i <= 3; $i++) {
            DB::table('friku_favorites')->insert([

                [
                    'id' => $i,
                    'friku_joboffer_id' => $i,
                    'user_id' => 1,
                ],

            ]);
        }
    }
}
