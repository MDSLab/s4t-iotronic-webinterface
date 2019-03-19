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

<!-- Introduced these variables here because we added the login function in iotronic.js -->
<? echo '<script src="'.$this -> config -> site_url().'assets/iotronic.js"></script>'; ?>
<script>
	site_url = "<?= $this -> config -> site_url()?>";
	s4t_api_url = "<?= $this -> config -> item('s4t_api_url') ?>";
	<?php echo 'var default_project = "'.$this -> config -> item('default_project').'";'; ?>
</script>



<? $message = $this -> session -> flashdata('message'); ?>
<? $success = $this -> session -> flashdata('success'); ?>

<center>
	<div class="main-fieldset login-fieldset">
		<div class="blockstyle">
			<div style="float: left; width: 50%; text-align: center">
				<a href="http://smartme.io/it/" target="_blank">
					<img src="<?= $this -> config -> site_url() ?>uploads/smartmeio_name.png" width="70%" height="70%">
				</a>
			</div>
			<div style="float: right; width: 49%;">
				Username<input type="text" id="username" name="username" value="admin">
				Password<input type="password" id="password" name="password" value="">
				<button class="custom_button" style="float: none" onclick="login();">Login</button>
			</div>
		</div>
		<? if(isset($success) && $success == "ERROR") : ?>
		<div>
			<?= $message ?>
		</div>
		<? endif ?>
	</div>
</center>
