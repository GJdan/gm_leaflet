<?php
/**
 * @file
 * osm_basic.inc
 *
 * Provides the Open Street Map Basic base layer.
 */

$plugin = array(
  'name' => t('OSM Mapquest'),
  'type' => 'tile layer',
  'settings' => array(
    'attribution' => t('© OpenStreetMap contributors'),
    'maxZoom' => 18,
    'subdomains' => array('otile1', 'otile2'),
  ),
  'url template' => 'http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png',
);
