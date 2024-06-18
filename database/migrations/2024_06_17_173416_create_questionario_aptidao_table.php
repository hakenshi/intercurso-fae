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
        Schema::create('questionario_aptidao', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_termos')->constrained('termos', "id");
            $table->uuid('assinatura');
            $table->boolean("problema_cardiacao");
            $table->boolean("dor_no_peito");
            $table->boolean("desequilibrio_tontura");
            $table->boolean("problema_osseo_articular");
            $table->boolean("medicamento_pressao_cardiaco");
            $table->boolean("outra_condicao");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questionario_aptidao');
    }
};
