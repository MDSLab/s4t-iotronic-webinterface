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


<div id="modal-board-info" class="reveal-modal" data-reveal>
	<a class="close-reveal-modal" aria-label="Close">&#215;</a>
	<h3>Board Information</h3>
	<table class="table_info">
	<tr>
		<td style="width: 20%; overflow-y: scroll;">
			<div>
				<ul class="side-nav">
					<li><a href="#" onclick='hideall_except("info-details")'>Details</a></li>
					<li><a href="#" onclick='hideall_except("info-enablers")'>Enablers</a></li>

					<? if ($this -> config -> item('load_cloud_services_management')): ?>
					<li><a href="#" onclick='hideall_except("info-services")'>Services</a></li>
					<? endif ?>

					<? if ($this -> config -> item('load_plugin_management')): ?>
					<li><a href="#" onclick='hideall_except("info-plugins")'>Plugins</a></li>
					<? endif ?>

					<? if ($this -> config -> item('load_driver_management')): ?>
					<li><a href="#" onclick='hideall_except("info-drivers")'>Drivers</a></li>
					<? endif ?>

					<? if ($this -> config -> item('load_vfs_management')): ?>
					<li><a href="#" onclick='hideall_except("info-networks")'>Networks</a></li>
					<? endif ?>
				</ul>
			</div>
		</td>
		<td valign="top" style="width: 80%; overflow-y: scroll;">
			<div id="info-container">
				<div id="info-details">
					<h4><b>Details</b></h4>
					<table class="table_info">
					<tr>
						<td>
							<div id="info-label"></div>
							<div id="info-uuid"></div>
							<div id="info-description"></div>
							<div id="info-lr_version"></div>
							<div id="info-user"></div>
							<div id="info-project"></div>
							<div id="info-model"></div>
							<div id="info-layout"></div>
							<div id="info-manufacturer"></div>
							<div id="info-image"></div>
						</td>
						<td style="vertical-align:top">
							<div id="info-lat"></div>
							<div id="info-lon"></div>
							<div id="info-alt"></div>
							<div id="info-timestamp"></div>
						</td>
					</tr>
					</table>
					<div class="mini_map" id="info-map" style="width: 100%; height: 100%"></div>
				</div>

				<div id="info-enablers">
					<h4><b>Enablers</b></h4>
					<!--
					<table class="table_info">
						<tr>
							<td style="width: 30%; text-align:center">
								<input type="checkbox" id="info_mobile_enabled"><label>Mobile</label></input>
							</td>
							<td style="width: 30%; text-align:center">
								<input type="checkbox" id="info_net_enabled"><label>Network</label></input>
							</td>
							<td style="width: 30%; text-align:center">
								<input type="checkbox" id="info_notify_enabled"><label>Notify</label></input>
							</td>
						</tr>
					</table>
					-->
					<table class="table_info">
						<tr>
							<td style="width: 18%;">
								<input type="checkbox" id="info_mobile_enabled"><label>Mobile</label></input>
							</td>
							<td style="width: 82%;">
								<textarea placeholder="" name="" rows="2" readonly>If the board is a mobile device and it could move, this flag should be set.</textarea>
							</td>
						</tr>
						<tr>
							<td style="width: 18%;">
								<input type="checkbox" id="info_net_enabled"><label>Network</label></input>
							</td>
							<td style="width: 82%;">
								<textarea placeholder="" name="" rows="2" readonly>This flag indicates if a board could exploit the network functionalities.</textarea>
							</td>
						</tr>
						<tr>
							<td style="width: 18%;">
								<input type="checkbox" id="info_notify_enabled"><label>Notify</label></input>
							</td>
							<td style="width: 82%;">
								<textarea placeholder="" name="" rows="2" readonly>It allows the user/owner of the board to be notified if something is going wrong.</textarea>
							</td>
						</tr>
					</table>
				</div>

				<div id="info-services">
					<div id="cloud_services_section">
						<h4><b>Services</b></h4>
						<label name="services_text"></label></br>
						<table id="info_tableservices" style="width: 100%"></table>
					</div>
				</div>

				<div id="info-plugins">
					<div id="plugins_section">
						<h4><b>Plugins</b></h4>
						<table id="info_tableplugins" style="width: 100%"></table>
					</div>
				</div>

				<div id="info-drivers">
					<div id="drivers_section">
						<h4><b>Drivers</b></h4>
						<table id="info_tabledrivers" style="width: 100%"></table>
					</div>
				</div>

				<div id="info-networks">
					<div id="vnets_section">
						<h4><b>Networks</b></h4>
						<table id="info_tablenetworks" style="width: 100%"></table>
					</div>
				</div>
			</div>
		</td>
	</tr>
	</table>
