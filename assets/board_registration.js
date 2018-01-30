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


$('[data-reveal-id="modal-show-boards"]').on('click',
	function() {

		var fields_to_show = ["label", "status", "latest_update", "mobile", "net_enabled", "notify", "board_id"];

		$.ajax({
			url: s4t_api_url+"/boards",
			type: "GET",
			dataType: 'json',
			headers: ajax_headers,

			success: function(response){
				response.message = response.message.sort(SortByLabel); 
				parsed_response = parse_json_fields(fields_to_show, response.message, false);
				parsed_response = convert_arrayfields_into_boolean(parsed_response);
				create_table_from_json("show_boards_table", parsed_response, fields_to_show);
			},
			error: function(response){
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
			}
		});
	}
);



$('[data-reveal-id="modal-register-new-board"]').on('click',
	function(){

		$('#board_create_notify_section').hide();
		$('#board_create_refresh_coordinates').hide();

		document.getElementById("board_create-output").innerHTML = '';

		//Cleaning old data
		document.getElementById('board_create_label').value = "";
		document.getElementById('board_create_description').value = "";

		document.getElementById('board_create_latitude').value = "";
		document.getElementById('board_create_longitude').value = "";
		document.getElementById('board_create_altitude').value = "";

		document.getElementById('board_create_extra').value = "";

		document.getElementById("board_create_mobile_enabled").checked = false;
		$("#board_create_net_enabled").val("false");
		$("#board_create_notify_enabled").val("false");


		var array_promise = [];

		array_promise.push(new Promise(function(resolve){
			update_users('board_create_user', '', resolve);
		}));

		array_promise.push(new Promise(function(resolve){
			update_layouts('board_create_layout', '', resolve);
		}));

		array_promise.push(new Promise(function(resolve){
			update_projects('board_create_project', '', resolve);
		}));

		/*
		array_promise.push(new Promise(function(resolve){
			sensors_list('board_create_sensorlist', resolve);
		}));
		*/

		Promise.all(array_promise).then(generate_uuid('board_create_uuid'));
	}
);

$('[data-reveal-id="modal-action-board"]').on('click',
	function(){

		$('#board_actionlist').empty();
		document.getElementById("board_action-output").innerHTML ='';

		actions_array = ["hostname", "reboot"];

		update_boardsv2('action_boardlist', 'C');

		$('#board_actionlist').append('<option title="--" value="--" data-unit="">--</option>');
		for(i=0;i<actions_array.length;i++)
			$('#board_actionlist').append('<option title="'+actions_array[i]+'" value="'+actions_array[i]+'" data-unit="">'+actions_array[i]+'</option>');
	}
);


$('#board_generate_uuid').click(function(){
	document.getElementById('loading_bar').style.visibility='hidden';
	generate_uuid("board_create_uuid");
});


//UNIFY THESE ACTIONS (in couples)!!!
//----------------------------------------------------------------------------------------
$('[data-reveal-id="modal-update-board"]').on('click',
	function(){
		$('#board_update_data_section').hide();
		update_boardsv2('update_boardlist');
	}
);

$('[data-reveal-id="modal-unregister-board"]').on('click',
	function(){
		document.getElementById("board_delete-output").innerHTML ='';
		refresh_tableboards("delete_tableboards", "remove");
	}
);


$('[id="board_create_notify_enabled"]').on('change',
	function(){
		if(this.value == "true")	$('#board_create_notify_section').show();
		else if(this.value == "false")	$('#board_create_notify_section').hide();
	}
);


$('[id="board_update_notify_enabled"]').on('change',
	function(){
		if(this.value == "true")        $('#board_update_notify_section').show();
		else if(this.value == "false")  $('#board_update_notify_section').hide();
	}
);



$('[id="board_create_mobile_enabled"]').on('change',
	function(){
		if(this.checked){ 	$('#board_create_refresh_coordinates').show(); }
		else if(!this.checked){ $('#board_create_refresh_coordinates').hide(); }
	}
);


