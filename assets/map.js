/**
 * Copyright 2017-2018 Carmelo Romeo (caromeo@unime.it)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
map = new OpenLayers.Map("mapdiv");
map.addLayer(new OpenLayers.Layer.OSM());
epsg4326 =  new OpenLayers.Projection("EPSG:4326"); //WGS 1984 projection
projectTo = map.getProjectionObject(); //The map projection (Spherical Mercator)
var lonLat = new OpenLayers.LonLat(15.55972, 38.20523).transform(epsg4326, projectTo);
var zoom=12;
map.setCenter (lonLat, zoom);
var vectorLayer = new OpenLayers.Layer.Vector("Overlay");

var marker_pathfile = '<?php echo $this -> config -> site_url(); ?>uploads/marker-icon.png';
var marker_pathfile_green = '<?php echo $this -> config -> site_url(); ?>uploads/marker-icon-green.png';
var marker_pathfile_red = '<?php echo $this -> config -> site_url(); ?>uploads/marker-icon-red.png';

function refresh_map(){
	$.ajax({
		url: '<?= $this -> config -> site_url()?>Admin/get_markers_info',
		type: 'GET',
		dataType: 'json',
		data: {organization: ckan_organization, limit: 1000},
		contentType: 'application/json',
		success: function(response){
			for(var i=0; i< response.label.length; i++){
				//vectorLayer.addFeatures(create_marker(response.longitude[i],response.latitude[i], response.label[i], response.sensors_resource_ids[i], response.board_status[i]));
				vectorLayer.addFeatures(create_marker(parseFloat(response.longitude[i]),parseFloat(response.latitude[i]), response.label[i], response.sensors_resource_ids[i], response.board_status[i]));
			}
			//document.getElementById("map_output").innerHTML = "SUCCESS: "+JSON.stringify(response.sensors_resource_ids);
		},
		error: function(response){
			//document.getElementById("map_output").innerHTML = "ERROR: "+JSON.stringify(response);
			alert('ERROR');
		}
	});
}

map.addLayer(vectorLayer);

function create_marker(x,y,descript, sensors, board_status){

	if(board_status == "C") marker_icon = marker_pathfile_green;
	else if(board_status == "D") marker_icon = marker_pathfile_red;
	else marker_icon = marker_pathfile;
	//feature.style.externalGraphic = marker_pathfile_green;

	var feature = new OpenLayers.Feature.Vector(
		new OpenLayers.Geometry.Point(x,y).transform(epsg4326, projectTo),
		{description:descript, sensors: sensors},
		//{externalGraphic: marker_icon, graphicHeight: 41, graphicWidth: 25, graphicXOffset:-12, graphicYOffset:-20  });
		//{externalGraphic: marker_icon, graphicHeight: 41, graphicWidth: 25, graphicXOffset:-25, graphicYOffset:-40  });
		{externalGraphic: marker_icon, graphicHeight: 41, graphicWidth: 25});
	return feature;

}

function create_label(desc, sensors){
	return $.ajax({
		url: '<?= $this -> config -> site_url()?>Admin/get_last_sensors_samples',
		type: 'GET',
		dataType: 'json',
		data: {label: desc, sensors_id_vect: sensors},
		contentType: 'application/json'
	});
}

//Add a selector control to the vectorLayer with popup functions
var controls = {
	selector: new OpenLayers.Control.SelectFeature(vectorLayer, { onSelect: createPopup, onUnselect: destroyPopup })
};

function destroyPopup(feature) {
	feature.popup.destroy();
	feature.popup = null;
}

function createPopup(feature) {

	var promise = create_label(feature.attributes.description, feature.attributes.sensors);
	promise.success(function(data){

		//feature.style.externalGraphic = marker_pathfile_green;
		feature.popup = new OpenLayers.Popup.FramedCloud("pop",
			feature.geometry.getBounds().getCenterLonLat(),
			null,
			data.marker_content,
			null,
			true,
			function() { controls['selector'].unselectAll(); }
		);
		//feature.popup.closeOnMove = true;
		map.addPopup(feature.popup);
	});
}

map.addControl(controls['selector']);
controls['selector'].activate();
*/


