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

function uuid(){
	return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function generate_uuid(input_id){
	var id = (uuid() + uuid() + "-" + uuid() + "-" + uuid() + "-" + uuid() + "-" + uuid() + uuid() + uuid());//.toUpperCase();
	//$('#registration_name').val(id);
	$('#'+input_id).val(id);
}

$('input[name="email"]').blur(function () {
	//console.log("BLUR");
	var email = $(this).val();

	//How to get closest button starting from the actual modal
	var modal = $(this).closest('.reveal-modal');
	var button = $('div[id="'+modal[0].id+'"] button:first');
	var button_id = button[0].id;
	//console.log(button_id);
	
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;
	if (re.test(email)) {
		$('.msg').hide();
		$('.success').show();
		$('#'+button_id).show();
	}
	else {
		$('.msg').hide();
		$('.error').show();
		$('#'+button_id).hide();
	}
});


function GetCallback(data) { return data; }


function SortByLabel(x,y) {
	return ((x.label == y.label) ? 0 : ((x.label > y.label) ? 1 : -1 ));
}

function SortByStatus(x,y) {
	return ((x.status == y.status) ? 0 : ((x.status > y.status) ? 1 : -1 ));
}

function SortByModel(x,y) {
	return ((x.model == y.model) ? 0 : ((x.model > y.model) ? 1 : -1 ));
}

function SortByUsername(x,y) {
	return ((x.username == y.username) ? 0 : ((x.username > y.username) ? 1 : -1 ));
}

function SortByName(x,y) {
	return ((x.name == y.name) ? 0 : ((x.name > y.name) ? 1 : -1 ));
}

function SortByType(x,y) {
	return ((x.type == y.type) ? 0 : ((x.type > y.type) ? 1 : -1 ));
}

function SortByVlanName(x,y) {
	return ((x.vlan_name == y.vlan_name) ? 0 : ((x.vlan_name > y.vlan_name) ? 1 : -1 ));
}

function SortByUsername(x,y) {
	return ((x.username == y.username) ? 0 : ((x.username > y.username) ? 1 : -1 ));
}

function round(value, decimals) {
	return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function loading(){
	var loader_pathfile = site_url+"uploads/ajax-loader.gif";
	//document.getElementById('loading_bar').style.visibility='visible';
	document.getElementById('loading_bar').style.width='100%';
	document.getElementById('loading_bar').style.height='100%';
	document.getElementById('loading_bar').style.position='fixed';//'absolute';//'fixed';
	document.getElementById('loading_bar').style.top='0';
	document.getElementById('loading_bar').style.left='0';
	document.getElementById('loading_bar').style.zIndex='9999';
	document.getElementById('loading_bar').style.background="url('"+loader_pathfile+"') no-repeat center center rgba(0,0,0,0.25)";
	//setTimeout(function(){document.getElementById('loading_bar').style.visibility='hidden';},3000);
}


//This function returns a string (or a json) with ONLY the selected fields from the entire message
function parse_json_fields(fields, message, string_or_json){

	if(string_or_json){
		var stringa = "";
		//console.log(message);
		if(message instanceof Array){
			message.forEach(function(c){
				Object.keys(c).forEach(function(k){
					if(fields.includes(k)){
						stringa += "<b>"+k+": </b>"+c[k]+"<br>";
					}
				});
				stringa += "<br>";
			});
			//console.log(stringa);
			return stringa;
		}
		else return message;
	}
	else{
		var json_output = [];

		if(message instanceof Array){
			message.forEach(function(c){
				elem = {};
				Object.keys(c).forEach(function(k){
					if(fields.includes(k)){
						elem[k] = c[k];
					}
				});
				json_output.push(elem);
			});
			//console.log(json_output);
			//return '<pre>'+JSON.stringify(json_output,null,"\t")+'</pre>';
			return json_output;
		}
		else return message;
	}
}


//Copy all options from a select to another except the one selected!
function update_boardlist(from, to){

	$("#"+to).html( $("#"+from).html() );
	var board_value = $( "#"+from+" option:selected" ).val();
	var remote_boardlist = document.getElementById(to);

	for (var i=0; i<remote_boardlist.length; i++){
		if (remote_boardlist.options[i].value == board_value ){
			remote_boardlist.remove(i);
		}
	}
}


//StartsWith !!!
if ( typeof String.prototype.startsWith != 'function' ) {
	String.prototype.startsWith = function( str ) {
		return this.substring( 0, str.length ) === str;
	}
};

//UpperCase first letter !!!
String.prototype.ucfirst = function(){
    return this.charAt(0).toUpperCase() + this.substr(1);
}


function logout(){
	$.ajax({
		url: site_url+'Login/logout',
		type: 'GET',
		//dataType: 'json',
		//contentType: 'application/json',
		success: function (response) {
			token_or_log = "";
			alert(response);
			window.location.href = site_url+"Login";
		},
		error: function (response) {
			console.log(response);
		}
	});
}


function verify_token_expired(rcv_message, rcv_result, flag){
	//OLD version: javascript based  (login.php)!!!
	/*
	//alert(document.cookie);

	var flag = false;
	var array_cookies = document.cookie.split("; ");
	for(i=0; i<array_cookies.length; i++){
		//console.log(array_cookies[i]);
		if(array_cookies[i].startsWith("token")){
			flag = true;
			break;
		}
	}

	if(flag== false){
		alert("Token has expired. Please login again.");
		window.location.href = "<?= $this -> config -> site_url()?>Login";
	}
	*/

	//First attempt!!!
	/*
	if(result == "ERROR"){
		alert(token_or_log);
		window.location.href = site_url+"Login";
	}
	*/

	//console.log(rcv_message+" "+rcv_result);
	if(rcv_result == "ERROR"){
		token_or_log = "";
		if(!flag){
			if(rcv_message == "Wrong Token: TokenExpiredError: jwt expired"){
				alert(rcv_message);
				window.location.href = site_url+"Login";
			}
		}
		else
			window.location.href = site_url+"Login";
	}

}

function readFile(evt) {
	//Retrieve the first (and only!) File from the FileList object
	var f = evt.target.files[0];

	if (f) {
		var r = new FileReader();
		r.onload = function(e) {
			var contents = e.target.result;
			//alert('contents: '+contents);
			//document.getElementById("create_driver_code").innerHTML = contents;
			document.getElementById(evt.target.element_id).innerHTML = contents;
		}
		r.readAsText(f);
	}
	else { alert("Failed to load file"); }
}



function get_boardname_from_uuid(uuid){
	board_name = "";
	for(i=0;i<boards_list.length;i++){
		if(boards_list[i].board_id == uuid){
			board_name = boards_list[i].label;
			break;
		}
	}
	return board_name;
}




function refresh_lists(){

	$.ajax({
		url: s4t_api_url+"/boards",
		type: 'GET',
		dataType: 'json',
		headers: ajax_headers,

		success: function(response){
			//$('#boardlist_c').empty();
			//$('#boardlist_d').empty();

			var connected_count = 0;
			var disconnected_count = 0;
			//console.log(response);


			boards_list = response.message.sort(SortByStatus);
			
			connected = [];
			disconnected = [];
			
			for(i=0;i<boards_list.length; i++){
				if(boards_list[i].status == "C")
					connected.push(boards_list[i]);
				else if(boards_list[i].status == "D")
					disconnected.push(boards_list[i]);
			}

			$('#boardlist_status').empty();
			
			connected = connected.sort(SortByLabel);
			disconnected = disconnected.sort(SortByLabel);

			document.getElementById("boards_status").innerHTML ='<font size="4"><b>Boards (<img src="'+site_url+'uploads/green-circle.png" width=20 height=20><span> '+connected.length+'</span> / <img src="'+site_url+'uploads/red-circle.png" width=20 height=20><span> '+disconnected.length+'</span>)</b></font><br /><br />';
			
			for(i=0;i<connected.length;i++){
				$('#boardlist_status').append('<li>' +
							//	'<a href="#" onclick=populate_board_info("'+connected[i].board_id+'"); data-reveal-id="modal-plugins_sensors-lists">'+
								'<a href="#" onclick=populate_board_info("'+connected[i].board_id+'"); data-reveal-id="modal-board-info">'+
								'<img src="'+site_url+'uploads/green-circle.png" width=20 height=20>'+
								'<span>'+connected[i].label+'</span>'+
							       '</li>');
			}
			for(j=0;j<disconnected.length;j++){
				$('#boardlist_status').append('<li>'+
							//	'<a href="#" onclick=populate_board_info("'+disconnected[j].board_id+'"); data-reveal-id="modal-plugins_sensors-lists">'+
								'<a href="#" onclick=populate_board_info("'+disconnected[j].board_id+'"); data-reveal-id="modal-board-info">'+
									'<img src="'+site_url+'uploads/red-circle.png" width=20 height=20>'+
									'<span>'+disconnected[j].label+'</span>'+
								'</a>'+
							      '</li>');
			}


			/*
			//OLD VERSION

			boards_list = response.message.sort(SortByLabel);

			for(var i=0; i<boards_list.length; i++){

				if(boards_list[i].status == "C"){
					$('#boardlist_c').append('<option title="'+boards_list[i].board_id+'" value="'+boards_list[i].board_id+'" data-unit="">'+boards_list[i].label+'</option>');
					connected_count += 1;
				}
				else if(boards_list[i].status == "D"){
					$('#boardlist_d').append('<option title="'+boards_list[i].board_id+'" value="'+boards_list[i].board_id+'" data-unit="">'+boards_list[i].label+'</option>');
					disconnected_count += 1;
				}
			}
			document.getElementById("count-connected").innerHTML ='<h4>Connected ( '+connected_count+' )</h4>';
			document.getElementById("count-disconnected").innerHTML ='<h4>Disconnected ( '+disconnected_count+' )</h4>';
			*/

			//Refresh markers on the map accordingly to what is retrieved from IoTronic !!!
			refresh_map();
		},
		error: function(response){
			//verify_token_expired(JSON.stringify(response.responseJSON.message));
			verify_token_expired(response.responseJSON.message, response.responseJSON.result, true);
		}
	});
}


function sensors_list(select_id, callback){
	$('#'+select_id).empty();
	$.ajax({
		//url: site_url+"Admin/get_sensors_list",
		url: s4t_api_url+"/sensors",
		type: 'GET',
		dataType: 'json',
		headers: ajax_headers,

		success: function(response){
			for(i=0; i<response.message.length; i++){
				$('#'+select_id).append('<input class="registration_sensorlist" type="checkbox" id="'+response.message[i].id+'">'+response.message[i].type+'</input><br>');

			}

			callback("OK");
		},
		error: function(response){
			//alert('ERROR: '+JSON.stringify(response));
			callback("OK");
		}
	});
}


function update_boardsv2(select_id, status, flag){
	$.ajax({
		url: s4t_api_url+"/boards",
		type: 'GET',
		dataType: 'json',
		headers: ajax_headers,

		success: function(response){
			//console.log(response);
			boards_list = response.message.sort(SortByLabel);

			$('#'+select_id).empty();
			if(!flag)
				$('#'+select_id).append('<option value="--">--</option>');

			for(var i=0; i<boards_list.length; i++){

				if( (status && boards_list[i].status == status) || !status){

					$('#'+select_id).append('<option title="'+boards_list[i].board_id+'" value="'+boards_list[i].board_id+'" data-unit="">'+boards_list[i].label+'</option>');
				}
			}
		},
		error: function(response){
			verify_token_expired(response.responseJSON.message, response.responseJSON.result);
			//console.log(response);
		}
	});
}


function create_table_from_json(table_id, obj, array, checkbox_name){
	var result = "";

	if( !(obj instanceof Array) || (obj instanceof Array && obj.length ==0) ){
		result = '<thead><tr><th>Empty</th></tr></thead>';
		result +='<tbody><tr><td>No entries</td></tr></tbody>';
	}
	else{
		var headers = null;
		var content = [];
		if(array instanceof Array)
			headers = array;
		else
			headers = Object.keys(obj[0]);

		for(i=0;i<obj.length;i++){
			var entry = [];
			for(j=0;j<headers.length;j++){
				entry.push(obj[i][headers[j]]);
			}
			content.push(entry);
		}

		var ths_start = "<thead><tr>";
		var ths_end = "</tr></thead>";

		//THEAD
		ths = "";
		if(checkbox_name)
			ths = "<th>"+checkbox_name+"</th>";


		for(i=0;i<headers.length;i++){
			ths += "<th>"+headers[i]+"</th>";
		}
		var thead = ths_start + ths + ths_end;

		var tbody_start = "<tbody>";
		var tbody_end = "</tbody>";

		//TBODY
		tbd = "";
		var line_count = 0;
		for(i=0;i<content.length;i++){
			tbd +="<tr>";

			if(checkbox_name){
				tbd += '<td>'+
					'<div class="switch round tiny" style="margin-bottom: 0px">'+
						'<input id="'+checkbox_name+line_count+'" type="checkbox" />'+
						'<label for="'+checkbox_name+line_count+'"></label>'+
					'</div>'+
				        '</td>';
			}

			for(j=0;j<content[i].length;j++){
				if(table_id != "show_vfs_table" && table_id != "unmount_vfs_tabledirs"){
					//Added to remove iotronic from fields to show in tables
					if(String(content[i][j]).startsWith(String(s4t_iotronic_folder)))
						content[i][j] = String(content[i][j]).replace(s4t_iotronic_folder, '');

					tbd += "<td>"+content[i][j]+"</td>";
				}
				else
					tbd += '<td style="word-wrap: break-word; max-width: 180px">'+content[i][j]+'</td>';
			}
			tbd += "</tr>";
			line_count++;
		}
		var tbody = tbody_start + tbd + tbody_end;

		result = thead + tbody;
	}
	$('#'+table_id).html(result);
}


function convert_arrayfields_into_boolean(json){
	var json_output = [];

	if(json instanceof Array){
		json.forEach(function(c){
			elem = {};
			Object.keys(c).forEach(function(k){
				if(k == "mobile" || k == "net_enabled" || k == "notify"){
					if(c[k] == 0)
						elem[k] = false;
					else if(c[k] == 1)
						elem[k] = true;
				}
				else
					elem[k] = c[k];
			});
			json_output.push(elem);
		});
	}
	return json_output;
}


function get_selected_rows_from_table(table_id, checkboxes_id_like){

	var table = $('[id="'+table_id+'"]');
	var checkboxes = $('[id^="'+checkboxes_id_like+'"]');
	
	var thead_fields = [];
	
	for(i=1;i<table[0].rows[0].cells.length;i++){
		//console.log(table[0].rows[0].cells[i].innerText);
		thead_fields.push(table[0].rows[0].cells[i].innerText);
	}
	
	var body_fields = [];
	
	for(i=0;i<checkboxes.length;i++){
		if ($('#'+checkboxes[i].id).is(':checked')){
	
			var row_fields = [];
	
			row = $('#'+checkboxes[i].id).closest('tr');
			//console.log(row[0].childElementCount);
	
			for(j=1;j<row[0].cells.length;j++){
				//console.log(row[0].cells[j].innerText);
				row_fields.push(row[0].cells[j].innerText);
			}
			body_fields.push(row_fields);
		}
	}

	var return_array = [];
	return_array.push(thead_fields);
	return_array.push(body_fields);

	return return_array;
}


//Refresh boards list on click at any modal and button
$('[data-reveal-id^="modal"]').on('click',
        function(){
		refresh_lists();
        }
);


$(':button').click(function(){
	loading();
	//refresh_lists();
});


//Start from here to manage the icon-bar menu on the right
$(".side-menu").on({mouseover:
	function(){
		var children_number = $(this).parent().find('li').length;
		var elem_offset = $(this).offset();
		var item_size_h = $("#menu ul li ul li").height();
		var item_size_w = $("#menu ul li ul li").width();
		/*
		console.log(children_number);
		console.log(elem_offset);
		console.log(item_size_h +" "+ item_size_w);
		console.log($(document).height()+" "+ $(window).height());
		//$('#menu ul li ul').css("margin-top", "70px");
		*/

		//40 is the footer height !!!
		if(elem_offset.top + children_number * item_size_h > $(window).height()-40){

			if(elem_offset.top > $(window).height()/2){
				offset = children_number * item_size_h;
				$('#menu ul li ul').css("margin-top", "-"+offset+"px");
			}
			else
				$('#menu ul li ul').css("margin-top", "-"+elem_offset.top+"px");
			
		}
		else
			$('#menu ul li ul').css("margin-top", "-70px");
	}
});
