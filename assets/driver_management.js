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


$('[data-reveal-id="modal-show-drivers"]').on('click',
	function() {
		$.ajax({
			url: s4t_api_url+"/drivers",
			type: "GET",
			dataType: 'json',
			headers: ajax_headers,

			success: function(response){
				response.message = response.message.sort(SortByName);
				create_table_from_json("show_drivers_table", response.message, null);
			},
			error: function(response){
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
			}
		});
	}
);


$('[data-reveal-id="modal-create-driver"]').on('click',
        function(){
		$('#driver_create-output').empty();
        }
);


$('[data-reveal-id="modal-destroy-driver"]').on('click',
	function(){
		$('#driver_destroy-output').empty();
		refresh_tabledrivers('destroy_tabledrivers', 'destroy');
	}
);


$('[data-reveal-id="modal-inject-driver"]').on('click',
	function(){
		$('#driver_inject-output').empty();
		refresh_cloud_drivers('inject_driverlist');
		update_boardsv2('inject_driver_boardlist', 'C', true);
	}
);


$('[data-reveal-id="modal-mount-driver"]').on('click',
	function(){
		$('#driver_mount-output').empty();
		update_boardsv2('mount_boardlist', 'C');
		$('#mount_div_remote').hide();
	}
);


$('[data-reveal-id="modal-unmount-driver"]').on('click',
	function(){
		$('#driver_unmount-output').empty();
		update_boardsv2('unmount_boardlist', 'C');
	}
);


$('[data-reveal-id="modal-write-driver"]').on('click',
	function(){
		$('#driver_write-output').empty();
		update_boardsv2('write_driver_boardlist', 'C');
	}
);


$('[data-reveal-id="modal-read-driver"]').on('click',
	function(){
		$('#driver_read-output').empty();
		update_boardsv2('read_driver_boardlist', 'C');
	}
);


$('[data-reveal-id="modal-remove-driver"]').on('click',
	function(){
		$('#driver_remove-output').empty();
		$('#driver_remove_table_section').hide();
		update_boardsv2('remove_driver_boardlist', 'C');
	}
);


$('[data-reveal-id="modal-board-drivers"]').on('click',
	function(){
		$('#show_boarddrivers_section').hide();
		update_boardsv2('drivers_boardlist');
	}
);



$('[id="write_driver_boardlist"]').on('change',
	function() {
		var board_id = $( "#write_driver_boardlist option:selected" ).val();
		refresh_localboard_drivers(board_id, "write");
	}
);


$('[id="read_driver_boardlist"]').on('change',
	function() {
		var board_id = $( "#read_driver_boardlist option:selected" ).val();
		refresh_localboard_drivers(board_id, "read");
	}
);


$('[id="remove_driver_boardlist"]').on('change',
	function() {
		var board_id = $( "#remove_driver_boardlist option:selected" ).val();
		//refresh_localboard_drivers(board_id, "remove");
		$('#driver_remove_table_section').show();
		refresh_tabledrivers("driver_remove_table", "remove", board_id);
	}
);


$('[data-reveal-id="modal-mount-driver"]').on('click',
	function() {
		toggle_radio_mount();
		$('#mount_driverlist').empty();
		$('#mount_driverlist').append('<option value="--">--</option>');
	}
);

$('[data-reveal-id="modal-unmount-driver"]').on('click',
	function() {
		$('#unmount_driverlist').empty();
		$('#unmount_driverlist').append('<option value="--">--</option>');
	}
);

$('[data-reveal-id="modal-write-driver"]').on('click',
	function() {
		$('#write_driverlist').empty();
		$('#write_driverlist').append('<option value="--">--</option>');
		$('#write_filename').empty();
		$('#write_file_content').empty();
	}
);

$('[data-reveal-id="modal-read-driver"]').on('click',
	function() {
		$('#read_driverlist').empty();
		$('#read_driverlist').append('<option value="--">--</option>');
		$('#read_filename').empty();
	}
);

$('[id="mount_boardlist"]').on('change',
	function() {
		var radio = document.getElementById('mount_radio_remote');
		if(radio.checked) update_boardlist('mount_boardlist', 'mount_remote_boardlist');

		var board_id = $( "#mount_boardlist option:selected" ).val();
		refresh_localboard_drivers(board_id, "mount");
	}
);


$('[id="unmount_boardlist"]').on('change',
	function() {
		var board_id = $( "#unmount_boardlist option:selected" ).val();
		refresh_localboard_drivers(board_id, "unmount");
	}
);


