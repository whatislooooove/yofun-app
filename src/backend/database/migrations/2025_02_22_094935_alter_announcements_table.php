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
        Schema::table('announcements', function (Blueprint $table) {
            $table->json('extra')->nullable();
            $table->unsignedSmallInteger('price')->nullable(false)->default(0);
            $table->string('detail_url')->nullable(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('announcements', function (Blueprint $table) {
            $table->dropColumn('extra');
            $table->dropColumn('price');
            $table->dropColumn('detail_url');
        });
    }
};
