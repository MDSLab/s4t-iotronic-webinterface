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

<!-- Modal size class: tiny (30%), small (50%), large (90%), full (100%) wide -->

<div id="modal-show-users" class="reveal-modal" data-reveal>
	<section>
		<h3>Users</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<table id="show_users_table" style="width: 100%"></table>
	</section>
</div>



<div id="modal-create-user" class="reveal-modal small" data-reveal>
	<section>
		<h3>Add new User to the Cloud</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<label>Username</label>
			<input id="user_create_username" type="text" placeholder="Username" value="" />

			<label>Password</label>
			<input id="user_create_password" type="text" placeholder="Password" value="" />

			<label for="user_create_email">Email (example: paolo.rossi@gmail.com)</label>
			<input type="email" name="email" id="user_create_email" placeholder="Email">
			<span data-alert class="alert-box error round msg">
				Not a valid email address
				<!--<a href="#" class="close">&times;</a> -->
			</span>
			<span data-alert class="alert-box success round msg">
				Valid email!
				<!--<a href="#" class="close">&times;</a>-->
			</span>

			<label>First Name</label>
			<input id="user_create_fname" type="text" placeholder="First Name" value="" />

			<label>Last Name</label>
			<input id="user_create_lname" type="text" placeholder="Last Name" value="" />

		</div>
		<div class="row">
			<div class="large-12 columns">
				<button id="create-user" class="button small radius" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">Register</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="user_create-output" />
	</fieldset>
</div>



<div id="modal-update-user" class="reveal-modal small" data-reveal>
	<section>
		<h3>Update User</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<label>User</label>
			<select id="update_userlist">
				<option value="--">--</option>
			</select>

			<label>Username</label>
			<input id="user_update_username" type="text" placeholder="Username" value="" />

			<label>Password (only if change)</label>
			<input id="user_update_password" type="text" placeholder="Password" value="" />

			<label for="user_update_email">Email (example: paolo.rossi@gmail.com)</label>
			<input type="email" name="email" id="user_update_email" placeholder="Email">
			<span data-alert class="alert-box error round msg">
				Not a valid email address
				<!--<a href="#" class="close">&times;</a>-->
			</span>
			<span data-alert class="alert-box success round msg">
				Valid email!
				<!--<a href="#" class="close">&times;</a>-->
			</span>

			<label>First Name</label>
			<input id="user_update_fname" type="text" placeholder="First Name" value="" />

			<label>Last Name</label>
			<input id="user_update_lname" type="text" placeholder="Last Name" value="" />
		</div>
		<div class="row">
			<div class="large-12 columns">
				<button id="update-user" class="button small radius" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">Update</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="user_update-output" />
	</fieldset>
</div>


<div id="modal-delete-user" class="reveal-modal small" data-reveal>
	<section>
		<h3>Delete User from the Cloud</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<label>User</label>

			<select id="unregister_userlist">
				<option value="--">--</option>
			</select>
		</div>
		<div class="row">
			<div class="large-12 columns">
				<button id="unregister-user" class="button small radius" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">
					Unregister
				</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="user_delete-output" />
	</fieldset>
</div>
