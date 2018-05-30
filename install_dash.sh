#!/bin/bash

# Main parameters to set
flag_ssl="True"	# Set it to True if you want to configure SSL on the machine

name=`cat /etc/os-release | grep ^NAME* | sed -e "s/NAME=//g"`
version=`cat /etc/os-release | grep ^VERSION_ID* | sed -e "s/VERSION_ID=//g"`


# Server preliminary installation and configuration
# ----------------------------------------------------------------------------------

# Install packages
flag_php7="False"
if [ $name == "\"Ubuntu\"" ]; then
	echo -e "\nInstalling apache2, relative dependencies and updating files"
	sudo apt-get -qq -y install apache2 git unzip > /dev/null

	if [ $version == "\"16.04\"" ]; then
		echo -e "\tInstalling php7"
		sudo apt-get -qq -y install php7.0 libapache2-mod-php php7.0-curl > /dev/null
		flag_php7="True"
	elif [ $version == "\"14.04\"" ]; then
		echo -e "\tInstalling php5"
		sudo apt-get -qq -y install php5 libapache2-mod-php5 php5-curl > /dev/null
	fi
fi


# Allow Override
override=`cat /etc/apache2/sites-enabled/000-default.conf | grep '<Directory "/var/www/html">'`
if [ -z "$override" ]; then
	echo -e "\tEnabling apache2 override"
	echo -e '<Directory "/var/www/html">\nAllowOverride All\n</Directory>' >> /etc/apache2/sites-enabled/000-default.conf
else
	echo -e "\tApache2 override already set, skipping."
fi


# Enable apache2 modules
echo -e "\nVerifying apache2 module(s)..."

module=`apachectl -M | grep rewrite_module`
if [[ $module =~ .*rewrite_module.* ]]; then
	echo -e "\tRewrite module already enabled, skipping"
else
	echo -e "\tEnabling rewrite module"
	sudo a2enmod rewrite
	sudo service apache2 restart
fi


# OPTIONAL: SSL module
if [ $flag_ssl == "True" ]; then
	module=`apachectl -M | grep ssl_module`
	if [[ $module =~ .*ssl_module.* ]]; then
		echo -e "\tSSL module already enabled, skipping"
	else
		echo -e "\tEnabling SSL module"
		sudo a2enmod ssl
		sudo a2ensite default-ssl
		sudo service apache2 restart
	fi
fi

module=`apachectl -M | grep php`
if [[ $module =~ .*php.* ]]; then
	echo -e "\tPHP module already enabled, skipping"
else
	echo -e "\tNo PHP module enabled, please verify the correct installation"
	exit 1
fi


# Modify php.ini config file
if [[ $flag_php7 == "True" ]]; then
	sed -i "s/short_open_tag = Off/short_open_tag = On/g" /etc/php/7.0/apache2/php.ini
else
	sed -i "s/short_open_tag = Off/short_open_tag = On/g" /etc/php5/apache2/php.ini
fi
sudo service apache2 restart
# ----------------------------------------------------------------------------------




# Codeigniter installation and configuration
# ----------------------------------------------------------------------------------
if [ -d "/var/www/html/iotronic" ]; then
	echo -e "\nIotronic already installed...skipping"
else

	echo -e "\nIotronic is not installed..."
	cd /var/www/html
	wget -q https://github.com/bcit-ci/CodeIgniter/archive/3.1.2.zip
	unzip -qq 3.1.2.zip && mv CodeIgniter-3.1.2 iotronic
	rm 3.1.2.zip
	git clone -q https://github.com/MDSLab/s4t-iotronic-webinterface.git
	cd s4t-iotronic-webinterface

	cp .htaccess LICENSE README.md ../iotronic/

	mkdir ../iotronic/assets
	mkdir -p ../iotronic/assets/bower_components/foundation && cd ../iotronic/assets/bower_components/foundation
	wget -q http://foundation.zurb.com/cdn/releases/foundation-5.5.3.zip && unzip -qq foundation-5.5.3.zip
	rm foundation-5.5.3.zip

	cd /var/www/html/s4t-iotronic-webinterface
	cp -r uploads assets ../iotronic/

	cp application/config/config.php ../iotronic/application/config/config.php
	cp application/controllers/* ../iotronic/application/controllers/
	cp application/libraries/Curl.php ../iotronic/application/libraries/
	cp -r application/views/* ../iotronic/application/views/

	cd ../iotronic
	rm -rf ../s4t-iotronic-webinterface

	sudo service apache2 restart
fi
# ----------------------------------------------------------------------------------




# Manual configuration after installation of all the files
# ----------------------------------------------------------------------------------
echo -e "\nInstallation completed!"
echo -e 'WARNING: remember to update "iotronic/application/config/config.php" file according to your scenario'

if [ $flag_ssl == "True" ]; then
	echo -e 'WARNING: modify "SSLCertificateFile" and "SSLCertificateKeyFile" paths in file "/etc/apache2/sites-available/default-ssl.conf" to have a working https connection'
fi
# ----------------------------------------------------------------------------------
