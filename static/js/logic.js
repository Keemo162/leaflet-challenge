

const map = L.map('map').setView([39.74739, -105], 2);

	const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 10,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);

d3.json ("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson")
    .then((data) => 
        {console.log(data)

            function onEachFeature(feature, layer) {
                let popupContent = `<p>This is my depth ${feature.geometry.coordinates[2]}</p>`;
        
                if (feature.properties && feature.properties.title) {
                    popupContent += feature.properties.title;
                }
        
                layer.bindPopup(popupContent);
            }


            L.geoJSON([data], {

                onEachFeature,



                pointToLayer(feature, latlng) {
                    return L.circleMarker(latlng, {
                        radius: 4 * feature.properties.mag,
                        fillColor: '#ff7800',
                        color: '#000',
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.8
                    });
                }

            }).addTo(map);

        })