import React from "react"
import { serversTypes } from "../types/serversTypes";
import "./Serverlist.css";
import { updateOnLine } from "../api/server";


type Props = {
    server: serversTypes;
    toggleOnline: (id: number) => void;
};

const Serverlist = (props: Props) => {

    const handleChange = async () => {
        try {
            await updateOnLine(props.server.id, !props.server.statusOnline);
            props.toggleOnline(props.server.id);
        } catch (error) {
            console.error('Failed to update server status', error);
        }
    };

    return (
        <div id='server-container'>
            <div id="serverName">({props.server.id}) {props.server.serverName}</div>       
            <div id="server-IP">{props.server.ip}</div>            
            <div id="server-online">{props.server.statusOnline ? "Online" : "not-Online"}</div>

            <div id="toggle-container">
                <label className="switch">
                    <input 
                        type="checkbox:" 
                        checked={!props.server.statusOnline} 
                        onChange={handleChange}
                    />
                    <span className="slider round"></span>
                </label>
            </div>
        </div>
    );
};

export default Serverlist;
