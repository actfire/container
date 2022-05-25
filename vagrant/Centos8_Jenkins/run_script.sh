#!/usr/bin/env bash

# 安裝 nginx
yum install epel-release -y
yum install nginx -y
systemctl enable nginx
nginx

# 安裝 jenkins
wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
yum upgrade
yum install fontconfig epel-release java-11-openjdk -y
yum install jenkins -y

systemctl daemon-reload
systemctl start jenkins
systemctl enable jenkins