import { render, screen } from '@testing-library/react'
import RecipeItem, { RecipeProps } from './recipeItem'

test('renders content', () => {
  const recipeProps: RecipeProps = {
    recipe: {
      name: "baked beans",
      description: "a breakfast classic",
      ingredients: "beans, barbeque sauce, bacon, brown sugar, water",
      instructions: "cook it all in a pot",
      tags: "beans, breakfast, easy",
      notes: "foo",
      _id: "123"
    }
  }

  render(<RecipeItem {...recipeProps} />)

  const name = screen.getByText('baked beans')
  const description = screen.getByText('a breakfast classic')
  const ingredients = screen.getByText("beans, barbeque sauce, bacon, brown sugar, water");
  const instructions = screen.getByText("cook it all in a pot");
  const tags = screen.getByText("beans");

  expect(name).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(ingredients).toBeInTheDocument();
  expect(instructions).toBeInTheDocument();
  expect(tags).toBeInTheDocument();

  // const edit = screen.getByText("edit");

  // edit.click()

})