import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd-next";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchTodos = async () => {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=5`
    );

    if (res.data.length > 0) {
      setTodos((prev) => [...prev, ...res.data]);
      setPage(page + 1);
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <div
            className="todo-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <InfiniteScroll
              dataLength={todos.length}
              next={fetchTodos}
              hasMore={hasMore}
              loader={<h3> Loading...... </h3>}
              endMessage={<p>No more todod to load</p>}
            >
              {todos.map((todo, index) => (
                <Draggable
                  key={todo.id}
                  draggableId={todo.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <TodoItem todo={todo} />
                    </div>
                  )}
                </Draggable>
              ))}
            </InfiniteScroll>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;
