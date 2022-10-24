import React, { Suspense, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import VacationModel from '../../../Models/VacationModel';
import authService from '../../../Services/AuthService';
import notifyService from '../../../Services/NotifyService';
import vacationService from '../../../Services/VacationService';
import VacationCard from '../VacationCard/VacationCard';
// import {Coin} from '../../interface'
import AppPagination from "./pagination";
// const CoinTable = lazy(() => import('../../components/CoinData/CoinTable'))



function VacationsPage(): JSX.Element {
    //   const [coinsData, setCoinsData] = useState<Coin[]>([])
    
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);


    const handlePrevPage = (prevPage: number) => {
        setPage(prevPage => prevPage - 1);
    };

    const handleNextPage = (nextPage: number) => {
        setPage(nextPage => nextPage + 1);
    };

    // const fetchData = async () => {
    //     const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets? 
    //   vs_currency=usd&order=market_cap_desc&?${page}&per_page=10&sparkline=false`)
    //     const result = await response.json()
    //     //   setCoinsData(result); 
    //     setTotalPages(totalPages);
    // }

    useEffect(() => {
        if (!authService.isLoggedIn()) {
            navigate("/off-logout");
            return;
        } else {
            vacationService.getAllVacations()
                .then(vacations => {
                    setVacations(vacations) 
                    setTotalPages(totalPages)})
                .catch(err => notifyService.error(err));
        }

    }, [])


    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                {/* <table className="table" width="80%">
                    <thead>
                        <tr>
                            <th>Cryptocurrencies</th>
                            <th>Price</th>
                            <th>24H Change</th>
                            <th>Market Cap</th>
                        </tr>
                    </thead>
                </table> */}
                {/* {coinsData.map((coin)=>
         <CoinTable key={coin.id}
               {...coin}
                />
          )} */}
           {vacations.map(v => <VacationCard key={v.vacationId} vacation={v} />)}
           
                <AppPagination
                    totalPages={totalPages}
                    currentPage={page}
                    handlePrevPage={handlePrevPage}
                    handleNextPage={handleNextPage}
                />
            </Suspense>
        </>
    )
}

export default VacationsPage;

// const [followersVacations, setFollowersVacations] = useState<VacationModel[]>([]);

// const handleCheckboxChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setChecked(event.target.checked)
// }
// \\
// setFollowersVacations(vacations.filter( (v) => {return v.isFollowed === true } ) )