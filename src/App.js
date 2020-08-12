//  Whe Will Work on:
//  React
//  TODO app
//  Online Deployment (Deployed Online)
//  Database
import React, { useState, useEffect } from 'react';
import { Button, Input, InputLabel, FormControl } from '@material-ui/core';
import Todo from './Todo'
import './App.css';
import db from './firebase';
import firebase from 'firebase';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // when the app loads, we need to listen to the database and fetch new todos as they get added/removed
useEffect(() => {
  // this code here... fires when the app.js loads
  db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
    setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
  })
}, []);

  const addTodo = (e) => {
    e.preventDefault(); //this will stop unncessary page REFRESH
    
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    
    setTodos([...todos, input]); //push the input to the state
    setInput(''); //clears up the input field after sumitting
  }

  return (
    <div className="App">
      <h1>TODO LIST 📝</h1>
      <form>  
        {/*<input />*/}
        <FormControl>
          <InputLabel>Write  TODO &#9989;</InputLabel>
          <Input value={input} onChange={e => {setInput(e.target.value)}}/>
        </FormControl>
        <Button type="submit" disabled={!input} variant="contained" color="primary" onClick={addTodo}>
          Add TODO  &#128071;
        </Button>
      </form>

      <ul>
        {todos.map(todo => (
          <Todo todo={todo} />
          /*<li>{todo}</li>*/
        ))}
      </ul>

    </div>
  );
}

export default App;
