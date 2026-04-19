<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Customer;
use App\Models\Movement;
use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $beverages = Category::query()->create(['name' => 'Bebidas', 'description' => 'Refrigerantes e sucos', 'color' => '#0048CA']);
        $foods = Category::query()->create(['name' => 'Alimentos', 'description' => 'Mercearia seca', 'color' => '#001EAA']);

        $supplierA = Supplier::query()->create(['trade_name' => 'Distribuidora Azul', 'contact_name' => 'Renata Lima', 'email' => 'contato@azul.com', 'phone' => '(11) 99888-1001']);
        Supplier::query()->create(['trade_name' => 'Atacado Centro', 'contact_name' => 'Carlos Souza', 'email' => 'vendas@centro.com', 'phone' => '(11) 99888-1002']);

        Customer::query()->create(['name' => 'Mercado Esperança', 'email' => 'compras@mercadoesperanca.com', 'phone' => '(11) 4002-8922']);

        $coke = Product::query()->create([
            'name' => 'Coca-Cola 2L',
            'sku' => 'BEB-0001',
            'category_id' => $beverages->id,
            'supplier_id' => $supplierA->id,
            'quantity' => 100,
            'min_quantity' => 20,
            'cost_price' => 5.50,
            'sale_price' => 8.99,
            'expiration_date' => '2026-12-20',
            'entry_date' => '2026-01-21',
            'location' => 'A1-02',
            'description' => 'Refrigerante tradicional 2L',
        ]);

        Product::query()->create([
            'name' => 'Arroz Tipo 1 5kg',
            'sku' => 'ALI-0010',
            'category_id' => $foods->id,
            'supplier_id' => $supplierA->id,
            'quantity' => 16,
            'min_quantity' => 25,
            'cost_price' => 18.20,
            'sale_price' => 24.90,
            'entry_date' => '2026-01-19',
            'location' => 'B2-01',
            'description' => 'Pacote de arroz branco',
        ]);

        Movement::query()->create([
            'product_id' => $coke->id,
            'type' => 'entry',
            'quantity' => 100,
            'reason' => 'Carga inicial',
            'movement_date' => '2026-01-21',
        ]);
    }
}
