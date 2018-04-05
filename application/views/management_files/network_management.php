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

<div id="modal-show-networks" class="reveal-modal" data-reveal>
	<section>
		<h3>Networks</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<table id="show_networks_table" style="width: 100%"></table>
	</section>
</div>


<div id="modal-create-network" class="reveal-modal small" data-reveal>
	<section>
		<h3>Create New Network</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<label>Network Name</label>
			<input id="create_network_name" type="text" placeholder="Network Name" name="name" value="" />

			<label>IP Address</label>
			<input id="create_network_ip" type="text" placeholder="IP Address (Example: 192.168.10.0/24)" name="ip" value="" />
		</div>
		<div class="row">
			<div class="large-12 columns">
				<button id="create_network" class="custom_button">
					Create
				</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="network_create-output" />
	</fieldset>
</div>




<div id="modal-destroy-network" class="reveal-modal" data-reveal>
	<section>
		<h3>Destroy Network</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<table id="destroy_tablenetworks" style="width: 100%"></table>
		</div>
		<div class="row">
			<div class="large-12 columns">
				<button id="destroy_network" class="custom_button">
					Remove
				</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="network_destroy-output" />
	</fieldset>
</div>



<div id="modal-add-board-network" class="reveal-modal small" data-reveal>
	<section>
		<h3>Add Board to Network</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<label>Network UUID</label>
			<select id="addboard_network_uuid"></select>

			<label>Boards</label>
			<select id="addboard_boardlist">
				<option value='--'>--</option>
			</select>

			<label>IP Address [OPTIONAL]</label>
			<input id="addboard_network_ip" type="text" placeholder="IP Address (Example: 192.168.10.10)" name="ip" value="" />
		</div>
		<div class="row">
			<div class="large-12 columns">
				<button id="addboard_network" class="custom_button">
					Add
				</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="network_add-board-output" />
	</fieldset>
</div>


<div id="modal-remove-board-network" class="reveal-modal" data-reveal>
	<section>
		<h3>Remove Board from Network</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<label>Network UUID</label>
			<select id="removeboard_network_uuid">
				<option value='--'>--</option>
			</select>

			<!--<label>Boards</label>
			<select id="removeboard_boardlist" multiple="multiple" size="<?=$selectbox_size?>"></select>-->
			<div id="network_removeboard_table_section">
				<table id="remove_tablenetworks" style="width: 100%"></table>
			</div>
		</div>
		<div class="row">
			<div class="large-12 columns">
				<button id="removeboard_network" class="custom_button">
					Remove
				</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="network_remove-board-output" />
	</fieldset>
</div>



<div id="modal-show-boards-network" class="reveal-modal" data-reveal>
	<section>
		<h3>Show Boards in vnet</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<label>Networks List</label>
			<select id="show_boards_vnetlist"></select>

			<div id="network_showboards_table_section">
				<table id="showboards_tablenetworks" style="width: 100%"></table>
			</div>
		</div>
	</section>
</div>




<div id="modal-board-networks" class="reveal-modal small" data-reveal>
	<section>
		<h3>Show networks on Board</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<label>Board List</label>
			<select id="networks_boardlist"></select>

			<div id="show_boardnetworks_section">
				<table id="show_boardnetworks_table" style="width: 100%"></table>
			</div>
		</div>
	</section>
</div>


<div id="modal-activate-boards-network" class="reveal-modal small" data-reveal>
	<section>
		<h3>Active Network on Board</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<label>Board</label>
			<select id="activate_boardnet_boardlist"></select>
		</div>
		<div class="row">
			<div class="large-12 columns">
				<button id="activate_boardnet_network" class="custom_button">
					Activate
				</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="network_activate-board-output" />
	</fieldset>
</div>

