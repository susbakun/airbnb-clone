import { createCategoryPage } from "@/app/actions";
import CreationButtonBar from "@/app/components/CreationButtonBar";
import SelectCategory from "@/app/components/SelectCategory";
import { useParams } from "next/navigation";

export default function StructureRoute() {
  const { id } = useParams();

  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Which of these best describe your Home?
        </h2>
      </div>
      <form action={createCategoryPage}>
        <input type="hidden" name="homeId" value={id} />
        <SelectCategory />
        <CreationButtonBar />
      </form>
    </>
  );
}
