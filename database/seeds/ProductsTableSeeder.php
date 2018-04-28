<?php
use \Faker\Generator as Faker;
use Illuminate\Database\Seeder;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        for($i=0; $i<10; $i++){
            DB::table('products')->insert([
                'name' => $faker->word,
                'description' => $faker->sentence(10),
                'category' => 'penciled',
                'price' => $faker->randomNumber(5)
            ]);
            DB::table('products')->insert([
                'name' => $faker->word,
                'description' => $faker->sentence(10),
                'category' => 'abstract',
                'price' => $faker->randomNumber(5)
            ]);
            DB::table('products')->insert([
                'name' => $faker->word,
                'description' => $faker->sentence(10),
                'category' => 'computer',
                'price' => $faker->randomNumber(5)
            ]);
            DB::table('products')->insert([
                'name' => $faker->word,
                'description' => $faker->sentence(10),
                'category' => 'painting',
                'price' => $faker->randomNumber(5)
            ]);


        }        
    }
}
