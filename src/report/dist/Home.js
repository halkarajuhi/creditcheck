import React, { useState, useEffect } from "react";
import ItemCard from "./ItemCard";
import data from "./data";

const Home = () => {

  const [reporthead, setReporthead] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/reportapi/getdata')
      .then((res) => res.json())
      .then((newdata) => {
        setReporthead(newdata);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);
  return (
    <>
      <h1 className="text-center mt-3">All items</h1>
      <section className="py-4 container">
        <div className="row justify-content-center">
          {reporthead.map((item, index) => {
            return (
              <ItemCard
               price={item.price}
                title={item.heading}
                item={item}
                key={index}
              />
            );
          })}
        </div>
      </section>
    </>
  );
};
export default Home;
