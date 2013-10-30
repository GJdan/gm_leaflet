<?php
/**
 * @file
 * example_map.inc
 */

$plugin = array(
  'name' => t('Example Map'),
  'description' => t('An exampe map to demonstrate how to use this module.'),
  'base layers' => array('osm_basic', 'osm_mapquest'),
  'default base layer' => 'osm_basic', // This is only required if using more than one base layer
  'overlay layers' => array('example_data'),
  'enabled overlay layers' => array('example_data'),  // If this isn't included all overlay layers will be enabled.
  'switcher overlay layers' => array('example_data'),  // If this isn't included all overlay layers will be in the switcher.
  'lat' => 54.9, //Required
  'lon' => -128, //Required
  'zoom' => 4, //Required
);
