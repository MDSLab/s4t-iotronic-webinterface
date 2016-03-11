
<!-- START web page layout -->

<!-- GLOBAL VARIABLES -->
<? $selectbox_size = 6; ?>

<!-- YUNLIST -->
<!--
<? $yunlist = json_decode($result, true); ?>
<? 
	$yunlist_all = array();
	$yunlist_c = array(); 
	$yunlist_d = array();
?>
<? if (sizeof($yunlist["list"]) > 0): ?>
	<? foreach ($yunlist["list"] as $board): ?>
		<? if ($board["status"] == "C"): ?>
			<? array_push($yunlist_c, $board["board_code"]) ?>
		<? elseif ($board["status"] == "D"): ?>
			<? array_push($yunlist_d, $board["board_code"]) ?>
		<? endif ?>
	<? array_push($yunlist_all, $board["board_code"]) ?>
	<? endforeach ?>
<? endif ?>
-->



<!-- NETLIST -->
<!--
<? $netlist = json_decode($networks_list, true); ?>
<? $active_nets = array(); ?>

<? if (sizeof($netlist["result"]) > 0): ?>
	<? foreach ($netlist["result"] as $net): ?>
		<? array_push($active_nets, $net["uuid"]); ?>
	<? endforeach ?>
<? endif ?>
-->
<!-- <?= print_r($netlist) ?> -->
<!-- <?= print_r($active_nets) ?> -->


<table style="width:99%; margin: 0 auto">
	<td valign="top">
		<!-- <div style="width:200px;overflow: auto;"> -->
		<div style="width:320px;overflow: auto;">
			<center><h2>Boards</h2></center>
	                <table style="width:100%" border="0" >
                        <tr style="height:50%">
                                <td>
                                        <center><h3>Connected</h3></center>
					<!-- <select id="yunlist_c" size="<?=$selectbox_size?>" style="width:170px; height:100px" data-yunlist-selected="yunlist_c" data-reveal-id="modal-plugins_sensors-lists"></select> -->
					<select id="yunlist_c" size="<?=$selectbox_size?>" style="width:290px; height:100px" data-yunlist-selected="yunlist_c" data-reveal-id="modal-plugins_sensors-lists"></select>
<!--
                                        <? if (sizeof($yunlist_c) > 0): ?>
						<select id="yunlist_c" size="<?=$selectbox_size?>" style="width:170px; height:100px" data-yunlist-selected="yunlist_c" data-reveal-id="modal-plugins_sensors-lists">
                                                        <? foreach ($yunlist_c as $board): ?>
                                                                <option value="<?=$board ?>"> <?=$board?> </option>
                                                        <? endforeach ?>
                                                </select>
                                        <? else: ?>
                                                NO boards connected
                                        <? endif ?>
-->
                                </td>
                        </tr>
                        <tr style="height:50%">
                                <td>
                                        <center><h3>Disconnected</h3></center>
					<!-- <select id="yunlist_d" size="<?=$selectbox_size?>" style="width:170px; height:100px" data-yunlist-selected="yunlist_d" data-reveal-id="modal-plugins_sensors-lists"></select> -->
					<select id="yunlist_d" size="<?=$selectbox_size?>" style="width:290px; height:100px" data-yunlist-selected="yunlist_d" data-reveal-id="modal-plugins_sensors-lists"></select>
<!--
                                        <? if (sizeof($yunlist_d) > 0): ?>
                                                <select id="yunlist_d" size="<?=$selectbox_size?>" style="width:170px; height:100px" data-yunlist-selected="yunlist_d" data-reveal-id="modal-plugins_sensors-lists">
                                                        <? foreach ($yunlist_d as $board): ?>
                                                                <option value="<?=$board ?>"> <?=$board?> </option>
                                                        <? endforeach ?>
                                                </select>
                                        <? else : ?>
                                                NO boards disconnected
                                        <? endif ?>