//WORKING VERSION WITH LEAFLET
// ---------------------------------------------------------------------------------------------------------------------------------------------

var map = L.map('mapdiv', {scrollWheelZoom:false}).setView([38.20523,15.55972], 12);
var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
//var osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
//var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
//var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 12, attribution: osmAttrib});
var osm = new L.TileLayer(osmUrl, {});
map.addLayer(osm);

//Copyright
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> - by <b>MDSLab</b>'
}).addTo(map);


//MiniMap for board_info
var info_map = L.map('info-map', {scrollWheelZoom:false}).setView([38.20523,15.55972], 12);
info_map.addLayer(osm);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> - by <b>MDSLab</b>'
}).addTo(info_map);




var markers = null;
var labels = [];
var latitude = [];
var longitude = [];
var altitude = [];

var last_update = [];
var model = [];
var manufacturer = [];
//var sensors_ids = [];


var marker_pathfile = site_url+"uploads/marker-icon.png";
var marker_pathfile_green = site_url+"uploads/marker-icon-green.png";
var marker_pathfile_red = site_url+"uploads/marker-icon-red.png";


var marker_shadow = L.icon({
	iconUrl: "",
	iconAnchor:[12.5, 41],
	shadowUrl: site_url+'assets/images/marker-shadow.png'
});


var marker_red = L.icon({
	iconUrl: marker_pathfile_red,
	iconAnchor:[12.5, 41],
	shadowUrl: site_url+'assets/images/marker-shadow.png'
});

var marker_green = L.icon({
	iconUrl: marker_pathfile_green,
	iconAnchor:[12.5, 41],
	shadowUrl: site_url+'assets/images/marker-shadow.png'
});

var marker_blue = L.icon({
	iconUrl: marker_pathfile,
	iconAnchor:[12.5, 41],
	shadowUrl: site_url+'assets/images/marker-shadow.png'
});



function refresh_map(){
	if(markers != null) map.removeLayer(markers);

	markers = L.markerClusterGroup({ disableClusteringAtZoom: 17 });

	for(var i=0; i< boards_list.length; i++){
		labels[i] = boards_list[i].label;
		last_update[i] = boards_list[i].latest_update;

		latitude[i] = parseFloat(boards_list[i].latitude);
		longitude[i] = parseFloat(boards_list[i].longitude);
		altitude[i] = parseFloat(boards_list[i].altitude);

		board_status = boards_list[i].status;
		//sensors_ids[i] = response.sensors_resource_ids[i]; E QUESTO ??????????????????????????????

		var marker = L.marker([latitude[i], longitude[i]]);

		if(board_status == "C") marker.setIcon(marker_green);
		else if(board_status == "D") marker.setIcon(marker_red);
		else marker.setIcon(marker_blue);

		//OLD
		//marker.on('click', function(e){
		//      var popup = L.popup().setLatLng(e.latlng).setContent(markerOnClick(e)).openOn(map);
		//});

		//NEW
		marker.on('mouseover', function(e){
			var popup = L.popup().setLatLng(e.latlng).setContent(markerOnMouseOver(e)).openOn(map);
		});

		markers.addLayer(marker);
	}
	map.addLayer(markers);
}



function boardinfo_map(board_status, lat, lng){
	info_map.setView([lat,lng], 6);
	var boardinfo_markers = L.markerClusterGroup({ disableClusteringAtZoom: 17 });
	var boardinfo_marker = L.marker([lat, lng]);

	if(board_status == "C") boardinfo_marker.setIcon(marker_green);
	else if(board_status == "D") boardinfo_marker.setIcon(marker_red);
	else boardinfo_marker.setIcon(marker_blue);

	boardinfo_marker.on('mouseover', function(e){
		var boardinfo_popup = L.popup().setLatLng(e.latlng).setContent(markerOnMouseOver(e)).openOn(info_map);
	});
	boardinfo_markers.addLayer(boardinfo_marker);
	info_map.addLayer(boardinfo_markers);
}





