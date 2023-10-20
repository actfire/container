# 指定創建的基礎鏡像
FROM ubuntu:22.04

# 標籤訊息 (optional)
LABEL authors="actfire@gmail.com"

COPY entrypoint.sh /

# install package
RUN set -uex; \
    # update apt-get
    apt-get update; \
    # Install main dependencies
    apt-get install -y apt-utils; \
    apt-get install -y sudo; \
    apt-get install -y curl; \
    apt-get install -y gnupg2; \
    apt-get install -y sshpass; \
    apt-get install -y openssh-server; \
    apt-get install -y rsync; \
    apt-get install -y vim; \
    # install nodejs
    apt-get install -y ca-certificates curl gnupg; \
    mkdir -p /etc/apt/keyrings; \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key \
    | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg; \
    NODE_MAJOR=18; \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" > /etc/apt/sources.list.d/nodesource.list; \
    apt-get update; \
    apt-get install nodejs -y; \
    # update npm & install pnpm
    npm i -g npm && npm i -g pnpm; \
    # Install pm2
    npm i -g --no-optional --no-shrinkwrap --no-package-lock pm2; \
    # ssh setting
    mkdir /run/sshd; \
    # 建立 sshd 配置文件,允許 root 登入和 PasswordAuthentication
    sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config; \
    sed -i 's/PasswordAuthentication no/PasswordAuthentication yes/' /etc/ssh/sshd_config; \
    # give exec permission
    chmod +x /entrypoint.sh; \
    apt-get clean;

# 開放埠號
EXPOSE 22
EXPOSE 80
EXPOSE 443
EXPOSE 3000

ENTRYPOINT ["/entrypoint.sh"]
CMD ["/usr/sbin/sshd","-D"]
