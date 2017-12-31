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

	public function web_ui (){

		$data['page_title'] = 'UniME';
		//$this -> session -> set_userdata('username', $this -> input -> post('username'));
		
		if($this -> input -> post('username') != "" || $this -> input -> post('password') != ""){
	
			if(!$this -> session -> userdata('token_or_log')){
				$token_or_log = $this -> get_token($this -> input -> post('username'), $this -> input -> post('password'));
				$this -> session -> set_userdata('token_or_log', $token_or_log);
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
			/*
			"SSLVERSION" => 3,
			"CAINFO" => "/opt/stack4things/ssl/iotronic_ca_cert.pem"
			*/
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



						// MAP MANAGEMENT
	// ################################################################################################
	/*
	public function get_markers_info(){
		$this -> load -> library('curl');

		//Query parameters	
		$organization = $this -> input -> get('organization');
		$limit = $this -> input -> get('limit');
		$sort = "Date%20desc";

		//$current_package_list_with_resources = $this -> curl -> simple_get("http://smartme-data.unime.it/api/3/action/current_package_list_with_resources?limit=".$limit);
		$current_package_list_with_resources = $this -> curl -> simple_get('http://'.$this -> CKAN_URL.'/api/3/action/current_package_list_with_resources?limit='.$limit);

		$obj = json_decode($current_package_list_with_resources, true);


		//List of boards usefull to get status (connected / disconnected)
		//$board_list = $this -> curl -> simple_get('http://'.$this -> IP_PORT.'/list');
		$board_list = $this -> curl -> simple_get('http://'.$this -> IP_PORT.'/boards');
		$obj_list = json_decode($board_list, true);


		//Result arrays
		$count = 0;
		$label = [];
		$uuid = [];
		$status = [];
		$altitude = [];
		$latitude = [];
		$longitude = [];
		$sensors_resource_ids = [];

		
		//$samples_date = [];
		//$summary = [];
		

		for($i =0; $i <count($obj["result"]); $i++){
			if($obj["result"][$i]["organization"]["title"] == $organization && $obj["result"][$i]["extras"] !=[] ){
			//if($obj["result"][$i]["extras"] !=[]){

				//Label
				//$label[$count] = $obj["result"][$i]["notes"];

				//UUID 
				$uuid[$count] = $obj["result"][$i]["name"];

				//Status (connected / disconnected)
				//$list = $obj_list["list"];
				$list = $obj_list["message"];
				for($j=0;$j<count($list);$j++){
					if($list[$j]["board_id"] == $uuid[$count]){
						$status[$count] = $list[$j]["status"];
						break;
					}
				}

				//Coordinates
				$extras = $obj["result"][$i]["extras"];
				for($j=0;$j<count($extras);$j++){
					if ($extras[$j]["key"] == "Altitude") $altitude[$count] = $extras[$j]["value"];
					else if ($extras[$j]["key"] == "Latitude") $latitude[$count] = $extras[$j]["value"];
					else if ($extras[$j]["key"] == "Longitude") $longitude[$count] = $extras[$j]["value"];

					//Label
                                        else if ($extras[$j]["key"] == "Label") $label[$count] = $extras[$j]["value"];
				}
				//NUOVA VERSIONE
				//Sensors resource ids
				$resources = $obj["result"][$i]["resources"];
				$sensors_resource_ids[$count] = array();
				$j =0;
				for($k=0;$k<count($resources);$k++){
					if($resources[$k]["name"] != "sensors"){
						$sensors_resource_ids[$count][$j]["name"] = $resources[$k]["name"];
						$sensors_resource_ids[$count][$j]["id"] = $resources[$k]["id"];
						$j++;
					}
				}
				$count++;
			}
		}

		//Output structure
		$result = json_encode(array('label' => $label, 'uuid' => $uuid, 'board_status' => $status, 'latitude' => $latitude, 'longitude' => $longitude, 'altitude' => $altitude, 'sensors_resource_ids' => $sensors_resource_ids ));
		//$result = json_encode(array('label' => $label, 'latitude' => $latitude, 'longitude' => $longitude, 'altitude' => $altitude, 'samples_date' => $samples_date, 'summary' => $summary));

		echo $result;
	}
	*/



	public function get_last_sensors_samples(){
		$this -> load -> library('curl');

		$label = $this -> input -> get('label');
		$id_vect = $this -> input -> get('sensors_id_vect');
		$sort = "Date%20desc";


		$samples_date = "";

		//No Images		
		//$summary = "";

		//With Images
		$temperature = ""; $brightness = ""; $humidity = ""; $noise = ""; $gas = ""; $pressure = "";


		for ($i = 0; $i < count($id_vect); $i++) { 
			//$result = $this -> curl -> simple_get("http://smartme-data.unime.it/api/3/action/datastore_search?resource_id=".$id_vect[$i]['id']."&limit=1&sort=".$sort);
			$result = $this -> curl -> simple_get('http://'.$this -> CKAN_URL.'/api/3/action/datastore_search?resource_id='.$id_vect[$i]['id'].'&limit=1&sort='.$sort);

			$obj = json_decode($result, true);
			if($obj["result"]["records"]){
				$samples_date = date("d-m-Y H:i:s", strtotime($obj["result"]["records"][0]["Date"]));
				$j =0;
				foreach ($obj["result"]["records"][0] as $key => $value) {

					
					//No Images
					/*
					if($j !=0) $summary .=" ";
					if($key == "Temperature")
						$summary .= "Temperature: <b>".round($value, 2)." °C</b><br />";
					else if($key == "Brightness")
						$summary .= "Brightness: <b>".round($value, 2)." lux</b><br />";
					else if($key == "Humidity")
						$summary .= "Humidity: <b>".round($value, 2)." %</b><br />";
					else if($key == "Noise")
						$summary .= "Noise: <b>".round($value, 2)." amp</b><br />";
					else if($key == "Gas")
						$summary .= "CO: <b>".round($value, 2)." ppm</b><br />";
					else if($key == "Pressure")
						$summary .= "Pressure: <b>".round($value, 2)." hPa</b><br />";
					*/

                                        //With Images
					
                                        if($key == "Temperature")	$temperature = round($value, 2);
                                        else if($key == "Brightness")	$brightness = round($value, 2);
                                        else if($key == "Humidity")	$humidity = round($value, 2);
                                        else if($key == "Noise")	$noise = round($value, 2);
                                        else if($key == "Gas")		$gas = round($value, 2);
                                        else if($key == "Pressure")	$pressure = round($value, 2);
					

					$j++;
				}
			}
		}

		//No Images
		//$summary = "<big><center><b>".$label."</b></center></big> <center><b>".$samples_date ."</b></center><br />".$summary;
		//$result = json_encode(array("marker_content" => $summary));

		//With Images
		$marker_content = array("label" => $label, "samples_date" => $samples_date, "temperature" => $temperature, "brightness" => $brightness, "humidity" => $humidity, "noise" => $noise, "gas" => $gas, "pressure" => $pressure);
		$result = json_encode(array("marker_content" => $marker_content));
		

		echo $result;

	}


	// ################################################################################################

		
}
?>

