import { useEffect, useState } from 'react';
import ToDo from './Todo';
import FilterTodos from './FilterTodos';
import { todoStorage } from './Storageservice';


const ToDos = () =>{

    const [todos, setTodos] =useState(() => {
        const savedTodos = todoStorage.load() || [];
        return savedTodos.map(todo => ({
            ...todo,
            completed: todo.completed || false,
        }));
    });

    const [value, setValue] = useState("");
    const [filter, setFilter] =useState("All");
    const [searchtodo, setSearchtodo] =useState("");
    const [todoToDelete, setTodoToDelete] = useState(null);

    const handlevalue =(e) =>{
          setValue(e.target.value);
    }

    const AddTodo =() =>{
        if(value){
            const todo = {
                id: Date.now(),
                value:value,
                completed: false,
            };
            setTodos([...todos, todo]);
            setValue("");
        }

    }

    const ToggleCompleted =(id)=>{
     setTodos(todos.map((todo) =>{
          if( todo.id===id) {
            return { ...todo, completed: !todo.completed }; 
          }  
          return todo;  
     }   
    ))
    }
     
 
    // useEffect(() =>{
    //     const completed = todos.filter((todo) => todo.completed ) //stexcum enq nor zangvac vortex menak true en
    //     setFilter(completed);
    // }, [todos]);


    const filteredtodos =todos
    .filter((todo) =>{
        if(filter === "completed") return todo.completed;
        if(filter === "not_completed") return !todo.completed;
        return true;
    })
    .filter(todo =>
        todo.value.toLowerCase().includes(searchtodo.toLowerCase())
    );

   const Searchingtodo =(e) =>{
      setSearchtodo(e.target.value);
   }

  
  
    useEffect(() =>{
        todoStorage.save(todos);
       // console.log(todos);
       }, [todos]);

      // console.log(localStorage.getItem("todos"));

    const editValue =(id,value) =>{
       setTodos(todos.map(todo =>{
        if(todo.id===id){
            return { ...todo, value: value };
        }
        return todo;
       }))
    }

    const deletedtodo =(id) =>{
        if (window.confirm("Вы уверены, что хотите удалить задачу?")) {
       setTodos(todos.filter(item => item.id!==id)) };
    };
    
    const confmofDelete =(id) =>{
        setTodoToDelete(id);
    };
  
    
    return (
        
        <div className='input-container'>
            <input type="text"
            value={searchtodo}
            onChange={Searchingtodo}
            placeholder="searching here"
             />
            <input type="text" 
            value={value} 
            onChange={handlevalue} />
            <button onClick={AddTodo}>Add</button>
            <FilterTodos filter={filter} setFilter={setFilter}/>
            {Array.isArray(filteredtodos) && filteredtodos.map((todo) =>(  //todo zangvacis meji mi hat obeyktna todo.id stacvuma et obeykti id arjeqy
                <ToDo key={todo.id} 
                {...todo} ToggleCompleted={ToggleCompleted} editValue={editValue} deletedtodo={deletedtodo} confmofDelete={confmofDelete}/>
          ))}
        </div>
    )
 }

export default ToDos;