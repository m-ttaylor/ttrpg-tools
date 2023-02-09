import RecipeItem from '@/components/recipeItem'
import recipeService from '@/services/recipesService';
import { RecipeProps } from '@/components/recipeItem';

import { remark } from 'remark';
import html from 'remark-html';

import { ParsedUrlQuery } from 'querystring';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

interface Params extends ParsedUrlQuery {
  id: string;
}

export async function getMarkdownAsHtml(markdown: string) {

  const processedContent = await remark()
    .use(html)
    .process(markdown);
  const contentHtml = processedContent.toString();

  return contentHtml;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {

  const recipes = await recipeService.getRecipes();
  const paths = recipes.map(recipe => (
    {
      params: {id: recipe._id}
    }
  ))

  return {
    paths,
    fallback: false
  }
}
// export const getStaticProps = async ({ params }: GetStaticPropsContext<{ id: string }>) => {
export const getStaticProps: GetStaticProps<RecipeProps, Params> = async (context) => {


  const { id } = context.params!;
  const recipe = await recipeService.getRecipe(id);

  // const processedContent = await remark()
  //   .use(html)
  //   .process(recipe.ingredients);
  // recipe.ingredients = processedContent.toString();

  recipe.ingredients = await getMarkdownAsHtml(recipe.ingredients);

  return {
    props: {
      recipe
    },
  }
}

const RecipePage: NextPage<RecipeProps> = ({ recipe }) => {
  return (<RecipeItem recipe={recipe} />);
}

export default RecipePage;