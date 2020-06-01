<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSimulationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('simulation', function (Blueprint $table) {
            $table->bigIncrements('simulation_id');
            $table->unsignedBigInteger('user_id');
            $table->longText('inputs');
            $table->longText('simDescription')->nullable();
            $table->mediumText('image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('simulation');
    }
}
