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

$('[data-reveal-id="modal-show-networks"]').on('click',
	function() {
		$('#show-networks-output').empty();
		var fields_to_show = ["vlan_name", "vlan_ip", "vlan_mask", "uuid"];

		$.ajax({
			url: s4t_api_url+"/vnets",
			type: "GET",
			dataType: 'json',
			headers: ajax_headers,

			success: function(response){
				parsed_response = parse_json_fields(fields_to_show, response.message, false);
				create_table_from_json("show_networks_table", parsed_response, fields_to_show);
			},
			error: function(response){
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
			}
		});
	}
);


$('[data-reveal-id="modal-create-network"]').on('click',
	function(){
		document.getElementById('create_network_name').value = '';
		document.getElementById('create_network_ip').value = '';
		$('#network_create-output').empty();
	}
);


$('[data-reveal-id="modal-destroy-network"]').on('click',
	function(){
		$('#network_destroy-output').empty();
		refresh_tablenetworks('destroy_tablenetworks', 'destroy');
	}
);


$('[data-reveal-id="modal-add-board-network"]').on('click',
        function(){
		$('#network_add-board-output').empty();
		update_nets('addboard_network_uuid');
		update_boardsv2('addboard_boardlist', 'C');
        }
);


$('[data-reveal-id="modal-remove-board-network"]').on('click',
        function(){
		$('#network_remove-board-output').empty();
		update_nets('removeboard_network_uuid');
		$('#network_removeboard_table_section').hide();
        }
);


$('[data-reveal-id="modal-show-boards-network"]').on('click',
        function(){
		$('#network_showboards_table_section').hide();
		update_nets('show_boards_vnetlist');
        }
);


$('[data-reveal-id="modal-board-networks"]').on('click',
        function(){
		$('#show_boardnetworks_section').hide();
		update_boardsv2('networks_boardlist');
        }
);


$('[data-reveal-id="modal-activate-boards-network"]').on('click',
        function(){
		$('#network_activate-boards-output').empty();
		update_boardsv2('activate_boardnet_boardlist', 'C');
        }
);


$('[id="removeboard_network_uuid').on('change',
	function(){
		$('#network_removeboard_table_section').hide();
		var net_uuid = $( "#removeboard_network_uuid option:selected" ).val();
		//update_net_boards(net_uuid, "removeboard_boardlist", "network_remove-board-output");
		update_net_boards(net_uuid, "remove_tablenetworks", "network_remove-board-output");
	}
);


/*
$('[data-reveal-id="modal-show-boards-network"]').on('click',
	function(){
		$('#network_showboards_table_section').hide();
	}
);
*/


$('[id="addboard_network_uuid').on('change',
	function(){
		//alert($( "#addboard_network_uuid option:selected" ).val());
		var net_uuid = $( "#addboard_network_uuid option:selected" ).val();
		update_boardsv2('addboard_boardlist', 'C');
	}
);



$('#create_network').click(function(){
	data = {};

	//document.getElementById('loading_bar').style.visibility='visible';
	var netname = document.getElementById("create_network_name").value;
	var network = document.getElementById("create_network_ip").value;

	if(netname == "") { alert("Insert network name!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else if(network == "") { alert("Insert network definition!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else{
		data.netname = netname;
		data.network = network;

		$.ajax({
			url: s4t_api_url+"/vnets",
			type: 'POST',
			dataType: 'json',
			headers: ajax_headers,
			data: JSON.stringify(data),

			success: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				//document.getElementById("network_create-output").innerHTML = '<pre>'+JSON.stringify(response.message,null,"\t")+'</pre>';
				document.getElementById("network_create-output").innerHTML = JSON.stringify(response.message);
			},
			error: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
				document.getElementById("network_create-output").innerHTML = JSON.stringify(response.responseJSON.message);
			}
		});
	}
});


