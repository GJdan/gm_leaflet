<?php
/**
 * @file
 * osm_basic.inc
 *
 * Provides the Open Street Map Basic base layer.
 */

$plugin = array(
  'name' => t('Mapquest Satellite'),
  'type' => 'tile layer',
  'settings' => array(
    'attribution' => t('© OpenStreetMap contributors'),
    'maxZoom' => 11,
    'subdomains' => array('otile1', 'otile2','otile3', 'otile4'),
  ),
  'url template' => 'http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png',
);
