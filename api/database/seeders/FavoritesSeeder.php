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
        DB::table('favorites')->insert([
            [
                'id' => 1,
                'user_id' => 1,
                'corporation_joboffer_id' => 1,
            ],
            [
                'id' => 2,
                'user_id' => 1,
                'corporation_joboffer_id' => 2,
            ],
            [
                'id' => 3,
                'user_id' => 1,
                'corporation_joboffer_id' => 3,
            ],
            [
                'id' => 4,
                'user_id' => 2,
                'corporation_joboffer_id' => 1,
            ],
            [
                'id' => 5,
                'user_id' => 2,
                'corporation_joboffer_id' => 2,
            ],
            [
                'id' => 6,
                'user_id' => 2,
                'corporation_joboffer_id' => 3,
            ],
            [
                'id' => 7,
                'user_id' => 3,
                'corporation_joboffer_id' => 1,
            ],
        ]);
    }
}
