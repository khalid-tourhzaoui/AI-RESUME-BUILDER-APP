<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->string('document_id')->unique();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('title', 255)->nullable();
            $table->text('summary')->nullable();
            $table->string('theme_color', 255)->default('#7c3aed');
            $table->text('thumbnail')->nullable();
            $table->integer('current_position')->default(1);
            $table->enum('status', ['archived', 'private', 'public'])->default('private');
            $table->string('author_name', 255)->nullable();
            $table->string('author_email', 255)->nullable();
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
