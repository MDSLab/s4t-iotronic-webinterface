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

$('[data-reveal-id="modal-pinmode-gpio"]').on('click',
	function() {
		toggle_radio_pin_io();
		$('#gpio_pinmode-output').empty();
		update_boardsv2('gpio_pin_boardlist', 'C');
	}
);

$('[data-reveal-id="modal-readwrite-gpio"]').on('click',
	function() {
		toggle_radio_readwrite();
		toggle_radio_pin_ad();
		$('#gpio_readwrite-output').empty();
		update_boardsv2('gpio_readwrite_boardlist', 'C');
	}
);




$('#gpio_pin_mode').click(function(){

	var board_id = $( "#gpio_pin_boardlist option:selected" ).val();
	var pin = document.getElementById("gpio_pin").value;

	if(board_id == "--"){ alert("Select a Board!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else if(pin == "") { alert("Insert pin number!"); document.getElementById('loading_bar').style.visibility='hidden';}
	
	else{
		var io = "";
		if( $('#input_gpio').is(':checked') )		io="input";
		else if( $('#output_gpio').is(':checked') )	io="output";
	
		data = {};

		data.pin = pin;
		data.mode = io;

		$.ajax({
			url: s4t_api_url+"/boards/"+board_id+"/gpio/mode",
			type: 'POST',
			dataType: 'json',
			headers: ajax_headers,
			data: JSON.stringify(data),
	
			success: function (response) {
				document.getElementById('loading_bar').style.visibility='hidden';
				document.getElementById("gpio_pinmode-output").innerHTML = JSON.stringify(response.message);
			},
			error: function (response) {
				document.getElementById('loading_bar').style.visibility='hidden';
				verify_token_expired(response.responseJSON.message, response.responseJSON.result);
				document.getElementById("gpio_pinmode-output").innerHTML = JSON.stringify(response.responseJSON.message);
			}
		});
	}
});


$('#gpio_action').click(function(){

	var board_id = $( "#gpio_readwrite_boardlist option:selected" ).val();
	var pin = document.getElementById("gpio_readwrite_pin").value;

	if(board_id == "--"){ alert("Select a Board!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else if(pin == ""){ alert("Insert pin number!"); document.getElementById('loading_bar').style.visibility='hidden';}
	else{
		var rw = "";
		if( $('#read_gpio').is(':checked') )           rw="read";
		else if( $('#write_gpio').is(':checked') )     rw="write";

		var ad = "";
		if( $('#analog_gpio').is(':checked') )           ad="analog";
		else if( $('#digital_gpio').is(':checked') )     ad="digital";

		url = "";

		if(rw=="read"){

			$.ajax({
				url: s4t_api_url+"/boards/"+board_id+"/gpio/"+ad+"/read?pin="+pin,
				type: "GET",
				dataType: 'json',
				headers: ajax_headers,
			
				success: function (response) {
					document.getElementById('loading_bar').style.visibility='hidden';
					document.getElementById("gpio_readwrite-output").innerHTML = JSON.stringify(response.message);
				},
				error: function (response) {
					document.getElementById('loading_bar').style.visibility='hidden';
					verify_token_expired(response.responseJSON.message, response.responseJSON.result);
					document.getElementById("gpio_readwrite-output").innerHTML = JSON.stringify(response.responseJSON.message);
				}
			});
		}

		else if (rw=="write"){

			var value = document.getElementById("gpio_readwrite_value").value;
			if(value == ""){ alert("Insert value to write!"); document.getElementById('loading_bar').style.visibility='hidden';}
			else{

				data = {};
				data.pin = pin;
				data.value = value;
	
				$.ajax({
					url: s4t_api_url+"/boards/"+board_id+"/gpio/"+ad+"/write",
					type: "POST",
					dataType: 'json',
					headers: ajax_headers,
					data: JSON.stringify(data),
	
					success: function (response) {
						document.getElementById('loading_bar').style.visibility='hidden';
						document.getElementById("gpio_readwrite-output").innerHTML = JSON.stringify(response.message);
					},
					error: function (response) {
						document.getElementById('loading_bar').style.visibility='hidden';
						verify_token_expired(response.responseJSON.message, response.responseJSON.result);
						document.getElementById("gpio_readwrite-output").innerHTML = JSON.stringify(response.responseJSON.message);
					}
				});
			}
		}
	}
});


function toggle_radio_pin_io(val){
	if ( val && (val.id == 'output_gpio') ){
		$('#input_gpio').removeAttr('checked');
	}
	else {
		$('#output_gpio').removeAttr('checked');
		if(!val)
			$('#input_gpio').prop('checked', true);
	}
}


function toggle_radio_readwrite(val){
	if ( val && (val.id == 'write_gpio') ){
		$('#read_gpio').removeAttr('checked');
		$('#gpio_readwrite_value_div').show();
	}
	else {
		$('#write_gpio').removeAttr('checked');
		$('#gpio_readwrite_value_div').hide();
		if(!val)
			$('#read_gpio').prop('checked', true);
	}
}

function toggle_radio_pin_ad(val){
	if ( val && (val.id == 'digital_gpio') ){
		$('#analog_gpio').removeAttr('checked');
	}
	else {
		$('#digital_gpio').removeAttr('checked');
		if(!val)
			$('#analog_gpio').prop('checked', true);
	}
}
