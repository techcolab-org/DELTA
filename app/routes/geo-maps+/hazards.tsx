import { GeoMapContainer } from '~/frontend/geo_map_wrapper';
import '~/frontend/styles/geo-map-wrapper.css';
import ToggleSwitch from '~/frontend/components/toggle';
import React, { useState } from 'react';
import arrow from '/assets/icons/chevron-up.svg';
import { DynamicSvgIcon } from '~/frontend/components/DynamicSvgIcons';

export type HazardChild = {
    id: string;
    title: string;
    subChildren: string[];
    enabled: boolean;
};

export type HazardItem = {
    title: string;
    icon?: string;
    Children?: HazardChild[];
};

const hazardData: HazardItem[] = [
    {
        title: 'GeoHazards',
        icon: 'geohazard',
        Children: [
            {
                id: '1',
                title: 'Seismogenic (Earthquakes)',
                subChildren: [],
                enabled: false,
            },
            {
                id: '2',
                title: 'Volcanic',
                subChildren: [
                    'Lava Flows and Domes',
                    'Ash',
                    'Pyroclastic Density Currents',
                    'Volcanic Gases & Aerosols',
                    'Lahars',
                ],
                enabled: false,
            },
            {
                id: '3',
                title: 'Other Geohazard',
                subChildren: [],
                enabled: false,
            },
        ],
    },
    {
        title: 'Technological',
        icon: 'technological',
        Children: [],
    },
    {
        title: 'Hydrometeorological',
        icon: 'hydrometerological',
        Children: [],
    },
    { title: 'Biological', icon: 'biological', Children: [] },
    { title: 'Societal', icon: 'societial', Children: [] },
    { title: 'Chemical', icon: 'chemical', Children: [] },
    { title: 'Environmental', icon: 'environmental', Children: [] },
    { title: 'Extraterrestial', icon: 'extraterrestrial', Children: [] },
];

export default function Hazards() {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});
    const [enabled, setEnabled] = useState<Record<string, boolean>>({});

    const toggle = (id: string, title: string) => {
        setEnabled((prev) => ({ ...prev, [id]: !prev[id] }));
        console.log(title);
    };

    const toggleGroup = (title: string) => {
        setExpanded((prev) => ({
            ...prev,
            [title]: !prev[title],
        }));
    };

    return (
        <GeoMapContainer>
            <div className="geo-map-section-title">
                <h1 className="geo-map-section-title-text">Hazards</h1>
            </div>{' '}
            <div className="geo-map-section-children-container">
                {hazardData.map((group) => (
                    <React.Fragment key={group.title}>
                        <div
                            className="geo-map-section-children"
                            onClick={() => toggleGroup(group.title)}
                        >
                            <DynamicSvgIcon name={group.icon ?? ''} />
                            <span className="geo-map-section-children-title">{group.title}</span>
                            <img
                                src={arrow}
                                alt=""
                                style={{
                                    height: '10px',
                                    width: '10px',
                                    cursor: 'pointer',
                                    transform: expanded[group.title]
                                        ? 'rotate(0deg)'
                                        : 'rotate(180deg)',
                                    transition: 'transform 0.2s ease',
                                }}
                            />
                        </div>{' '}
                        {expanded[group.title] && (
                            <div className="geo-map-section-subchildren-container">
                                {group.Children?.map((child) => (
                                    <React.Fragment key={child.id}>
                                        <div
                                            style={{ display: 'flex', gap: 8 }}
                                            className="geo-map-section-subchild"
                                        >
                                            <ToggleSwitch
                                                checked={!!enabled[child.id]}
                                                onChange={() => toggle(child.id, child.title)}
                                            />
                                            <span className="geo-map-section-subchild-title">
                                                {child.title}
                                            </span>
                                        </div>
                                        {enabled[child.id] &&
                                            child.subChildren.length > 0 &&
                                            child.subChildren.map((subChild) => (
                                                <div
                                                    key={subChild}
                                                    style={{ marginLeft: 16 }}
                                                    className="geo-map-section-subchild-category"
                                                >
                                                    <span className="geo-map-section-subchild-category-title">
                                                        {subChild}
                                                    </span>
                                                </div>
                                            ))}
                                    </React.Fragment>
                                ))}
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </GeoMapContainer>
    );
}
