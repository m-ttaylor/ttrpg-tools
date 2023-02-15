import { Recipe } from '@/types'
import { render, screen } from '@testing-library/react'
import RecipeList from './recipeList'

const testRecipes: Recipe[] = [
  {
    name: "salad",
    ingredients: "lettuce",
    instructions: "chop and toss",
    description: "chopped salad",
    tags: "salad",
    notes: "foo",
    _id: "1"
  },
  {
    name: "caprese",
    ingredients: "tomato, basil, mozzarella",
    instructions: "slice tomatoes and top with basil and mozzarella",
    description: "italian side dish",
    tags: "appetizers",
    notes: "bar",
    _id: "2"
  },
]

test('recipeList should render the name, tags, and description of provided recipes', () => {
  
  render(<RecipeList recipes={testRecipes} />)

  // item 1
  // displayed
  expect(screen.getAllByText('salad')).toHaveLength(2);
  expect(screen.getByText('chopped salad')).toBeInTheDocument();

  // not displayed
  expect(screen.queryByText('lettuce')).not.toBeInTheDocument();
  expect(screen.queryByText('chop and toss')).not.toBeInTheDocument();
  expect(screen.queryByText('foo')).not.toBeInTheDocument();

  // item 2
  // displayed
  expect(screen.getByText('caprese')).toBeInTheDocument();
  expect(screen.getByText('italian side dish')).toBeInTheDocument();
  expect(screen.getByText('appetizers')).toBeInTheDocument();

  // not displayed
  expect(screen.queryByText('tomato, basil, mozzarella')).not.toBeInTheDocument();
  expect(screen.queryByText('slice tomatoes and top with basil and mozzarella')).not.toBeInTheDocument();
  expect(screen.queryByText('bar')).not.toBeInTheDocument();

})