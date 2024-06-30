<?php

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
        Schema::table('jogos', function (Blueprint $table) {
            $table->unsignedBigInteger('id_time_1_em_espera')->nullable()->after('id_time_2');
            $table->foreign('id_time_1_em_espera')->references('id')->on('jogos');
            $table->unsignedBigInteger('id_time_2_em_espera')->nullable()->after('id_time_1_em_espera');
            $table->foreign('id_time_2_em_espera')->references('id')->on('jogos');
         });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('jogos', function (Blueprint $table) {
            $table->dropForeign(['id_time_1_em_espera']);
            $table->dropColumn('id_time_1_em_espera');
            $table->dropForeign(['id_time_2_em_espera']);
            $table->dropColumn('id_time_2_em_espera');
        });
    }
};
