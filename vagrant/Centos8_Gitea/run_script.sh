#!/usr/bin/env bash

# 安裝 git
dnf install git

# 創建Git用戶
useradd --system --shell /bin/bash --comment 'Git Version Control' --create-home --home /home/git git

# 下載gitea二進位檔
VERSION=1.16.7
wget -O /tmp/gitea https://dl.gitea.io/gitea/${VERSION}/gitea-${VERSION}-linux-amd64

# 移動下載檔並給予執行權限
mv /tmp/gitea /usr/local/bin
chmod +x /usr/local/bin/gitea

# 創建必要的目錄並設置所需的權限和所有權
mkdir -p /var/lib/gitea/{custom,data,indexers,public,log}
mkdir -p /var/lib/gitea/{custom,data,indexers,public,log}
chown git: /var/lib/gitea/{data,indexers,log}
chmod 750 /var/lib/gitea/{data,indexers,log}
mkdir /etc/gitea
chown root:git /etc/gitea
chmod 770 /etc/gitea

# 創建Systemd Unit文件
wget https://raw.githubusercontent.com/go-gitea/gitea/master/contrib/systemd/gitea.service -P /etc/systemd/system/

# 重啟服務
systemctl daemon-reload

# 配置防火牆
firewall-cmd --permanent --zone=public --add-port=3000/tcp