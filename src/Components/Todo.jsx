import { useState } from "react";

const ToDo =({id,value,completed,ToggleCompleted,editValue, deletedtodo}) =>{
 const [isEditMode ,setIsEditMode] =useState(false);
 const [newvalue, setNewvalue] =useState(value);

 const toggleEditmode = () =>{
  setIsEditMode(!isEditMode);
 }
 
 const handleSave =() =>{
  editValue(id, newvalue);
  toggleEditmode();
 }

 const handleCancel =() =>{
  setNewvalue(value);
  toggleEditmode();
 }

 return(
  <div className="todo-item" key={id}>
    {!isEditMode ? <>
    <input type="checkbox"
    checked={completed}
    onChange={()=>{ToggleCompleted(id)}}
     />
     <span className={completed ? "completed" : ""}>{value}</span>
     <button onClick={toggleEditmode}>Edit</button>
     <button onClick={() => deletedtodo(id)}>Delete</button>
</>: <>
     <input type="text" value={newvalue  || ""} onChange={(e) => {setNewvalue(e.target.value)}} />
     <button onClick={handleSave}>Save</button>
     <button onClick={handleCancel}>Cancel</button>
     </> }

  </div>
 )    
}

export default ToDo;