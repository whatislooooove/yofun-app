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
        Schema::create('announcements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('source_id')->nullable(false);
            $table->unsignedBigInteger('id_in_source')->nullable(false);
            $table->string('title', 128)->nullable(false);
            $table->string('description', 1024)->nullable();
            $table->string('type', 32)->nullable(false);
            $table->string('address', 128)->nullable(false);
            $table->string('img', 512)->nullable();
            $table->decimal('latitude', 11, 8);
            $table->decimal('longitude', 11, 8);
            $table->dateTime('date_start')->nullable();
            $table->boolean('is_active')->nullable(false)->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('announcements');
    }
};
