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


class Admin extends CI_Controller {


	function __construct() {
		parent::__construct();
		$this -> load -> helper('form');
		//$this -> load -> helper(array('form', 'url'));
		$this -> load -> library('session');
	}

	public function index()
	{
		$data['page_title'] = 'Login IoTronic';

		$this -> load -> view('templates/header_login');
		$this -> load -> view('login', $data);
		$this -> load -> view('templates/footer_login');
	}


	public function web_ui(){

		$data['page_title'] = 'UniME';

		//Old version with NO check of the expired cookie (demanded to API)
		/*
		$this -> load -> view('templates/header');
		$this -> load -> view('admin', $data);
		$this -> load -> view('templates/footer');
		*/

		//New version with check expired cookie demanded to the browser
		if(isset($_COOKIE["token"])){
			$this -> load -> view('templates/header');
			$this -> load -> view('admin', $data);
			$this -> load -> view('templates/footer');
		}
		else{
			$this -> load -> view('templates/header_login');
			$this -> load -> view('login', $data);
			$this -> load -> view('templates/footer_login');
		}
	}


	public function mobile_status(){
		$iccid = $_POST['iccid'];

		$mobile_api = json_decode($GLOBALS['mobile_api']);

		$user = $mobile_api->user;
		$api_key = $mobile_api->api_key;
		$url1 = $mobile_api->url.$iccid;
		$url2 = $mobile_api->url.$iccid."/ctdUsages";

		$url3 = $mobile_api->url.$iccid."/sessionInfo";

		$array_out = array();

		// create curl resource
		$ch = curl_init();

		//curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
		curl_setopt($ch, CURLOPT_USERPWD, $user.':'.$api_key);


		curl_setopt($ch, CURLOPT_URL, $url1);
		array_push($array_out, curl_exec($ch));

		curl_setopt($ch, CURLOPT_URL, $url2);
		array_push($array_out, curl_exec($ch));


		curl_setopt($ch, CURLOPT_URL, $url3);
		array_push($array_out, curl_exec($ch));

		curl_close($ch);

		$this->output->set_output(json_encode($array_out));
	}


	//NOTE: global variables in php (defined in our config file) can be retrieved like this
	//$host = $GLOBALS["api_address"];
}
?>

