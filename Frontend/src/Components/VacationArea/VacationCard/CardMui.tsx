import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from 'react';
import VacationModel from '../../../Models/VacationModel';
import { vacationStore } from '../../../Redux/VacationStates';
import appConfig from '../../../Utils/Config';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import "./CardMui.css";
import { NavLink, useNavigate } from 'react-router-dom';
import vacationService from '../../../Services/VacationService';
import notifyService from '../../../Services/NotifyService';


interface VacationCardProps {
    vacation: VacationModel
}


function RecipeReviewCard(props: VacationCardProps): JSX.Element {

    const [vacation, setVacation] = useState<VacationModel>();
    const navigate = useNavigate();

    function convertDate(date: string): string {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    }

    useEffect(() => {
        const selectedVacation = vacationStore.getState().vacations.find(v => v.vacationId === props.vacation.vacationId);
        setVacation(selectedVacation);

        const unsubscribe = vacationStore.subscribe(() => {
            console.log(props.vacation.vacationId);

            const newVacation = { ...vacationStore.getState().vacations.find(v => v.vacationId === props.vacation.vacationId) };
            setVacation(newVacation);
        });
        return () => {
            unsubscribe();
        }
    }, []);

    async function deleteVacation(vacationId: number) {
        try {
            const iAmSure = window.confirm("Are you sure you want to delete this vacation?");
            if (!iAmSure) return;

            await vacationService.deleteVacation(vacationId);
            notifyService.success("Vacation has been deleted");
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err)
        }
    }


    return (
        <div className="VacationCard">
            {vacation && <>
                <Card sx={{ maxWidth: 345 }} className="Card">
                    <CardHeader
                        title={vacation.destination}
                        subheader={`${convertDate(vacation.arrivalDate)} - ${convertDate(vacation.departureDate)}`}
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        image={`${appConfig.imagesURL}${vacation.imageName}`}
                        alt="Paella dish"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {vacation.description}
                            <br />
                            Price: ${vacation.price}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton  aria-label="edit">
                            <NavLink to={`/vacations/edit/${vacation.vacationId}`}><EditIcon color="secondary" /></NavLink>
                        </IconButton>
                        <IconButton aria-label="delete" color="secondary" onClick={() => { deleteVacation(vacation.vacationId) }}>
                            <DeleteIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            </>}
        </div>
    );
}

export default RecipeReviewCard;
