import { CreateRecipeRequest, Recipe } from "@/types"
import Link from "next/link"
import { useRouter } from "next/router"

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement
  description: HTMLInputElement
  tags: HTMLInputElement
  ingredients: HTMLInputElement
  instructions: HTMLInputElement
  notes: HTMLInputElement
}

interface RecipeFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

const NameEntryItem = ({ name, hint, existingValue }: { name: string, hint: string, existingValue: string }) => (
  <input className="rounded bg-white/50 text-4xl text-slate-600 font-bold p-2"
    type="text"
    id={name}
    name={name}
    defaultValue={existingValue}
  >
  </input>
);

const DescriptionEntryItem = ({name, hint, existingValue}: {name: string, hint: string, existingValue: string}) => (
  <div className="">
    <input
      className="rounded bg-white/50 text-xl italic p-2"
      type="text"
      id={name}
      name={name}
      defaultValue={existingValue}
    ></input>
    <p className="text-gray-600 text-xs italic">{hint}</p>
  </div>
)

const RecipeEntryItem = ({name, labelName, hint, existingValue}: {name: string, labelName: string, hint: string, existingValue: string}) => (
  <div className="my-4">
    <label
      className="text-2xl p-2"
    >
      {labelName}
    </label>
    <input
      className="appearance-none border text-slate-600 bg-slate-100 rounded w-full py-2 px-3 leading-tight focus:shadow-outline"
      type="text"
      id={name}
      name={name}
      defaultValue={existingValue}
    ></input>
    <p className="text-gray-600 text-xs italic">{hint}</p>
  </div>
)

const ExpandableEntryItem = ({name, labelName, hint, placeholder, existingValue}: {name: string, labelName: string, hint: string, placeholder: string, existingValue: string}) => (
  <div className="my-2">
    <label
      className="text-2xl p-2"
    >
      {labelName}
    </label>
    {/* <textarea
        className="resize-y shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={name}
        name={name}
        ></textarea> */}
    <textarea
      rows={4}
      className="rounded bg-white/50 w-full py-2 px-3 bg-slate-100 text-slate-600 text-xl text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
      id={name}
      name={name}
      placeholder={placeholder}
      defaultValue={existingValue}
    >
    </textarea>
    <p className="text-gray-600 text-xs italic">{hint}</p>
  </div>
)

interface Props {
  updateRecipe: (id: string, recipe: CreateRecipeRequest) => Promise<void>
  recipe: Recipe
}

const RecipeEditForm = ({ recipe, updateRecipe }: Props) => {

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<RecipeFormElement>) => {
    event.preventDefault()
  
    // const form = event.currentTarget
    const formElements = event.currentTarget.elements
    // console.log(formElements);
    
    // const data: FormElements = formElements;
    const data = {
      name: formElements.name.value,
      description: formElements.description.value,
      tags: formElements.tags.value,
      ingredients: formElements.ingredients.value,
      instructions: formElements.instructions.value,
      notes: formElements.notes.value,
    }

    console.log('data going in to edit request:')
    console.log(data);
    
    console.log(data.name)
    console.log(data.notes)

    // createRecipe(data);
    await updateRecipe(recipe._id, data);
    router.push(`/recipes/${recipe._id}`)

  
    // blogService
  }

  return (
  <div className="w-full max-w-4xl mx-auto mb-6">
    <form className="" onSubmit={handleSubmit}>
{/*     
      <p className="text-4xl font-bold my-8 px-3 py-2">
          {recipe.name}
          <Link
            className="absolute my-2 py-1 px-5 ml-12 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            href={`/recipes/${recipe._id}`}
          >
            go back
          </Link>
      </p> */}
      <div className="mt-10">
        <NameEntryItem name="name" hint="" existingValue={recipe.name} />
        <Link
          className="my-2 py-1 px-5 ml-12 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          href={`/recipes/${recipe._id}`}
        >
          go back
        </Link>
      </div>
      <DescriptionEntryItem name="description" hint="" existingValue={recipe.description || ""} />
      <ExpandableEntryItem
          labelName="Ingredients"
          name="ingredients"
          hint="valid markdown formatting can be used here"
          placeholder={`* eggs\n* milk\n* butter`}
          existingValue={recipe.ingredients}
      />
      <ExpandableEntryItem
          labelName="Steps"
          name="instructions"
          hint=""
          placeholder={`Crack eggs into bowl and whisk. Stir in milk. Melt butter separately and slowly mix in...`}
          existingValue={recipe.instructions}
      />
      <RecipeEntryItem
        labelName="Tags"
        name="tags"
        hint="a list of tags separated by commas"
        existingValue={recipe.tags}
      />
      <RecipeEntryItem
        labelName="Notes"
        name="notes"
        hint=""
        existingValue={recipe.notes || ""}
      />

      <div className="relative p-6">
        <button
          className="my-2 absolute top-0 right-4 w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 border border-blue-700 rounded"
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  </div>
  );
}

export default RecipeEditForm;