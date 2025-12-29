import { useEffect } from 'react';
import type { Map } from 'maplibre-gl';
import maplibregl from 'maplibre-gl';
import '~/frontend/styles/geo-map-wrapper.css';

export function useMapToolbar(map: Map | undefined) {
    useEffect(() => {
        if (!map) return;

        //SCALE CONTROL
        const scale = new maplibregl.ScaleControl({
            maxWidth: 80,
            unit: 'metric',
        });
        map.addControl(scale, 'bottom-right');

        let userMarker: maplibregl.Marker | null = null;

        //CUSTOM TOOLBAR
        const control = {
            onAdd() {
                const container = document.createElement('div');
                container.className = 'maplibre-custom-toolbar';

                container.innerHTML = `
          <div class="top-actions">
            <button class="btn btn-add" type="button"> 
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1z" fill="white"/></svg>  
            Add Event</button>
            <button class="btn btn-compare" type="button">
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.83496 0.835022V15.835M2.50163 0.835022H14.1683C15.0888 0.835022 15.835 1.58121 15.835 2.50169V14.1684C15.835 15.0888 15.0888 15.835 14.1683 15.835H2.50163C1.58115 15.835 0.834961 15.0888 0.834961 14.1684V2.50169C0.834961 1.58121 1.58115 0.835022 2.50163 0.835022Z" stroke="white" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            Compare</button>
          </div>

          <div class="map-actions-container">
            <div class="map-actions">
              <div type="button" data-action="locate" title="My location">
                <svg width="18" height="22" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 10C8.55 10 9.02083 9.80417 9.4125 9.4125C9.80417 9.02083 10 8.55 10 8C10 7.45 9.80417 6.97917 9.4125 6.5875C9.02083 6.19583 8.55 6 8 6C7.45 6 6.97917 6.19583 6.5875 6.5875C6.19583 6.97917 6 7.45 6 8C6 8.55 6.19583 9.02083 6.5875 9.4125C6.97917 9.80417 7.45 10 8 10ZM8 17.35C10.0333 15.4833 11.5417 13.7875 12.525 12.2625C13.5083 10.7375 14 9.38333 14 8.2C14 6.38333 13.4208 4.89583 12.2625 3.7375C11.1042 2.57917 9.68333 2 8 2C6.31667 2 4.89583 2.57917 3.7375 3.7375C2.57917 4.89583 2 6.38333 2 8.2C2 9.38333 2.49167 10.7375 3.475 12.2625C4.45833 13.7875 5.96667 15.4833 8 17.35ZM8 20C5.31667 17.7167 3.3125 15.5958 1.9875 13.6375C0.6625 11.6792 0 9.86667 0 8.2C0 5.7 0.804167 3.70833 2.4125 2.225C4.02083 0.741667 5.88333 0 8 0C10.1167 0 11.9792 0.741667 13.5875 2.225C15.1958 3.70833 16 5.7 16 8.2C16 9.86667 15.3375 11.6792 14.0125 13.6375C12.6875 15.5958 10.6833 17.7167 8 20Z" fill="white"/>
                </svg>
              </div>
            </div>

            <div class="map-actions">
              <div type="button" data-action="zoom-in"><img src=${'/assets/geo_icons/add_white.svg'} /></div>
              <div type="button" data-action="zoom-out">－</div>
              <div type="button" data-action="reset"><img src=${'/assets/geo_icons/recenter.svg'} /></div>
              <div type="button" data-action="share"><img src=${'/assets/geo_icons/share.svg'} /></div>
              <div type="button" data-action="refresh"><img src=${'/assets/geo_icons/refresh.svg'} /></div>
              <div type="button" data-action="print"><img src=${'/assets/geo_icons/printer.svg'} /></div>
            </div>
          </div>
        `;

                container.addEventListener('click', (e) => {
                    const button = (e.target as HTMLElement).closest('div');
                    if (!button) return;

                    const action = button.dataset.action;
                    if (!action) return;

                    switch (action) {
                        case 'locate':
                            locateUser();
                            break;

                        case 'zoom-in':
                            map.zoomIn({ duration: 200 });
                            break;

                        case 'zoom-out':
                            map.zoomOut({ duration: 200 });
                            break;

                        case 'reset':
                            map.easeTo({
                                center: [85.324, 27.7172],
                                zoom: 7,
                                bearing: 0,
                                pitch: 0,
                                duration: 500,
                            });
                            break;

                        case 'refresh':
                            map.triggerRepaint();
                            break;

                        case 'print':
                            window.print();
                            break;
                    }
                });

                return container;
            },
            onRemove() {},
        };

        // LOCATE FUNCTION
        function locateUser() {
            if (!navigator.geolocation) {
                alert('Geolocation is not supported by your browser.');
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude, accuracy } = position.coords;
                    const lngLat: [number, number] = [longitude, latitude];

                    // Fly to location
                    map?.easeTo({
                        center: lngLat,
                        zoom: 14,
                        duration: 2000,
                    });

                    // Marker
                    if (!userMarker && map) {
                        userMarker = new maplibregl.Marker({ color: '#2E7CF6' })
                            .setLngLat(lngLat)
                            .addTo(map);
                    } else {
                        userMarker?.setLngLat(lngLat);
                    }
                    // addAccuracyCircle(lngLat, accuracy);
                },
                (err) => {
                    alert('Unable to retrieve your location.');
                    console.error(err);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                },
            );
        }

        // ---- ACCURACY CIRCLE ----
        // function addAccuracyCircle(center: [number, number], accuracy: number) {
        //     const sourceId = 'user-location-accuracy';

        //     if (map?.getSource(sourceId)) {
        //         (map?.getSource(sourceId) as maplibregl.GeoJSONSource).setData({
        //             type: 'Feature',
        //             geometry: {
        //                 type: 'Point',
        //                 coordinates: [0, 0],
        //             },
        //             properties: {},
        //         });
        //         return;
        //     }

        //     map?.addSource('user-location', {
        //         type: 'geojson',
        //         data: {
        //             type: 'Feature',
        //             geometry: {
        //                 type: 'Point',
        //                 coordinates: [0, 0],
        //             },
        //             properties: {},
        //         },
        //     });

        //     map?.addLayer({
        //         id: 'user-location-circle',
        //         type: 'circle',
        //         source: sourceId,
        //         paint: {
        //             'circle-radius': [
        //                 'interpolate',
        //                 ['exponential', 1.75],
        //                 ['zoom'],
        //                 12,
        //                 4,
        //                 22,
        //                 180,
        //             ],
        //             'circle-color': '#2E7CF6',
        //             'circle-opacity': 0.15,
        //         },
        //     });
        // }

        map.addControl(control as any, 'bottom-right');

        return () => {
            map.removeControl(control as any);
            if (userMarker) userMarker.remove();
            // map.removeControl(scale);
        };
    }, [map]);
}
