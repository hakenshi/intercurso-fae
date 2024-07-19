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
        Schema::table('termos', function (Blueprint $table) {
            $table->boolean('dor_no_peito_ultimo_mes')->after('dor_no_peito');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('termos', function (Blueprint $table) {
            $table->dropColumn('dor_no_peito_ultimo_mes');
        });
    }
};
