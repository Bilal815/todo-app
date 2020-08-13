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





export default function Todo(props) {
    const [input, setInput] = useState();
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const updateTodo = () => {
        // update the todo with the new input text

        db.collection('todos').doc(props.todo.id).set({
            todo: input,
        }, { merge: true })
        setOpen(false);
        setInput('');
    }

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
                    {/*<ListItemAvatar></ListItemAvatar>*/}
                    <ListItemText className="makeStyles-p-2" primary={"Todos"} secondary={props.todo.todo} />
                </ListItem>
                    <button className={classes.p}>&#9989;</button>
                    <button onClick={e => setOpen(true)}>&#9999;Edit</button>
                <DeleteForeverIcon onClick={e => db.collection('todos').doc(props.todo.id).delete()}/>
            </List>
            </>
    )
}
