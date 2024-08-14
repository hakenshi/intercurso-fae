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

        Schema::table('placares', function (Blueprint $table) {
            $table->dropForeign(['id_jogo']);
            $table->dropColumn('id_jogo');
            $table->dropForeign(['id_time_vencedor']);
            $table->dropColumn('id_time_vencedor');
        });
        Schema::table('jogos', function (Blueprint $table) {
            $table->dropForeign(['id_placar']);
            $table->dropColumn('id_placar');
            $table->foreignId('id_time_vencedor')->nullable()->after('id_time_2')->constrained('times');
            $table->integer('placar_time_1')->default(0)->after('id');
            $table->integer('placar_time_2')->default(0)->after('placar_time_1');
        });
        Schema::dropIfExists('placares');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('jogos', function (Blueprint $table) {
            //
        });
    }
};
