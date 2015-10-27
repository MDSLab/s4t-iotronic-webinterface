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


# Server preliminary configuration
If not already installed on the server machine, install the apache2 web service on top of which we are going to put CodeIgniter. First of all be sure of having php5 and php5-curl packages before going on with the following steps.
After this it is useful to enable the "short tag" flag in:
```
vim /etc/php5/apache2/php.ini
```
changing the ```short_open_tag=Off → short_open_tag=On```

# CodeIgniter installation and configuration
Download the CodeIgniter-3.0.2 from https://github.com/bcit-ci/CodeIgniter/archive/3.0.2.zip into the ```/var/www/html``` folder on the server and unzip it. Rename the folder to one of your choice (e.g.: s4t-dev in our case) and make some changes in the ```application/config/config.php``` configuration file.
```
$config['index_page'] = 'index.php'; → $config['index_page'] = '';
$config['encryption_key'] = ''; → $config['encryption_key'] = 'your_encryption_key';
```

# CodeIgniter extra packages
After having changed some global and common configuration parameters it is possible to download the CodeIgniter Curl library (not present by default) into the ```application/libraries``` folder.
```
wget https://raw.githubusercontent.com/philsturgeon/codeigniter-curl/master/libraries/Curl.php
```
As front-end framework we used the previously mentioned Foundation which has to be downloaded into ```assets``` folder as follows:
```
cd assets/ && mkdir -p bower_components/foundation && cd bower_components/foundation && wget http://foundation.zurb.com/cdn/releases/foundation-5.5.3.zip && unzip foundation-5.5.3.zip
```
# Header and Footer
If Foundation was chosen few precautions have to be taken into consideration. Create a folder which will contain both header(s) and footer(s) launching ```mkdir application/views/templates``` and then create ```header.php``` and ```footer.php``` where you can put logo(s), import Javascripts, import Stylesheets and so on.

Pay attention to the fact that in the bottom part of the footer you are forced to put ```<script>  $(document).foundation();  </script>``` before ```<script src="<?= $this -> config -> site_url() ?>assets/bower_components/foundation/js/foundation/foundation.js"></script>``` in order to have modals (see Foundation online documentation) working on your WebSite.

#Testing