</div>

<!-- !!! TO BE REMOVED !!! -->
<div id="modal-plugins_sensors-lists" class="reveal-modal" data-reveal>
	<section>
		<h3>Board Information</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div id="info-label"></div>
		<fieldset>
			<legend>Details</legend>
			<!--
			<table class="table_info">
			<tr>
				<td style="width:50%">
			-->
			<table class="table_info">
			<tr><td>
				<div id="info-uuid"></div>
				<div id="info-description"></div>
			</td></tr>
			</table>

			<table class="table_info">
			<tr><td>
				<div id="info-user"></div>
				<div id="info-project"></div>
			</td></tr>
			</table>

			<table class="table_info">
			<tr><td>
				<div id="info-model"></div>
				<div id="info-manufacturer"></div>
				<div id="info-image"></div>
			</td></tr>
			</table>
			<!--
				</td>
				<td style="width:50%">
					<div class="mini_map" id="info-map" style="width: 100%; height: 100%"></div>
				</td>
			</tr>
			</table>
			-->
		</fieldset>

		<fieldset>
			<legend>Coordinates</legend>

			<table class="table_info">
			<tr>
				<td style="width:50%">

					<table class="table_info">
					<tr><td>
						<div id="info-lat"></div>
						<div id="info-lon"></div>
						<div id="info-alt"></div>
						<div id="info-timestamp"></div>
					</td></tr>
					</table>

				</td>
				<td style="width:50%">
					<div class="mini_map" id="info-map" style="width: 100%; height: 100%"></div>
				</td>
			</tr>
			</table>
		</fieldset>
		<!--
		<label><b>Sensors</b></label>
		<select id="sensors_on_board" multiple="multiple" size="<?=$selectbox_size?>"></select>
		-->

		<fieldset>
			<legend>Enablers</legend>
			<table class="table_info">
			<tr>
				<td style="width: 30%; text-align:center">
					<input type="checkbox" id="info_mobile_enabled"><label>Mobile</label></input>
				</td>
				<td style="width: 30%; text-align:center">
					<input type="checkbox" id="info_net_enabled"><label>Network</label></input>
				</td>
				<td style="width: 30%; text-align:center">
					<input type="checkbox" id="info_notify_enabled"><label>Notify</label></input>
				</td>
			</tr>
			</table>
		</fieldset>

		<div id="cloud_services_section">
			<label><b>Services</b></label>
			<table id="info_tableservices" style="width: 100%"></table>
		</div>

		<div id="plugins_section">
			<label><b>Plugins</b></label>
			<table id="info_tableplugins" style="width: 100%"></table>
		</div>

		<div id="drivers_section">
			<label><b>Drivers</b></label>
			<table id="info_tabledrivers" style="width: 100%"></table>
		</div>

		<div id="vnets_section">
			<label><b>Networks</b></label>
			<table id="info_tablenetworks" style="width: 100%"></table>
		</div>
	</section>
</div>


<div id="modal-show-boards" class="reveal-modal" data-reveal>
	<section>
		<h3>Boards</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<table id="show_boards_table" style="width: 100%"></table>
	</section>
</div>


