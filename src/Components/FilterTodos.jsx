
const FilterTodos = ({filter,setFilter}) =>{
  return (
    <select className="filter-options" value={filter} onChange={(e) =>setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="not_completed">Not Completed</option>
    </select>
  )
}

export default FilterTodos;