$('#destroy_network').click(function(){

	return_array = get_selected_rows_from_table("destroy_tablenetworks", "destroy");

	headers = return_array[0];
	variables = return_array[1];

	document.getElementById("network_destroy-output").innerHTML ='';
	
	if(variables.length == 0){
		alert('No network(s) to destroy are selected!');
		document.getElementById('loading_bar').style.visibility='hidden';
	}
	else{
		for(var i=0; i< variables.length; i++){
			//---------------------------------------------------------------------------------
			(function(i){
				setTimeout(function(){
					//---------------------------------------------------------------------------------
					var net_uuid = variables[i][3];

					$.ajax({
						url: s4t_api_url+"/vnets/"+net_uuid,
						type: "DELETE",
						dataType: 'json',
						headers: ajax_headers,

						success: function(response){
							if(i==variables.length-1) {
								refresh_tablenetworks("destroy_tablenetworks", "destroy");
								document.getElementById('loading_bar').style.visibility='hidden';
							}
							document.getElementById("network_destroy-output").innerHTML += JSON.stringify(response.message);
						},
						error: function(response){
							verify_token_expired(response.responseJSON.message, response.responseJSON.result);
							if(i==variables.length-1) document.getElementById('loading_bar').style.visibility='hidden';
							document.getElementById("network_destroy-output").innerHTML += JSON.stringify(response.responseJSON.message)+"<br />";
						}
					});
					//---------------------------------------------------------------------------------
				},delay*i);
			})(i);
			//---------------------------------------------------------------------------------
		}
	}
});


$('#addboard_network').click(function(){

	data = {};

	//document.getElementById('loading_bar').style.visibility='visible';
	var network_uuid = $("#addboard_network_uuid option:selected").val();
	var board_id =$('#addboard_boardlist').val();

	if(network_uuid == "--") { alert("Select a network!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else if(board_id == "--") { alert("Select a board!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else{
		data.ip_addr = document.getElementById("addboard_network_ip").value;

		$.ajax({
			url: s4t_api_url+"/boards/"+board_id+"/vnets/"+network_uuid,
			type: 'PUT',
			dataType: 'json',
			headers: ajax_headers,
			data: JSON.stringify(data),

			success: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				//document.getElementById("network_add-board-output").innerHTML = '<pre>'+JSON.stringify(response.message,null,"\t")+'</pre>';
				document.getElementById("network_add-board-output").innerHTML = JSON.stringify(response.message);
			},
			error: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
				document.getElementById("network_add-board-output").innerHTML = JSON.stringify(response.responseJSON.message);
			}
		});
	}
});


