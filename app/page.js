"use client"

import { useEffect, useState } from "react";
import Todo from "./components/Todo";

export default function Home() {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [todosData, setTodosData] = useState([]);

  const fetchTodos = async () => {
    const response = await fetch('/api');
    const data = await response.json();
    setTodosData(data.todos);
  };

  const deleteTodo = async (mongoId) => {
    await fetch(`/api?mongoId=${mongoId}`, {
      method: 'DELETE'
    }).then(res => res.json())
    await fetchTodos();
  };

  const updateTodo = async (mongoId) => {
    await fetch(`/api?mongoId=${mongoId}`, {
      method: 'PUT'
    }).then(res => res.json())
    await fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData(form => ({...form, [name]: value}));
    console.log(formData);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // POST /api 호출하여 폼데이터 전달하기
    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      //alert('insert ok..');
      await fetchTodos();
      setFormData({
        title: '',
        description: '',
      });
    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto">
        <input value={formData.title} onChange={onChangeHandler} type="text" name="title" placeholder="Enter Title" className="px-3 py-2 border-2 w-full" />
        <textarea value={formData.description} onChange={onChangeHandler} name="description" placeholder="Enter Description" className="px-3 py-2 border-2 w-full" />
        <button type="submit" className="bg-orange-600 py-3 px-11 text-white">Add Todo</button>
      </form>

      <div className="relative overflow-x-auto mt-24 w-[60%] mx-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          ID
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Title
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Description
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Status
                      </th>
                      <th scope="col" className="px-6 py-3 ">
                          Action
                      </th>
                  </tr>
              </thead>
              <tbody>
                  {
                    todosData.map((todo, index) => {
                      console.log(todo);
                      return <Todo 
                                key={index}
                                id={index}
                                mongoId={todo._id}
                                title={todo.title} 
                                description={todo.description}
                                complete={todo.isCompleted}
                                deleteTodo={deleteTodo}
                                updateTodo={updateTodo}
                              />;
                    })
                  }
              </tbody>
          </table>
      </div>
    </>
  );
}
