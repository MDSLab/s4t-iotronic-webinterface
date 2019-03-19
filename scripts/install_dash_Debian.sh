#!/bin/bash

# Main parameters to set
flag_ssl="True"	# Set it to True if you want to configure SSL on the machine

name=`cat /etc/os-release | grep ^NAME* | sed -e "s/NAME=//g"`
version=`cat /etc/os-release | grep ^VERSION_ID* | sed -e "s/VERSION_ID=//g"`


# Server preliminary installation and configuration
# ----------------------------------------------------------------------------------

# Install packages
flag_php7="False"
if [ $name == "\"Debian GNU/Linux\"" ]; then
	echo -e "\nInstalling apache2, relative dependencies and updating files"
	cd /tmp
	wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg
	echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" | tee /etc/apt/sources.list.d/php7.3.list
	apt update
	apt -y install software-properties-common dirmngr apt-transport-https lsb-release ca-certificates
	apt-get -qq -y install apache2 git unzip > /dev/null

	if [ $version == "\"9\"" ]; then
		echo -e "\tInstalling php7"
		apt-get -qq -y install apt-get install php7.3 php7.3-common php7.3-cli php7.3-curl php7.3-json php7.3-opcache php7.3-readline libapache2-mod-php7.3 > /dev/null
		flag_php7="True"
	else
		echo -e "\tInstalling php5"
		apt-get -qq -y install php5 libapache2-mod-php5 php5-curl > /dev/null
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
	a2enmod rewrite
	service apache2 restart
fi


# OPTIONAL: SSL module
if [ $flag_ssl == "True" ]; then
	module=`apachectl -M | grep ssl_module`
	if [[ $module =~ .*ssl_module.* ]]; then
		echo -e "\tSSL module already enabled, skipping"
	else
		echo -e "\tEnabling SSL module"
		a2enmod ssl
		a2ensite default-ssl
		service apache2 restart
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
	sed -i "s/short_open_tag = Off/short_open_tag = On/g" /etc/php/7.3/apache2/php.ini
else
	sed -i "s/short_open_tag = Off/short_open_tag = On/g" /etc/php5/apache2/php.ini
fi
service apache2 restart
# ----------------------------------------------------------------------------------




# Codeigniter installation and configuration
# ----------------------------------------------------------------------------------
if [ -d "/var/www/html/iotronic" ]; then
	echo -e "\nIotronic already installed...skipping"
else

	echo -e "\nIotronic is not installed..."
	cd /var/www/html
	git clone --depth=1 https://github.com/MDSLab/s4t-iotronic-webinterface.git ./iotronic
	service apache2 restart
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
