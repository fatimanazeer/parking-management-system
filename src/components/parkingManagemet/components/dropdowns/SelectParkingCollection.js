import React, { useEffect, useState } from "react";
import { Select, ConfigProvider } from "antd";
import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "../../../../firebase/firebase";
import SelectParkinglot from "./SelectParkinglot";

const SelectParkingCollection = ({ setSelectedParkingLotId }) => {
  const [parkingData, setParkingData] = useState([]);
  const [selectedParkingCollectionId, setSelectedParkingCollectionId] = useState(null);

  const handleParkingCollectionChange = (value) => {
    console.log("Selected parking collection ID:", value);
    setSelectedParkingCollectionId(value);
  };

  useEffect(() => {
    const fetchParkingData = async () => {
      try {
        const q = query(collection(firestore, "parking_collection"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          value: doc.data().parking_collection_id,
          label: doc.data().parking_collection_name,
        }));
        setParkingData(data);
      } catch (error) {
        console.error("Error fetching parking data:", error);
      }
    };

    fetchParkingData();
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
