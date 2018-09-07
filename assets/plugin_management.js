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

var fields_to_show = ["id", "name", "category", "version", "type_id", "tag_id", "updated_at", "created_at"];
var actual_version = null;
var global_plugins_list = [];
var show_plugins_list = [];

$('[data-reveal-id="modal-show-plugins"]').on('click',
	function() {
		$.ajax({
			url: s4t_api_url+"/plugins",
			type: "GET",
			dataType: 'json',
			headers: ajax_headers,

			success: function(response){
				response.message = response.message.sort(SortByName);
console.log(response.message);
				//var fields_to_show = ["id", "name", "category", "version", "type_id", "tag_id", "updated_at", "created_at"];

				parsed_response = customize_plugin_table(fields_to_show, response.message, "modal-modify-plugin");
				create_table_from_json("show_plugins_table", parsed_response, fields_to_show);
				//create_table_from_json("show_plugins_table", response.message, null);
			},
			error: function(response){
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
			}
		});
	}
);


function load_project_logs(){
	$("#modal-show-plugin-logs").addClass("small");
	$("#project_logs").show();
	$("#boards_x_log_request").hide();
	$("#board_log_message").hide();
	$("#selected_board_log").hide();
	getall_cloud_plugins('logs_pluginlist');
}


function show_selected_board_log(label, response){
	$("#modal-show-plugin-logs").removeClass("small");
        $("#project_logs").hide();
        $("#boards_x_log_request").hide();
        $("#board_log_message").hide();
        $("#selected_board_log").show();

	var restyled_message = '';
	if(response.message instanceof Array){
		for(var i=0; i<response.message.length; i++)
			restyled_message += response.message[i] + '&#13;';
		}
	else
		restyled_message = response.message;


	var message_div = $('#selected_board_log');
	//message_div.find('[id=selected_board_message]').text("");

	message_div.find('[name=selected_message_log_text]').text("Message for board "+label);
	message_div.find('[id=selected_board_log_result]').text("Result: "+response.result);
	message_div.find('[id=selected_board_message]').html(restyled_message);
}


$('[data-reveal-id="modal-show-plugin-logs"]').on('click',
	function() {

		$("#logs_project").prop("checked", false);
		$("#logs_boardlist_bundle").show();

		//OLD: select approach
		//update_boardsv2('logs_boardlist', 'C', true);

		//NEW: table approach
		refresh_tableboards("logs_tableboards", "remove", "C", default_boardlist_columns);

		load_project_logs();
	}
);


function customize_plugin_table(fields_to_show, response_message, reveal_id){
	
	parsed_response = parse_json_fields(fields_to_show, response_message, false);
	
	for(var i=0; i<parsed_response.length; i++){
		if(parsed_response[i].type_id == "1")
			parsed_response[i].type_id = "NodeJS";
		else
			parsed_response[i].type_id = "Python";
	
		if(parsed_response[i].tag_id == "2")
			parsed_response[i].tag_id = "Unreleased";
		else if(parsed_response[i].tag_id == "1")
			parsed_response[i].tag_id = "Released";
	
		parsed_response[i].name = '<a data-reveal-id="'+reveal_id+'" id="'+parsed_response[i].id+'" onclick=populate_plugin_info(this)>'+parsed_response[i].name+'</a>';
	}
	return parsed_response;
}


function populate_plugin_info(a){

	var id = a.getAttribute("id");
	var reveal_id = a.getAttribute("data-reveal-id");


	var state = "";
	//console.log(reveal_id);
	if(reveal_id.indexOf("read") > -1) state = "Info";
	else if(reveal_id.indexOf("modify") > -1) {
		state = "Update";

		$('#update_plugin_codefile').val('');
		$('#update_plugin_paramfile').val('');
	}
	else if(reveal_id.indexOf("tag") > -1) state = "Tag";

	//Clean the output fieldset
	var targetModal = $('#'+reveal_id);
	var p = targetModal.find('p');
	if(p != undefined)
		$('#'+p[0].id).empty();

	$.ajax({
		url: s4t_api_url+"/plugins/"+id,
		type: "GET",
		dataType: 'json',
		headers: ajax_headers,

		success: function(response){
			var info = response.message;
			//console.log(info);

			//Needed to verify on submit if the new version is "greater" than the actual one
			actual_version = info.version;

			//targetModal.find('[name=info_text]').text("Update Plugin "+info.name);
			targetModal.find('[name=info_text]').text(state+" Plugin "+info.name);

			if(reveal_id.indexOf("tag") > -1)
				targetModal.find('[name=tag_plugin]').val(info.tag_id);

			targetModal.find('[name=saved_name]').val(info.name);
			targetModal.find('[name=saved_description]').val(info.description);
			targetModal.find('[name=saved_parameters]').val(info.defaults);

			targetModal.find('[name=id]').val(info.id);
			targetModal.find('[name=checksum]').val(info.checksum);
			targetModal.find('[name=category]').val(info.category);
			targetModal.find('[name=type]').val(info.type);

			targetModal.find('[name=name]').val(info.name);
			targetModal.find('[name=version]').val(info.version);
			targetModal.find('[name=description]').val(info.description);
			targetModal.find('[name=parameters]').val(info.defaults);
			targetModal.find('[name=code]').val(info.code);
		},
		error: function(response){
			verify_token_expired(response.responseJSON.message, response.responseJSON.result);
		}
	});
}


function populate_project_logs(log_request){

	if(log_request == undefined){
		var req = $('#boards_x_log_request').find('[name=request_text]').text();
		var array = req.split("Request ID: ");
		log_request = array[1];
	}

	$("#modal-show-plugin-logs").removeClass("small");

	$('#project_logs').hide();
	$("#boards_x_log_request").show();
	$("#board_log_message").hide();
	$("#selected_board_log").hide();

	var fields_to_parse = ["board_id", "timestamp", "result", "message"];
	var fields_to_show = ["board_id", "timestamp", "result"];

	$.ajax({
		url: s4t_api_url+"/requests/"+log_request,
		type: "GET",
		dataType: 'json',
		headers: ajax_headers,

		success: function(response){
			var boards_div = $('#boards_x_log_request');
			boards_div.find('[name=request_text]').text("Request ID: "+log_request);

			parsed_response = customize_log_boards_table(fields_to_parse, response.message, "modal-board-info");
			create_table_from_json("show_logs_boards_table", parsed_response, fields_to_show);
		},
		error: function(response){
			verify_token_expired(response.responseJSON.message, response.responseJSON.result);
		}
	});
}


function customize_log_boards_table(fields_to_parse, response_message, reveal_id){
	//console.log("customize_log_boards_table");

	parsed_response = parse_json_fields(fields_to_parse, response_message, false).sort(SortByTimestamp);

	for(var i=0; i<parsed_response.length; i++){
		for(var j=0; j<boards_list.length; j++){
			if(boards_list[j].board_id == parsed_response[i].board_id){
				parsed_response[i].board_id = '<a data-reveal-id="'+reveal_id+'" id="'+parsed_response[i].board_id+'" onclick=populate_board_info("'+parsed_response[i].board_id+'")>'+boards_list[j].label+'</a>';

				parsed_response[i].result = '<a id="'+parsed_response[i].result+'" data-label="'+boards_list[j].label+'" data-result="'+parsed_response[i].result+'" data-message="'+parsed_response[i].message+'" onclick=populate_log_message(this)>'+parsed_response[i].result+'</a>';
				break;
			}
		}
	}
	return parsed_response;
}


