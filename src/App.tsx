import { createContext, useState } from "react";
import ProductsPage from "./components/productsPage/ProductsPage";
import { sendOrder } from "./client/orderApi";

export const AppContext = createContext<any>(null)

function App() {

    const [order, setOrder] = useState([])
    const handleSend =  ()=>{
        sendOrder(order);
    }
    return (
        <AppContext.Provider value={{order, setOrder}}>
            <h1> Hello My Store</h1>
            <button onClick={handleSend}> send order </button>
            <ProductsPage/>
        </AppContext.Provider>        
    );
}

export default App;
