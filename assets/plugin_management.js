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

$('[data-reveal-id="modal-show-plugins"]').on('click',
	function() {
		$.ajax({
			url: s4t_api_url+"/plugins",
			type: "GET",
			dataType: 'json',
			headers: ajax_headers,

			success: function(response){
				create_table_from_json("show_plugins_table", response.message, null);
			},
			error: function(response){
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
			}
		});
	}
);


function clean_plugin_fields(form_name, flag_output){
	document.getElementById(form_name+"_name").value = '';
	$("#"+form_name+"_category").val("async");
	document.getElementById(form_name+"_json").value = '';
	document.getElementById(form_name+"_code").value = '';

	if(flag_output){
		res = form_name.split("_");
		document.getElementById(res[1]+"_"+res[0]+"-output").innerHTML ='';
	}
}


$('[data-reveal-id="modal-create-plugin"]').on('click',
	function() {
		clean_plugin_fields("create_plugin", true);
	}
);


$('[data-reveal-id="modal-destroy-plugin"]').on('click',
	function() {
		$('#plugin_destroy-output').empty(); 
		refresh_tableplugins('destroy_tableplugins', 'destroy');
	}
);


$('[data-reveal-id="modal-inject-plugin"]').on('click',
	function() {
		$('#plugin_inject-output').empty();
		refresh_cloud_plugins('inject_pluginlist');
		update_boardsv2('inject_boardlist', 'C', true);
		$("#inject_autostart").val("false");
	}
);


$('[data-reveal-id="modal-startstop-plugin"]').on('click',
	function() {
		$('#plugin_startstop-output').empty();
		refresh_cloud_plugins('startstop_pluginlist');
		update_boardsv2('startstop_boardlist', 'C', true);
		document.getElementById("startstop_plugin_json").value = '';
	}
);


$('[data-reveal-id="modal-call-plugin"]').on('click',
	function() {
		$('#plugin_call-output').empty();
		refresh_cloud_plugins('call_pluginlist');
		update_boardsv2('call_boardlist', 'C', true);
		document.getElementById("call_plugin_json").value = '';
	}
);


$('[data-reveal-id="modal-remove-plugin"]').on('click',
	function(){
		$('#plugin_remove-output').empty();
		$('#plugin_remove_table_section').hide();
		update_boardsv2('remove_plugin_boardlist', 'C');
	}
);


$('[data-reveal-id="modal-board-plugins"]').on('click',
	function(){
		$('#show_boardplugins_section').hide();
		update_boardsv2('plugins_boardlist');
	}
);



$('[id="remove_plugin_boardlist"]').on('change',
	function(){

		var board_id = $( "#remove_plugin_boardlist option:selected" ).val();

		if(board_id == '--'){
			$('#plugin_remove_table_section').hide();
			document.getElementById("plugin_remove-output").innerHTML ='';
		}
		else{
			$('#plugin_remove_table_section').show();
			$.ajax({
				url: s4t_api_url+"/boards/"+board_id+"/plugins",
				type: 'GET',
				dataType: 'json',
				headers: ajax_headers,

				success: function(response){
					if(response.message.length ==0){
						$("#plugin_remove_table").html('<tr><td style="text-align:center">No plugins</td></tr>');
					}
					else{
						var fields_to_show = ["name", "id", "category", "state"];
						parsed_response = parse_json_fields(fields_to_show, response.message, false);
						create_table_from_json("plugin_remove_table", parsed_response, fields_to_show, "remove");
					}
				},
				error: function(response){
					verify_token_expired(response.responseJSON.message, response.responseJSON.result);
					//alert('ERROR: '+JSON.stringify(response));
				}
			});
		}
	}
);


