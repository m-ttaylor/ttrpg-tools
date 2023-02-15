import Container from "@/components/container";
import RecipeList, { RecipeListProps } from "@/components/recipeList";
import TopBar from "@/components/topBar";
import recipeService from '@/services/recipesService';
import { GetStaticProps, NextPage } from "next";

export const getStaticProps: GetStaticProps<RecipeListProps> = async (context) => {


  // const { id } = context.params!;
  const recipes = await recipeService.getRecipes();

  // const processedContent = await remark()
  //   .use(html)
  //   .process(recipe.ingredients);
  // recipe.ingredients = processedContent.toString();

  // recipe.ingredients = await getMarkdownAsHtml(recipe.ingredients);

  return {
    props: {
      recipes
    },
  }
}

const RecipesPage: NextPage<RecipeListProps> = ({ recipes }) => {
  return (
    <Container>
      <RecipeList recipes={recipes} />
    </Container>
  );
}


export default RecipesPage;