import React from 'react';
import BoxList from "./BoxList";
import TodoList from "./TodoList";

function App() {
  return (
    <section>
      <div>
        <BoxList />
      </div>
      <div>
        <TodoList />
      </div>
    </section>
  );
}

export default App;
