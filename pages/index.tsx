import Head from 'next/head'
import { useEffect, useState } from 'react'
import Image from 'next/image'

import RecipeEntry from '@/my-app/components/recipeEntry'
import recipeService from '@/my-app/services/recipesService';
import { Recipe, CreateRecipeRequest } from '@/types';

import RecipeList from '@/my-app/components/recipeList';

export default function Home() {
  // const recipes = await getRecipes();
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    recipeService.getRecipes().then(r =>
      setRecipes(r)
    );
  }, []);

  const createNewRecipe = async (recipe: CreateRecipeRequest) => {
    // const recipeToCreate: CreateRecipeRequest = {
    //   name: "mashed meatloaf",
    //   description: "why would you do this",
    //   notes: "",
    //   tags: "meatloaf, side dishes",
    //   ingredients: "1 meatloaf",
    //   instructions: "boil 'em, mash 'em, regret"
    // };

    const recipeToCreate: CreateRecipeRequest = { ...recipe };
    const response: Recipe = await recipeService.createRecipe(recipeToCreate);
    console.log(response);
    setRecipes(recipes.concat(response));
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container w-full mx-auto">
        <div><h1 className="text-center text-6xl font-bold my-8">Mattthew's Cookbook</h1></div>
        <Image
          className="mx-auto rounded-3xl"
          width={600}
          height={400}
          priority={true}
          unoptimized={true}
          loader={() => "https://cdn.shopify.com/s/files/1/0262/7554/5176/products/DSC_6227_600x.jpg?v=1667484611"}
          alt="picture of recipe book"
          src="https://cdn.shopify.com/s/files/1/0262/7554/5176/products/DSC_6227_600x.jpg?v=1667484611"
        />
        <div className="">
          <RecipeEntry createRecipe={createNewRecipe} />
        </div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          onClick={() => console.log("thanks for clicking me")}
        >
          Click Me!
        </button>
        
        {/* <button onClick={()=>createNewRecipe()}>Create New Recipe</button> */}

        {/* {recipes.map(recipe =>
          <RecipeItem key={recipe._id} {...recipe} />)} */}
        <RecipeList recipes={recipes} />
      </div>
    </>
  )
}
