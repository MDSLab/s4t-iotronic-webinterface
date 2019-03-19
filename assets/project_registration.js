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

function get_projects_list(flag){
	var fields_to_show = ["name", "uuid"];

	var project_id = getCookie("selected_prj");

	$.ajax({
		url: s4t_api_url+"/projects",
		type: "GET",
		dataType: 'json',
		headers: ajax_headers,
		success: function(response){
			parsed_response = parse_json_fields(fields_to_show, response.message, false).sort(SortByName);
			//console.log(parsed_response);

			prjs = parsed_response;

			var default_prj_id = null;
			$("#select_project").empty();
			for(var i=0; i<prjs.length; i++){
				$("#select_project").append('<option value="'+prjs[i].uuid+'">'+prjs[i].name+'</option>');

				//console.log(project_id);
				if(project_id == undefined || flag){
					if(prjs[i].name == default_project){
						default_prj_id = prjs[i].uuid;
					}
				}
			}

			//Adding the ALL option to show all the boards in all the project
			$("#select_project").append('<option value="all">ALL</option>');

			
			//console.log(default_prj_id);
			if(project_id == undefined || flag){
				document.cookie = "selected_prj="+default_prj_id;
				$("#select_project").val(default_prj_id);
			}
			else{
				$("#select_project").val(project_id);
			}

			document.cookie = "projects_list="+JSON.stringify(parsed_response);
			//document.cookie = "bla=ff";

			refresh_lists();
		},
		error: function(response){
			verify_token_expired(response.responseJSON.message, response.responseJSON.result);
		}
	});
}

function get_project_name_by_uuid(project_id){
	var prj_name = "";
	projects_list = JSON.parse(getCookie("projects_list"));

	for(i=0;i<projects_list.length;i++){
		if(projects_list[i].uuid == project_id){
			prj_name = projects_list[i].name
			break
		}
	}
	return prj_name;
}

$('[id="select_project"]').on('change',
	function() {
		var project_id = $( "#select_project option:selected" ).val();
		//console.log(project_id);
		document.cookie = "selected_prj="+project_id;
		refresh_lists();
	}
);

$('[data-reveal-id="modal-show-projects"]').on('click',
	function() {

		var fields_to_show = ["name", "description", "uuid"];

		$.ajax({
			url: s4t_api_url+"/projects",
			type: "GET",
			dataType: 'json',
			headers: ajax_headers,

			success: function(response){
				parsed_response = parse_json_fields(fields_to_show, response.message, false).sort(SortByName);
				create_table_from_json("show_projects_table", parsed_response, fields_to_show);
			},
			error: function(response){
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
			}
		});
	}
);


function clean_project_fields(form_name, flag_output){
	document.getElementById(form_name+"_projectname").value = '';
	document.getElementById(form_name+"_description").value = '';

	if(flag_output)
		document.getElementById(form_name+"-output").innerHTML ='';
}


$('[data-reveal-id="modal-create-project"]').on('click',
	function() {
		clean_project_fields("project_create", true);
	}
);


$('[data-reveal-id="modal-update-project"]').on('click',
	function(){
		clean_project_fields("project_update", true);
		update_projects("update_projectlist", "project_update-output");
	}
);


$('[data-reveal-id="modal-delete-project"]').on('click',
	function() {
		update_projects("unregister_projectlist", "project_delete-output");
	}
);


$('[id="update_projectlist"]').on('change',
	function() {

		var project_id = $( "#update_projectlist option:selected" ).val();

		if(project_id == "--"){
			clean_project_fields("project_update");
		}
		else{
			$.ajax({
				url: s4t_api_url+"/projects/"+project_id,
				type: 'GET',
				dataType: 'json',
				headers: ajax_headers,
				success: function(response){
					document.getElementById("project_update_projectname").value = response.message.name;
					document.getElementById("project_update_description").value = response.message.description;
				},
				error: function(response){
					verify_token_expired(response.responseJSON.message, response.responseJSON.result);
					//alert('ERROR: '+JSON.stringify(response));
				}
			});
		}
		document.getElementById("project_update-output").innerHTML ='';
	}
);