<div id="modal-register-new-board" class="reveal-modal small" data-reveal>
	<section>
		<h3>Add new Board to the Cloud</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>

		<div class="row">
			<label>Board UUID</label>
			<!--<input id="board_create_uuid" type="text" value="" />-->

			<table class="table_info" style="padding: 0px">
			<tr>
				<td style="width: 90%; padding: 0px">
					<input id="board_create_uuid" type="text" value="" />
				</td>
				<td style="width: 10%; padding: 0px">
					<button id="board_generate_uuid" class="custom_button">New</button>
				</td>
			</tr>
			</table>

			<label>Label</label>
			<input id="board_create_label" type="text" placeholder="Label" value="" />

			<? if ($this -> config -> item('security') == 'certificate'): ?>
			<label>Public Key Certificate</label>
			<input type="file" name="board_create_certfile" id="board_create_certfile" size="20" />
			<textarea id="board_create_certificate" placeholder="Insert here the certificate" name="text" rows="3" style="display:none;" readonly></textarea>

			<? elseif ($this -> config -> item('security') == 'password'): ?>
			<label>Password (between 4 and 60 digits)</label>
			<div class="large-12 columns" style="text-align:left; padding-left: 0px; padding-right: 0px; vertical-align: middle;">
				<div style="width: 75%; margin-top: 0px; text-align:center; vertical-align: middle; display: inline-block;">
					<input id="board_create_password" type="password" placeholder="Password" value="" />
				</div>
				<div style="width: 23%; height: auto; margin-top: 5px; text-align:center; vertical-align: top; display: inline-block;">
					<input id="board_create_password_visibility" type="checkbox" onclick='show_password("board_create_password")' /><label>Show</label>
				</div>
			</div>
			<? endif ?>

			<label>Description</label>
			<textarea id="board_create_description" placeholder="Description" name="text" rows="2"></textarea>

			<label>Layout</label>
			<select id="board_create_layout">
				<option value="--">--</option>
			</select>

			<!--
			<label>Sensors On Board</label>
			<fieldset>
					<center><div id="board_create_sensorlist"></div></center>
			</fieldset>
			-->

			<table class="table_info">
				<tr>
					<td style="width: 33%; text-align:center; padding: 0px">
						<label>Latitude</label>
						<input id="board_create_latitude" type="text" placeholder="e.g.: 38.123" value="" />
					</td>
					<td style="width: 33%; text-align:center; padding: 0px">
						<label>Longitude</label>
						<input id="board_create_longitude" type="text" placeholder="e.g.: 15.123" value="" />
					</td>
					<td style="width: 33%; text-align:center; padding: 0px">
						<label>Altitude</label>
						<input id="board_create_altitude" type="text" placeholder="e.g.: 50.123" value="" />
					</td>
				</tr>
			</table>

			<table class="table_info">
				<tr>
					<td style="width: 50%; text-align:center; padding: 0px">
						<input type="checkbox" id="board_create_mobile_enabled"><label>Mobile</label></input>
					</td>
					<td id="board_create_refresh_coordinates" style="width: 50%; text-align:center; padding: 0px">
						<input id="board_create_refresh_position" type="number" min="0" max="100" step="2" placeholder="Position refresh time (sec)"/>
					</td>
				</tr>
			</table>


			<label>Net enabled</label>
			<select id="board_create_net_enabled">
				<option value="false">False</option>
				<option value="true">True</option>
			</select>

			<label>Extra user defined data (json)</label>
			<!--<input id="board_create_extra" type="text" placeholder="Extra" value="" /> -->
			<textarea id="board_create_extra" placeholder="" name="text" rows="3"></textarea>

			<table class="table_info">
				<tr>
					<td style="width: 50%; text-align:center; padding: 0px">
						<label>Project</label>
						<select id="board_create_project">
							<option value="--">--</option>
						</select>
					</td>
					<td style="width: 50%; text-align:center; padding: 0px">
						<label>User</label>
						<select id="board_create_user">
							<option value="--">--</option>
						</select>
					</td>
				</tr>
			</table>

			<label>Notify</label>
			<select id="board_create_notify_enabled">
				<option value="false">False</option>
				<option value="true">True</option>
			</select>

			<div id="board_create_notify_section">
				<label>Notify Rate (in sec.)</label>
				<input id="board_create_notify_rate" type="number" min="10" max="6000" step="5" value="600"/>

				<label>Notify Retry</label>
				<input id="board_create_notify_retry" type="number" min="1" max="5" step="1" value="3"/>
			</div>

			<div id="board_create_endpoints_section">
				<label>Endpoints</label>
				<fieldset>
					<center><div id="board_create_endpoints"></div></center>
				</fieldset>

			</div>
		</div>

		<div class="row">
			<div class="large-12 columns">
				<button id="create-board" class="custom_button">
					Register
				</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="board_create-output" />
	</fieldset>
