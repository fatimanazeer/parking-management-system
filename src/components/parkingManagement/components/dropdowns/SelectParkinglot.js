import React, { useEffect, useState } from 'react';
import { Select, ConfigProvider } from 'antd';
import { getDatabase, ref, get, child } from 'firebase/database';

const SelectParkinglot = ({ parkingCollectionId, setSelectedParkingLotId }) => {
  const [parkingLotData, setParkingLotData] = useState([]);
  const [isParkingLotAvailable, setIsParkingLotAvailable] = useState(true);

  useEffect(() => {
    const fetchParkingLotData = async () => {
      const db = getDatabase();
     
      const parkingLotsRef = ref(db, `parking/${parkingCollectionId}`);
      
      try {
        const snapshot = await get(parkingLotsRef);
        if (snapshot.exists()) {
          const data = [];
          snapshot.forEach((childSnapshot) => {
            const key = childSnapshot.key;
            const lotData = childSnapshot.val();
            data.push({
              value: key,
              label: lotData.parking_lot_name, 
            });
          });

          setIsParkingLotAvailable(data.length > 0);
          setParkingLotData(data);
        } else {
          setIsParkingLotAvailable(false);
        }
      } catch (error) {
        console.error('Error fetching parking lot data:', error);
      }
    };

    if (parkingCollectionId) {
      fetchParkingLotData();
    }
  }, [parkingCollectionId]);

  const onChange = (value) => {
    console.log(`Selected parking lot ID: ${value}`);
    setSelectedParkingLotId(value);
  };

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
      <Select
        showSearch
        placeholder="Select Parking Lot"
        onChange={onChange}
        style={{ width: 250, height: 50 }}
        options={parkingLotData}
        disabled={!isParkingLotAvailable || !parkingCollectionId}
      />
      {!isParkingLotAvailable && <p className='mt-2'>No parking lots available</p>}
    </ConfigProvider>
  );
};

export default SelectParkinglot;
