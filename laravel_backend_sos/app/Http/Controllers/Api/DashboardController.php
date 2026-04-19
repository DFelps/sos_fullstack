<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class DashboardController extends BaseController
{
    public function __invoke(): JsonResponse
    {
        $data = [
            'total_items' => (int) Product::query()->sum('quantity'),
            'inventory_cost' => (float) Product::query()->select(DB::raw('SUM(quantity * cost_price) as total'))->value('total'),
            'low_stock_products' => Product::query()->whereColumn('quantity', '<=', 'min_quantity')->where('quantity', '>', 0)->count(),
            'out_of_stock_products' => Product::query()->where('quantity', 0)->count(),
        ];

        return $this->success($data);
    }
}
