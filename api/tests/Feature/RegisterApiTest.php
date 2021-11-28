<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\Concerns\RefreshDatabaseLite;

class RegisterApiTest extends TestCase
{
    use DatabaseTransactions;
    protected $connectionsToTransact = ['fukuriku', 'ats'];
    /**
     * A basic feature test example.
     *
     * @return void
     */
    // use RefreshDatabase;
    // use RefreshDatabaseLite;
    public function setUp(): void
    {
        parent::setUp();
        // $this->artisan('migrate:refresh');
    }
    public function testExample()
    {
        $a = 2;
        $b = 2;

        $this->assertSame($a, $b);
    }

    // public function testRegisterUser()
    // {
    //     $userData = [
    //         'firstName' => 'ああああ',
    //         'lastName' => 'いいいい',
    //         'gender' => 1,
    //         'birth' => now(),
    //         'email' => 'testuser@example.com',
    //         'password' => 'password'
    //     ];

    //     //登録のURLにテストデータを渡して登録
    //     $response = $this->postJson('api/user/register', $userData);
    //     $user = User::first();

    //     //登録が成功しているかを確認
    //     $response->assertStatus(201)
    //         ->assertJson([
    //             'name' => $userData['lastName'] . ' ' . $userData['firstName'],
    //             'email' => $userData['email'],
    //             'id' => 1
    //         ]);
    //     $this->assertSame($userData['email'], $user->email);

    // }

}
