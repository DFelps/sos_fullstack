<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('sos_movements', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('product_id')->constrained('sos_products')->cascadeOnDelete();
            $table->string('type', 20);
            $table->integer('quantity');
            $table->string('reason', 180);
            $table->date('movement_date');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sos_movements');
    }
};