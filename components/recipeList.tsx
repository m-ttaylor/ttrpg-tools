import Link from "next/link";
import { Recipe } from "@/types"; 

const RecipeListItem = ({ name, tags, id }: {name: Recipe["name"], tags: Recipe["tags"], id: Recipe["_id"]}) => {
  const tagsList = tags.split(",");

  return (
    <div className="">
      {/* <p className="text-2xl p-2">{name}</p> */}
      <Link href={`recipes/${id}`}className="text-2xl p-2">{name}</Link>
      <div className="flex">
        <p className="text-slate-600 p-2">tags: </p>
        {tagsList.map(tag =>
            <div className="text-slate-500 p-2" key={tag}>{tag}</div>
        )}
      </div>
    </div>
  );
};

const RecipeList = ({ recipes }: {recipes: Recipe[]}) => {
  
  return (
    <div className="flex w-full mx-auto">
      {recipes.map(r => <RecipeListItem key={r._id} id={r._id} name={r.name} tags={r.tags} />)}
    </div>
  );
};

export default RecipeList;