<?php
/**
 * @file geobc_base_mapping_trim.inc
 *
 * GeoBC Base Mapping and Trim WMS Layer
 */

$plugin = array(
  'name' => t('GeoBC Base Mapping and Trim'),
  'type' => 'wms',
  'settings' => array(
    'layers' => 'Base_Mapping_7.5M,Transportation_6M,Base_Mapping_2M,Transportation_2M,Base_Mapping_250K,Base_Mapping_20K,Transportation_20K,Transportation_250K', // (required) Comma-separated list of WMS layers to show.
  ),
  'url' => 'http://openmaps.gov.bc.ca/mapserver/base3',
);
