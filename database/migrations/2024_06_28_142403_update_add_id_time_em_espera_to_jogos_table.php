<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('jogos', function (Blueprint $table) {
            $table->json('jogos_em_espera')->nullable()->after('id_time_2');
            $table->unsignedBigInteger('id_proximo_jogo')->after('id_time_2')->nullable();
            $table->foreign('id_proximo_jogo')->references('id')->on('jogos');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('jogos', function (Blueprint $table) {
            $table->dropForeign(['id_jogo_em_espera']);
            $table->dropColumn('id_jogo_em_espera');
            $table->dropColumn('jogos_em_espera');
        });
    }
};
