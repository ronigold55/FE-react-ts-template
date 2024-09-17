import React, { useState, useEffect } from 'react';
import { fetchAllServers } from '../../api/serverClient';
import { ServerType } from '../../types/serverType';
import ServerCard from '../ServerCard/ServerCard';
import { FormControlLabel, Switch, Box, Grid } from '@mui/material';
import "./ServerList.css"

const ServerList: React.FC = () => {
    const [servers, setServers] = useState<ServerType[]>([]);
    const [filteredServers, setFilteredServers] = useState<ServerType[]>([]);
    const [onlyActive, setOnlyActive] = useState<boolean>(false);
    const [sortByRecent, setSortByRecent] = useState<boolean>(false);

    useEffect(() => {
        const getServers = async () => {
            const data = await fetchAllServers();
            if (data) {
                setServers(data);
                setFilteredServers(data);
            }
        };

        getServers();
    }, []);

    useEffect(() => {
        let updatedServers = [...servers];
        if (onlyActive) {
            updatedServers = updatedServers.filter(server => server.status === 'active');
        }
        if (sortByRecent) {
            updatedServers = updatedServers.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        }
        setFilteredServers(updatedServers);
    }, [onlyActive, sortByRecent, servers]);

    const handleStatusToggle = (id: number, newStatus: "active" | "inactive") => {
        setServers(prevServers =>
            prevServers.map(server =>
                server.id === id ? { ...server, status: newStatus } : server
            )
        );
    };

    return (
        <div className="server-list">
            <Box sx={{ mb: 2 }}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={onlyActive}
                            onChange={(e) => setOnlyActive(e.target.checked)}
                        />
                    }
                    label="Show Only Active Servers"
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={sortByRecent}
                            onChange={(e) => setSortByRecent(e.target.checked)}
                        />
                    }
                    label="Sort by Most Recent"
                />
            </Box>
            <Grid container spacing={2} sx={{ mb: 2 }}>
                {filteredServers.map(server => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={server.id}>
                        <ServerCard
                            server={server}
                            onStatusToggle={handleStatusToggle}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default ServerList;