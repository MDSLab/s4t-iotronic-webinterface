<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Yun extends CI_Controller {

	public function index()
	{
		$this -> load -> library('curl');
		$result = $this -> curl -> simple_get('http://212.189.207.205:8888/list');

		$data['result'] = $result;
		$data['page_title'] = 'UniME';

		$this -> load -> view('templates/header');
		$this -> load -> view('yun', $data);
		$this -> load -> view('templates/footer');
	}

	public function led_management(){
		$this -> load -> library('curl');

		$board_id = $this -> input -> get('board');
		$command = $this -> input -> get('command');
		$pin = $this -> input -> get('pin');
		$val = $this -> input -> get('val');

		$result = $this -> curl -> simple_get('http://212.189.207.205:8888/command/?board='.$board_id.'&command='.$command.'&pin='.$pin.'&val='.$val);

		echo $result;
	}

	public function ssh_management(){
		$this -> load -> library('curl');

		$board_id = $this -> input -> get('board');
		$command = $this -> input -> get('command');

		$result = $this -> curl -> simple_get('http://212.189.207.205:8888/command/?board='.$board_id.'&command=ssh&op='.$command);

		echo $result;
}

	public function create_plugin(){
		$this -> load -> library('curl');

		$plugin_name = $this -> input -> get('plugin_name');
		$plugin_json = $this -> input -> get('plugin_json');
		$plugin_code = $this -> input -> get('plugin_code');

		//plugin_json url encoding...
		$test1 = preg_replace('/\\s+/', ' ', $plugin_json, -1);
		$test2 = str_replace(' ', '%20', $test1);
		$test3 = str_replace('+', '%2B', $test2);
		$plugin_json = str_replace('"', '%22', $test3);

		//plugin_code url encoding...
		$test1 = preg_replace('/\\s+/', ' ', $plugin_code, -1);
		$test2 = str_replace(' ', '%20', $test1);
		$test3 = str_replace('+', '%2B', $test2);
		$plugin_code = str_replace('"', '%22', $test3);

		$result = $this -> curl -> simple_get('http://212.189.207.205:8888/command/?command=createplugin&pluginname='.$plugin_name.'&plugincategory=elaborate&pluginjsonschema='.$plugin_json.'&plugincode='.$plugin_code);
		echo $result;
	}

	public function inject_plugin(){
		$this -> load -> library('curl');

		$plugin_name = $this -> input -> get('plugin_name');
		$board_id = $this -> input -> get('board');

		$result = $this -> curl -> simple_get('http://212.189.207.205:8888/command/?command=injectplugin&board='.$board_id.'&pluginname='.$plugin_name);
		echo $result;
	}

	public function run_plugin(){
		$this -> load -> library('curl');

		$plugin_name = $this -> input -> get('plugin_name');
		$board_id = $this -> input -> get('board');
		$plugin_json = $this -> input -> get('plugin_json');

                $test1 = preg_replace('/\\s+/', ' ', $plugin_json, -1);
                $test2 = str_replace(' ', '%20', $test1);
                $test3 = str_replace('+', '%2B', $test2);
                $plugin_json = str_replace('"', '%22', $test3);

		$result = $this -> curl -> simple_get('http://212.189.207.205:8888/command/?command=plugin&pluginname='.$plugin_name.'&pluginjson='.$plugin_json.'&pluginoperation=run&board='.$board_id);
		echo $result;
	}

	public function kill_plugin(){
		$this -> load -> library('curl');

		$plugin_name = $this -> input -> get('plugin_name');
		$board_id = $this -> input -> get('board');

		$result = $this -> curl -> simple_get('http://212.189.207.205:8888/command/?command=plugin&pluginname='.$plugin_name.'&pluginoperation=kill&board='.$board_id);
		echo $result;

	}
}
?>

