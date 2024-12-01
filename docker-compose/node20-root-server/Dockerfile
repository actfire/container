FROM node:20-bullseye

# 標籤訊息 (optional)
LABEL authors="actfire@gmail.com"

# install package
RUN set -uex; \
    # update apt-get
    apt-get update; \
    # Install main dependencies
    apt-get install -y openssh-server; \
    apt-get install -y vim; \
    apt-get install -y psmisc; \
    # Install pm2
    npm i -g --no-optional --no-shrinkwrap --no-package-lock pm2; \
    # install Bun
    curl -fsSL https://bun.sh/install | bash; \
    apt-get clean;

# 創建 SSH 目錄
RUN mkdir /var/run/sshd

# 設置 root 密碼 (請將 'your_password' 替換為您想要的密碼)
RUN echo 'root:oiceuthn' | chpasswd

# 允許 root 用戶通過 SSH 登錄
RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

# SSH 登錄修復
RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

# 設置環境變量
# ENV NOTVISIBLE "in users profile"
# RUN echo "export VISIBLE=now" >> /etc/profile

# 創建啟動腳本
RUN echo '#!/bin/bash\n\
/usr/sbin/sshd -D &\n\
if [ -d "${NODE_PATH}" ] && [ -f "${NODE_PATH}${NODE_FILE}" ]; then\n\
    echo "Stopping Node app..."\n\
    pm2 delete all || true &\n\
    echo "Starting Node app..."\n\
    pm2 start ${NODE_PATH}${NODE_FILE} --name "Node Server" &\n\
else\n\
    echo "Node app not found in ${NODE_PATH}${NODE_FILE}"\n\
fi\n\
wait' > /start.sh

# 設置啟動腳本權限
RUN chmod +x /start.sh

# 暴露 SSH 端口和假設的 Express 應用端口 (例如 3000)
EXPOSE 22 3000

# 使用啟動腳本
CMD ["/start.sh"]