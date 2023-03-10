import RecipeItem from '@/components/recipeItem'
import recipeService from '@/services/recipesService';
import { RecipeProps } from '@/components/recipeItem';

import { ParsedUrlQuery } from 'querystring';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import RecipeEditForm from '@/components/recipeEditForm';
import { CreateRecipeRequest, Recipe } from '@/types';
import Container from '@/components/container';

interface Params extends ParsedUrlQuery {
  id: string;
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
  // recipe.ingredients = await getMarkdownAsHtml(recipe.ingredients);

  return {
    props: {
      recipe
    },
  }
}

const updateRecipe = async (id: string, recipe: CreateRecipeRequest) => {
  // const modifiedRecipe: CreateRecipeRequest = { ...recipe };
  console.log('data recieved by updateRecipe handler:');
  console.log(recipe);
  const response: Recipe = await recipeService.editRecipe(id, recipe);
  console.log(response);
  // setRecipes(recipes.concat(response));
};

const EditRecipePage: NextPage<RecipeProps> = ({ recipe }) => {
  return (
    <Container>
      <RecipeEditForm recipe={recipe} updateRecipe={updateRecipe} />
    </Container>
  );
}

export default EditRecipePage;