<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class FrikuCompaniesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('friku_companies')->insert([
        [

            'username_kana' => 'ユキムラ　セイイチ',
            'first_name_kana' => 'セイイチ',
            'last_name_kana' => 'ユキムラ',
            'company_phone' => '0120-223-332',
            'site_url'=> 'https://www.google.com/',
            'is_registered' => true,
            'temp_id' => Str::uuid(),
            'user_id' => 1,
            'plan' => 1
        ],
        [
            'username_kana' => 'サナダ　ゲンイチロウ',
            'first_name_kana' => 'ゲンイチロウ',
            'last_name_kana' => 'サナダ',
            'company_phone' => '0120-222-333',
            'site_url'=> 'https://www.google.com/',
            'is_registered' => true,
            'temp_id' => Str::uuid(),
            'user_id' => 2,
            'plan' => 1
        ],
        [
            'username_kana' => 'ヤナギ　レンジ',
            'first_name_kana' => 'レンジ',
            'last_name_kana' => 'ヤナギ',
            'company_phone' => '0120-344-221',
            'site_url'=> 'https://www.google.com/',
            'is_registered' => true,
            'temp_id' => Str::uuid(),
            'user_id' => 3,
            'plan' => 1
        ],

        ]);
    }
}
