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

class Login extends CI_Controller {

	function __construct() {
		parent::__construct();
		$this -> load -> helper('form');
		//$this -> load -> helper(array('form', 'url'));
		$this -> load -> library('session');

		unset($_SESSION['token_or_log']);
	}

	public function index(){
		$data['page_title'] = 'Login IoTronic';

		$this -> load -> view('templates/header_login');
		//$this -> load -> view('login_js', $data);
		$this -> load -> view('login', $data);
		$this -> load -> view('templates/footer_login');
	}

	public function logout(){
		unset($_SESSION['token_or_log']);
		echo "Logged out";
	}
}
?>