$('[data-reveal-id="modal-remove-driver"]').on('click',
	function(){
		$('#driver_remove_table_section').hide();
	}
);


$('[id="drivers_boardlist"]').on('change',
	function(){
		var show_board_drivers = document.getElementById("drivers_boardlist").value;
		if(show_board_drivers == "--"){
			alert("Select a board!");
			$("#show_boarddrivers_section").hide();
			document.getElementById('loading_bar').style.visibility='hidden';
		}
		else{
			$("#show_boarddrivers_section").show();

			$.ajax({
				url: s4t_api_url+"/boards/"+show_board_drivers+"/drivers",
				type: "GET",
				dataType: 'json',
				headers: ajax_headers,

				success: function(response){
					document.getElementById('loading_bar').style.visibility='hidden';
					if(response.message.length ==0){
						$("#show_boarddrivers_table").html('<tr><td style="text-align:center">No drivers</td></tr>');
					}
					else{
						var fields_to_show = ["name", "state", "latest_change"];
						parsed_response = parse_json_fields(fields_to_show, response.message, false);
						create_table_from_json("show_boarddrivers_table", parsed_response, fields_to_show);
					}
				},
				error: function(response){
					document.getElementById('loading_bar').style.visibility='hidden';
					verify_token_expired(response.responseJSON.message, response.responseJSON.result);
					console.log(response.responseJSON.message);
				}
			});
		}
	}
);


$('#create_driver').click(function(){

	var driver_name = document.getElementById("create_driver_name").value;
	var driver_json = document.getElementById("create_driver_json").value;
	var driver_code = document.getElementById("create_driver_code").value;
	document.getElementById("driver_create-output").innerHTML ='';

	if(driver_name == "") { alert("Insert driver name!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else if(driver_json == "") { alert("Insert json!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else if(driver_code == "") { alert("Insert driver code!"); document.getElementById('loading_bar').style.visibility='hidden';}

	else{
		data = {};

		//document.getElementById('loading_bar').style.visibility='visible';
		data.driver_name = driver_name;
		data.driver_json = driver_json;
		data.driver_code = driver_code;

		$.ajax({
			url: s4t_api_url+"/drivers",
			type: 'POST',
			dataType: 'json',
			headers: ajax_headers,
			data: JSON.stringify(data),

			success: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				document.getElementById("driver_create-output").innerHTML = JSON.stringify(response.message);
			},
			error: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
				document.getElementById("driver_create-output").innerHTML = JSON.stringify(response.responseJSON.message);
			}
		});
	}
});

$('#destroy_driver').click(function(){

	return_array = get_selected_rows_from_table("destroy_tabledrivers", "destroy");

	headers = return_array[0];
	variables = return_array[1];

	document.getElementById("driver_destroy-output").innerHTML ='';

	if(variables.length == 0){
		alert('No driver(s) to destroy are selected!');
		document.getElementById('loading_bar').style.visibility='hidden';
	}
	else{
		for(var i=0; i< variables.length; i++){
			//---------------------------------------------------------------------------------
			(function(i){
				setTimeout(function(){
					//---------------------------------------------------------------------------------
					var driver_name = variables[i][1];

					$.ajax({
						url: s4t_api_url+"/drivers/"+driver_name,
						type: "DELETE",
						dataType: 'json',
						headers: ajax_headers,

						success: function(response){
							if(i==variables.length-1) {
								refresh_tabledrivers("destroy_tabledrivers", "destroy");
								document.getElementById('loading_bar').style.visibility='hidden';
							}
							document.getElementById("driver_destroy-output").innerHTML += JSON.stringify(response.message);
						},
						error: function(response){
							verify_token_expired(response.responseJSON.message, response.responseJSON.result);
							if(i==variables.length-1) document.getElementById('loading_bar').style.visibility='hidden';
							document.getElementById("driver_destroy-output").innerHTML += JSON.stringify(response.responseJSON.message)+"<br />";
						}
					});
					//---------------------------------------------------------------------------------
				},delay*i);
			})(i);
			//---------------------------------------------------------------------------------
		}
	}
});


document.getElementById('driver_userfile').addEventListener('change', readFile, false);
document.getElementById('driver_userfile').element_id = "create_driver_code";