</div>


<div id="modal-configure-board" class="reveal-modal small" data-reveal>
	<section>
		<h3>Board Configuration</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">

			<div style="text-align:center;">
				<div style="width: 49%; text-align:center; vertical-align: top; display: inline-block;">
					<label>Enable / Disable per project configuration</label>
				</div>
				<div class="switch round small" style="margin-top: 5px; margin-bottom: 0px; width: 15%; text-align:center; display: inline-block;">
					<input id="configure_project" class="flag_project" type="checkbox" />
					<label for="configure_project"></label>
				</div>
			</div>
			<div id="configure_boardlist_bundle">
				<table id="configure_tableboards" style="width: 100%"></table>
				<!--
				<label>Boards List</label>
				<select id="configure_boardlist" multiple="multiple" size="<?=$selectbox_size?>"></select>
				-->
			</div>
		</div>
		<div class="row">
			<div class="large-12 columns">
				<button id="configure-board" class="custom_button">
					Configure
				</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="board_configure-output" />
	</fieldset>
</div>



<div id="modal-update-board" class="reveal-modal small" data-reveal>
	<section>
		<h3>Update Board</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>

		<div class="row">
			<label>Board</label>
			<select id="update_boardlist">
				<option value="--">--</option>
			</select>

			<div id="board_update_data_section">

				<input id="board_update_state" type="hidden">

				<label>Label</label>
				<input id="board_update_label" type="text" placeholder="Label" value="" />

				<? if ($this -> config -> item('security') == 'certificate'): ?>
				<label>Public Key Certificate</label>
				<input type="file" name="board_update_certfile" id="board_update_certfile" size="20" />
				<textarea id="board_update_certificate" placeholder="Insert here the certificate" name="text" rows="3" style="display:none;" readonly></textarea>
				
				<? elseif ($this -> config -> item('security') == 'password'): ?>
				<label>Password (between 4 and 60 digits)</label>
				<div class="large-12 columns" style="text-align:left; padding-left: 0px; padding-right: 0px; vertical-align: middle;">
					<div style="width: 75%; margin-top: 0px; text-align:center; vertical-align: middle; display: inline-block;">
						<input id="board_update_password" type="password" placeholder="Leave empty to not change it" value="" />
					</div>
					<div style="width: 23%; height: auto; margin-top: 5px; text-align:center; vertical-align: top; display: inline-block;">
						<input id="board_update_password_visibility" type="checkbox" onclick='show_password("board_update_password")' /><label>Show</label>
					</div>
				</div>
				<? endif ?>


				<label>Description</label>
				<textarea id="board_update_description" placeholder="Description" name="text" rows="2"></textarea>

				<label>Layout</label>
				<select id="board_update_layout">
					<option value="--">--</option>
				</select>

				<!--
				<label>Sensors On Board</label>
				<fieldset>
						<center><div id="board_update_sensorlist"></div></center>
				</fieldset>
				-->

				<table class="table_info">
					<tr>
						<td style="width: 33%; text-align:center; padding: 0px">
							<label>Latitude</label>
							<input id="board_update_latitude" type="text" placeholder="e.g.: 38.123" value="" />
						</td>
						<td style="width: 33%; text-align:center; padding: 0px">
							<label>Longitude</label>
							<input id="board_update_longitude" type="text" placeholder="e.g.: 15.123" value="" />
						</td>
						<td style="width: 33%; text-align:center; padding: 0px">
							<label>Altitude</label>
							<input id="board_update_altitude" type="text" placeholder="e.g.: 50.123" value="" />
						</td>
					</tr>
				</table>

				<table class="table_info">
					<tr>
						<td style="width: 50%; text-align:center; padding: 0px">
							<input type="checkbox" id="board_update_mobile_enabled"><label>Mobile</label></input>
						</td>
						<td id="board_update_refresh_coordinates" style="width: 50%; text-align:center; padding: 0px">
							<input id="board_update_refresh_position" type="number" min="0" max="100" step="2" placeholder="Position refresh time (sec)"/>
						</td>
					</tr>
				</table>


				<label>Net enabled</label>
				<select id="board_update_net_enabled">
					<option value="false">False</option>
					<option value="true">True</option>
				</select>

				<label>Extra user defined data (json)</label>
				<textarea id="board_update_extra" placeholder="" name="text" rows="3"></textarea>

				<table class="table_info">
					<tr>
						<td style="width: 50%; text-align:center; padding: 0px">
							<label>Project</label>
							<select id="board_update_project">
								<option value="--">--</option>
							</select>
						</td>
						<td style="width: 50%; text-align:center; padding: 0px">
							<label>User</label>
							<select id="board_update_user">
								<option value="--">--</option>
							</select>
						</td>
					</tr>
				</table>

				<label>Notify</label>
				<select id="board_update_notify_enabled">
					<option value="false">False</option>
					<option value="true">True</option>
				</select>

				<div id="board_update_notify_section">
					<label>Notify Rate (in sec.)</label>
					<input id="board_update_notify_rate" type="number" min="10" max="6000" step="5" value="600"/>

					<label>Notify Retry</label>
					<input id="board_update_notify_retry" type="number" min="1" max="5" step="1" value="3"/>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="large-12 columns">
				<button id="update-board" class="custom_button">
					Update
				</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="board_update-output" />
	</fieldset>
