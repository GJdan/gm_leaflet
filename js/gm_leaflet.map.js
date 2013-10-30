(function ($) {

  Drupal.behaviors.gm_leafletMap = {
    attach: function (context, settings) {

      // Fetch settings
      var mapSettings = Drupal.settings.gm_leaflet.map;

      // Create Map
      var map = L.map(mapSettings.id, mapSettings.settings).setView([mapSettings.lat, mapSettings.lon], mapSettings.zoom);

      // Add base layers
      $.each(mapSettings['base layers'], function(name, layer){
        var layer;
        if (layer.type == 'tile layer') {
          layer = gmLeafletAddTileLayer(name, layer);
        }

        layer.addTo(map);
      });
    }
  };

function gmLeafletAddTileLayer(name, layer) {
  var layer = L.tileLayer(layer['url template'], layer.settings);

  return layer;
}

})(jQuery);
