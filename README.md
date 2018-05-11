# s4t-node-cloud-WebInterface
The WebInterface created at UniMe for the IoTronic project is based on a framework called CodeIgniter http://www.codeigniter.com/ (we used version 3.1.2).

# Requirements
* Server Web (apache2)
* CodeIgniter-3.1.2
* Some Linux libraries
  * curl
  * php5
* A CodeIgniter library 
  * Curl.php
* A responsive front-end framework (foundation-5.5.3 --> http://foundation.zurb.com/downloads/foundation-5.5.3.zip). 


# Server preliminary installation and configuration
* Install some libraries: ```apt-get install php5 libapache2-mod-php5 php5-curl``` (or ```apt-get install php7.0 libapache2-mod-php php7.0-curl``` in recent releases)
* Enable the rewrite Apache module: ```a2enmod rewrite```
* Append the following lines in the Apache config file: ```/etc/apache2/sites-enabled/000-default.conf```
```
<Directory "/var/www/html">
    AllowOverride All
</Directory>
```
* Restart Apache service: ```service apache2 restart```
* Verify Apache needed modules: ```apache2ctl -M``` (verify the presence of the following lines: ```php<version>_module (shared)``` and ```rewrite_module (shared)```)
* Modify "short_open_tag" option from "Off" to "On": ```vim /etc/php5/apache2/php.ini``` (or ```vim /etc/php/7.0/apache2/php.ini``` in recent releases)


# OPTIONAL (SSL for https connection)
* ```a2enmod ssl && a2ensite default-ssl```
* Modify ```SSLCertificateFile``` and ```SSLCertificateKeyFile``` in the following Apache conf file: ```/etc/apache2/sites-available/default-ssl.conf``` adding the corresponding paths
* ```service apache2 restart```
* Verify if the module ```ssl_module (shared)``` is loaded.


# CodeIgniter installation and configuration
Download the CodeIgniter-3.1.2 from https://github.com/bcit-ci/CodeIgniter/archive/3.1.2.zip into the ```/var/www/html``` folder on the server and unzip it. Rename the folder to one of your choice (e.g.: iotronic in our case), substitute the ```application/config/config.php``` configuration file with the one on this repo and make the correct changes to parameters as suggested according to the server-side iotronic environment you already set.


# CodeIgniter extra packages
To use the API developed it is necessary to download the CodeIgniter Curl library (not present by default) into the ```application/libraries``` folder.
```
wget https://raw.githubusercontent.com/philsturgeon/codeigniter-curl/master/libraries/Curl.php
```

As front-end framework we used the previously mentioned Foundation which has to be downloaded into ```assets``` folder as follows:
* ```mkdir iotronic/assets```
* ```mkdir -p bower_components/foundation && cd bower_components/foundation```
* ```wget http://foundation.zurb.com/cdn/releases/foundation-5.5.3.zip && unzip foundation-5.5.3.zip```


# Last steps before browsing the interface
1. Copy the content of the folders in this repo inside your folder (e.g.: iotronic in our case) paying attention to follow the same folders tree
2. Copy the ```.htaccess``` which contains the rewrite rules and the images linked inside the code
3. Display the WebPage on this URL: ```http://<SERVER_IP>/<FOLDER_NAME>/Login```

# Extra info
If you come across forbidden access errors launch ```chmod 755 -R <folder>``` command on templates and uploads folders.