</div>



<div id="modal-unregister-board" class="reveal-modal" data-reveal>
	<section>
		<h3>Unregister Board</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>

		<div style="text-align:center;">
			<div style="width: 49%; margin-top: 5px; text-align:center; vertical-align: top; display: inline-block;">
				<label>Enable / Disable per project delete</label>
			</div>
			<div class="switch round small" style="margin-bottom: 0px; width: 15%; text-align:center; display: inline-block;">
				<input id="deleteboard_project" class="flag_project" type="checkbox" />
				<label for="deleteboard_project"></label>
			</div>
		</div>

		<div id="deleteboard_boardlist_bundle">
			<table id="delete_tableboards" style="width: 100%"></table>
		</div>

		<div class="row">
			<div class="large-12 columns">
				<button id="delete_board" class="custom_button">
					Remove
				</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="board_delete-output" />
	</fieldset>
</div>



<div id="modal-action-board" class="reveal-modal small" data-reveal>
	<section>
		<h3>Board Action</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">

			<label>Action</label>
			<select id="board_actionlist"></select>

			<div style="text-align:center;">
				<div style="width: 49%; margin-top: 5px; text-align:center; vertical-align: top; display: inline-block;">
					<label>Enable / Disable per project action</label>
				</div>
				<div class="switch round small" style="margin-bottom: 0px; width: 15%; text-align:center; display: inline-block;">
					<input id="action_project" class="flag_project" type="checkbox" />
					<label for="action_project"></label>
				</div>
			</div>
			<div id="action_boardlist_bundle">
				<table id="boardaction_tableboards" style="width: 100%"></table>
				<!--
				<label>Boards List</label>
				<select id="action_boardlist" multiple="multiple" size="<?=$selectbox_size?>"></select>
				-->
			</div>

		</div>
		<div class="row">

			<!-- Parameters / times section -->
			<div id="action-board-time_bundle">
				<div class="large-9 columns" style="padding-left: 0px">
					<div style="width: auto; text-align:center; display: inline-block;">
						<label>Delay Time</label>
					</div>
					<div style="width: 30%; text-align:center; display: inline-block;">
						<input id="action-board-time" type="text" placeholder="" name="time" value="" onkeypress="return (event.charCode == 8 || event.charCode == 0) ? null : ( (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 46)"/>
					</div>
					<div style="width: auto; text-align:center; display: inline-block;">
						<label>(in seconds)</label>
					</div>
				</div>
			</div>
			<div id="action-board_parameters_bundle">
				<label>Parameters</label>
				<textarea id="action-board_parameters" placeholder="Insert here the parameters" name="text" rows="3"></textarea>
			</div>
		</div>
		<div class="row">
			<div class="large-12 columns">
				<button id="action-board" class="custom_button">
					Execute
				</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="board_action-output" />
	</fieldset>