$('#inject_driver').click(function(){

	document.getElementById("driver_inject-output").innerHTML ='';
	var driver_name = document.getElementById("inject_driverlist").value;
	var inject_autostart = document.getElementById("inject_driver_autostart").value;

	if(driver_name == "") { alert("Select driver name!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else if ($('#inject_driver_boardlist option:selected').length == 0) { alert('Select a Board'); document.getElementById('loading_bar').style.visibility='hidden'; }
	else {
		//document.getElementById('loading_bar').style.visibility='visible';
		var list = document.getElementById("inject_driver_boardlist");
		var selected_list = [];
		var selected_names = [];
		var output_string = '';

		data = {};
		data.driver_name = driver_name;
		data.onboot = inject_autostart;


		for(var i=0; i< list.length; i++){
			if (list.options[i].selected){
				selected_list.push(list[i].value);
				selected_names.push(list[i].text);
			}
		}
		for(var i=0; i< selected_list.length; i++){
			//---------------------------------------------------------------------------------
			(function(i){
				setTimeout(function(){
					//---------------------------------------------------------------------------------
					var board_id = selected_list[i];
					var board_name = selected_names[i];
					$.ajax({
						url: s4t_api_url+"/boards/"+board_id+"/drivers",
						type: "PUT",
						dataType: 'json',
						headers: ajax_headers,
						data: JSON.stringify(data),

						success: function(response){
							if(i==selected_list.length-1) document.getElementById('loading_bar').style.visibility='hidden';
							document.getElementById("driver_inject-output").innerHTML += board_name+ ' with '+ driver_name+': '+JSON.stringify(response.message) +'<br />';
						},
						error: function(response){
							verify_token_expired(response.responseJSON.message, response.responseJSON.result);
							if(i==selected_list.length-1) document.getElementById('loading_bar').style.visibility='hidden';
							document.getElementById("driver_inject-output").innerHTML += board_name+ ' with '+driver_name+': '+JSON.stringify(response.responseJSON.message) +'<br />';
						}
					});
					//---------------------------------------------------------------------------------
				},delay*i);
			})(i);
			//---------------------------------------------------------------------------------
		}
	}
});


$('#mount_driver').click(function(){

	var local_board = document.getElementById("mount_boardlist").value;
	var driver_name = document.getElementById("mount_driverlist").value;

	var remote_board = "";

	document.getElementById("driver_mount-output").innerHTML = "";

	if(local_board == "--"){ alert("Select a local board!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else if(driver_name == "--"){ alert("Select a driver!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else {
		//document.getElementById('loading_bar').style.visibility='visible';

		var type = "";
		if( $('#mount_radio_local').is(':checked') )            type="local";
		else if( $('#mount_radio_remote').is(':checked') )      type="remote";

		//var local_board = document.getElementById("mount_boardlist").value;
		var local_boardname = $("#mount_boardlist option:selected").text();
		//var remote_board = "";

		var flag= "false";

		if(type == "remote"){
			//var remote_board = document.getElementById("mount_remote_boardlist").value;
			var remote_boardname = $("#mount_remote_boardlist option:selected").text();
			flag = "true";
		}

		//var driver_name = document.getElementById("mount_driverlist").value;

		var data = {};

		if(flag=="true")
			data = {remote_driver: flag, driver_operation: "mount", mirror_board: remote_board};
		else
			data = {remote_driver: flag, driver_operation: "mount"};

		$.ajax({
			url: s4t_api_url+"/boards/"+local_board+"/drivers/"+driver_name+"/action",
			type: 'POST',
			dataType: 'json',
			headers: ajax_headers,
			data: JSON.stringify(data),

			success: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				if(type == "remote")
					document.getElementById("driver_mount-output").innerHTML = local_boardname +' with remote '+remote_boardname+': '+JSON.stringify(response.message) +'<br />';
				else
					document.getElementById("driver_mount-output").innerHTML = local_boardname +': '+JSON.stringify(response.message) +'<br />';
			},
			error: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
				if(type == "remote")
					document.getElementById("driver_mount-output").innerHTML = local_boardname +' with remote '+remote_boardname+': '+JSON.stringify(response.responseJSON.message) +'<br />';
				else
					document.getElementById("driver_mount-output").innerHTML = local_boardname +': '+JSON.stringify(response.responseJSON.message) +'<br />';
			}
		});
	}
});


$('#unmount_driver').click(function(){

	var local_board = document.getElementById("unmount_boardlist").value;
	var driver_name = document.getElementById("unmount_driverlist").value;

	document.getElementById("driver_unmount-output").innerHTML = "";
	
	if(local_board == "--"){ alert("Select a board!"); document.getElementById('loading_bar').style.visibility='hidden'; }
	else if(driver_name == "--"){ alert("Select a driver!"); document.getElementById('loading_bar').style.visibility='hidden'; }

	/*
	if ($('#unmount_boardlist option:selected').length == 0) {
		alert('Select a Board');
		document.getElementById('loading_bar').style.visibility='hidden';
	}
	*/

	else {
		//document.getElementById('loading_bar').style.visibility='visible';

		//var board_id = document.getElementById("unmount_boardlist").value;
		var board_name = $("#unmount_boardlist option:selected").text();
		//var driver_name = document.getElementById("unmount_driverlist").value;

		data = {};
		data.driver_operation = "unmount";

		$.ajax({
			url: s4t_api_url+"/boards/"+local_board+"/drivers/"+driver_name+"/action",
			type: 'POST',
			dataType: 'json',
			headers: ajax_headers,
			data: JSON.stringify(data),

			success: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				document.getElementById("driver_unmount-output").innerHTML = board_name +': '+JSON.stringify(response.message) +'<br />';
			},
			error: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
				document.getElementById("driver_unmount-output").innerHTML = board_name +': '+JSON.stringify(response.responseJSON.message) +'<br />';
			}
		});
	}
});


