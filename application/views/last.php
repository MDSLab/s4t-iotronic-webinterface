
<!-- START web page layout -->

<!-- GLOBAL VARIABLES -->
<? $selectbox_size = 6; ?>
<? $ckan_selectbox_size = 12; ?>

<!-- <?= print_r($post_results) ?> -->

<!-- LOADING GIF -->
<div id="loading_bar"></div>

<table style="width:99%; margin: 0 auto">
	<td valign="top">
		<div style="width:320px;overflow: auto;">
			<center><h2>Boards</h2></center>
	                <table style="width:100%" border="0" >
                        <tr style="height:50%">
                                <td>
					<center><div id="count-connected"></center>
					<select id="yunlist_c" size="<?=$selectbox_size?>" style="width:290px; height:200px" data-yunlist-selected="yunlist_c" data-reveal-id="modal-plugins_sensors-lists"></select>
                                </td>
                        </tr>
                        <tr style="height:50%">
                                <td>
					<center><div id="count-disconnected"></center>
					<select id="yunlist_d" size="<?=$selectbox_size?>" style="width:290px; height:200px" data-yunlist-selected="yunlist_d" data-reveal-id="modal-plugins_sensors-lists"></select>
                                </td>
                        </tr>
			<tr>
				<td>
					<center>
						<button class="button tiny radius" data-reveal-id="modal-register-new-board" onclick="$('#board-registration-output').empty(); generate_uuid(); sensor_list(); refresh_lists();">Register</button>
						<button class="button tiny radius" data-reveal-id="modal-update-board" onclick="$('#board-update-output').empty(); update_boards('update_yunlist'); refresh_lists();">Update</button>
						<button class="button tiny radius" data-reveal-id="modal-unregister-board" onclick="$('#board-unregistration-output').empty(); update_boards('unregister_boardlist'); refresh_lists();">Unregister</button>
					</center>
				</td>
			</tr>

        	        </table>
		</div>
	</td>
	<td valign="top">
        	<table border="0" style="width:100%" >
                        <tr style="height:20%">
                                <center><h2>Commands</h2></center>
				<td style='text-align: center'>
                                        <center><h3>Board Management</h3></center>
					<button class="button tiny radius" data-reveal-id="modal-led-management" onclick="$('#led-output').empty(); update_boards('led_yunlist', 'C'); refresh_lists();">LED</button>
					<button class="button tiny radius" data-reveal-id="modal-ssh-management" onclick="$('#ssh-output').empty(); update_boards('ssh_yunlist', 'C'); refresh_lists();">SSH</button>
                                </td>
                        </tr>
			<tr style="height:20%">
				<td style='text-align: center'>
					<center><h3>Driver Management</h3></center>
					<button class="button tiny radius" data-reveal-id="modal-create-driver" onclick="$('#create-driver-output').empty(); refresh_lists();">Create</button>
					<button class="button tiny radius" data-reveal-id="modal-destroy-driver" onclick="$('#destroy-driver-output').empty(); refresh_cloud_drivers('destroy_driverlist'); refresh_lists();">Remove from Cloud</button>
					<button class="button tiny radius" data-reveal-id="modal-inject-driver" onclick="$('#inject-driver-output').empty(); refresh_cloud_drivers('inject_driverlist'); update_boards('inject_driver_yunlist', 'C'); refresh_lists();">Inject</button>
					<button class="button tiny radius" data-reveal-id="modal-mount-driver" onclick="$('#mount-driver-output').empty(); update_boards('mount_yunlist', 'C'); $('#mount_div_remote').hide(); refresh_lists();">Mount</button>
					<button class="button tiny radius" data-reveal-id="modal-unmount-driver" onclick="$('#unmount-driver-output').empty(); update_boards('unmount_yunlist', 'C'); refresh_lists();">Unmount</button>
					<button class="button tiny radius" data-reveal-id="modal-write-driver" onclick="$('#write-driver-output').empty(); update_boards('write_driver_yunlist', 'C'); refresh_lists();">Write</button>
					<button class="button tiny radius" data-reveal-id="modal-read-driver" onclick="$('#read-driver-output').empty(); update_boards('read_driver_yunlist', 'C'); refresh_lists();">Read</button>
					<button class="button tiny radius" data-reveal-id="modal-remove-driver" onclick="$('#remove-driver-output').empty(); update_boards('remove_driver_yunlist', 'C'); refresh_lists();">Remove from Board</button>
				</td>
			</tr>
                        <tr style="height:20%">
				<td style='text-align: center'>
                                        <center><h3>Plugin Management</h3></center>
                                        <button class="button tiny radius" data-reveal-id="modal-create-plugin" onclick="$('#create-plugin-output').empty(); refresh_lists();">Create</button>
					<button class="button tiny radius" data-reveal-id="modal-destroy-plugin" onclick="$('#destroy-plugin-output').empty(); refresh_cloud_plugins('destroy_pluginlist'); refresh_lists();">Remove from Cloud</button>
                                        <button class="button tiny radius" data-reveal-id="modal-inject-plugin" onclick="$('#inject-plugin-output').empty(); refresh_cloud_plugins('inject_pluginlist'); update_boards('inject_yunlist', 'C'); refresh_lists();">Inject</button>
					<button class="button tiny radius" data-reveal-id="modal-startstop-plugin" onclick="$('#startstop-plugin-output').empty(); refresh_cloud_plugins('startstop_pluginlist'); update_boards('startstop_yunlist', 'C'); refresh_lists();">Start/Stop</button>
                                        <button class="button tiny radius" data-reveal-id="modal-call-plugin" onclick="$('#call-plugin-output').empty(); refresh_cloud_plugins('call_pluginlist'); update_boards('call_yunlist', 'C'); refresh_lists();">Call</button>
					<button class="button tiny radius" data-reveal-id="modal-remove-plugin" onclick="$('#remove-plugin-output').empty(); update_boards('remove_plugin_yunlist', 'C'); refresh_lists();">Remove from Board</button>
                                </td>
                        </tr>
                        <tr style="height:20%">
				<td style='text-align: center'>
                                        <center><h3>Network Management</h3></center>
					<button class="button tiny radius" data-reveal-id="modal-show-networks" onclick="refresh_lists();">Show Networks</button>
                                        <button class="button tiny radius" data-reveal-id="modal-create-net" onclick="$('#create-net-output').empty(); refresh_lists();">Create Network</button>
                                        <button class="button tiny radius" data-reveal-id="modal-destroy-net" onclick="$('#destroy-net-output').empty(); update_nets('destroy_network_uuid'); refresh_lists();">Destroy Network</button>
                                        <button class="button tiny radius" data-reveal-id="modal-add-board-net" onclick="$('#add-board-net-output').empty(); update_nets('addboard_network_uuid'); update_boards('addboard_yunlist', 'C'); refresh_lists();">Add Board</button>
                                        <button class="button tiny radius" data-reveal-id="modal-remove-board-net" onclick="$('#remove-board-net-output').empty(); update_nets('removeboard_network_uuid'); update_boards('removeboard_yunlist', 'C'); refresh_lists();">Remove Board</button>
                                        <button class="button tiny radius" data-reveal-id="modal-show-boards-net" onclick="$('#show_boards-output').empty(); update_nets('show_boards_uuid'); refresh_lists();">Show Boards</button>
					<button class="button tiny radius" data-reveal-id="modal-activate-boards-net" onclick="$('#activate-board-net-output').empty(); update_boards('activate_boardnet_yunlist', 'C'); refresh_lists();">Start Network on Board</button>
                                </td>
                        </tr>
                </table>
        </td>
</table>

<!-- STOP web page layout -->



<!-- START modal section -->

<div id="modal-plugins_sensors-lists" class="reveal-modal small" data-reveal>
        <section>
                <h3>Sensors and Plugins on Board</h3>
                <a class="close-reveal-modal" aria-label="Close">&#215;</a>
                <fieldset>
                        <div class="row">
				<div id="info-label"></div>
				<div id="info-uuid"></div>

				<table style="width: 100%">
				<tr>
					<td style="width: 50%">
		                                <fieldset>
        		                                <legend>Coordinates</legend>
                		                                <div id="info-lat"></div>
                        		                        <div id="info-lon"></div>
                                		                <div id="info-alt"></div>
		                                </fieldset>
					</td>
					<td>
		                                <label><b>Sensors</b></label>
                		                        <select id="sensors_on_board" multiple="multiple" size="<?=$selectbox_size?>"></select>
					</td>
				</tr>
				</table>

                                <label><b>Plugins</b></label>
                                        <select id="plugins_on_board" multiple="multiple" size="<?=$selectbox_size?>"></select>

                                <label><b>Drivers</b></label>
                                        <select id="drivers_on_board" multiple="multiple" size="<?=$selectbox_size?>"></select>
                        </div>
                </fieldset>
        </section>
</div>


								<!-- BOARD MANAGEMENT -->
<!-- ####################################################################################################################################################### -->
<div id="modal-led-management" class="reveal-modal small" data-reveal>
        <section>
                <h3>LED management</h3>
                <a class="close-reveal-modal" aria-label="Close">&#215;</a>
                   <fieldset>
                        <legend>LEDs</legend>
                        <div class="row">
                                <label>Board List</label>
					<select id="led_yunlist" multiple="multiple" size="<?=$selectbox_size?>"></select>

				<label>Select PIN (example: YUN led on pin 13)</label>
                                <select id="pin">
					<!--
                                        <option value="0">0</option>
                                        <option value="1">1</option>
					<option value="...">...</option>
					-->
					<option value="13">13</option>
                                </select>
				<label>LED Status</label>
                                <select id="led-action">
                                        <option value="1">ON</option>
                                        <option value="0">OFF</option>
                                </select>
                        </div>
                   </fieldset>
                   <div class="row">
                    <div class="large-12 columns">
			<button id="led-management" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">
                            Send
                        </button>
                    </div>
                   </div>
        </section>
	<fieldset>
		<legend>Output</legend>
		<p id="led-output" />
	</fieldset>
</div>


<div id="modal-ssh-management" class="reveal-modal small" data-reveal>
        <section>
                <h3>SSH management</h3>
                <a class="close-reveal-modal" aria-label="Close">&#215;</a>
                   <fieldset>
                        <legend>SSH</legend>
                        <div class="row">
                                <label>Board List</label>
					<select id="ssh_yunlist" multiple="multiple" size="<?=$selectbox_size?>"></select>

                                <label>SSH Status</label>
                                <select id="ssh-action">
                                        <option value="start">Start</option>
                                        <option value="stop">Stop</option>
                                </select>

                        </div>
                   </fieldset>
                   <div class="row">
                    <div class="large-12 columns">
                        <button id="ssh-management" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">
                            Send
                        </button>
                    </div>
                   </div>
        </section>
        <fieldset>
                <legend>Output</legend>
                <p id="ssh-output" />
        </fieldset>
</div>

<!-- ####################################################################################################################################################### -->




									<!-- REGISTRATION MANAGEMENT -->
<!-- ####################################################################################################################################################### -->
<div id="modal-register-new-board" class="reveal-modal small" data-reveal>
        <section>
                <h3>Add new board to the Cloud</h3>
                <a class="close-reveal-modal" aria-label="Close">&#215;</a>
                   <fieldset>
                        <legend>Registration</legend>
                        <div class="row">
                                <label>Board Code</label>
                                        <input id="registration_name" type="text" placeholder="Board Name" value="" />

				<label>Label</label>
					<input id="registration_label" type="text" placeholder="Label" value="" />

                                <label>Latitude (example: 38.12345678)</label>
                                        <input id="registration_latitude" type="text" placeholder="Latitude" value="" />

                                <label>Longitude (example: 15.12345678)</label>
                                        <input id="registration_longitude" type="text" placeholder="Longitude" value="" />

                                <label>Altitude (example: 150.12345678)</label>
                                        <input id="registration_altitude" type="text" placeholder="Altitude" value="" />

				<label>Net enabled</label>
					<select id="registration_net_enabled">
						<option value="0">False</option>
						<option value="1">True</option>
					</select>

				<label>Sensors On Board</label>
					<fieldset>
						<center><div id="registration_sensor_list"></div></center>
					</fieldset>

                        </div>
                   </fieldset>
                   <div class="row">
                    <div class="large-12 columns">
                        <button id="register-board" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">
                            Register
                        </button>
                    </div>
                   </div>
        </section>
        <fieldset>
                <legend>Output</legend>
                <p id="board-registration-output" />
        </fieldset>