function populate_log_message(a){

	$('#project_logs').hide();
	$("#boards_x_log_request").hide();
	$("#board_log_message").show();
	$("#selected_board_log").hide();

	//$("#modal-show-plugin-logs").addClass("small");

	var label = a.getAttribute("data-label");
	var result = a.getAttribute("data-result");
	var message = a.getAttribute("data-message");

	var message_div = $('#board_log_message');
	message_div.find('[name=message_log_text]').text("Message for board "+label);
	message_div.find('[id=board_log_result]').text("Result: "+result);

	restyled_message = add_newlines_to_message(message, ', ');
	message_div.find('[id=board_message]').html(restyled_message);
}


function return_log_boards(a){
	var request_id = $('input[id="logs_request_id"]');
	document.getElementById('loading_bar').style.visibility='hidden';

	populate_project_logs(request_id[0].value, true);
}



$("select[class^='plugin_']").on('change', function(){
	var array = this.id.split("_");
	//console.log(array);
	var section = array[0];

	//Get values of selects
	var type = document.getElementById(section+"_type").value;
	var category = document.getElementById(section+"_category").value;
	var name = document.getElementById(section+"_name").value;
	//console.log(type+" "+category+" "+name);

	if(section == "inject"){
		$("#plugin_inject-output").empty();
	}
	else if(section == "startstop"){
		if(category == "sync"){
			$("#plugin_call-output").show();
			$("#plugin_call-output").empty();
			$("#plugin_startstop-output").hide();

			$("#startstop_actions").hide();
			$("#call_actions").show();
		}
		else if(category == "async"){
			$("#plugin_startstop-output").show();
			$("#plugin_startstop-output").empty();
			$("#plugin_call-output").hide();

			$("#startstop_actions").show();
			$("#call_actions").hide();
		}
		else{
			$("#plugin_call-output").hide();
			$("#plugin_startstop-output").hide();

			$("#startstop_actions").hide();
			$("#call_actions").hide();
		}
	}

	show_plugins_list = filter_plugins_list(type, category);
	//console.log(show_plugins_list);

	if(array[1] != "name"){
		refresh_plugins_unique_names(section+"_name", show_plugins_list);
		refresh_cloud_pluginsv2(section+"_pluginlist", show_plugins_list);
	}
	else
		refresh_cloud_pluginsv2(section+"_pluginlist", show_plugins_list, name);
});


function filter_plugins_list(type, category){
	var filtered_plugins_list = global_plugins_list;
	var tmp_list = [];

	if(type == "--" && category == "--"){
		filtered_plugins_list = global_plugins_list;
	}
	else{
		if(type != "--"){
			jQuery.grep(filtered_plugins_list, function(n){
				if(n.type_id == type) tmp_list.push(n);
			});
			filtered_plugins_list = tmp_list;
		}
		if(category != "--"){
			tmp_list = [];
			jQuery.grep(filtered_plugins_list, function(n){
				if(n.category == category) tmp_list.push(n);
			});
			filtered_plugins_list = tmp_list;
		}
	}
	//console.log(filtered_plugins_list);
	return filtered_plugins_list;
}


function refresh_plugins_unique_names(select_id, plugins_list){

	var names = [];
	$('#'+select_id).empty();
	$('#'+select_id).append('<option value="--">--</option>');

	$.each(plugins_list, function(index, value){
		if($.inArray(value.name, names) == -1){
			names.push(value.name);
			$('#'+select_id).append('<option value="'+value.name+'" class="'+value.category+'">'+value.name+'</option>');
		}
	});
}


function refresh_cloud_pluginsv2(select_id, plugins_list, name){
	$('#'+select_id).empty();

	if(name){
		tmp_list = [];
		jQuery.grep(plugins_list, function(n){
			if(n.name == name) tmp_list.push(n);
		});
		plugins_list = tmp_list;
	}

	for(var i=0; i<plugins_list.length; i++){
		$('#'+select_id).append('<option value="'+plugins_list[i].id+'" class="'+plugins_list[i].category+'">'+plugins_list[i].name+' [V: '+plugins_list[i].version+']</option>');
	}
}


function getall_cloud_plugins(select_id, released){
	$('#'+select_id).empty();

	var array = select_id.split("_");
	var section = array[0];

	$.ajax({
		url: s4t_api_url+"/plugins/",
		type: 'GET',
		dataType: 'json',
		headers: ajax_headers,

		success: function(response){
			if(response.message.length == 0)
				global_plugins_list = [];
			else{
				global_plugins_list = response.message.sort(SortByName);
				//console.log(global_plugins_list);

				for(i=0; i<response.message.length; i++)
{
					//Show only the released plugins
					if(released){
						if(response.message[i].tag_id == 1)
							$('#'+select_id).append('<option value="'+response.message[i].id+'" class="'+response.message[i].category+'">'+response.message[i].name+' [V: '+response.message[i].version+']</option>');
					}
					//Show all the plugins (released and not)
					else
						$('#'+select_id).append('<option value="'+response.message[i].id+'" class="'+response.message[i].category+'">'+response.message[i].name+' [V: '+response.message[i].version+']</option>');
				}

				refresh_plugins_unique_names(section+"_name", global_plugins_list);
			}
		},
		error: function(response){
			verify_token_expired(response.responseJSON.message, response.responseJSON.result);
			//alert('ERROR: '+JSON.stringify(response));
		}
	});
}


function refresh_tableplugins(table_id, action, board_id, reveal_id) {
	//$('#' + select_id).empty();

	if(board_id != null) url = s4t_api_url + "/boards/"+board_id+"/plugins";
	else url = s4t_api_url + "/plugins/";

	$.ajax({
		url: url,
		type: 'GET',
		dataType: 'json',
		headers: ajax_headers,

		success: function (response) {
			response.message = response.message.sort(SortByName);

			if(reveal_id != null){
				parsed_response = customize_plugin_table(fields_to_show, response.message, reveal_id);
				create_table_from_json(table_id, parsed_response, null, action);
			}
			else
				create_table_from_json(table_id, response.message, null, action);
		},
		error: function (response) {
			verify_token_expired(response.responseJSON.message, response.responseJSON.result);
		}
	});
}


function clean_plugin_fields(form_name, flag_output){
	document.getElementById(form_name+"_name").value = '';
	$("#"+form_name+"_category").val("async");
	$("#"+form_name+"_type").val("1");
	document.getElementById(form_name+"_parameters").value = '';
	document.getElementById(form_name+"_code").value = '';
	document.getElementById(form_name+"_version").value = '';
	document.getElementById(form_name+"_description").value = '';

	if(flag_output){
		res = form_name.split("_");
		document.getElementById(res[1]+"_"+res[0]+"-output").innerHTML ='';
	}
}


$('[data-reveal-id="modal-create-plugin"]').on('click',
	function() {
		$('#plugin_userfile').val('');
		$('#plugin_paramfile').val('');
		clean_plugin_fields("create_plugin", true);
	}
);

