#!/usr/bin/env bash

# 安裝 jenkins
wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
yum upgrade
yum install epel-release java-11-openjdk-devel -y
yum install jenkins -y
systemctl daemon-reload

systemctl start jenkins
systemctl enable jenkins