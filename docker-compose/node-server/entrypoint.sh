#!/bin/bash

index=1

# 循環讀取使用者環境變數
for user in $(env | grep SSH_USER_); do
  username=$(eval echo "\${SSH_USER_$index}")
  group=$(eval echo "\${SSH_GROUP_$index}")
  password=$(eval echo "\${SSH_PASS_$index}")

  if [ ! -d "/home/$username" ]; then
    groupadd $group 
    useradd -g $group $username -m
    usermod --shell /bin/bash $username
    echo "$username:$password" | chpasswd

    mkdir -p /home/$username/.ssh
    chown -R $username:$group /home/$username/.ssh
    chmod 700 /home/$username/.ssh

    ssh-keygen -f /home/$username/.ssh/id_rsa -N '' 
    cat /home/$username/.ssh/id_rsa.pub >> /home/$username/.ssh/authorized_keys

    chown -R $username:$group /home/$username/.ssh/*
    chmod 700 /home/$username/.ssh/id_rsa
    chmod 600 /home/$username/.ssh/authorized_keys

    echo "%$group ALL=(ALL) ALL" >> /etc/sudoers

    # 管理用, 非必要
    mkdir -p /ssh/$username
    cp -r /home/$username/.ssh/* /ssh/$username
  fi
  
  index=$(expr $index + 1)
done

unset index

/usr/sbin/sshd -D