<?php

use App\Models\Regimen;
use App\Models\Volunteer;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('registration_year');
            $table->date('dob');
            $table->integer('age');
            $table->integer('drtb_code')->unique();
            $table->string('password');
            $table->string('township');
            $table->foreignIdFor(Volunteer::class);
            $table->string('patient_code');
            $table->text('address');
            $table->date('treatment_start_date');
            $table->foreignIdFor(Regimen::class);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};