$('#write_driver').click(function(){

	var local_board = document.getElementById("write_driver_boardlist").value;
	var board_name = $("#write_driver_boardlist option:selected").text();
	var driver_name = document.getElementById("write_driverlist").value;

	var filename = document.getElementById("write_filename").value;
	var file_content = document.getElementById("write_file_content").value;

	document.getElementById("driver_write-output").innerHTML = "";


	if(local_board == "--") { alert('Select a Board'); document.getElementById('loading_bar').style.visibility='hidden'; }
	else if(driver_name == "--") { alert('Driver missing'); document.getElementById('loading_bar').style.visibility='hidden'; }
	else if(filename == "") { alert('File Name missing'); document.getElementById('loading_bar').style.visibility='hidden'; }
	else if(file_content == "") { alert('File content missing'); document.getElementById('loading_bar').style.visibility='hidden'; }
	else {
		data = {};
		data.driver = driver_name;
		data.driver_exp_filename = filename;
		data.filecontent = file_content;
		$.ajax({
			url: s4t_api_url+"/boards/"+local_board+"/drivers/write",
			type: 'POST',
			dataType: 'json',
			headers: ajax_headers,
			data: JSON.stringify(data),

			success: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				if(response.result == "SUCCESS")
					document.getElementById("driver_write-output").innerHTML = board_name+'--> Result: '+JSON.stringify(response.message.value);
				else
					document.getElementById("driver_write-output").innerHTML = board_name+'--> Error: '+JSON.stringify(response.message.response);
			},
			error: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
				document.getElementById("driver_write-output").innerHTML = board_name+'--> Result: '+JSON.stringify(response.responseJSON.message);
			}
		});
	}
});



$('#read_driver').click(function(){

	var local_board = document.getElementById("read_driver_boardlist").value;
	var board_name = $("#read_driver_boardlist option:selected").text();
	var driver_name = document.getElementById("read_driverlist").value;
	var filename = document.getElementById("read_filename").value;

	document.getElementById("driver_read-output").innerHTML = "";

	if(local_board == "--") { alert('Select a Board'); document.getElementById('loading_bar').style.visibility='hidden'; }
	else if(driver_name == "--") { alert('Driver missing'); document.getElementById('loading_bar').style.visibility='hidden'; }
	else if(filename == "") { alert('File Name missing'); document.getElementById('loading_bar').style.visibility='hidden'; }
	else {
		data = {};
		data.driver = driver_name;
		data.driver_exp_filename = filename;

		$.ajax({
			url: s4t_api_url+"/boards/"+local_board+"/drivers/read",
			type: 'POST',
			dataType: 'json',
			headers: ajax_headers,
			data: JSON.stringify(data),

			success: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				document.getElementById("read_file_content").innerHTML = response.message.value;
				document.getElementById("driver_read-output").innerHTML = +board_name+'--> Value: '+JSON.stringify(response.message.value);
			},
			error: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
				document.getElementById("read_file_content").innerHTML = response.message.value;
				document.getElementById("driver_read-output").innerHTML = board_name+'--> Value: '+JSON.stringify(response.responseJSON.message.value);
			}
		});
	}
});

