<!--
Copyright 2017-2018 Carmelo Romeo (caromeo@unime.it)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

<div id="modal-pinmode-gpio" class="reveal-modal small" data-reveal>
	<section>
		<h3>PIN I/O</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">

			<label>Boards List</label>
			<select id="gpio_pin_boardlist"></select>

			<label>PIN</label>
			<input id="gpio_pin" type="number" min="1" max="20" step="1" value=""/>

			<label>Input or Output</label>
			<div style="position: relative; width: 50%; overflow: auto; margin: auto; ">
				<input type="radio" id="input_gpio" checked onclick="toggle_radio_pin_io(this);"/>Input
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<input type="radio" id="output_gpio" onclick="toggle_radio_pin_io(this);"/>Output
			</div>
		</div>
		<div class="row">
			<div class="large-12 columns">
				<button id="gpio_pin_mode" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">
					Action
				</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="gpio_pinmode-output" />
	</fieldset>
</div>



<div id="modal-readwrite-gpio" class="reveal-modal small" data-reveal>
	<section>
		<h3>GPIO actions</h3>
		<a class="close-reveal-modal" aria-label="Close">&#215;</a>
		<div class="row">

			<label>Boards List</label>
			<select id="gpio_readwrite_boardlist"></select>

			<label>PIN</label>
			<input id="gpio_readwrite_pin" type="text" value=""/>

			<label>Read or Write</label>
			<div style="position: relative; width: 50%; overflow: auto; margin: auto; ">
				<input type="radio" id="read_gpio" checked onclick="toggle_radio_readwrite(this);"/>Read
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<input type="radio" id="write_gpio" onclick="toggle_radio_readwrite(this);"/>Write
			</div>

			<div id="gpio_readwrite_value_div">
				<label>Value</label>
				<input id="gpio_readwrite_value" type="number" min="0" max="20000" step="1" value=""/>
			</div>

			<label>Analog or Digital</label>
			<div style="position: relative; width: 50%; overflow: auto; margin: auto; ">
				<input type="radio" id="analog_gpio" checked onclick="toggle_radio_pin_ad(this);"/>Analog
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<input type="radio" id="digital_gpio" onclick="toggle_radio_pin_ad(this);"/>Digital
			</div>
		</div>
		<div class="row">
			<div class="large-12 columns">
				<button id="gpio_action" class="button tiny radius" style="font-size:1.0rem; color:#fff; float:right;" onclick="loading();">
					Submit
				</button>
			</div>
		</div>
	</section>
	<fieldset>
		<legend>Output</legend>
		<p id="gpio_readwrite-output" />
	</fieldset>

</div>
