import React from 'react'
import { ParkType } from '../../types/parkType'
import "./Park.css";
import { updateOccupied } from '../../api/park-client';

type Props = {
    park: ParkType;
    fetchParks: (updateFiltered?: boolean)=>{};
}

const Park = (props: Props) => {

    const handleToggle = async ()=>{
        await updateOccupied(props.park.id, !props.park.isOccupied)
        await props.fetchParks(false)  // todo: fetch only specific park by ID for efficiency
    }

    return (
        <div id='park-container'>
            <div id='park-city'> ({props.park.id}): {props.park.city}</div>
            <div id='park-street'> {props.park.street}</div>
            <div id='park-num'> {props.park.num}</div>
            {props.park.isFree && <div id='park-isfree'> free of charge</div>}
            <div id='park-isoccupied'> {props.park.isOccupied ? "תפוס" : "פנוי"}</div>

            <div id='toggle-container'>
                <label className="switch">
                    <input type="checkbox" checked={props.park.isOccupied} onChange={handleToggle} />
                    <span className="slider round"></span>
                </label>
            </div>
        </div>
    )
}

export default Park