$('#remove_driver').click(function(){

	var board_id = document.getElementById("remove_driver_boardlist").value;

	if(board_id == "--"){alert('Select a board!'); document.getElementById('loading_bar').style.visibility='hidden';}
	else{
		return_array = get_selected_rows_from_table("driver_remove_table", "remove");

		headers = return_array[0];
		variables = return_array[1];

		document.getElementById("driver_remove-output").innerHTML ='';

		if(variables.length == 0){
			alert('No driver(s) to remove are selected!');
			document.getElementById('loading_bar').style.visibility='hidden';
		}
		else{
			for(var i=0; i< variables.length; i++){
				//---------------------------------------------------------------------------------
				(function(i){
					setTimeout(function(){
						//---------------------------------------------------------------------------------
						var driver_name = variables[i][0];

						$.ajax({
							url: s4t_api_url+"/boards/"+board_id+"/drivers/"+driver_name,
							type: "DELETE",
							dataType: 'json',
							headers: ajax_headers,

							success: function(response){
								if(i==variables.length-1) {
									refresh_tabledrivers("driver_remove_table", "remove", board_id);
									document.getElementById('loading_bar').style.visibility='hidden';
								}
								document.getElementById("driver_remove-output").innerHTML += JSON.stringify(response.message);
							},
							error: function(response){
								verify_token_expired(response.responseJSON.message, response.responseJSON.result);
								if(i==variables.length-1) document.getElementById('loading_bar').style.visibility='hidden';
								document.getElementById("driver_remove-output").innerHTML += JSON.stringify(response.responseJSON.message)+"<br />";
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


function toggle_radio_mount(val){
	if ( val && (val.id == 'mount_radio_remote') ){
		$('#mount_radio_local').removeAttr('checked');
		$('#mount_div_remote').show();

		update_boardlist('mount_boardlist', 'mount_remote_boardlist');
	}

	else {
		$('#mount_radio_remote').removeAttr('checked');
		$('#mount_div_remote').hide();

		if(!val)
			$('#mount_radio_local').prop('checked', true);
	}
}



function refresh_cloud_drivers(select_id){
	$('#'+select_id).empty();
	$.ajax({

		url: s4t_api_url+"/drivers",
		type: "GET",
		headers: ajax_headers,

		success: function(response){

			if(response.message.length == 0)
				$('#'+select_id).append('<option>NO driver injected or running</option>');
			else{
				for(i=0; i<response.message.length; i++){
					response.message = response.message.sort(SortByName);
					$('#'+select_id).append('<option value="'+response.message[i].name+'">'+response.message[i].name+'</option>');
				}
			}
		},
		error: function(response){
			verify_token_expired(response.responseJSON.message, response.responseJSON.result);
			//alert('ERROR: '+JSON.stringify(response));
		}
	});
}



function refresh_localboard_drivers(board_id, select){
	$.ajax({
		url: s4t_api_url+"/boards/"+board_id+"/drivers",
		type: "GET",
		headers: ajax_headers,

		success: function(response){

			$('#'+select+'_driverlist').empty();
			if(response.message.length == 0){
				//$('#'+select+'_driverlist').append('<option value="nodriver">NO driver</option>');
				alert('No drivers injected in this board!');
				$('#'+select+'_driverlist').append('<option value="--">--</option>');
			}
			else{
				response.message = response.message.sort(SortByName);
				for(i=0; i<response.message.length; i++){
					//Write driver
					if(select == "write" || select == "read") {
						if(response.message[i].state == "mounted")
							$('#'+select+'_driverlist').append('<option value="'+response.message[i].name+'">'+response.message[i].name+'</option>');
					}
					//Others...
					else
						$('#'+select+'_driverlist').append('<option value="'+response.message[i].name+'">'+response.message[i].name+'</option>');
				}
			}
		},
		error: function(response){
			verify_token_expired(response.responseJSON.message, response.responseJSON.result);
			//alert('ERROR: '+JSON.stringify(response));
		}
	});
}

function refresh_tabledrivers(table_id, action, board_id) {
	//$('#' + select_id).empty();

	if(board_id) url = s4t_api_url + "/boards/"+board_id+"/drivers";
	else url = s4t_api_url + "/drivers";

	$.ajax({
		url: url,
		type: 'GET',
		dataType: 'json',
		headers: ajax_headers,

		success: function (response) {
			create_table_from_json(table_id, response.message, null, action);
		},
		error: function (response) {
			verify_token_expired(response.responseJSON.message, response.responseJSON.result);
		}
	});
}
