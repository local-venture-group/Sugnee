<?php

namespace Tests\Feature;


use App\Models\FrikuCompany;
use App\Models\FrikuJoboffer;
use App\Models\Staff;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Tests\TestCase;

class FrikuJobsTest extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();
        $this->artisan('migrate:refresh');
        $companyData = [
            'username_kana' => 'あああ',
            'first_name_kana' => 'テスト',
            'last_name_kana' => '・テスト',
            'company_phone' => '0120-223-332',
            'site_url' => 'https://www.google.com/',
            'is_registered' => true,
            'temp_id' => Str::uuid(),
            'user_id' => 1,
            'plan' => 1
        ];
        $staffData =  [
            'username' => '担当者 浩二',
            'first_name' => '浩二',
            'last_login' => null,
            'last_name' => '担当者',
            'is_superuser' => false,
            'is_staff' => true,
            'is_active' => true,
            'date_joined' => now(),
            'email' => 'staff1@example.com',
            'password' => Hash::make('password'),
            'created_at' => now(),
            'updated_at' => now()
        ];
        $this->staff = Staff::create($staffData);
        $this->frikuCompany =  FrikuCompany::create($companyData);
        $this->frikuJoboffer =  FrikuJoboffer::factory()->count(5)->create(['company_id' => $this->frikuCompany->id]);
    }
    /**
     * A basic feature test example.
     *
     * @return void
     */
    // public function testExample()
    // {
    //     $response = $this->get('/');

    //     $response->assertStatus(200);
    // }
    public function test_getFrikuJobs()
    {
        $response = $this->getJson(route('friku.company.joboffers', ['frikuCompany' => $this->frikuCompany->id]));
        $response->assertStatus(200)
            ->assertJsonCount(5)
            ->assertJsonFragment([
                'company_id' => $this->frikuCompany->id,
            ]);


    }
}
