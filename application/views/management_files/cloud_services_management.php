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

<div id="modal-show-services" class="reveal-modal small" data-reveal>
	<section>
		<h3>Services</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<table id="show_services_table" style="width: 100%"></table>
	</section>
</div>



<div id="modal-register-service" class="reveal-modal small" data-reveal>
	<section>
		<h3>Register Service</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<label>Service Name</label>
			<input id="register_service_name" type="text" placeholder="Service Name" name="name" value="" />

			<label>Port</label>
			<input id="register_port" type="number" placeholder="Port Number" name="port" value="" onkeypress="return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57"/>

			<label>Protocol</label>
			<select id="register_protocol">
				<option value="TCP">TCP</option>
				<option value="UDP">UDP</option>
			</select>
		</div>
		<div class="row">
			<div class="large-12 columns">
				<button id="register_service" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">
					Register
				</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="service_register-output" />
	</fieldset>
</div>



<div id="modal-update-service" class="reveal-modal small" data-reveal>
	<section>
		<h3>Update Service</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<label>Service Name</label>
			<select id="update_servicelist"></select>

			<label>Service Name</label>
			<input id="update_service_name" type="text" placeholder="Service Name" name="name" value="" />

			<label>Port</label>
			<input id="update_port" type="number" placeholder="Port Number" name="port" value="" onkeypress="return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57"/>

			<label>Protocol</label>
			<select id="update_protocol">
				<option value="TCP">TCP</option>
				<option value="UDP">UDP</option>
			</select>
		</div>
		<div class="row">
			<div class="large-12 columns">
				<button id="update_service" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">
					Update
				</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="service_update-output" />
	</fieldset>
</div>



<div id="modal-delete-service" class="reveal-modal small" data-reveal>
	<section>
		<h3>Delete Service</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<label>Service Name</label>
			<select id="delete_servicelist"></select>
		</div>
		<div class="row">
			<div class="large-12 columns">
				<button id="delete_service" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">
					Delete
				</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="service_delete-output" />
	</fieldset>
</div>



<div id="modal-status-service" class="reveal-modal" data-reveal>
	<section>
		<h3>Service Actions</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<label>Service Name</label>
			<select id="status_servicelist"></select>

			<label>Board List</label>
			<select id="servicestatus_boardlist" multiple="multiple" size="<?=$selectbox_size?>"></select>
		</div>
		<div class="row">
			<div class="large-12 columns">
				<button id="enable_service" class="button tiny radius status_service" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">
					Enable
				</button>
				<button id="disable_service" class="button tiny radius status_service" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">
					Disable
				</button>
				<button id="restore_service" class="button tiny radius status_service" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">
					Restore
				</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="service_status-output" />
	</fieldset>
</div>


<div id="modal-board-services" class="reveal-modal" data-reveal>
	<section>
		<h3>Show services on Board</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<label>Board List</label>
			<select id="services_boardlist"></select>

			<div id="show_boardservices_section">
				<table id="show_boardservices_table" style="width: 100%"></table>
			</div>
		</div>
	</section>
</div>