$('#removeboard_network').click(function(){
	var network_uuid = $("#removeboard_network_uuid option:selected").val();


	if(network_uuid =="--") { alert("Select a network!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else{
		return_array = get_selected_rows_from_table("remove_tablenetworks", "remove");

		headers = return_array[0];
		variables = return_array[1];

		document.getElementById("network_remove-board-output").innerHTML ='';
	
		if(variables.length == 0){
			alert('No board(s) to remove are selected!');
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
							url: s4t_api_url+"/boards/"+board_id+"/vnets/"+network_uuid,
							type: "DELETE",
							dataType: 'json',
							headers: ajax_headers,

							success: function(response){
								if(i==variables.length-1) {
									refresh_tablenetworks("remove_tablenetworks", "remove", board_id);
									document.getElementById('loading_bar').style.visibility='hidden';
								}
								document.getElementById("network_remove-board-output").innerHTML += JSON.stringify(response.message);
							},
							error: function(response){
								verify_token_expired(response.responseJSON.message, response.responseJSON.result);
								if(i==variables.length-1) document.getElementById('loading_bar').style.visibility='hidden';
								document.getElementById("network_remove-board-output").innerHTML += JSON.stringify(response.responseJSON.message)+"<br />";
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


$('[id="show_boards_vnetlist"]').on('change',
	function(){
		var show_boards = document.getElementById("show_boards_vnetlist").value;
		if(show_boards == "--"){
			alert("Select a network!");
			$("#network_showboards_table_section").hide();
			document.getElementById('loading_bar').style.visibility='hidden';
		}
		else{
			$("#network_showboards_table_section").show();

			$.ajax({
				url: s4t_api_url+"/boards/"+show_boards+"/vnets",
				type: "GET",
				dataType: 'json',
				headers: ajax_headers,

				success: function(response){
					document.getElementById('loading_bar').style.visibility='hidden';
					if(response.message.length ==0){
						$("#showboards_tablenetworks").html('<tr><td style="text-align:center">No boards</td></tr>');
					}
					else{
						var fields_to_show = ["board_name", "board_id", "vlan_ip", "socat_ip", "socat_port"];
						parsed_response = parse_json_fields(fields_to_show, response.message, false);
						create_table_from_json("showboards_tablenetworks", parsed_response, fields_to_show);
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



$('[id="networks_boardlist"]').on('change',
	function(){
		var show_board_networks = document.getElementById("networks_boardlist").value;
		if(show_board_networks == "--"){
			alert("Select a board!");
			$("#show_boardnetworks_section").hide();
			document.getElementById('loading_bar').style.visibility='hidden';
		}
		else{
			$("#show_boardnetworks_section").show();

			$.ajax({
				url: s4t_api_url+"/boards/"+show_board_networks+"/vnets",
				type: "GET",
				dataType: 'json',
				headers: ajax_headers,

				success: function(response){
					document.getElementById('loading_bar').style.visibility='hidden';
					if(response.message.length ==0){
						$("#show_boardnetworks_table").html('<tr><td style="text-align:center">No networks</td></tr>');
					}
					else{
						var fields_to_show = ["board_name", "board_id", "vlan_ip", "socat_ip", "socat_port"];
						parsed_response = parse_json_fields(fields_to_show, response.message, false);
						create_table_from_json("show_boardnetworks_table", parsed_response, fields_to_show);
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




$('#activate_boardnet_network').click(function(){

	//document.getElementById('loading_bar').style.visibility='visible';
	var activate_boardnet_uuid = document.getElementById("activate_boardnet_boardlist").value;

	if(activate_boardnet_uuid == "--") { alert("Select a board!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else{
		$.ajax({
			url: s4t_api_url+"/vnets/"+activate_boardnet_uuid+"/force",
			type: "PUT",
			dataType: 'json',
			headers: ajax_headers,

			success: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				document.getElementById("network_activate-board-output").innerHTML = JSON.stringify(response.message);
			},
			error: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
				document.getElementById("network_activate-board-output").innerHTML = JSON.stringify(response.responseJSON.message);
			}
		});
	}
});



function update_nets(select_id){
	$.ajax({
		url: s4t_api_url+"/vnets",
		type: 'GET',
		dataType: 'json',
		headers: ajax_headers,

		success: function(response){
			$('#'+select_id).empty();
			$('#'+select_id).append('<option title="--" value="--" data-unit="">--</option>');
			response.message = response.message.sort(SortByVlanName);
			for(var i=0; i<response.message.length; i++)
				$('#'+select_id).append('<option title="'+response.message[i].uuid+'" value="'+response.message[i].uuid+'" data-unit="">'+response.message[i].vlan_name+':'+response.message[i].uuid+'</option>');
		},
		error: function(response){
			verify_token_expired(response.responseJSON.message, response.responseJSON.result);
			//alert('ERROR: '+JSON.stringify(response));
		}
	});
}


function update_net_boards(net_uuid, table_id, output){
	//$('#'+board_list).empty();
	document.getElementById(output).innerHTML = "";

	var fields_to_show = ["board_name", "board_id", "vlan_ip", "socat_ip", "socat_port"];

	if(net_uuid == "--"){
		alert("Select a network!");
	}
	else{
		$.ajax({
			url: s4t_api_url+"/vnets/"+net_uuid,
			type: "GET",
			dataType: 'json',
			headers: ajax_headers,

			success: function(response){
				if(response.message.length ==0){
					$('#network_removeboard_table_section').hide();				
					document.getElementById(output).innerHTML = "";
					alert("No boards in selected network!");
				}
				else{
					$('#network_removeboard_table_section').show();
					parsed_response = parse_json_fields(fields_to_show, response.message, false);
					create_table_from_json(table_id, parsed_response, fields_to_show, "remove");
				}
				/*
				if(response.message.length==0){
					document.getElementById(output).innerHTML ="No boards in this VNET!";
				}
				else{
					for(var i=0; i<response.message.length; i++)
						$('#'+board_list).append('<option title="'+response.message[i].board_ID+'" value="'+response.message[i].board_ID+'" data-unit="">'+response.message[i].board_NAME+'</option>');
				}
				*/
			},
			error: function(response){
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
				//alert('ERROR');
			}
		});
	}
}



function refresh_tablenetworks(table_id, action, board_id) {
	//$('#' + select_id).empty();

	var fields_to_show = ["vlan_name", "vlan_ip", "vlan_mask", "uuid"];

	if(board_id) url = s4t_api_url + "/boards/"+board_id+"/vnets";
	else url = s4t_api_url + "/vnets";

	$.ajax({
		url: url,
		type: 'GET',
		dataType: 'json',
		headers: ajax_headers,

		success: function (response) {
			parsed_response = parse_json_fields(fields_to_show, response.message, false);
			create_table_from_json(table_id, parsed_response, fields_to_show, action);
		},
		error: function (response) {
			verify_token_expired(response.responseJSON.message, response.responseJSON.result);
		}
	});
}

