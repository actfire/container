# 指定創建的基礎鏡像
FROM node:20

# 標籤訊息 (optional)
LABEL authors="actfire@gmail.com"

# install package
RUN set -uex; \
    # update apt-get
    apt-get update; \
    # Install main dependencies
    apt-get install -y apt-utils; \
    apt-get install -y curl; \
    apt-get install -y zip; \
    apt-get install -y sshpass; \
    apt-get install -y openssh-server; \
    apt-get install -y rsync; \
    apt-get install -y vim; \
    apt-get clean;

# 創建 SSH 目錄
RUN mkdir /var/run/sshd

# 設置 root 密碼（請更改為您自己的安全密碼）
RUN echo 'root:oiceuthn' | chpasswd

# 允許 root 用戶通過 SSH 登錄（請注意，這可能存在安全風險）
RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

# SSH 登錄時需要的環境變量
ENV NOTVISIBLE "in users profile"
RUN echo "export VISIBLE=now" >> /etc/profile

# 啟動 SSH 服務
CMD ["/usr/sbin/sshd", "-D"]

# 開放埠號
EXPOSE 22
EXPOSE 80
EXPOSE 443
EXPOSE 3000-3003
