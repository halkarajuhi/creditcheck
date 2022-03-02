import React,{useEffect,useState ,createContext} from "react";



// export default React.createContext({
//   products: [
//     { id: "p1", title: "Gaming Mouse", price: 29.99 },
//     { id: "p2", title: "Harry Potter 3", price: 9.99 },
//     { id: "p3", title: "Used plastic bottle", price: 0.99 },
//     { id: "p4", title: "Half-dried plant", price: 2.99 }
//   ],
//   cart: [],
//   addProductToCart: product => {},
//   removeProductFromCart: productId => {}
// });


export default  ShopContext  = createContext({
  my_data: {} // Initial value
});

export  function ShopContext(props)   {
  const [my_data, setMyData] = useState({});

    useEffect(() => {

      fetch('http://localhost:5000/reportapi/getdata')
      .then((res) => res.json())
      .then((newdata) => {
        setMyData(newdata);
        console.log(newdata)
      })
      .catch((err) => {
        console.log(err);
      });
      
    }, []);
  
  return (
      <ShopContext.Provider
          value={{
              my_data
          }}
      >
          {props.children}
      </ShopContext.Provider>
  );
};

  

