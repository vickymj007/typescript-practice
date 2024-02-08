import Todo from "./components/Todo";

//Todo app using React Query
function App() {



  return (
    <div className="App bg-slate-100 min-h-screen p-4">
      <h1 className='font-sans text-3xl py-2 px-8 mx-auto bg-slate-300 text-black w-fit rounded-md text-center font-semibold'>
        Todo App
      </h1>
      <Todo/>
    </div>
  );
}

export default App;