$('[id="plugins_boardlist"]').on('change',
	function(){
		var show_board_plugins = document.getElementById("plugins_boardlist").value;
		if(show_board_plugins == "--"){
			alert("Select a board!");
			$("#show_boardplugins_section").hide();
			document.getElementById('loading_bar').style.visibility='hidden';
		}
		else{
			$("#show_boardplugins_section").show();

			$.ajax({
				url: s4t_api_url+"/boards/"+show_board_plugins+"/plugins",
				type: "GET",
				dataType: 'json',
				headers: ajax_headers,

				success: function(response){
					document.getElementById('loading_bar').style.visibility='hidden';
					if(response.message.length ==0){
						$("#show_boardplugins_table").html('<tr><td style="text-align:center">No plugins</td></tr>');
					}
					else{
						var fields_to_show = ["name", "id", "category", "state"];
						parsed_response = parse_json_fields(fields_to_show, response.message, false);
						create_table_from_json("show_boardplugins_table", parsed_response, fields_to_show);
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


$('#create_plugin').click(function(){

	data ={};
	//document.getElementById('loading_bar').style.visibility='visible';
	var plugin_name = document.getElementById("create_plugin_name").value;
	var plugin_json_schema = document.getElementById("create_plugin_json").value;
	var plugin_code = document.getElementById("create_plugin_code").value;
	var plugin_category = document.getElementById("create_plugin_category").value;
	document.getElementById("plugin_create-output").innerHTML ='';

	if(plugin_name == ""){ alert("Insert plugin name!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else if(plugin_json_schema == ""){ alert("Insert json schema!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else if(plugin_code == ""){ alert("Insert code!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else if(plugin_category == ""){ alert("Insert category!"); document.getElementById('loading_bar').style.visibility='hidden';}

	else{
		data.plugin_name = plugin_name;
		data.plugin_json_schema = plugin_json_schema;
		data.plugin_code = plugin_code;
		data.plugin_category = plugin_category;

		$.ajax({
			url: s4t_api_url+"/plugins",
			type: 'POST',
			dataType: 'json',
			headers: ajax_headers,
			data: JSON.stringify(data),

			success: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				document.getElementById("plugin_create-output").innerHTML = JSON.stringify(response.message);
				refresh_lists();
			},
			error: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
				document.getElementById("plugin_create-output").innerHTML = JSON.stringify(response.responseJSON.message);
			}
		});
	}
});


$('#destroy_plugin').click(function(){

	return_array = get_selected_rows_from_table("destroy_tableplugins", "destroy");

	headers = return_array[0];
	variables = return_array[1];

	document.getElementById("plugin_destroy-output").innerHTML ='';

	if(variables.length == 0){
		alert('No plugin(s) to destroy are selected!');
		document.getElementById('loading_bar').style.visibility='hidden';
	}
	else{
		for(var i=0; i< variables.length; i++){
			//---------------------------------------------------------------------------------
			(function(i){
				setTimeout(function(){
					//---------------------------------------------------------------------------------
					var plugin_name = variables[i][1];
	
					$.ajax({
						url: s4t_api_url+"/plugins/"+plugin_name,
						type: "DELETE",
						dataType: 'json',
						headers: ajax_headers,
	
						success: function(response){
							if(i==variables.length-1) {
								refresh_tableplugins("destroy_tableplugins", "destroy");
								document.getElementById('loading_bar').style.visibility='hidden';
								refresh_lists();
							}
							document.getElementById("plugin_destroy-output").innerHTML += JSON.stringify(response.message);
						},
						error: function(response){
							verify_token_expired(response.responseJSON.message, response.responseJSON.result);
							if(i==variables.length-1) document.getElementById('loading_bar').style.visibility='hidden';
							document.getElementById("plugin_destroy-output").innerHTML += JSON.stringify(response.responseJSON.message)+"<br />";
						}
					});
					//---------------------------------------------------------------------------------
				},delay*i);
			})(i);
			//---------------------------------------------------------------------------------
		}
	}
});



document.getElementById('userfile').addEventListener('change', readFile, false);
document.getElementById('userfile').element_id = "create_plugin_code";


$('#inject_plugin').click(function(){

	var plugin_name = document.getElementById("inject_pluginlist").value;

	document.getElementById("plugin_inject-output").innerHTML ='';

	if ($('#inject_boardlist option:selected').length == 0) {alert('Select a Board'); document.getElementById('loading_bar').style.visibility='hidden';}
	else if(plugin_name == "" || plugin_name == "--"){ alert("Select a plugin!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else {
		//document.getElementById('loading_bar').style.visibility='visible';
		var list = document.getElementById("inject_boardlist");
		var selected_list = [];
		var selected_names = [];
		var output_string = '';

		data = {};

		data.plugin = plugin_name;
		data.onboot = document.getElementById("inject_autostart").value;

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
						url: s4t_api_url+"/boards/"+board_id+"/plugins",
						type: 'PUT',
						dataType: 'json',
						headers: ajax_headers,
						data: JSON.stringify(data),

						success: function(response){
							if(i==selected_list.length-1) {
								document.getElementById('loading_bar').style.visibility='hidden';
								refresh_lists();
							}
							document.getElementById("plugin_inject-output").innerHTML += board_name+ ' with '+ data.plugin+': '+JSON.stringify(response.message) +'<br />';
						},
						error: function(response){
							verify_token_expired(response.responseJSON.message, response.responseJSON.result);
							if(i==selected_list.length-1) document.getElementById('loading_bar').style.visibility='hidden';
							document.getElementById("plugin_inject-output").innerHTML += board_name+ ' with '+data.plugin+': '+JSON.stringify(response.responseJSON.message) +'<br />';
						}
					});
					//---------------------------------------------------------------------------------
				},delay*i);
			})(i);
			//---------------------------------------------------------------------------------
		}
	}
});


$('.startstop_plugin').click(function(){

	var plugin_name = document.getElementById("startstop_pluginlist").value;
	var plugin_json = document.getElementById("startstop_plugin_json").value;
	var start_stop_flag = this.id;

	document.getElementById("plugin_startstop-output").innerHTML ='';

	if ($('#startstop_boardlist option:selected').length == 0) { alert('Select a Board');document.getElementById('loading_bar').style.visibility='hidden';}
	else if(plugin_name == "" || plugin_name == "--"){ alert("Select a plugin!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else if(start_stop_flag == "start" && plugin_json == "") {alert("On start, please add json content!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else {
		//document.getElementById('loading_bar').style.visibility='visible';
		var list = document.getElementById("startstop_boardlist");

		var selected_list = [];
		var selected_names = [];

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

					data = {};
					if(start_stop_flag == "start"){
						data.plugin_json = plugin_json;
						data.plugin_operation = "run";
					}
					else if(start_stop_flag == "stop"){
						data.plugin_operation = "kill";
					}
					else if(start_stop_flag == "restart"){
						data.plugin_operation = "restart";
					}

					$.ajax({
						url: s4t_api_url+"/boards/"+board_id+"/plugins/"+plugin_name,
						type: 'POST',
						dataType: 'json',
						headers: ajax_headers,
						data: JSON.stringify(data),

						success: function(response){
							if(i==selected_list.length-1) {
								document.getElementById('loading_bar').style.visibility='hidden';
								refresh_lists();
							}
							document.getElementById("plugin_startstop-output").innerHTML += board_name +': '+JSON.stringify(response.message) +'<br />';
						},
						error: function(response){
							verify_token_expired(response.responseJSON.message, response.responseJSON.result);
							if(i==selected_list.length-1) document.getElementById('loading_bar').style.visibility='hidden';
							document.getElementById("plugin_startstop-output").innerHTML += board_name +': '+JSON.stringify(response.responseJSON.message) +'<br />';
						}
					});
					//---------------------------------------------------------------------------------
				},delay*i);
			})(i);
			//---------------------------------------------------------------------------------
		}
	}
});

