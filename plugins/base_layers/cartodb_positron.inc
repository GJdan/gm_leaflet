<?php
/**
 * @file
 * osm_basic.inc
 *
 * Provides the Open Street Map Basic base layer.
 */

$plugin = array(
  'name' => t('CartoDB Positron'),
  'type' => 'tile layer',
  'settings' => array(
    'attribution' => t('&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'),
    'maxZoom' => 18,
  ),
  'url template' => 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
);