</div>


<div id="modal-update-board" class="reveal-modal small" data-reveal>
        <section>
                <h3>Modify Board</h3>
                <a class="close-reveal-modal" aria-label="Close">&#215;</a>
                   <fieldset>
                        <legend>Update</legend>
                        <div class="row">
                                <label>Board Code</label>
					<select id="update_yunlist">
						<option value="--">--</option>
					</select>

				<label>Label</label>
					<input id="update_label" type="text" placeholder="Label" value="" />

                                <label>Latitude (example: 38.12345678)</label>
                                        <input id="update_latitude" type="text" placeholder="Latitude" value="" />

                                <label>Longitude (example: 15.12345678)</label>
                                        <input id="update_longitude" type="text" placeholder="Longitude" value="" />

                                <label>Altitude (example: 150.12345678)</label>
                                        <input id="update_altitude" type="text" placeholder="Altitude" value="" />

                                <label>Net enabled</label>
                                        <select id="update_net_enabled">
						<option value="0">False</option>
                                                <option value="1">True</option>
                                        </select>

                                <label>Sensors On Board</label>
                                        <fieldset>
                                                <center><div id="update_sensor_list"></div></center>
                                        </fieldset>

                        </div>
                   </fieldset>
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
                <p id="board-update-output" />
        </fieldset>
</div>


<div id="modal-unregister-board" class="reveal-modal small" data-reveal>
        <section>
                <h3>Remove board from the Cloud</h3>
                <a class="close-reveal-modal" aria-label="Close">&#215;</a>
                   <fieldset>
                        <legend>Unregistration</legend>
                        <div class="row">
                                <label>Board Code</label>

				<select id="unregister_boardlist">
                                	<option value="--">--</option>
                                </select>
                        </div>
                   </fieldset>
                   <div class="row">
                    <div class="large-12 columns">
                        <button id="unregister-board" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">
                            Unregister
                        </button>
                    </div>
                   </div>
        </section>
        <fieldset>
                <legend>Output</legend>
                <p id="board-unregistration-output" />
        </fieldset>
</div>
<!-- ####################################################################################################################################################### -->



									<!-- DRIVER SECTION-->
<!-- ####################################################################################################################################################### -->
<div id="modal-create-driver" class="reveal-modal small" data-reveal>
        <section>
                <h3>Create Driver</h3>
                <a class="close-reveal-modal" aria-label="Close">&#215;</a>
                   <fieldset>
                        <legend>Driver Management</legend>
                        <div class="row">
                                <label>Driver Name</label>
                                        <input id="create_driver_name" type="text" placeholder="Driver Name" name="name" value="" />

                                <label>Driver Json</label>
                                        <textarea id="create_driver_json" placeholder="Insert here the json" name="text" rows="5"></textarea>

                                <label>Javascript Code</label>
                                        <input type="file" name="driver_userfile" id="driver_userfile" size="20" />
                                        <textarea id="create_driver_code" placeholder="Insert here the code" name="text" rows="15"></textarea>
                        </div>
                   </fieldset>
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
                <p id="create-driver-output" />
        </fieldset>
</div>


<div id="modal-destroy-driver" class="reveal-modal small" data-reveal>
        <section>
                <h3>Destroy Driver</h3>
                <a class="close-reveal-modal" aria-label="Close">&#215;</a>
                   <fieldset>
                        <legend>Driver Management</legend>
                        <div class="row">
                                <label>Driver Name</label>
                                        <select id="destroy_driverlist" multiple="multiple" size="<?=$selectbox_size?>"></select>
                        </div>
                   </fieldset>
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
                <p id="destroy-driver-output" />
        </fieldset>
</div>


<div id="modal-inject-driver" class="reveal-modal small" data-reveal>
        <section>
                <h3>Inject Driver</h3>
                <a class="close-reveal-modal" aria-label="Close">&#215;</a>
                   <fieldset>
                        <legend>Driver Management</legend>
                        <div class="row">
                                <label>Driver Name</label>
                                        <select id="inject_driverlist"></select>

                                <label>Board List</label>
                                        <select id="inject_driver_yunlist" multiple="multiple" size="<?=$selectbox_size?>"></select>

                                <label>Autostart</label>
                                        <select id="inject_driver_autostart">
                                                <option value="false">False</option>
                                                <option value="true">True</option>
                                        </select>

                        </div>
                   </fieldset>
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
                <p id="inject-driver-output" />
        </fieldset>
</div>


<div id="modal-mount-driver" class="reveal-modal small" data-reveal>
        <section>
                <h3>Mount Driver</h3>
                <a class="close-reveal-modal" aria-label="Close">&#215;</a>
                   <fieldset>
                        <legend>Driver Management</legend>
                        <div class="row">
				<fieldset>
					<legend>Resource</legend>
						<div style="position: relative; width: 50%; overflow: auto; margin: auto; ">
							<input type="radio" id="mount_radio_local" checked onclick="toggle_radio_mount(this);"/>Local
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<input type="radio" id="mount_radio_remote" onclick="toggle_radio_mount(this);"/>Remote
						</div>
				</fieldset>

				<label>Board List (LOCAL)</label>
					<select id="mount_yunlist"></select>

				<div id="mount_div_remote">
					<label>Board List (REMOTE)</label>
						<select id="mount_remote_yunlist"></select>
				</div>

                                <label>Driver Name</label>
					<select id="mount_driverlist"></select>

                        </div>
                   </fieldset>
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
                <p id="mount-driver-output" />
        </fieldset>
</div>


<div id="modal-unmount-driver" class="reveal-modal small" data-reveal>
        <section>
                <h3>Unmount Driver</h3>
                <a class="close-reveal-modal" aria-label="Close">&#215;</a>
                   <fieldset>
                        <legend>Driver Management</legend>
                        <div class="row">
                                <label>Board List</label>
                                        <select id="unmount_yunlist"></select>

                                <label>Driver Name</label>
                                        <select id="unmount_driverlist"></select>

                        </div>
                   </fieldset>
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
                <p id="unmount-driver-output" />
        </fieldset>
</div>


<div id="modal-write-driver" class="reveal-modal small" data-reveal>
        <section>
                <h3>Write Driver</h3>
                <a class="close-reveal-modal" aria-label="Close">&#215;</a>
                   <fieldset>
                        <legend>Driver Management</legend>
                        <div class="row">
                                <label>Board List</label>
                                        <select id="write_driver_yunlist"></select>

                                <label>Driver Name</label>
					<select id="write_driverlist"></select>

                                <label>File Name</label>
					<input id="write_filename" type="text" placeholder="File Name" name="name" value="">

                                <label>File Content</label>
                                        <textarea id="write_file_content" placeholder="Insert here the text" name="text" rows="5"></textarea>
                        </div>
                   </fieldset>
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
                <p id="write-driver-output" />
        </fieldset>
</div>


<div id="modal-read-driver" class="reveal-modal small" data-reveal>
        <section>
                <h3>Read Driver</h3>
                <a class="close-reveal-modal" aria-label="Close">&#215;</a>
                   <fieldset>
                        <legend>Driver Management</legend>
                        <div class="row">
                                <label>Board List</label>
                                        <select id="read_driver_yunlist"></select>

                                <label>Driver Name</label>
                                        <select id="read_driverlist"></select>

                                <label>File Name</label>
                                        <input id="read_filename" type="text" placeholder="File Name" name="name" value="">

                                <label>File Content</label>
                                        <textarea id="read_file_content" name="text" rows="5" readonly></textarea>
                        </div>
                   </fieldset>
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
                <p id="read-driver-output" />
        </fieldset>
</div>


<div id="modal-remove-driver" class="reveal-modal small" data-reveal>
        <section>
                <h3>Remove Driver</h3>
                <a class="close-reveal-modal" aria-label="Close">&#215;</a>
                <fieldset>
                        <legend>Driver Management</legend>
                        <div class="row">
                                <label>Board List</label>
                                        <select id="remove_driver_yunlist">
                                                <option value="--">--</option>
                                        </select>

                                <label>Driver Name</label>
                                        <select id="remove_driverlist" multiple="multiple" size="<?=$selectbox_size?>"></select>

                        </div>
                </fieldset>
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
                <p id="remove-driver-output" />
        </fieldset>
</div>

<!-- ####################################################################################################################################################### -->


									<!-- PLUGIN MANAGEMENT -->
<!-- ####################################################################################################################################################### -->
<div id="modal-create-plugin" class="reveal-modal small" data-reveal>
        <section>
                <h3>Create Plugin</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
                   <fieldset>
                        <legend>Plugin Management</legend>
                        <div class="row">
                                <label>Plugin Name</label>
                                        <input id="create_plugin_name" type="text" placeholder="Plugin Name" name="name" value="" />

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
                   </fieldset>
                   <div class="row">
                    <div class="large-12 columns">
			<button id="create_plugin" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">
                            Create
                        </button>
                    </div>
                   </div>
        </section>
        <fieldset>
                <legend>Output</legend>
                <p id="create-plugin-output" />
        </fieldset>
</div>


<div id="modal-destroy-plugin" class="reveal-modal small" data-reveal>
        <section>
                <h3>Destroy Plugin</h3>
                <a class="close-reveal-modal" aria-label="Close">&#215;</a>
                   <fieldset>
                        <legend>Plugin Management</legend>
                        <div class="row">
                                <label>Plugin Name</label>
					<select id="destroy_pluginlist" multiple="multiple" size="<?=$selectbox_size?>"></select>
                        </div>
                   </fieldset>
                   <div class="row">
                    <div class="large-12 columns">
                        <button id="destroy_plugin" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">
                            Remove
                        </button>
                    </div>
                   </div>
        </section>
        <fieldset>
                <legend>Output</legend>
                <p id="destroy-plugin-output" />
        </fieldset>
</div>


<div id="modal-inject-plugin" class="reveal-modal small" data-reveal>
        <section>
                <h3>Inject Plugin</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
                   <fieldset>
                        <legend>Plugin Management</legend>
                        <div class="row">
                                <label>Plugin Name</label>
					<select id="inject_pluginlist"></select>
                                
                                <label>Board List</label>
					<select id="inject_yunlist" multiple="multiple" size="<?=$selectbox_size?>"></select>
                                
				<label>Autostart</label>
					<select id="inject_autostart">
						<option value="false">False</option>
						<option value="true">True</option>
					</select>
				
                        </div>
                   </fieldset>
                   <div class="row">
                    <div class="large-12 columns">
			<button id="inject_plugin" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">
                            Inject
                        </button>
                    </div>
                   </div>
        </section>
        <fieldset>
                <legend>Output</legend>
                <p id="inject-plugin-output" />
        </fieldset>
</div>


<div id="modal-startstop-plugin" class="reveal-modal small" data-reveal>
        <section>
                <h3>Start/Stop Plugin</h3>
                <a class="close-reveal-modal" aria-label="Close">&#215;</a>
                   <fieldset>
                        <legend>Plugin Management</legend>
                        <div class="row">
                                <label>Plugin Name</label>
                                        <!-- <input id="startstop_plugin_name" type="text" placeholder="Plugin Name" name="name" value="" /> -->
                                        <select id="startstop_pluginlist"></select>

                                <label>Board List</label>
					<select id="startstop_yunlist" multiple="multiple" size="<?=$selectbox_size?>"></select>

                                <label>Plugin Json [OPTIONAL if stopping]</label>
                                        <textarea id="startstop_plugin_json" placeholder="Insert here the json" name="text" rows="10"></textarea>

                        </div>
                   </fieldset>
                   <div class="row">
                    <div class="large-12 columns">
			<button id="start" class="button tiny radius startstop_plugin" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">
                            Start
                        </button>
			<button id="stop" class="button tiny radius startstop_plugin" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">
                            Stop
                        </button>
                    </div>
                   </div>
        </section>
        <fieldset>
                <legend>Output</legend>
                <p id="startstop-plugin-output" />
        </fieldset>
</div>



