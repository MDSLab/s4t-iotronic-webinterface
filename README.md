# s4t-node-cloud-WebInterface
The WebInterface created at UniMe for the Iotronic project is based on a framework called CodeIgniter http://www.codeigniter.com/ whose current version is the 3.1.2.

# Requirements
* Server Web (apache2);
* CodeIgniter-3.1.2;
* Some Linux libraries
  * curl
  * php5
* A CodeIgniter library 
  * Curl.php
* A responsive front-end framework (foundation-5.5.3 --> http://foundation.zurb.com/downloads/foundation-5.5.3.zip). 


# Server preliminary installation and configuration
* Install some libraries: ```apt-get install php5 libapache2-mod-php5 php5-curl``` (or ```apt-get install libapache2-mod-php php7.0-curl``` in recent releases)
* Enable Apache modules: ```a2enmod rewrite```
* Add few lines in Apache config file: ```/etc/apache2/sites-enabled/000-default.conf``` and append 
```
<Directory "/var/www/html">
    AllowOverride All
</Directory>
```
* Restart Apache service: ```service apache2 restart```
* Verify Apache needed modules: ```apache2ctl -M``` (verify the presence of the following lines: ```php<version>_module (shared)``` and ```rewrite_module (shared)```)
* Modify "Short Open Tag" field to "On": ```vim /etc/php5/apache2/php.ini``` (or ```vim /etc/php/7.0/apache2/php.ini``` in recent releases) [change ```short_open_tag=Off``` to ```short_open_tag=On```]


# CodeIgniter installation and configuration
Download the CodeIgniter-3.1.2 from https://github.com/bcit-ci/CodeIgniter/archive/3.1.2.zip into the ```/var/www/html``` folder on the server and unzip it. Rename the folder to one of your choice (e.g.: s4t-dev in our case) and make some changes in the ```application/config/config.php``` configuration file.
```
$config['index_page'] = 'index.php'; → $config['index_page'] = '';
$config['encryption_key'] = ''; → $config['encryption_key'] = 'your_encryption_key';  (if needed)
```


# CodeIgniter extra packages
To use the API developed it is necessary to download the CodeIgniter Curl library (not present by default) into the ```application/libraries``` folder.
```
wget https://raw.githubusercontent.com/philsturgeon/codeigniter-curl/master/libraries/Curl.php
```

As front-end framework we used the previously mentioned Foundation which has to be downloaded into ```assets``` folder as follows:
* ```mkdir s4t-dev/assets```
* ```mkdir -p bower_components/foundation && cd bower_components/foundation```
* ```wget http://foundation.zurb.com/cdn/releases/foundation-5.5.3.zip && unzip foundation-5.5.3.zip```


# Header and Footer
Create a folder which will contain both header(s) and footer(s) launching ```mkdir application/views/templates``` and then create ```header.php``` and ```footer.php``` where you can put logo(s), import Javascripts, import Stylesheets and so on.

Pay attention to the fact that in the bottom part of the footer you are forced to put ```<script>  $(document).foundation();  </script>``` before ```<script src="<?= $this -> config -> site_url() ?>assets/bower_components/foundation/js/foundation/foundation.js"></script>``` in order to have modals (see Foundation online documentation) working on your WebSite.

In case you are using the ones added to this repo simply copy the relative files inside your ```application/views/templates``` folder.

# Last steps before browsing the interface
1. Copy the ```.htaccess``` file and ```uploads``` folder content inside your folder (e.g.: s4t-dev in our case) which contain the rewrite rules and the images linked inside the code.
2. In the "s4t-iotronic-webinterface" repo you also have these files: 
  * ```application/views/last.php```
  * ```application/controllers/Last.php```
  * ```assets/smartme.css``` (any css you can use to customize the layout)

  which have to be put in the correct folders in order to correctly display the WebPage on this URL: ```http://<SERVER_IP>/<FOLDER_NAME>/Last```

# Extra info
If you come across forbidden access errors launch ```chmod 755 -R <folder>``` command on templates and uploads folders.
