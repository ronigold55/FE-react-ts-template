export async function sendOrder(order: any) {
    // {id : amount, id: amount}
    // backend:
    // {
    //     "comments": "Don't add sugar",
    //     "productList": [
    //         {"productId": 1, "quantity": 3}, 
    //         {"productId": 2, "quantity": 2}]
    // }

    const orderToSend = [];
    for (const pid of Object.keys( order)) {
        orderToSend.push({ "productId": pid, "quantity": order[pid] });
    }


    
    const data = {"productList": orderToSend, comments: "Don't add sugar",}
    const url = "http://localhost:4000/api/v1/order";
    const res = await fetch(url, { method: 'POST', 
                                    body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyV2l0aG91dFBhc3N3b3JkIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkRhdmlkIiwiZW1haWwiOiJkYXZpZEBnbWFpbC5jb20iLCJpc0FkbWluIjowLCJ0b2tlbiI6IiJ9LCJpYXQiOjE3MjM3MzkwNjZ9.wjMIRFXJnu3XGDJVIT8JNwtU_xod5tv0IS49ru4hbGo"
        }
    });
    
    const resJ = await res.json();
    console.log(resJ);
    
}