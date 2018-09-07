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

<div id="modal-show-plugins" class="reveal-modal" data-reveal>
	<section>
		<h3>Plugins</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<table id="show_plugins_table" style="width: 100%"></table>
	</section>
</div>


<div id="modal-show-plugin-logs" class="reveal-modal small" data-reveal>
	<section>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>

		<input type="hidden" id="logs_request_id" value="">
		<input type="hidden" id="logs_rows" value="">

		<div id="project_logs">
			<h3>Plugin Logs</h3>
			<div class="row">
				<div style="text-align:center;">
					<div style="width: 80%; text-align:center; display: inline-block;">
						<label>Plugin Name</label>
						<select id="logs_pluginlist"></select>
					</div>
					<div style="width: 15%; text-align:center; display: inline-block;">
						<label>Rows</label>
						<input id="rows_number" type="number" placeholder="" name="rows" min="1" value="10" onkeypress="return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57"/>
					</div>
				</div>

				<div id="logs_boards_section">
					<div style="text-align:center;">
						<div style="width: 49%; margin-top: 5px; text-align:center; vertical-align: top; display: inline-block;">
							<label>Enable / Disable per project logs</label>
						</div>
						<div class="switch round small" style="margin-bottom: 0px; width: 15%; text-align:center; display: inline-block;">
							<input id="logs_project" class="flag_project" type="checkbox" />
							<label for="logs_project"></label>
						</div>
					</div>

					<div id="logs_boardlist_bundle">
						<table id="logs_tableboards" style="width: 100%"></table>
						<!--
						<label>Boards List</label>
						<select id="logs_boardlist" multiple="multiple" class="select_one" size="<?=$selectbox_size?>"></select>
						-->
					</div>
				</div>

				<div class="large-12 columns">
					<button id="logs_plugin" class="custom_button">Get</button>
				</div>
			</div>
		</div>

		<div id="boards_x_log_request">
			<h3>Log Request</h3>

			<div style="text-align:center;">
				<div style="width: 70%; text-align:center; display: inline-block;">
					<h5 name="request_text" align="center"></h5></br>
				</div>
				<div style="width: 25%; text-align:center; display: inline-block;">
					<button class="custom_button" onclick="populate_project_logs()">Refresh</button>
				</div>
			</div>

			<table id="show_logs_boards_table" class="display" cellspacing="0" style="width: 100%"></table>
			<button class="custom_button" onclick="load_project_logs()">Previous</button>
		</div>

		<div id="board_log_message">
			<h3 name="message_log_text"></h3>
			<div id="board_log_result"></div>
			<textarea id="board_message" rows="10" cols="50" readonly></textarea>
			<button class="custom_button" onclick="return_log_boards(this)">Previous</button>
		</div>

		<div id="selected_board_log">
			<input type="hidden" id="logs_board_id" value="">
			<input type="hidden" id="logs_board_name" value="">
			<input type="hidden" id="logs_plugin_id" value="">
			<input type="hidden" id="logs_rows_number" value="">

			<div style="text-align:left;">
				<div style="width: 70%; text-align:left; display: inline-block;">
					<h3 name="selected_message_log_text"></h3>
				</div>
				<div style="width: 25%; text-align:center; display: inline-block;">
					<button class="custom_button" style="margin-bottom: 0px;" onclick="refresh_log_message()">Refresh</button>
				</div>
			</div>
			<div id="selected_board_log_result"></div>
			<textarea id="selected_board_message" rows="10" cols="50" readonly></textarea>
			<button class="custom_button" onclick="load_project_logs(this)">Previous</button>
		</div>

	</section>
</div>



