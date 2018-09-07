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
		<label name="services_text"></label></br>
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
			<select id="register_protocol"></select>
		</div>
		<div class="row">
			<div class="large-12 columns">
				<button id="register_service" class="custom_button">Register</button>
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
			<select id="update_protocol"></select>
		</div>
		<div class="row">
			<div class="large-12 columns">
				<button id="update_service" class="custom_button">Update</button>
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
				<button id="delete_service" class="custom_button">Delete</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="service_delete-output" />
	</fieldset>
</div>



<div id="modal-status-service" class="reveal-modal small" data-reveal>
	<section>
		<h3>Service Actions</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<label>Service Name</label>
			<select id="status_servicelist"></select>

			<div style="text-align:center;">
				<div style="width: 49%; margin-top: 5px; text-align:center; vertical-align: top; display: inline-block;">
					<label>Enable / Disable per project action</label>
				</div>
				<div class="switch round small" style="margin-bottom: 0px; width: 15%; text-align:center; display: inline-block;">
					<input id="servicestatus_project" class="flag_project" type="checkbox" />
					<label for="servicestatus_project"></label>
				</div>
			</div>
			<div id="servicestatus_boardlist_bundle">
				<table id="servicestatus_tableboards" style="width: 100%"></table>
				<!--
				<label>Boards List</label>
				<select id="servicestatus_boardlist" multiple="multiple" size="<?=$selectbox_size?>"></select>
				-->
			</div>
		</div>
		<div class="row">
			<div class="large-12 columns">
				<table class="table_info">
				<tr>
					<td style="text-align: center;">
						<button id="enable_service" class="custom_button status_service" style="float: none; display: inline-block;">
							Enable
						</button>
					</td>
					<td style="text-align: center;">
						<button id="disable_service" class="custom_button status_service" style="float: none; display: inline-block;">
							Disable
						</button>
					</td>
					<td style="text-align: center;">
						<button id="restore_service" class="custom_button status_service" style="float: none; display: inline-block;">
							Restore
						</button>
					</td>
				</tr>
				</table>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="service_status-output" />
	</fieldset>
</div>

<!--
<div id="modal-board-services" class="reveal-modal small" data-reveal>
	<section>
		<h3>Show services on Board</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<label>Boards List</label>
			<select id="services_boardlist"></select>

			<div id="show_boardservices_section">
				<label name="services_text"></label></br>
				<table id="show_boardservices_table" style="width: 100%"></table>
			</div>
		</div>
	</section>
</div>
-->

<div id="modal-board-services" class="reveal-modal small" data-reveal>
	<section>
		<h3>Services on Board</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<table id="show_boardservices_tableboards" style="width: 100%"></table>
		</div>
	</section>
</div>


<div id="modal-board-services-list" class="reveal-modal small" data-reveal>
	<section>
		<h3 name="info_text"></h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>

		<div style="margin-bottom: 20px;">
			<table id="show_services_tableservices" style="width: 100%"></table>
		</div>

		<div class="row">
			<div class="large-12 columns">
				<button data-reveal-id="modal-board-services" class="custom_button">Previous</button>
			</div>
		</div>
	</section>
</div>

