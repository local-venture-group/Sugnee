<?php

namespace Database\Seeders;

use App\Models\CorporationCompanyschedule;
use Illuminate\Database\Seeder;

class CorporationCompanyschedulesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        CorporationCompanyschedule::factory()->count(3)
            ->create();
    }
}