//OLD
//function markerOnClick(e){
//NEW
function markerOnMouseOver(e){

	//var latlng = JSON.stringify(e.latlng, censor(e.latlng));
	var latlng = JSON.stringify(e.latlng);

	//OLD
	var obj = $.parseJSON('[' + latlng + ']');

	var lat = JSON.stringify(obj[0].lat);
	var lon = JSON.stringify(obj[0].lng);

	//NEW
	/*
	 var obj = JSON.parse(latlng);
	 lat = obj.lat;
	 lon = obj.lon;
	 */

	for(i=0; i<labels.length; i++){

		if(latitude[i]==lat && longitude[i]==lon){

			//LABEL: to be improved!!!
			//return labels[i];

			var img = '<img src="'+site_url+'uploads/red-circle.png" width=10 height=10>';
			if(boards_list[i].status == "C")
				img = '<img src="'+site_url+'uploads/green-circle.png" width=10 height=10>';


			return  '<div>' +
					'<center>'+img +' <b>'+labels[i]+'</b></center><br />' +
					'<b>Latitude:</b> '+latitude[i]+ '<br />' +
					'<b>Longitude:</b> '+longitude[i]+'<br />' +
					'<b>Altitude:</b> '+altitude[i]+'<br /><br />' +
					'<b>Updated:</b> '+last_update[i]+
				'</div>';



			//CONTENT OF THE POPUP QITH LAST SAMPLE
			/*
			var promise = create_label(labels[i], sensors_ids[i]);


			//No Images
			//return promise.replace(/"/g,"");

			//With Images
			//alert(JSON.stringify(promise));
			if(promise.label== ""){
				alert('Board with no data');
				var popup_content = "<big><center><b>No data yet</b></center></big>";
			}
			else{
				var popup_content = "<big><center><b>"+promise.label+"</b></center></big> <center><b>"+promise.samples_date+"</b></center><br />" ;

				if(promise.temperature != "")
					popup_content += '<img src="<?= $this -> config -> site_url()?>/uploads/thermometer.png">'+"  Temperature: <b>"+round(promise.temperature, 2)+" °C</b><br />";
				if(promise.brightness != "")
					popup_content += '<img src="<?= $this -> config -> site_url()?>/uploads/lamp.png">'+"  Brightness: <b>"+round(promise.brightness, 2)+" lux</b><br />";
				if(promise.noise != "")
					popup_content += '<img src="<?= $this -> config -> site_url()?>/uploads/noise.png">'+"  Noise: <b>"+round(promise.noise, 2)+" amp</b><br />";
				if(promise.humidity != "")
					popup_content += '<img src="<?= $this -> config -> site_url()?>/uploads/water.png">'+"  Humidity: <b>"+round(promise.humidity, 2)+" %</b><br />";
				if(promise.gas != "")
					popup_content += '<img src="<?= $this -> config -> site_url()?>/uploads/flame.gif">'+"  CO: <b>"+round(promise.gas, 2)+" ppm</b><br />";
				if(promise.pressure != "")
					popup_content += '<img src="<?= $this -> config -> site_url()?>/uploads/pressure.png">'+"  Pressure: <b>"+round(promise.pressure, 2)+" hPa</b><br />";
			}
			return popup_content;
			*/
		}
	}
}

function create_label(desc, sensors){

	var data_call = $.ajax({
		url: '<?= $this -> config -> site_url()?>Admin/get_last_sensors_samples',
		dataType: 'json',
		async: false,
		data: {label: desc, sensors_id_vect: sensors}
	});

	//No Images
	//return JSON.stringify(data_call.responseJSON.marker_content);

	//With Images
	return data_call.responseJSON.marker_content;
}


function round(value, decimals) {
	return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}


/*
 //Nel caso in cui volessi stampare il contenuto di JSON ricorsivi
 function censor(censor) {
 var i = 0;

 return function(key, value) {
 if(i !== 0 && typeof(censor) === 'object' && typeof(value) == 'object' && censor == value) 
 return '[Circular]'; 

 if(i >= 29) // seems to be a harded maximum of 30 serialized objects?
 return '[Unknown]';

 ++i; // so we know we aren't using the original object anymore

 return value;  
 }
 }
 */


