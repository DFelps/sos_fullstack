<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\StoreMovementRequest;
use App\Models\Movement;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class MovementController extends BaseController
{
    public function index(): JsonResponse
    {
        return $this->success(Movement::query()->with('product')->latest('movement_date')->get());
    }

    public function store(StoreMovementRequest $request): JsonResponse
    {
        $movement = DB::transaction(function () use ($request) {
            $data = $request->validated();
            /** @var Product $product */
            $product = Product::query()->findOrFail($data['product_id']);

            if ($data['type'] === 'entry') {
                $product->increment('quantity', $data['quantity']);
            }

            if ($data['type'] === 'exit') {
                $product->update([
                    'quantity' => max(0, $product->quantity - $data['quantity']),
                ]);
            }

            if ($data['type'] === 'adjustment') {
                $product->update([
                    'quantity' => $data['quantity'],
                ]);
            }

            return Movement::query()->create($data);
        });

        return $this->success($movement->load('product'), 'Movimentação registrada.', 201);
    }
}
