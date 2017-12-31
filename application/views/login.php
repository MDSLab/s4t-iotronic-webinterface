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


<? $message = $this -> session -> flashdata('message'); ?>
<? $success = $this -> session -> flashdata('success'); ?>

<center>
	<div class="main-fieldset login-fieldset">
		<div class="blockstyle">
			<?= form_open('admin/web_ui'); ?>
				Username<input type="text" name="username" value="admin">
				Password<input type="password" name="password" value="">
				<center>
					<button class="button tiny radius">Login</button>
				</center>
			<?= form_close() ?>
		</div>

		<? if(isset($success) && $success == "ERROR") : ?>
		<div>
			<?= $message ?>
		</div>
		<? endif ?>
	</div>
</center>
