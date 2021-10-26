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

    public function testGetLimit10()
    {
        $response = $this->getJson(route('pages.top'));
        $response->assertStatus(200);
        $this->assertSame(10, count($response['pickUpJobs']));

    }
    public function testGetShowPickUpJobs()
    {
        $pickUpJob = CorporationJoboffer::where('is_pickup', true)->first();
        $response = $this->getJson(route('pickup.show', ['corporationJoboffer' => $pickUpJob->id ]));
        $response
            ->assertStatus(200)
            ->assertJsonFragment(['is_pickup' => true]);
            $this->assertSame($pickUpJob->id, $response['id']);

    }

}
