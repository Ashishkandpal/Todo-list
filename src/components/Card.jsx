import { useRef, useState } from "react";

const arr = [
  { task: 'do yoga', status: false },
  { task: 'do pranayama', status: false },
  { task: 'do jogging', status: false },
  { task: 'revise react', status: false }
];

export const Card = ({isDark, handleDarkMode, isMobile}) => {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([...arr]);
  const [tabs, setTabs] = useState([{tab:'All', active: true}, {tab: 'Active', active: false}, {tab: 'Completed', active: false}]);
  const [hoverId, setHoverId] = useState(null);

  function handleSubmission(e) {
    e.preventDefault();
    setTodoList((prev) => [{ task: todo, status: false }, ...prev]);
    setTodo('');
  }

  function deleteTask(id) {
    setTodoList(todoList.filter((item, idx) => idx !== id));
  }

  function statusHandler(id) {
    setTodoList((prevTodoList) => {
      return prevTodoList.map((item, idx) => {
        if (id === idx) {
          return { ...item, status: !item.status };
        }
        return item;
      });
    });
  }

  function handleActiveState(id) {
    setTabs((prevTabs) => {
        return prevTabs.map((item, idx) => {
            if(id === idx) {
                return {...item, active: true};
            } else {
                return {...item, active: false};
            }
        })
    })
  }

  function deleteCompleted() {
    setTodoList((prevTodoList) => {
        return prevTodoList.filter((item) => item.status !== true);
      });
  }

  let updatedTodos = todoList;
  let activeTodosLength = (updatedTodos.filter((item) => item.status === false)).length;
  if(tabs[1].active) {
    updatedTodos = updatedTodos.filter((item) => item.status === false);
  }


  if(tabs[2].active) {
    updatedTodos = updatedTodos.filter((item) => item.status === true);
  }

  // save reference for dragItem and dragOverItem
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  // handle array arrangements
  const handleSort = () => {
    // duplicate array
    let _updatedTodos = JSON.parse(JSON.stringify(updatedTodos));

    // remove and save the dragged item
    const draggedItemContent = _updatedTodos.splice(dragItem.current, 1)[0];

    // switch the position
    _updatedTodos.splice(dragOverItem.current, 0, draggedItemContent)
    
    // reset the refs

    dragItem.current = null;
    dragOverItem.current = null;

    setTodoList(_updatedTodos);
  }
  

  return (
    <div className="w-screen absolute top-[5rem]">
      <header className='flex justify-around w-4/5 m-auto h-fit mb-8'>
        <h1 className="text-4xl tracking-widest font-bold text-white">TODO</h1>
        <div className="cursor-pointer" onClick={handleDarkMode}><img src={isDark ? "images/icon-sun.svg" : "images/icon-moon.svg"} alt="dark-mode-toggle" /></div>
      </header>
      <div>
        <form onSubmit={handleSubmission}>
          <input className={`w-4/5 md:w-2/5 ${isDark ? 'bg-bluish' : 'bg-white-400'} h-12 text-xl pl-2 rounded mb-5`} type="text" value={todo} onChange={(e) => setTodo(e.target.value)} placeholder="Create a new todo"/>
        </form>
        <div className="flex items-center flex-col align-middle">
          {updatedTodos.map((item, id) => (
            <p
              key={id}
              className={`w-4/5 md:w-2/5 ${isDark ? 'bg-bluish' : 'bg-white shadow-lg'} h-12 text-xl flex items-center justify-between border-b border-gray-500/50 px-4 ${
                id === 0 && 'rounded-t-md'
              } ${item.status ? 'bg-slate-900 line-through' : ''}`}
              draggable
              onDragStart={() => dragItem.current = id}
              onDragEnter={() => dragOverItem.current=id}
              onDragEnd={handleSort}
              onDragOver={(e) => e.preventDefault()}
              onMouseEnter={() => setHoverId(id)}
              onMouseLeave={() => setHoverId(null)}
            >
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className='form-checkbox'
                  checked={item.status}
                  onChange={() => statusHandler(id)}
                />
                <span className={`${isDark ? 'text-light-blue' : 'text-dark-blue'}`}>{item.task}</span>
              </label>
              {isMobile ? <span className="cursor-pointer" onClick={() => deleteTask(id)}><img src="images/icon-cross.svg" alt="" /></span> : hoverId === id && <span className="cursor-pointer" onClick={() => deleteTask(id)}><img src="images/icon-cross.svg" alt="" /></span>}
            </p>
          ))}
        </div>
        <div className="flex items-center flex-col align-middle">
          <div className={`text-sm flex items-center justify-between w-4/5 md:w-2/5 ${isDark ? 'bg-bluish' : 'bg-white shadow-lg'} h-10 pl-2 rounded mb-5 px-2`}>
            <span className={`text-slate-500 ${isDark ? 'hover:text-white' : 'hover:text-dark'} hover:font-medium`}>{activeTodosLength} items left</span>
            {!isMobile && <p className="flex gap-2">
                {tabs.map(((item, id) => <span className={`cursor-pointer ${item.active ? 'text-blue-400 font-bold' : isDark ? 'hover:text-white text-slate-500 hover:font-semibold' : 'hover:text-dark text-slate-500 hover:font-semibold'}}`} key={id} onClick={() => handleActiveState(id)}>{item.tab}</span>))}
            </p>}
            <span className={`text-slate-500 ${isDark ? 'hover:text-white' : 'hover:text-dark'} hover:font-medium cursor-pointer`} onClick={deleteCompleted}>clear completed</span>
          </div>
        </div>
        {isMobile && <div className="flex items-center flex-col align-middle">
          <div className={`text-sm flex items-center justify-center w-4/5 md:w-2/5 ${isDark ? 'bg-bluish' : 'bg-white shadow-lg'} h-10 pl-2 rounded mb-5 px-2`}>
             <p className="flex gap-2">
                {tabs.map(((item, id) => <span className={`cursor-pointer ${item.active ? 'text-blue-400 font-bold' : isDark ? 'hover:text-white text-slate-500 hover:font-semibold' : 'hover:text-dark text-slate-500 hover:font-semibold'}}`} key={id} onClick={() => handleActiveState(id)}>{item.tab}</span>))}
            </p>
          </div>
        </div>}
      </div>
    </div>
  );
};