<div id="modal-modify-plugin" class="reveal-modal small" data-reveal>
	<section>
		<h3 name="info_text"></h3>
		<div class="row">
			<a class="close-reveal-modal" aria-label="Close">&#215;</a>

			<input id="update_plugin_saved_name" type="hidden" name="saved_name">
			<input id="update_plugin_saved_description" type="hidden" name="saved_description">
			<input id="update_plugin_saved_parameters" type="hidden" name="saved_parameters">

			<input id="update_plugin_id" type="hidden" name="id">
			<input id="update_plugin_checksum" type="hidden" name="checksum">
			<input id="update_plugin_category" type="hidden" name="category">
			<input id="update_plugin_type" type="hidden" name="type">

			<div style="text-align:center;">
				<div style="width: 70%; text-align:center; display: inline-block;">
					<label>Plugin Name</label>
					<input id="update_plugin_name" type="text" placeholder="Plugin Name" name="name" />
				</div>
				<div style="width: 29%; text-align:center; display: inline-block;">
					<label>Version</label>
					<input id="update_plugin_version" type="text" placeholder="1.2.3" name="version" value="" onkeypress="return (event.charCode == 8 || event.charCode == 0) ? null : ( (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 46)"/>
				</div>
			</div>

			<label>Description</label>
			<textarea id="update_plugin_description" placeholder="Insert description" name="description" rows="3"></textarea>

			<label>Plugin Parameters</label>
			<input type="file" name="update_plugin_paramfile" id="update_plugin_paramfile" size="20" />
			<textarea id="update_plugin_parameters" placeholder="Insert here the parameters (json format)" name="parameters" rows="5"></textarea>

			<label>Code</label>
			<input type="file" name="update_plugin_codefile" id="update_plugin_codefile" size="20" />
			<textarea id="update_plugin_code" placeholder="Insert here the code" name="code" rows="15"></textarea>
		</div>
		<div class="row">
			<div class="large-12 columns">
				<div style="text-align:center; display: block">
					<div style="width: 45%; text-align:center; display: inline-block;">
						<button id="back_show-plugins" class="custom_button" data-reveal-id="modal-show-plugins" style="float: none; display: inline-block;">
							Previous
						</button>
					</div>
					<div style="width: 45%; text-align:center; display: inline-block;">
						<button id="update_plugin" class="custom_button" style="float: none; display: inline-block;">
							Update
						</button>
					</div>
				</div>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="plugin_update-output" />
	</fieldset>
</div>


<div id="modal-create-plugin" class="reveal-modal small" data-reveal>
	<section>
		<h3>Create Plugin</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">

			<div style="text-align:center;">
				<div style="width: 70%; text-align:center; display: inline-block;">
					<label>Plugin Name</label>
					<input id="create_plugin_name" type="text" placeholder="Plugin Name" name="name" value="" />
				</div>
				<div style="width: 29%; text-align:center; display: inline-block;">
					<label>Version</label>
					<input id="create_plugin_version" type="text" placeholder="1.2.3" name="version" value="" onkeypress="return (event.charCode == 8 || event.charCode == 0) ? null : ( (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 46)"/>
				</div>
			</div>

			<div style="text-align:center;">
				<div style="width: 49%; text-align:center; display: inline-block;">
					<label>Type</label>
					<select id="create_plugin_type">
						<option value="1">NodeJS</option>
						<option value="2">Python</option>
					</select>
				</div>
				<div style="width: 49%; text-align:center; display: inline-block;">
					<label>Category</label>
					<select id="create_plugin_category">
						<option value="sync">Sync</option>
						<option value="async">Async</option>
					</select>
				</div>
			</div>

			<label>Description</label>
			<textarea id="create_plugin_description" placeholder="Insert description" name="text" rows="3"></textarea>

			<label>Plugin Parameters</label>
			<input type="file" name="plugin_paramfile" id="plugin_paramfile" size="20" />
			<textarea id="create_plugin_parameters" placeholder="Insert here the parameters (json format)" name="text" rows="5"></textarea>

			<label>Code</label>
			<input type="file" name="plugin_userfile" id="plugin_userfile" size="20" />
			<textarea id="create_plugin_code" placeholder="Insert here the code" name="text" rows="15"></textarea>
		</div>
		<div class="row">
			<div class="large-12 columns">
				<button id="create_plugin" class="custom_button">
					Create
				</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="plugin_create-output" />
	</fieldset>
</div>


<div id="modal-read-plugin" class="reveal-modal small" data-reveal>
	<section>
		<h3 name="info_text"></h3>
		<div class="row">
			<a class="close-reveal-modal" aria-label="Close">&#215;</a>

			<input id="read_plugin_id" type="hidden" name="id">

			<div style="text-align:center;">
				<div style="width: 70%; text-align:center; display: inline-block;">
					<label>Plugin Name</label>
					<input id="read_plugin_name" type="text" placeholder="Plugin Name" name="name" readonly/>
				</div>
				<div style="width: 29%; text-align:center; display: inline-block;">
					<label>Version</label>
					<input id="read_plugin_version" type="text" placeholder="1.2.3" name="version" value="" onkeypress="return (event.charCode == 8 || event.charCode == 0) ? null : ( (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 46)" readonly/>
				</div>
			</div>

			<label>Description</label>
			<textarea id="read_plugin_description" placeholder="Insert description" name="description" rows="3" readonly></textarea>

			<label>Plugin Parameters</label>
			<textarea id="read_plugin_parameters" placeholder="Insert here the parameters (json format)" name="parameters" rows="5" readonly></textarea>

			<label>Code</label>
			<textarea id="read_plugin_code" placeholder="Insert here the code" name="code" rows="15" readonly></textarea>
		</div>
	</section>
