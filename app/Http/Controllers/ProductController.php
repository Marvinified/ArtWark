<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;

class ProductController extends Controller
{
    function index(Product $product = null){
        if($product)
            return $product;
        return Product::paginate(20);
    }

    public function search($value=null)
    {
        return Product::where("name", "LIKE", '%'.$value.'%')
                        ->orWhere("description", "LIKE", '%'.$value.'%')
                        ->paginate(20);
    }
    
    

    
}
