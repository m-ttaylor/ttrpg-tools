import { CreateRecipeRequest } from "@/types"

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


const RecipeEntryItem = ({name, hint}: {name: string, hint: string}) => (
  <div className="px-3 my-2">
    <label
      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
    >
      {name}
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      type="text"
      id={name}
      name={name}
      defaultValue=""
    ></input>
    <p className="text-gray-600 text-xs italic">{hint}</p>
  </div>
)

const ExpandableEntryItem = ({name, hint, placeholder}: {name: string, hint: string, placeholder: string}) => (
  <div className="px-3 my-2">
    <label
      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
    >
      {name}
    </label>
    {/* <textarea
        className="resize-y shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={name}
        name={name}
        ></textarea> */}
    <textarea
      rows={4}
      className="w-full py-2 px-3 shadow text-m text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
      id={name}
      name={name}
      placeholder={placeholder}
    >
    </textarea>
    <p className="text-gray-600 text-xs italic">{hint}</p>
  </div>
)

interface Props {
  createRecipe: (recipe: CreateRecipeRequest) => Promise<void> 
}

const RecipeEntry = ({ createRecipe }: Props) => {
  
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
    
    console.log(data.name)
    console.log(data.notes)

    createRecipe(data);
  
    // blogService
  }

  return (
  <div className="w-full max-w-4xl mx-auto mb-6">
    <form className="" onSubmit={handleSubmit}>
    
      <p className="text-center text-4xl font-bold my-8 px-3 py-2">Create a New Recipe</p>
      <RecipeEntryItem name="name" hint="" />
      <RecipeEntryItem name="description" hint="" />
      <ExpandableEntryItem name="ingredients" hint="valid markdown formatting can be used here" placeholder={`* eggs\n* milk\n* butter`}/>
      <ExpandableEntryItem name="instructions" hint="" placeholder={`Crack eggs into bowl and whisk. Stir in milk. Melt butter separately and slowly mix in...`} />
      <RecipeEntryItem name="tags" hint="a list of tags separated by commas" />
      <RecipeEntryItem name="notes" hint="" />

      <div className="relative p-6">
        <button
          className="my-2 absolute top-0 right-4 w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 border border-blue-700 rounded"
          type="submit"
        >
          Create
        </button>
      </div>
    </form>
  </div>
  );
}

export default RecipeEntry