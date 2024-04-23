import React, { useState } from 'react';
import SelectParkingCollection from '../components/dropdowns/SelectParkingCollection';
import { Button, Carousel } from 'antd';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [selectedParkingLotId, setSelectedParkingLotId] = useState(null);
    const [SelectedParkingCollectionId, setSelectedParkingCollectionId] = useState(null);

    const navigate = useNavigate();
    const [isParkingLotAvailable, setIsParkingLotAvailable] = useState(true);
    
    const handleParkingCollectionSelect = (parkingCollectionId) => {
      console.log("Selected parking collection ID in Home:", parkingCollectionId);
      setSelectedParkingCollectionId(parkingCollectionId);
    };

    const handleShowCars = () => {
        if (!selectedParkingLotId || selectedParkingLotId === '0') {
            console.log("No parking lot selected. Cannot proceed.");
            return;
        }

        console.log("Submit button clicked. Selected parking lot ID:", selectedParkingLotId);
        navigate('/show-cars', { state: { parkingLotId: selectedParkingLotId, parkingCollectionId: SelectedParkingCollectionId } });
    };

    const imageUrl1 = "https://ledlightsdirect.com/cdn/shop/articles/1_88a01236-596e-49f1-a37b-7c548c073a3b.png?v=1697551143";
    const imageUrl2 = "https://www.cooperlighting.com/b-dam/cooper-lighting/product-category/outdoor/garage-canopy-tunnel-landing-page-assets/outdoor-garage-container-6-toptier-2-img.jpg";
    const imageUrl3 = "https://www.xtralight.com/wp-content/uploads/2017/02/parking-garage-lights-scaled.jpg";
    const imageUrl4 = "https://www.victorylightsinc.com/wp-content/uploads/2021/06/parking-garage-lighting-960x540-1.jpeg";

    return (
        <div className='mt-16'>
            <Carousel autoplay>
                <div>
                    <img src={imageUrl1} alt="Parking Garage Lighting" style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
                </div>
                <div>
                    <img src={imageUrl2} alt="Parking Garage Lighting" style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
                </div>
                <div>
                    <img src={imageUrl3} alt="Parking Garage Lighting" style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
                </div>
                <div>
                    <img src={imageUrl4} alt="Parking Garage Lighting" style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
                </div>
            </Carousel>
            <div className="flex flex-col items-center py-16">
                <h2 className="text-4xl font-semibold mb-2 font-body">Search the Cars</h2>
                <div className="flex justify-between items-center mb-8 space-x-4 py-8">
                    <div className="flex-1">
                        <SelectParkingCollection setSelectedParkingLotId={setSelectedParkingLotId} onParkingCollectionSelect={handleParkingCollectionSelect} />
                    </div>
                </div>

                <Button
                    type="primary"
                    style={{ backgroundColor: "#6254B6", width: '150px', height: '50px' }}
                    onClick={handleShowCars}
                    className='font-body'
                    disabled={!isParkingLotAvailable}
                >
                    Search
                </Button>
            </div>
        </div>
    );
}

export default Home;