$('[id="board_update_mobile_enabled"]').on('change',
	function(){
		if(this.checked){       $('#board_update_refresh_coordinates').show(); }
		else if(!this.checked){ $('#board_update_refresh_coordinates').hide(); }
	}
);
//----------------------------------------------------------------------------------------


$('[id="update_boardlist"]').on('change',
	function(){
		var board_id = $( "#update_boardlist option:selected" ).val();
		document.getElementById("board_update-output").innerHTML ='';

		if(board_id == '--'){
			$('#board_update_data_section').hide();
		}
		else{
			$('#board_update_data_section').show();

			var array_promise = [];
			
			array_promise.push(new Promise(function(resolve){
				update_users('board_update_user', '', resolve);
			}));
			
			array_promise.push(new Promise(function(resolve){
				update_layouts('board_update_layout', '', resolve);
			}));
			
			array_promise.push(new Promise(function(resolve){
				update_projects('board_update_project', '', resolve);
			}));

			Promise.all(array_promise).then(
				$.ajax({
					url: s4t_api_url+"/boards/"+board_id,
					type: 'GET',
					dataType: 'json',
					headers: ajax_headers,
			
					success: function(response){
						//console.log(JSON.stringify(response));

						info = response.message.info;
						//console.log(info);

						document.getElementById("board_update_label").value = info.label;
						document.getElementById("board_update_description").value = info.description;
					
						document.getElementById("board_update_latitude").value = info.coordinates.latitude;
						document.getElementById("board_update_longitude").value = info.coordinates.longitude;
						document.getElementById("board_update_altitude").value = info.coordinates.altitude;

						if(info.mobile == 1){
							document.getElementById("board_update_mobile_enabled").checked = true;
							$('#board_update_refresh_coordinates').show();
						}
						else
							$('#board_update_refresh_coordinates').hide();

						document.getElementById("board_update_refresh_position").value = info.position_refresh_time;


						document.getElementById("board_update_extra").value = JSON.stringify(info.extra);

						$("#board_update_layout").val(info.layout);
						$("#board_update_project option[title='"+info.project+"']").prop('selected', true);
						$("#board_update_user option[title='"+info.user+"']").prop('selected', true);

						if(info.net_enabled == 1)
							$("#board_update_net_enabled").val("true");

						if(info.notify == 1){
							$("#board_update_notify_enabled").val("true");
							$("#board_update_notify_section").show();
						}
						else
							$("#board_update_notify_section").hide();

						document.getElementById("board_update_notify_rate").value = info.notify_rate;
						document.getElementById("board_update_notify_retry").value = info.notify_retry;

						document.getElementById('loading_bar').style.visibility='hidden';
					},
					error: function(response){
						verify_token_expired(response.responseJSON.message, response.responseJSON.result);
						console.log(JSON.stringify(response));
					}
				})
			);
		}
	}
);


