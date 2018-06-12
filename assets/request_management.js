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

var requests_list = [];
var global_requests = [];

$('[data-reveal-id="modal-show-project-requests"]').on('click', 
	function(){

		$("#modal-show-project-requests").removeClass("small");

		$('#deleterequest_project').prop('checked', false);
		$('#deleterequest_requestlist_bundle').show();

		$("#board_message").hide();
		$("#boards_x_request").hide();
		$(".project_requests").show();
		populate_project_requests();
	}
);


function reload_project_requests(){
	$("#board_message").hide();
	$("#boards_x_request").hide();
	$(".project_requests").show();

	document.getElementById('loading_bar').style.visibility='hidden';

	populate_project_requests();
}


function populate_project_requests() {
	$('#request_delete-output').empty();
	//console.log("populate_project_requests");

	//$('#show_requests_table').empty();
	//$('#show_requests_table').dataTable({"destroy": true});

	var fields_to_parse = ["id_request", "subject", "timestamp", "result"];
	var fields_to_show = ["id_request", "timestamp", "result"];
	var project_id = getCookie("selected_prj");

	$.ajax({
		url: s4t_api_url+"/projects/"+project_id+"/requests",
		type: "GET",
		dataType: 'json',
		headers: ajax_headers,

		success: function(response){

			requests_list = [];

			//we store the global requests in order to filter later to populate the relative filtered table
			global_requests = response.message;

			for(var i=0; i<response.message.length; i++)
				requests_list.push(response.message[i].id_request);

			//parsed_response = customize_request_table(fields_to_show, response.message);
			parsed_response = customize_request_table(fields_to_parse, response.message);
			create_table_from_json("show_requests_table", parsed_response, fields_to_show, "remove");
		},
		error: function(response){
			verify_token_expired(response.responseJSON.message, response.responseJSON.result);
		}
	});
}


//function customize_request_table(fields_to_show, response_message){
function customize_request_table(fields_to_parse, response_message){
	//console.log("customize_request_table");

	//parsed_response = parse_json_fields(fields_to_show, response_message, false).sort(SortByTimestamp);
	parsed_response = parse_json_fields(fields_to_parse, response_message, false).sort(SortByTimestamp);

	for(var i=0; i<parsed_response.length; i++){
		parsed_response[i].id_request = '<a id="'+parsed_response[i].id_request+'" value="'+parsed_response[i].subject+'" onclick=populate_request_info(this)>'+parsed_response[i].id_request+'</a>';
	}
	return parsed_response;
}


function populate_request_info(a, flag){

	$("#modal-show-project-requests").removeClass("small");

	$("#board_message").hide();
	$("#boards_x_request").show();
	$(".project_requests").hide();

	var id = null;
	if(flag)	id = a;
	else		id = a.getAttribute("id");

	var subject = a.getAttribute("value");
	document.getElementById('request_id').value=id;
	document.getElementById('subject').value=subject;


	var fields_to_parse = ["board_id", "timestamp", "result", "message"];
	var fields_to_show = ["board_id", "timestamp", "result"];

	$.ajax({
		url: s4t_api_url+"/requests/"+id,
		type: "GET",
		dataType: 'json',
		headers: ajax_headers,

		success: function(response){
			var boards_div = $('#boards_x_request');
			boards_div.find('[name=request_text]').text("Request ID: "+id);
			boards_div.find('[name=subject_text]').text("Subject: "+subject);

			parsed_response = customize_request_boards_table(fields_to_parse, response.message, "modal-board-info");
			create_table_from_json("show_request_boards_table", parsed_response, fields_to_show);
		},
		error: function(response){
			verify_token_expired(response.responseJSON.message, response.responseJSON.result);
		}
	});
}


function customize_request_boards_table(fields_to_parse, response_message, reveal_id){
	//console.log("customize_request_boards_table");

	parsed_response = parse_json_fields(fields_to_parse, response_message, false).sort(SortByTimestamp);

	for(var i=0; i<parsed_response.length; i++){
		for(var j=0; j<boards_list.length; j++){
			if(boards_list[j].board_id == parsed_response[i].board_id){
				parsed_response[i].board_id = '<a data-reveal-id="'+reveal_id+'" id="'+parsed_response[i].board_id+'" onclick=populate_board_info("'+parsed_response[i].board_id+'")>'+boards_list[j].label+'</a>';

				parsed_response[i].result = '<a id="'+parsed_response[i].result+'" data-label="'+boards_list[j].label+'" data-result="'+parsed_response[i].result+'" data-message="'+parsed_response[i].message+'" onclick=populate_request_message(this)>'+parsed_response[i].result+'</a>';
				break;
			}
		}
	}
	return parsed_response;
}


