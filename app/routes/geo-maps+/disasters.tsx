import React from 'react';
import { GeoMapContainer } from '~/frontend/geo_map_wrapper';
const DisasterEvents = () => {
    return (
        <GeoMapContainer>
            {' '}
            <div className="geo-map-section-title">
                <h1 className="geo-map-section-title-text">Disaster</h1>
            </div>{' '}
            {/* <div>this is alert</div> */}
        </GeoMapContainer>
    );
};

export default DisasterEvents;
