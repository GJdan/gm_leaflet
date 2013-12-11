<?php
/**
 * @file
 * osm_basic.inc
 *
 * Provides the Open Street Map Basic base layer.
 */

$plugin = array(
  'name' => t('OSM Basic'),
  'type' => 'tile layer',
  'settings' => array(
    'attribution' => t('© OpenStreetMap contributors'),
    'maxZoom' => 18,
  ),
  'url template' => 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
);