-->
                                </td>
                        </tr>
			<tr><td><center><button class="button tiny radius" data-reveal-id="modal-register-new-board" onclick="generate_uuid(); sensor_list(); refresh_lists();">Register Board</button></center></td></tr>
			<tr><td><center><button class="button tiny radius" data-reveal-id="modal-update-board" onclick="update_boards('update_yunlist'); refresh_lists();">Update Board</button></center></td></tr>
			<tr><td><center><button class="button tiny radius" data-reveal-id="modal-unregister-board" onclick="update_boards('unregister_boardlist'); refresh_lists();">Unregister Board</button></center></td></tr>
        	        </table>
		</div>
	</td>
	<td valign="top">
        	<table border="0" style="width:100%" >
                        <tr style="height:20%">
                                <center><h2>Commands</h2></center>
                                <td>
                                        <center><h3>Board Management</h3></center>
					<button class="button tiny radius" data-reveal-id="modal-led-management" onclick="update_boards('led_yunlist', 'C'); refresh_lists();">LED</button>
					<button class="button tiny radius" data-reveal-id="modal-ssh-management" onclick="update_boards('ssh_yunlist', 'C'); refresh_lists();">SSH</button>
					<button class="button tiny radius" data-reveal-id="modal-ckan" onclick="update_boards('ckan-yunlist'); refresh_lists();">CKAN</button>
                                </td>
                        </tr>
			<tr style="height:20%">
				<td>
					<center><h3>Driver Management</h3></center>
					<button class="button tiny radius" data-reveal-id="modal-create-driver" onclick="refresh_lists();">Create</button>
					<button class="button tiny radius" data-reveal-id="modal-inject-driver" onclick="update_boards('call_yunlist', 'C'); refresh_lists();">Inject TBD</button>
					<button class="button tiny radius" data-reveal-id="modal-mount-umount-driver" onclick="/*update_boards('mount_umount_yunlist', 'C'); refresh_lists();*/">Mount/Unmount</button>
				</td>
			</tr>
                        <tr style="height:20%">
                                <td>
                                        <center><h3>Plugin Management</h3></center>
                                        <button class="button tiny radius" data-reveal-id="modal-create-plugin" onclick="refresh_lists();">Create</button>
					<button class="button tiny radius" data-reveal-id="modal-destroy-plugin" onclick="refresh_cloud_plugins('destroy_pluginlist'); refresh_lists();">Cloud Remove</button>
                                        <button class="button tiny radius" data-reveal-id="modal-inject-plugin" onclick="refresh_cloud_plugins('inject_pluginlist'); update_boards('inject_yunlist', 'C'); refresh_lists();">Inject</button>
					<button class="button tiny radius" data-reveal-id="modal-startstop-plugin" onclick="update_boards('startstop_yunlist', 'C'); refresh_lists();">Start/Stop</button>
                                        <button class="button tiny radius" data-reveal-id="modal-call-plugin" onclick="update_boards('call_yunlist', 'C'); refresh_lists();">Call</button>
					<button class="button tiny radius" data-reveal-id="modal-remove-plugin" onclick="update_boards('remove_plugin_yunlist', 'C'); refresh_lists();">Board Remove</button>
                                </td>
                        </tr>
                        <tr style="height:20%">
                                <td>
                                        <center><h3>Network Management</h3></center>
					<button class="button tiny radius" data-reveal-id="modal-show-networks" onclick="refresh_lists();">Show Networks</button>
                                        <button class="button tiny radius" data-reveal-id="modal-create-net" onclick="refresh_lists();">Create Network</button>
                                        <button class="button tiny radius" data-reveal-id="modal-destroy-net" onclick="update_nets('destroy_network_uuid'); refresh_lists();">Destroy Network</button>
                                        <button class="button tiny radius" data-reveal-id="modal-add-board-net" onclick="update_nets('addboard_network_uuid'); update_boards('addboard_yunlist', 'C'); refresh_lists();">Add Board</button>
                                        <button class="button tiny radius" data-reveal-id="modal-remove-board-net" onclick="update_nets('removeboard_network_uuid'); update_boards('removeboard_yunlist', 'C'); refresh_lists();">Remove Board</button>
                                        <button class="button tiny radius" data-reveal-id="modal-show-boards-net" onclick="update_nets('show_boards_uuid'); refresh_lists();">Show Boards</button>
					<button class="button tiny radius" data-reveal-id="modal-activate-boards-net" onclick="update_boards('activate_boardnet_yunlist', 'C'); refresh_lists();">Start Network on Board</button>
                                </td>
                        </tr>
                </table>
        </td>
        <td valign="top">
                <div id="mapdiv" style="height: 650px; width: 550px; float:right;" ></div>
        </td>
</table>









<!-- SSH SECTION: TBD -->
<!--
<table style="width:99%; margin: 0 auto">
<td style="width:50%"></td>
<td style="width:50%">
	<div>
		<object type="text/html" data="https://212.189.207.205:3000" width="100%" height="200px" style=" /*overflow:auto;border:5px ridge blue*/"></object>
	</div>
</td>
</table>

-->
<!-- STOP web page layout -->



<!-- START modal section -->

<div id="modal-plugins_sensors-lists" class="reveal-modal small" data-reveal>
        <section>
                <h3>Sensors and Plugins on Board</h3>
                <a class="close-reveal-modal" aria-label="Close">&#215;</a>
                <fieldset>
                        <div class="row">
                                <label>Plugins</label>
                                        <select id="plugins_on_board" multiple="multiple" size="<?=$selectbox_size?>"></select>

                                <label>Sensors</label>
                                        <select id="sensors_on_board" multiple="multiple" size="<?=$selectbox_size?>"></select>
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
					<select id="led_yunlist" multiple="multiple" size="<?=$selectbox_size?>">
					</select>
<!--
					<? if (sizeof($yunlist_c) > 0): ?>
                                                <select id="led_yunlist" multiple="multiple" size="<?=$selectbox_size?>">
                                                        <? foreach ($yunlist_c as $board): ?>
                                                                <option value="<?=$board ?>"> <?=$board?> </option>
                                                        <? endforeach ?>

                                                </select>
                                        <? else: ?>
                                                NO boards connected
                                        <? endif ?>
-->
				<label>Select PIN (example: YUN led on pin 13)</label>
                                <select id="pin">
                                        <option value="0">0</option>
                                        <option value="1">1</option>
					<option value="...">...</option>
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
                        <!-- <button id="led-management" class="close-reveal-modal tiny radius" style="font-size:1.0rem; color:#fff" > -->
			<button id="led-management" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;">
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
                        <!-- <button id="ssh-management" class="close-reveal-modal tiny radius" style="font-size:1.0rem; color:#fff" > -->
                        <button id="ssh-management" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;">
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


<div id="modal-ckan" class="reveal-modal small" data-reveal>
        <section>
               <h3>CKAN Redirect</h3>
               <a class="close-reveal-modal" aria-label="Close">&#215;</a>
			<select id="ckan-yunlist" multiple="multiple" size="<?=$selectbox_size?>"></select>

                   <div class="row">
                    <div class="large-12 columns">
                        <button id="ckan_button" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;">
                            Open New Tab
                        </button>
                    </div>
                   </div>
        </section>
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
                        <button id="register-board" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;">
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
                        <button id="update-board" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;">
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
<!--
                        <? if (sizeof($yunlist_all) > 0): ?>
                                <select id="unregistration_yunlist" multiple="multiple" size="<?=$selectbox_size?>">
                                        <? foreach ($yunlist_all as $board): ?>
                                                <option value="<?=$board ?>"> <?=$board?> </option>
                                        <? endforeach ?>
                                </select>
                        <? else: ?>
                                NO boards connected
                        <? endif ?>
