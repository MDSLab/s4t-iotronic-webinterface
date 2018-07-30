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

if(security_method == "certificate"){
	document.getElementById('board_create_certfile').addEventListener('change', readFile, false);
	document.getElementById('board_create_certfile').element_id = "board_create_certificate";

	document.getElementById('board_update_certfile').addEventListener('change', readFile, false);
	document.getElementById('board_update_certfile').element_id = "board_update_certificate";
}


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


		//Security fields cleaning
		if(security_method == "certificate"){
			$('#board_create_certfile').val('');
			document.getElementById('board_create_certificate').value = "";
		}
		else if(security_method == "password"){
			document.getElementById('board_create_password').value = "";
			document.getElementById('board_create_password').type = "password";
			document.getElementById("board_create_password_visibility").checked = false;
		}

		//This section was disabled by default but now it starts to be useful in future scenarios
		//*******************************************************************************************
		if(endpoints[0] == null || typeof endpoints === "undefined"){
			$('#board_create_endpoints_section').hide();
		}
		else{
			var flag_endpoints = false;
			$.each(endpoints[0], function(key, value){
				//console.log(key+" "+value);
				if(value == true) flag_endpoints = true;
			});
			if(!flag_endpoints)
				$('#board_create_endpoints_section').hide();
			else{
				$('#board_create_endpoints_section').show();
				endpoints_list(endpoints[0], "board_create_endpoints_section", "board_create_endpoints", "board_create_endpointlist");
			}
		}
		//*******************************************************************************************

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


$('[data-reveal-id="modal-configure-board"]').on('click',
	function(){
		document.getElementById("board_configure-output").innerHTML ='';

		$('#configure_project').prop('checked', false);
		$('#configure_boardlist_bundle').show();

		//OLD: select approach
		//update_boardsv2('configure_boardlist', 'C', true);

		//NEW: table approach
		refresh_tableboards("configure_tableboards", "remove", "C", default_boardlist_columns);
	}
);


$('[data-reveal-id="modal-action-board"]').on('click',
	function(){

		//$('#action_boardlist').val("--");
		$('#board_actionlist').empty();

		$('#action-board-time').val("");
		$('#action-board_parameters').val("");

		$('#action-board-time_bundle').hide();
		$('#action-board_parameters_bundle').hide();

		
		document.getElementById("board_action-output").innerHTML ='';

		$('#action_project').prop('checked', false);
		$('#action_boardlist_bundle').show();

		actions_array = ["hostname", "reboot", "restart_lr"];

		//OLD: select approach
		//update_boardsv2('action_boardlist', 'C', true);

		//NEW: table approach
		refresh_tableboards("boardaction_tableboards", "remove", "C", default_boardlist_columns);

		$('#board_actionlist').append('<option title="--" value="--" data-unit="">--</option>');
		for(i=0;i<actions_array.length;i++)
			$('#board_actionlist').append('<option title="'+actions_array[i]+'" value="'+actions_array[i]+'" data-unit="">'+actions_array[i]+'</option>');
	}
);


$('#board_actionlist').on('change', function(){
	//console.log(this.value);

	$('#action-board-time').val("");
	$('#action-board_parameters').val("");

	if(this.value == "--" || this.value == "hostname"){
		$('#action-board-time_bundle').hide();
		$('#action-board_parameters_bundle').hide();
	}
	else if(this.value == "reboot" || this.value == "restart_lr"){
		$('#action-board-time_bundle').show();
		$('#action-board_parameters_bundle').hide();
	}
	else{
		$('#action-board-time_bundle').hide();
		$('#action-board_parameters_bundle').show();

	}
});


$('#board_generate_uuid').click(function(){
	generate_uuid("board_create_uuid");
	document.getElementById('loading_bar').style.visibility='hidden';
});


//UNIFY THESE ACTIONS (in couples)!!!
//----------------------------------------------------------------------------------------
$('[data-reveal-id="modal-update-board"]').on('click',
	function(){
		document.getElementById("board_update-output").innerHTML ='';
		$('#board_update_data_section').hide();
		update_boardsv2('update_boardlist');
	}
);