$('#call_plugin').click(function(){

	document.getElementById("plugin_call-output").innerHTML = '';

	var plugin_name = document.getElementById("call_pluginlist").value;
	var plugin_json = document.getElementById("call_plugin_json").value;

	if ($('#call_boardlist option:selected').length == 0) { alert('Select a Board'); document.getElementById('loading_bar').style.visibility='hidden';}
	else if(plugin_name == "" || plugin_name == "--"){ alert("Select a plugin!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else if(plugin_json == "") {alert("On start, please add json content!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else {
		//document.getElementById('loading_bar').style.visibility='visible';
		var list = document.getElementById("call_boardlist");
		var selected_list = [];
		var selected_names = [];

		data = {};
		data.plugin_operation = "call";
		data.plugin_json = plugin_json;

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
						url: s4t_api_url+"/boards/"+board_id+"/plugins/"+plugin_name,
						type: 'POST',
						dataType: 'json',
						headers: ajax_headers,
						data: JSON.stringify(data),

						success: function(response){
							if(i==selected_list.length-1) {
								document.getElementById('loading_bar').style.visibility='hidden';
								refresh_lists();
							}
							document.getElementById("plugin_call-output").innerHTML += board_name +': '+JSON.stringify(response.message) +'<br />';
						},
						error: function(response){
							verify_token_expired(response.responseJSON.message, response.responseJSON.result);
							if(i==selected_list.length-1) document.getElementById('loading_bar').style.visibility='hidden';
							document.getElementById("plugin_call-output").innerHTML += board_name +': '+JSON.stringify(response.responseJSON.message) +'<br />';
						}
					});
					//---------------------------------------------------------------------------------
				},delay*i);
			})(i);
			//---------------------------------------------------------------------------------
		}
	}
});