-->
				<select id="unregister_boardlist">
                                	<option value="--">--</option>
                                </select>
                        </div>
                   </fieldset>
                   <div class="row">
                    <div class="large-12 columns">
                        <button id="unregister-board" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;">
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
                        <button id="create_driver" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;">
                            Send
                        </button>
                    </div>
                   </div>
        </section>
        <fieldset>
                <legend>Output</legend>
                <p id="create-driver-output" />
        </fieldset>
</div>








<div id="modal-mount-umount-driver" class="reveal-modal small" data-reveal>
        <section>
                <h3>Mount / Unmount Driver</h3>
                <a class="close-reveal-modal" aria-label="Close">&#215;</a>
                   <fieldset>
                        <legend>Driver Management</legend>
                        <div class="row">
				<label>Board List</legend>
<!--
					<select id="mount_umount_yunlist"></select>
-->
					<select id="mount_umount_yunlist">
                                                <option value="yun1">yun1</option>
                                                <option value="yun2">yun2</option>
                                                <option value="yun3">yun3</option>
                                        </select>
                                <label>Driver Name</legend>
<!--
                                        <select id="mount_umount_driverlist" multiple="multiple" size="<?=$selectbox_size?>"></select>
-->
					<!-- GESTIRE L'UPDATE !!!!! -->
					<select id="mount_umount_driverlist" multiple="multiple" size="<?=$selectbox_size?>">
						<option value="prova1">prova1</option>
						<option value="prova2">prova2</option>
						<option value="prova3">prova3</option>
					</select>
                        </div>
                   </fieldset>
                   <div class="row">
                    <div class="large-12 columns">
                        <button id="mount" class="button tiny radius mount_umount_driver" style="font-size:1.0rem; color:#fff; float:right;">
                            Mount
                        </button>
                        <button id="umount" class="button tiny radius mount_umount_driver" style="font-size:1.0rem; color:#fff; float:right;">
                            Unmount
                        </button>
                    </div>
                   </div>
        </section>
        <fieldset>
                <legend>Output</legend>
                <p id="mount-umount-output" />
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
                        <!-- <button id="create_plugin" class="close-reveal-modal tiny radius" style="font-size:1.0rem; color:#fff" > -->
			<button id="create_plugin" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;">
                            Send
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
                        <button id="destroy_plugin" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;">
                            Send
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
                                <label>Plugin Name</legend>
                                        <!-- <input id="inject_plugin_name" type="text" placeholder="Plugin Name" name="name" value="" /> -->
					<select id="inject_pluginlist"></select>
                                
                                <label>Board List</legend>
					<select id="inject_yunlist" multiple="multiple" size="<?=$selectbox_size?>"></select>
<!--
                                        <? if (sizeof($yunlist_c) > 0): ?>
                                                <select id="inject_yunlist" multiple="multiple" size="<?=$selectbox_size?>">
                                                        <? foreach ($yunlist_c as $board): ?>
                                                                <option value="<?=$board ?>"> <?=$board?> </option>
                                                        <? endforeach ?>
                                                </select>
                                        <? else: ?>
                                                NO boards connected
                                        <? endif ?>
-->
                                
				<label>Autostart</legend>
					<select id="inject_autostart">
						<option value="false">False</option>
						<option value="true">True</option>
					</select>
				
                        </div>
                   </fieldset>
                   <div class="row">
                    <div class="large-12 columns">
                        <!-- <button id="inject_plugin" class="close-reveal-modal tiny radius" style="font-size:1.0rem; color:#fff" > -->
			<button id="inject_plugin" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;">
                            Send
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
                                <label>Plugin Name</legend>
                                        <input id="startstop_plugin_name" type="text" placeholder="Plugin Name" name="name" value="" />

                                <label>Board List</legend>
					<select id="startstop_yunlist" multiple="multiple" size="<?=$selectbox_size?>"></select>
<!--
                                        <? if (sizeof($yunlist_c) > 0): ?>
                                                <select id="startstop_yunlist" multiple="multiple" size="<?=$selectbox_size?>">
                                                        <? foreach ($yunlist_c as $board): ?>
                                                                <option value="<?=$board ?>"> <?=$board?> </option>
                                                        <? endforeach ?>
                                                </select>
                                        <? else: ?>
                                                NO boards connected
                                        <? endif ?>
-->
                                <label>Plugin Json [OPTIONAL if stopping]</legend>
                                        <textarea id="startstop_plugin_json" placeholder="Insert here the json" name="text" rows="10"></textarea>

                        </div>
                   </fieldset>
                   <div class="row">
                    <div class="large-12 columns">
                        <!-- <button id="start_plugin" class="close-reveal-modal tiny radius" style="font-size:1.0rem; color:#fff" > -->
			<button id="start" class="button tiny radius startstop_plugin" style="font-size:1.0rem; color:#fff; float:right;">
                            Start
                        </button>
			<button id="stop" class="button tiny radius startstop_plugin" style="font-size:1.0rem; color:#fff; float:right;">
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
					<input id="call_plugin_name" type="text" placeholder="Plugin Name" name="name" value="" />

				<label>Board List</label>
					<select id="call_yunlist" multiple="multiple" size="<?=$selectbox_size?>"></select>
<!--
                                        <? if (sizeof($yunlist_c) > 0): ?>
                                                <select id="call_yunlist" multiple="multiple" size="<?=$selectbox_size?>">
                                                        <? foreach ($yunlist_c as $board): ?>
                                                                <option value="<?=$board ?>"> <?=$board?> </option>
                                                        <? endforeach ?>
                                                </select>
                                        <? else: ?>
                                                NO boards connected
                                        <? endif ?>
-->
				<label>Plugin Json</label>
					<textarea id="call_plugin_json" placeholder="Insert here the json" name="text" rows="10"></textarea>

			</div>
		</fieldset>
		<div class="row">
			<div class="large-12 columns">
				<!-- <button id="call_plugin" class="close-reveal-modal tiny radius" style="font-size:1.0rem; color:#fff" > -->
				<button id="call_plugin" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;">
					Send
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
                                <button id="remove_plugin" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;">
                                        Send
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
                                <!-- <button id="create_network" class="close-reveal-modal tiny radius" style="font-size:1.0rem; color:#fff" > -->
				<button id="create_network" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;">
                                        Send
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
                                <!--<select id="destroy_network_uuid" multiple="multiple" size="<?=$selectbox_size?>"> -->
				<select id="destroy_network_uuid" >
