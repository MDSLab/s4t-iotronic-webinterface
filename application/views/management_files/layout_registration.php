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

<div id="modal-show-layouts" class="reveal-modal small" data-reveal>
	<section>
		<h3>Layouts</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<table id="show_layouts_table" style="width: 100%"></table>
	</section>
</div>



<div id="modal-create-layout" class="reveal-modal small" data-reveal>
	<section>
		<h3>Add new Layout to the Cloud</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<label>Layout Model</label>
			<input id="layout_create_layoutmodel" type="text" placeholder="Model" value="" />

			<label>Manufacturer</label>
			<input id="layout_create_manufacturer" type="text" placeholder="Manufacturer" value="" />

			<label>Image</label>
			<input id="layout_create_image" type="text" placeholder="Image" value="" />
		</div>
		<div class="row">
			<div class="large-12 columns">
				<button id="create-layout" class="button small radius" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">Register</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="layout_create-output" />
	</fieldset>
</div>



<div id="modal-update-layout" class="reveal-modal small" data-reveal>
	<section>
		<h3>Update Layout</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<label>Layout</label>
			<select id="update_layoutlist">
				<option value="--">--</option>
			</select>

			<label>Model</label>
			<input id="layout_update_layoutmodel" type="text" placeholder="Model" value="" />

			<label>Manufacturer</label>
			<input id="layout_update_manufacturer" type="text" placeholder="Manufacturer" value="" />

			<label>Image</label>
			<input id="layout_update_image" type="text" placeholder="Image" value="" />
		</div>
		<div class="row">
			<div class="large-12 columns">
				<button id="update-layout" class="button small radius" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">Update</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="layout_update-output" />
	</fieldset>
</div>


<div id="modal-delete-layout" class="reveal-modal small" data-reveal>
	<section>
		<h3>Delete Layout from the Cloud</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<label>Layout</label>
			<select id="unregister_layoutlist">
				<option value="--">--</option>
			</select>
		</div>
		</fieldset>
		<div class="row">
			<div class="large-12 columns">
				<button id="unregister-layout" class="button small radius" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">
					Unregister
				</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="layout_delete-output" />
	</fieldset>
</div>
