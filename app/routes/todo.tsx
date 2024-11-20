import {useEffect, useState} from "react";

type Todo = {
    id: number;
    todo: string;
    completed: boolean;
}
export default function About() {

    const [todos, setTodos] = useState<Todo[]>([]);

    const [todo, setTodo] = useState<string>('');

    const handleAddTodo = (): void => {
        const newTodo = {
            id: todos.length + 1,
            todo: todo,
            completed: false
        }
        setTodos([...todos, newTodo]);
        setTodo('');
    }

    function handleChangeTodo(e: string): void {
        setTodo(e);
    }

    useEffect(() => {
        const fetchTodos = async () => {
            const response = await fetch('https://dummyjson.com/todos');
            const data = await response.json();
            const {todos} = data;
            setTodos(todos)
        }
        fetchTodos()
    }, []);

    function handleCheckBox(id: number | string, e: boolean) {
        const newTodos: Todo[] = todos.map(todo => {
            if (todo.id === Number(id)) {
                return {
                    ...todo,
                    completed: e
                }
            }
            return todo;
        });
        setTodos(newTodos);
    }

    function handleRemoveTodo(id: number | string) {
        const newTodos = todos.filter(todo => todo.id !== Number(id));
        setTodos(newTodos);
    }

    function handleAllDone() {
        const newTodos = todos.map(todo => {
            return {
                ...todo,
                completed: true
            }
        });
        setTodos(newTodos);
    }

    function handleFilterCompleted() {
        const newTodos = todos.filter(todo => todo.completed);
        setTodos(newTodos);
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="flex flex-col items-center gap-16">
                <header className="flex flex-col items-center gap-9">
                    <p className="text-gray-700 dark:text-gray-200">This is a simple todo app built with Remix</p>
                </header>
                <div>
                    {
                        todos && todos.map(todo => (
                            <div key={todo.id} className="flex items-center gap-2">
                                <input type="checkbox" checked={todo.completed}
                                       value={todo.id}
                                       onChange={(e) => handleCheckBox(todo.id, e.target.checked)}/>
                                <span>{todo.todo}</span>
                                <button onClick={() => handleRemoveTodo(todo.id)}>X</button>
                            </div>
                        ))
                    }
                    <input value={todo} type="text" placeholder="Add a new todo"
                           onChange={(e) => handleChangeTodo(e.target.value)}/>
                    <button onClick={handleAddTodo}>Add</button>
                    <div className='flex gap-1'>
                        <button className='m-1' onClick={handleAllDone}>All Done</button>
                        <button onClick={handleFilterCompleted}>Filter Completed</button>
                    </div>
                </div>
            </div>
        </div>
    );
}