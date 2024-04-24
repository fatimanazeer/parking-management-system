import React, { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { useLocation } from "react-router-dom";
import baseImage1 from "./images/base_image1.png";
import { Image, Card, Spin, Input } from "antd";
import './DisplayCars.css';
import { ConfigProvider } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import { FaCarSide } from 'react-icons/fa';

const DisplayCars = () => {
  const location = useLocation();
  const parkingLotId = location.state?.parkingLotId;
  const parkingCollectionId = location.state?.parkingCollectionId;

  const [carData, setCarData] = useState([]);
  const [filteredCarData, setFilteredCarData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
            setFilteredCarData(cars);
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

  useEffect(() => {
    if (searchQuery !== "") {
      const filteredData = carData.filter(car =>
        car.license_plate.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCarData(filteredData);
    } else {
      setFilteredCarData(carData);
    }
  }, [searchQuery, carData]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: '75px' }}>
        <div className="w-full text-center mb-4">
          <h1 className="font-body text-4xl font-semibold">Total cars in the lot</h1>

        </div>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#4F46E5",
              borderRadiusBase: "0.5rem",
              colorBorder: "#D1D5DB",
              colorPrimaryHover: "#4F46E5",
              boxShadowBase: "0 1px 2px rgba(0, 0, 0, 0.05)",
            },
          }}
        >
          <div className="w-full ml-12 mb-2">
            <Input
              placeholder="Search by number plate"
              value={searchQuery}
              className="w-60 h-12"
              onChange={handleSearchChange}
              style={{ width: '300px', marginBottom: '20px', justifyContent: 'start' }}
              prefix={<SearchOutlined />}
            />
          </div>
        </ConfigProvider>
        {isLoading ? (
          <div className="w-full text-center mt-20">
            <Spin size="large" style={{ color: "#6254B6" }} />
          </div>
        ) : filteredCarData.length > 0 ? (
          filteredCarData.map((car, index) => (
            <Card key={index} style={{ width: 300, margin: 16,  }}>
            <div className="car"  style={{ backgroundColor: '#e5e3d7' }}>
              <div className="car-image-container" style={{ color: car.car_color }}>
                <FaCarSide size={70} />
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
            <h2 className="font-body">No cars found</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default DisplayCars;
