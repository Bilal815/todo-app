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
    let { todo, openModal } = props
    let { id, isCompleted } = todo
    todo = todo.todo

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

    return (<List className="todo__list">
                <ListItem>
                    <ListItemText className={className} primary="Todos" secondary={props.todo.todo} />
                </ListItem>
                <button className={className} onClick={toggleIsCompleted}>&#9989;</button>
                <button className={className} onClick={() => openModal(id)}>&#9999;Edit</button>
                <DeleteForeverIcon onClick={deleteForever}/>
            </List>)
}

export default Todo