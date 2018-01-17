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



<div id="modal-create-plugin" class="reveal-modal small" data-reveal>
	<section>
		<h3>Create Plugin</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<label>Plugin Name</label>
			<input id="create_plugin_name" type="text" placeholder="Plugin Name" name="name" value="" />

			<label>Category</label>
			<select id="create_plugin_category">
				<option value="async">async</option>
				<option value="sync">sync</option>
			</select>

			<label>Plugin Json</label>
			<textarea id="create_plugin_json" placeholder="Insert here the json" name="text" rows="5"></textarea>

			<label>Javascript Code</label>
			<input type="file" name="userfile" id="userfile" size="20" />
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
			<label>Plugin Name</label>
			<select id="inject_pluginlist"></select>

			<label>Boards List</label>
			<select id="inject_boardlist" multiple="multiple" size="<?=$selectbox_size?>"></select>

			<label>On Boot</label>
			<select id="inject_autostart">
				<option value="false">False</option>
				<option value="true">True</option>
			</select>

			<!-- test -->
			<!--
			<div class="switch round tiny">
				<input id="inject_test" type="checkbox" name="test">
				<label for="inject_test"></label>
			</div>
			-->
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
			<label>Plugin Name</label>
			<select id="startstop_pluginlist"></select>

			<label>Boards List</label>
			<select id="startstop_boardlist" multiple="multiple" size="<?=$selectbox_size?>"></select>

			<label>Plugin Json [OPTIONAL if stopping]</label>
			<textarea id="startstop_plugin_json" placeholder="Insert here the json" name="text" rows="10"></textarea>
		</div>
		<div class="row">
			<div class="large-12 columns">
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
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="plugin_startstop-output" />
	</fieldset>
</div>



<div id="modal-call-plugin" class="reveal-modal small" data-reveal>
	<section>
		<h3>Call Plugin</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<label>Plugin Name</label>
			<select id="call_pluginlist"></select>

			<label>Boards List</label>
			<select id="call_boardlist" multiple="multiple" size="<?=$selectbox_size?>"></select>

			<label>Plugin Json</label>
			<textarea id="call_plugin_json" placeholder="Insert here the json" name="text" rows="10"></textarea>
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


<div id="modal-remove-plugin" class="reveal-modal" data-reveal>
	<section>
		<h3>Remove Plugin</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<label>Boards List</label>
			<select id="remove_plugin_boardlist">
				<option value="--">--</option>
			</select>

			<div id="plugin_remove_table_section">
				<table id="plugin_remove_table" style="width: 100%"></table>
			</div>
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


<div id="modal-board-plugins" class="reveal-modal" data-reveal>
	<section>
		<h3>Show Plugins on Board</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<label>Board List</label>
			<select id="plugins_boardlist"></select>

			<div id="show_boardplugins_section">
				<table id="show_boardplugins_table" style="width: 100%"></table>
		</div>
	</section>
</div>
