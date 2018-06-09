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

<div id="modal-show-project-requests" class="reveal-modal" data-reveal>
	<section>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>

		<input type="hidden" id="request_id" value="">

		<div class="project_requests">
			<h3>Requests</h3>

			<div id="deleterequest_requestlist_bundle">
				<!-- WORKING but not necessary anymore after introduction of DataTables -->
				<!--
				<div style="text-align:center">
					<div style="width: 10%; margin-top: 5px; text-align:right; vertical-align: top; display: inline-block;">
						<label>Search:</label>
					</div>
					<div style="text-align:center; display: inline-block; width: 60%">
						<input id="search_request" style="display: inline-block; width:80%; min-width: 200px; text-align: right">
					</div>

				</div>
				-->
				<table id="show_requests_table" class="display" cellspacing="0" style="width: 100%"></table>
			</div>


			<div class="row" style="">
				<div class="large-6 columns" style="text-align:left; padding-left: 0px">
					<div style="width: auto; margin-top: 0px; text-align:center; vertical-align: top; display: inline-block;">
						Select All
					</div>
					<div class="switch round tiny" style="margin-bottom: 0px; width: 15%; text-align:center; display: inline-block;">
						<input id="deleterequest_project" class="flag_project" type="checkbox" />
						<label for="deleterequest_project"></label>
					</div>
				</div>
				<div class="large-6 columns">
					<button id="remove_requests" class="custom_button" onclick="reload_project_requests()">Remove</button>
				</div>
			</div>
		</div>
		<div id="boards_x_request">
			<h3 name="request_text"></h3>
			<table id="show_request_boards_table" style="width: 100%"></table>
			<button class="custom_button" onclick="reload_project_requests()">Previous</button>
		</div>
		<div id="board_message">
			<h3 name="message_text"></h3>
			<div id="board_request_result"></div>
			<textarea id="board_request_message" rows="3" cols="50"></textarea>
			<button class="custom_button" onclick="return_request_boards(this)">Previous</button>
		</div>
	</section>
	<div class="project_requests">
		<fieldset>
			<legend>Output</legend>
			<p id="request_delete-output" />
		</fieldset>
	</div>
</div>
