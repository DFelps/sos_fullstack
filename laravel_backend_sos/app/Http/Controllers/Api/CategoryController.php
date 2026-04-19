<?php

namespace App\Http\Controllers\Api;

use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoryController extends BaseController
{
    public function index(): JsonResponse
    {
        return $this->success(Category::query()->latest()->get());
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'description' => ['nullable', 'string'],
            'color' => ['required', 'string', 'max:20'],
        ]);

        return $this->success(Category::create($data), 'Categoria criada.', 201);
    }

    public function show(Category $category): JsonResponse
    {
        return $this->success($category);
    }

    public function update(Request $request, Category $category): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'description' => ['nullable', 'string'],
            'color' => ['required', 'string', 'max:20'],
        ]);

        $category->update($data);
        return $this->success($category, 'Categoria atualizada.');
    }

    public function destroy(Category $category): JsonResponse
    {
        $category->delete();
        return $this->success(null, 'Categoria removida.');
    }
}
