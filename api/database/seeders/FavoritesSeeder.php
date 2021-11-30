<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class FavoritesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for($i = 1; $i <= 3; $i++) {
            DB::table('favorites')->insert([
                'id' => $i,
                'user_id' => 1,
                'corporation_joboffer_id' => $i,
            ]);
        }

    }
}
