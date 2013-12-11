(function($) {
  Drupal.gmLeafletDraw = function(map, settings, drawSettings) {
    console.log(map);
    console.log(settings);
    console.log(drawSettings);
    // Initialize the FeatureGroup to store editable layers
    var drawnItems = new L.FeatureGroup();
    drawnItems.addTo(map);

    // Initialize the draw control and pass it the FeatureGroup of editable layers
    var drawControl = new L.Control.Draw({
      draw: {
        position: 'topleft',
        polygon: {
          title: 'Draw a sexy polygon!',
          allowIntersection: false,
          drawError: {
            color: '#b00b00',
            timeout: 1000
          },
          shapeOptions: {
            color: '#bada55'
          },
          showArea: true
        },
        polyline: {
          metric: false
        },
        circle: {
          shapeOptions: {
            color: '#662d91'
          }
        }
      },
      "edit": {
        "featureGroup": drawnItems
      }
    });
    drawControl.addTo(map);

    map.on('draw:created', function (e) {
      //var type = e.layerType,
      layer = e.layer;
      drawnItems.addLayer(layer);
    });
  }
}(jQuery));
