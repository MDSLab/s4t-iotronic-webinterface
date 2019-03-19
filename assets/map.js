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


//WORKING VERSION WITH LEAFLET
// ---------------------------------------------------------------------------------------------------------------------------------------------

var osmUrl=map_url+'{z}/{x}/{y}.png';
//var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
//var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 12, attribution: osmAttrib});
var osm = new L.TileLayer(osmUrl, {});


//var map = L.map('mapdiv', {scrollWheelZoom:false, worldCopyJump: true}).setView([38.20523,15.55972], 12);
var map = L.map('mapdiv', {scrollWheelZoom:false, worldCopyJump: true}).setView([41.814,13.711], 6);
map.addLayer(osm);

//Copyright
L.tileLayer(osmUrl, {
	attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> - by <b>SmartME.io</b>'
}).addTo(map);


//MiniMap for board_info
var info_map = L.map('info-map', {scrollWheelZoom:false}).setView([38.20523,15.55972], 12);
info_map.addLayer(osm);
L.tileLayer(osmUrl, {
	attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> - by <b>SmartME.io</b>'
}).addTo(info_map);


//FIX for OSM map: not loading correctly sizes in modals (https://github.com/Leaflet/Leaflet/issues/941)
info_map.getSize = function(){
	//return new L.Point(this._container.clientWidth, this._container.clientHeight);
	return new L.Point(700, 400);
}


var markers = null;
var boardinfo_markers = null
boardinfo_marker = null

var labels = [];
var uuids = [];
var latitude = [];
var longitude = [];
var altitude = [];

var last_update = [];


