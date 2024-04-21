import React, { useEffect, useState } from "react";
import { Image, Card, Spin } from "antd"; 
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../../firebase/firebase";
import { useLocation } from "react-router-dom";

const DisplayCars = () => {
  const location = useLocation();
  const parkingLotId = location.state?.parkingLotId;
  const [carData, setCarData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    const fetchCars = async () => {
      if (parkingLotId) {
        setIsLoading(true); 
        try {
          const q = query(collection(firestore, "parking_cars"), where("parking_lot_id", "==", parkingLotId));
          const querySnapshot = await getDocs(q);
          const data = querySnapshot.docs.map((doc) => doc.data());
          console.log("Fetched car data:", data);
          setCarData(data);
          setIsLoading(false); 
        } catch (error) {
          console.error("Error fetching cars:", error);
          setIsLoading(false); 
        }
      } else {
        setIsLoading(false); 
      }
    };

    fetchCars();
  }, [parkingLotId]);

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: '75px', }}>
        <div className="w-full text-center mb-4">
          <h1 className="font-body text-4xl font-semibold">Total cars in the lot</h1>
        </div>
        {isLoading ? (
          <div className="w-full text-center mt-20">
          <Spin size="large" style={{ color: "#6254B6" }} />
                    </div>
        ) : carData.length > 0 ? (
          carData.map((car, index) => (
            <Card key={index} style={{ width: 300, margin: 16 }}>
              <Image src={car.car_image} alt={car.car_model} />
              <p>{car.car_name}</p>
              <p>{car.car_model}</p>
            </Card>
          ))
        ) : (
          <div className="w-full text-center mt-20">
            <h2 className="font-body">No cars in this lot</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default DisplayCars;