$('#create-board').click(function(){

	var data = {};

	//document.getElementById('loading_bar').style.visibility='visible';
	/*
	var list = document.getElementsByClassName("board_create_sensorlist");
	var sensors ="";
	var count = 0;

	for(i=0; i<list.length; i++){
		if (list[i].checked){
			if(count==0){
				sensors = list[i].id;
				count += 1;
			}
			else
				sensors += ","+list[i].id;
		}
	}
	if(sensors=="") sensors = "empty";
	*/
	data.sensorslist = "empty";

	//console.log(sensors);

	var select_layout = document.getElementById("board_create_layout");
	var select_project = document.getElementById("board_create_project");
	var select_user = document.getElementById("board_create_user");

	var board_id = document.getElementById("board_create_uuid").value;
	var board_label = document.getElementById("board_create_label").value;
	var description = document.getElementById("board_create_description").value;

	var latitude = document.getElementById("board_create_latitude").value;
	var longitude = document.getElementById("board_create_longitude").value;
	var altitude = document.getElementById("board_create_altitude").value;
	
	var layout = select_layout.options[select_layout.selectedIndex].value;
	var project = select_project.options[select_project.selectedIndex].value;
	var user = select_user.options[select_user.selectedIndex].value;

	data.manufacturer = select_layout.options[select_layout.selectedIndex].title;
	data.model = select_layout.options[select_layout.selectedIndex].text;


	if(layout == "--")		{ alert("Select a Layout!");			document.getElementById('loading_bar').style.visibility='hidden';}
	else if(project == "--")	{ alert("Select a Project!");			document.getElementById('loading_bar').style.visibility='hidden';}
	else if(user == "--")		{ alert("Select a User!");			document.getElementById('loading_bar').style.visibility='hidden';}
	else if(board_id == "")		{ alert("Insert a uuid!");			document.getElementById('loading_bar').style.visibility='hidden';}
	else if(board_label == "")	{ alert("Specify a label for the board!");	document.getElementById('loading_bar').style.visibility='hidden';}
	else if(description == "")	{ alert("Insert a description!");		document.getElementById('loading_bar').style.visibility='hidden';}
	else if(latitude == "")		{ alert("Insert latitude!");			document.getElementById('loading_bar').style.visibility='hidden';}
	else if(longitude == "")	{ alert("Insert longitude!");			document.getElementById('loading_bar').style.visibility='hidden';}
	else if(altitude == "")		{ alert("Insert latitude!");			document.getElementById('loading_bar').style.visibility='hidden';}

	else{
		data.type_id = layout;
		data.project_id = project;
		data.user_id = user;

		data.board_id = board_id;
		data.board_label = board_label;

		data.latitude = latitude;
		data.longitude = longitude;
		data.altitude = altitude;

		var extra = document.getElementById("board_create_extra").value;
		if(extra == "") extra = "{}";

		data.extra = extra;
		data.description = description;

		data.mobile = $("#board_create_mobile_enabled").is(":checked").toString();

		if(data.mobile == "true"){
			var refresh_position = document.getElementById("board_create_refresh_position").value;
			data.position_refresh_time = refresh_position;
		}
		else
			data.position_refresh_time = 10;

		data.net_enabled = document.getElementById("board_create_net_enabled").value;
		
		data.notify = document.getElementById("board_create_notify_enabled").value;

		if(data.notify == "true"){
			var notify_rate = document.getElementById("board_create_notify_rate").value;
			var notify_retry = document.getElementById("board_create_notify_retry").value;
			//console.log(notify_rate+" "+notify_retry);

			data.notify_rate = notify_rate;
			data.notify_retry = notify_retry;
		}
		else {
			data.notify_rate = 600;
			data.notify_retry = 1;
		}

		document.getElementById("board_create-output").innerHTML ='';

		$.ajax({
			url: s4t_api_url+"/boards",
			type: 'POST',
			dataType: 'json',
			headers: ajax_headers,
			data: JSON.stringify(data),

			success: function(response){
				//console.log(response);
				document.getElementById('loading_bar').style.visibility='hidden';
				document.getElementById("board_create-output").innerHTML = JSON.stringify(response.message);
				//update_boardsv2('create_boardlist');
				refresh_lists();
			},
			error: function(response){
				//console.log('ERROR: '+JSON.stringify(response));
				document.getElementById('loading_bar').style.visibility='hidden';
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
				document.getElementById("board_create-output").innerHTML = JSON.stringify(response.responseJSON.message);
			}
		});
	}
});



