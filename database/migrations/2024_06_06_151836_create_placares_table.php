<?php

use App\Models\Jogo;
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
        Schema::create('placares', function (Blueprint $table) {
            $table->id();
            $table->foreignId("id_time_vencedor")->nullable()->constrained('times')->onDelete('cascade');
            $table->integer('placar_time_1')->default(0);
            $table->integer('placar_time_2')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('placares');
    }
};
