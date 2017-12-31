/**
 * Copyright 2017-2018 Carmelo Romeo (caromeo@unime.it), Nicola Peditto (npeditto@unime.it)
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

var ckan_addr = ckan_params["address"];
var ckan_org = ckan_params["organization"];
var m_authid = ckan_params["m_authid"];

var ckan_host = "http://"+ ckan_addr;

var pool = [];
var metrics = ["temperature", "brightness", "humidity", "pressure", "gas", "noise"];

var api_dataset_create = "/api/rest/dataset";
var api_datastore_create = "/api/3/action/datastore_create";
var api_insert = "/api/3/action/datastore_upsert";

var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
var timestamp = (new Date(Date.now() - tzoffset)).toISOString();

var dataset_id = "";

function ckan (data, callback){

    dataset_id = data.board_id;

    createDataset(data, function (res) {

        console.log("Dataset: " + JSON.stringify(res));

        var payload = {"resource": {"package_id":dataset_id, "name":"sensors"}, "fields": [ {"id": "Type", "type":"text"}, {"id": "Model", "type":"text"}, {"id": "Unit", "type":"text"}, {"id": "FabricName", "type":"text"}, {"id": "ResourceID", "type":"text"}, {"id": "Date", "type":"timestamp"}] };

        createDatastore(payload, function(sensorD){

            console.log("Datastore: " + JSON.stringify(sensorD));

            sensors_id = sensorD.result.resource_id;
            console.log("SENS ID: " + sensors_id);

            for(var metric=0; metric < metrics.length; metric++) {

                (function(metric) {

                    setTimeout(function(){

                        pool.push(new Promise(

                            function (resolve) {

                                console.log(metrics[metric]);

                                if (metrics[metric] == "temperature"){

                                    var payload = {"resource": {"package_id":dataset_id, "name":"temperature"}, "fields": [ {"id": "Date", "type":"timestamp"}, {"id": "Temperature", "type":"numeric"}, {"id": "Altitude", "type":"numeric"}, {"id": "Latitude", "type":"numeric"}, {"id": "Longitude", "type":"numeric"}] }
                                    createDatastore(payload, resolve);
                                }
                                else if(metrics[metric] == "brightness"){

                                    var payload = {"resource": {"package_id":dataset_id, "name":"brightness"}, "fields": [ {"id": "Date", "type":"timestamp"}, {"id": "Brightness", "type":"numeric"}, {"id": "Altitude", "type":"numeric"}, {"id": "Latitude", "type":"numeric"}, {"id": "Longitude", "type":"numeric"}] }
                                    createDatastore(payload, resolve);

                                }
                                else if(metrics[metric] == "humidity"){

                                    var payload = {"resource": {"package_id":dataset_id, "name":"humidity"}, "fields": [ {"id": "Date", "type":"timestamp"}, {"id": "Humidity", "type":"numeric"}, {"id": "Altitude", "type":"numeric"}, {"id": "Latitude", "type":"numeric"}, {"id": "Longitude", "type":"numeric"}] };
                                    createDatastore(payload, resolve);

                                }
                                else if(metrics[metric] == "pressure"){

                                    var payload = {"resource": {"package_id":dataset_id, "name":"pressure"}, "fields": [ {"id": "Date", "type":"timestamp"}, {"id": "Pressure", "type":"numeric"}, {"id": "Altitude", "type":"numeric"}, {"id": "Latitude", "type":"numeric"}, {"id": "Longitude", "type":"numeric"}] };
                                    createDatastore(payload, resolve);

                                }
                                else if(metrics[metric] == "gas"){

                                    var payload = {"resource": {"package_id":dataset_id, "name":"gas"}, "fields": [ {"id": "Date", "type":"timestamp"}, {"id": "Gas", "type":"numeric"}, {"id": "Altitude", "type":"numeric"}, {"id": "Latitude", "type":"numeric"}, {"id": "Longitude", "type":"numeric"}] };
                                    createDatastore(payload, resolve);

                                }
                                else if(metrics[metric] == "noise"){
                                    var payload = {"resource": {"package_id":dataset_id, "name":"noise"}, "fields": [ {"id": "Date", "type":"timestamp"}, {"id": "Noise", "type":"numeric"}, {"id": "Altitude", "type":"numeric"}, {"id": "Latitude", "type":"numeric"}, {"id": "Longitude", "type":"numeric"}] };
                                    createDatastore(payload, resolve);

                                }

                            }

                        ));

                        if (metric == metrics.length - 1) {

                            Promise.all(pool).then(

                                function (values) {

                                    for(var val=0; val < values.length; val++) {

                                        (function (val) {

                                            var r_name = values[val].result.resource.name;

                                            if (r_name == "temperature"){
                                                var temp_id = values[val].result.resource_id;

                                                var payload = {"resource_id":sensors_id, "method":"insert", "records":[{"Type":"temperature","Model":"Thermistor","Unit":"C","FabricName":"TinkerKit","ResourceID":temp_id,"Date":timestamp}]};
                                                insertDatastore(payload, function(insertD){
                                                    console.log("\n" + JSON.stringify(insertD));
                                                });

                                            }
                                            else if(r_name == "brightness"){

                                                var brig_id = values[val].result.resource_id;
                                                var payload = {"resource_id":sensors_id, "method":"insert", "records":[{"Type":"brightness","Model":"LDR","Unit":"lux","FabricName":"TinkerKit","ResourceID":brig_id,"Date":timestamp}]};
                                                insertDatastore(payload, function(insertD){
                                                    console.log("\n" + JSON.stringify(insertD));
                                                });
                                            }
                                            else if(r_name == "humidity"){

                                                var hum_id = values[val].result.resource_id;
                                                var payload = {"resource_id":sensors_id, "method":"insert", "records":[{"Type":"humidity","Model":"HIH-4030","Unit":"percent","FabricName":"Honeywell","ResourceID":hum_id,"Date":timestamp}]};
                                                insertDatastore(payload, function(insertD){
                                                    console.log("\n" + JSON.stringify(insertD));
                                                });
                                            }
                                            else if(r_name == "pressure"){


                                                var pres_id = values[val].result.resource_id;
                                                var payload = {"resource_id":sensors_id, "method":"insert", "records":[{"Type":"barometer","Model":"mpl3115","Unit":"hPa","FabricName":"TinkerKit","ResourceID":pres_id,"Date":timestamp}]};
                                                insertDatastore(payload, function(insertD){
                                                    console.log("\n" + JSON.stringify(insertD));
                                                });

                                            }
                                            else if(r_name == "gas"){

                                                var gas_id = values[val].result.resource_id;
                                                var payload = {"resource_id":sensors_id, "method":"insert", "records":[{"Type":"gas","Model":"MQ9","Unit":"ppm","FabricName":"Grove","ResourceID":gas_id,"Date":timestamp}]};
                                                insertDatastore(payload, function(insertD){
                                                    console.log("\n" + JSON.stringify(insertD));
                                                });

                                            }
                                            else if(r_name == "noise"){

                                                var noi_id = values[val].result.resource_id;
                                                var payload = {"resource_id":sensors_id, "method":"insert", "records":[{"Type":"sound_detect","Model":"HY-038","Unit":"dB","FabricName":"Keyes","ResourceID":noi_id,"Date":timestamp}]};
                                                insertDatastore(payload, function(insertD){
                                                    console.log("\n" + JSON.stringify(insertD));
                                                });

                                            }

                                            if (val == values.length - 1) {

                                                console.log("DONE");

                                                callback("CKAN registration completed")
                                            }

                                        })(val);
                                    }


                                },
                                function (reason) {
                                    console.log(reason);
                                }

                            );


                        }

                    }, metric*3000);

                })(metric);

            }

        });

    })


}


var createDataset = function(data, callback){

    var dataset_id = data.board_id;
    var label = data.board_label;
    var manufacturer = data.manufacturer;
    var model = data.model;
    var longitude = data.longitude;
    var latitude = data.latitude;
    var altitude = data.altitude;

    var payloadJSON = {"name":dataset_id, "title":dataset_id, "owner_org":ckan_org, "extras":{"Label":label, "Manufacturer":manufacturer, "Model":model, "Altitude":altitude, "Latitude":latitude, "Longitude":longitude}};

    $.ajax({

        url: ckan_host + api_dataset_create,
        type: 'POST',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        headers: {
            "Authorization": m_authid,
            "Content-Type": "application/json"
        },
        data: JSON.stringify(payloadJSON),
        success: function(response){
            console.log(response);
            callback(response)

        },
        error: function(response){
            console.log(response);
            callback(response)
        }

    });

};


var createDatastore = function(payload, callback){

    $.ajax({

        url: ckan_host + api_datastore_create,
        type: 'POST',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        headers: {
            "Authorization": m_authid,
            "Content-Type": "application/json"
        },
        data: JSON.stringify(payload),
        success: function(response){
            console.log(response);
            callback(response)

        },
        error: function(response){
            console.log(response);
            callback(response)
        }

    });

};


var insertDatastore = function(payload, callback){

    $.ajax({

        url: ckan_host + api_insert,
        type: 'POST',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        headers: {
            "Authorization": m_authid,
            "Content-Type": "application/json"
        },
        data: JSON.stringify(payload),
        success: function(response){
            console.log(response);
            callback(response)

        },
        error: function(response){
            console.log(response);
            callback(response)
        }

    });

};
