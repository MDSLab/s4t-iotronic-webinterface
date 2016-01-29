<!DOCTYPE html>
<html>
	<head>
		<title>SmartME WebPage</title>
		<link rel="stylesheet" href="<?= $this -> config -> site_url() ?>assets/bower_components/foundation/css/foundation.min.css" />
		<link rel="stylesheet" href="<?= $this -> config -> site_url() ?>assets/smartme.css" />
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
		<script src="<?= $this -> config -> site_url() ?>assets/bower_components/foundation/js/vendor/modernizr.js"></script>
		<!-- Openstreetmap -->
		<script src="http://www.openlayers.org/api/OpenLayers.js"></script>
	</head>
	<body>

		<div id="header">
			<table border="0" cellspacing="0" cellpadding="0" style="border: none; border-collapse: collapse; background-color:rgba(0, 0, 0, 0);" >
				<tr>
			<td>
			<img src="<?= $this -> config -> site_url() .'uploads/smartme.png'  ?>" height="90" width="170" />
			</td>
			<td valign="bottom">
			<h1>Stack4Things</h1>
			</td>
				</tr>
			</table>
		</div>
