#!/usr/bin/env bash

# 安裝 nginx
sudo yum install epel-release -y
sudo yum install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx