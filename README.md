# s4t-node-cloud-WebInterface
The WebInterface created at UniMe for the Iotronic project is based on a framework called CodeIgniter http://www.codeigniter.com/ whose current version is the 3.0.2.

# Requirements
* Server Web (apache2);
* CodeIgniter-3.0.2;
* Some Linux libraries
  * curl
  * php5
* A CodeIgniter library 
  * Curl.php
* A responsive front-end framework (foundation-5.5.3). 


# CodeIgniter installation e configuration
If not already installed on the server machine, install the apache2 web service on top of which we are going to put CodeIgniter. First of all be sure of having php5 and php5-curl packages before going on with the following steps.
After this it is useful to enable the "short tag" flag in:
```
vim /etc/php5/apache2/php.ini
```
changing the short_open_tag=Off --> short_open_tag=On
