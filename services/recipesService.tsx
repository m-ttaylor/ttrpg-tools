// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next'
import { Recipe, CreateRecipeRequest } from "@/types";

const baseUrl = "http://localhost:1337/api";
const getRecipes = async () => {

  const result: Recipe[] = await (await fetch(`${baseUrl}/recipes`)).json()
  console.log(result);

  return result;
}

const getRecipe = async (id: string | null) => {
  
  const result: Recipe = await (await fetch(`${baseUrl}/recipes/${id}`)).json();

  return result;
}

const createRecipe = async (request: CreateRecipeRequest) => {

  const response = await fetch(`${baseUrl}/recipes`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request),
  });

  return response.json();

}

const editRecipe = async (id: string, request: CreateRecipeRequest) => {

  const response = await fetch(`${baseUrl}/recipes/${id}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  return response.json();
}

const exports = { createRecipe, getRecipes, getRecipe, editRecipe }
export default exports;