import React from "react"
import { parkTypes } from "../../types/parkTypes"
import "./Park.css";
type Props = {
    park : parkTypes
}

const Park = (props :Props)=>{
    return(
        <div id='park-container'>
            <div id="park-city">{props.park.city}</div>
            <div id="park-street">{props.park.street}</div>
            <div id="park-number">{props.park.number}</div>
            <div id="park-isFree">{props.park.isFree}</div>
            <div id="park-isTaken">{props.park.isTaken}</div>


        </div>
    )
}

export default Park
