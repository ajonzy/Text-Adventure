import React from 'react'

export default function roomOne(props) {
    return (
        <div>
            <p>You try to open the door, but it is locked...</p>
            <hr/>
            <button onClick={() => props.updateRoom(0)}>Darn :(</button>
        </div>
    )
}