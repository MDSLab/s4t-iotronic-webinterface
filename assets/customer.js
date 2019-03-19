
//TO BE USED !!!
function test_wiotp(){
	$.ajax({
		url: site_url+'Customer/verify_wiotp_conn',
		success: function(response){
			console.log(response);
		}
	});
}


//function get_board_sensors(uuid, callback){
function get_board_sensors(uuid, model, callback){

	project_name = get_project_name_by_uuid(getCookie("selected_prj"));

	//data = {'uuid': uuid, 'project_name': project_name};
	data = {'uuid': uuid, 'model': model, 'project_name': project_name};

	$.ajax({
		url: site_url+'Customer/get_board_sensors',
		type: 'POST',
		dataType: 'json',
		data: data,
		success: function(response){

			if(response.payload){
				parsed = $.parseJSON(atob(response.payload))
				sensor_data = parsed.d.r.sensor_data

				failed = 0
				warning_threshold = false
				for(i=0;i<sensor_data.length;i++){
					if(sensor_data[i].status == "NOK")
						failed += 1;
				}
				if(failed >= response.threshold)
				//if(failed >= 10000000)
					warning_threshold = true

				status_report = {"typeId": response.typeId, "deviceId": response.deviceId, "timestamp": response.timestamp, "payload": sensor_data, "warning_threshold": warning_threshold, "failed": failed, "all": sensor_data.length}
				callback(status_report)
			}
			else
				callback("OK")
		},
		error: function(response){
			callback("NO WIOTP")
		}
	});
}

//function verify_sensors_status(uuid, callback){
function verify_sensors_status(uuid, model, callback){
	var failed = 0;

	project_name = get_project_name_by_uuid(getCookie("selected_prj"));

	//data = {'uuid': uuid, 'project_name': project_name};
	data = {'uuid': uuid, 'model': model, 'project_name': project_name};
	mins_to_remove = wiotp_endpoints[project_name].expire_data

	//mins_to_remove = 27862945

	var check_date = new Date()
	//console.log(convert_date(check_date))
	offset = check_date.getTimezoneOffset()
	//console.log(offset)
	
	check_date.setMinutes(check_date.getMinutes()+offset)
	//console.log(convert_date(check_date))
	check_date.setMinutes(check_date.getMinutes()-Number(mins_to_remove))
	threshold_time = convert_date(check_date)
	//console.log(threshold_time)

        $.ajax({
                url: site_url+'Customer/get_board_sensors',
                type: 'POST',
                dataType: 'json',
                data: data,
                success: function(response){
			if(response.payload){

				parsed = $.parseJSON(atob(response.payload))
				sensor_data = parsed.d.r.sensor_data

				for(i=0;i<sensor_data.length;i++){
					if(sensor_data[i].status == "NOK")
						failed += 1;
				}

				data = {"board_id": parsed.d.group, "failed": failed, "all": sensor_data.length};

				if(failed >= response.threshold){
				//if(failed >= 10000000){
					data.status = "CHECKED"
					//callback(parsed.d.group) //returns the board_id
				}
				else{
					data.status = "NO ACTION"
					//callback("NO ACTION")
				}

				//ordered_last = sensor_data.sort(SortByLast)[0].last.split(".",1)[0];
				ordered_last = sensor_data.sort(SortByOldest)[0].last.split(".",1)[0];
				//console.log(ordered_last)

				//If the actual time (expressed in UTC) is greater than the last sample coming from sensors the board
				//has to become yellow because data coming from sensors is too old [Case "false"]. Otherwise the data
				//is correct and updated recently (inside the expire_data interval set) [Case "true"]
				data.valid = compare_dates(threshold_time, ordered_last)
				//console.log(data)
				callback(data)
			}
			else{
				//callback({"board_id": uuid, "failed": "Not available", "all": "Not available", "status": "NO ACTION"})
				callback({"board_id": uuid, "failed": "Not available", "all": "Not available", "status": "NO ACTION", "valid": null})
			}
                },
		error: function(response){
			//console.log("ERROR")
			//console.log(response)
			//callback("NO WIOTP")

			//callback({"board_id": uuid, "failed": "Not available", "all": "Not available", "status": "NO WIOTP"})
			callback({"board_id": uuid, "failed": "Not available", "all": "Not available", "status": "NO WIOTP", "valid": null})
		}
        });
}


//$('#info-connectivit-details').html('ssss')
function show_jasper(){

	encoded_iccid = $('#info-traffic-details').val();
	iccid = atob(encoded_iccid)
	output = ""

	$('#info-connectivity-details').html("Loading...")

	$.ajax({
		url: site_url+'Admin/mobile_status',
		type: 'POST',
		dataType: 'json',
		data: {"iccid": iccid},
		success: function (response) {
			//console.log("SUCCESS")
			first = JSON.parse(response[0])	// /devices/ICCID
			second = JSON.parse(response[1])// /devices/ICCID/ctdUsages
			third = JSON.parse(response[2]) // /devices/ICCID/sessionInfo

			/*
			console.log(first)
			console.log(second)
			console.log(third)
			*/

			if(!first && !second && !third)
				output += '<b>WARNING:</b> API endpoint not available!<br />'
			else{
				if(!first.errorMessage){
					output += '- Device ID: '+first.deviceID+'<br />'
					output += '- IMEI: '+first.imei+'<br />'
					output += '- Rate Plan: '+first.ratePlan+'<br />'
				}
				else if(first.errorMessage)
					output += '<b>ERROR:</b> '+first.errorCode+' on "info"<br />'
				else
					output += '<b>WARNING:</b> API endpoint not available!<br />'

				if(!second.errorMessage){
					output += '- Data Usage: '+Number((second.ctdDataUsage/1024)/1024).toFixed(3)+' MB<br />'
					output += '- Status: '+second.status+'<br />'
					output += '- Comm Plan: '+second.communicationPlan+'<br />'
				}
				else if(second.errorMessage)
					output += '<b>ERROR:</b> '+second.errorCode+' on /ctdUsages<br />'
					
				else
					output += '<b>WARNING:</b> API endpoint not available!<br />'

				if(!third.errorMessage){
					output += '- IP Address: '+third.ipAddress+'<br />'
					output += '- Session Start: '+third.dateSessionStarted+'<br />'
					output += '- Session End: '+third.dateSessionEnded
				}
				else if(third.errorMessage)
					output += '<b>ERROR:</b> '+second.errorCode+' on /sessionInfo'
				else
					output += '<b>WARNING:</b> API endpoint not available!'
			}

			$('#info-connectivity-details').html(output)
		},
		error: function (response) {
			console.log("ERROR")
			console.log(response)

			$('#info-connectivity-details').html(JSON.stringify(response))
		}
	});
}

