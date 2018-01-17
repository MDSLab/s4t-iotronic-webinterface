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

<div id="modal-show-projects" class="reveal-modal" data-reveal>
	<section>
		<h3>Projects</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<table id="show_projects_table" style="width: 100%"></table>
	</section>
</div>



<div id="modal-create-project" class="reveal-modal small" data-reveal>
	<section>
		<h3>Add new Project to the Cloud</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<label>Name</label>
			<input id="project_create_projectname" type="text" placeholder="Project Name" value="" />

			<label>Description</label>
			<textarea id="project_create_description" placeholder="Description" name="text" rows="5"></textarea>
		</div>
		<div class="row">
			<div class="large-12 columns">
				<button id="create-project" class="custom_button">Register</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="project_create-output" />
	</fieldset>
</div>



<div id="modal-update-project" class="reveal-modal small" data-reveal>
	<section>
		<h3>Update Project</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<label>Project</label>
			<select id="update_projectlist">
				<option value="--">--</option>
			</select>

			<label>Name</label>
			<input id="project_update_projectname" type="text" placeholder="Project Name" value="" />

			<label>Description</label>
			<textarea id="project_update_description" placeholder="Description" name="text" rows="5"></textarea>

		</div>
		<div class="row">
			<div class="large-12 columns">
				<button id="update-project" class="custom_button">Update</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="project_update-output" />
	</fieldset>
</div>


<div id="modal-delete-project" class="reveal-modal small" data-reveal>
	<section>
		<h3>Delete Project from the Cloud</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">
			<label>Project</label>

			<select id="unregister_projectlist">
				<option value="--">--</option>
			</select>
		</div>
		<div class="row">
			<div class="large-12 columns">
				<button id="unregister-project" class="custom_button">
					Unregister
				</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="project_delete-output" />
	</fieldset>
</div>
