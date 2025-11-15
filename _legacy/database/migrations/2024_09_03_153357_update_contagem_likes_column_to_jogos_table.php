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
            $table->unsignedInteger('likes_time_1')->after('id_proximo_jogo')->default(0);
            $table->unsignedInteger('likes_time_2')->after('id_proximo_jogo')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('jogos', function (Blueprint $table) {
            $table->dropColumn('likes');
        });
    }
};
