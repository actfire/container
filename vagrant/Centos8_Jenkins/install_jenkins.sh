#!/usr/bin/env bash

# 安裝 git
sudo yum install git -y

# 安裝 jenkins
sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
sudo yum upgrade
sudo yum install fontconfig epel-release java-11-openjdk -y
sudo yum install jenkins -y

# 下載套件
sudo wget https://github.com/jenkinsci/plugin-installation-manager-tool/releases/download/2.12.6/jenkins-plugin-manager-2.12.6.jar
sudo java -jar jenkins-plugin-manager-*.jar \
--war /usr/share/java/jenkins.war \
--plugin-download-directory /var/lib/jenkins/plugins/ \
--plugins \
workflow-aggregator \
pipeline-stage-view \
git \
cloudbees-folder \
build-timeout \
credentials \
credentials-binding \
timestamper \
ws-cleanup \
mailer \
conditional-buildstep \
build-user-vars-plugin \
role-strategy \
generic-webhook-trigger \
nodejs \
pipeline-utility-steps

sudo chown -R jenkins:jenkins /var/lib/jenkins/plugins/

# 啟動 Jenkins
sudo systemctl daemon-reload
sudo systemctl start jenkins
sudo systemctl enable jenkins