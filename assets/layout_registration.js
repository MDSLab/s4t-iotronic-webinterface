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

$('[data-reveal-id="modal-show-layouts"]').on('click',
	function() {
		$('#layouts_show-output').empty();

		var fields_to_show = ["id_layout", "manufacturer", "model", "layout", "image"];

		$.ajax({
			url: s4t_api_url+"/layouts",
			type: "GET",
			dataType: 'json',
			headers: ajax_headers,

			success: function(response){
				parsed_response = parse_json_fields(fields_to_show, response.message, false);
				create_table_from_json("show_layouts_table", parsed_response, fields_to_show);

				//parsed_response = parse_json_fields(fields_to_show, response.message, string_or_json);
				//document.getElementById("layouts_show-output").innerHTML = parsed_response;
			},
			error: function(response){
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
				//document.getElementById("layouts_show-output").innerHTML = '<pre>'+JSON.stringify(response.message,null,"\t")+'</pre>';
			}
		});
	}
);


function clean_layout_fields(form_name, flag_output){
	document.getElementById(form_name+"_model").value = '';
	document.getElementById(form_name+"_layout").value = '';
	document.getElementById(form_name+"_manufacturer").value = '';
	document.getElementById(form_name+"_image").value = '';

	if(flag_output)
		document.getElementById(form_name+"-output").innerHTML ='';
}



$('[data-reveal-id="modal-create-layout"]').on('click',
	function() {
		clean_layout_fields("layout_create", true);
	}
);


$('[data-reveal-id="modal-update-layout"]').on('click',
	function(){
		clean_layout_fields("layout_update", true);
		update_layouts("update_layoutlist", "layout_update-output");
	}
);



$('[data-reveal-id="modal-delete-layout"]').on('click',
	function() {
		update_layouts("unregister_layoutlist", "layout_delete-output");
	}
);


$('[id="update_layoutlist"]').on('change',
	function() {

		var layout_id = $( "#update_layoutlist option:selected" ).val();

		if(layout_id == "--"){
			clean_layout_fields("layout_update");
		}
		else{
			$.ajax({
				url: s4t_api_url+"/layouts/"+layout_id,
				type: 'GET',
				dataType: 'json',
				headers: ajax_headers,

				success: function(response){
					document.getElementById("layout_update_model").value = response.message.model;
					document.getElementById("layout_update_layout").value = response.message.layout;
					document.getElementById("layout_update_manufacturer").value = response.message.manufacturer;
					document.getElementById("layout_update_image").value = response.message.image;
				},
				error: function(response){
					verify_token_expired(response.responseJSON.message, response.responseJSON.result);
					//alert('ERROR: '+JSON.stringify(response));
				}
			});
		}
		document.getElementById("layout_update-output").innerHTML ='';
	}
);


$('[id="unregister_layoutlist"]').on('change',
	function(){
		$('#layout_delete-output').empty();
	}
);


function update_layouts(select_id, output_id, callback){
	$.ajax({
		url: s4t_api_url+"/layouts",
		type: "GET",
		dataType: 'json',
		headers: ajax_headers,

		success: function(response){
			$('#'+select_id).empty();
			if(output_id && output_id !="")	$('#'+output_id).empty();

			$('#'+select_id).append('<option title="--" value="--" data-unit="">--</option>');

			layouts_list = response.message.sort(SortByModel);

			for(i=0;i<layouts_list.length;i++){
				$('#'+select_id).append('<option title="'+layouts_list[i].manufacturer+'" value="'+layouts_list[i].id_layout+'" data-unit="">'+layouts_list[i].model+' [ '+layouts_list[i].image+' ]</option>');

				if(i==layouts_list.length-1)
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


$('#create-layout').click(function(){

	data = {};

	var model = document.getElementById("layout_create_model").value;
	var layout = document.getElementById("layout_create_layout").value;
	var manufacturer = document.getElementById("layout_create_manufacturer").value;

	if(model == "") {alert('Insert a model!');document.getElementById('loading_bar').style.visibility='hidden';}
	else if(layout == "") {alert('Insert a layout!');document.getElementById('loading_bar').style.visibility='hidden';}
	else if(manufacturer == "") {alert('Insert a manufacturer!');document.getElementById('loading_bar').style.visibility='hidden';}
	else{
		data.model = model;
		data.layout = layout;
		data.manufacturer = manufacturer;
		data.image = document.getElementById("layout_create_image").value;

		$.ajax({
			url: s4t_api_url+"/layouts",
			type: 'POST',
			dataType: 'json',
			headers: ajax_headers,
			data: JSON.stringify(data),

			success: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				document.getElementById("layout_create-output").innerHTML = JSON.stringify(response.message);
				//update_layouts("unregister_layoutlist", "layout_delete-output");
				refresh_lists();
			},
			error: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
				document.getElementById("layout_create-output").innerHTML = JSON.stringify(response.responseJSON.message);
			}
		});
	}
});



$('#update-layout').click(function(){

	data = {};

	var layout_id = document.getElementById("update_layoutlist").value;
	var model = document.getElementById("layout_update_model").value;
	var layout = document.getElementById("layout_update_layout").value;
	var manufacturer = document.getElementById("layout_update_manufacturer").value;

	if(layout_id == "--"){alert('Select a Layout'); document.getElementById('loading_bar').style.visibility='hidden';}
	else if(model == "") {alert('Insert a model!');document.getElementById('loading_bar').style.visibility='hidden';}
	else if(layout == "") {alert('Insert a layout!');document.getElementById('loading_bar').style.visibility='hidden';}
	else if(manufacturer == "") {alert('Insert a manufacturer!');document.getElementById('loading_bar').style.visibility='hidden';}
	else{
		data.model = model;
		data.layout = layout;
		data.manufacturer = manufacturer;
		data.image = document.getElementById("layout_update_image").value;

		document.getElementById("layout_update-output").innerHTML ='';

		$.ajax({
			url: s4t_api_url+"/layouts/"+layout_id,
			type: 'PATCH',
			dataType: 'json',
			headers: ajax_headers,
			data: JSON.stringify(data),

			success: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				document.getElementById("layout_update-output").innerHTML = JSON.stringify(response.message);
				update_layouts("update_layoutlist");
				clean_layout_fields("layout_update");
				refresh_lists();
			},
			error: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
				document.getElementById("layout_update-output").innerHTML = JSON.stringify(response.responseJSON.message);
			}
		});
	}
});


$("#unregister-layout").click(function(){

	data = {};

	var layout_id = document.getElementById("unregister_layoutlist").value;

	if (layout_id == "--") {
		alert('Select at least a Layout');
		document.getElementById('loading_bar').style.visibility='hidden';
		document.getElementById("layout_delete-output").innerHTML = "";
	}
	else{
		$.ajax({
			url: s4t_api_url+"/layouts/"+layout_id,
			type: 'DELETE',
			dataType: 'json',
			headers: ajax_headers,
			data: JSON.stringify(data),

			success: function(response){
				update_layouts("unregister_layoutlist");
				document.getElementById('loading_bar').style.visibility='hidden';
				document.getElementById("layout_delete-output").innerHTML = JSON.stringify(response.message);
				refresh_lists();
			},
			error: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
				document.getElementById("layout_delete-output").innerHTML = JSON.stringify(response.responseJSON.message);
			}
		});
	}
});
