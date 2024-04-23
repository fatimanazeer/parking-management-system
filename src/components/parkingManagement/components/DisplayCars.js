import React, { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { useLocation } from "react-router-dom";
import baseImage1 from "./images/base_image1.png"; 
import { Image, Card, Spin } from "antd";
import './DisplayCars.css'

const DisplayCars = () => {
  const location = useLocation();
  const parkingLotId = location.state?.parkingLotId;
  const parkingCollectionId = location.state?.parkingCollectionId;

  const [carData, setCarData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);  

  useEffect(() => {
    const fetchCars = async () => {
      if (parkingLotId) {
        setIsLoading(true);
        const db = getDatabase();
        const carsRef = ref(db, `parking/${parkingCollectionId}/${parkingLotId}`);
        
        try {
          const snapshot = await get(carsRef);
          if (snapshot.exists()) {
            const cars = [];
            snapshot.forEach((carSnapshot) => {
              cars.push(carSnapshot.val());
            });
            console.log("Fetched car data:", cars);
            setCarData(cars);
          } else {
            console.log("No cars available");
          }
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
  }, [parkingLotId, parkingCollectionId]);

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
              <div className="car">
                <div className="car-image-container" style={{ backgroundColor: car.car_color }}>
                  <Image src={baseImage1} alt={car.car_model} />
                </div>
                <div className="car-info">
                  <div>{car.car_company} {car.car_model}</div>
                  <div>{car.license_plate}</div>
                </div>
              </div>
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
