<?php
/**
 * @file
 * example_map.inc
 *
 * @todo add zoomToLayer example.
 */

$plugin = array(
  'name' => t('Example Map'),
  'description' => t('An exampe map to demonstrate how to use this module.'),
  'base layers' => array('osm_basic', 'osm_mapquest', 'geobc_base_mapping_trim'),
  'default base layer' => 'osm_basic', // This is only required if using more than one base layer
  'overlay layers' => array('example_data'),
  'enabled overlay layers' => array('example_data'),  // If this isn't included all overlay layers will be enabled.
  'switcher overlay layers' => array('example_data'),  // If this isn't included all overlay layers will be in the switcher.
  'lat' => 54.9, //Required
  'lon' => -128, //Required
  'zoom' => 4, //Required
  //'zoomToLayer' => 'example_data', // However if this is provided it will override the above three values, but requires the given layer to provide info for how to zoom.
);
