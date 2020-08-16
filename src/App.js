//  Whe Will Work on:
//  React
//  TODO app
//  Online Deployment (Deployed Online)
//  Database
import React, { useState, useEffect } from 'react';
import { 
  Button, 
  Input, 
  InputLabel, 
  FormControl, 
  Modal,
  makeStyles
} from '@material-ui/core';


import Todo from './Todo'
import './App.css';
import db from './firebase';
import firebase from 'firebase'


const App = () => {

  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [open, setOpen] = useState(false)
  const [modalData, setModalData] = useState({
    id: '',
    input: ''
  })

  // when the app loads, we need to listen to the database and fetch new todos as they get added/removed
  useEffect(() => {
    // this code here... fires when the app.js loads
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => 
    {
      setTodos(snapshot.docs.map(doc => (
        {
          ...doc.data(),
          id: doc.id
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
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      isCompleted: false// new Data item
    }).then((newInputRef) => {
      
      // there path is /todos
      const newItem = {
        id: newInputRef.id,
        desc: input,
        isCompleted: false
      }

      // setTodos([...todos, input]); //push the input to the state
      setTodos([...todos, newItem]); //push the input to the state
      clearInput()

    }).catch((error) => {
      console.dir(error)
    })
  }

  const openModal = (id) => {
    db.collection('todos').doc(id).get().then((docRef) => {
      setOpen(true)
      /*
        DOCUMENT EXAMPLE WILL LOOK LIKE THIS
        --------------------------------------------------------
        isCompleted: true
        timestamp: t {seconds: 1597541101, nanoseconds: 48000000}
        todo: "TEST"
       */
      const document = docRef.data()
      setModalData({
        id,
        input: document.todo
      })
    })
  }


  const renderTodoList = () => Array.isArray(todos) && todos.length > 0 
    ? todos.map(todo => <Todo openModal={openModal} key={todo.id} todo={todo} />)
      : null
      
  const useStyles = makeStyles((theme) => ({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        }
  }))

  const updateTodo = () => {
      // update the todo with the new input text
      db.collection('todos').doc(modalData.id).set({
          todo: modalData.input,
      }, { merge: true })
      setOpen(false)
  }

  const writeNewModal = (e) => {
    const input = e.target.value
    const newModalState = {
      ...modalData,
      input
    }
    setModalData(newModalState)
  }


  return (
    <div className="App">
      <div id="my-modal">
        <Modal style={{display: "flex", justifyContent: "center", alignItems: "center"}} open={open} onClose={e => setOpen(false)}>
            <div className={useStyles().paper}>
                <h1>Change Your TODO &#9989;</h1>
                <input onChange={writeNewModal} value={modalData.input}/>
                <Button onClick={updateTodo}>Update Todo</Button>
            </div>
        </Modal>
      </div>

      <h1 className="capitalized">to-do list 📝</h1>
      <form>  
        <FormControl>
          <InputLabel>Write To-Do ✔️</InputLabel>
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
  )
}

export default App;
