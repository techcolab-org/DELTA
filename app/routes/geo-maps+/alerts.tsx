import { GeoMapContainer } from '~/frontend/geo_map_wrapper';
import { DynamicSvgIcon } from '~/frontend/components/DynamicSvgIcons';
import '~/frontend/styles/geo-map-wrapper.css';

const alerts = () => {
    return (
        <GeoMapContainer>
            {' '}
            <div className="geo-map-section-title">
                <h1 className="geo-map-section-title-text">Alerts</h1>
            </div>{' '}
            {/* <div
                style={{
                    color: 'white',
                    backgroundColor: 'black',
                    height: '100px',
                    width: '100px',
                }}
            >
                <img src="/assets/icons/add.svg" alt="" style={{ color: 'white' }} />

                <svg aria-hidden="true" focusable="false" role="img">
                    <use href="/assets/icons/add.svg" />
                </svg>
            </div> */}
            {/* <div>this is alert</div> */}
        </GeoMapContainer>
    );
};

export default alerts;
