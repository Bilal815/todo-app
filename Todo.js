import React from 'react'

export default function Todo(props) {
    return (
        <div>
            <List className="todo__list">
            <ListItem>
                <ListItemAvatar>
                </ListItemAvatar>
                <ListItemText primary="Todos" secondary={props.text} />
            </ListItem>
            </List>
        </div>
    )
}