<div id="modal-call-plugin" class="reveal-modal small" data-reveal>
	<section>
		<h3>Call Plugin</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<fieldset>
			<legend>Plugin Management</legend>
			<div class="row">
				<label>Plugin Name</label>
					<!-- <input id="call_pluginlist" type="text" placeholder="Plugin Name" name="name" value="" /> -->
					<select id="call_pluginlist"></select>

				<label>Board List</label>
					<select id="call_yunlist" multiple="multiple" size="<?=$selectbox_size?>"></select>

				<label>Plugin Json</label>
					<textarea id="call_plugin_json" placeholder="Insert here the json" name="text" rows="10"></textarea>

			</div>
		</fieldset>
		<div class="row">
			<div class="large-12 columns">
				<button id="call_plugin" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">
					Exec
				</button>
			</div>
		</div>
	</section>
        <fieldset>
                <legend>Output</legend>
                <p id="call-plugin-output" />
        </fieldset>
</div>


<div id="modal-remove-plugin" class="reveal-modal small" data-reveal>
        <section>
                <h3>Remove Plugin</h3>
                <a class="close-reveal-modal" aria-label="Close">&#215;</a>
                <fieldset>
                        <legend>Plugin Management</legend>
                        <div class="row">
				<label>Board List</label>
                                        <select id="remove_plugin_yunlist">
                                                <option value="--">--</option>
                                        </select>

                                <label>Plugin Name</label>
					<select id="remove_pluginlist" multiple="multiple" size="<?=$selectbox_size?>"></select>

                        </div>
                </fieldset>
                <div class="row">
                        <div class="large-12 columns">
                                <button id="remove_plugin" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">
                                        Remove
                                </button>
                        </div>
                </div>
        </section>
        <fieldset>
                <legend>Output</legend>
                <p id="remove-plugin-output" />
        </fieldset>
</div>

<!-- ####################################################################################################################################################### -->



									<!-- NETWORK MANAGEMENT -->
<!-- ####################################################################################################################################################### -->
<div id="modal-show-networks" class="reveal-modal small" data-reveal>
        <section>
                <h3>Networks</h3>
                <a class="close-reveal-modal" aria-label="Close">&#215;</a>
                <fieldset>
			<p id="show-networks-output" />
                </fieldset>
        </section>
</div>


<div id="modal-create-net" class="reveal-modal small" data-reveal>
        <section>
                <h3>Create New Network</h3>
                <a class="close-reveal-modal" aria-label="Close">&#215;</a>
                <fieldset>
                        <legend>New Network</legend>
                        <div class="row">
                                <label>Network Name</label>
                                        <input id="create_network_name" type="text" placeholder="Network Name" name="name" value="" />

                                <label>IP Address</label>
                                        <input id="create_network_ip" type="text" placeholder="IP Address (Example: 192.168.10.0/24)" name="ip" value="" />
                        </div>
                </fieldset>
                <div class="row">
                        <div class="large-12 columns">
				<button id="create_network" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">
                                        Create
                                </button>
                        </div>
                </div>
        </section>
        <fieldset>
                <legend>Output</legend>
                <p id="create-net-output" />
        </fieldset>
</div>




<div id="modal-destroy-net" class="reveal-modal small" data-reveal>
        <section>
                <h3>Destroy Network</h3>
                <a class="close-reveal-modal" aria-label="Close">&#215;</a>
                <fieldset>
                        <legend>Network</legend>
                        <div class="row">
                                <label>Network UUID</label>
				<select id="destroy_network_uuid" ></select>
                        </div>
                </fieldset>
                <div class="row">
                        <div class="large-12 columns">
				<button id="destroy_network" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">
                                        Remove
                                </button>
                        </div>
                </div>
        </section>
        <fieldset>
                <legend>Output</legend>
                <p id="destroy-net-output" />
        </fieldset>
</div>



<div id="modal-add-board-net" class="reveal-modal small" data-reveal>
        <section>
                <h3>Add Board to Network</h3>
                <a class="close-reveal-modal" aria-label="Close">&#215;</a>
                <fieldset>
                        <legend>Add board</legend>
                        <div class="row">
                                <label>Network UUID</label>
					<select id="addboard_network_uuid"></select>

                                <label>Board</label>
					<select id="addboard_yunlist"></select>

                                <label>IP Address [OPTIONAL]</label>
                                        <input id="addboard_network_ip" type="text" placeholder="IP Address (Example: 192.168.10.10)" name="ip" value="" />
                        </div>
                </fieldset>
                <div class="row">
                        <div class="large-12 columns">
				<button id="addboard_network" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">
                                        Add
                                </button>
                        </div>
                </div>
        </section>
        <fieldset>
                <legend>Output</legend>
                <p id="add-board-net-output" />
        </fieldset>
</div>


<div id="modal-remove-board-net" class="reveal-modal small" data-reveal>
        <section>
                <h3>Remove Board from Network</h3>
                <a class="close-reveal-modal" aria-label="Close">&#215;</a>
                <fieldset>
                        <legend>Remove board</legend>
                        <div class="row">
                                <label>Network UUID</label>
				<select id="removeboard_network_uuid"></select>

                                <label>Board</label>
					<select id="removeboard_yunlist" multiple="multiple" size="<?=$selectbox_size?>"></select>
                        </div>
                </fieldset>
                <div class="row">
                        <div class="large-12 columns">
				<button id="removeboard_network" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">
                                        Remove
                                </button>
                        </div>
                </div>
        </section>
        <fieldset>
                <legend>Output</legend>
                <p id="remove-board-net-output" />
        </fieldset>
</div>


<div id="modal-show-boards-net" class="reveal-modal small" data-reveal>
        <section>
                <h3>Show Boards</h3>
                <a class="close-reveal-modal" aria-label="Close">&#215;</a>
                <fieldset>
                        <legend>Network</legend>
                        <div class="row">
                                <label>Network UUID</label>
				<select id="show_boards_uuid"></select>

                        </div>
                </fieldset>
                <div class="row">
                        <div class="large-12 columns">
				<button id="show_boards" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">
                                        Show
                                </button>
                        </div>
                </div>
        </section>
        <fieldset>
                <legend>Output</legend>
                <p id="show_boards-output" />
        </fieldset>
</div>


<div id="modal-activate-boards-net" class="reveal-modal small" data-reveal>
        <section>
                <h3>Active Network on Board</h3>
                <a class="close-reveal-modal" aria-label="Close">&#215;</a>
                <fieldset>
                        <legend>Remove board</legend>
                        <div class="row">

                                <label>Board</label>
                                        <select id="activate_boardnet_yunlist"></select>
                        </div>
                </fieldset>
                <div class="row">
                        <div class="large-12 columns">
                                <button id="activate_boardnet_network" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">
                                        Activate
                                </button>
                        </div>
                </div>
        </section>
        <fieldset>
                <legend>Output</legend>
                <p id="activate-board-net-output" />
        </fieldset>
</div>
<!-- ####################################################################################################################################################### -->

<!-- STOP modal section -->