$('[data-reveal-id="modal-unregister-board"]').on('click',
	function(){
		$("#modal-unregister-board").removeClass("small");
		$('#deleteboard_project').prop('checked', false);
		$('#deleteboard_boardlist_bundle').show();

		document.getElementById("board_delete-output").innerHTML ='';
		refresh_tableboards("delete_tableboards", "remove", null, null);
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
						document.getElementById("board_update_state").value = info.state;

						document.getElementById("board_update_label").value = info.label;
						document.getElementById("board_update_description").value = info.description;

						//Security fields cleaning
						if(security_method == "certificate"){
							$('#board_update_certfile').val('');
							document.getElementById('board_update_certificate').value = "";
						}
						else if(security_method == "password"){
							document.getElementById('board_update_password').value = "";
							document.getElementById('board_update_password').type = "password";
							document.getElementById("board_update_password_visibility").checked = false;
						}
					
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

						$("#board_update_layout").val(info.layout_id);
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


						//Just in case the calls were too slow and the following fields were not updated correctly
						if( $("#board_update_layout").val() == "--" || $("#board_update_project").val() == "--" || $("#board_update_user").val() == "--"){
							alert("There was an error with the server. Please verify Project/Layout/User selections!");
							console.log("INCOMPLETE....reselecting");
							$("#board_update_layout").val(info.layout_id);
							$("#board_update_project option[title='"+info.project+"']").prop('selected', true);
							$("#board_update_user option[title='"+info.user+"']").prop('selected', true);
						}


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

	loading_to_fix(); //TO BE FIXED !!!


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

	//data.manufacturer = select_layout.options[select_layout.selectedIndex].title;
	//data.model = select_layout.options[select_layout.selectedIndex].text;

	//Security
	if(security_method == "certificate" || security_method == "password"){
		var password = "";
		var pubkey = "";

		if(security_method == "certificate") pubkey = document.getElementById("board_create_certificate").value;
		else if(security_method == "password") password = document.getElementById("board_create_password").value;
	}


	if(layout == "--")		{ alert("Select a Layout!");			document.getElementById('loading_bar').style.visibility='hidden';}
	else if(project == "--")	{ alert("Select a Project!");			document.getElementById('loading_bar').style.visibility='hidden';}
	else if(user == "--")		{ alert("Select a User!");			document.getElementById('loading_bar').style.visibility='hidden';}
	else if(board_id == "")		{ alert("Insert a uuid!");			document.getElementById('loading_bar').style.visibility='hidden';}
	else if(board_label == "")	{ alert("Specify a label for the board!");	document.getElementById('loading_bar').style.visibility='hidden';}
	else if(description == "")	{ alert("Insert a description!");		document.getElementById('loading_bar').style.visibility='hidden';}
	else if(latitude == "")		{ alert("Insert latitude!");			document.getElementById('loading_bar').style.visibility='hidden';}
	else if(longitude == "")	{ alert("Insert longitude!");			document.getElementById('loading_bar').style.visibility='hidden';}
	else if(altitude == "")		{ alert("Insert latitude!");			document.getElementById('loading_bar').style.visibility='hidden';}

	//Security fields checks
	else if( security_method == "certificate" && (pubkey == undefined || pubkey == "") ){
		alert("Insert valid public key!");
		document.getElementById('loading_bar').style.visibility='hidden';
	}
	/*
	else if(security_method == "password" && (password == undefined || password == "") ){
		alert("Insert password!");
		document.getElementById('loading_bar').style.visibility='hidden';
	}
	else if(security_method == "password" && (password.length<4 || password.length>60) ){
		alert("Password must be between 4 and 60 digits!");
		document.getElementById('loading_bar').style.visibility='hidden';
	}
	*/
	else{
		data.layout_id = layout;
		data.project_id = project;
		data.user_id = user;

		data.board_id = board_id;
		data.board_label = board_label;

		data.latitude = latitude;
		data.longitude = longitude;
		data.altitude = altitude;

		//Security fields
		if(security_method == "certificate" || security_method == "password"){
			data.pubkey = pubkey;
			data.password = password;
		}

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


		//This section was disabled by default but now it starts to be useful in future scenarios
		//*******************************************************************************************
		if(typeof endpoints !== "undefined"){
		//if(endpoints[0]){
			//console.log(data);
			//console.log(endpoints);
			//for(key in endpoints[0]) console.log(key +":"+endpoints[0][key]);

			var endpoints_list = document.getElementsByClassName("board_create_endpointlist");
			var endpoints_promise = [];

			flag = "false";
			for(i=0; i<endpoints_list.length; i++){
				if (endpoints_list[i].checked){
					flag = "true";
					endpoints_promise.push(new Promise(function(resolve){
						window[endpoints_list[i].id](data, resolve);
					}));
				}
			}
			if(flag == "true")
				Promise.all(endpoints_promise).then(document.getElementById('loading_bar').style.visibility='hidden');
		}
		//*******************************************************************************************
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
				if(security_method == "password")
					document.getElementById("board_create-output").innerHTML += "<br /> The password is: "+response.password;
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

	loading_to_fix(); //TO BE FIXED !!!

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

	var state = document.getElementById("board_update_state").value;

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

	//Security
	if(security_method == "certificate" || security_method == "password"){
		var password = "";
		var pubkey = "";
	
		if(security_method == "certificate") pubkey = document.getElementById("board_update_certificate").value;
		else if(security_method == "password") password = document.getElementById("board_update_password").value;
	}


	if(layout == "--")		{alert("Select a Layout!");			document.getElementById('loading_bar').style.visibility='hidden';}
	else if(project == "--")	{alert("Select a Project!");			document.getElementById('loading_bar').style.visibility='hidden';}
	else if(user == "--")		{alert("Select a User!");			document.getElementById('loading_bar').style.visibility='hidden';}
	else if(board_label == "")	{alert("Specify a label for the board!");	document.getElementById('loading_bar').style.visibility='hidden';}
	else if(description == "")	{alert("Insert a description!");		document.getElementById('loading_bar').style.visibility='hidden';}
	else if(latitude == "")		{alert("Insert latitude!");			document.getElementById('loading_bar').style.visibility='hidden';}
	else if(longitude == "")	{alert("Insert longitude!");			document.getElementById('loading_bar').style.visibility='hidden';}
	else if(altitude == "")		{alert("Insert latitude!");			document.getElementById('loading_bar').style.visibility='hidden';}

	//Security fields checks
	else if( security_method == "certificate" && (pubkey == undefined || pubkey == "") ){
		alert("Insert valid public key!");
		document.getElementById('loading_bar').style.visibility='hidden';
	}
	else if(security_method == "password" && password.length != 0 && (password.length<4 || password.length>60) ){
		alert("Password must be between 4 and 60 digits!");
		document.getElementById('loading_bar').style.visibility='hidden';
	}

	else{
		board_id = document.getElementById("update_boardlist").value;

		data.layout_id = layout;
		data.project_id = project;
		data.user_id = user;

		data.board_label = board_label;
		data.latitude = latitude;
		data.longitude = longitude;
		data.altitude = altitude;

		//Security fields
		if(security_method == "certificate" || security_method == "password"){
			data.pubkey = pubkey;
			data.password = password;
		}

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

		data.state = state;

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
				//$('#update_boardlist').val(board_id);
				//$('#update_boardlist option[value="'+board_id+'"]').attr('selected', 'selected');
				//console.log(board_id);
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

	loading_to_fix(); //TO BE FIXED !!!

	document.getElementById("board_delete-output").innerHTML ='';

	if ($('#deleteboard_project').is(':checked')){
		var project_id = getCookie("selected_prj");

		$.ajax({
			url: s4t_api_url+"/projects/"+project_id+"/boards",
			type: "DELETE",
			dataType: 'json',
			headers: ajax_headers,

			success: function(response){
				refresh_tableboards("delete_tableboards", "remove", null, null);
				refresh_lists();
				document.getElementById('loading_bar').style.visibility='hidden';
				document.getElementById("board_delete-output").innerHTML = JSON.stringify(response.message)+"<br />";
			},
			error: function(response){
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
				document.getElementById('loading_bar').style.visibility='hidden';
				document.getElementById("board_delete-output").innerHTML = JSON.stringify(response.responseJSON.message)+"<br />";
			}
		});
	}
	else{

		return_array = get_selected_rows_from_table("delete_tableboards", "remove");

		headers = return_array[0];
		variables = return_array[1];

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
						var board_name = variables[i][0];

						$.ajax({
							url: s4t_api_url+"/boards/"+board_id,
							type: "DELETE",
							dataType: 'json',
							headers: ajax_headers,

							success: function(response){
								if(i==variables.length-1) {
console.log("S");
									refresh_tableboards("delete_tableboards", "remove", null, null);
									refresh_lists();
									document.getElementById('loading_bar').style.visibility='hidden';
								}
								document.getElementById("board_delete-output").innerHTML += board_name +": "+ JSON.stringify(response.message)+"<br />";
							},
							error: function(response){
								verify_token_expired(response.responseJSON.message, response.responseJSON.result);
								if(i==variables.length-1) {
									refresh_tableboards("delete_tableboards", "remove", null, null);
									document.getElementById('loading_bar').style.visibility='hidden';
								}
								document.getElementById("board_delete-output").innerHTML += board_name +": "+JSON.stringify(response.responseJSON.message)+"<br />";
							}
						});
						//---------------------------------------------------------------------------------
					},delay*i);
				})(i);
				//---------------------------------------------------------------------------------
			}
		}
	}
});


