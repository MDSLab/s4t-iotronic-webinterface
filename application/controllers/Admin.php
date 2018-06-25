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

		$this -> load -> view('templates/header');
		$this -> load -> view('admin', $data);
		$this -> load -> view('templates/footer');
	}


	//NOTE: global variables in php (defined in our config file) can be retrieved like this
	//$host = $GLOBALS["api_address"];
	

	//Old approach...can be removed!!!
	/*
	public function web_ui (){

		$data['page_title'] = 'UniME';
		//$this -> session -> set_userdata('username', $this -> input -> post('username'));



		if($this -> input -> post('username') == "admin" || $this -> input -> post('password') == "b"){
			//$host = '212.189.207.201';
			$host = $GLOBALS["api_address"];
			$ports = array(80, 4843);

			foreach ($ports as $port){
				$connection = @fsockopen($host, $port,$errno, $errstr, 5);

				if (is_resource($connection)){
					echo '<h2>' . $host . ':' . $port . ' ' . '(' . getservbyport($port, 'tcp') . ') is open.</h2>' . "\n";
					fclose($connection);
				}
				else{
					echo '<h2>' . $host . ':' . $port . ' is not responding.</h2>' . "\n";
				}
			}
		}


		
		if($this -> input -> post('username') != "" || $this -> input -> post('password') != ""){
	
			if(!$this -> session -> userdata('token_or_log')){
				$token_or_log = $this -> get_token($this -> input -> post('username'), $this -> input -> post('password'));
				$this -> session -> set_userdata('token_or_log', $token_or_log);
				$this -> session -> set_userdata('default_project', $this -> config -> item('default_project'));
			}
		
			if($this -> session -> userdata('result') == "SUCCESS"){
				$this -> session -> set_flashdata('message', "");
				$this -> session -> set_flashdata('success', "SUCCESS");
		
				$this -> load -> view('templates/header');
				$this -> load -> view('admin', $data);
				$this -> load -> view('templates/footer');
			}
			else {
				$this -> session -> set_flashdata('message', $token_or_log);
				$this -> session -> set_flashdata('success', $this -> session -> userdata('result'));
	
				unset($_SESSION['token_or_log']);
				unset($_SESSION['result']);
				$this -> load -> view('templates/header_login');
				$this -> load -> view('login', $data);
				$this -> load -> view('templates/footer_login');
			}
		}
		else{
			unset($_SESSION['token_or_log']);
			$this -> load -> view('templates/header_login');
			$this -> load -> view('login', $data);
			$this -> load -> view('templates/footer_login');
		}
	}

	protected function get_token($username, $password){
		$this -> load -> library('curl');
	
		$params = array("username" => $username, "password" => $password);
		//$options = array("FAILONERROR" => "FALSE");
		$options = array(
			"FAILONERROR" => "FALSE",
			"SSL_VERIFYPEER" =>  "FALSE",
			"SSL_VERIFYHOST" =>  0

			//"SSLVERSION" => 3,
			//"CAINFO" => "/opt/stack4things/ssl/iotronic_ca_cert.pem"

		);

		//We can use SSL VERIFYPEER e VERIFYHOST inside $options or with the following line!
		//$this -> curl = $this -> curl -> ssl(FALSE, 0);
	
		$result = $this -> curl -> simple_post($this -> config -> item('s4t_api_url')."/auth", $params, $options);
		$obj = json_decode($result, true);

		$this -> session -> set_userdata('result', $obj["result"]);

		if($obj["result"] == "SUCCESS")
			return $obj["message"]["token"];
		else if($obj["result"] == "ERROR"){
			return $obj["message"]["log"];
		}
	}
	*/
}
?>

