<?php

use App\Models\Patient;
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
        Schema::create('votpatients', function (Blueprint $table) {
            $table->id();
            $table->enum('type',['pure','hybrid']);
            $table->foreignIdFor(Volunteer::class);
            $table->foreignIdFor(Patient::class);
            $table->dateTime('start_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('votpatients');
    }
};