$('#update-board').click(function(){

	data = {};
	document.getElementById("board_update-output").innerHTML ='';

	//document.getElementById('loading_bar').style.visibility='visible';
	/*
	 var list = document.getElementsByClassName("board_update_sensorlist");
	 var sensors ="";
	 var count = 0;

	 for(i=0; i<list.length; i++){
	 if (list[i].checked){
	 if(count==0){
	 sensors = list[i].id;
	 count += 1;
	 }
	 else
	 sensors += ","+list[i].id;
	 }
	 }
	 if(sensors=="") sensors = "empty";
	 */
	data.sensorslist = "empty";

	//console.log(sensors);

	var select_layout = document.getElementById("board_update_layout");
	var select_project = document.getElementById("board_update_project");
	var select_user = document.getElementById("board_update_user");

	var board_label = document.getElementById("board_update_label").value;
	var description = document.getElementById("board_update_description").value;
	
	var latitude = document.getElementById("board_update_latitude").value;
	var longitude = document.getElementById("board_update_longitude").value;
	var altitude = document.getElementById("board_update_altitude").value;


	var layout = select_layout.options[select_layout.selectedIndex].value;
	var project = select_project.options[select_project.selectedIndex].value;
	var user = select_user.options[select_user.selectedIndex].value;


	if(layout == "--")		{alert("Select a Layout!");			document.getElementById('loading_bar').style.visibility='hidden';}
	else if(project == "--")	{alert("Select a Project!");			document.getElementById('loading_bar').style.visibility='hidden';}
	else if(user == "--")		{alert("Select a User!");			document.getElementById('loading_bar').style.visibility='hidden';}
	else if(board_label == "")	{alert("Specify a label for the board!");	document.getElementById('loading_bar').style.visibility='hidden';}
	else if(description == "")	{alert("Insert a description!");		document.getElementById('loading_bar').style.visibility='hidden';}
	else if(latitude == "")		{alert("Insert latitude!");			document.getElementById('loading_bar').style.visibility='hidden';}
	else if(longitude == "")	{alert("Insert longitude!");			document.getElementById('loading_bar').style.visibility='hidden';}
	else if(altitude == "")		{alert("Insert latitude!");			document.getElementById('loading_bar').style.visibility='hidden';}


	else{
		board_id = document.getElementById("update_boardlist").value;

		data.type_id = layout;
		data.project_id = project;
		data.user_id = user;

		data.board_label = board_label;
		data.latitude = latitude;
		data.longitude = longitude;
		data.altitude = altitude;

		var extra = document.getElementById("board_update_extra").value;
		if(extra == "") extra = "{}";
		data.extra = extra;

		data.description = description;

		data.mobile = $("#board_update_mobile_enabled").is(":checked").toString();
		data.position_refresh_time = document.getElementById("board_update_refresh_position").value;

		data.net_enabled = document.getElementById("board_update_net_enabled").value;

		data.notify = document.getElementById("board_update_notify_enabled").value;
		data.notify_rate = document.getElementById("board_update_notify_rate").value;
		data.notify_retry = document.getElementById("board_update_notify_retry").value;

		document.getElementById("board_update-output").innerHTML ='';
		//console.log(data);

		$.ajax({
			url: s4t_api_url+"/boards/"+board_id,
			type: 'PATCH',
			dataType: 'json',
			headers: ajax_headers,
			data: JSON.stringify(data),

			success: function(response){
				//console.log(response);
				document.getElementById('loading_bar').style.visibility='hidden';
				document.getElementById("board_update-output").innerHTML = JSON.stringify(response.message);
				update_boardsv2('update_boardlist');
				refresh_lists();
			},
			error: function(response){
				//console.log('ERROR: '+JSON.stringify(response));
				document.getElementById('loading_bar').style.visibility='hidden';
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
				document.getElementById("board_update-output").innerHTML = JSON.stringify(response.responseJSON.message);
			}
		});
	}
});



$('#delete_board').click(function(){

	return_array = get_selected_rows_from_table("delete_tableboards", "remove");

	headers = return_array[0];
	variables = return_array[1];

	document.getElementById("board_delete-output").innerHTML ='';

	if(variables.length == 0){
		alert('No board(s) to delete are selected!');
		document.getElementById('loading_bar').style.visibility='hidden';
	}
	else{
		for(var i=0; i< variables.length; i++){
			//---------------------------------------------------------------------------------
			(function(i){
				setTimeout(function(){
					//---------------------------------------------------------------------------------
					var board_id = variables[i][1];

					$.ajax({
						url: s4t_api_url+"/boards/"+board_id,
						type: "DELETE",
						dataType: 'json',
						headers: ajax_headers,

						success: function(response){
							if(i==variables.length-1) {
								refresh_tableboards("delete_tableboards", "remove");
								refresh_lists();
								document.getElementById('loading_bar').style.visibility='hidden';
							}
							document.getElementById("board_delete-output").innerHTML += JSON.stringify(response.message)+"<br />";
						},
						error: function(response){
							verify_token_expired(response.responseJSON.message, response.responseJSON.result);
							if(i==variables.length-1) document.getElementById('loading_bar').style.visibility='hidden';
							document.getElementById("board_delete-output").innerHTML += JSON.stringify(response.responseJSON.message)+"<br />";
						}
					});
					//---------------------------------------------------------------------------------
				},delay*i);
			})(i);
			//---------------------------------------------------------------------------------
		}
	}

});



