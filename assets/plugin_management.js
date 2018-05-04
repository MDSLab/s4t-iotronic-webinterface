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
	else if(reveal_id.indexOf("modify") > -1) state = "Update";
	else if(reveal_id.indexOf("tag") > -1) state = "Tag";

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

			//var targetModal = $('#modal-modify-plugin');
			var targetModal = $('#'+reveal_id);

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
			$('#'+select_id).append('<option value="'+value.name+'">'+value.name+'</option>');
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
				//console.log(global_plugins_list);

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
		clean_plugin_fields("create_plugin", true);
	}
);


$('[data-reveal-id="modal-changetag-plugin"]').on('click',
    function() {
        $('#plugin_destroy-output').empty();
        refresh_tableplugins('changetag_tableplugins', null, null, 'modal-tag-plugin');
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

		getall_cloud_plugins('inject_pluginlist');

		update_boardsv2('inject_boardlist', 'C', true);
		$("#inject_autostart").val("false");
		$("#inject_force").val("false");
	}
);


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

		update_boardsv2('startstop_boardlist', 'C', true);
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

		update_boardsv2('removeplugin_boardlist', 'C', true);
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
		$('#plugins_remove-output').empty();
		$('#plugins_remove_table_section').hide();
		update_boardsv2('remove_plugins_boardlist', 'C');
	}
);


$('[data-reveal-id="modal-board-plugins"]').on('click',
	function(){
		$('#show_boardplugins_section').hide();
		update_boardsv2('plugins_boardlist');
	}
);


$('[id="remove_plugins_boardlist"]').on('change',
	function(){

		var board_id = $( "#remove_plugins_boardlist option:selected" ).val();

		if(board_id == '--'){
			$('#plugins_remove_table_section').hide();
			document.getElementById("plugins_remove-output").innerHTML ='';
		}
		else{
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
						var fields_to_show = ["name", "id", "category", "state"];
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
	else if(plugin_parameters == ""){ alert("Insert parameters (json format)!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else if(plugin_code == ""){ alert("Insert code!"); document.getElementById('loading_bar').style.visibility='hidden';}

	else{
		data.name = plugin_name;
		data.category = plugin_category;
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
					//var plugin_name = variables[i][1];
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
							document.getElementById("plugin_destroy-output").innerHTML += JSON.stringify(response.message)+"<br />";
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


$('#update_plugin').click(function(){

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
	else if(plugin_parameters == ""){ alert("Insert parameters (json format)!"); document.getElementById('loading_bar').style.visibility='hidden';}
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
			data.defaults = plugin_parameters;
			data.tag = 2;
			type = 'PATCH';
			url = s4t_api_url+"/plugins/"+plugin_id;
		}
		//POST
		else{
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


document.getElementById('userfile').addEventListener('change', readFile, false);
document.getElementById('userfile').element_id = "create_plugin_code";


$('#inject_plugin').click(function(){
	document.getElementById("plugin_inject-output").innerHTML ='';

	if (!$('#inject_project').is(':checked') && $('#inject_boardlist option:selected').length == 0) {alert('Select a Board'); document.getElementById('loading_bar').style.visibility='hidden';}
	else if ($('#inject_pluginlist option:selected').length == 0) {alert('Select a Plugin'); document.getElementById('loading_bar').style.visibility='hidden';}
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
					document.getElementById("plugin_inject-output").innerHTML = JSON.stringify(response.message);
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
		}
	}
});


$('.startstop_plugin').click(function(){
	//var plugin_id = document.getElementById("startstop_pluginlist").value;
	//var plugin_name = $('#startstop_pluginlist option:selected')[0].innerHTML;

	//var plugin_name = document.getElementById("startstop_pluginlist").value;
	var plugin_parameters = document.getElementById("startstop_plugin_parameters").value;
	var start_stop_flag = this.id;

	document.getElementById("plugin_startstop-output").innerHTML ='';

	if (!$('#startstop_project').is(':checked') && $('#startstop_boardlist option:selected').length == 0) { alert('Select a Board');document.getElementById('loading_bar').style.visibility='hidden';}
	else if ($('#startstop_pluginlist option:selected').length == 0) {alert('Select a Plugin'); document.getElementById('loading_bar').style.visibility='hidden';}
	//else if(start_stop_flag == "start" && plugin_parameters == "") {alert("On start, please add parameters (in json format)!"); document.getElementById('loading_bar').style.visibility='hidden';}
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
					document.getElementById("plugin_startstop-output").innerHTML = JSON.stringify(response.message);
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
		}
	}
});

$('#call_plugin').click(function(){

	document.getElementById("plugin_call-output").innerHTML = '';

	var plugin_parameters = document.getElementById("startstop_plugin_parameters").value;

	if (!$('#startstop_project').is(':checked') && $('#startstop_boardlist option:selected').length == 0) { alert('Select a Board'); document.getElementById('loading_bar').style.visibility='hidden';}
	else if ($('#startstop_pluginlist option:selected').length == 0) {alert('Select a Plugin'); document.getElementById('loading_bar').style.visibility='hidden';}
	//else if(plugin_parameters == "") {alert("On start, please add the parameters needed!"); document.getElementById('loading_bar').style.visibility='hidden';}
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
					document.getElementById("plugin_startstop-output").innerHTML = JSON.stringify(response.message);
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
		}
	}
});


$('#remove_plugins').click(function(){

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
						var plugin_id = variables[i][1];
						//var plugin_name = variables[i][1];

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
								document.getElementById("plugins_remove-output").innerHTML += JSON.stringify(response.message)+"<br />";
							},
							error: function(response){
								verify_token_expired(response.responseJSON.message, response.responseJSON.result);
								if(i==variables.length-1) document.getElementById('loading_bar').style.visibility='hidden';
								document.getElementById("plugins_remove-output").innerHTML += JSON.stringify(response.responseJSON.message)+"<br />";
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

	document.getElementById("plugin_remove-output").innerHTML ='';

	if (!$('#removeplugin_project').is(':checked') && $('#removeplugin_boardlist option:selected').length == 0) { alert('Select a Board');document.getElementById('loading_bar').style.visibility='hidden';}
	else if ($('#removeplugin_pluginlist option:selected').length == 0) {alert('Select a Plugin'); document.getElementById('loading_bar').style.visibility='hidden';}

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
					document.getElementById("plugin_remove-output").innerHTML = JSON.stringify(response.message);
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
		}
	}
});



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