$('[data-reveal-id="modal-changetag-plugin"]').on('click',
	function() {
		loading_to_fix(); //TO BE FIXED !!!

		//$('#plugin_changetag-output').empty();
		refresh_tableplugins('changetag_tableplugins', null, null, 'modal-tag-plugin');
		document.getElementById('loading_bar').style.visibility='hidden';
	}
);

$('[data-reveal-id="modal-tag-plugin"]').on('click',
	function() {
		$('#plugin_tag-output').empty();
	}
);


$('[data-reveal-id="modal-destroy-plugin"]').on('click',
	function() {
		$('#plugin_destroy-output').empty(); 
		refresh_tableplugins('destroy_tableplugins', 'destroy', null, 'modal-read-plugin');
	}
);


$('[data-reveal-id="modal-inject-plugin"]').on('click',
	function() {

		$('#inject_project').prop('checked', false);
		$('#inject_boardlist_bundle').show();

		$('#plugin_inject-output').empty();

		//refresh_cloud_plugins('inject_pluginlist');

		$('#inject_type').val("--");
		$('#inject_category').val("--");
		$('#inject_name').val("--");

		getall_cloud_plugins('inject_pluginlist', true);

		//OLD: select approach
		//update_boardsv2('inject_boardlist', 'C', true);

		//NEW: table approach
		refresh_tableboards("inject_tableboards", "remove", "C", default_boardlist_columns);

		$("#inject_autostart").val("false");
		$("#inject_force").val("false");
	}
);


$('select[id="startstop_pluginlist"]').on('click', function(){
        var selected_plugin_class = $('select[id="startstop_pluginlist"] :selected').attr("class");
	//console.log(selected_plugin_class);

	if(selected_plugin_class == "sync"){
		$("#plugin_call-output").show();
		$("#plugin_call-output").empty();
		$("#plugin_startstop-output").hide();

		$("#startstop_actions").hide();
		$("#call_actions").show();
	}
	else if(selected_plugin_class == "async"){
		$("#plugin_startstop-output").show();
		$("#plugin_startstop-output").empty();
		$("#plugin_call-output").hide();

		$("#startstop_actions").show();
		$("#call_actions").hide();
	}
});


$('[data-reveal-id="modal-startstop-plugin"]').on('click',
	function() {
		$('#startstop_project').prop('checked', false);
		$('#startstop_boardlist_bundle').show();

		$('#plugin_startstop-output').empty();

		//refresh_cloud_plugins('startstop_pluginlist');

		$('#startstop_type').val("--");
		$('#startstop_category').val("--");
		$('#startstop_name').val("--");

		$("#startstop_actions").hide();
		$("#call_actions").hide();

		getall_cloud_plugins('startstop_pluginlist');

		//OLD: select approach
		//update_boardsv2('startstop_boardlist', 'C', true);

		//NEW: table approach
		refresh_tableboards("startstop_tableboards", "remove", "C", default_boardlist_columns);

		document.getElementById("startstop_plugin_parameters").value = '';
	}
);


$('[data-reveal-id="modal-remove-plugin"]').on('click',
	function() {
		$('#removeplugin_project').prop('checked', false);
		$('#removeplugin_boardlist_bundle').show();

		$('#plugin_remove-output').empty();

		//refresh_cloud_plugins('removeplugin_pluginlist');

		$('#removeplugin_type').val("--");
		$('#removeplugin_category').val("--");
		$('#removeplugin_name').val("--");

		$("#removeplugin_actions").hide();
		$("#call_actions").hide();

		getall_cloud_plugins('removeplugin_pluginlist');

		//OLD: select approach
		//update_boardsv2('removeplugin_boardlist', 'C', true);

		//NEW: table approach
		refresh_tableboards("removeplugin_tableboards", "remove", "C", default_boardlist_columns);
	}
);


/*
$('[data-reveal-id="modal-call-plugin"]').on('click',
	function() {
		$('#plugin_call-output').empty();
		refresh_cloud_plugins('call_pluginlist');
		update_boardsv2('call_boardlist', 'C', true);
		document.getElementById("call_plugin_parameters").value = '';
	}
);
*/

$('[data-reveal-id="modal-remove-plugins"]').on('click',
	function(){
		$("#modal-remove-plugins").addClass("small");	
		$('#plugins_remove-output').empty();
		$('#plugins_remove_table_section').hide();
		update_boardsv2('remove_plugins_boardlist', 'C');
	}
);


$('[data-reveal-id="modal-board-plugins"]').on('click',
	function(){
		$("#modal-board-plugins").addClass("small");
		$('#show_boardplugins_section').hide();
		update_boardsv2('plugins_boardlist');
	}
);


