<?php
/**
 * @file
 * leaflet_draw.inc
 *
 * Adds the leaflet.draw controls to the map.
 */

$plugin = array(
  'name' => t('Leaflet Draw'),
  'description' => t('Adds the leaflet.draw control to a map.'),
  'js_file' => 'leaflet_draw.js', // Required
  //'js_path' => drupal_get_path('module', 'gm_leaflet') . '/plugins/custom_js', // This can be optionally included if the path of the plugin isn't where the js is located.
  'callback' => 'gmLeafletDraw', // Name of the js callback inside the js_file to use.  Required.
);

libraries_load('Leaflet.draw');