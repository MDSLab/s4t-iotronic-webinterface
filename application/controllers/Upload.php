<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Upload extends CI_Controller {

	public function __construct(){
		parent::__construct();
	}

	public function index(){
		$this -> load -> helper('form');
		$this -> load -> helper('url');

		$data = array('msg' => "Upload File");
		$data['upload_data'] = '';
		$this -> load -> view('upload', $data);
	}
}
?>
