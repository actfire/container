#!/bin/bash

# 循環讀取使用者環境變數
for user in $(env | grep SSH_USER_); do
  username=${user#SSH_USER_*=}
  group=$(eval echo "\${SSH_GROUP_$username}")
  password=$(eval echo "\${SSH_PASS_$username}")

  groupadd $group 
  useradd -g $group $username
  usermod --shell /bin/bash $username
  echo "$username:$password" | chpasswd

  mkdir -p /home/$username/.ssh
  ssh-keygen -f /home/$username/.ssh/id_rsa -N '' 
  cat /home/$username/.ssh/id_rsa.pub >> /home/$username/.ssh/authorized_keys

  chown -R $username:$group /home/$username/.ssh
  chmod 700 /home/$username/.ssh
  chmod 600 /home/$username/.ssh/authorized_keys
done

/usr/sbin/sshd -D