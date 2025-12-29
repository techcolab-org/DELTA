import { useState } from 'react';
import '~/frontend/styles/geo-map-wrapper.css';

import arrow from '/assets/icons/chevron-up.svg';
import { DynamicSvgIcon } from './DynamicSvgIcons';
type Tab = 'location' | 'time';

const MapFilter = () => {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});
    const [activeTab, setActiveTab] = useState<Tab>('location');

    const toggleGroup = (title: string) => {
        setExpanded((prev) => ({
            ...prev,
            [title]: !prev[title],
        }));
    };

    const [level1, setLevel1] = useState('All Level 1');
    const [level2, setLevel2] = useState('All Level 2');
    const [level3, setLevel3] = useState('All Level 3');

    const handleSubmit = () => {
        console.log({ level1, level2, level3 });
    };

    const handleRefresh = () => {
        setLevel1('All Level 1');
        setLevel2('All Level 2');
        setLevel3('All Level 3');
    };

    return (
        <div className="map-filter">
            <div className="map-filter-tabs">
                <button
                    className={activeTab === 'location' ? 'active' : ''}
                    onClick={() => setActiveTab('location')}
                >
                    <DynamicSvgIcon name="locationmarker" />
                    <span className="map-filter-tabs-title">Location</span>
                </button>

                <button
                    className={activeTab === 'time' ? 'active' : ''}
                    onClick={() => setActiveTab('time')}
                >
                    <DynamicSvgIcon name="time" />
                    Time
                </button>
            </div>

            {/* Content */}
            {activeTab === 'location' && (
                <div className="map-filter-content">
                    <div
                        className="map-filter-content-title"
                        onClick={() => toggleGroup('location')}
                    >
                        <span>Location</span>
                        <img
                            src={arrow}
                            alt=""
                            style={{
                                height: '15px',
                                width: '15px',
                                transform: expanded['location'] ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.2s ease',
                            }}
                        />
                    </div>
                    {expanded['location'] && (
                        <>
                            <label>Level 1</label>
                            <select value={level1} onChange={(e) => setLevel1(e.target.value)}>
                                <option style={{ color: '#717680' }}>All Level 1</option>
                                <option>Province 1</option>
                                <option>Province 2</option>
                            </select>

                            <label>Level 2</label>
                            <select value={level2} onChange={(e) => setLevel2(e.target.value)}>
                                <option style={{ color: '#717680' }}>All Level 2</option>
                                <option>District A</option>
                                <option>District B</option>
                            </select>

                            <label>Level 3</label>
                            <select value={level3} onChange={(e) => setLevel3(e.target.value)}>
                                <option style={{ color: '#717680' }}>All Level 3</option>
                                <option>Municipality X</option>
                                <option>Municipality Y</option>
                            </select>
                            <button className="submit-btn" onClick={handleSubmit}>
                                <span>Submit</span>
                            </button>

                            <button className="refresh-btn" onClick={handleRefresh}>
                                <span>Refresh</span>
                            </button>
                        </>
                    )}
                </div>
            )}

            {activeTab === 'time' && (
                <div className="map-filter-content">
                    <div className="map-filter-content-title" onClick={() => toggleGroup('time')}>
                        <span>Time</span>
                        <img
                            src={arrow}
                            alt=""
                            style={{
                                height: '15px',
                                width: '15px',
                                transform: expanded['time'] ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.2s ease',
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MapFilter;
