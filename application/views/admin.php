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

<script>
	<?php echo 'var default_project = "'.$this -> session -> userdata('default_project').'";'; ?>

	wstun_ip = "<?= $this -> config -> item('wstun_ip')?>";

	cloud_services_flag = "<?= $this -> config -> item('load_cloud_services_management')?>";
	plugins_flag = "<?= $this -> config -> item('load_plugin_management')?>";
	networks_flag = "<?= $this -> config -> item('load_network_management')?>";
	gpio_flag = "<?= $this -> config -> item('load_gpio_management')?>";
	drivers_flag = "<?= $this -> config -> item('load_driver_management')?>";
	vfs_flag = "<?= $this -> config -> item('load_vfs_management')?>";


	delay = "<?= $this -> config -> item('polling_delay')?>";
	string_or_json = "<?= $this -> config -> item('show_string_or_json_lists')?>";
	
	<?php echo 'var token_or_log = "'.$this -> session -> userdata('token_or_log').'";'; ?>
	//<?php echo 'var result = "'.$this -> session -> userdata('result').'";'; ?>
	
	site_url = "<?= $this -> config -> site_url()?>";
	s4t_api_url = "<?= $this -> config -> item('s4t_api_url') ?>";
	s4t_iotronic_folder = "<?= $this -> config -> item('s4t_iotronic_folder') ?>";
	
	ajax_headers = {
		"x-auth-token": token_or_log,
		"Content-Type": "application/json"
	};
	
	var boards_list = "";

</script>




<!-- DEFAULT MODALS, LAYOUT AND JS FUNCTIONS -->
<!-- ########################################################## -->
<?
	$selectbox_size = $this -> config -> item('selectbox_size');
 
	include 'management_files/homepage_layout.php';
	include 'management_files/board_registration.php';
	include 'management_files/user_registration.php';
	include 'management_files/project_registration.php';
	include 'management_files/layout_registration.php';
	include 'management_files/request_management.php';


	//Iotronic
	echo '<link rel="stylesheet" href="'.$this -> config -> site_url().'assets/iotronic.css"></link>';
	echo '<script src="'.$this -> config -> site_url().'assets/iotronic.js"></script>';
	echo '<script src="'.$this -> config -> site_url().'assets/board_registration.js"></script>';
	echo '<script src="'.$this -> config -> site_url().'assets/user_registration.js"></script>';
	echo '<script src="'.$this -> config -> site_url().'assets/project_registration.js"></script>';
	echo '<script src="'.$this -> config -> site_url().'assets/layout_registration.js"></script>';
	echo '<script src="'.$this -> config -> site_url().'assets/request_management.js"></script>';

	//OPENSTREETMAP
	echo '<script src="'.$this -> config -> site_url().'assets/map.js"></script>';

	//Others
	echo '<script src="'.$this -> config -> site_url().'assets/md5.js"></script>';
?>
<!-- ########################################################## -->


<!-- OPTIONAL MODALS -->
<!-- ########################################################## -->
<?
	//CLOUD SERVICES MANAGEMENT
	if ($this -> config -> item('load_cloud_services_management')):
		include 'management_files/cloud_services_management.php';
		echo '<script src="'.$this -> config -> site_url().'assets/cloud_services_management.js"></script>';
	endif;

	//PLUGIN MANAGEMENT
	if ($this -> config -> item('load_plugin_management')):
		include 'management_files/plugin_management.php';
		echo '<script src="'.$this -> config -> site_url().'assets/plugin_management.js"></script>';
	endif;

	//NETWORK MANAGEMENT
	if ($this -> config -> item('load_network_management')):
		include 'management_files/network_management.php';
		echo '<script src="'.$this -> config -> site_url().'assets/network_management.js"></script>';
	endif;

	//GPIO MANAGEMENT
	if ($this -> config -> item('load_gpio_management')):
		include 'management_files/gpio_management.php';
		echo '<script src="'.$this -> config -> site_url().'assets/gpio_management.js"></script>';
	endif;
	
	//DRIVER MANAGEMENT
	if ($this -> config -> item('load_driver_management')):
		include 'management_files/driver_management.php';
		echo '<script src="'.$this -> config -> site_url().'assets/driver_management.js"></script>';
	endif;	

	//VFS MANAGEMENT
	if ($this -> config -> item('load_vfs_management')):
		include 'management_files/vfs_management.php'; 
		echo '<script src="'.$this -> config -> site_url().'assets/vfs_management.js"></script>';
	endif;
?>
<!-- ########################################################## -->

<script>
	window.onload = function() {
		verify_token_expired();
		get_projects_list();
		//refresh_lists();
		//refresh_map();
	};
</script>
