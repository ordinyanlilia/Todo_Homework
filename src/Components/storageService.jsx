
 export const todoStorage = {
    load: () => {
       const todos= JSON.parse(localStorage.getItem("todos"));
       return todos ? todos : [];
    },
    
    save: (todos) => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }
};
