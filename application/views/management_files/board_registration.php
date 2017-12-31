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
			<input id="board_create_uuid" type="text" value="" />

			<label>Label</label>
			<input id="board_create_label" type="text" placeholder="Label" value="" />

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
				<button id="create-board" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">
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
				<label>Label</label>
				<input id="board_update_label" type="text" placeholder="Label" value="" />

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
				<button id="update-board" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">
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
		<h3>unregister board</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<table id="delete_tableboards" style="width: 100%"></table>

		<div class="row">
			<div class="large-12 columns">
				<button id="delete_board" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">
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
			<label>Board List</label>
			<select id="action_boardlist"></select>

			<label>Action</label>
			<select id="board_actionlist"></select>
		</div>
		<div class="row">
			<div class="large-12 columns">
				<button id="action-board" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">
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