var marker_pathfile = site_url+"uploads/marker-icon.png";
var marker_pathfile_green = site_url+"uploads/marker-icon-green.png";
var marker_pathfile_red = site_url+"uploads/marker-icon-red.png";


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

	markers = L.markerClusterGroup({
		spiderfyOnMaxZoom: false, 
		disableClusteringAtZoom: 17
	});

	for(var i=0; i< boards_list.length; i++){
		labels[i] = boards_list[i].label;
		uuids[i] = boards_list[i].board_id;
		last_update[i] = boards_list[i].latest_update;

		latitude[i] = parseFloat(boards_list[i].latitude);
		longitude[i] = parseFloat(boards_list[i].longitude);
		altitude[i] = parseFloat(boards_list[i].altitude);

		board_status = boards_list[i].status;
		var marker = L.marker([latitude[i], longitude[i]]);

		if(board_status == "C") marker.setIcon(marker_green);
		else if(board_status == "D") marker.setIcon(marker_red);
		else marker.setIcon(marker_blue);


		//marker.on('mouseover', function(e){
		marker.on('click', function(e){

		        var latlng = JSON.stringify(e.latlng);
		        var obj = $.parseJSON('[' + latlng + ']');
		        var lat = JSON.stringify(obj[0].lat);
		        var lon = JSON.stringify(obj[0].lng);

		        sel = 0;
		        for(i=0; i<labels.length; i++){
		                if(latitude[i]==lat && longitude[i]==lon){
                		        sel = i;
		                        break;
                		}
		        }

			var img = '<img src="'+site_url+'uploads/blue-circle.png" width=10 height=10>';
			if(boards_list[sel].status == "C")
				img = '<img src="'+site_url+'uploads/green-circle.png" width=10 height=10>';
			else if(boards_list[sel].status == "D")
				img = '<img src="'+site_url+'uploads/red-circle.png" width=10 height=10>';

			var open_popup = '<div>';

			var default_popup = '<center>'+img +' <b>'+labels[sel]+'</b></center><br />' +
				'<center><b>'+last_update[sel]+'</b></center><br />'+
				'Latitude: <b>'+latitude[sel]+ '</b><br />' +
				'Longitude: <b>'+longitude[sel]+'</b><br />' +
				'Altitude: <b>'+altitude[sel]+'</b><br /><br />';


			//This section was disabled by default but now it starts to be useful in future scenarios
			//*******************************************************************************************
			if(typeof endpoints === "undefined"){
				global_popup = open_popup + default_popup +"</div>";
				var popup = L.popup().setLatLng(e.latlng).setContent(global_popup).openOn(map);
			}
			else if(endpoints[0]["ckan"]){
				var close_popup = '</table></div>';

			        var array_promise = [];
			        array_promise.push(new Promise(function(resolve){
		        	        getDatastores(uuids[sel], resolve);
			        }));

				var timestamp = "";
				//var ckan_popup_content = "<center><b>CKAN Metrics</b></center>"+
				var ckan_popup_content = '<center><b>CKAN Metrics</b> <a href="'+ckan_params["metric_base_url"]+uuids[sel]+'" target="_blank">Dataset</a></center>'+
								'<table class="table_popup">';
			        Promise.all(array_promise).then(values => {
					//console.log(values);
					var global_popup = "";
					if(values[0] == "ERROR No dataset")
						global_popup = open_popup + default_popup +"</div>";
					else{

				                data = values[0];

				                for(i=0;i<data.length;i++){

							if(i==0) ckan_popup_content += '<center><b>'+data[i].timestamp+'</b></center><br />';

                				        if(data[i].metric == "Temperature"){
		        	        	                ckan_popup_content += '<tr><td><img src="'+site_url+'uploads/thermometer.png">'+"</td><td>Temperature</td><td><b>"+round(data[i].value, 2)+" °C</b></td></tr>";
                			        	}
			                	        else if(data[i].metric == "Brightness"){
        	        		        	        ckan_popup_content += '<tr><td><img src="'+site_url+'uploads/lamp.png">'+"</td><td>Brightness</td><td><b>"+round(data[i].value, 2)+" lux</b></td></tr>";
				                        }
        	        			        else if(data[i].metric == "Humidity"){
			                	                ckan_popup_content += '<tr><td><img src="'+site_url+'uploads/noise.png">'+"</td><td>Noise</td><td><b>"+round(data[i].value, 2)+" amp</b></td></tr>";
	                			        }
				                        else if(data[i].metric == "Pressure"){
        	        			                ckan_popup_content += '<tr><td><img src="'+site_url+'uploads/water.png">'+"</td><td>Humidity</td><td><b>"+round(data[i].value, 2)+" %</b></td></tr>";
			        	                }
	                			        else if(data[i].metric == "Gas"){
			                        	        ckan_popup_content += '<tr><td><img src="'+site_url+'uploads/flame.gif">'+"</td><td>CO</td><td><b>"+round(data[i].value, 2)+" ppm</b></td></tr>";
				                        }
        	        			        else if(data[i].metric == "Noise"){
                	        	        		ckan_popup_content += '<tr><td><img src="'+site_url+'uploads/pressure.png">'+"</td><td>Pressure</td><td><b>"+round(data[i].value, 2)+" hPa</b></td></tr>";
			        	                }
		                		}
						global_popup = open_popup + default_popup + ckan_popup_content + close_popup;
					}
					var popup = L.popup().setLatLng(e.latlng).setContent(global_popup).openOn(map);
				});
			}
			else{
				//Start from here to customize your popup !
				global_popup = open_popup + default_popup +"</div>";
				var popup = L.popup().setLatLng(e.latlng).setContent(global_popup).openOn(map);
			}
			//*******************************************************************************************
		});

		markers.addLayer(marker);
	}
	map.addLayer(markers);
}



