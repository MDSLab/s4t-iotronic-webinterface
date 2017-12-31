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

$('[data-reveal-id="modal-show-vfs"]').on('click',
	function() {
		$.ajax({
			url: s4t_api_url+"/vfs",
			type: "GET",
			dataType: 'json',
			headers: ajax_headers,

			success: function(response){
				create_table_from_json("show_vfs_table", response.message, null);
			},
			error: function(response){
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
			}
		});
	}
);

$('[data-reveal-id="modal-vfs-mount"]').on('click',
	function() {
		$('#vfs_mount-output').empty();
		update_boardsv2('mount_vfs_in_boardlist', 'C');
		update_boardsv2('mount_vfs_from_boardlist', 'C');
		update_boardlist('mount_vfs_in_boardlist', 'mount_vfs_from_boardlist');
	}
);


$('[data-reveal-id="modal-unmount-vfs"]').on('click',
	function(){
		$('#vfs_unmount-output').empty();
		update_boardsv2('unmount_vfs_in_boardlist', 'C');
		$('#unmount_table_section').hide();
	}
);


$('[data-reveal-id="modal-forcemount-vfs"]').on('click',
	function(){
		$('#vfs_forcemount-output').empty();
		update_boardsv2('forcemount_vfs_in_boardlist', 'C');
		update_boardsv2('forcemount_vfs_from_boardlist', 'C');
	}
);


$('[data-reveal-id="modal-board-vfs"]').on('click',
	function(){
		$('#show_boardvfs_section').hide();
		update_boardsv2('vfs_boardlist');
	}
);


$('[id="mount_vfs_in_boardlist"]').on('change',
	function() {
		update_boardlist('mount_vfs_in_boardlist', 'mount_vfs_from_boardlist');
	}
);


$('[id="unmount_vfs_in_boardlist"]').on('change',
	function() {
		var board_id = $("#unmount_vfs_in_boardlist option:selected").val();

		if(board_id == '--'){
			alert('Select a Board!');
			$('#unmount_table_section').hide();
		}
		else{
			var table_id = "unmount_vfs_tabledirs";
			$('#unmount_table_section').show();

			update_table_unmount(board_id, table_id);
		}
	}
);


function update_table_unmount(board_id, table_id){
	$.ajax({
		url: s4t_api_url+"/boards/"+board_id+"/vfs/",
		type: 'GET',
		dataType: 'json',
		headers: ajax_headers,
	
		success: function(response){
			create_table_from_json(table_id, response.message, null, "unmount");
		},
		error: function(response){
			verify_token_expired(response.responseJSON.message, response.responseJSON.result);
			//alert('ERROR: '+JSON.stringify(response));
		}
	});

}


