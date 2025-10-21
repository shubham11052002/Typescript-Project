import TodoAdd from "@/components/TodoAdd";
import Todos from "@/components/Todos";
const Page = () => {
  return (
      <div className="m-15 bg-blue-400 p-2 rounded-xl ">
        <h1 className="text-4xl font-bold border rounded-full border-none p-10 flex justify-around bg-slate-500">
          Todo Next.js + Typescript
        </h1>
        <TodoAdd />
        <Todos />
      </div>
  );
};

export default Page;