</div>


<div id="modal-tag-plugin" class="reveal-modal small" data-reveal>
	<section>
		<h3 name="info_text"></h3>
		<div class="row">
			<a class="close-reveal-modal" aria-label="Close">&#215;</a>

			<input id="tag_plugin_id" type="hidden" name="id">

			<div style="text-align:center;">
				<div style="width: 49%; text-align:center; display: inline-block;">
					<label>Tag</label>
					<select id="tag_plugin_release" name="tag_plugin">
						<option value="1">Released</option>
						<option value="2">Unreleased</option>
					</select>
				</div>
			</div>

			<div style="text-align:center;">
				<div style="width: 70%; text-align:center; display: inline-block;">
					<label>Plugin Name</label>
					<input id="tag_plugin_name" type="text" placeholder="Plugin Name" name="name" readonly/>
				</div>
				<div style="width: 29%; text-align:center; display: inline-block;">
					<label>Version</label>
					<input id="tag_plugin_version" type="text" placeholder="1.2.3" name="version" value="" onkeypress="return (event.charCode == 8 || event.charCode == 0) ? null : ( (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 46)" readonly/>
				</div>
			</div>

			<label>Description</label>
			<textarea id="tag_plugin_description" placeholder="Insert description" name="description" rows="3" readonly></textarea>

			<label>Plugin Parameters</label>
			<textarea id="tag_plugin_parameters" placeholder="Insert here the parameters (json format)" name="parameters" rows="5" readonly></textarea>

			<label>Code</label>
			<textarea id="tag_plugin_code" placeholder="Insert here the code" name="code" rows="15" readonly></textarea>
		</div>
		<div class="row">
			<div class="large-12 columns">
				<div style="text-align:center; display: block">
					<div style="width: 45%; text-align:center; display: inline-block;">
						<button id="back_plugins" class="custom_button" data-reveal-id="modal-changetag-plugin" style="float: none; display: inline-block;">
							Previous
						</button>
					</div>
					<div style="width: 45%; text-align:center; display: inline-block;">
						<button id="tag_plugin" class="custom_button" style="float: none; display: inline-block;">
							Update Tag
						</button>
					</div>
				</div>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="plugin_tag-output" />
	</fieldset>
</div>


<div id="modal-changetag-plugin" class="reveal-modal" data-reveal>
	<section>
		<h3>Change Tag to Plugin</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<table id="changetag_tableplugins" style="width: 100%"></table>
	</section>
</div>


<div id="modal-destroy-plugin" class="reveal-modal" data-reveal>
	<section>
		<h3>Destroy Plugin</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<table id="destroy_tableplugins" style="width: 100%"></table>

		<div class="row">
			<div class="large-12 columns">
				<button id="destroy_plugin" class="custom_button">
					Remove
				</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="plugin_destroy-output" />
	</fieldset>
</div>