$('#configure-board').click(function(){

	loading_to_fix(); //TO BE FIXED !!!

	document.getElementById("board_configure-output").innerHTML ='';

	//OLD: select approach
	/*
	if(!$('#configure_project').is(':checked') && $('#configure_boardlist option:selected').length == 0) {alert('Select a Board'); document.getElementById('loading_bar').style.visibility='hidden';}

	else{
	*/
		data = {};

		if ($('#configure_project').is(':checked')){
			var project_id = getCookie("selected_prj");

			$.ajax({
				url: s4t_api_url+"/projects/"+project_id+"/boards/conf",
				type: "PUT",
				dataType: 'json',
				headers: ajax_headers,
				data: JSON.stringify(data),

				success: function(response){
					document.getElementById('loading_bar').style.visibility='hidden';

					//Old output without link to request_id
					//document.getElementById("board_configure-output").innerHTML = JSON.stringify(response.message);

					//New output with link to request_id
					//var subject = "/projects/"+project_id+"/boards/conf";
					var subject = response.subject;
					document.getElementById("board_configure-output").innerHTML = 'Request ID: <a data-reveal-id="modal-show-project-requests" id="'+response.req_id+'" value="'+subject+'" onclick=populate_request_info(this)>'+response.req_id+'</a>';
					document.getElementById('loading_bar').style.visibility='hidden';

					refresh_lists();
				},
				error: function(response){
					document.getElementById('loading_bar').style.visibility='hidden';
					verify_token_expired(response.responseJSON.message, response.responseJSON.result);
					document.getElementById("board_configure-output").innerHTML = JSON.stringify(response.responseJSON.message);
				}
			});
		}
		else{

			//NEW: table approach
			return_array = get_selected_rows_from_table("configure_tableboards", "remove");

			headers = return_array[0];
			variables = return_array[1];

			if(variables.length == 0){
				alert('No board(s) selected!');
				document.getElementById('loading_bar').style.visibility='hidden';
			}
			else{
				for(var i=0; i< variables.length; i++){
					//---------------------------------------------------------------------------------
					(function(i){
						setTimeout(function(){
							//---------------------------------------------------------------------------------
							var board_id = variables[i][1];
							var board_name = variables[i][0];

							$.ajax({
								url: s4t_api_url+"/boards/"+board_id+"/conf",
								type: 'PUT',
								dataType: 'json',
								headers: ajax_headers,
								data: JSON.stringify(data),

								success: function(response){
									if(i==variables.length-1) {
										//refresh_tableboards("configure_tableboards", "remove", "C", default_boardlist_columns);
										refresh_lists();
										document.getElementById('loading_bar').style.visibility='hidden';
									}
									document.getElementById("board_configure-output").innerHTML += board_name +": " + JSON.stringify(response.message)+"<br />";
								},
								error: function(response){
									verify_token_expired(response.responseJSON.message, response.responseJSON.result);
									if(i==variables.length-1) {
										//refresh_tableboards("configure_tableboards", "remove", "C", default_boardlist_columns);
										document.getElementById('loading_bar').style.visibility='hidden';
									}
									document.getElementById("board_configure-output").innerHTML += board_name +": " + JSON.stringify(response.responseJSON.message)+"<br />";
								}
							});
							//---------------------------------------------------------------------------------
						},delay*i);
					})(i);
					//---------------------------------------------------------------------------------
				}
			}


			//OLD: select approach
			/*
			//document.getElementById('loading_bar').style.visibility='visible';
			var list = document.getElementById("configure_boardlist");
			var selected_list = [];
			var output_string = '';

			for(var i=0; i< list.length; i++){
				if (list.options[i].selected){
					selected_list.push(list[i].value);
				}
			}

			for(var i=0; i< selected_list.length; i++){
				//---------------------------------------------------------------------------------
				(function(i){
					setTimeout(function(){
						//---------------------------------------------------------------------------------
						var board_id = selected_list[i];

						$.ajax({
							url: s4t_api_url+"/boards/"+board_id+"/conf",
							type: "PUT",
							dataType: 'json',
							headers: ajax_headers,
							data: JSON.stringify(data),

							success: function(response){
								document.getElementById('loading_bar').style.visibility='hidden';
								document.getElementById("board_configure-output").innerHTML = JSON.stringify(response.message);
								refresh_lists();
							},
							error: function(response){
								document.getElementById('loading_bar').style.visibility='hidden';
								verify_token_expired(response.responseJSON.message, response.responseJSON.result);
								document.getElementById("board_configure-output").innerHTML = JSON.stringify(response.responseJSON.message);
							}
						});
						//---------------------------------------------------------------------------------
					},delay*i);
				})(i);
				//---------------------------------------------------------------------------------
			}
			*/
		}
	//}//OLD: select approach
});


