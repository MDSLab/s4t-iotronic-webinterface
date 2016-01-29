<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Last extends CI_Controller {

	public function index()
	{

		$this -> load -> library('curl');
		$result = $this -> curl -> simple_get('http://<SERVER_IP>:<PORT>/list');
		$net_result = $this -> curl -> simple_get('http://<SERVER_IP>:<PORT>/command/?command=show-network');

		//CALLBACK
		//$result1 = explode("callback_BoardList(", $result);
		//$result = substr($result1[1], 0, -1);

		$data['result'] = $result;
		$data['networks_list'] = $net_result;
		$data['page_title'] = 'UniME';

		$this -> load -> view('templates/header');
		$this -> load -> view('last', $data);
		$this -> load -> view('templates/footer');
	}


	public function update_boards(){
		$this -> load -> library('curl');
		$result = $this -> curl -> simple_get('http://<SERVER_IP>:<PORT>/list');
		echo $result;
	}

	public function update_nets(){
		$this -> load -> library('curl');
		$net_result = $this -> curl -> simple_get('http://<SERVER_IP>:<PORT>/command/?command=show-network');
		echo $net_result;
	}




	public function led_management(){
		$this -> load -> library('curl');

		$board_id = $this -> input -> get('board');
		$command = $this -> input -> get('command');
		$pin = $this -> input -> get('pin');
		$val = $this -> input -> get('val');

		$result = $this -> curl -> simple_get('http://<SERVER_IP>:<PORT>/command/?board='.$board_id.'&command='.$command.'&pin='.$pin.'&val='.$val);

		echo $result;
	}

	public function ssh_management(){
		$this -> load -> library('curl');

		$board_id = $this -> input -> get('board');
		$command = $this -> input -> get('command');

		$result = $this -> curl -> simple_get('http://<SERVER_IP>:<PORT>/command/?board='.$board_id.'&command=ssh&op='.$command);

		echo $result;
	}

        public function register_board(){
                $this -> load -> library('curl');

                $board_id = $this -> input -> get('board_id');
                $latitude = $this -> input -> get('latitude');
		$longitude = $this -> input -> get('longitude');
		$altitude = $this -> input -> get('altitude');

                $result = $this -> curl -> simple_get('http://<SERVER_IP>:<PORT>/command/?command=reg-board&board='.$board_id.'&latitude='.$latitude.'&longitude='.$longitude.'&altitude='.$altitude);

                echo $result;
        }

        public function unregister_board(){
                $this -> load -> library('curl');

                $board_id = $this -> input -> get('board_id');

                $result = $this -> curl -> simple_get('http://<SERVER_IP>:<PORT>/command/?command=unreg-board&board='.$board_id);

                echo $result;
        }

	public function create_plugin(){
		$this -> load -> library('curl');

		$plugin_name = $this -> input -> get('plugin_name');
		$plugin_json = $this -> input -> get('plugin_json');
		$plugin_code = $this -> input -> get('plugin_code');
		$plugin_category = $this -> input -> get('plugin_category');

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

		//$result = $this -> curl -> simple_get('http://<SERVER_IP>:<PORT>/command/?command=createplugin&pluginname='.$plugin_name.'&plugincategory=elaborate&pluginjsonschema='.$plugin_json.'&plugincode='.$plugin_code);
		$result = $this -> curl -> simple_get('http://<SERVER_IP>:<PORT>/command/?command=createplugin&pluginname='.$plugin_name.'&plugincategory='.$plugin_category.'&pluginjsonschema='.$plugin_json.'&plugincode='.$plugin_code);
		echo $result;
	}

	public function inject_plugin(){
		$this -> load -> library('curl');

		$plugin_name = $this -> input -> get('plugin_name');
		$board_id = $this -> input -> get('board');
		$inject_autostart = $this -> input -> get('inject_autostart');

		$result = $this -> curl -> simple_get('http://<SERVER_IP>:<PORT>/command/?command=injectplugin&board='.$board_id.'&pluginname='.$plugin_name.'&autostart='.$inject_autostart);
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

		$result = $this -> curl -> simple_get('http://<SERVER_IP>:<PORT>/command/?command=plugin&pluginname='.$plugin_name.'&pluginjson='.$plugin_json.'&pluginoperation=run&board='.$board_id);
		echo $result;
	}

	public function call_plugin(){
		$this -> load -> library('curl');

		$plugin_name = $this -> input -> get('plugin_name');
		$board_id = $this -> input -> get('board');
		$plugin_json = $this -> input -> get('plugin_json');

		$test1 = preg_replace('/\\s+/', ' ', $plugin_json, -1);
		$test2 = str_replace(' ', '%20', $test1);
		$test3 = str_replace('+', '%2B', $test2);
		$plugin_json = str_replace('"', '%22', $test3);

		$result = $this -> curl -> simple_get('http://<SERVER_IP>:<PORT>/command/?command=plugin&pluginname='.$plugin_name.'&pluginjson='.$plugin_json.'&pluginoperation=call&board='.$board_id);
		echo $result;
}

	public function kill_plugin(){
		$this -> load -> library('curl');

		$plugin_name = $this -> input -> get('plugin_name');
		$board_id = $this -> input -> get('board');

		$result = $this -> curl -> simple_get('http://<SERVER_IP>:<PORT>/command/?command=plugin&pluginname='.$plugin_name.'&pluginoperation=kill&board='.$board_id);
		echo $result;

	}

        public function show_network(){
                $this -> load -> library('curl');

                $result = $this -> curl -> simple_get('http://<SERVER_IP>:<PORT>/command/?command=show-network');
                echo $result;
        }

        public function create_network(){
                $this -> load -> library('curl');

                $network_name = $this -> input -> get('create_network_name');
                $ip = $this -> input -> get('create_network_ip');

                $result = $this -> curl -> simple_get('http://<SERVER_IP>:<PORT>/command/?command=create-network&netname='.$network_name.'&val='.$ip);
                echo $result;

        }

        public function destroy_network(){
                $this -> load -> library('curl');

                $network_uuid = $this -> input -> get('destroy_network_uuid');

                $result = $this -> curl -> simple_get('http://<SERVER_IP>:<PORT>/command/?command=destroy-network&netuid='.$network_uuid);
                echo $result;

        }

        public function add_to_network(){
                $this -> load -> library('curl');

                $network_uuid = $this -> input -> get('addboard_network_uuid');
                $board_id = $this -> input -> get('board');
                $ip = $this -> input -> get('addboard_network_ip');

                $result = $this -> curl -> simple_get('http://<SERVER_IP>:<PORT>/command/?command=add-to-network&netuid='.$network_uuid.'&board='.$board_id.'&val='.$ip);
                echo $result;
        }


        public function remove_from_network(){
                $this -> load -> library('curl');

                $network_uuid = $this -> input -> get('removeboard_network_uuid');
                $board_id = $this -> input -> get('board');

                $result = $this -> curl -> simple_get('http://<SERVER_IP>:<PORT>/command/?command=remove-from-network&netuid='.$network_uuid.'&board='.$board_id);
                echo $result;
        }

        public function show_boards(){
                $this -> load -> library('curl');

                $network_uuid = $this -> input -> get('show_boards_uuid');

                $result = $this -> curl -> simple_get('http://<SERVER_IP>:<PORT>/command/?command=show-boards&netuid='.$network_uuid);
                echo $result;
        }

}
?>