<!--
                                        <? foreach ($active_nets as $net): ?>
                                        	<option value="<?=$net?>"> <?=$net?> </option>
                                        <? endforeach ?>
-->
                                </select>
                                <!-- <input id="destroy_network_uuid" type="text" placeholder="Network UUID" name="name" value="" /> -->
                        </div>
                </fieldset>
                <div class="row">
                        <div class="large-12 columns">
                                <!-- <button id="destroy_network" class="close-reveal-modal tiny radius" style="font-size:1.0rem; color:#fff" > -->
				<button id="destroy_network" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;">
                                        Send
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
	                                <!-- <select id="addboard_network_uuid" size="<?=$selectbox_size?>"> -->
					<select id="addboard_network_uuid">
<!--
        	                                <? foreach ($active_nets as $net): ?>
                	                                <option value="<?=$net?>"> <?=$net?> </option>
                        	                <? endforeach ?>
-->
	                                </select>
        	                        <!-- <input id="addboard_network_uuid" type="text" placeholder="Network UUID" name="name" value="" /> -->

                                <label>Board</label>
                                        <? if (sizeof($yunlist_c) > 0): ?>
                                                <select id="addboard_yunlist">
                                                        <? foreach ($yunlist_c as $board): ?>
                                                                <option value="<?=$board ?>"> <?=$board?> </option>
                                                        <? endforeach ?>
                                                </select>
                                        <? else: ?>
                                                NO boards connected
                                        <? endif ?>

                                <label>IP Address [OPTIONAL]</label>
                                        <input id="addboard_network_ip" type="text" placeholder="IP Address (Example: 192.168.10.10)" name="ip" value="" />
                        </div>
                </fieldset>
                <div class="row">
                        <div class="large-12 columns">
                                <!-- <button id="addboard_network" class="close-reveal-modal tiny radius" style="font-size:1.0rem; color:#fff" > -->
				<button id="addboard_network" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;">
                                        Send
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
                                <!-- <select id="removeboard_network_uuid" size="<?=$selectbox_size?>"> -->
				<select id="removeboard_network_uuid">
<!--
                                        <? foreach ($active_nets as $net): ?>
                                                <option value="<?=$net?>"> <?=$net?> </option>
                                        <? endforeach ?>
-->
                                </select>
                                <!-- <input id="removeboard_network_uuid" type="text" placeholder="Network UUID" name="name" value="" /> -->

                                <label>Board</label>
					<select id="removeboard_yunlist" multiple="multiple" size="<?=$selectbox_size?>"></select>
<!--
                                        <? if (sizeof($yunlist_c) > 0): ?>
						<select id="removeboard_yunlist" multiple="multiple" size="<?=$selectbox_size?>">
                                                        <? foreach ($yunlist_c as $board): ?>
                                                                <option value="<?=$board ?>"> <?=$board?> </option>
                                                        <? endforeach ?>
                                                </select>
                                        <? else: ?>
                                                NO boards connected
                                        <? endif ?>
-->
                        </div>
                </fieldset>
                <div class="row">
                        <div class="large-12 columns">
                                <!-- <button id="removeboard_network" class="close-reveal-modal tiny radius" style="font-size:1.0rem; color:#fff" > -->
				<button id="removeboard_network" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;">
                                        Send
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
                                <label>Network UUID</legend>
                                <!-- <select id="show_boards_uuid" size="<?=$selectbox_size?>"> -->
				<select id="show_boards_uuid">
<!--
                                        <? foreach ($active_nets as $net): ?>
                                                <option value="<?=$net?>"> <?=$net?> </option>
                                        <? endforeach ?>
