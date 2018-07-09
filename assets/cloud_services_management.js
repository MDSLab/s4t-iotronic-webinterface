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

$('[data-reveal-id="modal-show-services"]').on('click',
	function() {

		var id = this.getAttribute("data-reveal-id");
		$('#'+id).find('[name=services_text]').text("Exposed on: "+wstun_ip);

		$.ajax({
			url: s4t_api_url+"/services",
			type: "GET",
			dataType: 'json',
			headers: ajax_headers,

			success: function(response){
				create_table_from_json("show_services_table", response.message, null);
			},
			error: function(response){
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
			}
		});
	}
);


function get_protocols_list(select_id){
	$('#'+select_id).empty();

	var protocols_array = ["HTTP", "HTTPS", "MQTT", "SSH"];
	protocols_array = protocols_array.sort();

	for(var i=0; i<protocols_array.length; i++){
		$('#'+select_id).append('<option value="'+protocols_array[i]+'">'+protocols_array[i]+'</option>');
	}
}


function compose_service_shortcut(protocol, port){
	var shortcut = "";
	
	if(protocol == "HTTP") shortcut = "http://"+wstun_ip+":"+port;
	else if(protocol == "MQTT") shortcut = 'mosquitto_sub -t "#" -h '+wstun_ip+' -p '+port;
	else if(protocol == "SSH") shortcut = "ssh -p "+port+" root@"+wstun_ip;

	return shortcut;
}


function clean_service_fields(form_name, flag_output){
	document.getElementById(form_name+"_service_name").value = '';
	document.getElementById(form_name+"_port").value = '';
	$("#"+form_name+"_protocol").val("HTTP");

	if(flag_output)
		document.getElementById("service_"+form_name+"-output").innerHTML ='';
}


$('[data-reveal-id="modal-register-service"]').on('click',
	function() {

		get_protocols_list("register_protocol");
		clean_service_fields("register", true);
	}
);


$('[data-reveal-id="modal-update-service"]').on('click',
	function() {
		get_protocols_list("update_protocol");
		clean_service_fields("update", true);
		update_services('update_servicelist');
	}
);


$('[data-reveal-id="modal-delete-service"]').on('click',
	function(){
		$('#service_delete-output').empty();
		update_services('delete_servicelist');
	}
);


$('[data-reveal-id="modal-status-service"]').on('click',
	function(){
		$('#service_status-output').empty();
		update_services('status_servicelist'); 
		update_boardsv2('servicestatus_boardlist', 'C', true);
	}
);


$('[data-reveal-id="modal-board-services"]').on('click',
	function(){
		$("#modal-board-services").addClass("small");
		var id = this.getAttribute("data-reveal-id");
		$('#'+id).find('[name=services_text]').text("Exposed on: "+wstun_ip);

		$('#show_boardservices_section').hide();
		update_boardsv2('services_boardlist');
	}
);


$('[id="status_servicelist"]').on('change',
	function(){
		document.getElementById("service_status-output").innerHTML ='';
	}
);


$('[id="update_servicelist"]').on('change',
	function() {

		if($('#update_servicelist').find(":selected").data("value") == "--"){
			document.getElementById("update_service_name").value = "";
			document.getElementById("update_port").value = "";
			$("#update_protocol").val("HTTP");
		}
		else{
			document.getElementById("update_service_name").value = $(this).find(":selected").data("value").service_name;
			document.getElementById("update_port").value = $(this).find(":selected").data("value").port;

			var protocol = $(this).find(":selected").data("value").protocol;
			$("#update_protocol").val(protocol);
		}
	}
);




$('#register_service').click(function(){

	var service_name = document.getElementById("register_service_name").value;
	var port = parseInt(document.getElementById("register_port").value);

	document.getElementById("service_register-output").innerHTML ='';

	if(service_name == ""){ alert("Insert Service Name!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else if(port !== port){ alert("Specify a Port number different from zero(s)"); 	document.getElementById('loading_bar').style.visibility='hidden'; }
	else{
		data = {};
		data.service_name = service_name;
		data.port = port;
		data.protocol = document.getElementById("register_protocol").value;

		$.ajax({
			url: s4t_api_url+"/services",
			type: 'POST',
			dataType: 'json',
			headers: ajax_headers,
			data: JSON.stringify(data),

			success: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				document.getElementById("service_register-output").innerHTML = JSON.stringify(response.message);
				refresh_lists();
			},
			error: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
				document.getElementById("service_register-output").innerHTML = JSON.stringify(response.responseJSON.message);
			}
		});
	}
});


