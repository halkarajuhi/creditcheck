import React from "react";
import { useCart } from "react-use-cart";
import Navbar from "../../common/header/Navbar";
import Sidebar from "../../common/header/Sidebar";
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const navigate = useNavigate();

  const {
    //الاسماء دي جاهزة في اليوز كارت كل اسم بيدل علي اللي بيعمله
    isEmpty,
    //دي العدد للمنتج الواحد
    totalUniqueItems,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart
  } = useCart();
  const buy = () => {
    navigate("/payment")
  };

  return (
    <div className="sb-nav-fixed">

            <Navbar  totalItems = {totalItems}/>
            <div id="layoutSidenav">
                <Sidebar />
                <div id="layoutSidenav_content">
                    <div className="pt-4 pb-5 px-4">
                    {(isEmpty) ? <h1 className="text-center"> Your cart isEmpty </h1>:
                    <section className="container">

      <div className="row jistufy-content-center">
    
    
        <div className="col-12">
          <h5>
            {" "}
            Cart ({totalUniqueItems}) total Item :({totalItems})
          </h5>
          <table className="table table-light m-0">
            <tbody>
              {items.map((item, index) => {
                return (
                  <tr key={index}>
                   
                    <td>{item.heading}</td>

                    <td>{item.price}</td>

                    <td>Quantity({item.quantity})</td>

                    <td>
                     
                     
                      <button
                        onClick={() => removeItem(item.id)}
                        className="btn btn-danger ms-2"
                      >
                        {" "}
                        RemoveItem{" "}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="col-auto ms-auto">
            <h2> total price: {cartTotal} EGP</h2>
          </div>
        </div>
        <div className="col-auto mb-2">
          <button onClick={() => emptyCart()} className="btn btn-danger ms-2">
            Clear Cart
          </button>
          <button onClick={buy} className="btn btn-primary ms-2">
            Buy Now{" "}
          </button>
        </div>
      
      </div>
    </section>
      }
      
                    </div>
                </div>


            </div>


        </div>



    
  );
};

export default Cart;
