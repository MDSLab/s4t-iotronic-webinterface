# Automatic installation and configuration (TO BE TESTED...)
Clone this repo (or download the zip and extract it) inside the /var/www/html folder.

Before launching the script for [Debian](https://github.com/MDSLab/s4t-iotronic-webinterface/blob/master/scripts/install_dash_Debian.sh) set the ```flag_ssl``` variable in order to have SSL enabled or not.

# Manual installation and configuration
## Install packages
```
cd /tmp
wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg
echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" | tee /etc/apt/sources.list.d/php7.3.list
apt update
apt -y install software-properties-common dirmngr apt-transport-https lsb-release ca-certificates
apt-get -qq -y install apache2 git unzip
apt-get install php7.3 php7.3-common php7.3-cli php7.3-curl php7.3-json php7.3-opcache php7.3-readline libapache2-mod-php7.3
```
## Configuration
```
a2enmod rewrite && a2enmod headers
echo -e '<Directory "/var/www/html">\nAllowOverride All\n</Directory>' >> /etc/apache2/sites-enabled/000-default.conf
sed -i "s/short_open_tag = Off/short_open_tag = On/g" /etc/php/7.3/apache2/php.ini
service apache2 restart
```
## Final checks
```
apache2ctl -M
```
*Verify the presence of the following lines: php7_module (shared) and rewrite_module (shared)

## Install Dashboard
```
cd /var/www/html
git clone --depth=1 https://github.com/MDSLab/s4t-iotronic-webinterface.git ./iotronic
service apache2 restart
```

## OPTIONAL (SSL for https connection)
* ```a2enmod ssl && a2ensite default-ssl```
* Modify ```SSLCertificateFile``` and ```SSLCertificateKeyFile``` in the following Apache conf file: ```/etc/apache2/sites-available/default-ssl.conf``` adding the corresponding paths
```service apache2 restart```
* Verify if the module ```ssl_module (shared)``` is loaded.

## OPTIONAL (hardening improvements)
Add the following lines at the end of the apache2.conf (or older httpd.conf):
```
ServerSignature Off
ServerTokens Prod
Header set X-XSS-Protection "1; mode=block"
Header set X-Content-Type-Options nosniff
Header always set Strict-Transport-Security "max-age=31536000; includeSubdomains; preload"
```

# Final steps (both automatic and manual procedures)
Copy the ```.htaccess``` which contains the rewrite rules and the images linked inside the code
In both automatic and manual installation you need to modify the parameters in brackets inside the following file ```application/config/config.php``` and then display the WebPage on this URL: ```http://<SERVER_IP>/<FOLDER_NAME>/Login```
If you come across forbidden access errors launch ```chmod 755 -R <folder>``` command on templates and uploads folders.
