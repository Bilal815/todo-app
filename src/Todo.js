import React from 'react';
import './Todo.css'
import {
    List, 
    ListItem, 
    ListItemText, 
    makeStyles
} from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import db from './firebase';


const Todo = props => {

    // Extracting the following info from props...Making it easier to reference the values...
    let { todo, openModal, toggleIsCompleted } = props
    let { id, isCompleted } = todo
    todo = todo.todo

    const toggleCompleted = () => {
        toggleIsCompleted(id, isCompleted)
    }

    const deleteForever = () => {
        db.collection('todos').doc(id).delete()
    }

    // Logic for dynamically applying the makeStyles-p-2 class which makes things be crossed out...
    let className = ''
    if(isCompleted) className += ' isComplete'

    return (<List className="todo__list">
                <ListItem>
                    <ListItemText className={className} primary="Todos" secondary={props.todo.todo} />
                </ListItem>
                <button className={className} onClick={toggleCompleted}>&#9989;</button>
                <button className={className} onClick={() => openModal(id)}>&#9999;Edit</button>
                <DeleteForeverIcon onClick={deleteForever}/>
            </List>)
}

export default Todo