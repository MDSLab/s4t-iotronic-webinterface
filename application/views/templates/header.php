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
		<link rel="shortcut icon" type="image/png" href="<?= $this -> config -> site_url() ?>assets/images/smartmeio.png"/>
		<link rel="stylesheet" href="<?= $this -> config -> site_url() ?>assets/bower_components/foundation/css/foundation.min.css" />
		<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>-->
		<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
		<script src="<?= $this -> config -> site_url() ?>assets/bower_components/foundation/js/vendor/modernizr.js"></script>


		<!-- Openstreetmap -->
		<!-- Leaflet  https://github.com/Leaflet/Leaflet.markercluster#using-the-plugin -->
		<link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.0/dist/leaflet.css" integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ==" crossorigin=""/>
		<script src="https://unpkg.com/leaflet@1.3.0/dist/leaflet.js" integrity="sha512-C7BBF9irt5R7hqbUm2uxtODlUVs+IsNu2UULGuZN7gM+k/mmeG4xvIEac01BtQa4YIkUpp23zZC4wIwuXaPMQA==" crossorigin=""></script>
		<link rel="stylesheet" type="text/css" href="https://unpkg.com/leaflet.markercluster@1.2.0/dist/MarkerCluster.Default.css" />
		<link rel="stylesheet" type="text/css" href="https://unpkg.com/leaflet.markercluster@1.2.0/dist/MarkerCluster.css" />
		<script src="https://unpkg.com/leaflet.markercluster@1.2.0/dist/leaflet.markercluster.js"></script>


		<!-- OpenLayers -->
		<!--<script src="https://www.openlayers.org/api/OpenLayers.js"></script>-->
		<script src="https://openlayers.org/api/OpenLayers.js"></script>
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />


		<!-- DataTables -->
		<!--<script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.js"></script>-->
		<script type="text/javascript" src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
		<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css" />

	</head>

	<body>
		<!--
		<div id="header">
			Stack4Things
		</div>
		-->
