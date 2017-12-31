<!--
Copyright 2017-2018 Carmelo Romeo (caromeo@unime.it)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

<center>
	<div class="main-fieldset login-fieldset">
		<div class="blockstyle">
			Username<input type="text" id="username" value="admin">
			Password<input type="text" id="password" value="">
			<center>
				<button class="button tiny radius" onclick="login();">Submit</button>
			</center>
		</div>
	</div>
</center>





<script>
function login(){

	/*
	var bla = "xxxx";
	<?
		$a = "xxx"; 
		$this -> session -> set_userdata('some_name', $a); 
	?>
	var x = "<?= $this -> session -> userdata('some_name'); ?>";
	console.log(x);
	*/


	testing_cookie = true;

	username = document.getElementById("username").value;
	password = document.getElementById("password").value;

	if(username == "") alert('Missing username');
	else if(password == "") alert('Missing password');
	else{
		$.ajax({
			url: '<?= $this -> config -> item('s4t_api_url') ?>/v1/auth',
			type: 'POST',
			data: {username: username, password: password},
			success: function(response){

				expiring_date = new Date();
				expiring_date.setSeconds(expiring_date.getSeconds()+ response.message.expire);

				document.cookie = "token="+response.message.token+"; expires="+expiring_date.toUTCString();

				if(testing_cookie){
					test = new Date();
					test.setSeconds(test.getSeconds()+10);

					document.cookie = "user="+username+"; expires="+test.toUTCString();
				}
				else
					document.cookie = "user="+username;


				window.location.href = "<?= $this -> config -> site_url()?>Admin";
			},
			error: function(response){
				alert('ERROR: '+JSON.stringify(response.responseJSON.message.log));
			}
		});
	}
}


window.onload = function() {
	var expired = new Date();
	expired.setDate(expired.getDate()-1);

	document.cookie.split(";").forEach(function(c) {
		name = c.split("=")[0];
		document.cookie = name +"=;expires="+expired.toUTCString();
	});
}
</script>
