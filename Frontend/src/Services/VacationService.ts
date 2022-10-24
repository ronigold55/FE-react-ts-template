import axios from "axios";
import FollowerModel from "../Models/FollowerModel";
import VacationModel from "../Models/VacationModel";
import { VacationAction, VacationActionType, vacationStore } from "../Redux/VacationStates";
import appConfig from "../Utils/Config";

class VacationService {

    public async getAllVacations(): Promise<VacationModel[]> {

        // Take vacations resides in redux global state:
        let vacations = vacationStore.getState().vacations;

        // If we have no vacations in global state - fetch them from server:
        if (vacations.length === 0) {

            // Fetch all vacations from backend:
            const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl);

            // Extract vacations from axios response:
            vacations = response.data;

            // Save fetched vacations in global state:
            const action: VacationAction = { type: VacationActionType.FetchVacations, payload: vacations };
            vacationStore.dispatch(action); // Redux will call vacationsReducer to perform this action.

        }

        // Return vacations:
        return vacations;
    }

    public async getMyVacations(): Promise<VacationModel[]> {

        let vacations = await this.getAllVacations()

        vacations = vacations.filter(el => el.isFollowed);

        // Return vacations:
        return vacations;
    }

    public async getOneVacation(vacationId: number): Promise<VacationModel> {

        let vacation;

        let vacations = vacationStore.getState().vacations;

        if (vacations.length === 0) {

            const response = await axios.get<VacationModel>(appConfig.oneVacationUrl + vacationId);

            vacation = response.data;

        } else {

            vacation = vacations.find(v => v.vacationId === vacationId);
        }
        if (vacation) {
            const response = await axios.get(appConfig.imagesURL + vacation.imageName, { responseType: "blob" });
            vacation['src'] = URL.createObjectURL(response.data);
        }

        return vacation;

    }

    public async AddFollow(vacationId: number): Promise<void> {

        await axios.post<FollowerModel>(`${appConfig.vacationsUrl}${vacationId}/follow`);
        const action: VacationAction = { type: VacationActionType.Follow, payload: vacationId };
        vacationStore.dispatch(action);

    }

    public async deleteFollow(vacationId: number): Promise<void> {

        await axios.delete<FollowerModel>(`${appConfig.vacationsUrl}${vacationId}/unfollow`);
        const action: VacationAction = { type: VacationActionType.UnFollow, payload: vacationId };
        vacationStore.dispatch(action);

    }

    public async updateVacation(vacation: VacationModel): Promise<void> {

        const formData = new FormData();
        formData.append("vacationId", vacation.vacationId.toString());
        formData.append("followersCount", vacation.followersCount.toString());
        formData.append("isFollowed", vacation.isFollowed.toString());
        formData.append("destination", vacation.destination);
        formData.append("description", vacation.description);
        formData.append("arrivalDate", vacation.arrivalDate);
        formData.append("departureDate", vacation.departureDate);
        formData.append("price", vacation.price.toString());
        formData.append("image", vacation.image[0]);
        formData.append("imageName", vacation.imageName);

        const response = await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.vacationId, formData);

        const updatedVacation: VacationModel = response.data;

        const action: VacationAction = { type: VacationActionType.UpdateVacation, payload: updatedVacation };

        vacationStore.dispatch(action);

    }

    public async addVacation(vacation: VacationModel): Promise<void> {

        const formData = new FormData();
        formData.append("destination", vacation.destination);
        formData.append("description", vacation.description);
        formData.append("image", vacation.image[0]);
        formData.append("arrivalDate", vacation.arrivalDate);
        formData.append("departureDate", vacation.departureDate);
        formData.append("price", vacation.price.toString());

        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, formData);

        const addedVacation: VacationModel = response.data;

        const action: VacationAction = { type: VacationActionType.AddVacation, payload: addedVacation };
        vacationStore.dispatch(action);

    }

    public async deleteVacation(vacationId: number): Promise<void> {

        await axios.delete<VacationModel>(appConfig.vacationsUrl + vacationId);

        const action: VacationAction = { type: VacationActionType.DeleteVacation, payload: vacationId };
        vacationStore.dispatch(action);

    }

    public resetVacations() {
        const action: VacationAction = { type: VacationActionType.ResetVacations, payload: '' };
        vacationStore.dispatch(action);
    }

}

const vacationService = new VacationService();

export default vacationService;