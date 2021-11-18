<?php

namespace Database\Seeders;

use App\Models\FrikuJoboffer;
use Illuminate\Database\Seeder;

class FrikuJoboffersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        FrikuJoboffer::factory(3)->create();
    }
}
