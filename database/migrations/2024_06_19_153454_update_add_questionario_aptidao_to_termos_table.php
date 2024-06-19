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
            $table->boolean("medicamento_pressao_cardiaco")->after('id_usuario');
            $table->boolean("outra_condicao")->after('id_usuario');       
            $table->boolean("problema_osseo_articular")->after('id_usuario');
            $table->boolean("desequilibrio_tontura")->after('id_usuario');
            $table->boolean("problema_cardiacao")->after('id_usuario');
            $table->boolean("dor_no_peito")->after('id_usuario');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('termos', function (Blueprint $table) {
            //
        });
    }
};
