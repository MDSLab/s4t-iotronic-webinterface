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

<div id="loading_bar"></div>

<div class="off-canvas-wrap" data-offcanvas>
	<div class="inner-wrap">
		<nav class="tab-bar">
			<section class="left-small">
				<a class="left-off-canvas-toggle menu-icon"><span></span></a>
			</section>

			<section class="middle tab-bar-section">
				<h1 class="title">Stack4Things</h1>
			</section>
			<section class="right-small">
				<a class="right-off-canvas-toggle menu-icon"><span>Support</span></a>
			</section>
		</nav>

		<aside class="left-off-canvas-menu">
			<ul class="off-canvas-list">
				<li><label>Management</label></li>
				<li class="has-submenu"><a href="#">Boards</a>
					<ul class="left-submenu">
						<li class="back"><a href="#">Back</a></li>
						<li><label>Boards</label></li>
						<li><a data-reveal-id="modal-show-boards">List</a></li>
						<li><a data-reveal-id="modal-register-new-board">Register</a></li>
						<li><a data-reveal-id="modal-update-board">Update</a></li>
						<li><a data-reveal-id="modal-unregister-board">Unregister</a></li>
						<li><a data-reveal-id="modal-action-board">Action</a></li>
					</ul>
				</li>
				<li class="has-submenu"><a href="#">Users</a>
					<ul class="left-submenu">
						<li class="back"><a href="#">Back</a></li>
						<li><label>Users</label></li>
						<li><a data-reveal-id="modal-show-users">List</a></li>
						<li><a data-reveal-id="modal-create-user">Create</a></li>
						<li><a data-reveal-id="modal-update-user">Update</a></li>
						<li><a data-reveal-id="modal-delete-user">Delete</a></li>
					</ul>
				</li>
				<li class="has-submenu"><a href="#">Projects</a>
					<ul class="left-submenu">
						<li class="back"><a href="#">Back</a></li>
						<li><label>Projects</label></li>
						<li><a data-reveal-id="modal-show-projects" >List</a></li>
						<li><a data-reveal-id="modal-create-project" >Create</a></li>
						<li><a data-reveal-id="modal-update-project" >Update</a></li>
						<li><a data-reveal-id="modal-delete-project" >Delete</a></li>
					</ul>
				</li>
				<li class="has-submenu"><a href="#">Layouts</a>
					<ul class="left-submenu">
						<li class="back"><a href="#">Back</a></li>
						<li><label>Layouts</label></li>
						<li><a data-reveal-id="modal-show-layouts">List</a></li>
						<li><a data-reveal-id="modal-create-layout">Create</a></li>
						<li><a data-reveal-id="modal-update-layout">Update</a></li>
						<li><a data-reveal-id="modal-delete-layout">Delete</a></li>
					</ul>
				</li>
				<li>
					<a href="" onclick="logout();">Logout</a>
				</li>
			</ul>
		</aside>

		<aside class="right-off-canvas-menu">
			<ul class="off-canvas-list">
				<li><label>Support</label></li>
				<li><a target="_blank" href="http://stack4things.unime.it/">Stack4Things</a></li>
				<li><a target="_blank" href="<?= $this -> config -> item('swagger_url')?>">API</a></li>
			</ul>
		</aside>

		<section class="main-section">
			<!-- content goes here -->
			<table id="table_mainview">
				<tr>
					<td style="width:20%" valign="middle">
						<div id="boards_project">
							<select id="select_project"></select>
						</div>
						<div id="wrapper">
							<div id="boards_status" style="text-align: center;"></div>
						        <ul id="boardlist_status"></ul>
						</div>
						<!--
						OLD VERSION
						<div class="blockstyle">
							<center><h3>Boards</h3></center></br>

							<select id="boardlist_status" size="<?=$selectbox_size?>" style="width:100%; height: auto"></select>
							<div>
								<div id="count-connected"><h3>Connected ( 0 )</h3></div>
								<select id="boardlist_c" size="<?=$selectbox_size?>" style="width:100%; height:200px" data-boardlist-selected="boardlist_c" data-reveal-id="modal-plugins_sensors-lists"></select>
					
								<div id="count-disconnected"><h3>Disconnected ( 0 )</h3></div>
								<select id="boardlist_d" size="<?=$selectbox_size?>" style="width:100%; height:200px" data-boardlist-selected="boardlist_d" data-reveal-id="modal-plugins_sensors-lists"></select>
							</div>
						</div>
						-->
					</td>
					<td style="width:75%" valign="middle">
						<div class="main-fieldset map-fieldset" id="mapdiv"></div>
					</td>
					<td id="iconbar_container" style="width:5%; padding-top: 9px; padding-right: 20px; padding-bottom: 9px; padding-left: 0px" valign="middle">
						<!--<div class="icon-bar vertical five-up">-->

						<div id="pre-menu"></div>
						<nav id="menu">
							<ul class="parent-menu">
								<? if ($this -> config -> item('load_cloud_services_management')): ?>
									<li>
										<a class="side-menu">
											<img src="<?= $this -> config -> site_url() ?>assets/images/foundation_svgs/fi-cloud.svg" >
											<label>Services</label>
										</a>
										<ul>
											<li><a data-reveal-id="modal-show-services">Show</a></li>
											<li><a data-reveal-id="modal-status-service">Actions</a></li>
											<li><a data-reveal-id="modal-register-service">Register</a></li>
											<li><a data-reveal-id="modal-update-service">Update</a></li>
											<li><a data-reveal-id="modal-delete-service">Delete</a></li>
											<li><a data-reveal-id="modal-board-services">Show board services</a></li>
										</ul>
									</li>
								<? endif ?>

								<? if ($this -> config -> item('load_plugin_management')): ?>
									<li>
										<a class="side-menu">
											<img src="<?= $this -> config -> site_url() ?>assets/images/foundation_svgs/fi-puzzle.svg" >
											<label>Plugin</label>
										</a>
										<ul>
											<li><a data-reveal-id="modal-startstop-plugin">Actions</a></li>
											<li><a data-reveal-id="modal-inject-plugin">Inject</a></li>
											<li><a data-reveal-id="modal-call-plugin">Call</a></li>
											<li><a data-reveal-id="modal-board-plugins">Show board plugins</a></li>
											<li><a data-reveal-id="modal-remove-plugin">Remove from board</a></li>
											<li><a data-reveal-id="modal-show-plugins">Show</a></li>
											<li><a data-reveal-id="modal-create-plugin">Create</a></li>
											<li><a data-reveal-id="modal-destroy-plugin">Destroy</a></li>
										</ul>
									</li>
								<? endif ?>

								<? if ($this -> config -> item('load_network_management')): ?>
									<li>
										<a class="side-menu">
											<img src="<?= $this -> config -> site_url() ?>assets/images/foundation_svgs/fi-link.svg" >
											<label>Network</label>
										</a>
										<ul>
											<li><a data-reveal-id="modal-show-networks">Show</a></li>
											<li><a data-reveal-id="modal-create-network">Create</a></li>
											<li><a data-reveal-id="modal-destroy-network">Destroy</a></li>
											<li><a data-reveal-id="modal-add-board-network">Add board</a></li>
											<li><a data-reveal-id="modal-remove-board-network">Remove board</a></li>
											<li><a data-reveal-id="modal-show-boards-network">Show boards in vnet</a></li>
											<li><a data-reveal-id="modal-board-networks">Show board vnets</a></li>
											<li><a data-reveal-id="modal-activate-boards-network">Enable boards</a></li>
										</ul>
									</li>
								<? endif ?>
								<? if ($this -> config -> item('load_gpio_management')): ?>
									<li>
										<a class="side-menu">
											<img src="<?= $this -> config -> site_url() ?>assets/images/foundation_svgs/fi-usb.svg" >
											<label>GPIO</label>
										</a>
										<ul>
											<li><a data-reveal-id="modal-pinmode-gpio">PIN mode</a></li>
											<li><a data-reveal-id="modal-readwrite-gpio">Read / Write</a></li>
										</ul>
									</li>
								<? endif ?>
								<? if ($this -> config -> item('load_driver_management')): ?>
									<li>
										<a class="side-menu">
											<img src="<?= $this -> config -> site_url() ?>assets/images/foundation_svgs/fi-database.svg" >
											<label>Driver</label>
										</a>
										<ul>
											<li><a data-reveal-id="modal-show-drivers">Show</a></li>
											<li><a data-reveal-id="modal-create-driver">Create</a></li>
											<li><a data-reveal-id="modal-destroy-driver">Destroy</a></li>
											<li><a data-reveal-id="modal-inject-driver">Inject</a></li>
											<li><a data-reveal-id="modal-mount-driver">Mount</a></li>
											<li><a data-reveal-id="modal-unmount-driver">Unmount</a></li>
											<li><a data-reveal-id="modal-write-driver">Write</a></li>
											<li><a data-reveal-id="modal-read-driver">Read</a></li>
											<li><a data-reveal-id="modal-remove-driver">Remove</a></li>
											<li><a data-reveal-id="modal-board-drivers">Show board drivers</a></li>
										</ul>
									</li>
								<? endif ?>
								<? if ($this -> config -> item('load_vfs_management')): ?>
									<li>
										<a class="side-menu">
											<img src="<?= $this -> config -> site_url() ?>assets/images/foundation_svgs/fi-page-multiple.svg" >
											<label>VFS</label>
										</a>
										<ul>
											<li><a data-reveal-id="modal-show-vfs">Show</a></li>
											<li><a data-reveal-id="modal-mount-vfs">Mount</a></li>
											<li><a data-reveal-id="modal-unmount-vfs">Unmount</a></li>
											<li><a data-reveal-id="modal-forcemount-vfs">Force Mount</a></li>
											<li><a data-reveal-id="modal-board-vfs">Show board vfs</a></li>
										</ul>
									</li>
								<? endif ?>
							</ul>
						</nav>
						<!--</div>-->
					</td>
				<tr>
			</table>
		</section>

		<a class="exit-off-canvas"></a>

	</div>
</div>

