import React from 'react';
import './Todo.css'
import {List, ListItem, ListItemAvatar, ListItemText} from '@material-ui/core'

export default function Todo(props) {
    return (
        <div>
            <List className="todo__list">
            <ListItem>
                <ListItemAvatar>
                </ListItemAvatar>
                <ListItemText primary="Todos" secondary="dummy deadline" />
            </ListItem>
            </List>
        </div>
    )
}