$('#remove_plugin').click(function(){

	document.getElementById("plugin_remove-output").innerHTML ='';

	var board_id = document.getElementById("remove_plugin_boardlist").value;
	if(board_id == "--") { alert('Select a Board'); document.getElementById('loading_bar').style.visibility='hidden';}
	else{
		return_array = get_selected_rows_from_table("plugin_remove_table", "remove");
	
		headers = return_array[0];
		variables = return_array[1];
	
		if(variables.length == 0){
			alert('No plugin(s) to remove are selected!');
			document.getElementById('loading_bar').style.visibility='hidden';
		}
		else{
			for(var i=0; i< variables.length; i++){
				//---------------------------------------------------------------------------------
				(function(i){
					setTimeout(function(){
						//---------------------------------------------------------------------------------
						var plugin_name = variables[i][1];

						$.ajax({
							url: s4t_api_url+"/boards/"+board_id+"/plugins/"+plugin_name,
							type: "DELETE",
							dataType: 'json',
							headers: ajax_headers,

							success: function(response){
								if(i==variables.length-1) {
									refresh_tableplugins("plugin_remove_table", "remove", board_id);
									document.getElementById('loading_bar').style.visibility='hidden';
									refresh_lists();
								}
								document.getElementById("plugin_remove-output").innerHTML += JSON.stringify(response.message);
							},
							error: function(response){
								verify_token_expired(response.responseJSON.message, response.responseJSON.result);
								if(i==variables.length-1) document.getElementById('loading_bar').style.visibility='hidden';
								document.getElementById("plugin_remove-output").innerHTML += JSON.stringify(response.responseJSON.message)+"<br />";
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


function refresh_cloud_plugins(select_id){
	$('#'+select_id).empty();
	$.ajax({
		url: s4t_api_url+"/plugins/",
		type: 'GET',
		dataType: 'json',
		headers: ajax_headers,

		success: function(response){

			if(response.message.length == 0)
				$('#'+select_id).append('<option>NO plugin injected or running</option>');
			else{
				var type = select_id.split("_");
				response.message = response.message.sort(SortByName);
				for(i=0; i<response.message.length; i++){

					if(type[0] == "startstop" || type[0] == "call"){
						if(type[0] == "startstop" && response.message[i].category =="async")
							$('#'+select_id).append('<option value="'+response.message[i].name+'">'+response.message[i].name+' [CAT: '+response.message[i].category+']</option>');

						else if(type[0] == "call" && response.message[i].category =="sync")
							$('#'+select_id).append('<option value="'+response.message[i].name+'">'+response.message[i].name+' [CAT: '+response.message[i].category+']</option>');
					}
					else
						$('#'+select_id).append('<option value="'+response.message[i].name+'">'+response.message[i].name+' [CAT: '+response.message[i].category+']</option>');
				}
			}
		},
		error: function(response){
			verify_token_expired(response.responseJSON.message, response.responseJSON.result);
			//alert('ERROR: '+JSON.stringify(response));
		}

	});
}


function refresh_tableplugins(table_id, action, board_id) {
	//$('#' + select_id).empty();

	if(board_id) url = s4t_api_url + "/boards/"+board_id+"/plugins";
	else url = s4t_api_url + "/plugins/";

	$.ajax({
		url: url,
		type: 'GET',
		dataType: 'json',
		headers: ajax_headers,

		success: function (response) {
			response.message = response.message.sort(SortByName);
			create_table_from_json(table_id, response.message, null, action);
		},
		error: function (response) {
			verify_token_expired(response.responseJSON.message, response.responseJSON.result);
		}
	});
}

