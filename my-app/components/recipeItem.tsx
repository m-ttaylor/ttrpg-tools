import { Recipe } from "@/types";
import Link from "next/link";

// import { RecipeProps } from "@/pages/recipes/[id]";
export interface RecipeProps {
  recipe: Recipe
}

const RecipeItem = ({ recipe: { name, description, tags, ingredients, instructions, notes, _id } }:  RecipeProps ) => {
  const tagsList = tags.split(",");
  
  return (
    <div className="w-full max-w-4xl mx-auto mb-6">
      <div className="mt-10">
        <p className="text-4xl font-bold p-2">{name}
        <Link
          className="inline-flex items-center absolute my-2 py-1 px-5 ml-12 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          href={`/recipes/edit/${_id}`}
          >
          <svg className="w-6 h-6 mr-2 dark:text-white"fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"></path>
          </svg>
          <span>edit</span>
        </Link>
        </p>
        <p className="text-xl italic p-2">{description}</p>
      </div>
      
      <div>
        <p className="text-2xl p-2">Ingredients</p>
        {/* <p className="text-slate-600 p-2">{ingredients}</p> */}
        <article className="prose lg:prose-xl" dangerouslySetInnerHTML={{ __html: ingredients }}></article>
      </div>
      <div>
        <p className="text-2xl p-2">Steps</p>
        <p className="text-slate-600 p-2">{instructions}</p>
      </div>
      <p className="text-2xl p-2">tags</p>
      <div className="flex">
        
        {
          tagsList.map(tag =>
            <div className="text-slate-500 p-1" key={tag}>{tag}</div>
          )
          }
      </div>
    </div>
  );
};

export default RecipeItem;