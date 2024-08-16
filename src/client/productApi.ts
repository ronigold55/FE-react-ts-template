export async function getAllProducts() {
    const url = "http://localhost:4000/api/v1/products";
    const res = await fetch(url, {headers: {Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyV2l0aG91dFBhc3N3b3JkIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkRhdmlkIiwiZW1haWwiOiJkYXZpZEBnbWFpbC5jb20iLCJpc0FkbWluIjowLCJ0b2tlbiI6IiJ9LCJpYXQiOjE3MjM3MzkwNjZ9.wjMIRFXJnu3XGDJVIT8JNwtU_xod5tv0IS49ru4hbGo"}});
    const resJ = await res.json();          
    return resJ; 
}