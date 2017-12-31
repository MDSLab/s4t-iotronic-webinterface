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

<div id="modal-show-drivers" class="reveal-modal" data-reveal>
	<section>
		<h3>Drivers</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<table id="show_drivers_table" style="width: 100%"></table>
	</section>
</div>


<div id="modal-create-driver" class="reveal-modal small" data-reveal>
	<section>
		<h3>Create Driver</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<label>Driver Name</label>
			<input id="create_driver_name" type="text" placeholder="Driver Name" name="name" value="" />

			<label>Driver Json</label>
			<textarea id="create_driver_json" placeholder="Insert here the json" name="text" rows="5"></textarea>

			<label>Javascript Code</label>
			<input type="file" name="driver_userfile" id="driver_userfile" size="20" />
			<textarea id="create_driver_code" placeholder="Insert here the code" name="text" rows="15"></textarea>
		</div>
		<div class="row">
			<div class="large-12 columns">
				<button id="create_driver" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">
					Create
				</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="driver_create-output" />
	</fieldset>
</div>


<div id="modal-destroy-driver" class="reveal-modal" data-reveal>
	<section>
		<h3>Destroy Driver</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<table id="destroy_tabledrivers" style="width: 100%"></table>
		<div class="row">
			<div class="large-12 columns">
				<button id="destroy_driver" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">
					Remove
				</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="driver_destroy-output" />
	</fieldset>
</div>


<div id="modal-inject-driver" class="reveal-modal small" data-reveal>
	<section>
		<h3>Inject Driver</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<label>Driver Name</label>
			<select id="inject_driverlist"></select>

			<label>Boards List</label>
			<select id="inject_driver_boardlist" multiple="multiple" size="<?=$selectbox_size?>"></select>

			<label>On Boot</label>
			<select id="inject_driver_autostart">
				<option value="false">False</option>
				<option value="true">True</option>
			</select>
		</div>
		<div class="row">
			<div class="large-12 columns">
				<button id="inject_driver" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">
					Inject
				</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="driver_inject-output" />
	</fieldset>
</div>

<div id="modal-mount-driver" class="reveal-modal small" data-reveal>
	<section>
		<h3>Mount Driver</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<fieldset>
				<legend>Resource</legend>
				<div style="position: relative; width: 50%; overflow: auto; margin: auto; ">
					<input type="radio" id="mount_radio_local" checked onclick="toggle_radio_mount(this);"/>Local
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="radio" id="mount_radio_remote" onclick="toggle_radio_mount(this);"/>Remote
				</div>
			</fieldset>

			<label>Boards List (LOCAL)</label>
			<select id="mount_boardlist"></select>

			<div id="mount_div_remote">
				<label>Boards List (REMOTE)</label>
				<select id="mount_remote_boardlist"></select>
			</div>

			<label>Driver Name</label>
			<select id="mount_driverlist"></select>
		</div>
		<div class="row">
			<div class="large-12 columns">
				<button id="mount_driver" class="button tiny radius mount_umount_driver" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">
					Mount
				</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="driver_mount-output" />
	</fieldset>
</div>


<div id="modal-unmount-driver" class="reveal-modal small" data-reveal>
	<section>
		<h3>Unmount Driver</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<label>Boards List</label>
			<select id="unmount_boardlist"></select>

			<label>Driver Name</label>
			<select id="unmount_driverlist"></select>
		</div>
		<div class="row">
			<div class="large-12 columns">
				<button id="unmount_driver" class="button tiny radius mount_umount_driver" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">
					Unmount
				</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="driver_unmount-output" />
	</fieldset>
</div>

<div id="modal-write-driver" class="reveal-modal small" data-reveal>
	<section>
		<h3>Write Driver</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<label>Boards List</label>
			<select id="write_driver_boardlist"></select>

			<label>Driver</label>
			<select id="write_driverlist"></select>

			<label>File Name</label>
			<input id="write_filename" type="text" placeholder="File Name" name="name" value="">

			<label>File Content</label>
			<textarea id="write_file_content" placeholder="Insert here the text" name="text" rows="5"></textarea>
		</div>
		<div class="row">
			<div class="large-12 columns">
				<button id="write_driver" class="button tiny radius mount_umount_driver" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">
					Write
				</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="driver_write-output" />
	</fieldset>
</div>


<div id="modal-read-driver" class="reveal-modal small" data-reveal>
	<section>
		<h3>Read Driver</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<label>Boards List</label>
			<select id="read_driver_boardlist"></select>

			<label>Driver</label>
			<select id="read_driverlist"></select>

			<label>File Name</label>
			<input id="read_filename" type="text" placeholder="File Name" name="name" value="">

			<label>File Content</label>
			<textarea id="read_file_content" name="text" rows="5" readonly></textarea>
		</div>
		<div class="row">
			<div class="large-12 columns">
				<button id="read_driver" class="button tiny radius mount_umount_driver" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">
					Read
				</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="driver_read-output" />
	</fieldset>
</div>

<div id="modal-remove-driver" class="reveal-modal small" data-reveal>
	<section>
		<h3>Remove Driver</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<label>Boards List</label>
			<select id="remove_driver_boardlist">
				<option value="--">--</option>
			</select>
			<!--
			<label>Driver Name</label>
			<select id="remove_driverlist" multiple="multiple" size="<?=$selectbox_size?>"></select>
			-->
			<div id="driver_remove_table_section">
				<table id="driver_remove_table" style="width: 100%"></table>
			</div>
		</div>
		<div class="row">
			<div class="large-12 columns">
				<button id="remove_driver" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">
					Remove
				</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="driver_remove-output" />
	</fieldset>
</div>


<div id="modal-board-drivers" class="reveal-modal" data-reveal>
	<section>
		<h3>Show drivers on Board</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<label>Board List</label>
			<select id="drivers_boardlist"></select>

			<div id="show_boarddrivers_section">
				<table id="show_boarddrivers_table" style="width: 100%"></table>
			</div>
		</div>
	</section>
</div>