function populate_request_message(a){

	$("#board_message").show();
	$("#boards_x_request").hide();
	$(".project_requests").hide();

	$("#modal-show-project-requests").addClass("small");

	var label = a.getAttribute("data-label");
	var result = a.getAttribute("data-result");
	var message = a.getAttribute("data-message");

	var message_div = $('#board_message');
	message_div.find('[name=message_text]').text("Message for board "+label);
	message_div.find('[id=board_request_result]').text("Result: "+result);
	message_div.find('[id=board_request_message]').text(message);
}


function return_request_boards(a){
	var request_id = $('input[id="request_id"]');
	document.getElementById('loading_bar').style.visibility='hidden';

	populate_request_info(request_id[0].value, true);
}


$('#remove_requests').click(function(){

	document.getElementById("request_delete-output").innerHTML ='';

	if ($('#deleterequest_project').is(':checked')){
		for(var i=0; i< requests_list.length; i++){
			//---------------------------------------------------------------------------------
			(function(i){
				setTimeout(function(){
					//---------------------------------------------------------------------------------
					var request_id = requests_list[i];
		
					$.ajax({
						url: s4t_api_url+"/requests/"+request_id,
						type: "DELETE",
						dataType: 'json',
						headers: ajax_headers,
		
						success: function(response){
							if(i==0)
								document.getElementById("request_delete-output").innerHTML = "Started deleting procedure...<br />";
							else if(i==requests_list.length-1) {
								populate_project_requests();
								refresh_lists();
								document.getElementById('loading_bar').style.visibility='hidden';
								document.getElementById("request_delete-output").innerHTML = "...procedure completed";
							}
							//document.getElementById("request_delete-output").innerHTML += JSON.stringify(response.message)+"<br />";
						},
						error: function(response){
							verify_token_expired(response.responseJSON.message, response.responseJSON.result);
							if(i==requests_list.length-1) document.getElementById('loading_bar').style.visibility='hidden';
							document.getElementById("request_delete-output").innerHTML += JSON.stringify(response.responseJSON.message)+"<br />";
						}
					});
					//---------------------------------------------------------------------------------
				},delay*i);
			})(i);
			//---------------------------------------------------------------------------------
		}
	}
	else{
		return_array = get_selected_rows_from_table("show_requests_table", "remove");

		headers = return_array[0];
		variables = return_array[1];

		if(variables.length == 0){
			alert('No request(s) to delete are selected!');
			document.getElementById('loading_bar').style.visibility='hidden';
		}
		else{
			for(var i=0; i< variables.length; i++){
				//---------------------------------------------------------------------------------
				(function(i){
					setTimeout(function(){
						//---------------------------------------------------------------------------------
						var request_id = variables[i][0];

						$.ajax({
							url: s4t_api_url+"/requests/"+request_id,
							type: "DELETE",
							dataType: 'json',
							headers: ajax_headers,

							success: function(response){
								if(i==variables.length-1) {
									populate_project_requests();
									refresh_lists();
									document.getElementById('loading_bar').style.visibility='hidden';
								}
								document.getElementById("request_delete-output").innerHTML += JSON.stringify(response.message)+"<br />";
							},
							error: function(response){
								verify_token_expired(response.responseJSON.message, response.responseJSON.result);
								if(i==variables.length-1) document.getElementById('loading_bar').style.visibility='hidden';
								document.getElementById("request_delete-output").innerHTML += JSON.stringify(response.responseJSON.message)+"<br />";
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


//WORKING but not necessary anymore after introduction of DataTables
/*
$('#search_request').keyup(function () {
	//console.log(this.value);
	//console.log(global_requests);

	var filtered_requests = [];
	var fields_to_show = ["id_request", "timestamp", "result"];

	for(var i=0; i<global_requests.length; i++){
		if(global_requests[i].id_request.indexOf(this.value) >= 0){
			//console.log("FOUND");
			filtered_requests.push(global_requests[i]);
		}
	}
	parsed_response = customize_request_table(fields_to_show, filtered_requests);
	create_table_from_json("show_requests_table", parsed_response, fields_to_show, "remove");	
});
*/


