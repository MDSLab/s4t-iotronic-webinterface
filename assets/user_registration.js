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

$('[data-reveal-id="modal-show-users"]').on('click',
	function() {
		//$('#users_show-output').empty();

		var fields_to_show = ["username", "email", "first_name", "last_name", "uuid"];

		$.ajax({
			url: s4t_api_url+"/users",
			type: "GET",
			dataType: 'json',
			headers: ajax_headers,

			success: function(response){
				response.message = response.message.sort(SortByUsername);
				parsed_response = parse_json_fields(fields_to_show, response.message, false);
				create_table_from_json("show_users_table", parsed_response, fields_to_show);
				//document.getElementById("users_show-output").innerHTML = parsed_response;
			},
			error: function(response){
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
				//document.getElementById("users_show-output").innerHTML = JSON.stringify(response.responseJSON.message);
			}
		});
	}
);


function clean_user_fields(form_name, flag_output){
	document.getElementById(form_name+"_username").value = '';
	document.getElementById(form_name+"_password").value = '';
	document.getElementById(form_name+"_verify_password").value = '';
	document.getElementById(form_name+"_email").value = '';
	document.getElementById(form_name+"_fname").value = '';
	document.getElementById(form_name+"_lname").value = '';

	if(flag_output)
		document.getElementById(form_name+"-output").innerHTML ='';
}


$('[data-reveal-id="modal-create-user"]').on('click',
	function() {
		clean_user_fields("user_create", true);
		$('.msg').hide();
		$('#create-user').show();
	}
);


$('[data-reveal-id="modal-update-user"]').on('click',
	function(){
		//$('#user-update-output').empty();
		update_users("update_userlist", "user_update-output");
		$('.msg').hide();
		$('#update-user').show();
	}
);


$('[data-reveal-id="modal-delete-user"]').on('click',
	function() {
		//$('#user-delete-output').empty();
		update_users("unregister_userlist", "user_delete-output");
	}
);


$('[id="update_userlist"]').on('change',
	function() {

		var user_id = $( "#update_userlist option:selected" ).val();

		if(user_id == "--"){
			clean_user_fields("user_update", true);
		}
		else{
			$.ajax({
				url: s4t_api_url+"/users/"+user_id,
				type: 'GET',
				dataType: 'json',
				headers: ajax_headers,

				success: function(response){

					document.getElementById("user_update_username").value = response.message.username;
					document.getElementById("user_update_password").value = "";
					document.getElementById("user_update_email").value = response.message.email;
					document.getElementById("user_update_fname").value = response.message.first_name;
					document.getElementById("user_update_lname").value = response.message.last_name;
				},
				error: function(response){
					verify_token_expired(response.responseJSON.message, response.responseJSON.result);
					//alert('ERROR: '+JSON.stringify(response.message));
				}
			});
		}
		document.getElementById("user_update-output").innerHTML ='';
	}
);


function update_users(select_id, output_id, callback){
	$.ajax({
		url: s4t_api_url+"/users",
		type: "GET",
		dataType: 'json',
		headers: ajax_headers,

		success: function(response){
			$('#'+select_id).empty();
			if(output_id && output_id !="")	$('#'+output_id).empty();

			$('#'+select_id).append('<option title="--" value="--" data-unit="">--</option>');

			users_list = response.message.sort(SortByUsername);

			for(i=0;i<users_list.length;i++){
				$('#'+select_id).append('<option title="'+users_list[i].username+'" value="'+users_list[i].uuid+'" data-unit="">'+users_list[i].username+'</option>');
				if(i==users_list.length-1)
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


$('#create-user').click(function(){

	data = {};

	var username = document.getElementById("user_create_username").value;

	var password = document.getElementById("user_create_password").value;
	var verify_password = document.getElementById("user_create_verify_password").value;

	var email = document.getElementById("user_create_email").value;


	if(password != verify_password) { alert("The two passwords are different!"); document.getElementById('loading_bar').style.visibility='hidden'; }
	else if(username == "") { alert("Insert a username!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else if(password == "") { alert("Specify a password!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else if(email == "") { alert("Insert a valid email!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else{
		data.username = username;
		data.password = password;
		data.email = email;
		data.f_name = document.getElementById("user_create_fname").value;
		data.l_name = document.getElementById("user_create_lname").value;

		$.ajax({
			url: s4t_api_url+"/users",
			type: 'POST',
			dataType: 'json',
			headers: ajax_headers,
			data: JSON.stringify(data),

			success: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				document.getElementById("user_create-output").innerHTML = JSON.stringify(response.message);
				refresh_lists();
			},
			error: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
				document.getElementById("user_create-output").innerHTML = JSON.stringify(response.responseJSON.message);
			}
		});
	}
});



$('#update-user').click(function(){

	data = {};

	var user_id = document.getElementById("update_userlist").value;
	var username = document.getElementById("user_update_username").value;
	var email = document.getElementById("user_update_email").value;

	if(user_id == "--"){ alert('Select a User'); document.getElementById('loading_bar').style.visibility='hidden';}
	else if(username == "") { alert("Insert a username!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else if(email == "") { alert("Insert a valid email!"); document.getElementById('loading_bar').style.visibility='hidden';}

	else{
		data.username = username;
		password = document.getElementById("user_update_password").value;
		verify_password = document.getElementById("user_update_verify_password").value;

		if(password != verify_password){
			alert("The two passwords are different!");
			document.getElementById("user_update-output").innerHTML ='';
			document.getElementById('loading_bar').style.visibility='hidden';
		}
		else{
			if(password != "")
				data.password = password;

			data.email = email;
			data.f_name = document.getElementById("user_update_fname").value;
			data.l_name = document.getElementById("user_update_lname").value;

			document.getElementById("user_update-output").innerHTML ='';

			$.ajax({
				url: s4t_api_url+"/users/"+user_id,
				type: 'PATCH',
				dataType: 'json',
				headers: ajax_headers,
				data: JSON.stringify(data),

				success: function(response){
					document.getElementById('loading_bar').style.visibility='hidden';
					document.getElementById("user_update-output").innerHTML = JSON.stringify(response.message);
					update_users("update_userlist");
					clean_user_fields("user_update");
					refresh_lists();
				},
				error: function(response){
					document.getElementById('loading_bar').style.visibility='hidden';
					verify_token_expired(response.responseJSON.message, response.responseJSON.result);
					document.getElementById("user_update-output").innerHTML = JSON.stringify(response.responseJSON.message);
				}
			});
		}
	}
});



$("#unregister-user").click(function(){
	var user_id = document.getElementById("unregister_userlist").value;

	if (user_id == "--") {
		alert('Select at least a User');
		document.getElementById('loading_bar').style.visibility='hidden';
		document.getElementById("user_delete-output").innerHTML = "";
	}
	else{
		$.ajax({
			url: s4t_api_url+"/users/"+user_id,
			type: 'DELETE',
			dataType: 'json',
			headers: ajax_headers,

			success: function(response){
				update_users("unregister_userlist");
				document.getElementById('loading_bar').style.visibility='hidden';
				document.getElementById("user_delete-output").innerHTML = JSON.stringify(response.message);
				refresh_lists();
			},
			error: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
				document.getElementById("user_delete-output").innerHTML = JSON.stringify(response.responseJSON.message);
			}
		});
	}
});
