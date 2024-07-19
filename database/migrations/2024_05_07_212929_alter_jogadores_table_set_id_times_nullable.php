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
        Schema::table('jogadores', function (Blueprint $table) {
            $table->unsignedBigInteger('id_time')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('jogadores', function (Blueprint $table) {
            $table->unsignedBigInteger('foreign_key_column')->nullable(false)->change();
        });
    }
};
