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
  db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => 
  {
    setTodos(snapshot.docs.map(doc => (
      {
        id: doc.id, 
        todo: doc.data().todo,
        timestamp: doc.Cd.version.timestamp
      }
    )))
  })

}, [])


  /**
   * clears up the input field after sumitting
   */
  const clearInput = () => setInput('')

  const addTodo = (e) => {
    //this will stop unncessary page REFRESH/POSTBACK
    e.preventDefault()
    
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then((newInputRef) => {

      // there path is /todos
      const newItem = {
        id: newInputRef.id,
        desc: input
      }

      // setTodos([...todos, input]); //push the input to the state
      setTodos([...todos, newItem]); //push the input to the state
      clearInput()

    }).catch((error) => {
      console.dir(error)
    })
  }


  const renderTodoList = () => Array.isArray(todos) && todos.length > 0 
    ? todos.map(todo => <Todo key={todo.id} todo={todo} />)
      : null

  return (
    <div className="App">
      <h1 className="capitalized">to-do list 📝</h1>
      <form>  
        {/*<input />*/}
        <FormControl>
          <InputLabel>Write To-Do &#9989;</InputLabel>
          <Input value={input} onChange={e => {setInput(e.target.value)}}/>
        </FormControl>
        <Button type="submit" disabled={!input} variant="contained" color="primary" onClick={addTodo}>
          Add  &#128071;
        </Button>
      </form>

      <ul>
        {renderTodoList()}
      </ul>

    </div>
  );
}

export default App;
