// GeoMapContainer.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from '@remix-run/react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import '~/frontend/styles/geo-map-wrapper.css';
import { GeoIconId, GeoMapIcon } from './geoIcons';
import MapFilter from './components/mapfilter';
import { useMapToolbar } from './components/mapController';
import MapLegend from './components/mapLegend';

interface GeoMapContainerProps {
    children?: React.ReactNode;
}

interface MenuItem {
    title: string;
    svgName: GeoIconId;
    routePath: string;
}

const items: MenuItem[] = [
    {
        title: 'Alerts',
        svgName: 'alert-icon',
        routePath: '/geo-maps/alerts',
    },
    {
        title: 'Hazards',
        svgName: 'hazard-icon',
        routePath: '/geo-maps/hazards',
    },
    {
        title: 'Disaster events',
        svgName: 'disaster-icon',
        routePath: '/geo-maps/disasters',
    },
    {
        title: 'Risks',
        svgName: 'risk-icon',
        routePath: '/geo-maps/risks',
    },
    {
        title: 'Analysis',
        svgName: 'analysis-icon',
        routePath: '/geo-maps/analysis',
    },
    {
        title: 'support',
        svgName: 'support-icon',
        routePath: '/about/support',
    },
    {
        title: 'About',
        svgName: 'about-icon',
        routePath: '/about/about-the-system',
    },
];

export function GeoMapContainer({ children }: GeoMapContainerProps) {
    //left sidebar category selection
    const location = useLocation();
    const [selected, setSelected] = useState(() => location.pathname.split('/').pop() || 'alerts');
    const [map, setMap] = useState<maplibregl.Map>();

    useEffect(() => {
        setSelected(location.pathname.split('/').pop() || 'alerts');
    }, [location]);

    //left sidebar category seperation
    const mainItems = items.filter((item) => !['support', 'About'].includes(item.title));
    const bottomItems = items.filter((item) => ['support', 'About'].includes(item.title));

    //generate map
    const mapRef = useRef<maplibregl.Map | null>(null);
    const mapContainer = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (!mapContainer.current) return;
        const mapInstance = new maplibregl.Map({
            container: mapContainer.current,
            style: 'https://tiles.openfreemap.org/styles/liberty',
            center: [84.127804, 28.395056],
            zoom: 6,
        });
        // mapInstance.addControl(new maplibregl.NavigationControl(), 'top-right');
        mapRef.current = mapInstance;
        setMap(mapInstance);
        return () => mapInstance.remove();
    }, []);

    // Optional: basic nav control
    useMapToolbar(map);

    return (
        <div className="geo-map-wrapper">
            <aside className="geo-map-left-categorybar">
                <div className="geo-map-left-categorybar-item-top">
                    {mainItems.map((item) => (
                        <Link
                            key={item.routePath}
                            to={item.routePath}
                            className={
                                'geo-map-left-category' +
                                (selected === item.routePath.split('/').pop() ? ' active' : '')
                            }
                            onClick={() => setSelected(item.routePath.split('/').pop()!)}
                        >
                            {item.svgName && <GeoMapIcon icon={item.svgName} />}
                            <span className="geo-map-left-categorybar-item-text">{item.title}</span>
                        </Link>
                    ))}
                </div>
                <div className="geo-map-left-categorybar-item-bottom">
                    {bottomItems.map((item) => (
                        <Link
                            key={item.routePath}
                            to={item.routePath}
                            className="geo-map-left-category-bottom"
                        >
                            {item.svgName && <GeoMapIcon icon={item.svgName} />}
                            <span className="geo-map-left-categorybar-item-text">{item.title}</span>
                        </Link>
                    ))}
                </div>
            </aside>

            {/* description about left selection */}
            {children && <div>{children}</div>}

            {/* Map Area */}
            <main className="geo-map-main" style={{ position: 'relative' }}>
                <MapFilter />
                <MapLegend />
                <div ref={mapContainer} className="geo-map-canvas" />
            </main>
        </div>
    );
}
