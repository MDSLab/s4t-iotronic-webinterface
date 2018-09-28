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
		refresh_tableservices("show_services_table", null);
	}
);


function refresh_tableservices(table_id, flag_link){
	$.ajax({
		url: s4t_api_url+"/services",
		type: "GET",
		dataType: 'json',
		headers: ajax_headers,
	
		success: function(response){

			response.message = response.message.sort(SortByName);

			if(flag_link){
				for(i=0; i<response.message.length; i++){
					response.message[i].name ='<a data-reveal-id="modal-service-boards-list" id="'+response.message[i].id+'" onclick=populate_serviceboards_info(this)>'+response.message[i].name+'</a>';
				}
			}
			create_table_from_json(table_id, response.message, null);
		},
		error: function(response){
			verify_token_expired(response.responseJSON.message, response.responseJSON.result);
		}
	});
}


function get_protocols_list(select_id){
	$('#'+select_id).empty();

	var protocols_array = ["HTTP", "HTTPS", "MQTT", "SSH"];
	protocols_array = protocols_array.sort();

	$('#'+select_id).append('<option value="--">--</option>');
	for(var i=0; i<protocols_array.length; i++){
		$('#'+select_id).append('<option value="'+protocols_array[i]+'">'+protocols_array[i]+'</option>');
	}
}


function clean_service_fields(form_name, flag_output){
	document.getElementById(form_name+"_service_name").value = '';
	document.getElementById(form_name+"_port").value = '';
	$("#"+form_name+"_protocol").val("--");

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
		$('#servicestatus_project').prop('checked', false);
		$('#servicestatus_boardlist_bundle').show();

		$('#service_status-output').empty();
		update_services('status_servicelist');

		//OLD: select approach
		//update_boardsv2('servicestatus_boardlist', 'C', true);

		//NEW: table approach
		refresh_tableboards("servicestatus_tableboards", "remove", "C", default_boardlist_columns);
	}
);


$('[data-reveal-id="modal-board-services"]').on('click',
	function(){

		$("#modal-board-services").addClass("small");

		//OLD: select approach
		/*
		var id = this.getAttribute("data-reveal-id");
		$('#'+id).find('[name=services_text]').text("Exposed on: "+wstun_ip);
		$('#show_boardservices_section').hide();
		update_boardsv2('services_boardlist');
		*/

		//NEW: table approach
		//refresh_tableboards("show_boardservices_tableboards", null, null, default_boardlist_columns);
		refresh_tableboards_services("show_boardservices_tableboards", default_boardlist_columns);
	}
);


