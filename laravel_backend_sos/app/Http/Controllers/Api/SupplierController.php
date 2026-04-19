<?php

namespace App\Http\Controllers\Api;

use App\Models\Supplier;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SupplierController extends BaseController
{
    public function index(): JsonResponse
    {
        return $this->success(Supplier::query()->latest()->get());
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'trade_name' => ['required', 'string', 'max:150'],
            'contact_name' => ['required', 'string', 'max:150'],
            'email' => ['nullable', 'email', 'max:150'],
            'phone' => ['nullable', 'string', 'max:40'],
        ]);

        return $this->success(Supplier::create($data), 'Fornecedor criado.', 201);
    }

    public function show(Supplier $supplier): JsonResponse
    {
        return $this->success($supplier);
    }

    public function update(Request $request, Supplier $supplier): JsonResponse
    {
        $data = $request->validate([
            'trade_name' => ['required', 'string', 'max:150'],
            'contact_name' => ['required', 'string', 'max:150'],
            'email' => ['nullable', 'email', 'max:150'],
            'phone' => ['nullable', 'string', 'max:40'],
        ]);
        $supplier->update($data);
        return $this->success($supplier, 'Fornecedor atualizado.');
    }

    public function destroy(Supplier $supplier): JsonResponse
    {
        $supplier->delete();
        return $this->success(null, 'Fornecedor removido.');
    }
}
