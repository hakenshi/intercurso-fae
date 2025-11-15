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
        Schema::table('placares', function (Blueprint $table) {
            $table->foreignId('id_jogo')->nullable()->after('id')->constrained('jogos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('placares', function (Blueprint $table) {
            $table->dropConstrainedForeignId('id_jogo');
        });
    }
};