$('[id="vfs_boardlist"]').on('change',
	function(){
		var show_board_vfs = document.getElementById("vfs_boardlist").value;
		if(show_board_vfs == "--"){
			alert("Select a board!");
			$("#show_boardvfs_section").hide();
			document.getElementById('loading_bar').style.visibility='hidden';
		}
		else{
			$("#show_boardvfs_section").show();

			$.ajax({
				url: s4t_api_url+"/boards/"+show_board_vfs+"/vfs",
				type: "GET",
				dataType: 'json',
				headers: ajax_headers,

				success: function(response){
					document.getElementById('loading_bar').style.visibility='hidden';
					if(response.message.length ==0){
						$("#show_boardvfs_table").html('<tr><td style="text-align:center">No vfs</td></tr>');
					}
					else{
						var fields_to_show = ["src_board", "src_path", "dst_path"];
						parsed_response = parse_json_fields(fields_to_show, response.message, false);

						//We need to add board label (src_label) for human readability
						//FROM
						//create_table_from_json("show_boardvfs_table", parsed_response, fields_to_show);

						//TO
						fields_to_show = ["src_label", "src_board", "src_path", "dst_path"];
						parsed_response.forEach(function(c){
							c["src_label"] = get_boardname_from_uuid(c["src_board"]); 
						});
						create_table_from_json("show_boardvfs_table", parsed_response, fields_to_show);
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




$('#mount_vfs').click(function(){

	document.getElementById("vfs_mount-output").innerHTML ='';

	var mount_in_board = document.getElementById("mount_vfs_in_boardlist").value;
	var path_in = document.getElementById("mount_vfs_in_path").value;

	var mount_from_board = document.getElementById("mount_vfs_from_boardlist").value;
	var path_from = document.getElementById("mount_vfs_from_path").value;

	if (path_in == "" || path_from == "") { alert('Write correct path(s)!'); document.getElementById('loading_bar').style.visibility='hidden'; }
	else if(mount_in_board == mount_from_board){
		if(path_in == path_from){
			alert('If same source and destination boards used....use different paths!');
			document.getElementById('loading_bar').style.visibility='hidden';
		}
	}
	else{
		data = {};
		data.src_board = mount_from_board;
		data.src_path = path_from;
		data.dst_path = path_in;

		$.ajax({
			url: s4t_api_url+"/boards/"+mount_in_board+"/vfs/mount",
			type: 'POST',
			dataType: 'json',
			headers: ajax_headers,
			data: JSON.stringify(data),

			success: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				document.getElementById("vfs_mount-output").innerHTML = JSON.stringify(response.message);
			},
			error: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
				document.getElementById("vfs_mount-output").innerHTML = JSON.stringify(response.responseJSON.message);
			}
		});
	}
});



$('#unmount_vfs').click(function(){
	var mount_in_board = document.getElementById("unmount_vfs_in_boardlist").value;

	document.getElementById("vfs_unmount-output").innerHTML ='';

	if(mount_in_board == "--") { alert("Select a board!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else{

		return_array = get_selected_rows_from_table("unmount_vfs_tabledirs", "unmount");

		headers = return_array[0];
		variables = return_array[1];

		if(variables.length == 0){
			alert('No mount point(s) to unmount are selected!');
			document.getElementById('loading_bar').style.visibility='hidden';
		}
		else{
			for(var i=0; i< variables.length; i++){
				//---------------------------------------------------------------------------------
				(function(i){
					setTimeout(function(){
						//---------------------------------------------------------------------------------

						var data = {};
						for(j=0;j<headers.length;j++)
							data[headers[j]] = variables[i][j];

						$.ajax({
							url: s4t_api_url+"/boards/"+mount_in_board+"/vfs/unmount",
							type: "POST",
							dataType: 'json',
							headers: ajax_headers,
							data: JSON.stringify(data),

							success: function(response){
								if(i==variables.length-1) {
									update_table_unmount(mount_in_board, "unmount_vfs_tabledirs");
									document.getElementById('loading_bar').style.visibility='hidden';
								}
								document.getElementById("vfs_unmount-output").innerHTML += JSON.stringify(response.message);
							},
							error: function(response){
								verify_token_expired(response.responseJSON.message, response.responseJSON.result);
								if(i==variables.length-1) document.getElementById('loading_bar').style.visibility='hidden';
								document.getElementById("vfs_unmount-output").innerHTML += JSON.stringify(response.responseJSON.message)+"<br />";
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



$('#forcemount_vfs').click(function(){
	var mount_in_board = document.getElementById("forcemount_vfs_in_boardlist").value;
	var path_in = document.getElementById("forcemount_vfs_in_path").value;

	var mount_from_board = document.getElementById("forcemount_vfs_from_boardlist").value;
	var path_from = document.getElementById("forcemount_vfs_from_path").value;

	document.getElementById("vfs_forcemount-output").innerHTML = "";

	if (path_in == "" || path_from == "") { alert('Write correct path(s)!'); document.getElementById('loading_bar').style.visibility='hidden'; }
	else if(mount_in_board == mount_from_board){
		if(path_in == path_from){
			alert('If same source and destination boards used...use different paths!');
			document.getElementById('loading_bar').style.visibility='hidden';
		}
	}
	else{
		data = {};
		data.src_board = mount_from_board;
		data.src_path = path_from;
		data.dst_path = path_in;

		$.ajax({
			url: s4t_api_url+"/boards/"+mount_in_board+"/vfs/force-mount",
			type: 'POST',
			dataType: 'json',
			headers: ajax_headers,
			data: JSON.stringify(data),

			success: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				document.getElementById("vfs_forcemount-output").innerHTML = JSON.stringify(response.message);
			},
			error: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
				document.getElementById("vfs_forcemount-output").innerHTML = JSON.stringify(response.responseJSON.message);
			}
		});
	}
});