$('#update_service').click(function(){

	var old_service_name = $('#update_servicelist').find(":selected").data("value").service_name;

	var service_name = document.getElementById("update_service_name").value;
	var port = document.getElementById("update_port").value;
	var protocol = document.getElementById("update_protocol").value;


	//if(document.getElementById("update_servicelist").value == "--"){

	document.getElementById("service_update-output").innerHTML = '';

	if(old_service_name == "--" || old_service_name == undefined){ alert("Select a service"); document.getElementById('loading_bar').style.visibility='hidden'; }
	else if(service_name == ""){ alert("Insert Service Name!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else if(port == ""){ alert("Specify a Port number different from zero(s)"); document.getElementById('loading_bar').style.visibility='hidden';	}
	else{
		//var old_service_name = $('#update_servicelist').find(":selected").data("value").service_name;
		data = {};
		data.service_name = service_name;
		data.port = port;
		data.protocol = protocol;

		$.ajax({
			url: s4t_api_url+"/services/"+old_service_name,
			type: 'PATCH',
			dataType: 'json',
			headers: ajax_headers,
			data: JSON.stringify(data),

			success: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				document.getElementById("service_update-output").innerHTML = JSON.stringify(response.message);
				update_services("update_servicelist");
				refresh_lists();
			},
			error: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
				document.getElementById("service_update-output").innerHTML = JSON.stringify(response.responseJSON.message);
				update_services("update_servicelist");
			}
		}).then(
			function(){
				document.getElementById("update_service_name").value = "";
				document.getElementById("update_port").value = "";
				$("#update_protocol").val("HTTP");
			});
	}
});


$('#delete_service').click(function(){

	var service_name = $('#delete_servicelist').find(":selected").data("value").service_name;

	document.getElementById("service_delete-output").innerHTML ='';

	if(service_name == "--" || service_name == undefined){ 	alert("Select a service!"); document.getElementById('loading_bar').style.visibility='hidden'; 	}
	else{
		$.ajax({
			url: s4t_api_url+"/services/"+service_name,
			type: 'DELETE',
			dataType: 'json',
			headers: ajax_headers,

			success: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				document.getElementById("service_delete-output").innerHTML = JSON.stringify(response.message);
				update_services("delete_servicelist");
				refresh_lists();
			},
			error: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
				document.getElementById("service_delete-output").innerHTML = JSON.stringify(response.responseJSON.message);
				update_services("delete_servicelist");
				//refresh_lists();
			}
		});
	}
});