$('#action-board').click(function(){
	var board_id = document.getElementById("action_boardlist").value;
	var action = document.getElementById("board_actionlist").value;

	if(board_id == "--"){
		document.getElementById('loading_bar').style.visibility='hidden';
		alert("Select a board!");
	}
	else if(action == "--"){
		document.getElementById('loading_bar').style.visibility='hidden';
		alert("Select an action!");
	}
	else{
		data = {};
		data.action = action;

		$.ajax({
			url: s4t_api_url+"/boards/"+board_id+"/action",
			type: "POST",
			dataType: 'json',
			headers: ajax_headers,
			data: JSON.stringify(data),

			success: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				document.getElementById("board_action-output").innerHTML = JSON.stringify(response.message);
				if(action =="reboot")
					update_boardsv2('action_boardlist', 'C');

				refresh_lists();
			},
			error: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
				document.getElementById("board_action-output").innerHTML = JSON.stringify(response.responseJSON.message);
			}
		});
	}
});


function refresh_tableboards(table_id, action) {
	//$('#' + select_id).empty();
	
	$.ajax({
		url: s4t_api_url + "/boards/",
		type: 'GET',
		dataType: 'json',
		headers: ajax_headers,

		success: function (response) {
			//In board registration only the delete function uses this approach. That is different to other tables (plugins, drivers, networks, etc.)
			//----------------------------------------------------------------------------
			var fields_to_show = ["label", "board_id", "status"];
			parsed_response = parse_json_fields(fields_to_show, response.message, false);
			parsed_response = parsed_response.sort(SortByLabel);
			//----------------------------------------------------------------------------

			create_table_from_json(table_id, parsed_response, fields_to_show, action);
		},
		error: function (response) {
			verify_token_expired(response.responseJSON.message, response.responseJSON.result);
		}
	});
}

//OLD VERSION (see below...)
/*
$('[data-reveal-id="modal-plugins_sensors-lists"]').on('click',
	function() {
		populate_board_info($(this).data('boardlistSelected'));
	}
);
*/


function hideall_except(sel_div_id){

	var nested_divs = $('#info-container').children("div");
	//console.log(nested_divs);

	for(i=0;i<nested_divs.length;i++){
		id = nested_divs[i]["id"];

		if(id != sel_div_id) 
			$("#"+id).hide();
		else
			$("#"+id).show();
	}
}