-->
                                </select>

                                <!-- <input id="show_boards_uuid" type="text" placeholder="Network UUID" name="name" value="" /> -->
                        </div>
                </fieldset>
                <div class="row">
                        <div class="large-12 columns">
                                <!-- <button id="show_boards" class="close-reveal-modal tiny radius" style="font-size:1.0rem; color:#fff" > -->
				<button id="show_boards" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;">
                                        Send
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
                                <button id="activate_boardnet_network" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;">
                                        Send
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

	function uuid(){
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}

	function generate_uuid(){
		var id = (uuid() + uuid() + "-" + uuid() + "-" + uuid() + "-" + uuid() + "-" + uuid() + uuid() + uuid());//.toUpperCase();
		$('#registration_name').val(id);
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


        function populate_plugins_and_sensors(data){
                $('#plugins_on_board').empty();
                $('#sensors_on_board').empty();

                var select = document.getElementById(data);
                if(data == "yunlist_c")
                        $('#yunlist_d option').removeAttr('selected');
                else
                        $('#yunlist_c option').removeAttr('selected');
                //alert(select.options[select.selectedIndex].value);

                if (select.selectedIndex != null){
			
			$.ajax({
				url: '<?= $this -> config -> site_url()?>Last/board_layout',
				type: 'GET',
				dataType: 'json',
				data: {board: select.options[select.selectedIndex].value},
				contentType: 'application/json',
				success: function(response){


					//Plugins		
					if(response.message.plugins.length == 0)
						$('#plugins_on_board').append('<option>NO plugin injected or running</option>');
					else{
						for(i=0; i<response.message.plugins.length; i++)
							$('#plugins_on_board').append('<option>'+response.message.plugins[i].name+' [STATUS: '+response.message.plugins[i].state+']</option>');
					}

					//Sensors
                                        if(response.message.sensors.length == 0)
                                                $('#sensors_on_board').append('<option>NO sensors installed</option>');
                                        else{
                                                for(i=0; i<response.message.sensors.length; i++)
                                                        $('#sensors_on_board').append('<option>'+response.message.sensors[i].type+'</option>');
                                        }

				},
				error: function(response){
					//alert('ERROR: '+JSON.stringify(response));
				}
			});
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
				if(select_id == 'remove_plugin_yunlist')
					$('#'+select_id).append('<option title="--" value="--" data-unit="">--</option>');

				for(var i=0; i<response.list.length; i++){
					if(status == "C"){
						if(response.list[i].status == "C")
							$('#'+select_id).append('<option title="'+response.list[i].board_code+'" value="'+response.list[i].board_code+'" data-unit="">'+response.list[i].board_code+'</option>');
					}
					else if(status == "D"){
						if(response.list[i].status == "D")
							$('#'+select_id).append('<option title="'+response.list[i].board_code+'" value="'+response.list[i].board_code+'" data-unit="">'+response.list[i].board_code+'</option>');
					}
					else
						$('#'+select_id).append('<option title="'+response.list[i].board_code+'" value="'+response.list[i].board_code+'" data-unit="">'+response.list[i].board_code+'</option>');
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
				for(var i=0; i<response.list.length; i++){
					if(response.list[i].status == "C")
						$('#yunlist_c').append('<option title="'+response.list[i].board_code+'" value="'+response.list[i].board_code+'" data-unit="">'+response.list[i].board_code+'</option>');
					else if(response.list[i].status == "D")
						$('#yunlist_d').append('<option title="'+response.list[i].board_code+'" value="'+response.list[i].board_code+'" data-unit="">'+response.list[i].board_code+'</option>');
				}
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
	                populate_plugins_and_sensors($(this).data('yunlistSelected'));
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
        	                                        for(i=0; i<response.message.plugins.length; i++)
                	                                        $('#remove_pluginlist').append('<option value="'+response.message.plugins[i].name+'">'+response.message.plugins[i].name+' [STATUS: '+response.message.plugins[i].state+']</option>');
                        	                }

	                                },
        	                        error: function(response){
                	                        //alert('ERROR: '+JSON.stringify(response));
	                                }
					
				});
			}
		}
	);


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
                                        for(i=0; i<response.message.length; i++)
                                                $('#'+select_id).append('<option value="'+response.message[i].name+'">'+response.message[i].name+'</option>');
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
                        var list = document.getElementById("led_yunlist");
			var led_action = $( "#led-action option:selected" ).val();
			var pin = $( "#pin option:selected" ).val(); //ON YUN IS '13'
                        document.getElementById("led-output").innerHTML ='';

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
                                                                document.getElementById("led-output").innerHTML += board_id +': '+JSON.stringify(response.result) +'<br />'; 
                                                        },
                                                        error: function(response){
                                                                //alert(JSON.stringify(response));
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
								document.getElementById("ssh-output").innerHTML += board_id +': <pre>'+JSON.stringify(response,null,"\t")+'</pre>'; 
                                                        },
                                                        error: function(response){
                                                                //alert(JSON.stringify(response));
                                                                //document.getElementById("ssh-output").innerHTML += board_id +': '+JSON.stringify(response) +'<br />';
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


        $('#ckan_button').click(function(){
                if ($('#ckan-yunlist option:selected').length == 0) { alert('Select at least a Board'); }
                else {
                        var list = document.getElementById("ckan-yunlist");

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
                                                window.open('http://smartme-data.unime.it/dataset/'+board_id);
                                //---------------------------------------------------------------------------------
                                        },100*i);
                                })(i);
                                //---------------------------------------------------------------------------------
                        }

                } //end else
        });
	// #############################################################################################################################################


									// REGISTRATION MANAGEMENT
	// #############################################################################################################################################
	$('#register-board').click(function(){

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


		document.getElementById("board-registration-output").innerHTML ='';

                $.ajax({
                        url: '<?= $this -> config -> site_url()?>Last/register_board',
                        type: 'GET',
                        dataType: 'json',
                        //data: {board_id: board_id, latitude: latitude, longitude: longitude, altitude: altitude},
			data: {board_id: board_id, label: label, latitude: latitude, longitude: longitude, altitude: altitude, net_enabled: net_enabled, sensors_list: sensors},
                        contentType: 'application/json',
                        success: function(response){
                                document.getElementById("board-registration-output").innerHTML = '<pre>'+board_id+': '+JSON.stringify(response.result) +'</pre>';
				refresh_lists();
                        },
                        error: function(response){
                                //alert(JSON.stringify(response));
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
                	                document.getElementById("board-update-output").innerHTML = '<pre>'+board_id+': '+JSON.stringify(response.result) +'</pre>';
					refresh_lists();
	                        },
        	                error: function(response){
                	                //alert(JSON.stringify(response));
	                                document.getElementById("board-update-output").innerHTML = '<pre>'+board_id+': '+JSON.stringify(response.result) +'</pre>';
        	                }
	                });
		}
        });


        $('#unregister-board').click(function(){
		if ($('#unregister_boardlist option:selected').length == 0) { alert('Select at least a Board'); }
		else{
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
                                				document.getElementById("board-unregistration-output").innerHTML += '<pre>'+board_id+': '+JSON.stringify(response.result) +'</pre>';
				                        },
				                        error: function(response){
                                				//alert(JSON.stringify(response));
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
                                //alert(JSON.stringify(response));
                                //document.getElementById("output").innerHTML = JSON.stringify(response);
                                document.getElementById("create-driver-output").innerHTML = '<pre>'+plugin_name+': <br />'+JSON.stringify(response) +'</pre>';
                        },
                        error: function(response){
                                //alert(JSON.stringify(response));
                                //document.getElementById("output").innerHTML = response.responseText;
                                document.getElementById("create-driver-output").innerHTML = '<pre>'+plugin_name+': <br />'+JSON.stringify(response) +'</pre>';
                        }
                });
        });

