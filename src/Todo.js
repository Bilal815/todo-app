import React, { useState } from 'react';
import './Todo.css'
import {
    List, 
    ListItem, 
    // ListItemAvatar, 
    ListItemText, 
    Button, 
    Modal, 
    makeStyles
} from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import db from './firebase';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    p: {
        textDecoration: 'line-through',
        opacity: '80%'
    },
}));





const Todo = props => {

    let { todo } = props
    let { id, isCompleted } = todo
    todo = todo.todo


    const [input, setInput] = useState();
    const classes = useStyles();
    const [open, setOpen] = useState(false)

    const updateTodo = () => {
        // update the todo with the new input text
        db.collection('todos').doc(id).set({
            todo: input,
        }, { merge: true })
        setOpen(false)
        setInput('')
    }

    const toggleIsCompleted = () => {
        db.collection('todos').doc(id).set({
            isCompleted: !isCompleted
        }, { merge: true })
    }

    const deleteForever = () => {
        db.collection('todos').doc(id).delete()
    }



    // Logic for dynamically applying the makeStyles-p-2 class which makes things be crossed out...
    let className = ''
    if(isCompleted) className += ' makeStyles-p-2'



    return (
            <>
            <Modal open={open} onClose={e => setOpen(false)}>
                <div className={classes.paper}>
                    <h1>Change Your TODO &#9989;</h1>
                    <input placeholder={props.todo.todo} value={input} onChange={e => setInput(e.target.value)}/>
                    <Button  onClick={updateTodo}>Update Todo</Button>
                </div>
            </Modal>
            <List className="todo__list">
                <ListItem>
                    <ListItemText className={className} primary="Todos" secondary={props.todo.todo} />
                </ListItem>
                <button className={className} onClick={toggleIsCompleted}>&#9989;</button>
                <button className={className} onClick={e => setOpen(true)}>&#9999;Edit</button>
                <DeleteForeverIcon onClick={deleteForever}/>

            </List>
            </>
    )
}

export default Todo