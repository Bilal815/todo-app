//  Whe Will Work on:
//  React
//  TODO app
//  Online Deployment (Deployed Online)
//  Database

import React, { useState } from 'react';
import './App.css';

function App() {
  const {todos, setTodos} = useState(['Take dogs for a walk', 'Take the rubbish out']);
  const sum = 1 + 5;

  return (
    <div className="App">
      <h1>Hello, {sum} Crazy Programmers!</h1>
      <input />
      <button>Add TODO</button>

      <ul>
      // eslint-disable-next-line 
        {todos.map(todo => (
            <li>{todo}</li>
            ))}
      </ul>

    </div>
  );
}

export default App;
