export interface legendType {
    id: string;
    title: string;
    color: string;
}

export const hazardsTypeData = [
    {
        id: 'meteorological_hydrological',
        title: 'Meteorological & Hydrological',
        color: '#278C37',
    },
    {
        id: 'extraterrestrial',
        title: 'Extraterrestrial',
        color: '#E26020',
    },
    {
        id: 'geological',
        title: 'Geological',
        color: '#B01026',
    },
    {
        id: 'environmental',
        title: 'Environmental',
        color: '#152856',
    },
    {
        id: 'chemical',
        title: 'Chemical',
        color: '#093E81',
    },
    {
        id: 'biological',
        title: 'Biological',
        color: '#000000',
    },
    {
        id: 'technological',
        title: 'Technological',
        color: '#C78F21',
    },
    {
        id: 'societal',
        title: 'Societal',
        color: '#861476',
    },
];

const MapLegend = () => {
    return (
        <div className="legend-container">
            <div className="legend-title">Hazard Type</div>
            <div>
                {hazardsTypeData.map((item) => (
                    <div key={item.id} className="legend-description">
                        <div
                            style={{
                                width: '25px',
                                height: '9px',
                                backgroundColor: item.color,
                            }}
                        ></div>
                        <div className="legend-description-title">{item.title}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MapLegend;