$('[data-reveal-id="modal-service-boards"]').on('click',
	function(){
		var id = this.getAttribute("data-reveal-id");
		$('#'+id).find('[name=services_text]').text("Exposed on: "+wstun_ip);

		$("#modal-service-boards").addClass("small");
		refresh_tableservices("show_boardservices_tableservices", true);
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
			$("#update_protocol").val("--");
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

	loading_to_fix(); //TO BE FIXED !!!

	var service_name = document.getElementById("register_service_name").value;
	var port = parseInt(document.getElementById("register_port").value);
	var protocol = document.getElementById("register_protocol").value;

	document.getElementById("service_register-output").innerHTML ='';

	if(service_name == ""){ alert("Insert Service Name!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else if(port !== port){ alert("Specify a Port number different from zero(s)"); 	document.getElementById('loading_bar').style.visibility='hidden'; }
	else if(protocol == "--") { alert("Select protocol!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else{
		data = {};
		data.service_name = service_name;
		data.port = port;
		data.protocol = protocol;

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

	loading_to_fix(); //TO BE FIXED !!!

	var old_service_name = $('#update_servicelist').find(":selected").data("value").service_name;

	var service_name = document.getElementById("update_service_name").value;
	var port = document.getElementById("update_port").value;
	var protocol = document.getElementById("update_protocol").value;


	//if(document.getElementById("update_servicelist").value == "--"){

	document.getElementById("service_update-output").innerHTML = '';

	if(old_service_name == "--" || old_service_name == undefined){ alert("Select a service"); document.getElementById('loading_bar').style.visibility='hidden'; }
	else if(service_name == ""){ alert("Insert Service Name!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else if(port == ""){ alert("Specify a Port number different from zero(s)"); document.getElementById('loading_bar').style.visibility='hidden';	}
	else if(protocol == "--") { alert("Select protocol!"); document.getElementById('loading_bar').style.visibility='hidden';}
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
				$("#update_protocol").val("--");
			});
	}
});


$('#delete_service').click(function(){

	loading_to_fix(); //TO BE FIXED !!!

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

	loading_to_fix(); //TO BE FIXED !!!

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

					////Old output without link to request_id
					//document.getElementById("service_status-output").innerHTML = JSON.stringify(response.message);

					//New output with link to request_id
					//var subject = "/projects/"+project_id+"/services/"+service_name+"/action "+data.service_action;
					var subject = response.subject;
					document.getElementById("service_status-output").innerHTML = 'Request ID: <a data-reveal-id="modal-show-project-requests" id="'+response.req_id+'" value="'+subject+'" onclick=populate_request_info(this)>'+response.req_id+'</a>';

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

			//NEW: table approach
			return_array = get_selected_rows_from_table("servicestatus_tableboards", "remove");

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
								url: s4t_api_url+"/boards/"+board_id+"/services/"+service_name+"/action",
								type: 'POST',
								dataType: 'json',
								headers: ajax_headers,
								data: JSON.stringify(data),

								success: function(response){
									if(i==variables.length-1) {
										refresh_tableboards("servicestatus_tableboards", "remove", "C", default_boardlist_columns);
										refresh_lists();
										document.getElementById('loading_bar').style.visibility='hidden';
									}
									document.getElementById("service_status-output").innerHTML += board_name + ": "+ JSON.stringify(response.message)+"<br />";
								},
								error: function(response){
									verify_token_expired(response.responseJSON.message, response.responseJSON.result);
									if(i==variables.length-1) {
										refresh_tableboards("servicestatus_tableboards", "remove", "C", default_boardlist_columns);
										document.getElementById('loading_bar').style.visibility='hidden';
									}
									document.getElementById("service_status-output").innerHTML += board_name + ": "+JSON.stringify(response.responseJSON.message)+"<br />";
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
			*/
		}
	}
});



function populate_serviceboards_info(a){
	var service_id = a.getAttribute("id");
	var reveal_id = a.getAttribute("data-reveal-id");

	var targetModal = $('#'+reveal_id);

	targetModal.find('[name=info_text]').text("Boards with service "+a.innerHTML);

	var project_id = getCookie("selected_prj");

	var url = "";
	if(project_id == "all")
		url = s4t_api_url+"/services/"+service_id+"/boards";
	else
		url = s4t_api_url+"/projects/"+project_id+"/services/"+service_id+"/boards";

	$.ajax({
		url: url,
		type: "GET",
		dataType: 'json',
		headers: ajax_headers,

		success: function(response){

			document.getElementById('loading_bar').style.visibility='hidden';

			//Get the last table type (if DataTable or not) and clean the table with the correct methodology
			var check_datatable = $.fn.dataTable.isDataTable("#show_services_tableboards");
			if(check_datatable == true)
				$('#show_services_tableboards').DataTable().destroy();
			else
				$('#show_services_tableboards').html("");

			if(response.message.length ==0){
				//targetModal.addClass("small");
				$("#show_services_tableboards").html('<tr><td style="text-align:center">No boards</td></tr>');
			}
			else{
				//targetModal.removeClass("small");
				create_table_from_json("show_services_tableboards", response.message, default_boardlist_columns);
			}
		},
		error: function(response){
			document.getElementById('loading_bar').style.visibility='hidden';
			verify_token_expired(response.responseJSON.message, response.responseJSON.result);
			console.log(response.responseJSON.message);
		}
	});
}



function populate_board_servicesinfo(a){
	var board_id = a.getAttribute("id");
	var reveal_id = a.getAttribute("data-reveal-id");

	var targetModal = $('#'+reveal_id);

	targetModal.find('[name=info_text]').text("Services on board "+a.innerHTML);

	$.ajax({
		url: s4t_api_url+"/boards/"+board_id+"/services",
		type: "GET",
		dataType: 'json',
		headers: ajax_headers,
	
		success: function(response){
	
			document.getElementById('loading_bar').style.visibility='hidden';

			//Get the last table type (if DataTable or not) and clean the table with the correct methodology
			var check_datatable = $.fn.dataTable.isDataTable("#show_services_tableservices");
			if(check_datatable == true)
				$('#show_services_tableservices').DataTable().destroy();
			else
				$('#show_services_tableservices').html("");

			if(response.message.length ==0){
				targetModal.addClass("small");
				$("#show_services_tableservices").html('<tr><td style="text-align:center">No services</td></tr>');
			}
			else{

				targetModal.removeClass("small");

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
				create_table_from_json("show_services_tableservices", parsed_response, fields_to_show);
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

//TO BE REMOVED / ADAPTED !!!!
/*
$('[id="services_boardlist"]').on('change',
	function(){

		loading_to_fix(); //TO BE FIXED !!!

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

			//Get the last table type (if DataTable or not) and clean the table with the correct methodology
			var check_datatable = $.fn.dataTable.isDataTable("#show_boardservices_table");
			if(check_datatable == true)
				$('#show_boardservices_table').DataTable().destroy();
			else
				$('#show_boardservices_table').html("");

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
						//var fields_to_show = ["service_name", "public_port", "local_port", "protocol", "last_update"];
						//parsed_response = parse_json_fields(fields_to_show, response.message, false);
						//create_table_from_json("show_boardservices_table", parsed_response, fields_to_show);
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
*/


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

