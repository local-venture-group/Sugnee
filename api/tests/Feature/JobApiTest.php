<?php

namespace Tests\Feature;

use App\Models\CorporationJoboffer;
use App\Models\Favorite;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Job;
use App\Models\User;
use Illuminate\Support\Facades\Artisan;
use Tests\Concerns\RefreshDatabaseLite;
use Illuminate\Foundation\Testing\DatabaseTransactions;
class JobApiTest extends TestCase
{

    /**
     * A basic feature test example.
     *
     * @return void
     */
    // use RefreshDatabaseLite;
    use DatabaseTransactions;
    protected $connectionsToTransact = ['ats_testing', 'fukuriku_testing'];

    public function setUp(): void
    {
        parent::setUp();
        $this->artisan('migrate:refresh');
        CorporationJoboffer::factory()->count(30)->create(['is_pickup' => true]);
    }


}
