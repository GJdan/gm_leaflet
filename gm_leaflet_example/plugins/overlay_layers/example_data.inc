<?php
/**
 * @file example_data.inc
 */

$plugin = array(
  'name' => t('Example data'),
  'type' => 'GeoJSON',
  'format' => 'text', // Options are: text, file, object.  Objects can be created as an associated array assigned to 'data'.
  'settings' => array(),
  'data callback' => 'gm_leaflet_example_data',
);

/**
 * Data callback.
 *
 * @return An array of data in the corresponding format.  Should return an array of features/layers.
 *         Each element of the returned array will be used as a feature and merged into a layer group.
 */
function gm_leaflet_example_data() {
  $data = array();

  $data[] = array(
    'data' => '{
  "type": "Feature",
  "crs": {
    "type": "name",
    "properties": {
      "name": "urn:ogc:def:crs:EPSG::4326"
    }
  },
  "geometry": {
    "type": "Polygon",
    "coordinates": [
            [
        [-127.00017333317611,60.724742238714434,0],
        [-135.00172089827882,60.724463791365466,0],
        [-144.66493120016213,60.6735257211907,0],
        [-144.34048184297166,59.000246862285714,0],
        [-129.90164595465163,47.527035309509756,0],
        [-123.45154287971329,47.575120513188125,0],
        [-122.21326425665164,48.275721811821214,0],
        [-113.69123604688963,48.35925256042147,0],
        [-112.98918590637564,49.07684149188262,0],
        [-113.79724748669105,50.74604933068492,0],
        [-118.76645330048633,54.10286775208506,0],
        [-118.89660716461546,60.67304231915264,0],
        [-127.00017333317611,60.724742238714434,0]
      ]
    ]
  },
  "properties": {
    "id": "#0 of gm-abcdefghijklmnopqrstuvwxyz0000bc",
    "url": "http://apps.gov.bc.ca/pub/geomark/geomarks/gm-abcdefghijklmnopqrstuvwxyz0000bc",
    "geometryType": "Polygon",
    "partIndex": 0,
    "numPolygons": 1,
    "numParts": 1,
    "createDate": "2011-05-12",
    "expiryDate": null,
    "minX": -144.66493120016213,
    "minY": 47.527035309509756,
    "maxX": -112.98918590637564,
    "maxY": 60.724742238714434,
    "centroidX": -128.10446766729424,
    "centroidY": 54.74533227390394,
    "numVertices": 13,
    "length": 5958503.516035516,
    "area": 1878642016189,
    "isValid": true,
    "validationError": null,
    "isSimple": true,
    "isRobust": true,
    "minimumClearance": 94994.294
  }
}',
    'settings' => array(),
    'popup' => 'This is a GeoJson polygon outlining British Columbia.',
  );

  return $data;
}
