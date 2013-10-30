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
  'lat' => 54.9, //Required
  'lon' => -124.5, //Required
  'zoom' => 5, //Required
);
