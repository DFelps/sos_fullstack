<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $productId = $this->route('product')?->id ?? $this->route('product');

        return [
            'name' => ['required', 'string', 'max:150'],
            'sku' => [
                'required',
                'string',
                'max:50',
                Rule::unique('sos_products', 'sku')->ignore($productId),
            ],
            'category_id' => ['required', 'exists:sos_categories,id'],
            'supplier_id' => ['required', 'exists:sos_suppliers,id'],
            'quantity' => ['required', 'integer', 'min:0'],
            'min_quantity' => ['required', 'integer', 'min:0'],
            'cost_price' => ['required', 'numeric', 'min:0'],
            'sale_price' => ['required', 'numeric', 'min:0'],
            'expiration_date' => ['nullable', 'date'],
            'entry_date' => ['required', 'date'],
            'location' => ['required', 'string', 'max:60'],
            'description' => ['nullable', 'string'],
        ];
    }
}