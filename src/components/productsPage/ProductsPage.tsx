import React, { useContext, useEffect, useState } from "react";
import { getAllProducts } from "../../client/productApi";
import { AppContext } from "../../App";

type Props = {};

const ProductsPage = () => {
  const [products, setProducts] = useState<any>([]);
  const { setOrder, order } = useContext(AppContext);

  useEffect(() => {
    getAllProducts().then((products_) => {      
      setProducts(products_);
    });
  }, []);

  const handleUpdateOrder = (pid: number, isAdd: boolean = true) => {
    let newOrder = { ...order };
    if (isAdd) {
      newOrder[pid] = (order[pid] || 0) + 1;
    } else {
      newOrder[pid] = (order[pid] || 0) - 1;
    }
    setOrder(newOrder);
  };

  return (
    <div>
      <h1> ProductsPage </h1>
      {/* {console.log(order)} */}
      {products.map((p: any) => {
        return (
          <div key={p.id}>
            <h3> {p.name} </h3>
            <p> {p.price} </p>
            <button onClick={() => handleUpdateOrder(p.id)}> + </button>
            <button
              disabled={order[p.id] == 0 || order[p.id] === undefined}
              onClick={() => handleUpdateOrder(p.id, false)}
            >
              {" "}
              -{" "}
            </button>
            <p> {order[p.id] || 0} </p>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsPage;
