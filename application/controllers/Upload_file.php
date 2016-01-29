<?php
	if (!defined('BASEPATH')) exit('No direct script access allowed');

	class Upload_file extends CI_Controller{
		function __construct(){
			parent::__construct();
			$this -> load -> helper(array('form', 'url'));
		}


		function upload_it() {
			$this -> load -> helper('form');

			$config['upload_path'] = 'uploads/';
			$config['allowed_types'] = 'gif|jpg|png';
			$this -> load -> library('upload', $config);
			$this -> upload -> initialize($config);
			$this -> upload -> set_allowed_types('*');
			$data['upload_data'] = '';

			if (!$this -> upload -> do_upload('userfile')) {
				$data = array('msg' => $this -> upload -> display_errors());
			}
			else{
				$data = array('msg' => "Upload success!");
				$data['upload_data'] = $this -> upload -> data();
			}
			$this -> load -> view('upload', $data);
		}
	}
?>