function populate_board_info(board_id){
//function populate_board_info(data){
	//$('#sensors_on_board').empty();

	hideall_except("info-details");

	//OLD VERSION
	/*
	var select = document.getElementById(data);
	if(data == "boardlist_c")
		$('#boardlist_d option').removeAttr('selected');
	else
		$('#boardlist_c option').removeAttr('selected');
	*/

	//if (select.selectedIndex != null){
		$.ajax({
			//url: s4t_api_url+"/boards/"+select.options[select.selectedIndex].value,
			url: s4t_api_url+"/boards/"+board_id,
			type: 'GET',
			dataType: 'json',
			headers: ajax_headers,

			success: function(response){

				info = response.message.info;

				$('#info-label').html('<b>Label: </b>'+info.label);
				$('#info-uuid').html('<b>UUID: </b>'+info.board_id);
				$('#info-description').html('<b>Description: </b>'+info.description);

				$('#info-user').html('<b>User: </b>'+info.user);
				$('#info-project').html('<b>Project: </b>'+info.project);
				$('#info-model').html('<b>Model: </b>'+info.model);
				$('#info-manufacturer').html('<b>Manufacturer: </b>'+info.manufacturer);
				$('#info-image').html('<b>Image: </b>'+info.image);

				$('#info-lat').html('<b>Latitude: </b>'+info.coordinates.latitude);
				$('#info-lon').html('<b>Longitude: </b>'+info.coordinates.longitude);
				$('#info-alt').html('<b>Altitude: </b>'+info.coordinates.altitude);
				$('#info-timestamp').html('<b>@ </b>'+info.coordinates.timestamp);
				boardinfo_map(info.status, info.coordinates.latitude, info.coordinates.longitude);

				if(info.mobile == 1)		document.getElementById("info_mobile_enabled").checked = true;
				if(info.net_enabled == 1)	document.getElementById("info_net_enabled").checked = true;
				if(info.notify == 1)		document.getElementById("info_notify_enabled").checked = true;

				document.getElementById("info_mobile_enabled").disabled = "disabled";
				document.getElementById("info_net_enabled").disabled = "disabled";
				document.getElementById("info_notify_enabled").disabled = "disabled";

				/*
				//Sensors
				if(response.message.sensors.length == 0)
					$('#sensors_on_board').append('<option>NO sensors installed</option>');
				else{
					response.message.sensors = response.message.sensors.sort(SortByType);
					for(i=0; i<response.message.sensors.length; i++)
						$('#sensors_on_board').append('<option>'+response.message.sensors[i].type+'</option>');
				}
				*/


				//Services
				if(cloud_services_flag){
					if(response.message.services.length == 0){
						$('#info_tableservices').html('<tr><td style="text-align:center">No services</td></tr>');
					}
					else{
						services = response.message.services.sort(SortByName);

						$("#cloud_services_section").show();

						$("#info_tableservices").find("thead").remove();
						$("#info_tableservices").find("tbody").remove();

						create_table_from_json("info_tableservices", services, null);
					}
				}
				else{
					$('#cloud_services_section').hide();
					$('#info-services').hide();
				}

				//Plugins
				if(plugins_flag){
					if(response.message.plugins.length == 0){
						$('#info_tableplugins').html('<tr><td style="text-align:center">No plugins</td></tr>');
					}
					else{
						plugins = response.message.plugins.sort(SortByName);

						$("#plugins_section").show();
						
						$("#info_tableplugins").find("thead").remove();
						$("#info_tableplugins").find("tbody").remove();
						
						create_table_from_json("info_tableplugins", plugins, null);
					}
				}
				else{
					$('#plugins_section').hide();
					$('#info-plugins').hide();
				}

				//Drivers
				if(drivers_flag){
					if(response.message.drivers.length == 0){
						$('#info_tabledrivers').html('<tr><td style="text-align:center">No drivers</td></tr>');
					}
					else{
						drivers = response.message.drivers.sort(SortByName);

						$("#drivers_section").show();

						$("#info_tabledrivers").find("thead").remove();
						$("#info_tabledrivers").find("tbody").remove();

						create_table_from_json("info_tabledrivers", drivers, null);
					}
				}
				else{
					$('#drivers_section').hide();
					$('#info-drivers').hide();
				}

				//Networks
				if(networks_flag){
					if(response.message.vnets.length == 0){
						$('#info_tablenetworks').html('<tr><td style="text-align:center">No networks</td></tr>');
					}
					else{
						networks = response.message.vnets.sort(SortByVlanName);

						$("#vnets_section").show();

						$("#info_tablenetworks").find("thead").remove();
						$("#info_tablenetworks").find("tbody").remove();

						create_table_from_json("info_tablenetworks", networks, null);
					}
				}
				else{
					$('#vnets_section').hide();
					$('#info-networks').hide();
				}
			},
			error: function(response){
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
				//alert('ERROR: '+JSON.stringify(response));
			}
		});
	//}
}