function boardinfo_map(board_status, lat, lng){
	info_map.setView([lat,lng], 6);
	info_map.invalidateSize();
	document.getElementById('info-map').style.display = 'block';

	
	if(boardinfo_marker != null) info_map.removeLayer(boardinfo_marker);
	if(boardinfo_markers != null) info_map.removeLayer(boardinfo_markers);
	boardinfo_markers = L.markerClusterGroup({ disableClusteringAtZoom: 17 });
	boardinfo_marker = L.marker([lat, lng]);
	
	//var boardinfo_markers = L.markerClusterGroup({ disableClusteringAtZoom: 17 });
	//var boardinfo_marker = L.marker([lat, lng]);

	if(board_status == "C") boardinfo_marker.setIcon(marker_green);
	else if(board_status == "D") boardinfo_marker.setIcon(marker_red);
	else boardinfo_marker.setIcon(marker_blue);

	//boardinfo_marker.on('mouseover', function(e){
	boardinfo_marker.on('click', function(e){

		var latlng = JSON.stringify(e.latlng);
		var obj = $.parseJSON('[' + latlng + ']');
		var lat = JSON.stringify(obj[0].lat);
		var lon = JSON.stringify(obj[0].lng);

		sel = 0;
		for(i=0; i<labels.length; i++){
			if(latitude[i]==lat && longitude[i]==lon){
				sel = i;
				break;
			}
		}

		var img = '<img src="'+site_url+'uploads/red-circle.png" width=10 height=10>';
		if(boards_list[sel].status == "C")
			img = '<img src="'+site_url+'uploads/green-circle.png" width=10 height=10>';

		var open_popup = '<div>';

		var default_popup = '<center>'+img +' <b>'+labels[sel]+'</b></center><br />' +
			'<center><b>'+last_update[sel]+'</b></center><br />'+
			'Latitude: <b>'+latitude[sel]+ '</b><br />' +
			'Longitude: <b>'+longitude[sel]+'</b><br />' +
			'Altitude: <b>'+altitude[sel]+'</b><br /><br />';


		//This section was disabled by default but now it starts to be useful in future scenarios
		//*******************************************************************************************
		if(typeof endpoints === "undefined"){
			global_popup = open_popup + default_popup +"</div>";
			var boardinfo_popup = L.popup().setLatLng(e.latlng).setContent(global_popup).openOn(info_map);
		}
		else if(endpoints[0]["ckan"]){
			var close_popup = '</table></div>';

			var array_promise = [];
			array_promise.push(new Promise(function(resolve){
				getDatastores(uuids[sel], resolve);
			}));

			var timestamp = "";
			//var ckan_popup_content = "<center><b>CKAN Metrics</b></center>"+
			var ckan_popup_content = '<center><b>CKAN Metrics</b> <a href="'+ckan_params["metric_base_url"]+uuids[sel]+'" target="_blank">Dataset</a></center>'+
				'<table class="table_popup">';

			Promise.all(array_promise).then(values => {
				//console.log(values);
				var global_popup = "";
				if(values[0] == "ERROR No dataset")
					global_popup = open_popup + default_popup +"</div>";
				else{

					data = values[0];

					for(i=0;i<data.length;i++){

						if(i==0) ckan_popup_content += '<center><b>'+data[i].timestamp+'</b></center><br />';
	
						if(data[i].metric == "Temperature"){
							ckan_popup_content += '<tr><td><img src="'+site_url+'uploads/thermometer.png">'+"</td><td>Temperature</td><td><b>"+round(data[i].value, 2)+" °C</b></td></tr>";
						}
						else if(data[i].metric == "Brightness"){
							ckan_popup_content += '<tr><td><img src="'+site_url+'uploads/lamp.png">'+"</td><td>Brightness</td><td><b>"+round(data[i].value, 2)+" lux</b></td></tr>";
						}
						else if(data[i].metric == "Humidity"){
							ckan_popup_content += '<tr><td><img src="'+site_url+'uploads/noise.png">'+"</td><td>Noise</td><td><b>"+round(data[i].value, 2)+" amp</b></td></tr>";
						}
						else if(data[i].metric == "Pressure"){
							ckan_popup_content += '<tr><td><img src="'+site_url+'uploads/water.png">'+"</td><td>Humidity</td><td><b>"+round(data[i].value, 2)+" %</b></td></tr>";
						}
						else if(data[i].metric == "Gas"){
							ckan_popup_content += '<tr><td><img src="'+site_url+'uploads/flame.gif">'+"</td><td>CO</td><td><b>"+round(data[i].value, 2)+" ppm</b></td></tr>";
						}
						else if(data[i].metric == "Noise"){
							ckan_popup_content += '<tr><td><img src="'+site_url+'uploads/pressure.png">'+"</td><td>Pressure</td><td><b>"+round(data[i].value, 2)+" hPa</b></td></tr>";
						}
					}
					global_popup = open_popup + default_popup + ckan_popup_content + close_popup;
				}
				//var popup = L.popup().setLatLng(e.latlng).setContent(global_popup).openOn(map);
				var boardinfo_popup = L.popup().setLatLng(e.latlng).setContent(global_popup).openOn(info_map);
			});
			//var boardinfo_popup = L.popup().setLatLng(e.latlng).setContent(markerOnClick(e)).openOn(info_map);
			//var boardinfo_popup = L.popup().setLatLng(e.latlng).setContent(markerOnMouseOver(e)).openOn(info_map);
		}
		else{
			//Start from here to customize your popup !
			global_popup = open_popup + default_popup +"</div>";
			var boardinfo_popup = L.popup().setLatLng(e.latlng).setContent(global_popup).openOn(info_map);
		}
		//*******************************************************************************************
	});
	boardinfo_markers.addLayer(boardinfo_marker);
	info_map.addLayer(boardinfo_markers);
}


/*
//In caso of recursive JSON to print
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