$('#action-board').click(function(){

	loading_to_fix(); //TO BE FIXED !!!

	document.getElementById("board_action-output").innerHTML ='';

	var action = document.getElementById("board_actionlist").value;
	//var parameters = document.getElementById("#action-board_parameters").value;

	if(action == "--"){ alert("Select an action!"); document.getElementById('loading_bar').style.visibility='hidden';  }

	//OLD: select approach
	//else if(!$('#action_project').is(':checked') && $('#action_boardlist option:selected').length == 0) {alert('Select a Board'); document.getElementById('loading_bar').style.visibility='hidden';}

	//else if(action != "hostname" && parameters == "") { document.getElementById('loading_bar').style.visibility='hidden'; alert("With reboot and restart_lr commands you have to add the time in seconds parameters!"); }

	else{

		data = {};
		data.action = action;


		if(action == "hostname")
			data.parameters = "";

		else if(action == "reboot" || action == "restart_lr")
			data.parameters = {"time": document.getElementById("#action-board-time").value};
		else
			data.parameters = {"time": document.getElementById("#action-board_parameters").value};

		/*
		data = {};
		data.action = action;

		if(action == "hostname")
			data.parameters = parameters;
		else
			data.parameters = {"time": parameters};
		*/
		if ($('#action_project').is(':checked')){
			var project_id = getCookie("selected_prj");

			$.ajax({
				url: s4t_api_url+"/projects/"+project_id+"/boards/action",
				type: "POST",
				dataType: 'json',
				headers: ajax_headers,
				data: JSON.stringify(data),
			
				success: function(response){
					document.getElementById('loading_bar').style.visibility='hidden';

					//Old output without link to request_id
					//document.getElementById("board_action-output").innerHTML = JSON.stringify(response.message);

					//New output with link to request_id
					//var subject = "/projects/"+project_id+"/boards/action "+action;
					var subject = response.subject;
					document.getElementById("board_action-output").innerHTML = 'Request ID: <a data-reveal-id="modal-show-project-requests" id="'+response.req_id+'" value="'+subject+'" onclick=populate_request_info(this)>'+response.req_id+'</a>';


					//Old version before tables
					/*
					if(action == "reboot" || action == "restart_lr")
						update_boardsv2('action_boardlist', 'C', true);
					*/
			
					refresh_lists();
					$('#board_actionlist').val("--");
					$('#action-board_parameters').val("");
				},
				error: function(response){
					document.getElementById('loading_bar').style.visibility='hidden';
					verify_token_expired(response.responseJSON.message, response.responseJSON.result);
					document.getElementById("board_action-output").innerHTML = JSON.stringify(response.responseJSON.message);
				}
			});
		}
		else{


			//NEW: table approach
			return_array = get_selected_rows_from_table("boardaction_tableboards", "remove");

			headers = return_array[0];
			variables = return_array[1];

			if(variables.length == 0){
				alert('No board(s) selected!');
				document.getElementById('loading_bar').style.visibility='hidden';
			}
			else{
				for(var i=0; i< variables.length; i++){
					//---------------------------------------------------------------------------------
					(function(i){
						setTimeout(function(){
							//---------------------------------------------------------------------------------
							var board_id = variables[i][1];
							var board_name = variables[i][0];

							$.ajax({
								url: s4t_api_url+"/boards/"+board_id+"/action",
								type: 'POST',
								dataType: 'json',
								headers: ajax_headers,
								data: JSON.stringify(data),

								success: function(response){
									if(i==variables.length-1) {

										$('#board_actionlist').val("--");
										$('#action-board_parameters').val("");
										//There is no need to reload the table because it will be in a "not yet" updated status
										/*
										if(action == "reboot" || action == "restart_lr")
											refresh_tableboards("boardaction_tableboards", "remove", "C", default_boardlist_columns);
										*/
										refresh_lists();
										document.getElementById('loading_bar').style.visibility='hidden';
									}
									document.getElementById("board_action-output").innerHTML += board_name +": " + JSON.stringify(response.message)+"<br />";
								},
								error: function(response){
									verify_token_expired(response.responseJSON.message, response.responseJSON.result);
									if(i==variables.length-1) {
										document.getElementById('loading_bar').style.visibility='hidden';
									}
									document.getElementById("board_action-output").innerHTML += board_name +": " + JSON.stringify(response.responseJSON.message)+"<br />";
								}
							});
							//---------------------------------------------------------------------------------
						},delay*i);
					})(i);
					//---------------------------------------------------------------------------------
				}
			}


			//OLD: select approach
			/*
			//document.getElementById('loading_bar').style.visibility='visible';
			var list = document.getElementById("action_boardlist");
			var selected_list = [];
			var output_string = '';
			
			for(var i=0; i< list.length; i++){
				if (list.options[i].selected){
					selected_list.push(list[i].value);
				}
			}

			for(var i=0; i< selected_list.length; i++){
				//---------------------------------------------------------------------------------
				(function(i){
					setTimeout(function(){
						//---------------------------------------------------------------------------------
						var board_id = selected_list[i];
			
						$.ajax({
							url: s4t_api_url+"/boards/"+board_id+"/action",
							type: "POST",
							dataType: 'json',
							headers: ajax_headers,
							data: JSON.stringify(data),

							success: function(response){
								document.getElementById('loading_bar').style.visibility='hidden';
								document.getElementById("board_action-output").innerHTML = JSON.stringify(response.message);
								if(action == "reboot" || action == "restart_lr")
									update_boardsv2('action_boardlist', 'C', true);

								refresh_lists();
								$('#board_actionlist').val("--");
								$('#action-board_parameters').val("");
							},
							error: function(response){
								document.getElementById('loading_bar').style.visibility='hidden';
								verify_token_expired(response.responseJSON.message, response.responseJSON.result);
								document.getElementById("board_action-output").innerHTML = JSON.stringify(response.responseJSON.message);
							}
						});
						//---------------------------------------------------------------------------------
					},delay*i);
				})(i);
				//---------------------------------------------------------------------------------
			}
			*/
		}
	}
});


