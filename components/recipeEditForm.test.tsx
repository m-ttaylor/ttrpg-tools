import { render, screen, waitFor } from '@testing-library/react'
import type { NextRouter } from 'next/router';
import { RouterContext } from 'next/dist/shared/lib/router-context';

import RecipeEditForm from './recipeEditForm'

const useRouter = jest.spyOn(require('next/router'), 'useRouter');
const mockUseNextRouter = useRouter;

// jest.Mock<NextRouter> 
// function createMockRouter(page: string) {
function createMockRouter(overrides: Partial<NextRouter>) {
  return {
    forward: jest.fn(),
    basePath: '',
    pathname: '/page/[page]',
    route: '/page/[page]',
    query: {},
    asPath: `/page/foo`,
    back: jest.fn(),
    beforePopState: jest.fn(),
    prefetch: jest.fn(),
    push: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    defaultLocale: 'en',
    domainLocales: [],
    isPreview: false,
    ...overrides,
  };
}

// function mockNextRouter(page: string) {
function mockNextRouter(overrides: Partial<NextRouter> = {}) {
  const mockRouter = createMockRouter(overrides);
  mockUseNextRouter.mockReturnValue(mockRouter);
  return mockRouter;
}

const name = "baked beans";
const description = "a breakfast classic";
const ingredients = "beans, barbeque sauce, bacon, brown sugar, water";
const instructions = "cook it all in a pot";
const tags = "beans, breakfast, easy";
const notes = "foo";
const _id = "123";

const testRecipe = {
  name,
  description,
  ingredients,
  instructions,
  tags,
  notes,
  _id
}

test('recipeEditForm should render fields of provided recipe as starting input values', async () => {
  // mockNextRouter(_id);
  const mockRouter = mockNextRouter({
    pathname: '/edit',
    query: {
      page: _id,
      // age: '42',
    },
    asPath: `/page/${_id}`
  });

  render(<RecipeEditForm recipe={testRecipe} updateRecipe={jest.fn()} />)

  expect(screen.getByText("baked beans")).toBeInTheDocument();
  expect(screen.getByRole("textbox", { name: /Steps/i })).toBeInTheDocument();
  expect(screen.getByRole("textbox", { name: /Tags/i })).toBeInTheDocument();
  expect(screen.getByRole("textbox", { name: /Notes/i })).toBeInTheDocument();
  expect(screen.getByDisplayValue(name)).toBeInTheDocument();
  expect(screen.getByDisplayValue(description)).toBeInTheDocument();
  expect(screen.getByDisplayValue(ingredients)).toBeInTheDocument();
  expect(screen.getByDisplayValue(instructions)).toBeInTheDocument();
  expect(screen.getByDisplayValue(tags)).toBeInTheDocument();
  expect(screen.getByDisplayValue(notes)).toBeInTheDocument();

  expect(screen.getByRole("button", { name: /Save/i })).toBeInTheDocument();
});

test('recipeEditForm should call its update function and route back to /recipes when the save button is clicked', async () => { 
  // const mockRouter = mockNextRouter(_id);
  const mockRouter = mockNextRouter({
    pathname: '/edit',
    query: {
      page: _id,
      // age: '42',
    },
    asPath: `/page/${_id}`
  });

  const mockUpdateRecipe = jest.fn();
  render(<RecipeEditForm recipe={testRecipe} updateRecipe={mockUpdateRecipe} />)

  screen.getByRole("button", { name: /Save/i }).click();

  await waitFor(() => {
    expect(mockRouter.push).toHaveBeenLastCalledWith(`/recipes/${_id}`);
  });

  expect(mockUpdateRecipe).toHaveBeenCalledTimes(1);
});

test('recipeEditForm should route back to /recipes when the back button is clicked', async () => { 
  // const mockRouter = mockNextRouter(_id);
  const mockRouter = mockNextRouter({
    pathname: '/recipes',
    query: {
      page: _id,
      // age: '42',
    },
    asPath: `/page/${_id}`
  });

  const mockUpdateRecipe = jest.fn();
  render(
    <RouterContext.Provider value={mockRouter}>
      <RecipeEditForm recipe={testRecipe} updateRecipe={mockUpdateRecipe} />
    </RouterContext.Provider>
  )

  screen.getByRole("link", { name: /go back/i }).click();

  await waitFor(() => {
    expect(mockRouter.push).toHaveBeenCalledWith(`/recipes/${_id}`, `/recipes/${_id}`, {"locale": undefined, "scroll": undefined, "shallow": undefined});
  });

  console.log(mockRouter.push.mock.calls)
});