(function ($) {

  Drupal.behaviors.gm_leafletMap = {
    attach: function (context, settings) {

      // Fetch settings
      var mapSettings = Drupal.settings.gm_leaflet.map;

      // Create Map
      var map = L.map(mapSettings.id, mapSettings.settings).setView([mapSettings.lat, mapSettings.lon], mapSettings.zoom);

      var baseLayers = {};
      var overlayLayers = {};

      // Add base layers
      $.each(mapSettings['base layers'], function(name, layerSettings){
        var layer;
        if (layerSettings.type == 'tile layer') {
          layer = gmLeafletAddTileLayer(name, layerSettings);
        }

        if (mapSettings.baseLayerCount == 1 || mapSettings['default base layer'] == name) {
          layer.addTo(map);
        }

        if (mapSettings.baseLayerCount > 1) {
          baseLayers[layerSettings.name] = layer;
        }
      });

      L.control.layers(baseLayers, overlayLayers).addTo(map);
    }
  };

function gmLeafletAddTileLayer(name, layerSettings) {
  var layer = L.tileLayer(layerSettings['url template'], layerSettings.settings);

  return layer;
}

})(jQuery);
