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

<div id="modal-show-vfs" class="reveal-modal" data-reveal>
	<section>
		<h3>vfs</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<table id="show_vfs_table" style="width: 100%"></table>
	</section>
</div>



<div id="modal-mount-vfs" class="reveal-modal small" data-reveal>
	<section>
		<h3>Mount VFS</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<fieldset>
			<legend>Mount In</legend>
			<div class="row">
				<label>Board</label>
				<select id="mount_vfs_in_boardlist">
					<option value="--">--</option>
				</select>

				<label>Path</label>
				<input id="mount_vfs_in_path" type="text" placeholder="/opt/aaaa" name="in_path" value="" />
			</div>
		</fieldset>
		<fieldset>
			<legend>Mount From</legend>
			<div class="row">
				<label>Board</label>
				<select id="mount_vfs_from_boardlist">
					<option value="--">--</option>
				</select>

				<label>Path</label>
				<input id="mount_vfs_from_path" type="text" placeholder="/opt/bbbb" name="from_path" value="" />
			</div>
		</fieldset>
		<div class="row">
			<div class="large-12 columns">
				<button id="mount_vfs" class="custom_button">
					Mount
				</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="vfs_mount-output" />
	</fieldset>
</div>


<div id="modal-unmount-vfs" class="reveal-modal" data-reveal>
	<section>
		<h3>Unmount VFS</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<label>Board From</label>
			<select id="unmount_vfs_in_boardlist">
				<option value="--">--</option>
			</select>

			<!--
			<label>Node From</label>
				<select id="unmount_vfs_from_boardlist">
					<option value=></option>
				</select>
			-->

			<div id="unmount_table_section">
				<label>Mounted Dir(s)</label>
				<table id="unmount_vfs_tabledirs" style="width: 100%"></table>
			</div>
		</div>
		<div class="row">
			<div class="large-12 columns">
				<button id="unmount_vfs" class="custom_button">
					Unmount
				</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="vfs_unmount-output" />
	</fieldset>
</div>


<div id="modal-forcemount-vfs" class="reveal-modal small" data-reveal>
	<section>
		<h3>Force Mount VFS</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<fieldset>
			<legend>Mount In</legend>
			<div class="row">
				<label>Board</label>
				<select id="forcemount_vfs_in_boardlist">
					<option value="--">--</option>
				</select>

				<label>Path</label>
				<input id="forcemount_vfs_in_path" type="text" placeholder="/opt/aaaa" name="in_path" value="" />
			</div>
		</fieldset>
		<fieldset>
			<legend>Mount From</legend>
			<div class="row">
				<label>Board</label>
				<select id="forcemount_vfs_from_boardlist">
					<option value="--">--</option>
				</select>

				<label>Path</label>
				<input id="forcemount_vfs_from_path" type="text" placeholder="/opt/bbbb" name="from_path" value="" />
			</div>
		</fieldset>
		<div class="row">
			<div class="large-12 columns">
				<button id="forcemount_vfs" class="custom_button">
					Mount
				</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="vfs_forcemount-output" />
	</fieldset>
</div>


<div id="modal-board-vfs" class="reveal-modal" data-reveal>
	<section>
		<h3>Show vfs active on Board</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<label>Board List</label>
			<select id="vfs_boardlist"></select>

			<div id="show_boardvfs_section">
				<table id="show_boardvfs_table" style="width: 100%"></table>
			</div>
		</div>
	</section>
</div>

