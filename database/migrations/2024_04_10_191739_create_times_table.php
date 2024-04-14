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
        Schema::create('times', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("id_modalidade");
            $table->foreign("id_modalidade")->references("id")->on("modalidades");
            $table->unsignedBigInteger("id_responsavel");
            $table->foreign("id_responsavel")->references("id")->on("usuarios");
            $table->string('nome');
            $table->enum('status',[0,1]);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('times');
    }
};