/*
        function readDriverFile(evt) {
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
*/
        document.getElementById('driver_userfile').addEventListener('change', readFile, false);
	document.getElementById('driver_userfile').element_id = "create_driver_code";


	/*
        $('#inject_plugin').click(function(){

                if ($('#inject_yunlist option:selected').length == 0) { alert('Select a Board'); }
                else {
                        var list = document.getElementById("inject_yunlist");
                        var selected_list = [];
                        var output_string = '';

                        document.getElementById("inject-plugin-output").innerHTML ='';
                        var plugin_name = document.getElementById("inject_plugin_name").value;
                        var inject_autostart = document.getElementById("inject_autostart").value;

                        //for(var i=0; i<$('#inject_yunlist option:selected').length; i++){
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
                                                        url: '<?= $this -> config -> site_url()?>Last/inject_plugin',
                                                        type: 'GET',
                                                        dataType: 'json',
                                                        data: {plugin_name : plugin_name, board: board_id, inject_autostart: inject_autostart},
                                                        contentType: 'application/json',
                                                        success: function(response){
                                                                //alert(JSON.stringify(response));
                                                                //document.getElementById("output").innerHTML += board_id +': '+JSON.stringify(response) +'<br />';
                                                                document.getElementById("inject-plugin-output").innerHTML += plugin_name+': '+JSON.stringify(response) +'<br />';
                                                        },
                                                        error: function(response){
                                                                //alert(JSON.stringify(response));
                                                                //document.getElementById("output").innerHTML += board_id +': '+response.responseText +'<br />';
                                                                //document.getElementById("output").innerHTML += '<pre>'+board_id +': <br />'+JSON.stringify(response) +'</pre>';
                                                                document.getElementById("inject-plugin-output").innerHTML += plugin_name+': '+JSON.stringify(response) +'<br />';
                                                        }
                                                });
                                //---------------------------------------------------------------------------------
                                        },delay*i);
                                })(i);
                                //---------------------------------------------------------------------------------
                        }
                }
        });
	*/


        $('.mount_umount_driver').click(function(){
                if ($('#mount_umount_yunlist option:selected').length == 0) { alert('Select a Board'); }
                else {

                        var mount_umount_flag = this.id;
                        var board_id = document.getElementById("mount_umount_yunlist").value;
                        var selected_list = [];

                        var list = document.getElementById("mount_umount_driverlist");


                        for(var i=0; i< list.length; i++){
                                if (list.options[i].selected)
                                        selected_list.push(list[i].value);
                        }

			alert(mount_umount_flag+" "+board_id+" "+selected_list.length);
/*
                        for(var i=0; i< selected_list.length; i++){

                                //---------------------------------------------------------------------------------             
                                (function(i){
                                        setTimeout(function(){
                                //---------------------------------------------------------------------------------
                                                var board_id = selected_list[i];
                                                if(mount_umount_flag == "mount"){
                                                	$.ajax({
                                                        	url: '<?= $this -> config -> site_url()?>Last/run_plugin',
	                                                        type: 'GET',
        	                                                dataType: 'json',
                	                                        data: {plugin_name: plugin_name, board: board_id, plugin_json: plugin_json},
                        	                                contentType: 'application/json',
                                	                        success: function(response){
                                        	                        //alert(JSON.stringify(response));
                                                	                //document.getElementById("output").innerHTML = JSON.stringify(response);
                                                        	        document.getElementById("startstop-plugin-output").innerHTML = board_id +': '+JSON.stringify(response) +'<br />';
	                                                        },
        	                                                error: function(response){
                	                                                //alert(JSON.stringify(response));
                        	                                        //document.getElementById("output").innerHTML = response.responseText;
                                	                                document.getElementById("startstop-plugin-output").innerHTML = board_id +': '+JSON.stringify(response) +'<br />';
                                        	                }
	                                                });
                                                }
                                                else if(mount_umount_flag == "umount"){
                                                	$.ajax({
                                                        	url: '<?= $this -> config -> site_url()?>Last/kill_plugin',
	                                                        type: 'GET',
        	                                                dataType: 'json',
                	                                        data: {plugin_name: plugin_name, board: board_id},
                        	                                contentType: 'application/json',
                                	                        success: function(response){
                                        	                        //alert(JSON.stringify(response));
                                                	                //document.getElementById("output").innerHTML = JSON.stringify(response);
                                                        	        document.getElementById("startstop-plugin-output").innerHTML = board_id +': '+JSON.stringify(response) +'<br />';
	                                                        },
        	                                                error: function(response){
                	                                                //alert(JSON.stringify(response));
                        	                                        //document.getElementById("output").innerHTML = response.responseText;
                                	                                document.getElementById("startstop-plugin-output").innerHTML = board_id +': '+JSON.stringify(response) +'<br />';
                                        	                }
	                                                });
                                                }
                                //---------------------------------------------------------------------------------
                                        },delay*i);
                                })(i);
                                //---------------------------------------------------------------------------------
                        }
*/
                }
        });

	// #############################################################################################################################################




									// PLUGIN MANAGEMENT
	// #############################################################################################################################################
	$('#create_plugin').click(function(){

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
				document.getElementById("create-plugin-output").innerHTML = '<pre>'+plugin_name+': <br />'+JSON.stringify(response) +'</pre>';
			},
			error: function(response){
				//alert(JSON.stringify(response));
				//document.getElementById("output").innerHTML = response.responseText;
				document.getElementById("create-plugin-output").innerHTML = '<pre>'+plugin_name+': <br />'+JSON.stringify(response) +'</pre>';
			}
		});
	});

	
	$('#destroy_plugin').click(function(){
		if($('#destroy_pluginlist option:selected').length == 0) { alert('Select a Plugin'); }
		else{
			var list = document.getElementById("destroy_pluginlist");
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
                                                                document.getElementById("destroy-plugin-output").innerHTML += plugin_name+': '+JSON.stringify(response.result) +'<br />';
                                                        },
                                                        error: function(response){
                                                                //alert(JSON.stringify(response));
                                                                //document.getElementById("output").innerHTML += board_id +': '+response.responseText +'<br />';
                                                                //document.getElementById("output").innerHTML += '<pre>'+board_id +': <br />'+JSON.stringify(response) +'</pre>';
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
								document.getElementById("inject-plugin-output").innerHTML += plugin_name+': '+JSON.stringify(response) +'<br />';
							},
							error: function(response){
								//alert(JSON.stringify(response));
								//document.getElementById("output").innerHTML += board_id +': '+response.responseText +'<br />';
								//document.getElementById("output").innerHTML += '<pre>'+board_id +': <br />'+JSON.stringify(response) +'</pre>';
								document.getElementById("inject-plugin-output").innerHTML += plugin_name+': '+JSON.stringify(response) +'<br />';
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

			var start_stop_flag = this.id;
                        var list = document.getElementById("startstop_yunlist");
                        var selected_list = [];

                        var plugin_name = document.getElementById("startstop_plugin_name").value;
			var plugin_json = document.getElementById("startstop_plugin_json").value;

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
                                                                document.getElementById("startstop-plugin-output").innerHTML = board_id +': '+JSON.stringify(response) +'<br />';
                                                        },
                                                        error: function(response){
                                                                //alert(JSON.stringify(response));
                                                                //document.getElementById("output").innerHTML = response.responseText;
                                                                document.getElementById("startstop-plugin-output").innerHTML = board_id +': '+JSON.stringify(response) +'<br />';
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
                                                                document.getElementById("startstop-plugin-output").innerHTML = board_id +': '+JSON.stringify(response) +'<br />';
                                                        },
                                                        error: function(response){
                                                                //alert(JSON.stringify(response));
                                                                //document.getElementById("output").innerHTML = response.responseText;
                                                                document.getElementById("startstop-plugin-output").innerHTML = board_id +': '+JSON.stringify(response) +'<br />';
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

                        var list = document.getElementById("call_yunlist");
                        var selected_list = [];

                        var plugin_name = document.getElementById("call_plugin_name").value;
                        var plugin_json = document.getElementById("call_plugin_json").value;

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
                                                                document.getElementById("call-plugin-output").innerHTML = board_id +': '+JSON.stringify(response) +'<br />';
                                                        },
                                                        error: function(response){
                                                                //alert(JSON.stringify(response));
                                                                //document.getElementById("output").innerHTML = response.responseText;
                                                                document.getElementById("call-plugin-output").innerHTML = board_id +': '+JSON.stringify(response) +'<br />';
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
			                                document.getElementById("remove-plugin-output").innerHTML += '<pre>'+plugin_name+': <br />'+JSON.stringify(response.result) +'</pre>';
			                        },
                        			error: function(response){
			                                //alert(JSON.stringify(response));
			                                //document.getElementById("output").innerHTML = response.responseText;
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
                                document.getElementById("create-net-output").innerHTML = response.result+'<pre>'+JSON.stringify(response.log,null,"\t")+'</pre>';//JSON.stringify(response);
                                //document.getElementById("output").innerHTML = '<pre>'+response +'<br /></pre>';
                        },
                        error: function(response){
                                //alert(JSON.stringify(response));
                                document.getElementById("create-net-output").innerHTML = response.result;
                                //document.getElementById("output").innerHTML = '<pre>'+response+'<br /></pre>';
                        }
                });
        });



        $('#destroy_network').click(function(){
		if ($('#destroy_network_uuid option:selected').length == 0) { alert('Select a Network'); }
                else {
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
				                                document.getElementById("destroy-net-output").innerHTML = '<pre>'+JSON.stringify(response.result,null,"\t")+'</pre>';;
				                                //document.getElementById("output").innerHTML = '<pre>'+response +'<br /></pre>';
				                        },
				                        error: function(response){
				                                //alert(JSON.stringify(response));
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
                                document.getElementById("add-board-net-output").innerHTML = response.result+ '<br /><br /><pre>'+JSON.stringify(response.log,null,"\t")+'</pre>';
                                //document.getElementById("output").innerHTML = '<pre>'+response +'<br /></pre>';
                        },
                        error: function(response){
                                //alert(JSON.stringify(response));
                                document.getElementById("add-board-net-output").innerHTML = response.result;
                                //document.getElementById("output").innerHTML = '<pre>'+response+'<br /></pre>';
                        }
                });
        });


        $('#removeboard_network').click(function(){
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
                                                                document.getElementById("remove-board-net-output").innerHTML += '<pre>'+JSON.stringify(response.result,null,"\t")+'</pre>';
                                                                //document.getElementById("output").innerHTML = '<pre>'+response +'<br /></pre>';
                                                        },
                                                        error: function(response){
                                                                //alert(JSON.stringify(response));
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
                var show_boards_uuid = document.getElementById("show_boards_uuid").value;
                $.ajax({
                        url: '<?= $this -> config -> site_url()?>Last/show_boards',
                        type: 'GET',
                        dataType: 'json',
                        data: {show_boards_uuid: show_boards_uuid},
                        contentType: 'application/json',
                        success: function(response){
                                document.getElementById("show_boards-output").innerHTML = '<pre>'+JSON.stringify(response.result,null,"\t")+'</pre>';
                                //alert(response);
                                //document.getElementById("output").innerHTML = '<pre>'+response+'<br /></pre>';
                        },
                        error: function(response){
                                //alert(JSON.stringify(response));
                                document.getElementById("show_boards-output").innerHTML = JSON.stringify(response);
                                //document.getElementById("output").innerHTML = '<pre>'+response+'<br /></pre>';
                        }
                });
        });



        $('#activate_boardnet_network').click(function(){
                var activate_boardnet_uuid = document.getElementById("activate_boardnet_yunlist").value;
                $.ajax({
                        url: '<?= $this -> config -> site_url()?>Last/activate_board_net',
                        type: 'GET',
                        dataType: 'json',
                        data: {activate_boardnet_uuid: activate_boardnet_uuid},
                        contentType: 'application/json',
                        success: function(response){
                                document.getElementById("activate-board-net-output").innerHTML = '<pre>'+JSON.stringify(response.result,null,"\t")+'</pre>';
                                //alert(response);
                                //document.getElementById("output").innerHTML = '<pre>'+response+'<br /></pre>';
                        },
                        error: function(response){
                                //alert(JSON.stringify(response));
                                document.getElementById("activate-board-net-output").innerHTML = JSON.stringify(response);
                                //document.getElementById("output").innerHTML = '<pre>'+response+'<br /></pre>';
                        }
                });
        });
	// #############################################################################################################################################




									//OPENSTREETMAP
	// #############################################################################################################################################
