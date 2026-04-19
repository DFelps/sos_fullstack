<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('sos_products', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('category_id')->constrained('sos_categories')->cascadeOnDelete();
            $table->foreignId('supplier_id')->constrained('sos_suppliers')->cascadeOnDelete();
            $table->string('name');
            $table->string('sku')->unique();
            $table->integer('quantity')->default(0);
            $table->integer('min_quantity')->default(0);
            $table->decimal('cost_price', 10, 2);
            $table->decimal('sale_price', 10, 2);
            $table->date('expiration_date')->nullable();
            $table->date('entry_date');
            $table->string('location', 60);
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sos_products');
    }
};