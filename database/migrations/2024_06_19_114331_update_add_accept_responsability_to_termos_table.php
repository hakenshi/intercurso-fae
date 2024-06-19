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
        Schema::table('termos', function (Blueprint $table) {
            $table->boolean('accept_responsability')->default(false)->after('assinatura');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('termos', function (Blueprint $table) {
            $table->dropColumn('accept_responsability');
        });
    }
};