<div id="modal-inject-plugin" class="reveal-modal small" data-reveal>
	<section>
		<h3>Inject Plugin</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">

			<div style="text-align:center;">
				<div style="width: 49%; text-align:center; display: inline-block;">
					<label>Type</label>
					<select id="inject_type" class="plugin_type">
						<option value="--">--</option>
						<option value="1">NodeJS</option>
						<option value="2">Python</option>
					</select>
				</div>
				<div style="width: 49%; text-align:center; display: inline-block;">
					<label>Category</label>
					<select id="inject_category" class="plugin_category">
						<option value="--">--</option>
						<option value="sync">Sync</option>
						<option value="async">Async</option>
					</select>
				</div>
			</div>
			<div style="text-align:center;">
				<div style="width: 49%; text-align:center; display: inline-block;">
					<label>Plugin Name</label>
					<select id="inject_name" class="plugin_name">
						<option value="--">--</option>
					</select>
				</div>
			</div>

			<label>Filtered Plugins</label>
			<select id="inject_pluginlist" multiple="multiple" class="select_one" size="<?=$selectbox_size?>"></select>

			<div style="text-align:center;">
				<div style="width: 49%; margin-top: 5px; text-align:center; vertical-align: top; display: inline-block;">
					<label>Enable / Disable per project injection</label>
				</div>
				<div class="switch round small" style="margin-bottom: 0px; width: 15%; text-align:center; display: inline-block;">
					<input id="inject_project" class="flag_project" type="checkbox" />
					<label for="inject_project"></label>
				</div>
			</div>

			<div id="inject_boardlist_bundle">
				<table id="inject_tableboards" style="width: 100%"></table>
				<!--
				<label>Boards List</label>
				<select id="inject_boardlist" multiple="multiple" size="<?=$selectbox_size?>"></select>
				-->
			</div>

			<div style="text-align:center;">
				<div style="width: 49%; text-align:center; display: inline-block;">
					<label>On Boot</label>
					<select id="inject_autostart">
						<option value="false">False</option>
						<option value="true">True</option>
					</select>
				</div>
				<div style="width: 49%; text-align:center; display: inline-block;">
					<label>Force</label>
					<select id="inject_force">
						<option value="false">False</option>
						<option value="true">True</option>
					</select>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="large-12 columns">
				<button id="inject_plugin" class="custom_button">
					Inject
				</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="plugin_inject-output" />
	</fieldset>
</div>


<div id="modal-startstop-plugin" class="reveal-modal small" data-reveal>
	<section>
		<h3>Plugin Actions</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">

			<div style="text-align:center;">
				<div style="width: 49%; text-align:center; display: inline-block;">
					<label>Type</label>
					<select id="startstop_type" class="plugin_type">
						<option value="--">--</option>
						<option value="1">NodeJS</option>
						<option value="2">Python</option>
					</select>
				</div>
				<div style="width: 49%; text-align:center; display: inline-block;">
					<label>Category</label>
					<select id="startstop_category" class="plugin_category">
						<option value="--">--</option>
						<option value="sync">Sync</option>
						<option value="async">Async</option>
					</select>
				</div>
			</div>
			<div style="text-align:center;">
				<div style="width: 49%; text-align:center; display: inline-block;">
					<label>Plugin Name</label>
					<select id="startstop_name" class="plugin_name">
						<option value="--">--</option>
					</select>
				</div>
			</div>

			<label>Filtered Plugins</label>
			<select id="startstop_pluginlist" multiple="multiple" class="select_one" size="<?=$selectbox_size?>"></select>

			<div style="text-align:center;">
				<div style="width: 49%; margin-top: 5px; text-align:center; vertical-align: top; display: inline-block;">
					<label>Enable / Disable per project action</label>
				</div>
				<div class="switch round small" style="margin-bottom: 0px; width: 15%; text-align:center; display: inline-block;">
					<input id="startstop_project" class="flag_project" type="checkbox" />
					<label for="startstop_project"></label>
				</div>
			</div>

			<div id="startstop_boardlist_bundle">
				<table id="startstop_tableboards" style="width: 100%"></table>
				<!--
				<label>Boards List</label>
				<select id="startstop_boardlist" multiple="multiple" size="<?=$selectbox_size?>"></select>
				-->
			</div>

			<label>Parameters [OPTIONAL]</label>
			<textarea id="startstop_plugin_parameters" placeholder="Insert here the parameters (in json format)" name="text" rows="10"></textarea>
		</div>
		<div class="row">
			<div class="large-12 columns">
				<div style="text-align:center;" id="startstop_actions">
					<div style="width: 32%; text-align:center; display: inline-block;">
						<button id="start" class="custom_button startstop_plugin" style="float: none; display: inline-block;">
							Start
						</button>
					</div>
					<div style="width: 32%; text-align:center; display: inline-block;">
						<button id="stop" class="custom_button startstop_plugin" style="float: none; display: inline-block;">
							Stop
						</button>
					</div>
					<div style="width: 32%; text-align:center; display: inline-block;">
						<button id="restart" class="custom_button startstop_plugin" style="float: none; display: inline-block;">
							Restart
						</button>
					</div>
				</div>

				<div style="text-align:right;" id="call_actions">
					<div style="width: 30%; text-align:center; display: inline-block;">
						<button id="call_plugin" class="custom_button" style="float: none; display: inline-block;">
							Exec
						</button>
					</div>
				</div>
