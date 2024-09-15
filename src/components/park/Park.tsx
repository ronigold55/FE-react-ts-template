import React from "react"
import { parkTypes } from "../../types/parkTypes"
import "./Park.css";
import { updateOccupied } from "../../api/park-client";
type Props = {
    park: parkTypes
    toogleTaken: any
}

const Park = (props: Props) => {




    return (
        <div id='park-container'>
            <div id="park-city">{props.park.city}</div>
            <div id="park-street">{props.park.street}</div>

            <div id="park-number">{props.park.number}</div>
            <div id="park-isFree">{props.park.isFree ? "free of charge" : "with charge"} </div>
            <div id="park-isTaken">{props.park.isTaken ? "not available" : "available"}</div>

            <div id="toggle-container">
                <label className="switch">
                    <input type="checkbox" checked={props.park.isTaken} onChange={
                        async () => {
                            await updateOccupied(props.park.id, !props.park.isTaken);
                            // alert("dan")
                            // window.location.reload();
                            props.toogleTaken(props.park.id)
                        }
                    } />
                    {/* <input type="checkbox" /> */}
                    <span className="slider round"></span>
                </label>

            </div>


        </div>
    )
}


export default Park
