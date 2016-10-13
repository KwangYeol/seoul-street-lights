import mapboxgl from 'mapbox-gl';
import * as d3 from 'd3';

class Viz {
  constructor() {

    mapboxgl.accessToken = 'pk.eyJ1Ijoia3lyeXUiLCJhIjoiY2l1OGZrdWwzMDAwdDJ6bXp1eWVmZXIyOCJ9.xtqlkKtqp65aWQQSXamHfw';

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v9',
      zoom: 12,
      pitch: 80,
      center: [126.983002, 37.519928]
    });

    d3.json('./assets/seoul_temperature_2005.geojson', (error, temperature_data) => {

      d3.json('./assets/seoul_street_light.geojson', (error, street_light_data) => {

        this.map.on('load', () => {

          this.map.addSource('lights', {
            'type': 'geojson',
            'data': street_light_data
          });

          this.map.addLayer({
            'id': 'lights',
            'type': 'circle',
            'source': 'lights',
            'paint': {
              'circle-radius': 2,
              'circle-color': "#F8F89E"
            }
          });

          this.map.addSource('temperature', {
            'type': 'geojson',
            'data': temperature_data
          });

          this.map.addLayer({
            'id': 'temperature',
            'type': 'symbol',
            'source': 'temperature',
            "layout": {
              "text-field": "{MEAN_05}",
              "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
              "text-size": 20
            },
            "paint": {
              "text-color": "#FD8D3C"
            }
          });

        });

      });

    })


    // d3.json('./assets/seoul_temperature_2005.geojson', (error, geojson) => {

    //   this.map.on('load', () => {

    //     this.map.addSource('lights', {
    //       'type': 'geojson',
    //       'data': geojson
    //     });

    //     this.map.addLayer({
    //       'id': 'lights',
    //       'type': 'circle',
    //       'source': 'lights',
    //       'paint': {
    //         'circle-radius': 2,
    //         'circle-color': "#ff6666"
    //       }
    //     });
    //   });
    // })

  }
}

new Viz()
