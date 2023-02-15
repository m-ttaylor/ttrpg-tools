import { render, screen, waitFor } from '@testing-library/react'
import RecipeEntry from './recipeEntry'

test('renders content', async () => {

  const mockCreateRecipe = jest.fn();
  render(<RecipeEntry createRecipe={mockCreateRecipe} />);

  const nameInput = screen.getByLabelText('name');

  expect(nameInput).toBeInTheDocument();

  const descriptionInput = screen.getByLabelText("description");
  expect(descriptionInput).toBeInTheDocument();
  expect(screen.getByLabelText("instructions")).toBeInTheDocument();
  expect(screen.getByLabelText("tags")).toBeInTheDocument();
  expect(screen.getByLabelText("notes")).toBeInTheDocument();

  expect(screen.getByRole("button", { name: /Create/i })).toBeInTheDocument();

  screen.getByRole("button", { name: /Create/i }).click();

  await waitFor(() => {
    expect(mockCreateRecipe).toHaveBeenCalledTimes(1);
  });
})