$('.status_service').click(function(){

	var service_name = $('#status_servicelist').find(":selected").data("value").service_name;
	document.getElementById("service_status-output").innerHTML ='';

	if(!service_name){ alert("Select a service!"); document.getElementById('loading_bar').style.visibility='hidden';	}
	//else if(selected_list.length == 0){ alert("Select a board!"); document.getElementById('loading_bar').style.visibility='hidden'; }
	else{
		data = {};

		if (this.id == "restore_service") data.service_action = "restore";
		else if (this.id == "disable_service") data.service_action = "disable";
		else data.service_action = "enable";


		if ($('#servicestatus_project').is(':checked')){

			var project_id = getCookie("selected_prj");

			$.ajax({
				url: s4t_api_url+"/projects/"+project_id+"/services/"+service_name+"/action",
				type: "POST",
				dataType: 'json',
				headers: ajax_headers,
				data: JSON.stringify(data),
			
				success: function(response){
					document.getElementById('loading_bar').style.visibility='hidden';
					document.getElementById("service_status-output").innerHTML = JSON.stringify(response.message);
					refresh_lists();
				},
				error: function(response){
					document.getElementById('loading_bar').style.visibility='hidden';
					verify_token_expired(response.responseJSON.message, response.responseJSON.result);
					document.getElementById("service_status-output").innerHTML = JSON.stringify(response.responseJSON.message);
				}
			});
		}
		else{
			var list = document.getElementById("servicestatus_boardlist");
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
								url: s4t_api_url+"/boards/"+board_id+"/services/"+service_name+"/action",
								type: 'POST',
								dataType: 'json',
								headers: ajax_headers,
								data: JSON.stringify(data),

								success: function(response){
									if(i==selected_list.length-1){
										document.getElementById('loading_bar').style.visibility='hidden';
										refresh_lists();
									}
									document.getElementById("service_status-output").innerHTML += label+': '+JSON.stringify(response.message)+'<br />';
								},
								error: function(response){
									verify_token_expired(response.responseJSON.message, response.responseJSON.result);
									if(i==selected_list.length-1) document.getElementById('loading_bar').style.visibility='hidden';
							
									document.getElementById("service_status-output").innerHTML += label+': '+JSON.stringify(response.responseJSON.message)+'<br />';
									//refresh_lists();
								}
							});
							//---------------------------------------------------------------------------------
						},delay*i);
					})(i);
					//---------------------------------------------------------------------------------
				}
			}
		}
	}
});


$('[id="services_boardlist"]').on('change',
	function(){
		var show_board_services = document.getElementById("services_boardlist").value;
		if(show_board_services == "--"){
			$("#modal-board-services").addClass("small");
			//alert("Select a board!");
			$("#show_boardservices_section").hide();
			document.getElementById('loading_bar').style.visibility='hidden';
		}
		else{
			$("#modal-board-services").removeClass("small");
			$("#show_boardservices_section").show();

			$.ajax({
				url: s4t_api_url+"/boards/"+show_board_services+"/services",
				type: "GET",
				dataType: 'json',
				headers: ajax_headers,

				success: function(response){
					document.getElementById('loading_bar').style.visibility='hidden';
					if(response.message.length ==0){
						$("#show_boardservices_table").html('<tr><td style="text-align:center">No services</td></tr>');
					}
					else{
						//Without extra data
						//********************************************************************************************
						/*
						var fields_to_show = ["service_name", "public_port", "local_port", "protocol", "last_update"];
						parsed_response = parse_json_fields(fields_to_show, response.message, false);
						create_table_from_json("show_boardservices_table", parsed_response, fields_to_show);
						*/
						//********************************************************************************************


						//With extra data
						//********************************************************************************************
						var fields_to_show = ["service_name", "public_port", "local_port", "protocol", "last_update"];
						parsed_response = parse_json_fields(fields_to_show, response.message, false);

						var extra_fields = ["shortcut"];

						for(var i=0; i<extra_fields.length; i++){
							fields_to_show.push(extra_fields[i]);

							for(var j=0; j<parsed_response.length; j++){
								var shortcut = compose_service_shortcut(parsed_response[j]["protocol"], parsed_response[j]["public_port"]);
								parsed_response[j][extra_fields[i]] = shortcut;
							}
						}
						create_table_from_json("show_boardservices_table", parsed_response, fields_to_show);
						//********************************************************************************************
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


function update_services(select_id){
	$.ajax({
		url: s4t_api_url+"/services",
		type: 'GET',
		dataType: 'json',
		headers: ajax_headers,

		success: function(response){
			$('#'+select_id).empty();
			$('#'+select_id).append('<option title="--" data-value="--" data-unit="">--</option>');
			response.list = response.message.sort(SortByName);

			for(var i=0; i<response.list.length; i++){
				var json = {"service_name": response.message[i].name, "port": response.message[i].port, "protocol": response.message[i].protocol};
				var stringified = JSON.stringify(json);
				$('#'+select_id).append('<option title="'+response.list[i].name+'" data-value='+stringified+'>'+response.list[i].name+' ['+response.list[i].protocol+': '+response.list[i].port+']'+'</option>');
			}
		},
		error: function(response){
			//alert('ERROR: '+JSON.stringify(response));
		}
	});
}

