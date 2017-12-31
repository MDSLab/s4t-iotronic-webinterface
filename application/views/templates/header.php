<!DOCTYPE html>
<!--
Copyright 2017-2018 Carmelo Romeo (caromeo@unime.it)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->
<html>

	<head>
		<title>IoTronic Admin</title>
		<link rel="shortcut icon" type="image/png" href="<?= $this -> config -> site_url() ?>assets/images/unime.png"/>
		<link rel="stylesheet" href="<?= $this -> config -> site_url() ?>assets/bower_components/foundation/css/foundation.min.css" />
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
		<script src="<?= $this -> config -> site_url() ?>assets/bower_components/foundation/js/vendor/modernizr.js"></script>
		<!-- Openstreetmap -->
		<!-- Leaflet -->
		<link rel="stylesheet" type="text/css" href="<?= $this -> config -> site_url() ?>assets/leaflet.css" />
		<link rel="stylesheet" type="text/css" href="<?= $this -> config -> site_url() ?>assets/MarkerCluster.Default.css" />
		<link rel="stylesheet" type="text/css" href="<?= $this -> config -> site_url() ?>assets/MarkerCluster.css" />
		<script src="<?= $this -> config -> site_url() ?>assets/leaflet.js"></script>
		<script src="<?= $this -> config -> site_url() ?>assets/ll_MarkerCluster.js"></script>
		<!-- OpenLayers -->
		<!--<script src="https://www.openlayers.org/api/OpenLayers.js"></script>-->
		<script src="https://openlayers.org/api/OpenLayers.js"></script>
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	</head>

	<body>
		<!--
		<div id="header">
			Stack4Things
		</div>
		-->
