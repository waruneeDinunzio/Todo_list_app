import React from 'react';
import Todo from './Todo';

const TodoList = ({todos,index, toggleTodo}) => {
    return (
        todos.map((todo) => {
            return <Todo key={index} todo = {todo} toggleTodo={toggleTodo} />
        })
        
    );
};

export default TodoList;