map = new OpenLayers.Map("mapdiv");
map.addLayer(new OpenLayers.Layer.OSM());
epsg4326 =  new OpenLayers.Projection("EPSG:4326"); //WGS 1984 projection
projectTo = map.getProjectionObject(); //The map projection (Spherical Mercator)
var lonLat = new OpenLayers.LonLat(15.5858211, 38.2156833).transform(epsg4326, projectTo);
var zoom=12;
map.setCenter (lonLat, zoom);
var vectorLayer = new OpenLayers.Layer.Vector("Overlay");


$.ajax({
  type: 'GET',
  url: 'http://<SERVER_IP>:<PORT>/map',
  data: { format: 'json', },
  success: function(data) { 
        //alert("SUCCESS: "+ JSON.stringify(data));
        var description = new Array();
        var date;

        var board_list = Object.keys( data.boards );
        for(var i=0; i<board_list.length; i++) {
                description[i]="";
                var coordinates = data.boards[board_list[i]].coordinates;
                var metrics = data.boards[board_list[i]].resources.metrics;
                for(var j=0; j<metrics.length; j++){
                        if(metrics[j].Date)
                                date = europe_date(metrics[j].Date);
                        if (description[i] ==""){
                                description[i] = "Board: <b>"+board_list[i]+"</b>";
                        }
                        if(metrics[j].Brightness)
                                description[i] += " <br/> brightness: <b>"+ (Math.round(metrics[j].Brightness * 100)/100).toFixed(2)+ " lux</b> at "+date;
                        if(metrics[j].Temperature)
                                description[i] += " <br/>temperature: <b>"+ (Math.round(metrics[j].Temperature * 100)/100).toFixed(2)+ " °C</b> at "+date;
                        if(metrics[j].Humidity)
                                description[i] += " <br/>humidity: <b>"+ (Math.round(metrics[j].Humidity * 100)/100).toFixed(2)+ " %</b> at "+date;
                        if(metrics[j].Noise)
                                description[i] += " <br/>noise: <b>"+ (Math.round(metrics[j].Noise * 100)/100).toFixed(2)+ " dB</b> at "+date;
                        if(metrics[j].Gas)
                                description[i] += " <br/>CO: <b>"+ (Math.round(metrics[j].Gas * 100)/100).toFixed(2)+ " ppm</b> at "+date;
                        if(metrics[j].Pressure)
                                description[i] += " <br/>pressure: <b>"+ (Math.round(metrics[j].Pressure * 100)/100).toFixed(2)+ " hPa</b> at "+date;
                }               
                vectorLayer.addFeatures(create_marker(coordinates.longitude,coordinates.latitude, description[i]));
        }

  },
  error:   function(data) { 
   //alert("ERROR: "+ JSON.stringify(data));
  },
});

