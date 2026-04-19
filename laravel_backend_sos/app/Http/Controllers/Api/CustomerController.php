<?php

namespace App\Http\Controllers\Api;

use App\Models\Customer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CustomerController extends BaseController
{
    public function index(): JsonResponse
    {
        return $this->success(Customer::query()->latest()->get());
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'email' => ['nullable', 'email', 'max:150'],
            'phone' => ['nullable', 'string', 'max:40'],
        ]);

        return $this->success(Customer::create($data), 'Cliente criado.', 201);
    }

    public function show(Customer $customer): JsonResponse
    {
        return $this->success($customer);
    }

    public function update(Request $request, Customer $customer): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'email' => ['nullable', 'email', 'max:150'],
            'phone' => ['nullable', 'string', 'max:40'],
        ]);
        $customer->update($data);
        return $this->success($customer, 'Cliente atualizado.');
    }

    public function destroy(Customer $customer): JsonResponse
    {
        $customer->delete();
        return $this->success(null, 'Cliente removido.');
    }
}