</div>


<div id="modal-update-pkg-board" class="reveal-modal small" data-reveal>
	<section>
		<h3>Package Management</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">

			<div style="text-align:center;">
				<div style="width: 49%; margin-top: 5px; text-align:center; vertical-align: top; display: inline-block;">
					<label>Enable / Disable per project action</label>
				</div>
				<div class="switch round small" style="margin-bottom: 0px; width: 15%; text-align:center; display: inline-block;">
					<input id="pkg_project" class="flag_project" type="checkbox" />
					<label for="pkg_project"></label>
				</div>
			</div>
			<div id="pkg_boardlist_bundle">
				<table id="pkg_tableboards" style="width: 100%"></table>
				<!-- 
				<label>Boards List</label>
				<select id="pkg_boardlist" multiple="multiple" size="<?=$selectbox_size?>"></select>
				-->
			</div>

			<div class="large-12 columns" style="text-align:left; padding-left: 0px; padding-right: 0px; vertical-align: middle;">
				<div style="width: 49%; margin-top: 0px; text-align:center; vertical-align: middle; display: inline-block;">
					<label>Package Manager</label>
					<select id="pkg_manager"></select>
				</div>
				<div style="width: 49%; margin-top: 0px; text-align:center; vertical-align: middle; display: inline-block;">
					<label>Command</label>
					<select id="pkg_command"></select>
				</div>
			</div>

			<label>Parameters [OPTIONAL]</label>
			<input id="pkg_parameters" type="text" placeholder="Insert the parameters/flags" name="name" value="" />

			<label>List of packages</label>
			<input id="pkg_packages" type="text" placeholder="Insert here the packages" name="name" value="" />
			<!--<textarea id="pkg_packages" placeholder="Insert here the packages" name="text" rows="3"></textarea>-->
			
		</div>
		<div class="row">
			<div class="large-12 columns">
				<button id="pkg-man-board" class="custom_button">
					Execute
				</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="board_pkg-management-output" />
	</fieldset>
</div>


<div id="modal-updatelr-board" class="reveal-modal small" data-reveal>
	<section>
		<h3>Lightning-rod Management</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">

			<div style="text-align:center;">
				<div style="width: 49%; margin-top: 5px; text-align:center; vertical-align: top; display: inline-block;">
					<label>Enable / Disable per project action</label>
				</div>
				<div class="switch round small" style="margin-bottom: 0px; width: 15%; text-align:center; display: inline-block;">
					<input id="lr_project" class="flag_project" type="checkbox" />
					<label for="lr_project"></label>
				</div>
			</div>
			<div id="lr_boardlist_bundle">
				<!--<label>Boards List</label>-->
				<table id="lr_tableboards" style="width: 100%"></table>
			</div>
		</div>


		<div class="row">
			<div class="large-9 columns" style="padding-left: 0px">
				<div style="width: auto; text-align:center; display: inline-block;">
					<label>Version</label>
				</div>
				<div style="width: 30%; text-align:center; display: inline-block;">
					<input id="lr_version" type="text" placeholder="Insert version" name="name" value="" />
				</div>
				<div style="width: auto; text-align:center; display: inline-block;">
					<label>(only if debian)</label>
				</div>
			</div>
		</div>



		<div class="row">
			
			<div class="large-12 columns">
				<button id="update" class="custom_button lr_change">
					Update
				</button>
			</div>
			<!--
			<div class="large-12 columns">
				<div style="width: 48%; text-align:center; display: inline-block;">
					<button id="revert" class="custom_button lr_change" style="float: none; display: inline-block;">
						Revert
					</button>
				</div>
				<div style="width: 48%; text-align:center; display: inline-block;">
					<button id="update" class="custom_button lr_change" style="float: none; display: inline-block;">
						Update
					</button>
				</div>
			</div>
			-->
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="board_lr-management-output" />
	</fieldset>
</div>

