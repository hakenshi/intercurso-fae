<?php

use App\Models\Placar;
use App\Models\Time;
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
        Schema::create('jogos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_placar')->nullable()->constrained('placares')->onDelete('cascade');
            $table->foreignId('id_time_1')->nullable()->constrained('times')->onDelete('cascade');
            $table->foreignId('id_time_2')->nullable()->constrained('times')->onDelete('cascade');
            $table->dateTime('data_jogo');
            $table->string('local');
            $table->boolean('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jogos');
    }
};