map.addLayer(vectorLayer);

//UTILITY FUNCTIONS !!! DO NOT EDIT THEM !!!
function create_marker(x,y,descript){
var feature = new OpenLayers.Feature.Vector(
            new OpenLayers.Geometry.Point(x,y).transform(epsg4326, projectTo),
            {description:descript} ,
            {externalGraphic: 'http://smartme.unime.it/wp-content/uploads/2015/11/marker-icon.png', graphicHeight: 25, graphicWidth: 21, graphicXOffset:-12, graphicYOffset:-20  });  
return feature;
}

function create_label(desc){
var div=document.createElement("div");
div.sclassName = "";
div.innerHTML = desc;
return nodeToString(div);
}
//Add a selector control to the vectorLayer with popup functions
var controls = {
      selector: new OpenLayers.Control.SelectFeature(vectorLayer, { onSelect: createPopup, onUnselect: destroyPopup })
};
function destroyPopup(feature) {
feature.popup.destroy();
feature.popup = null;
}
function nodeToString ( node ) {
var tmpNode = document.createElement( "div" );
tmpNode.appendChild( node.cloneNode( true ) );
var str = tmpNode.innerHTML;
tmpNode = node = null; // prevent memory leaks in IE
return str;
}
function createPopup(feature) {
  feature.popup = new OpenLayers.Popup.FramedCloud("pop",
  feature.geometry.getBounds().getCenterLonLat(),
  null,
  create_label(feature.attributes.description),
  null,
  true,
  function() { controls['selector'].unselectAll(); }
  );
  //feature.popup.closeOnMove = true;
  map.addPopup(feature.popup);
}
map.addControl(controls['selector']);
controls['selector'].activate();

function europe_date(date){
  var temp = date.split("T");
  var day = temp[0].split("-");
  var time = temp[1].substring(0,8);
  var return_date = day[2]+"-"+day[1]+"-"+day[0]+" "+time;
  return return_date;
}

function ckan_date(date){
  var temp = date.split("T");
  var day = temp[0].split("-");
  var time = temp[1].substring(0,8);
  var return_date = day[0]+"-"+day[1]+"-"+day[2]+" "+time;
  return return_date;
}
	// #############################################################################################################################################

window.onload = function() {
  refresh_lists();
};
</script>


<!-- STOP script section -->