$('[id="remove_plugins_boardlist"]').on('change',
	function(){
		var board_id = $( "#remove_plugins_boardlist option:selected" ).val();

		if(board_id == '--'){
			$("#modal-remove-plugins").addClass("small");
			$('#plugins_remove_table_section').hide();
			document.getElementById("plugins_remove-output").innerHTML ='';
		}
		else{
			$("#modal-remove-plugins").removeClass("small");
			$('#plugins_remove_table_section').show();
			$.ajax({
				url: s4t_api_url+"/boards/"+board_id+"/plugins",
				type: 'GET',
				dataType: 'json',
				headers: ajax_headers,

				success: function(response){
					if(response.message.length ==0){
						$("#plugins_remove_table").html('<tr><td style="text-align:center">No plugins</td></tr>');
					}
					else{
						var fields_to_show = ["name", "version", "id", "category", "state"];
						parsed_response = parse_json_fields(fields_to_show, response.message, false);
						create_table_from_json("plugins_remove_table", parsed_response, fields_to_show, "remove");
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

		loading_to_fix(); //TO BE FIXED !!!

		var show_board_plugins = document.getElementById("plugins_boardlist").value;
		if(show_board_plugins == "--"){
			$("#modal-board-plugins").addClass("small");
			alert("Select a board!");
			$("#show_boardplugins_section").hide();
			document.getElementById('loading_bar').style.visibility='hidden';
		}
		else{
			$("#modal-board-plugins").removeClass("small");
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
						var fields_to_show = ["name", "version", "id", "category", "state"];
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

	loading_to_fix(); //TO BE FIXED !!!

	data ={};
	//document.getElementById('loading_bar').style.visibility='visible';
	var plugin_name = document.getElementById("create_plugin_name").value;
	var plugin_version = document.getElementById("create_plugin_version").value;
	var plugin_category = document.getElementById("create_plugin_category").value;
	var plugin_type = document.getElementById("create_plugin_type").value;
	var plugin_parameters = document.getElementById("create_plugin_parameters").value;
	var plugin_description = document.getElementById("create_plugin_description").value;
	var plugin_code = document.getElementById("create_plugin_code").value;
	document.getElementById("plugin_create-output").innerHTML ='';

	var array_version = plugin_version.split('.');

	if(plugin_name == ""){ alert("Insert plugin name!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else if(plugin_version == ""){ alert("Insert plugin version!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else if(array_version.length != 3) { alert("Insert correct version (example: 1.2.3)!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else if(plugin_category == ""){ alert("Insert category!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else if(plugin_type == ""){ alert("Insert type!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else if(plugin_description == ""){ alert("Insert description!"); document.getElementById('loading_bar').style.visibility='hidden';}
	//else if(plugin_parameters == ""){ alert("Insert parameters (json format)!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else if(plugin_code == ""){ alert("Insert code!"); document.getElementById('loading_bar').style.visibility='hidden';}

	else{
		data.name = plugin_name;
		data.category = plugin_category;

		//data.parameters = plugin_parameters;
		if(plugin_parameters == "")
			data.parameters = "{}";
		else
			data.parameters = plugin_parameters;

		data.code = plugin_code;
		data.version = plugin_version;
		data.type = plugin_type;
		data.description = plugin_description;

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


$('#tag_plugin').click(function(){

	loading_to_fix(); //TO BE FIXED !!!

	document.getElementById("plugin_tag-output").innerHTML ='';

	var plugin_id = document.getElementById("tag_plugin_id").value;
	var tag = document.getElementById("tag_plugin_release").value;

	data = {};
	data.tag_id = tag;
	
	$.ajax({
		url: s4t_api_url+"/plugins/"+plugin_id+"/tag",
		type: "POST",
		dataType: 'json',
		headers: ajax_headers,
		data: JSON.stringify(data),
	
		success: function(response){
			document.getElementById('loading_bar').style.visibility='hidden';
			refresh_lists();
			document.getElementById("plugin_tag-output").innerHTML = JSON.stringify(response.message);
		},
		error: function(response){
			verify_token_expired(response.responseJSON.message, response.responseJSON.result);
			document.getElementById('loading_bar').style.visibility='hidden';
			document.getElementById("plugin_tag-output").innerHTML = JSON.stringify(response.responseJSON.message);
		}
	});


});


$('#destroy_plugin').click(function(){

	loading_to_fix(); //TO BE FIXED !!!

	return_array = get_selected_rows_from_table("destroy_tableplugins", "destroy");

	headers = return_array[0];
	variables = return_array[1];
	//console.log(return_array);

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
					var plugin_id = variables[i][0];
	
					$.ajax({
						//url: s4t_api_url+"/plugins/"+plugin_name,
						url: s4t_api_url+"/plugins/"+plugin_id,
						type: "DELETE",
						dataType: 'json',
						headers: ajax_headers,
	
						success: function(response){
							if(i==variables.length-1) {
								//refresh_tableplugins("destroy_tableplugins", "destroy", null, null);
								refresh_tableplugins('destroy_tableplugins', 'destroy', null, 'modal-read-plugin');
								document.getElementById('loading_bar').style.visibility='hidden';
								refresh_lists();
							}
							document.getElementById("plugin_destroy-output").innerHTML += plugin_name + ": "+JSON.stringify(response.message)+"<br />";
						},
						error: function(response){
							verify_token_expired(response.responseJSON.message, response.responseJSON.result);
							if(i==variables.length-1) {
								refresh_tableplugins('destroy_tableplugins', 'destroy', null, 'modal-read-plugin');
								document.getElementById('loading_bar').style.visibility='hidden';
							}
							document.getElementById("plugin_destroy-output").innerHTML += plugin_name + ": "+JSON.stringify(response.responseJSON.message)+"<br />";
						}
					});
					//---------------------------------------------------------------------------------
				},delay*i);
			})(i);
			//---------------------------------------------------------------------------------
		}
	}
});


$('#update_plugin').click(function(){

	loading_to_fix(); //TO BE FIXED !!!

	data ={};
	//document.getElementById('loading_bar').style.visibility='visible';
	var saved_name = document.getElementById("update_plugin_saved_name").value;
	var saved_description = document.getElementById("update_plugin_saved_description").value;
	var saved_parameters = document.getElementById("update_plugin_saved_parameters").value;

	var plugin_id = document.getElementById("update_plugin_id").value;

	var plugin_category = document.getElementById("update_plugin_category").value;
	var plugin_type = document.getElementById("update_plugin_type").value;

	var plugin_name = document.getElementById("update_plugin_name").value;
	var plugin_version = document.getElementById("update_plugin_version").value;

	var plugin_description = document.getElementById("update_plugin_description").value;
	var plugin_parameters = document.getElementById("update_plugin_parameters").value;
	var plugin_code = document.getElementById("update_plugin_code").value;
	var plugin_checksum = document.getElementById("update_plugin_checksum").value;
	document.getElementById("plugin_update-output").innerHTML ='';

	var array_version = plugin_version.split('.');
	var flag_version = verify_new_version(plugin_version, actual_version);

	//We need to check if the code is changed or not. If not...we have to maintain the same version and name of the plugin
	var flag_code = false;
	if(plugin_checksum != MD5(plugin_code)) flag_code = true;

	//console.log(flag_version+ "---> OLD: "+actual_version+" NEW: "+plugin_version);
	//console.log(MD5(plugin_code)+"\n"+plugin_checksum);

	url = "";
	data.name = plugin_name;
	data.version = plugin_version;
	data.description = plugin_description;
	data.code = plugin_code;


	var flag_action = false;
	var post_or_patch = false; //false = post; true = patch


	if(plugin_name == ""){ alert("Insert plugin name!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else if(plugin_version == ""){ alert("Insert plugin version!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else if(array_version.length != 3) { alert("Insert correct version (example: 1.2.3)!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else if(plugin_description == ""){ alert("Insert description!"); document.getElementById('loading_bar').style.visibility='hidden';}
	//else if(plugin_parameters == ""){ alert("Insert parameters (json format)!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else if(plugin_code == ""){ alert("Insert code!"); document.getElementById('loading_bar').style.visibility='hidden';}
	//else if(!flag_version) { alert("Insert a version greater than the actual "+plugin_version); document.getElementById('loading_bar').style.visibility='hidden';}

	else if(saved_name == plugin_name && flag_version == false && saved_description == plugin_description && saved_parameters == plugin_parameters && flag_code == false){
		flag_action = false;
		alert("No changes done!");
		document.getElementById('loading_bar').style.visibility='hidden';
	}
	else if(saved_description != plugin_description || saved_parameters != plugin_parameters){
		if(flag_version || saved_name != plugin_name || flag_code){
			//POST
			//console.log("POST 1");
			flag_action = true;
		}
		else{
			//PATCH
			//console.log("PATCH 1");
			flag_action = true;
			post_or_patch = true;
		}
	}
	else if(flag_code){
		if(flag_version || saved_name != plugin_name){
			//POST
			//console.log("POST 2");
			flag_action = true;
		}
		else{
			flag_action = false;
			alert("Once changed the code...change the name and/or the version!");
			document.getElementById('loading_bar').style.visibility='hidden';
		}
	}
	else if(saved_name != plugin_name){
		//PATCH
		//console.log("PATCH 2");
		flag_action = true;
		post_or_patch = true;
	}
	else if(flag_version){
		//POST
		//console.log("POST 3");
		flag_action = true;
	}
	else
		console.log("OUT");


	if(flag_action){
		//PATCH
		if(post_or_patch){
			//data.defaults = plugin_parameters;

			if(plugin_parameters == "")
				data.defaults = "{}";
			else
				data.defaults = plugin_parameters;

			data.tag = 2;
			type = 'PATCH';
			url = s4t_api_url+"/plugins/"+plugin_id;
		}
		//POST
		else{
			//data.parameters = plugin_parameters;
			if(plugin_parameters == "")
				data.parameters = "{}";
			else
				data.parameters = plugin_parameters;


			data.category = plugin_category;
			data.type = plugin_type;
			type = 'POST';
			url = s4t_api_url+"/plugins";
		}

		$.ajax({
			url: url,
			type: type,
			dataType: 'json',
			headers: ajax_headers,
			data: JSON.stringify(data),
		
			success: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				document.getElementById("plugin_update-output").innerHTML = JSON.stringify(response.message);
		
				document.getElementById("update_plugin_saved_name").value = plugin_name;
				document.getElementById("update_plugin_saved_description").value = plugin_description;
				document.getElementById("update_plugin_saved_parameters").value = plugin_parameters;
				actual_version = plugin_version;
		
				refresh_lists();
			},
			error: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
				document.getElementById("plugin_update-output").innerHTML = JSON.stringify(response.responseJSON.message);
			}
		});
	}
});


//Create section
document.getElementById('plugin_userfile').addEventListener('change', readFile, false);
document.getElementById('plugin_userfile').element_id = "create_plugin_code";

document.getElementById('plugin_paramfile').addEventListener('change', readFile, false);
document.getElementById('plugin_paramfile').element_id = "create_plugin_parameters";


//Update section
document.getElementById('update_plugin_codefile').addEventListener('change', readFile, false);
document.getElementById('update_plugin_codefile').element_id = "update_plugin_code";

document.getElementById('update_plugin_paramfile').addEventListener('change', readFile, false);
document.getElementById('update_plugin_paramfile').element_id = "update_plugin_parameters";


$('#inject_plugin').click(function(){

	loading_to_fix(); //TO BE FIXED !!!

	document.getElementById("plugin_inject-output").innerHTML ='';

	//NEW: table approach
	if ($('#inject_pluginlist option:selected').length == 0) {alert('Select a Plugin'); document.getElementById('loading_bar').style.visibility='hidden';}

	//OLD: select approach
	/*
	if (!$('#inject_project').is(':checked') && $('#inject_boardlist option:selected').length == 0) {alert('Select a Board'); document.getElementById('loading_bar').style.visibility='hidden';}
	else if ($('#inject_pluginlist option:selected').length == 0) {alert('Select a Plugin'); document.getElementById('loading_bar').style.visibility='hidden';}
	*/
	else {
		var plugin_id = document.getElementById("inject_pluginlist").value;
		var plugin_name = $('#inject_pluginlist option:selected')[0].innerHTML;

		data = {};

		data.plugin = plugin_id;
		data.onboot = document.getElementById("inject_autostart").value;
		data.force = document.getElementById("inject_force").value;

		if ($('#inject_project').is(':checked')){

			var project_id = getCookie("selected_prj");
			//data.plugin = plugin_id;

			$.ajax({
				url: s4t_api_url+"/projects/"+project_id+"/plugins",
				type: "PUT",
				dataType: 'json',
				headers: ajax_headers,
				data: JSON.stringify(data),
			
				success: function(response){
					document.getElementById('loading_bar').style.visibility='hidden';

					//Old output without link to request_id
					//document.getElementById("plugin_inject-output").innerHTML = JSON.stringify(response.message);

					//New output with link to request_id
					//var subject = "/projects/"+project_id+"/plugins/"+plugin_id;
					var subject = response.subject;
					document.getElementById("plugin_inject-output").innerHTML = 'Request ID: <a data-reveal-id="modal-show-project-requests" id="'+response.req_id+'" value="'+subject+'" onclick=populate_request_info(this)>'+response.req_id+'</a>';


					refresh_lists();
				},
				error: function(response){
					document.getElementById('loading_bar').style.visibility='hidden';
					verify_token_expired(response.responseJSON.message, response.responseJSON.result);
					document.getElementById("plugin_inject-output").innerHTML = JSON.stringify(response.responseJSON.message);
				}
			});
		}
		else{

			//NEW: table approach
			return_array = get_selected_rows_from_table("inject_tableboards", "remove");

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
								url: s4t_api_url+"/boards/"+board_id+"/plugins",
								type: 'PUT',
								dataType: 'json',
								headers: ajax_headers,
								data: JSON.stringify(data),

								success: function(response){
									if(i==variables.length-1) {
										refresh_tableboards("inject_tableboards", "remove", "C", default_boardlist_columns);
										refresh_lists();
										document.getElementById('loading_bar').style.visibility='hidden';
									}
									document.getElementById("plugin_inject-output").innerHTML += board_name+ ' with '+ plugin_name+': '+JSON.stringify(response.message) +'<br />';
								},
								error: function(response){
									verify_token_expired(response.responseJSON.message, response.responseJSON.result);
									if(i==variables.length-1) {
										refresh_tableboards("inject_tableboards", "remove", "C", default_boardlist_columns);
										document.getElementById('loading_bar').style.visibility='hidden';
									}
									document.getElementById("plugin_inject-output").innerHTML += board_name+ ' with '+plugin_name+': '+JSON.stringify(response.responseJSON.message) +'<br />';
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
			var list = document.getElementById("inject_boardlist");
			var selected_list = [];
			var selected_names = [];
			var output_string = '';


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
								//document.getElementById("plugin_inject-output").innerHTML += board_name+ ' with '+ data.plugin+': '+JSON.stringify(response.message) +'<br />';
								document.getElementById("plugin_inject-output").innerHTML += board_name+ ' with '+ plugin_name+': '+JSON.stringify(response.message) +'<br />';
							},
							error: function(response){
								verify_token_expired(response.responseJSON.message, response.responseJSON.result);
								if(i==selected_list.length-1) document.getElementById('loading_bar').style.visibility='hidden';
								//document.getElementById("plugin_inject-output").innerHTML += board_name+ ' with '+data.plugin+': '+JSON.stringify(response.responseJSON.message) +'<br />';
								document.getElementById("plugin_inject-output").innerHTML += board_name+ ' with '+plugin_name+': '+JSON.stringify(response.responseJSON.message) +'<br />';
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


$('.startstop_plugin').click(function(){

	loading_to_fix(); //TO BE FIXED !!!

	var plugin_parameters = document.getElementById("startstop_plugin_parameters").value;
	var start_stop_flag = this.id;

	document.getElementById("plugin_startstop-output").innerHTML ='';

	//NEW: table approach
	if ($('#startstop_pluginlist option:selected').length == 0) {alert('Select a Plugin'); document.getElementById('loading_bar').style.visibility='hidden';}

	//OLD: select approach
	/*
	if (!$('#startstop_project').is(':checked') && $('#startstop_boardlist option:selected').length == 0) { alert('Select a Board');document.getElementById('loading_bar').style.visibility='hidden';}
	else if ($('#startstop_pluginlist option:selected').length == 0) {alert('Select a Plugin'); document.getElementById('loading_bar').style.visibility='hidden';}
	//else if(start_stop_flag == "start" && plugin_parameters == "") {alert("On start, please add parameters (in json format)!"); document.getElementById('loading_bar').style.visibility='hidden';}
	*/
	else {

		var plugin_id = document.getElementById("startstop_pluginlist").value;
		var plugin_name = $('#startstop_pluginlist option:selected')[0].innerHTML;

		if ($('#startstop_project').is(':checked')){
		
			var project_id = getCookie("selected_prj");

			data = {};
			if(start_stop_flag == "start"){
				data.parameters = plugin_parameters;
				data.operation = "run";
			}
			else if(start_stop_flag == "stop"){
				data.operation = "kill";
			}
			else if(start_stop_flag == "restart"){
				data.operation = "restart";
			}
			
			$.ajax({
				url: s4t_api_url+"/projects/"+project_id+"/plugins/"+plugin_id,
				type: "POST",
				dataType: 'json',
				headers: ajax_headers,
				data: JSON.stringify(data),
			
				success: function(response){
					document.getElementById('loading_bar').style.visibility='hidden';

					//document.getElementById("plugin_startstop-output").innerHTML = JSON.stringify(response.message);

					//New output with link to request_id
					//var subject = "/projects/"+project_id+"/plugins/"+plugin_id;
					var subject = response.subject;
					document.getElementById("plugin_startstop-output").innerHTML = 'Request ID: <a data-reveal-id="modal-show-project-requests" id="'+response.req_id+'" value="'+subject+'" onclick=populate_request_info(this)>'+response.req_id+'</a>';

					refresh_lists();
				},
				error: function(response){
					document.getElementById('loading_bar').style.visibility='hidden';
					verify_token_expired(response.responseJSON.message, response.responseJSON.result);
					document.getElementById("plugin_startstop-output").innerHTML = JSON.stringify(response.responseJSON.message);
				}
			});
		}
		else{

			//NEW: table approach
			return_array = get_selected_rows_from_table("startstop_tableboards", "remove");

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

							data = {};
							if(start_stop_flag == "start"){
								data.parameters = plugin_parameters;
								data.operation = "run";
							}
							else if(start_stop_flag == "stop"){
								data.operation = "kill";
							}
							else if(start_stop_flag == "restart"){
								data.operation = "restart";
							}

							$.ajax({
								url: s4t_api_url+"/boards/"+board_id+"/plugins/"+plugin_id,
								type: 'POST',
								dataType: 'json',
								headers: ajax_headers,
								data: JSON.stringify(data),

								success: function(response){
									if(i==variables.length-1) {
										refresh_tableboards("startstop_tableboards", "remove", "C", default_boardlist_columns);
										refresh_lists();
										document.getElementById('loading_bar').style.visibility='hidden';
									}
									document.getElementById("plugin_startstop-output").innerHTML += board_name + ": "+ JSON.stringify(response.message)+"<br />";
								},
								error: function(response){
									verify_token_expired(response.responseJSON.message, response.responseJSON.result);
									if(i==variables.length-1) {
										refresh_tableboards("startstop_tableboards", "remove", "C", default_boardlist_columns);
										document.getElementById('loading_bar').style.visibility='hidden';
									}
									document.getElementById("plugin_startstop-output").innerHTML += board_name + ": "+JSON.stringify(response.responseJSON.message)+"<br />";
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
							data.parameters = plugin_parameters;
							data.operation = "run";
						}
						else if(start_stop_flag == "stop"){
							data.operation = "kill";
						}
						else if(start_stop_flag == "restart"){
							data.operation = "restart";
						}

						$.ajax({
							//url: s4t_api_url+"/boards/"+board_id+"/plugins/"+plugin_name,
							url: s4t_api_url+"/boards/"+board_id+"/plugins/"+plugin_id,
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
			*/
		}
	}
});

$('#call_plugin').click(function(){

	loading_to_fix(); //TO BE FIXED !!!

	document.getElementById("plugin_call-output").innerHTML = '';

	var plugin_parameters = document.getElementById("startstop_plugin_parameters").value;

	//NEW: table approach
	if ($('#startstop_pluginlist option:selected').length == 0) {alert('Select a Plugin'); document.getElementById('loading_bar').style.visibility='hidden';}

	//OLD: select approach
	/*
	if (!$('#startstop_project').is(':checked') && $('#startstop_boardlist option:selected').length == 0) { alert('Select a Board'); document.getElementById('loading_bar').style.visibility='hidden';}
	else if ($('#startstop_pluginlist option:selected').length == 0) {alert('Select a Plugin'); document.getElementById('loading_bar').style.visibility='hidden';}
	//else if(plugin_parameters == "") {alert("On start, please add the parameters needed!"); document.getElementById('loading_bar').style.visibility='hidden';}
	*/
	else {

		var plugin_id = document.getElementById("startstop_pluginlist").value;
		var plugin_name = $('#startstop_pluginlist option:selected')[0].innerHTML;

		if ($('#startstop_project').is(':checked')){

			var project_id = getCookie("selected_prj");

			data = {};
			data.parameters = plugin_parameters;
			data.operation = "call";

			$.ajax({
				url: s4t_api_url+"/projects/"+project_id+"/plugins/"+plugin_id,
				type: "POST",
				dataType: 'json',
				headers: ajax_headers,
				data: JSON.stringify(data),

				success: function(response){
					document.getElementById('loading_bar').style.visibility='hidden';

					//Old output without link to request_id
					//document.getElementById("plugin_startstop-output").innerHTML = JSON.stringify(response.message);

					//New output with link to request_id
					//var subject = "/projects/"+project_id+"/plugins/"+plugin_id;
					var subject = response.subject;
					document.getElementById("plugin_call-output").innerHTML = 'Request ID: <a data-reveal-id="modal-show-project-requests" id="'+response.req_id+'" value="'+subject+'" onclick=populate_request_info(this)>'+response.req_id+'</a>';

					refresh_lists();
				},
				error: function(response){
					document.getElementById('loading_bar').style.visibility='hidden';
					verify_token_expired(response.responseJSON.message, response.responseJSON.result);
					document.getElementById("plugin_call-output").innerHTML = JSON.stringify(response.responseJSON.message);
				}
			});
		}

		else{

			//NEW: table approach
			return_array = get_selected_rows_from_table("startstop_tableboards", "remove");

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

							data = {};
							data.operation = "call";
							data.parameters = plugin_parameters;

							$.ajax({
								url: s4t_api_url+"/boards/"+board_id+"/plugins/"+plugin_id,
								type: 'POST',
								dataType: 'json',
								headers: ajax_headers,
								data: JSON.stringify(data),

								success: function(response){
									if(i==variables.length-1) {
										refresh_tableboards("startstop_tableboards", "remove", "C", default_boardlist_columns);
										refresh_lists();
										document.getElementById('loading_bar').style.visibility='hidden';
									}
									document.getElementById("plugin_call-output").innerHTML += board_name + ": "+ JSON.stringify(response.message)+"<br />";
								},
								error: function(response){
									verify_token_expired(response.responseJSON.message, response.responseJSON.result);
									if(i==variables.length-1) {
										refresh_tableboards("startstop_tableboards", "remove", "C", default_boardlist_columns);
										document.getElementById('loading_bar').style.visibility='hidden';
									}
									document.getElementById("plugin_call-output").innerHTML += JSON.stringify(response.responseJSON.message)+"<br />";
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
			//var list = document.getElementById("call_boardlist");
			var list = document.getElementById("startstop_boardlist");

			var selected_list = [];
			var selected_names = [];

			data = {};
			data.operation = "call";
			data.parameters = plugin_parameters;

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
							//url: s4t_api_url+"/boards/"+board_id+"/plugins/"+plugin_name,
							url: s4t_api_url+"/boards/"+board_id+"/plugins/"+plugin_id,
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
			*/
		}
	}
});


$('#remove_plugins').click(function(){

	loading_to_fix(); //TO BE FIXED !!!

	document.getElementById("plugins_remove-output").innerHTML ='';

	var board_id = document.getElementById("remove_plugins_boardlist").value;
	if(board_id == "--") { alert('Select a Board'); document.getElementById('loading_bar').style.visibility='hidden';}
	else{
		return_array = get_selected_rows_from_table("plugins_remove_table", "remove");
	
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
						var plugin_id = variables[i][2];
						var plugin_name = variables[i][0];

						$.ajax({
							//url: s4t_api_url+"/boards/"+board_id+"/plugins/"+plugin_name,
							url: s4t_api_url+"/boards/"+board_id+"/plugins/"+plugin_id,
							type: "DELETE",
							dataType: 'json',
							headers: ajax_headers,

							success: function(response){
								if(i==variables.length-1) {
									refresh_tableplugins("plugins_remove_table", "remove", board_id, null);
									document.getElementById('loading_bar').style.visibility='hidden';
									refresh_lists();
								}
								document.getElementById("plugins_remove-output").innerHTML += plugin_name + ": "+JSON.stringify(response.message)+"<br />";
							},
							error: function(response){
								verify_token_expired(response.responseJSON.message, response.responseJSON.result);
								if(i==variables.length-1) {
									refresh_tableplugins("plugins_remove_table", "remove", board_id, null);
									document.getElementById('loading_bar').style.visibility='hidden';
								}
								document.getElementById("plugins_remove-output").innerHTML += plugin_name + ": "+JSON.stringify(response.responseJSON.message)+"<br />";
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


$('#remove_plugin').click(function(){

	loading_to_fix(); //TO BE FIXED !!!

	document.getElementById("plugin_remove-output").innerHTML ='';

	//NEW: table approach
	if ($('#removeplugin_pluginlist option:selected').length == 0) {alert('Select a Plugin'); document.getElementById('loading_bar').style.visibility='hidden';}

	//OLD: select approach
	/*
	if (!$('#removeplugin_project').is(':checked') && $('#removeplugin_boardlist option:selected').length == 0) { alert('Select a Board');document.getElementById('loading_bar').style.visibility='hidden';}
	else if ($('#removeplugin_pluginlist option:selected').length == 0) {alert('Select a Plugin'); document.getElementById('loading_bar').style.visibility='hidden';}
	*/
	else {

		var plugin_id = document.getElementById("removeplugin_pluginlist").value;

		if ($('#removeplugin_project').is(':checked')){

			var project_id = getCookie("selected_prj");

			$.ajax({
				url: s4t_api_url+"/projects/"+project_id+"/plugins/"+plugin_id,
				type: "DELETE",
				dataType: 'json',
				headers: ajax_headers,

				success: function(response){
					document.getElementById('loading_bar').style.visibility='hidden';

					//Old output without link to request_id
					//document.getElementById("plugin_remove-output").innerHTML = JSON.stringify(response.message);

					//New output with link to request_id
					//var subject = "/projects/"+project_id+"/plugins/"+plugin_id;
					var subject = response.subject;
					document.getElementById("plugin_remove-output").innerHTML = 'Request ID: <a data-reveal-id="modal-show-project-requests" id="'+response.req_id+'" value="'+subject+'" onclick=populate_request_info(this)>'+response.req_id+'</a>';

					refresh_lists();
				},
				error: function(response){
					document.getElementById('loading_bar').style.visibility='hidden';
					verify_token_expired(response.responseJSON.message, response.responseJSON.result);
					document.getElementById("plugin_remove-output").innerHTML = JSON.stringify(response.responseJSON.message);
				}
			});
		}
		else{

			//NEW: table approach
			return_array = get_selected_rows_from_table("removeplugin_tableboards", "remove");

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
								url: s4t_api_url+"/boards/"+board_id+"/plugins/"+plugin_id,
								type: 'DELETE',
								dataType: 'json',
								headers: ajax_headers,

								success: function(response){
									if(i==variables.length-1) {
										refresh_tableboards("removeplugin_tableboards", "remove", "C", default_boardlist_columns);
										refresh_lists();
										document.getElementById('loading_bar').style.visibility='hidden';
									}
									document.getElementById("plugin_remove-output").innerHTML += board_name +': '+JSON.stringify(response.message) +'<br />';
								},
								error: function(response){
									verify_token_expired(response.responseJSON.message, response.responseJSON.result);
									if(i==variables.length-1) {
										refresh_tableboards("removeplugin_tableboards", "remove", "C", default_boardlist_columns);
										document.getElementById('loading_bar').style.visibility='hidden';
									}
									document.getElementById("plugin_remove-output").innerHTML += board_name +': '+JSON.stringify(response.responseJSON.message) +'<br />';
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
			var list = document.getElementById("removeplugin_boardlist");

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

						$.ajax({
							url: s4t_api_url+"/boards/"+board_id+"/plugins/"+plugin_id,
							type: 'DELETE',
							dataType: 'json',
							headers: ajax_headers,

							success: function(response){
								if(i==selected_list.length-1) {
									document.getElementById('loading_bar').style.visibility='hidden';
									refresh_lists();
								}
								document.getElementById("plugin_remove-output").innerHTML += board_name +': '+JSON.stringify(response.message) +'<br />';
							},
							error: function(response){
								verify_token_expired(response.responseJSON.message, response.responseJSON.result);
								if(i==selected_list.length-1) document.getElementById('loading_bar').style.visibility='hidden';
								document.getElementById("plugin_remove-output").innerHTML += board_name +': '+JSON.stringify(response.responseJSON.message) +'<br />';
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



$('#logs_plugin').click(function(){

	loading_to_fix(); //TO BE FIXED !!!

	var rows = document.getElementById("rows_number").value;

	if ($('#logs_pluginlist option:selected').length == 0) {alert('Select a Plugin'); document.getElementById('loading_bar').style.visibility='hidden';}
	else if(rows == undefined || rows == 0) {alert('Insert the number of rows to retrieve!'); document.getElementById('loading_bar').style.visibility='hidden';}
	else {
		var plugin_id = document.getElementById("logs_pluginlist").value;
		var plugin_name = $('#logs_pluginlist option:selected')[0].innerHTML;

		//Per project request
		if ($('#logs_project').is(':checked')){

			var project_id = getCookie("selected_prj");

			$.ajax({
				url: s4t_api_url+"/projects/"+project_id+"/plugins/"+plugin_id+"/logs?rows="+rows,
				type: "GET",
				dataType: 'json',
				headers: ajax_headers,

				success: function(response){
					document.getElementById('loading_bar').style.visibility='hidden';

					var request_id = response.req_id;
					document.getElementById("logs_request_id").value = request_id;
					document.getElementById("logs_rows").value = rows;

					populate_project_logs(request_id);
					refresh_lists();
				},
				error: function(response){
					document.getElementById('loading_bar').style.visibility='hidden';
					verify_token_expired(response.responseJSON.message, response.responseJSON.result);
				}
			});
		}
		//Per list of boards call
		else{
			//NEW: table approach
			return_array = get_selected_rows_from_table("logs_tableboards", "remove");

			headers = return_array[0];
			variables = return_array[1];

			if(variables.length == 0){
				alert('No board(s) selected!');
				document.getElementById('loading_bar').style.visibility='hidden';
			}
			else if(variables.length > 1){
				alert('It is NOT possible to see the logs of more than one board per time!');
				document.getElementById('loading_bar').style.visibility='hidden';
			}
			else{
				var board_id = variables[0][1];
				var board_name = variables[0][0];

				//Added to allow refresh action for the log
				document.getElementById("logs_board_id").value = board_id;
				document.getElementById("logs_board_name").value = board_name;
				document.getElementById("logs_plugin_id").value = plugin_id;
				document.getElementById("logs_rows_number").value = rows;

				$.ajax({
					url: s4t_api_url+"/boards/"+board_id+"/plugins/"+plugin_id+"/logs?rows="+rows,
					type: 'GET',
					dataType: 'json',
					headers: ajax_headers,

					success: function(response){
						show_selected_board_log(board_name, response);
						refresh_lists();
						document.getElementById('loading_bar').style.visibility='hidden';
					},
					error: function(response){
						verify_token_expired(response.responseJSON.message, response.responseJSON.result);
						document.getElementById('loading_bar').style.visibility='hidden';
						alert(response.responseJSON.message);
					}
				});
			}


			//OLD: select approach
			/*
			var list = document.getElementById("logs_boardlist");
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
								url: s4t_api_url+"/boards/"+board_id+"/plugins/"+plugin_id+"/logs?rows="+rows,
								type: 'GET',
								dataType: 'json',
								headers: ajax_headers,

								success: function(response){
									if(i==selected_list.length-1){
										document.getElementById('loading_bar').style.visibility='hidden';
console.log(response);
										show_selected_board_log(label, response);
										refresh_lists();
									}
									//document.getElementById("logs-output").innerHTML += label+': '+JSON.stringify(response.message)+'<br />';
								},
								error: function(response){
									verify_token_expired(response.responseJSON.message, response.responseJSON.result);
									if(i==selected_list.length-1) document.getElementById('loading_bar').style.visibility='hidden';

									//document.getElementById("logs-output").innerHTML += label+': '+JSON.stringify(response.responseJSON.message)+'<br />';
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



function refresh_log_message(){

	loading_to_fix(); //TO BE FIXED !!!

	var targetModal = $('#modal-show-plugin-logs');

	var board_id = targetModal.find('[id=logs_board_id]').val();
	var board_name = targetModal.find('[id=logs_board_name]').val();
	var plugin_id = targetModal.find('[id=logs_plugin_id]').val();
	var rows = targetModal.find('[id=logs_rows_number]').val();

	targetModal.find('[name=selected_message_log_text]').text("Message for board "+board_name);
	
	$.ajax({
		url: s4t_api_url+"/boards/"+board_id+"/plugins/"+plugin_id+"/logs?rows="+rows,
		type: 'GET',
		dataType: 'json',
		headers: ajax_headers,
	
		success: function(response){
			show_selected_board_log(board_name, response);
			refresh_lists();
			document.getElementById('loading_bar').style.visibility='hidden';
		},
		error: function(response){
			verify_token_expired(response.responseJSON.message, response.responseJSON.result);
			document.getElementById('loading_bar').style.visibility='hidden';
			alert(response.responseJSON.message);
		}
	});

}



/*
function refresh_plugins_unique_names(select_id, plugins_list){

	var names = [];
	$('#'+select_id).empty();
	$('#'+select_id).append('<option value="--">--</option>');

	$.each(plugins_list, function(index, value){
		if($.inArray(value.name, names) == -1){
			names.push(value.name);
			$('#'+select_id).append('<option value="'+value.name+'">'+value.name+'</option>');
		}
	});
}


function refresh_cloud_pluginsv2(select_id, plugins_list){

	$('#'+select_id).empty();
	for(var i=0; i<plugins_list.length; i++){
		$('#'+select_id).append('<option value="'+plugins_list[i].id+'">'+plugins_list[i].name+' [V: '+plugins_list[i].version+']</option>');
	}
}


function getall_cloud_plugins(select_id){
	$('#'+select_id).empty();

	var array = select_id.split("_");
	var section = array[0];

	$.ajax({
		url: s4t_api_url+"/plugins/",
		type: 'GET',
		dataType: 'json',
		headers: ajax_headers,
	
		success: function(response){
			if(response.message.length == 0)
				global_plugins_list = [];
			else{
				global_plugins_list = response.message.sort(SortByName);
				console.log(global_plugins_list);

				for(i=0; i<response.message.length; i++)
					$('#'+select_id).append('<option value="'+response.message[i].id+'">'+response.message[i].name+' [V: '+response.message[i].version+']</option>');

				refresh_plugins_unique_names(section+"_name", global_plugins_list);
			}
		},
		error: function(response){
			verify_token_expired(response.responseJSON.message, response.responseJSON.result);
			//alert('ERROR: '+JSON.stringify(response));
		}
	});
}
*/




//TO BE REMOVED...
function refresh_cloud_plugins(select_id){
	$('#'+select_id).empty();
	$.ajax({
		url: s4t_api_url+"/plugins/",
		type: 'GET',
		dataType: 'json',
		headers: ajax_headers,

		success: function(response){

			if(response.message.length == 0){
				$('#'+select_id).append('<option>NO plugin injected or running</option>');
				global_plugins_list = [];
			}
			else{
				var type = select_id.split("_");
				response.message = response.message.sort(SortByName);

				global_plugins_list = response.message;

				for(i=0; i<response.message.length; i++){

					if(type[0] == "startstop" || type[0] == "call"){
						if(type[0] == "startstop" && response.message[i].category =="async")
							$('#'+select_id).append('<option value="'+response.message[i].name+'">'+response.message[i].name+' [CAT: '+response.message[i].category+' V: '+response.message[i].version+']</option>');

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


/*
function refresh_tableplugins(table_id, action, board_id, reveal_id) {
	//$('#' + select_id).empty();

	if(board_id != null) url = s4t_api_url + "/boards/"+board_id+"/plugins";
	else url = s4t_api_url + "/plugins/";

	$.ajax({
		url: url,
		type: 'GET',
		dataType: 'json',
		headers: ajax_headers,

		success: function (response) {
			response.message = response.message.sort(SortByName);

			if(reveal_id != null){
				parsed_response = customize_plugin_table(fields_to_show, response.message, reveal_id);
				create_table_from_json(table_id, parsed_response, null, action);
			}
			else
				create_table_from_json(table_id, response.message, null, action);
		},
		error: function (response) {
			verify_token_expired(response.responseJSON.message, response.responseJSON.result);
		}
	});
}
*/
