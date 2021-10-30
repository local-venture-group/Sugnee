<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DropColumnIsPickupColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('ats')->table('corporation_joboffer', function (Blueprint $table) {
                $table->dropColumn('is_pickup');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('ats')->table('corporation_joboffer', function (Blueprint $table) {
            $table->boolean('is_pickup');
        });
    }
}
