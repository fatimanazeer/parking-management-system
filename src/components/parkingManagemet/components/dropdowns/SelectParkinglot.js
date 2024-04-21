import React, { useEffect, useState } from 'react';
import { Select, ConfigProvider } from 'antd';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../../../../firebase/firebase';

const SelectParkinglot = ({ parkingCollectionId, setSelectedParkingLotId }) => {
  const [parkingLotData, setParkingLotData] = useState([]);
  const [isParkingLotAvailable, setIsParkingLotAvailable] = useState(true);

  useEffect(() => {
    const fetchParkingLotData = async () => {
      try {
        const q = query(collection(firestore, 'parking_lot'), where('parking_collection_id', '==', parkingCollectionId));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          value: doc.data().parking_lot_id,
          label: doc.data().parking_lot_name,
        }));

        if (data.length === 0) {
          setIsParkingLotAvailable(false);
        } else {
          setIsParkingLotAvailable(true);
        }

        setParkingLotData(data);
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
          colorPrimary: '#4F46E5',
          borderRadiusBase: '0.5rem',
          colorBorder: '#D1D5DB',
          colorPrimaryHover: '#4F46E5',
          boxShadowBase: '0 1px 2px rgba(0, 0, 0, 0.05)',
        },
      }}
    >
      <Select
        showSearch
        placeholder="Select Parking Lot"
        onChange={onChange}
        style={{ width: 250, height: 50 }}
        options={parkingLotData}
        disabled={!parkingCollectionId}
      />
      {!isParkingLotAvailable && <p className='mt-2'>No parking lots available</p>}
    </ConfigProvider>
  );
};

export default SelectParkinglot;
