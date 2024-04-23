import React, { useEffect, useState } from "react";
import { Select, ConfigProvider } from "antd";
import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "../../../../firebase/firebase";
import SelectParkinglot from "./SelectParkinglot";
import { getDatabase, ref, get } from "firebase/database";

const SelectParkingCollection = ({ setSelectedParkingLotId, onParkingCollectionSelect }) => {
  const [parkingData, setParkingData] = useState([]);
  const [selectedParkingCollectionId, setSelectedParkingCollectionId] = useState(null);

  const handleParkingCollectionChange = (value) => {
    console.log("Selected parking collection ID:", value);
    setSelectedParkingCollectionId(value);
    onParkingCollectionSelect(value);
  };

  useEffect(() => {
    const fetchParkingCollections = async () => {
      const db = getDatabase();
      const parkingRef = ref(db, 'parking'); 
      try {
        const snapshot = await get(parkingRef);
        if (snapshot.exists()) {
          const data = [];
          snapshot.forEach((childSnapshot) => {
            const key = childSnapshot.key;
            data.push({ value: key, label: key });
          });
          setParkingData(data);
          console.log(data)
        } else {
          console.log("No parking collections available");
        }
      } catch (error) {
        console.error("Error fetching parking collections:", error);
      }
    };
  
    fetchParkingCollections();
  }, []);
  

  return (
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
      <div className="space-x-4">
        <Select
          placeholder="Select Parking Collection"
          onChange={handleParkingCollectionChange}
          optionFilterProp="children"
          className="w-60 h-12 mb-4"
          options={parkingData}
        />
        {selectedParkingCollectionId && (
          <SelectParkinglot
            parkingCollectionId={selectedParkingCollectionId}
            setSelectedParkingLotId={setSelectedParkingLotId}
          />
        )}
      </div>
    </ConfigProvider>
  );
};

export default SelectParkingCollection;
