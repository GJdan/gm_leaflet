(function ($) {

  Drupal.behaviors.gm_leafletMap = {
    attach: function (context, settings) {

      // Fetch settings
      var mapSettings = Drupal.settings.gm_leaflet.map;

      // Create Map
      var map = L.map(mapSettings.id, mapSettings.settings);

      if (mapSettings.zoomToLayer) {
        if (mapSettings['overlay layers'][mapSettings.zoomToLayer].data.setView.boundingBox) {
          bBox = mapSettings['overlay layers'][mapSettings.zoomToLayer].data.setView.boundingBox;
          map.fitBounds([[bBox.miny, bBox.minx], [bBox.maxy, bBox.maxx]]);
        } else if (mapSettings['overlay layers'][mapSettings.zoomToLayer].data.setView.centroid) {
          view = mapSettings['overlay layers'][mapSettings.zoomToLayer].data.setView
          map.setView([view.centroid.lat, view.centroid.lon], view.zoom);
        }
      } else {
        map.setView([mapSettings.lat, mapSettings.lon], mapSettings.zoom);
      }

      var baseLayers = {};
      var overlayLayers = {};

      // Add base layers
      $.each(mapSettings['base layers'], function(name, layerSettings) {
        var layer;

        if (layerSettings.type == 'tile layer') {
          layer = gmLeafletAddTileLayer(name, layerSettings);
        } else if (layerSettings.type == 'wms') {
          layer = gmLeafletAddWMS(name, layerSettings);
        }

        if (mapSettings.baseLayerCount == 1 || mapSettings['default base layer'] == name) {
          layer.addTo(map);
        }

        if (mapSettings.baseLayerCount > 1) {
          baseLayers[layerSettings.name] = layer;
        }
      });

      // Add overlay layers
      $.each(mapSettings['overlay layers'], function(name, layerSettings) {
        var layer = L.featureGroup();

        // If the data is GeoJSON we may have to prepare it for the leaflet constructor...
        if (layerSettings.type == 'GeoJSON') {
          gmLeafletAddGeoJSONLayer(name, layerSettings, layer);
        }

        if (!mapSettings['enabled overlay layers'] || $.inArray(name, mapSettings['enabled overlay layers']) != -1) {
          layer.addTo(map);
        }
        if (!mapSettings['switcher overlay layers'] || $.inArray(name, mapSettings['switcher overlay layers']) != -1) {
          overlayLayers[layerSettings.name] = layer;
        }
      });

      L.control.layers(baseLayers, overlayLayers).addTo(map);
    }
  };

  function gmLeafletAddTileLayer(name, layerSettings) {
    var layer = new L.TileLayer(layerSettings['url template'], layerSettings.settings);

    return layer;
  }

  function gmLeafletAddWMS(name, layerSettings) {
    var layer = new L.TileLayer.WMS(layerSettings.url, layerSettings.settings);

    return layer;
  }

  function gmLeafletAddGeoJSONLayer(layerName, layerSettings, layer) {
    $.each(layerSettings.data.features, function(i, featureSettings) {
      var geom;

      // @todo Add conditions for object and file.
      if (layerSettings.format == 'text') {
        geom = JSON.parse(featureSettings.data);
      };
      markerOptions = {
        radius: 5,
        fillColor: '#03f',
        color: '#03f',
        weight: 5,
        opacity: 0.5,
        fillOpacity: 0.2
      };

      if (featureSettings.settings.style && featureSettings.settings.style.color) {
        markerOptions.fillColor = featureSettings.settings.style.color;
        markerOptions.color = featureSettings.settings.style.color;
      }

      jsonOptions = {
        pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, markerOptions);
        }
      };
      $.extend(jsonOptions, featureSettings.settings);

      var feature = new L.GeoJSON(geom, jsonOptions);
      if (featureSettings.popup) {
        feature.bindPopup(featureSettings.popup);
      }
      layer.addLayer(feature);
    });
  }

})(jQuery);
