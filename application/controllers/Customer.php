<?php
/**
 * Copyright 2017 Carmelo Romeo (caromeo@unime.it)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

defined('BASEPATH') OR exit('No direct script access allowed');


class Customer extends CI_Controller {


	function __construct() {
		parent::__construct();
		//$this -> load -> helper('form');
		//$this -> load -> helper(array('form', 'url'));
		//$this -> load -> library('session');
	}

	//TO BE USED !!!
	public function verify_wiotp_conn(){

		// create curl resource
		$ch = curl_init();
 
		curl_setopt($ch, CURLOPT_URL, $GLOBALS["wiotp_endpoint"]);
		//curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
		curl_setopt($ch, CURLOPT_USERPWD, $GLOBALS["wiotp_username"].':'.$GLOBALS["wiotp_password"]);
		$output = curl_exec($ch); 
		curl_close($ch);    

		$this->output->set_output($output);
	}

	public function get_board_sensors(){
		$kit_type = "";
		$endpoint = "";
		$event_type = "";
		$threshold = "";

		$username = "";
		$password = "";

		$sensors = json_decode($GLOBALS['wiotp_endpoints']);
		$project = $_POST['project_name'];

		foreach($sensors as $key => $value){
			if ($key == $project){
				//$kit_type = $value->wiotp_kit_type;
				$kit_type = $_POST['model'];
				$endpoint = $value->wiotp_endpoint;
				$event_type = $value->wiotp_event_type;
				$threshold = $value->wiotp_threshold_sensors;

				$username = $value->wiotp_username;
				$password = $value->wiotp_password;
				break;
			}
		}

		$query_endpoint = $endpoint."/device/types/".$kit_type."/devices/".$_POST["uuid"]."/events/".$event_type;

		// create curl resource
		$ch = curl_init();

		curl_setopt($ch, CURLOPT_URL, $query_endpoint);
		//curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
		curl_setopt($ch, CURLOPT_USERPWD, $username.':'.$password);

		//IMPROVEMENTS
		//curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 120);	// time-out on connect
		//curl_setopt($ch, CURLOPT_TIMEOUT, 120);    	// time-out on response

		$output = curl_exec($ch); 
		curl_close($ch);
 
		$output = json_decode($output, true);
		if($output["payload"])
			$output["threshold"] = $threshold;
		else
			$output["threshold"] = 9999;
		$output = json_encode($output);

		$this->output->set_output($output);
	}


	//NOTE: global variables in php (defined in our config file) can be retrieved like this
	//$host = $GLOBALS["api_address"];
}
?>

