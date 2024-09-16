import React from 'react';
import { Card, CardContent, CardActions, Typography, FormControlLabel, Switch } from '@mui/material';
import { ServerType } from '../../types/serverType';
import { updateActive } from '../../api/serverClient';

type props = {
    server: ServerType;
    onStatusToggle: (id: number, newStatus: "active" | "inactive") => void;
};

const ServerCard: React.FC<props> = ({ server, onStatusToggle }) => {
    const handleStatusChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const newStatus = event.target.checked ? 'active' : 'inactive';
        await updateActive(server.id, newStatus);
        onStatusToggle(server.id, newStatus);
    };

    return (
        <Card
            sx={{
                maxWidth: 345,
                margin: 2,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'primary.main',
                '&:hover': {
                    borderColor: 'secondary.main',
                },
            }}
        >
            <CardContent>
                <Typography variant="h5" component="div">
                    {server.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>IP:</strong> {server.ip}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Company:</strong> {server.company_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Status:</strong> {server.status === 'active' ? 'Online' : 'Offline'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Created At:</strong> {new Date(server.created_at).toLocaleString()}
                </Typography>
            </CardContent>
            <CardActions>
                <FormControlLabel
                    control={
                        <Switch
                            checked={server.status === 'active'}
                            onChange={handleStatusChange}
                            color = "primary"
                        />
                    }
                    label={server.status === 'active' ? 'Active' : 'Inactive'}
                />
            </CardActions>
        </Card>
    );
};

export default ServerCard;