<!--
				<table class="table_info">
				<tr>
					<td style="text-align: center;">
						<button id="start" class="custom_button startstop_plugin" style="float: none; display: inline-block;">
							Start
						</button>
					</td>
					<td style="text-align: center;">
						<button id="stop" class="custom_button startstop_plugin" style="float: none; display: inline-block;">
							Stop
						</button>
					</td>
					<td style="text-align: center;">
						<button id="restart" class="custom_button startstop_plugin" style="float: none; display: inline-block;">
							Restart
						</button>
					</td>
				</tr>
				</table>
-->
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="plugin_startstop-output" />
		<p id="plugin_call-output" />
	</fieldset>
</div>


<!--
<div id="modal-call-plugin" class="reveal-modal small" data-reveal>
	<section>
		<h3>Call Plugin</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<label>Plugin Name</label>
			<select id="call_pluginlist"></select>

			<label>Boards List</label>
			<select id="call_boardlist" multiple="multiple" size="<?=$selectbox_size?>"></select>

			<label>Parameters</label>
			<textarea id="call_plugin_parameters" placeholder="Insert here the parameters (in json format)" name="text" rows="10"></textarea>
		</div>
		<div class="row">
			<div class="large-12 columns">
				<button id="call_plugin" class="custom_button">
					Exec
				</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="plugin_call-output" />
	</fieldset>
</div>
-->

<div id="modal-remove-plugins" class="reveal-modal small" data-reveal>
	<section>
		<h3>Remove Plugins</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<label>Boards List</label>
			<select id="remove_plugins_boardlist">
				<option value="--">--</option>
			</select>

			<div id="plugins_remove_table_section">
				<table id="plugins_remove_table" style="width: 100%"></table>
			</div>
		</div>
		<div class="row">
			<div class="large-12 columns">
				<button id="remove_plugins" class="custom_button">
					Remove
				</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="plugins_remove-output" />
	</fieldset>
</div>


<div id="modal-remove-plugin" class="reveal-modal small" data-reveal>
	<section>
		<h3>Remove Plugin</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">

			<div style="text-align:center;">
				<div style="width: 49%; text-align:center; display: inline-block;">
					<label>Type</label>
					<select id="removeplugin_type" class="plugin_type">
						<option value="--">--</option>
						<option value="1">NodeJS</option>
						<option value="2">Python</option>
					</select>
				</div>
				<div style="width: 49%; text-align:center; display: inline-block;">
					<label>Category</label>
					<select id="removeplugin_category" class="plugin_category">
						<option value="--">--</option>
						<option value="sync">Sync</option>
						<option value="async">Async</option>
					</select>
				</div>
			</div>
			<div style="text-align:center;">
				<div style="width: 49%; text-align:center; display: inline-block;">
					<label>Plugin Name</label>
					<select id="removeplugin_name" class="plugin_name">
						<option value="--">--</option>
					</select>
				</div>
			</div>

			<label>Filtered Plugins</label>
			<select id="removeplugin_pluginlist" multiple="multiple" class="select_one" size="<?=$selectbox_size?>"></select>

			<div style="text-align:center;">
				<div style="width: 49%; margin-top: 5px; text-align:center; vertical-align: top; display: inline-block;">
					<label>Enable / Disable per project remove</label>
				</div>
				<div class="switch round small" style="margin-bottom: 0px; width: 15%; text-align:center; display: inline-block;">
					<input id="removeplugin_project" class="flag_project" type="checkbox" />
					<label for="removeplugin_project"></label>
				</div>
			</div>

			<div id="removeplugin_boardlist_bundle">
				<table id="removeplugin_tableboards" style="width: 100%"></table>
				<!--
				<label>Boards List</label>
				<select id="removeplugin_boardlist" multiple="multiple" size="<?=$selectbox_size?>"></select>
				-->
			</div>
			<div class="row">
				<div class="large-12 columns">
					<button id="remove_plugin" class="custom_button">
						Remove
					</button>
				</div>
			</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="plugin_remove-output" />
	</fieldset>
</div>




<div id="modal-board-plugins" class="reveal-modal small" data-reveal>
	<section>
		<h3>Show Plugins on Board</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<label>Boards List</label>
			<select id="plugins_boardlist"></select>

			<div id="show_boardplugins_section">
				<table id="show_boardplugins_table" style="width: 100%"></table>
		</div>
	</section>
</div>
