class Config {
    public authUrl = "http://localhost:3001/api/auth";
    public vacationsUrl = "http://localhost:3001/api/vacations/";
    public oneVacationUrl = "http://localhost:3001/api/vacation-by-id/";
    public vacationsByUserIdUrl = "http://localhost:3001/api/vacations-by-user/";
    public imagesURL = "http://localhost:3001/api/images/";
}

const appConfig = new Config();

export default appConfig;