<!-- START script section -->
<script>
	var delay = 2000;
	//var ckan_organization = "SmartMe";
	var ckan_organization = "MDSLAB";

	function uuid(){
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}

	function generate_uuid(){
		var id = (uuid() + uuid() + "-" + uuid() + "-" + uuid() + "-" + uuid() + "-" + uuid() + uuid() + uuid());//.toUpperCase();
		$('#registration_name').val(id);
	}

	function SortByLabel(x,y) {
		return ((x.label == y.label) ? 0 : ((x.label > y.label) ? 1 : -1 ));
	}

        function SortByName(x,y) {
                return ((x.name == y.name) ? 0 : ((x.name > y.name) ? 1 : -1 ));
        }

        function SortByType(x,y) {
                return ((x.type == y.type) ? 0 : ((x.type > y.type) ? 1 : -1 ));
        }

	function SortByVlanName(x,y) {
		return ((x.vlan_name == y.vlan_name) ? 0 : ((x.vlan_name > y.vlan_name) ? 1 : -1 ));
	}

        function toggle_radio_mount(val){
                if ( val && (val.id == 'mount_radio_remote') ){
                        $('#mount_radio_local').removeAttr('checked');
                        $('#mount_div_remote').show();

			update_remote_yunlist('mount_yunlist', 'mount_remote_yunlist');
		}
                
                else {
                        $('#mount_radio_remote').removeAttr('checked');
                        $('#mount_div_remote').hide();

			if(!val)
				$('#mount_radio_local').prop('checked', true);
                }
        }


	//Copy all options from a select to another except the one selected!
	function update_remote_yunlist(from, to){

		$("#"+to).html( $("#"+from).html() );

		var board_value = $( "#"+from+" option:selected" ).val();

		var remote_yunlist = document.getElementById(to);
		for (var i=0; i<remote_yunlist.length; i++){
			if (remote_yunlist.options[i].value == board_value ){
				remote_yunlist.remove(i);
			}
		}
	}


	function loading(){
		var loader_pathfile = '<?php echo $this -> config -> site_url(); ?>uploads/ajax-loader.gif';
		//document.getElementById('loading_bar').style.visibility='visible';
		document.getElementById('loading_bar').style.width='100%';
		document.getElementById('loading_bar').style.height='100%';
		document.getElementById('loading_bar').style.position='fixed';//'absolute';//'fixed';
		document.getElementById('loading_bar').style.top='0';
		document.getElementById('loading_bar').style.left='0';
		document.getElementById('loading_bar').style.zIndex='9999';
		document.getElementById('loading_bar').style.background="url('"+loader_pathfile+"') no-repeat center center rgba(0,0,0,0.25)";
		//setTimeout(function(){document.getElementById('loading_bar').style.visibility='hidden';},3000);
	}


	function sensor_list(){
		$('#registration_sensor_list').empty();
		$.ajax({
			url: '<?= $this -> config -> site_url()?>Last/sensor_list',
			type: 'GET',
			dataType: 'json',
			data: {},
			contentType: 'application/json',
			success: function(response){
				for(i=0; i<response.message.length; i++){
					$('#registration_sensor_list').append('<input class="register_sensor_list" type="checkbox" id="'+response.message[i].id+'">'+response.message[i].type+'</input><br>');
			//		if( i%2 != 0) $('#registration_sensor_list').append('<br>');

				}
				//alert(response.message.length+JSON.stringify(response.message,null,"\t"));
			},
			error: function(response){
				//alert('ERROR: '+JSON.stringify(response));
			}
		});
	}


        function populate_plugins_sensors_and_drivers(data){
                $('#plugins_on_board').empty();
                $('#sensors_on_board').empty();
		$('#drivers_on_board').empty();

                var select = document.getElementById(data);
                if(data == "yunlist_c")
                        $('#yunlist_d option').removeAttr('selected');
                else
                        $('#yunlist_c option').removeAttr('selected');
                //alert(select.options[select.selectedIndex].value);

                if (select.selectedIndex != null){
			$.ajax({
				url: '<?= $this -> config -> site_url()?>Last/board_info',
				type: 'GET',
				dataType: 'json',
				data: {board: select.options[select.selectedIndex].value},
				contentType: 'application/json',
				success: function(response){
					$('#info-label').html('<center><b>Label: </b>'+response.message.info[0].label+'</center>');
					$('#info-uuid').html('<center><b>UUID: </b>'+response.message.info[0].board_code+'</center>');
					$('#info-lat').text('Latitude: '+response.message.info[0].latitude);
					$('#info-lon').text('Longitude: '+response.message.info[0].longitude);
					$('#info-alt').text('Altitude: '+response.message.info[0].altitude);


					$.ajax({
						url: '<?= $this -> config -> site_url()?>Last/board_layout',
						type: 'GET',
						dataType: 'json',
						data: {board: select.options[select.selectedIndex].value},
						contentType: 'application/json',
						success: function(response){

							//Sensors
							if(response.message.sensors.length == 0)
								$('#sensors_on_board').append('<option>NO sensors installed</option>');
							else{
								response.message.sensors = response.message.sensors.sort(SortByType);
								for(i=0; i<response.message.sensors.length; i++)
									$('#sensors_on_board').append('<option>'+response.message.sensors[i].type+'</option>');
							}

							//Plugins               
							if(response.message.plugins.length == 0)
								$('#plugins_on_board').append('<option>NO plugin injected or running</option>');
							else{
								response.message.plugins = response.message.plugins.sort(SortByName);
								for(i=0; i<response.message.plugins.length; i++)
									$('#plugins_on_board').append('<option>'+response.message.plugins[i].name+' [STATUS: '+response.message.plugins[i].state+'; CAT: '+response.message.plugins[i].category+']</option>');
							}

							//Drivers
							if(response.message.drivers.length == 0)
								$('#drivers_on_board').append('<option>NO drivers mounted</option>');
							else{
								response.message.drivers = response.message.drivers.sort(SortByName);
								for(i=0; i<response.message.drivers.length; i++)
									$('#drivers_on_board').append('<option>'+response.message.drivers[i].name+' [STATUS: '+response.message.drivers[i].state+']</option>');
							}

						},
						error: function(response){
							//alert('ERROR: '+JSON.stringify(response));
						}
					});


				},
				error: function(response){
					//alert('ERROR: '+JSON.stringify(response));
				}
			});

			/*
			$.ajax({
				url: '<?= $this -> config -> site_url()?>Last/board_layout',
				type: 'GET',
				dataType: 'json',
				data: {board: select.options[select.selectedIndex].value},
				contentType: 'application/json',
				success: function(response){


                                        //Sensors
                                        if(response.message.sensors.length == 0)
                                                $('#sensors_on_board').append('<option>NO sensors installed</option>');
                                        else{
						response.message.sensors = response.message.sensors.sort(SortByType);
                                                for(i=0; i<response.message.sensors.length; i++)
                                                        $('#sensors_on_board').append('<option>'+response.message.sensors[i].type+'</option>');
                                        }

					//Plugins		
					if(response.message.plugins.length == 0)
						$('#plugins_on_board').append('<option>NO plugin injected or running</option>');
					else{
						response.message.plugins = response.message.plugins.sort(SortByName);
						for(i=0; i<response.message.plugins.length; i++)
							$('#plugins_on_board').append('<option>'+response.message.plugins[i].name+' [STATUS: '+response.message.plugins[i].state+'; CAT: '+response.message.plugins[i].category+']</option>');
					}

					//Drivers
                                        if(response.message.drivers.length == 0)
                                                $('#drivers_on_board').append('<option>NO drivers mounted</option>');
                                        else{
						response.message.drivers = response.message.drivers.sort(SortByName);
                                                for(i=0; i<response.message.drivers.length; i++)
                                                        $('#drivers_on_board').append('<option>'+response.message.drivers[i].name+' [STATUS: '+response.message.drivers[i].state+']</option>');
                                        }

				},
				error: function(response){
					//alert('ERROR: '+JSON.stringify(response));
				}
			});
			*/
                }
        }



	function update_boards(select_id, status){
		$.ajax({
			url: '<?= $this -> config -> site_url()?>Last/update_boards',
			type: 'GET',
			dataType: 'json',
			data: {},
			contentType: 'application/json',
			success: function(response){

				$('#'+select_id).empty();
				if(select_id == 'update_yunlist'){
					$('#'+select_id).append('<option title="--" value="--" data-unit="">--</option>');
					document.getElementById("update_label").value = '';
	                                document.getElementById("update_latitude").value = '';
	                                document.getElementById("update_longitude").value = '';
        	                        document.getElementById("update_altitude").value = '';
                	                $('#update_sensor_list').empty();
                        	        document.getElementById("board-update-output").innerHTML ='';
				}
				else if(select_id == 'remove_plugin_yunlist')
					$('#'+select_id).append('<option title="--" value="--" data-unit="">--</option>');

				response.list = response.list.sort(SortByLabel);

				for(var i=0; i<response.list.length; i++){
					if(status == "C"){
						if(response.list[i].status == "C")
							$('#'+select_id).append('<option title="'+response.list[i].board_code+'" value="'+response.list[i].board_code+'" data-unit="">'+response.list[i].label+'</option>');
					}
					else if(status == "D"){
						if(response.list[i].status == "D")
							$('#'+select_id).append('<option title="'+response.list[i].board_code+'" value="'+response.list[i].board_code+'" data-unit="">'+response.list[i].label+'</option>');
					}
					else
						$('#'+select_id).append('<option title="'+response.list[i].board_code+'" value="'+response.list[i].board_code+'" data-unit="">'+response.list[i].label +' ( '+response.list[i].board_code+' )</option>');
				}


				if(select_id == 'mount_yunlist'){
					var board_id = $( "#mount_yunlist option:selected" ).val();
		                        refresh_localboard_drivers(board_id, "mount");
				}
                                else if(select_id == 'unmount_yunlist'){
                                        var board_id = $( "#unmount_yunlist option:selected" ).val();
                                        refresh_localboard_drivers(board_id, "unmount");
                                }
                                else if(select_id == 'write_driver_yunlist'){
                                        var board_id = $( "#write_driver_yunlist option:selected" ).val();
                                        refresh_localboard_drivers(board_id, "write");
                                }
                                else if(select_id == 'read_driver_yunlist'){
                                        var board_id = $( "#read_driver_yunlist option:selected" ).val();
                                        refresh_localboard_drivers(board_id, "read");
                                }
                                else if(select_id == 'remove_driver_yunlist'){
                                        var board_id = $( "#remove_driver_yunlist option:selected" ).val();
                                        refresh_localboard_drivers(board_id, "remove");
                                }

			},
			error: function(response){
				//alert('ERROR: '+JSON.stringify(response));
			}
		}); 
	}

        $('[id="update_yunlist"]').on('change',
                function() {

			var board_id = $( "#update_yunlist option:selected" ).val();

			if(board_id == '--'){
				document.getElementById("update_label").value = '';
				document.getElementById("update_latitude").value = '';
				document.getElementById("update_longitude").value = '';
        	                document.getElementById("update_altitude").value = '';
				$('#update_sensor_list').empty();
                        	document.getElementById("board-update-output").innerHTML ='';
			}
			else{
			
			$('#update_sensor_list').empty();
			$.ajax({
				url: '<?= $this -> config -> site_url()?>Last/sensor_list',
				type: 'GET',
				dataType: 'json',
				data: {},
				contentType: 'application/json',
				success: function(response){
					for(i=0; i<response.message.length; i++){
						$('#update_sensor_list').append('<input class="update_sensor_list" type="checkbox" id="'+response.message[i].id+'">'+response.message[i].type+'</input><br>');
					}

					$.ajax({
						url: '<?= $this -> config -> site_url()?>Last/board_info',
						type: 'GET',
						dataType: 'json',
						data: {board: board_id},
						contentType: 'application/json',
						success: function(response){

							document.getElementById("update_label").value = response.message.info[0].label;
							document.getElementById("update_latitude").value = response.message.info[0].latitude;
							document.getElementById("update_longitude").value = response.message.info[0].longitude;
							document.getElementById("update_altitude").value = response.message.info[0].altitude;
							document.getElementById("update_net_enabled").value = response.message.info[0].net_enabled;

							var list = document.getElementsByClassName("update_sensor_list");

							for(i=0; i<list.length; i++){
								for(j=0; j<response.message.sensors.length; j++){
									if(list[i].id == response.message.sensors[j].id){
										document.getElementById(list[i].id).checked = true;
										break;
									}
								}
							}
						},
						error: function(response){
							//alert('ERROR: '+JSON.stringify(response));
						}
					});
				},
                		error: function(response){
		                	//alert('ERROR: '+JSON.stringify(response));
		               	}
			});
			}
		}
	);


	function refresh_lists(){
		//update_boards('yunlist_c', 'C');
		//update_boards('yunlist_d', 'D');

		$.ajax({
			url: '<?= $this -> config -> site_url()?>Last/update_boards',
			type: 'GET',
			dataType: 'json',
			data: {},
			contentType: 'application/json',
			success: function(response){
				//$('#'+select_id).empty();
				$('#yunlist_c').empty();
				$('#yunlist_d').empty();
				//alert(response.list);

				var connected_count = 0;
				var disconnected_count = 0;

				response.list = response.list.sort(SortByLabel);

				for(var i=0; i<response.list.length; i++){
					if(response.list[i].status == "C"){
                                                $('#yunlist_c').append('<option title="'+response.list[i].board_code+'" value="'+response.list[i].board_code+'" data-unit="">'+response.list[i].label+'</option>');
						connected_count += 1;
					}
                                        else if(response.list[i].status == "D"){
                                                $('#yunlist_d').append('<option title="'+response.list[i].board_code+'" value="'+response.list[i].board_code+'" data-unit="">'+response.list[i].label+'</option>');
						disconnected_count += 1;
					}
				}
				document.getElementById("count-connected").innerHTML ='<h3>Connected ( '+connected_count+' )</h3>';
				document.getElementById("count-disconnected").innerHTML ='<h3>Disconnected ( '+disconnected_count+' )</h3>';
			},
			error: function(response){
				//alert('ERROR: '+JSON.stringify(response));
			}
		});

	}


	function update_nets(select_id){
		$.ajax({
			url: '<?= $this -> config -> site_url()?>Last/update_nets',
			type: 'GET',
			dataType: 'json',
			data: {},
			contentType: 'application/json',
			success: function(response){
				$('#'+select_id).empty();
				response.result = response.result.sort(SortByVlanName);
				for(var i=0; i<response.result.length; i++)
					$('#'+select_id).append('<option title="'+response.result[i].uuid+'" value="'+response.result[i].uuid+'" data-unit="">'+response.result[i].vlan_name+':'+response.result[i].uuid+'</option>');
			},
			error: function(response){
				//alert('ERROR: '+JSON.stringify(response));
			}
		}); 
	}




	$('[data-reveal-id="modal-plugins_sensors-lists"]').on('click',
	        function() {
	                populate_plugins_sensors_and_drivers($(this).data('yunlistSelected'));
	        }
	);


        $('[data-reveal-id="modal-mount-driver"]').on('click',
                function() {
			toggle_radio_mount();
                }
        );

	$('[id="mount_yunlist"]').on('change',
		function() {
			var radio = document.getElementById('mount_radio_remote');
			if(radio.checked) update_remote_yunlist('mount_yunlist', 'mount_remote_yunlist');

			var board_id = $( "#mount_yunlist option:selected" ).val();
			refresh_localboard_drivers(board_id, "mount");

		}
	);

        $('[id="unmount_yunlist"]').on('change',
                function() {
                        var board_id = $( "#unmount_yunlist option:selected" ).val();
                        refresh_localboard_drivers(board_id, "unmount");

                }
        );


        $('[id="write_driver_yunlist"]').on('change',
                function() {
                        var board_id = $( "#write_driver_yunlist option:selected" ).val();
                        refresh_localboard_drivers(board_id, "write");

                }
        );

        $('[id="read_driver_yunlist"]').on('change',
                function() {
                        var board_id = $( "#read_driver_yunlist option:selected" ).val();
                        refresh_localboard_drivers(board_id, "read");

                }
        );

        $('[id="remove_driver_yunlist"]').on('change',
                function() {
                        var board_id = $( "#remove_driver_yunlist option:selected" ).val();
                        refresh_localboard_drivers(board_id, "remove");

                }
        );



	$('[id="remove_plugin_yunlist"]').on('change',	
		function(){
			var board_id = $( "#remove_plugin_yunlist option:selected" ).val();

			if(board_id == '--'){
				$('#remove_pluginlist').empty();
				document.getElementById("remove-plugin-output").innerHTML ='';
			}
			else{
				$('#remove_pluginlist').empty();
				$.ajax({
					url: '<?= $this -> config -> site_url()?>Last/board_layout',
                                	type: 'GET',
	                                dataType: 'json',
	                                data: {board: board_id},
        	                        contentType: 'application/json',
                	                success: function(response){

                                        	if(response.message.plugins.length == 0)
                                                	$('#remove_pluginlist').append('<option>NO plugin injected or running</option>');
	                                        else{
        	                                        for(i=0; i<response.message.plugins.length; i++){
								response.message.plugins = response.message.plugins.sort(SortByName);
                	                                        $('#remove_pluginlist').append('<option value="'+response.message.plugins[i].name+'">'+response.message.plugins[i].name+' [STATUS: '+response.message.plugins[i].state+']</option>');
							}
                        	                }

	                                },
        	                        error: function(response){
                	                        //alert('ERROR: '+JSON.stringify(response));
	                                }
					
				});
			}
		}
	);


        function refresh_cloud_drivers(select_id){
                $('#'+select_id).empty();
                $.ajax({
                        url: '<?= $this -> config -> site_url()?>Last/cloud_driver_list',
                        type: 'GET',
                        dataType: 'json',
                        data: {},
                        contentType: 'application/json',
                        success: function(response){

                                if(response.message.length == 0)
                                        $('#'+select_id).append('<option>NO driver injected or running</option>');
                                else{
                                        for(i=0; i<response.message.length; i++){
						response.message = response.message.sort(SortByName);
                                                $('#'+select_id).append('<option value="'+response.message[i].name+'">'+response.message[i].name+'</option>');
					}
                                }

                        },
                        error: function(response){
                                //alert('ERROR: '+JSON.stringify(response));
                        }
                        
                });
        }


	//function refresh_localboard_drivers(board_id, mount_unmount){
	function refresh_localboard_drivers(board_id, select){
                $.ajax({
                        url: '<?= $this -> config -> site_url()?>Last/board_driverlist',
                        type: 'GET',
                        dataType: 'json',
                        data: {board: board_id},
                        contentType: 'application/json',
                        success: function(response){

                                $('#'+select+'_driverlist').empty();
                                if(response.message.length == 0)
                                        $('#'+select+'_driverlist').append('<option value="nodriver">NO driver</option>');
                                else{
					response.message = response.message.sort(SortByName);
                                        for(i=0; i<response.message.length; i++){
						//Write driver
						if(select == "write" || select == "read") {
							if(response.message[i].state == "mounted")
		                                                $('#'+select+'_driverlist').append('<option value="'+response.message[i].name+'">'+response.message[i].name+'</option>');
						}
						//Others...
						else
							$('#'+select+'_driverlist').append('<option value="'+response.message[i].name+'">'+response.message[i].name+'</option>');
					}
                                }

				/*
                                $('#'+mount_unmount+'_driverlist').empty();
                                if(response.message.length == 0)
                                        $('#'+mount_unmount+'_driverlist').append('<option value="nodriver">NO driver</option>');
                                else{
                                        for(i=0; i<response.message.length; i++)
                                                $('#'+mount_unmount+'_driverlist').append('<option value="'+response.message[i].name+'">'+response.message[i].name+'</option>');
                                }
				*/
                        },
                        error: function(response){
                                //alert('ERROR: '+JSON.stringify(response));
                        }
                        
                });
	}


	function refresh_cloud_plugins(select_id){
                $('#'+select_id).empty();
                $.ajax({
                        url: '<?= $this -> config -> site_url()?>Last/cloud_plugin_list',
                        type: 'GET',
                        dataType: 'json',
                        data: {},
                        contentType: 'application/json',
                        success: function(response){

                                if(response.message.length == 0)
                                        $('#'+select_id).append('<option>NO plugin injected or running</option>');
                                else{
					var type = select_id.split("_");
					response.message = response.message.sort(SortByName);
                                        for(i=0; i<response.message.length; i++){
						if(type[0] == "startstop" || type[0] == "call"){
							if(type[0] == "startstop" && response.message[i].category =="async")
		                                                $('#'+select_id).append('<option value="'+response.message[i].name+'">'+response.message[i].name+' [CAT: '+response.message[i].category+']</option>');
						
							else if(type[0] == "call" && response.message[i].category =="sync")
								$('#'+select_id).append('<option value="'+response.message[i].name+'">'+response.message[i].name+' [CAT: '+response.message[i].category+']</option>');
						}
						else
							$('#'+select_id).append('<option value="'+response.message[i].name+'">'+response.message[i].name+' [CAT: '+response.message[i].category+']</option>');
					}
                                }

                        },
                        error: function(response){
                                //alert('ERROR: '+JSON.stringify(response));
                        }
                        
                });
	}


        function readFile(evt) {
                //Retrieve the first (and only!) File from the FileList object
                var f = evt.target.files[0]; 

                if (f) {
                        var r = new FileReader();
                        r.onload = function(e) { 
                                var contents = e.target.result;
                                //alert('contents: '+contents);
                                //document.getElementById("create_driver_code").innerHTML = contents;
                                document.getElementById(evt.target.element_id).innerHTML = contents;
                        }
                        r.readAsText(f);
                }
                else { alert("Failed to load file"); }
        }





									//BOARD MANAGEMENT
	// #############################################################################################################################################
        $('#led-management').click(function(){

                if ($('#led_yunlist option:selected').length == 0) { alert('Select a Board'); }
                else {
			//document.getElementById('loading_bar').style.visibility='visible';
                        var list = document.getElementById("led_yunlist");
			var led_action = $( "#led-action option:selected" ).val();
			var pin = $( "#pin option:selected" ).val(); //ON YUN IS '13'
                        document.getElementById("led-output").innerHTML ='';
//board_id = 14144545;
			var selected_list = [];
                        for(var i=0; i< list.length; i++){
                                if (list.options[i].selected)
                                        selected_list.push(list[i].value);
                        }

                        for(var i=0; i< selected_list.length; i++){
                                //---------------------------------------------------------------------------------
                                (function(i){
                                        setTimeout(function(){
                                //---------------------------------------------------------------------------------

                                                var board_id = selected_list[i];
                                                $.ajax({
                                                        url: '<?= $this -> config -> site_url()?>Last/led_management',
                                                        type: 'GET',
                                                        dataType: 'json',
                                                        data: {board: board_id, command: 'digital', pin: pin, val: led_action},
                                                        contentType: 'application/json',
                                                        success: function(response){
                                                                //alert(JSON.stringify(response));
								if(i==selected_list.length-1) document.getElementById('loading_bar').style.visibility='hidden';
                                                                document.getElementById("led-output").innerHTML += board_id +': '+JSON.stringify(response.result) +'<br />';
                                                        },
                                                        error: function(response){
                                                                //alert(JSON.stringify(response));
								if(i==selected_list.length-1) document.getElementById('loading_bar').style.visibility='hidden';
                                                                document.getElementById("led-output").innerHTML += board_id +': '+JSON.stringify(response.result) +'<br />';
                                                        }
                                                });
                                //---------------------------------------------------------------------------------
                                        },delay*i);
                                })(i);
                                //---------------------------------------------------------------------------------
                        }
                } //end else
        });


        $('#ssh-management').click(function(){
                if ($('#ssh_yunlist option:selected').length == 0) { alert('Select a Board'); }
                else {
			//document.getElementById('loading_bar').style.visibility='visible';
                        var list = document.getElementById("ssh_yunlist");
                        var ssh_action = $( "#ssh-action option:selected" ).val();
                        document.getElementById("ssh-output").innerHTML ='';

                        var selected_list = [];
                        for(var i=0; i< list.length; i++){
                                if (list.options[i].selected)
                                        selected_list.push(list[i].value);
                        }

                        for(var i=0; i< selected_list.length; i++){
                                //---------------------------------------------------------------------------------
                                (function(i){
                                        setTimeout(function(){
                                //---------------------------------------------------------------------------------
                                                var board_id = selected_list[i];
                                                $.ajax({
                                                        url: '<?= $this -> config -> site_url()?>Last/ssh_management',
                                                        type: 'GET',
                                                        dataType: 'json',
							data: {board: board_id, command: ssh_action},
                                                        contentType: 'application/json',
                                                        success: function(response){
                                                                //alert(JSON.stringify(response));
								if(i==selected_list.length-1) document.getElementById('loading_bar').style.visibility='hidden';
								document.getElementById("ssh-output").innerHTML += board_id +': <pre>'+JSON.stringify(response,null,"\t")+'</pre>'; 
                                                        },
                                                        error: function(response){
                                                                //alert(JSON.stringify(response));
                                                                //document.getElementById("ssh-output").innerHTML += board_id +': '+JSON.stringify(response) +'<br />';
								if(i==selected_list.length-1) document.getElementById('loading_bar').style.visibility='hidden';
								document.getElementById("ssh-output").innerHTML += board_id +': <pre>'+JSON.stringify(response,null,"\t")+'</pre>';
                                                        }
                                                });
                                //---------------------------------------------------------------------------------
                                        },delay*i);
                                })(i);
                                //---------------------------------------------------------------------------------
                        }

                } //end else
        });

	// #############################################################################################################################################


									// REGISTRATION MANAGEMENT
	// #############################################################################################################################################
	$('#register-board').click(function(){

		//document.getElementById('loading_bar').style.visibility='visible';
		var list = document.getElementsByClassName("register_sensor_list");
		var sensors ="";
		var count = 0;

		for(i=0; i<list.length; i++){
			if (list[i].checked){
				if(count==0){
					sensors = list[i].id;
					count += 1;
				}
				else
					sensors += ","+list[i].id;
			}
		}
		if(sensors=="") sensors = "NULL";


		var board_id = document.getElementById("registration_name").value;
		var label = document.getElementById("registration_label").value;
		var latitude = document.getElementById("registration_latitude").value;
		var longitude = document.getElementById("registration_longitude").value;
		var altitude = document.getElementById("registration_altitude").value;

		var net_enabled = document.getElementById("registration_net_enabled").value;
		//var ckan_enabled = document.getElementById("registration_ckan_enabled").value;


		document.getElementById("board-registration-output").innerHTML ='';

                $.ajax({
                        url: '<?= $this -> config -> site_url()?>Last/register_board',
                        type: 'GET',
                        dataType: 'json',
			//data: {board_id: board_id, label: label, latitude: latitude, longitude: longitude, altitude: altitude, net_enabled: net_enabled, ckan_enabled: ckan_enabled, sensors_list: sensors},
			data: {board_id: board_id, label: label, latitude: latitude, longitude: longitude, altitude: altitude, net_enabled: net_enabled, sensors_list: sensors},
                        contentType: 'application/json',
                        success: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
                                document.getElementById("board-registration-output").innerHTML = '<pre>'+board_id+': '+JSON.stringify(response.result) +'</pre>';
				refresh_lists();
                        },
                        error: function(response){
                                //alert(JSON.stringify(response));
				document.getElementById('loading_bar').style.visibility='hidden';
                                document.getElementById("board-registration-output").innerHTML = '<pre>'+board_id+': '+JSON.stringify(response.result) +'</pre>';
                        }
                });
	});


        $('#update-board').click(function(){
                var list = document.getElementsByClassName("update_sensor_list");
                var sensors ="";
		var count = 0;

                for(i=0; i<list.length; i++){
                        if (list[i].checked){
                                if(count==0){
                                        sensors = list[i].id;
					count += 1;
				}
                                else
                                        sensors += ","+list[i].id;
                        }
                }
		if(sensors=="") sensors = "NULL";

		var board_id = document.getElementById("update_yunlist").value;

		if(board_id == '--'){
/*
			$("#update_latitude").empty();
			$("#update_longitude").empty();
			$("#update_altitude").empty();
			document.getElementById("board-update-output").innerHTML ='';
*/
			alert('Select a Board');
		}
		else{
			//document.getElementById('loading_bar').style.visibility='visible';
			var label = document.getElementById("update_label").value;
	                var latitude = document.getElementById("update_latitude").value;
        	        var longitude = document.getElementById("update_longitude").value;
                	var altitude = document.getElementById("update_altitude").value;

	                var net_enabled = document.getElementById("update_net_enabled").value;

        	        document.getElementById("board-update-output").innerHTML ='';

                	$.ajax({
	                        url: '<?= $this -> config -> site_url()?>Last/update_board',
        	                type: 'GET',
                	        dataType: 'json',
                        	data: {board_id: board_id, label: label, latitude: latitude, longitude: longitude, altitude: altitude, net_enabled: net_enabled, sensors_list: sensors},
	                        contentType: 'application/json',
        	                success: function(response){
					document.getElementById('loading_bar').style.visibility='hidden';
                	                document.getElementById("board-update-output").innerHTML = '<pre>'+board_id+': '+JSON.stringify(response.result) +'</pre>';
					refresh_lists();
	                        },
        	                error: function(response){
                	                //alert(JSON.stringify(response));
					document.getElementById('loading_bar').style.visibility='hidden';
	                                document.getElementById("board-update-output").innerHTML = '<pre>'+board_id+': '+JSON.stringify(response.result) +'</pre>';
        	                }
	                });
		}
        });


        $('#unregister-board').click(function(){
		if ($('#unregister_boardlist option:selected').length == 0) { alert('Select at least a Board'); }
		else{
			//document.getElementById('loading_bar').style.visibility='visible';
	                var list = document.getElementById("unregister_boardlist");
        	        document.getElementById("board-unregistration-output").innerHTML ='';

                        var selected_list = [];
                        for(var i=0; i< list.length; i++){
                                if (list.options[i].selected)
                                        selected_list.push(list[i].value);
                        }

                        for(var i=0; i< selected_list.length; i++){
                                //---------------------------------------------------------------------------------
                                (function(i){
                                        setTimeout(function(){
                                //---------------------------------------------------------------------------------
						var board_id = selected_list[i];
				                $.ajax({
				                        url: '<?= $this -> config -> site_url()?>Last/unregister_board',
				                        type: 'GET',
				                        dataType: 'json',
				                        data: {board_id: board_id},
				                        contentType: 'application/json',
				                        success: function(response){
								if(i==selected_list.length-1) {
									document.getElementById('loading_bar').style.visibility='hidden';
									refresh_lists();
								}
                                				document.getElementById("board-unregistration-output").innerHTML += '<pre>'+board_id+': '+JSON.stringify(response.result) +'</pre>';
				                        },
				                        error: function(response){
                                				//alert(JSON.stringify(response));
								if(i==selected_list.length-1) document.getElementById('loading_bar').style.visibility='hidden';
				                                document.getElementById("board-unregistration-output").innerHTML += '<pre>'+board_id+': '+JSON.stringify(response.result) +'</pre>';
				                        }
				                });
                                //---------------------------------------------------------------------------------
                                        },delay*i);
                                })(i);
                                //---------------------------------------------------------------------------------
			}
		}
        });
	// #############################################################################################################################################


	
									// DRIVER MANAGEMENT
	// #############################################################################################################################################
        $('#create_driver').click(function(){
		//document.getElementById('loading_bar').style.visibility='visible';
                var driver_name = document.getElementById("create_driver_name").value;
                var driver_json = document.getElementById("create_driver_json").value;
                var driver_code = document.getElementById("create_driver_code").value;
                document.getElementById("create-driver-output").innerHTML ='';

                $.ajax({
                        url: '<?= $this -> config -> site_url()?>Last/create_driver',
                        type: 'GET',
                        dataType: 'json',
                        data: {driver_name : driver_name, driver_json: driver_json, driver_code: driver_code},
                        contentType: 'application/json',
                        success: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
                                document.getElementById("create-driver-output").innerHTML = '<pre>'+driver_name+': <br />'+JSON.stringify(response) +'</pre>';
                        },
                        error: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
                                document.getElementById("create-driver-output").innerHTML = '<pre>'+driver_name+': <br />'+JSON.stringify(response) +'</pre>';
                        }
                });
        });


        $('#destroy_driver').click(function(){
                if($('#destroy_driverlist option:selected').length == 0) { alert('Select a Driver'); }
                else{
                        //document.getElementById('loading_bar').style.visibility='visible';
                        var list = document.getElementById("destroy_driverlist");
                        document.getElementById("destroy-driver-output").innerHTML ='';

                        var selected_list = [];

                        for(var i=0; i< list.length; i++){
                                if (list.options[i].selected)
                                        selected_list.push(list[i].value);
                        }

                        for(var i=0; i< selected_list.length; i++){
                                //---------------------------------------------------------------------------------
                                (function(i){
                                        setTimeout(function(){
                                //---------------------------------------------------------------------------------
                                                var driver_name = selected_list[i];

                                                $.ajax({
                                                        url: '<?= $this -> config -> site_url()?>Last/destroy_driver',
                                                        type: 'GET',
                                                        dataType: 'json',
                                                        data: {driver_name : driver_name},
                                                        contentType: 'application/json',
                                                        success: function(response){
                                                                if(i==selected_list.length-1) document.getElementById('loading_bar').style.visibility='hidden';
                                                                document.getElementById("destroy-driver-output").innerHTML += driver_name+': '+JSON.stringify(response.result) +'<br />';
                                                        },
                                                        error: function(response){
                                                                if(i==selected_list.length-1) document.getElementById('loading_bar').style.visibility='hidden';
                                                                document.getElementById("destroy-driver-output").innerHTML += driver_name+': '+JSON.stringify(response.result) +'<br />';
                                                        }
                                                });
                                //---------------------------------------------------------------------------------
                                        },delay*i);
                                })(i);
                                //---------------------------------------------------------------------------------
                        }
                }
        });


        document.getElementById('driver_userfile').addEventListener('change', readFile, false);
	document.getElementById('driver_userfile').element_id = "create_driver_code";


        $('#inject_driver').click(function(){

                if ($('#inject_driver_yunlist option:selected').length == 0) { alert('Select a Board'); }
                else {
                        //document.getElementById('loading_bar').style.visibility='visible';
                        var list = document.getElementById("inject_driver_yunlist");
                        var selected_list = [];
                        var output_string = '';

                        document.getElementById("inject-driver-output").innerHTML ='';
                        var driver_name = document.getElementById("inject_driverlist").value;
                        var inject_autostart = document.getElementById("inject_driver_autostart").value;


                        for(var i=0; i< list.length; i++){
                                if (list.options[i].selected)
                                        selected_list.push(list[i].value);
                        }
                        for(var i=0; i< selected_list.length; i++){
                                //---------------------------------------------------------------------------------             
                                (function(i){
                                        setTimeout(function(){
                                //---------------------------------------------------------------------------------
                                                var board_id = selected_list[i];
                                                $.ajax({
                                                        url: '<?= $this -> config -> site_url()?>Last/inject_driver',
                                                        type: 'GET',
                                                        dataType: 'json',
                                                        data: {driver_name : driver_name, board: board_id, inject_autostart: inject_autostart},
                                                        contentType: 'application/json',
                                                        success: function(response){
                                                                if(i==selected_list.length-1) document.getElementById('loading_bar').style.visibility='hidden';
                                                                document.getElementById("inject-driver-output").innerHTML += board_id+ ' with '+ driver_name+': '+JSON.stringify(response.result) +'<br />';
                                                        },
                                                        error: function(response){
                                                                if(i==selected_list.length-1) document.getElementById('loading_bar').style.visibility='hidden';
                                                                document.getElementById("inject-driver-output").innerHTML += board_id+ ' with '+driver_name+': '+JSON.stringify(response.result) +'<br />';
                                                        }
                                                });
                                //---------------------------------------------------------------------------------
                                        },delay*i);
                                })(i);
                                //---------------------------------------------------------------------------------
                        }
                }
        });



        $('#mount_driver').click(function(){
                if ($('#mount_yunlist option:selected').length == 0) { 
			alert('Select a Board'); 
			document.getElementById('loading_bar').style.visibility='hidden';
		}

		else if( $('#mount_radio_remote').checked && $('#mount_remote_yunlist option:selected').length == 0){
			alert('Select a remote Board');
			document.getElementById('loading_bar').style.visibility='hidden';
		}
                else {
			//document.getElementById('loading_bar').style.visibility='visible';

			var type = "";
			if( $('#mount_radio_local').is(':checked') )		type="local";
			else if( $('#mount_radio_remote').is(':checked') )	type="remote";

			var local_board = document.getElementById("mount_yunlist").value;
			var local_boardname = $("#mount_yunlist option:selected").text();
			var remote_board = "";
			if(type == "remote"){
				var remote_board = document.getElementById("mount_remote_yunlist").value;
				var remote_boardname = $("#mount_remote_yunlist option:selected").text();
			}

			var driver_name = document.getElementById("mount_driverlist").value;


                        $.ajax({
                                url: '<?= $this -> config -> site_url()?>Last/mount_driver',
                                type: 'GET',
                                dataType: 'json',
                                data: {type: type, local_board: local_board, remote_board: remote_board, driver_name: driver_name},
                                contentType: 'application/json',
                                success: function(response){
                                        document.getElementById('loading_bar').style.visibility='hidden';
					if(type == "remote")
	                                        document.getElementById("mount-driver-output").innerHTML = local_boardname +' with remote '+remote_boardname+': '+JSON.stringify(response.message) +'<br />';
					else
						document.getElementById("mount-driver-output").innerHTML = local_boardname +': '+JSON.stringify(response.message) +'<br />';
                                },
                                error: function(response){
                                        document.getElementById('loading_bar').style.visibility='hidden';
					if(type == "remote")
                                                document.getElementById("mount-driver-output").innerHTML = local_boardname +' with remote '+remote_boardname+': '+JSON.stringify(response.message) +'<br />';
                                        else
                                                document.getElementById("mount-driver-output").innerHTML = local_boardname +': '+JSON.stringify(response.message) +'<br />';
                                }
                        });
                }
        });


        $('#unmount_driver').click(function(){
                if ($('#unmount_yunlist option:selected').length == 0) { 
                        alert('Select a Board'); 
                        document.getElementById('loading_bar').style.visibility='hidden';
                }

                else {
                        //document.getElementById('loading_bar').style.visibility='visible';

                        var board = document.getElementById("unmount_yunlist").value;
                        var boardname = $("#unmount_yunlist option:selected").text();
                        var driver_name = document.getElementById("unmount_driverlist").value;


                        $.ajax({
                                url: '<?= $this -> config -> site_url()?>Last/unmount_driver',
                                type: 'GET',
                                dataType: 'json',
                                data: {board: board, driver_name: driver_name},
                                contentType: 'application/json',
                                success: function(response){
                                        document.getElementById('loading_bar').style.visibility='hidden';
                                        document.getElementById("unmount-driver-output").innerHTML = boardname +': '+JSON.stringify(response.message) +'<br />';
                                },
                                error: function(response){
                                        document.getElementById('loading_bar').style.visibility='hidden';
                                        document.getElementById("unmount-driver-output").innerHTML = boardname +': '+JSON.stringify(response.message) +'<br />';
                                }
                        });
                }
        });



        $('#write_driver').click(function(){

		var board = document.getElementById("write_driver_yunlist").value;
		var boardname = $("#write_driver_yunlist option:selected").text();
		var driver_name = document.getElementById("write_driverlist").value;

                var filename = document.getElementById("write_filename").value;
                var file_content = document.getElementById("write_file_content").value;

		if(!board) alert('Select a Board');
                else if(!driver_name) alert('Driver Name missing');
                else if(!filename) alert('File Name missing');
                else if(!file_content)  alert('File content missing');
                else {
                        $.ajax({
                                url: '<?= $this -> config -> site_url()?>Last/write_driver',
                                type: 'GET',
                                dataType: 'json',
                                data: {board: board, driver_name: driver_name, filename: filename, file_content: file_content},
                                contentType: 'application/json',
                                success: function(response){
                                        document.getElementById('loading_bar').style.visibility='hidden';
                                        document.getElementById("write-driver-output").innerHTML = '<pre>'+boardname+': <br />'+JSON.stringify(response.result) +'</pre>';
                                },
                                error: function(response){
                                        document.getElementById('loading_bar').style.visibility='hidden';
                                        document.getElementById("write-driver-output").innerHTML = '<pre>'+boardname+': <br />'+JSON.stringify(response.result) +'</pre>';
                                }
                        });
		}
        });



        $('#read_driver').click(function(){

                var board = document.getElementById("read_driver_yunlist").value;
                var boardname = $("#read_driver_yunlist option:selected").text();
                var driver_name = document.getElementById("read_driverlist").value;

                var filename = document.getElementById("read_filename").value;

                if(!board) alert('Select a Board');
                else if(!driver_name) alert('Driver Name missing');
                else if(!filename) alert('File Name missing');
                else {
                        $.ajax({
                                url: '<?= $this -> config -> site_url()?>Last/read_driver',
                                type: 'GET',
                                dataType: 'json',
                                data: {board: board, driver_name: driver_name, filename: filename},
                                contentType: 'application/json',
                                success: function(response){
                                        document.getElementById('loading_bar').style.visibility='hidden';
					document.getElementById("read_file_content").innerHTML = response.result.value;
                                        document.getElementById("read-driver-output").innerHTML = '<pre>'+boardname+': <br />'+JSON.stringify(response.result) +'</pre>';
                                },
                                error: function(response){
                                        document.getElementById('loading_bar').style.visibility='hidden';
					document.getElementById("read_file_content").innerHTML = response.result.value;
                                        document.getElementById("read-driver-output").innerHTML = '<pre>'+boardname+': <br />'+JSON.stringify(response.result) +'</pre>';
                                }
                        });
                }
        });


        $('#remove_driver').click(function(){

                //document.getElementById('loading_bar').style.visibility='visible';
                var board = document.getElementById("remove_driver_yunlist").value;

                var list = document.getElementById("remove_driverlist");
                var selected_list = [];
                for(var i=0; i< list.length; i++){
                        if (list.options[i].selected)
                                selected_list.push(list[i].value);
                }

                document.getElementById("remove-driver-output").innerHTML ='';

                for(var i=0; i< selected_list.length; i++){
                        //---------------------------------------------------------------------------------
                        (function(i){
                                setTimeout(function(){
                        //---------------------------------------------------------------------------------
                                        var driver_name = selected_list[i];
                                        $.ajax({
                                                url: '<?= $this -> config -> site_url()?>Last/remove_driver',
                                                type: 'GET',
                                                dataType: 'json',
                                                data: {board: board, driver_name : driver_name},
                                                contentType: 'application/json',
                                                success: function(response){
                                                        if(i==selected_list.length-1) document.getElementById('loading_bar').style.visibility='hidden';
                                                        document.getElementById("remove-driver-output").innerHTML += '<pre>'+driver_name+': <br />'+JSON.stringify(response.result) +'</pre>';
                                                },
                                                error: function(response){
                                                        if(i==selected_list.length-1) document.getElementById('loading_bar').style.visibility='hidden';
                                                        document.getElementById("remove-driver-output").innerHTML += '<pre>'+driver_name+': <br />'+JSON.stringify(response.result) +'</pre>';
                                                }
                                        });
                        //---------------------------------------------------------------------------------
                                },delay*i);
                        })(i);
                        //---------------------------------------------------------------------------------
                }
        });
	// #############################################################################################################################################




									// PLUGIN MANAGEMENT
	// #############################################################################################################################################
	$('#create_plugin').click(function(){
		//document.getElementById('loading_bar').style.visibility='visible';
		var plugin_name = document.getElementById("create_plugin_name").value;
		var plugin_json = document.getElementById("create_plugin_json").value;
		var plugin_code = document.getElementById("create_plugin_code").value;
		var plugin_category = document.getElementById("create_plugin_category").value;
		document.getElementById("create-plugin-output").innerHTML ='';

		$.ajax({
			url: '<?= $this -> config -> site_url()?>Last/create_plugin',
			type: 'GET',
			dataType: 'json',
			data: {plugin_name : plugin_name, plugin_json: plugin_json, plugin_code: plugin_code, plugin_category: plugin_category},
			contentType: 'application/json',
			success: function(response){
				//alert(JSON.stringify(response));
				//document.getElementById("output").innerHTML = JSON.stringify(response);
				document.getElementById('loading_bar').style.visibility='hidden';
				document.getElementById("create-plugin-output").innerHTML = '<pre>'+plugin_name+': <br />'+JSON.stringify(response) +'</pre>';
			},
			error: function(response){
				//alert(JSON.stringify(response));
				//document.getElementById("output").innerHTML = response.responseText;
				document.getElementById('loading_bar').style.visibility='hidden';
				document.getElementById("create-plugin-output").innerHTML = '<pre>'+plugin_name+': <br />'+JSON.stringify(response) +'</pre>';
			}
		});
	});

	
	$('#destroy_plugin').click(function(){
		if($('#destroy_pluginlist option:selected').length == 0) { alert('Select a Plugin'); }
		else{
			//document.getElementById('loading_bar').style.visibility='visible';
			var list = document.getElementById("destroy_pluginlist");
			document.getElementById("destroy-plugin-output").innerHTML ='';

			var selected_list = [];

			for(var i=0; i< list.length; i++){
                		if (list.options[i].selected)
                        		selected_list.push(list[i].value);
	                }

			for(var i=0; i< selected_list.length; i++){
				//---------------------------------------------------------------------------------
				(function(i){
					setTimeout(function(){
				//---------------------------------------------------------------------------------
						var plugin_name = selected_list[i];

                                                $.ajax({
                                                        url: '<?= $this -> config -> site_url()?>Last/destroy_plugin',
                                                        type: 'GET',
                                                        dataType: 'json',
                                                        data: {plugin_name : plugin_name},
                                                        contentType: 'application/json',
                                                        success: function(response){
                                                                //alert(JSON.stringify(response));
                                                                //document.getElementById("output").innerHTML += board_id +': '+JSON.stringify(response) +'<br />';
								if(i==selected_list.length-1) document.getElementById('loading_bar').style.visibility='hidden';
                                                                document.getElementById("destroy-plugin-output").innerHTML += plugin_name+': '+JSON.stringify(response.result) +'<br />';
                                                        },
                                                        error: function(response){
                                                                //alert(JSON.stringify(response));
                                                                //document.getElementById("output").innerHTML += board_id +': '+response.responseText +'<br />';
                                                                //document.getElementById("output").innerHTML += '<pre>'+board_id +': <br />'+JSON.stringify(response) +'</pre>';
								if(i==selected_list.length-1) document.getElementById('loading_bar').style.visibility='hidden';
                                                                document.getElementById("destroy-plugin-output").innerHTML += plugin_name+': '+JSON.stringify(response.result) +'<br />';
                                                        }
                                                });
                                //---------------------------------------------------------------------------------
                                        },delay*i);
                                })(i);
                                //---------------------------------------------------------------------------------
			}
		}
	});



        document.getElementById('userfile').addEventListener('change', readFile, false);
        document.getElementById('userfile').element_id = "create_plugin_code";



	$('#inject_plugin').click(function(){

		if ($('#inject_yunlist option:selected').length == 0) { alert('Select a Board'); }
		else {
			//document.getElementById('loading_bar').style.visibility='visible';
			var list = document.getElementById("inject_yunlist");
			var selected_list = [];
			var output_string = '';

			document.getElementById("inject-plugin-output").innerHTML ='';
			//var plugin_name = document.getElementById("inject_plugin_name").value;
			var plugin_name = document.getElementById("inject_pluginlist").value;
			var inject_autostart = document.getElementById("inject_autostart").value;

			//for(var i=0; i<$('#inject_yunlist option:selected').length; i++){
			for(var i=0; i< list.length; i++){
				if (list.options[i].selected)
					selected_list.push(list[i].value);
			}
			//alert(plugin_name+' '+inject_autostart+' '+list.length);
			for(var i=0; i< selected_list.length; i++){
				//---------------------------------------------------------------------------------		
				(function(i){
					setTimeout(function(){
				//---------------------------------------------------------------------------------
						var board_id = selected_list[i];
						$.ajax({
							url: '<?= $this -> config -> site_url()?>Last/inject_plugin',
							type: 'GET',
							dataType: 'json',
							data: {plugin_name : plugin_name, board: board_id, inject_autostart: inject_autostart},
							contentType: 'application/json',
							success: function(response){
								//alert(JSON.stringify(response));
								//document.getElementById("output").innerHTML += board_id +': '+JSON.stringify(response) +'<br />';
								if(i==selected_list.length-1) document.getElementById('loading_bar').style.visibility='hidden';
								document.getElementById("inject-plugin-output").innerHTML += board_id+ ' with '+ plugin_name+': '+JSON.stringify(response.result) +'<br />';
							},
							error: function(response){
								//alert(JSON.stringify(response));
								//document.getElementById("output").innerHTML += board_id +': '+response.responseText +'<br />';
								//document.getElementById("output").innerHTML += '<pre>'+board_id +': <br />'+JSON.stringify(response) +'</pre>';
								if(i==selected_list.length-1) document.getElementById('loading_bar').style.visibility='hidden';
								document.getElementById("inject-plugin-output").innerHTML += board_id+ ' with '+plugin_name+': '+JSON.stringify(response.result) +'<br />';
							}
						});
				//---------------------------------------------------------------------------------
					},delay*i);
				})(i);
				//---------------------------------------------------------------------------------
			}
		}
	});



	$('.startstop_plugin').click(function(){
                if ($('#startstop_yunlist option:selected').length == 0) { alert('Select a Board'); }
                else {
			//document.getElementById('loading_bar').style.visibility='visible';
			var start_stop_flag = this.id;
                        var list = document.getElementById("startstop_yunlist");

                        var selected_list = [];

                        //var plugin_name = document.getElementById("startstop_plugin_name").value;
			var plugin_name = document.getElementById("startstop_pluginlist").value;

			startstop_pluginlist

			var plugin_json = document.getElementById("startstop_plugin_json").value;

			document.getElementById("startstop-plugin-output").innerHTML ='';

                        for(var i=0; i< list.length; i++){
                                if (list.options[i].selected)
                                        selected_list.push(list[i].value);
                        }

                        for(var i=0; i< selected_list.length; i++){

                                //---------------------------------------------------------------------------------             
                                (function(i){
                                        setTimeout(function(){
                                //---------------------------------------------------------------------------------

		                                var board_id = selected_list[i];
                		                if(start_stop_flag == "start"){
//                                		        url_startstop = '<?= $this -> config -> site_url()?>Last/run_plugin';
//		                                        data_startstop = {plugin_name: plugin_name, board: board_id, plugin_json: plugin_json};
                                                $.ajax({
                                                        url: '<?= $this -> config -> site_url()?>Last/run_plugin',
                                                        type: 'GET',
                                                        dataType: 'json',
							data: {plugin_name: plugin_name, board: board_id, plugin_json: plugin_json},
                                                        contentType: 'application/json',
                                                        success: function(response){
                                                                //alert(JSON.stringify(response));
                                                                //document.getElementById("output").innerHTML = JSON.stringify(response);
								if(i==selected_list.length-1) document.getElementById('loading_bar').style.visibility='hidden';
                                                                document.getElementById("startstop-plugin-output").innerHTML += board_id +': '+JSON.stringify(response) +'<br />';
                                                        },
                                                        error: function(response){
                                                                //alert(JSON.stringify(response));
                                                                //document.getElementById("output").innerHTML = response.responseText;
								if(i==selected_list.length-1) document.getElementById('loading_bar').style.visibility='hidden';
                                                                document.getElementById("startstop-plugin-output").innerHTML += board_id +': '+JSON.stringify(response) +'<br />';
                                                        }
                                                });
		                                }
                		                else if(start_stop_flag == "stop"){
//                                		        url_startstop = '<?= $this -> config -> site_url()?>Last/kill_plugin';
//		                                        data_startstop = {plugin_name: plugin_name, board: board_id};
                                                $.ajax({
                                                        url: '<?= $this -> config -> site_url()?>Last/kill_plugin',
                                                        type: 'GET',
                                                        dataType: 'json',
                                                        data: {plugin_name: plugin_name, board: board_id},
                                                        contentType: 'application/json',
                                                        success: function(response){
                                                                //alert(JSON.stringify(response));
                                                                //document.getElementById("output").innerHTML = JSON.stringify(response);
								if(i==selected_list.length-1) document.getElementById('loading_bar').style.visibility='hidden';
                                                                document.getElementById("startstop-plugin-output").innerHTML += board_id +': '+JSON.stringify(response) +'<br />';
                                                        },
                                                        error: function(response){
                                                                //alert(JSON.stringify(response));
                                                                //document.getElementById("output").innerHTML = response.responseText;
								if(i==selected_list.length-1) document.getElementById('loading_bar').style.visibility='hidden';
                                                                document.getElementById("startstop-plugin-output").innerHTML += board_id +': '+JSON.stringify(response) +'<br />';
                                                        }
                                                });
                		                }
                                //---------------------------------------------------------------------------------
                                        },delay*i);
                                })(i);
                                //---------------------------------------------------------------------------------
                        }
		}
	});


        $('#call_plugin').click(function(){
                if ($('#call_yunlist option:selected').length == 0) { alert('Select a Board'); }
                else {
			//document.getElementById('loading_bar').style.visibility='visible';
                        var list = document.getElementById("call_yunlist");
                        var selected_list = [];

                        var plugin_name = document.getElementById("call_pluginlist").value;
                        var plugin_json = document.getElementById("call_plugin_json").value;

			document.getElementById("call-plugin-output").innerHTML = '';

                        for(var i=0; i< list.length; i++){
                                if (list.options[i].selected)
                                        selected_list.push(list[i].value);
                        }
                        
                        for(var i=0; i< selected_list.length; i++){

                                //---------------------------------------------------------------------------------             
                                (function(i){
                                        setTimeout(function(){
                                //---------------------------------------------------------------------------------
						var board_id = selected_list[i];
                                                $.ajax({
							url: '<?= $this -> config -> site_url()?>Last/call_plugin',
                                                        type: 'GET',
                                                        dataType: 'json',
							data: {plugin_name : plugin_name, board: board_id, plugin_json: plugin_json},
                                                        contentType: 'application/json',
                                                        success: function(response){
                                                                //alert(JSON.stringify(response));
                                                                //document.getElementById("output").innerHTML = JSON.stringify(response);
								if(i==selected_list.length-1) document.getElementById('loading_bar').style.visibility='hidden';
                                                                document.getElementById("call-plugin-output").innerHTML += board_id +': '+JSON.stringify(response) +'<br />';
                                                        },
                                                        error: function(response){
                                                                //alert(JSON.stringify(response));
                                                                //document.getElementById("output").innerHTML = response.responseText;
								if(i==selected_list.length-1) document.getElementById('loading_bar').style.visibility='hidden';
                                                                document.getElementById("call-plugin-output").innerHTML += board_id +': '+JSON.stringify(response) +'<br />';
                                                        }
                                                });
                                //---------------------------------------------------------------------------------
                                        },delay*i);
                                })(i);
                                //---------------------------------------------------------------------------------
                        }
                }
        });


        $('#remove_plugin').click(function(){

		//document.getElementById('loading_bar').style.visibility='visible';
		var board_id = document.getElementById("remove_plugin_yunlist").value;

                //var plugin_name = document.getElementById("remove_pluginlist").value;
		var list = document.getElementById("remove_pluginlist");
                var selected_list = [];
                for(var i=0; i< list.length; i++){
	                if (list.options[i].selected)
        	                selected_list.push(list[i].value);
                }

                document.getElementById("remove-plugin-output").innerHTML ='';

		for(var i=0; i< selected_list.length; i++){
			//---------------------------------------------------------------------------------
			(function(i){
				setTimeout(function(){
			//---------------------------------------------------------------------------------
					var plugin_name = selected_list[i];
			                $.ajax({
                        			url: '<?= $this -> config -> site_url()?>Last/remove_plugin',
			                        type: 'GET',
			                        dataType: 'json',
			                        data: {board_id: board_id, plugin_name : plugin_name},
			                        contentType: 'application/json',
                        			success: function(response){
			                                //alert(JSON.stringify(response));
                        			        //document.getElementById("output").innerHTML = JSON.stringify(response);
							if(i==selected_list.length-1) document.getElementById('loading_bar').style.visibility='hidden';
			                                document.getElementById("remove-plugin-output").innerHTML += '<pre>'+plugin_name+': <br />'+JSON.stringify(response.result) +'</pre>';
			                        },
                        			error: function(response){
			                                //alert(JSON.stringify(response));
			                                //document.getElementById("output").innerHTML = response.responseText;
							if(i==selected_list.length-1) document.getElementById('loading_bar').style.visibility='hidden';
			                                document.getElementById("remove-plugin-output").innerHTML += '<pre>'+plugin_name+': <br />'+JSON.stringify(response.result) +'</pre>';
			                        }
			                });
			//---------------------------------------------------------------------------------
				},delay*i);
			})(i);
			//---------------------------------------------------------------------------------
		}
        });
	// #############################################################################################################################################


									// NETWORK MANAGEMENT
	// #############################################################################################################################################
        $('[data-reveal-id="modal-show-networks"]').on('click',
                function() {
                	$('#show-networks-output').empty();
		        $.ajax({
                	        url: '<?= $this -> config -> site_url()?>Last/show_network',
	                        type: 'GET',
	                        contentType: 'application/json',
        	                success: function(response){
                        	        document.getElementById("show-networks-output").innerHTML = '<pre>'+response +'</pre>';
                	        },
                        	error: function(response){
	                                document.getElementById("show-networks-output").innerHTML = '<pre>'+response +'</pre>';
                	        }
	                });
                }
        );


        $('#create_network').click(function(){
		//document.getElementById('loading_bar').style.visibility='visible';
                var create_network_name = document.getElementById("create_network_name").value;
                var create_network_ip = document.getElementById("create_network_ip").value;

                $.ajax({
                        url: '<?= $this -> config -> site_url()?>Last/create_network',
                        type: 'GET',
                        dataType: 'json',
                        data: {create_network_name: create_network_name, create_network_ip: create_network_ip},
                        contentType: 'application/json',
                        success: function(response){
                                //alert(JSON.stringify(response));
				document.getElementById('loading_bar').style.visibility='hidden';
                                document.getElementById("create-net-output").innerHTML = response.result+'<pre>'+JSON.stringify(response.log,null,"\t")+'</pre>';//JSON.stringify(response);
                                //document.getElementById("output").innerHTML = '<pre>'+response +'<br /></pre>';
                        },
                        error: function(response){
                                //alert(JSON.stringify(response));
				document.getElementById('loading_bar').style.visibility='hidden';
                                document.getElementById("create-net-output").innerHTML = response.result;
                                //document.getElementById("output").innerHTML = '<pre>'+response+'<br /></pre>';
                        }
                });
        });



        $('#destroy_network').click(function(){
		if ($('#destroy_network_uuid option:selected').length == 0) { alert('Select a Network'); }
                else {
			//document.getElementById('loading_bar').style.visibility='visible';
                        var list = document.getElementById("destroy_network_uuid");
			document.getElementById("destroy-net-output").innerHTML ='';

                        var selected_list = [];
                        for(var i=0; i< list.length; i++){
                                if (list.options[i].selected)
                                        selected_list.push(list[i].value);
                        }

                        for(var i=0; i< selected_list.length; i++){
                                //---------------------------------------------------------------------------------
                                (function(i){
                                        setTimeout(function(){
                                //---------------------------------------------------------------------------------
                                                var net_uuid = selected_list[i];

				                $.ajax({
				                        url: '<?= $this -> config -> site_url()?>Last/destroy_network',
				                        type: 'GET',
				                        dataType: 'json',
				                        data: {destroy_network_uuid: net_uuid},
				                        contentType: 'application/json',
				                        success: function(response){
                                				//alert(JSON.stringify(response));
								if(i==selected_list.length-1) document.getElementById('loading_bar').style.visibility='hidden';
				                                document.getElementById("destroy-net-output").innerHTML = '<pre>'+JSON.stringify(response.result,null,"\t")+'</pre>';;
				                                //document.getElementById("output").innerHTML = '<pre>'+response +'<br /></pre>';
				                        },
				                        error: function(response){
				                                //alert(JSON.stringify(response));
								if(i==selected_list.length-1) document.getElementById('loading_bar').style.visibility='hidden';
				                                document.getElementById("destroy-net-output").innerHTML = JSON.stringify(response);
				                                //document.getElementById("output").innerHTML = '<pre>'+response+'<br /></pre>';
				                        }
				                });
                                //---------------------------------------------------------------------------------
                                        },delay*i);
                                })(i);
                                //---------------------------------------------------------------------------------
                        }
                } //end else
	});


        $('#addboard_network').click(function(){
		//document.getElementById('loading_bar').style.visibility='visible';
                //var addboard_network_uuid = document.getElementById("addboard_network_uuid").value;
		var addboard_network_uuid = $("#addboard_network_uuid option:selected").val();
                var board_id =$('#addboard_yunlist').val();
                var addboard_network_ip = document.getElementById("addboard_network_ip").value;

                $.ajax({
                        url: '<?= $this -> config -> site_url()?>Last/add_to_network',
                        type: 'GET',
                        dataType: 'json',
                        data: {addboard_network_uuid: addboard_network_uuid, board: board_id, addboard_network_ip: addboard_network_ip},
                        contentType: 'application/json',
                        success: function(response){
                                //alert(JSON.stringify(response));
				document.getElementById('loading_bar').style.visibility='hidden';
                                document.getElementById("add-board-net-output").innerHTML = response.result+ '<br /><br /><pre>'+JSON.stringify(response.log,null,"\t")+'</pre>';
                                //document.getElementById("output").innerHTML = '<pre>'+response +'<br /></pre>';
                        },
                        error: function(response){
                                //alert(JSON.stringify(response));
				document.getElementById('loading_bar').style.visibility='hidden';
                                document.getElementById("add-board-net-output").innerHTML = response.result;
                                //document.getElementById("output").innerHTML = '<pre>'+response+'<br /></pre>';
                        }
                });
        });


        $('#removeboard_network').click(function(){
		//document.getElementById('loading_bar').style.visibility='visible';
		var removeboard_network_uuid = $("#removeboard_network_uuid option:selected").val();
		var list = document.getElementById("removeboard_yunlist");
		if ($('#removeboard_yunlist option:selected').length == 0) { alert('Select a Board') }
		else {
			document.getElementById("remove-board-net-output").innerHTML ='';
/*
                if ($('#removeboard_yunlist option:selected').length == 0) { alert('Select a Network'); }
                else {
                        var list = document.getElementById("removeboard_yunlist");
			//var removeboard_network_uuid = document.getElementById("removeboard_network_uuid").value;
			var removeboard_network_uuid = $("#removeboard_network_uuid option:selected").val();
			alert(removeboard_network_uuid);
                        document.getElementById("remove-board-net-output").innerHTML ='';
*/
                        var selected_list = [];
                        for(var i=0; i< list.length; i++){
                                if (list.options[i].selected){
                                        selected_list.push(list[i].value);
				}
                        }

                        for(var i=0; i< selected_list.length; i++){
                                //---------------------------------------------------------------------------------
                                (function(i){
                                        setTimeout(function(){
                                //---------------------------------------------------------------------------------
						var board_id = selected_list[i];

                                                $.ajax({
                                                        url: '<?= $this -> config -> site_url()?>Last/remove_from_network',
                                                        type: 'GET',
                                                        dataType: 'json',
                                                        //data: {destroy_network_uuid: net_uuid},
							data: {removeboard_network_uuid: removeboard_network_uuid, board: board_id},
                                                        contentType: 'application/json',
                                                        success: function(response){
                                                                //alert(JSON.stringify(response));
								if(i==selected_list.length-1) document.getElementById('loading_bar').style.visibility='hidden';
                                                                document.getElementById("remove-board-net-output").innerHTML += '<pre>'+JSON.stringify(response.result,null,"\t")+'</pre>';
                                                                //document.getElementById("output").innerHTML = '<pre>'+response +'<br /></pre>';
                                                        },
                                                        error: function(response){
                                                                //alert(JSON.stringify(response));
								if(i==selected_list.length-1) document.getElementById('loading_bar').style.visibility='hidden';
                                                                document.getElementById("remove-board-net-output").innerHTML += response.result;
                                                                //document.getElementById("output").innerHTML = '<pre>'+response+'<br /></pre>';
                                                        }
                                                });
                                //---------------------------------------------------------------------------------
                                        },delay*i);
                                })(i);
                                //---------------------------------------------------------------------------------
                        }
                } //end else
        });


        $('#show_boards').click(function(){
		//document.getElementById('loading_bar').style.visibility='visible';
                var show_boards_uuid = document.getElementById("show_boards_uuid").value;
                $.ajax({
                        url: '<?= $this -> config -> site_url()?>Last/show_boards',
                        type: 'GET',
                        dataType: 'json',
                        data: {show_boards_uuid: show_boards_uuid},
                        contentType: 'application/json',
                        success: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
                                document.getElementById("show_boards-output").innerHTML = '<pre>'+JSON.stringify(response.result,null,"\t")+'</pre>';
                                //alert(response);
                                //document.getElementById("output").innerHTML = '<pre>'+response+'<br /></pre>';
                        },
                        error: function(response){
                                //alert(JSON.stringify(response));
				document.getElementById('loading_bar').style.visibility='hidden';
                                document.getElementById("show_boards-output").innerHTML = JSON.stringify(response);
                                //document.getElementById("output").innerHTML = '<pre>'+response+'<br /></pre>';
                        }
                });
        });



        $('#activate_boardnet_network').click(function(){
		//document.getElementById('loading_bar').style.visibility='visible';
                var activate_boardnet_uuid = document.getElementById("activate_boardnet_yunlist").value;
                $.ajax({
                        url: '<?= $this -> config -> site_url()?>Last/activate_board_net',
                        type: 'GET',
                        dataType: 'json',
                        data: {activate_boardnet_uuid: activate_boardnet_uuid},
                        contentType: 'application/json',
                        success: function(response){
				document.getElementById('loading_bar').style.visibility='hidden';
                                document.getElementById("activate-board-net-output").innerHTML = '<pre>'+JSON.stringify(response.result,null,"\t")+'</pre>';
                                //alert(response);
                                //document.getElementById("output").innerHTML = '<pre>'+response+'<br /></pre>';
                        },
                        error: function(response){
                                //alert(JSON.stringify(response));
				document.getElementById('loading_bar').style.visibility='hidden';
                                document.getElementById("activate-board-net-output").innerHTML = JSON.stringify(response);
                                //document.getElementById("output").innerHTML = '<pre>'+response+'<br /></pre>';
                        }
                });
        });
	// #############################################################################################################################################



	window.onload = function() {
		refresh_lists();
	};
</script>


<!-- STOP script section -->
