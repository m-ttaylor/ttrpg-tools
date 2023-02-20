import Link from "next/link";
import { Recipe } from "@/types"; 

export interface RecipeListProps {
  recipes: Recipe[]
}

interface RecipeListItemProps {
  name: Recipe["name"]
  tags: Recipe["tags"]
  id: Recipe["_id"]
  description: Recipe["description"]
}
export const RecipeListItem = (props: RecipeListItemProps) => {
  if (!props) {
    return <></>
  }
  
  const { name, tags, id, description } = props;
  const tagsList = tags.split(",");

  return (
    <div className="rounded-l bg-white/80 my-4 p-4">
      {/* <p className="text-2xl p-2">{name}</p> */}
      <Link href={`recipes/${id}`}className="text-2xl font-bold p-2">{name}</Link>
      <div className="flex-col">
        <p className="text-slate-600 p-2">{description}</p>
        {/* <p className="text-slate-600 p-2">tags: </p> */}
        <div className="flex">
          {tagsList.map(tag =>
            <div className="text-slate-400 p-2" key={tag}>{tag}</div>
        )}
        </div>
      </div>
    </div>
  );
};

const RecipeList = ({ recipes }: {recipes: Recipe[]}) => {
  
  return (
    <div className="flex-col max-w-4xl w-full mx-auto">
      <h1 className="mt-10 mb-4 p-2 text-4xl font-bold">Recipes</h1>
      {recipes.map(r =>
        <RecipeListItem
          key={r._id}
          id={r._id}
          name={r.name}
          tags={r.tags}
          description={r.description}
        />)}
    </div>
  );
};

export default RecipeList;