<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Movement;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class ProductController extends BaseController
{
    public function index(): JsonResponse
    {
        return $this->success(
            Product::query()->with(['category', 'supplier'])->latest()->get()
        );
    }

    public function store(StoreProductRequest $request): JsonResponse
    {
        $product = DB::transaction(function () use ($request) {
            $product = Product::query()->create($request->validated());

            Movement::query()->create([
                'product_id' => $product->id,
                'type' => 'entry',
                'quantity' => $product->quantity,
                'reason' => 'Cadastro inicial',
                'movement_date' => $product->entry_date,
            ]);

            return $product->load(['category', 'supplier']);
        });

        return $this->success($product, 'Produto criado.', 201);
    }

    public function show(Product $product): JsonResponse
    {
        return $this->success($product->load(['category', 'supplier', 'movements']));
    }

    public function update(UpdateProductRequest $request, Product $product): JsonResponse
    {
        $product->update($request->validated());
        return $this->success($product->load(['category', 'supplier']), 'Produto atualizado.');
    }

    public function destroy(Product $product): JsonResponse
    {
        $product->delete();
        return $this->success(null, 'Produto removido.');
    }
}
