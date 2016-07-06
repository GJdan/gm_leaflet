(function ($) {

  Drupal.behaviors.gm_leafletMap = {
    attach: function (context, settings) {

      $.each(settings.gm_leaflet, function(mapID, mapSettings) {
        // Create Map
        mapOptions = {
          zoomControl: false
        }
        $.extend(mapOptions, mapSettings.settings);

        var map = L.map(mapSettings.id, mapOptions);
        var zoomFS = new L.Control.ZoomFS();
        map.addControl(zoomFS);

        if (mapSettings.zoomToLayer && !mapSettings.noSetView) {
          if ($.isArray(mapSettings.zoomToLayer)) {
            mapSettings.zoomLayer = new L.FeatureGroup();
          } else {
            if (mapSettings['overlay layers'][mapSettings.zoomToLayer].data.setView.boundingBox) {
              bBox = mapSettings['overlay layers'][mapSettings.zoomToLayer].data.setView.boundingBox;
              map.fitBounds([[bBox.miny, bBox.minx], [bBox.maxy, bBox.maxx]]);
            } else if (mapSettings['overlay layers'][mapSettings.zoomToLayer].data.setView.centroid) {
              view = mapSettings['overlay layers'][mapSettings.zoomToLayer].data.setView
              map.setView([view.centroid.lat, view.centroid.lon], view.zoom);
            }
          }
        } else if (mapSettings.lat && mapSettings.lon && !mapSettings.noSetView) {
          map.setView([mapSettings.lat, mapSettings.lon], mapSettings.zoom);
        }

        var baseLayers = {};
        var overlayLayers = {};

        // Add base layers
        $.each(mapSettings['base layers'], function(name, layerSettings) {
          var layer;

          if (layerSettings.type == 'tile layer') {
            layer = gmLeafletAddTileLayer(name, mapSettings, layerSettings);
          } else if (layerSettings.type == 'wms') {
            layer = gmLeafletAddWMS(name, mapSettings, layerSettings);
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
            gmLeafletAddGeoJSONLayer(name, mapSettings, layerSettings, layer);
          } else if (layerSettings.type == 'wms') {
            layer = gmLeafletAddWMS(name, mapSettings, layerSettings);
          }

          if (!mapSettings['enabled overlay layers'] || $.inArray(name, mapSettings['enabled overlay layers']) != -1) {
            layer.addTo(map);
          }
          if (!mapSettings['switcher overlay layers'] || $.inArray(name, mapSettings['switcher overlay layers']) != -1) {
            overlayLayers[layerSettings.name] = layer;
          }

          // If an array of layers was passed to mapSettings.zoomToLayer check if this layer is included and add it.
          if ($.isArray(mapSettings.zoomToLayer) && $.inArray(name, mapSettings.zoomToLayer) != -1) {
            mapSettings.zoomLayer.addLayer(layer);
          }
        });

        layerSwitcher = L.control.layers(baseLayers, overlayLayers, {
          collapsed: mapSettings.collapsedSwitcher
        });
        layerSwitcher.addTo(map);

        // Event listeners...
        map.on('enterFullscreen', function () { // Ensure that the fullscreen map appears on top of everything else.
          $('#' + mapID).css('z-index', 2000);
        });
        map.on('exitFullscreen', function () { // Restore map dimensions and z-index when exiting fullscreen mode.
          $('#' + mapID).css('height', mapSettings.height);
          $('#' + mapID).css('width', mapSettings.width);
          $('#' + mapID).css('z-index', 0);
        });

        // Add custom js
        $.each(mapSettings['custom_js'], function(name, customjs) {
          // The callback has been added to the drupal object.
          Drupal[customjs["callback"]](map, mapSettings, customjs, layerSwitcher); // Every customjs plugin is passed the map, the mapSettings object, and its own settings.
        });

        // If an array of layers was passed to mapSettings.zoomToLayer now is time to zoom
        if ($.isArray(mapSettings.zoomToLayer)) {
          var bounds = mapSettings.zoomLayer.getBounds();
          map.fitBounds(bounds);
        }
      }); // End of loop through maps
    }
  };

  function gmLeafletAddTileLayer(name, mapSettings, layerSettings) {
    var layer = new L.TileLayer(layerSettings['url template'], layerSettings.settings);

    return layer;
  }

  function gmLeafletAddWMS(name, mapSettings, layerSettings) {
    var layer = new L.TileLayer.WMS(layerSettings.url, layerSettings.settings);

    return layer;
  }

  function gmLeafletAddGeoJSONLayer(layerName, mapSettings, layerSettings, layer) {
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
        var popup = L.DomUtil.create('div', mapSettings.id + '-popup');
        popup.innerHTML += featureSettings.popup;
        feature.bindPopup(popup);
      }
      layer.addLayer(feature);
    });
  }

})(jQuery);