function update_projects(select_id, output_id, callback){
	$.ajax({
		url: s4t_api_url+"/projects",
		type: "GET",
		dataType: 'json',
		headers: ajax_headers,

		success: function(response){
			$('#'+select_id).empty();
			if(output_id && output_id !="")	$('#'+output_id).empty();

			$('#'+select_id).append('<option title="--" value="--" data-unit="">--</option>');

			projects_list = response.message.sort(SortByName);

			for(i=0;i<projects_list.length;i++){
				$('#'+select_id).append('<option title="'+projects_list[i].name+'" value="'+projects_list[i].uuid+'" data-unit="">'+projects_list[i].name+'</option>');
				if(i==projects_list.length-1)
					if(callback) callback("OK");
			}

			//if(callback) callback("OK");
		},
		error: function(response){
			verify_token_expired(response.responseJSON.message, response.responseJSON.result);
			//document.getElementById("#"+output_id).innerHTML = '<pre>'+JSON.stringify(response.message,null,"\t")+'</pre>';
			if(callback) callback("OK");
		}
	});
}



$('#create-project').click(function(){

	loading_to_fix(); //TO BE FIXED !!!

	data = {};

	var name = document.getElementById("project_create_projectname").value;

	if(name == "") { alert("Insert a name!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else{
		data.name = name;
		data.description = document.getElementById("project_create_description").value;

		$.ajax({
			url: s4t_api_url+"/projects",
			type: 'POST',
			dataType: 'json',
			headers: ajax_headers,
			data: JSON.stringify(data),

			success: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				//document.getElementById("project_create-output").innerHTML = '<pre>'+JSON.stringify(response.message) +'</pre>';
				document.getElementById("project_create-output").innerHTML = JSON.stringify(response.message);
				//update_projects("unregister_projectlist", "project_delete-output");
				//refresh_lists();
				get_projects_list();
			},
			error: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
				document.getElementById("project_create-output").innerHTML = JSON.stringify(response.responseJSON.message);
			}
		});
	}
});



$('#update-project').click(function(){

	loading_to_fix(); //TO BE FIXED !!!

	data = {};

	var name = document.getElementById("project_update_projectname").value;
	var project_id = document.getElementById("update_projectlist").value;

	if(project_id == "--"){alert('Select a Project');document.getElementById('loading_bar').style.visibility='hidden';}
	else if(name == "") {alert('Insert a name');document.getElementById('loading_bar').style.visibility='hidden';}
	else{
		data.name = name;
		data.description = document.getElementById("project_update_description").value;

		document.getElementById("project_update-output").innerHTML ='';

		$.ajax({
			url: s4t_api_url+"/projects/"+project_id,
			type: 'PATCH',
			dataType: 'json',
			headers: ajax_headers,
			data: JSON.stringify(data),

			success: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				document.getElementById("project_update-output").innerHTML = JSON.stringify(response.message);
				update_projects("update_projectlist");
				clean_project_fields("project_update");
				//refresh_lists();
				get_projects_list();
			},
			error: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
				document.getElementById("project_update-output").innerHTML = JSON.stringify(response.responseJSON.message);
			}
		});
	}
});



$("#unregister-project").click(function(){

	loading_to_fix(); //TO BE FIXED !!!

	var project_id = document.getElementById("unregister_projectlist").value;

	if (project_id == "--") {
		alert('Select at least a Project');
		document.getElementById('loading_bar').style.visibility='hidden';
		document.getElementById("project_delete-output").innerHTML = "";
	}
	else{
		$.ajax({
			url: s4t_api_url+"/projects/"+project_id,
			type: 'DELETE',
			dataType: 'json',
			headers: ajax_headers,

			success: function(response){
				update_projects("unregister_projectlist");
				document.getElementById('loading_bar').style.visibility='hidden';
				document.getElementById("project_delete-output").innerHTML = JSON.stringify(response.message);
				//refresh_lists();
				get_projects_list(true);
			},
			error: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
				document.getElementById("project_delete-output").innerHTML = JSON.stringify(response.responseJSON.message);
			}
		});
	}
});