function refresh_tableboards(table_id, action, board_status, columns) {
	//$('# + select_id).empty();	
	var project_id = getCookie("selected_prj");

	$.ajax({
		//url: s4t_api_url + "/boards/",
		url: s4t_api_url + "/boards?project="+project_id,
		type: 'GET',
		dataType: 'json',
		headers: ajax_headers,

		success: function (response) {
			//var fields_to_show = ["label", "board_id", "status"];
			var fields_to_show = [];
			if(columns)
				fields_to_show = columns;
			else
				fields_to_show = ["label", "board_id", "status"];


			if(board_status != null && board_status != undefined){
				var filtered_boards = [];
				for(var i=0; i<response.message.length; i++){
					if( (board_status && response.message[i].status == board_status) || !board_status)
						filtered_boards.push(response.message[i]);
				}
				parsed_response = parse_json_fields(fields_to_show, filtered_boards, false);
			}
			else
				parsed_response = parse_json_fields(fields_to_show, response.message, false);


			parsed_response = parsed_response.sort(SortByLabel);
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

				var label_lr = "";
				if (info.lr_version != "null" && info.lr_version != undefined)	label_lr = info.lr_version;
				else label_lr = "Unknown";

				$('#info-label').html('<b>Label: </b>'+info.label);
				$('#info-uuid').html('<b>UUID: </b>'+info.board_id);
				$('#info-description').html('<b>Description: </b>'+info.description);
				//$('#info-lr_version').html('<b>Lightning-rod version: </b>'+info.lr_version);
				$('#info-lr_version').html('<b>Lightning-rod version: </b>'+label_lr);

				$('#info-user').html('<b>User: </b>'+info.user);
				$('#info-project').html('<b>Project: </b>'+info.project);
				$('#info-model').html('<b>Model: </b>'+info.model);
				$('#info-layout').html('<b>IoTronic Layout: </b>'+info.layout);
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

					$('[name="services_text"]').text("Exposed on: "+wstun_ip);

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



$('[data-reveal-id="modal-update-pkg-board"]').on('click',
	function(){

		document.getElementById("board_pkg-management-output").innerHTML = '';

		$('#pkg_project').prop('checked', false);
		$('#pkg_boardlist_bundle').show();

		$('#pkg_manager').empty();
		$('#pkg_command').empty();
		$('#pkg_parameters').val("");
		$('#pkg_packages').val("");

		var array_managers = ["opkg", "apt", "pip"];
		var array_commands = ["install", "update", "remove", "upgrade"];

		array_managers = array_managers.sort();
		array_commands = array_commands.sort();

		for(var i=0; i<array_managers.length; i++)
			$('#pkg_manager').append('<option value="'+array_managers[i]+'">'+array_managers[i]+'</option>');

		for(var j=0; j<array_commands.length; j++)
			$('#pkg_command').append('<option value="'+array_commands[j]+'">'+array_commands[j]+'</option>');

		//OLD: select approach
		//update_boardsv2('pkg_boardlist', 'C', true);

		//NEW: table approach
		refresh_tableboards("pkg_tableboards", "remove", "C", default_boardlist_columns);
	}
);


$('[data-reveal-id="modal-updatelr-board"]').on('click',
	function(){

		document.getElementById("board_lr-management-output").innerHTML = '';

		$('#lr_project').prop('checked', false);
		$('#lr_boardlist_bundle').show();

		$('#lr_version').val("");

		var custom_columns = ["label", "board_id", "distro", "lr_version"];
		refresh_tableboards("lr_tableboards", "remove", "C", custom_columns);
	}
);


$('#pkg-man-board').click(function(){

	loading_to_fix(); //TO BE FIXED !!!

	document.getElementById("board_pkg-management-output").innerHTML = '';

	var manager = document.getElementById("pkg_manager").value;
	var command = document.getElementById("pkg_command").value;
	var parameters = document.getElementById("pkg_parameters").value;
	var packages = document.getElementById("pkg_packages").value;

	//console.log(manager+" "+command+" "+parameters+" "+packages);

	if(packages == undefined || packages == ""){
		alert("Insert packages to install!");
		document.getElementById('loading_bar').style.visibility='hidden';
	}
	else{
		data = {};
		data.pkg_mng = manager;
		data.pkg_mng_cmd = command;
		data.pkg_opts = parameters;
		data.pkg_name = packages;

		if ($('#pkg_project').is(':checked')){
			var project_id = getCookie("selected_prj");

			$.ajax({
				url: s4t_api_url+"/projects/"+project_id+"/boards/package",
				type: "POST",
				dataType: 'json',
				headers: ajax_headers,
				data: JSON.stringify(data),
			
				success: function(response){
					document.getElementById('loading_bar').style.visibility='hidden';

					//Old output without link to request_id
					//document.getElementById("board_pkg-management-output").innerHTML = JSON.stringify(response.message);
					//New output with link to request_id
					//var subject = "/projects/"+project_id+"/boards/package "+packages;
					var subject = response.subject;
					document.getElementById("board_pkg-management-output").innerHTML = 'Request ID: <a data-reveal-id="modal-show-project-requests" id="'+response.req_id+'" value="'+subject+'" onclick=populate_request_info(this)>'+response.req_id+'</a>';

					refresh_lists();
				},
				error: function(response){
					document.getElementById('loading_bar').style.visibility='hidden';
					verify_token_expired(response.responseJSON.message, response.responseJSON.result);
					document.getElementById("board_pkg-management-output").innerHTML = JSON.stringify(response.responseJSON.message);
				}
			});
		}
		else{
			data.long_running = true;


			//NEW: table approach
			return_array = get_selected_rows_from_table("pkg_tableboards", "remove");

			headers = return_array[0];
			variables = return_array[1];

			if(variables.length == 0){
				alert('No board(s) selected!');
				document.getElementById('loading_bar').style.visibility='hidden';
			}
			else{
				for(var i=0; i< variables.length; i++){
					//---------------------------------------------------------------------------------
					(function(i){
						setTimeout(function(){
							//---------------------------------------------------------------------------------
							var board_id = variables[i][1];
							var board_name = variables[i][0];

							$.ajax({
								url: s4t_api_url+"/boards/"+board_id+"/package",
								type: 'POST',
								dataType: 'json',
								headers: ajax_headers,
								data: JSON.stringify(data),

								success: function(response){
									if(i==variables.length-1) {
										refresh_tableboards("pkg_tableboards", "remove", "C", default_boardlist_columns);
										refresh_lists();
										document.getElementById('loading_bar').style.visibility='hidden';
									}
									//document.getElementById("board_pkg-management-output").innerHTML += board_name + ": "+JSON.stringify(response.message)+'<br />';
									//var subject = "/projects/"+project_id+"/boards/package "+packages;
									var subject = response.subject;
									document.getElementById("board_pkg-management-output").innerHTML += board_name + ': Request ID: <a data-reveal-id="modal-show-project-requests" id="'+response.req_id+'" value="'+subject+'" onclick=populate_request_info(this)>'+response.req_id+'</a><br />';
								},
								error: function(response){
									verify_token_expired(response.responseJSON.message, response.responseJSON.result);
									if(i==variables.length-1) {
										refresh_tableboards("pkg_tableboards", "remove", "C", default_boardlist_columns);
										document.getElementById('loading_bar').style.visibility='hidden';
									}
									
									document.getElementById("board_pkg-management-output").innerHTML += board_name + ": "+JSON.stringify(response.responseJSON.message)+'<br />';
								}
							});
							//---------------------------------------------------------------------------------
						},delay*i);
					})(i);
					//---------------------------------------------------------------------------------
				}
			}


			//OLD: select approach
			/*
			var list = document.getElementById("pkg_boardlist");
			var selected_list = [];
			var selected_label = [];
			for(var i=0; i< list.length; i++){
				if (list.options[i].selected){
					selected_list.push(list[i].value);
					selected_label.push(list[i].text);
				}
			}
			
			if(selected_list.length == 0){ alert("Select a board!"); document.getElementById('loading_bar').style.visibility='hidden'; }
			else{
				for(var i=0; i< selected_list.length; i++){
					//---------------------------------------------------------------------------------
					(function(i){
						setTimeout(function(){
							//---------------------------------------------------------------------------------
							var board_id = selected_list[i];
							var label = selected_label[i];
				
							$.ajax({
								url: s4t_api_url+"/boards/"+board_id+"/package",
								type: 'POST',
								dataType: 'json',
								headers: ajax_headers,
								data: JSON.stringify(data),
				
								success: function(response){
									if(i==selected_list.length-1){
										document.getElementById('loading_bar').style.visibility='hidden';
										refresh_lists();
									}
									document.getElementById("board_pkg-management-output").innerHTML += label+': '+JSON.stringify(response.message)+'<br />';
								},
								error: function(response){
									verify_token_expired(response.responseJSON.message, response.responseJSON.result);
									if(i==selected_list.length-1) document.getElementById('loading_bar').style.visibility='hidden';
				
									document.getElementById("board_pkg-management-output").innerHTML += label+': '+JSON.stringify(response.responseJSON.message)+'<br />';
									//refresh_lists();
								}
							});
							//---------------------------------------------------------------------------------
						},delay*i);
					})(i);
					//---------------------------------------------------------------------------------
				}
			}
			*/
		}
	}
});


$('.lr_change').click(function(){

	loading_to_fix(); //TO BE FIXED !!!

	document.getElementById("board_lr-management-output").innerHTML = '';
	var version = document.getElementById("lr_version").value;
	var operation = this.id;
	var distro = "";

	data = {};
	data.lr_version = version;
	data.operation = operation;

	if ($('#lr_project').is(':checked')){

		distro = verify_boardslist_uniformity(boards_list, "distro");

		if(distro == false){
			alert("It is not possible to execute the action on boards with different distributions!");
			document.getElementById('loading_bar').style.visibility='hidden';
		}
		else if( (version != undefined && version != "") && distro == "openwrt"){
			alert("It is not possible to specify a version for openwrt distribution!");
			$('#lr_version').val("");
			document.getElementById('loading_bar').style.visibility='hidden';
		}
		else if(version == undefined || version == ""){
			alert("Insert version to install!");
			document.getElementById('loading_bar').style.visibility='hidden';
		}
		else{
			if(confirm("Are you sure you want to update the version of Lightning-rod?")){
				data.distro = distro;
				var project_id = getCookie("selected_prj");

				$.ajax({
					url: s4t_api_url+"/projects/"+project_id+"/lr",
					type: "POST",
					dataType: 'json',
					headers: ajax_headers,
					data: JSON.stringify(data),

					success: function(response){
						document.getElementById('loading_bar').style.visibility='hidden';

						//New output with link to request_id
						//var subject = "batch LR update";
						var subject = response.subject;
						document.getElementById("board_lr-management-output").innerHTML = 'Request ID: <a data-reveal-id="modal-show-project-requests" id="'+response.req_id+'" value="'+subject+'" onclick=populate_request_info(this)>'+response.req_id+'</a>';

						refresh_lists();
					},
					error: function(response){
						document.getElementById('loading_bar').style.visibility='hidden';
						verify_token_expired(response.responseJSON.message, response.responseJSON.result);
						document.getElementById("board_lr-management-output").innerHTML = JSON.stringify(response.responseJSON.message);
					}
				});
			}
			else
				document.getElementById('loading_bar').style.visibility='hidden';
		}
	}
	else{
		//NEW: table approach
		return_array = get_selected_rows_from_table("lr_tableboards", "remove");

		headers = return_array[0];
		variables = return_array[1];

		if(variables.length == 0){
			alert('No board(s) selected!');
			document.getElementById('loading_bar').style.visibility='hidden';
		}
		else{
			var selected_list = [];
			for(var i=0; i<variables.length; i++)
				selected_list.push(variables[i][1]);

			boardinfo_list = get_boardinfo_from_uuid_array(selected_list);
			distro = verify_boardslist_uniformity(boardinfo_list, "distro");

			if(distro == false){
				alert("It is not possible to execute the action on boards with different distributions!");
				document.getElementById('loading_bar').style.visibility='hidden';
			}
			else if( (version != undefined && version != "") && distro == "openwrt"){
				alert("It is not possible to specify a version for openwrt distribution!");
				$('#lr_version').val("");
				document.getElementById('loading_bar').style.visibility='hidden';
			}
			else{
				if(confirm("Are you sure you want to update the version of Lightning-rod?")){
					//data.distro = distro;

					var custom_columns = ["label", "board_id", "distro", "lr_version"];

					for(var i=0; i< variables.length; i++){
						//---------------------------------------------------------------------------------
						(function(i){
							setTimeout(function(){
								//---------------------------------------------------------------------------------
								var board_id = variables[i][1];
								var board_name = variables[i][0];

								$.ajax({
									url: s4t_api_url+"/boards/"+board_id+"/lr",
									type: 'POST',
									dataType: 'json',
									headers: ajax_headers,
									data: JSON.stringify(data),

									success: function(response){
										if(i==variables.length-1) {
											refresh_tableboards("lr_tableboards", "remove", "C", custom_columns);
											refresh_lists();
											document.getElementById('loading_bar').style.visibility='hidden';
										}
										//New output with link to request_id
										//var subject = "LR update";
										var subject = response.subject;
										document.getElementById("board_lr-management-output").innerHTML += board_name +' Request ID: <a data-reveal-id="modal-show-project-requests" id="'+response.req_id+'" value="'+subject+'" onclick=populate_request_info(this)>'+response.req_id+'</a><br />';
									},
									error: function(response){
										verify_token_expired(response.responseJSON.message, response.responseJSON.result);
										if(i==variables.length-1) {
											refresh_tableboards("lr_tableboards", "remove", "C", custom_columns);
											document.getElementById('loading_bar').style.visibility='hidden';
										}
										document.getElementById("board_lr-management-output").innerHTML += board_name + ": "+ JSON.stringify(response.responseJSON.message)+'<br />';
									}
								});
								//---------------------------------------------------------------------------------
							},delay*i);
						})(i);
						//---------------------------------------------------------------------------------
					}
				}
				else
					document.getElementById('loading_bar').style.visibility='hidden';
			}
		}
	}
});


