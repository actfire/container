# 指定創建的基礎鏡像
FROM node:18.18.2

# 標籤訊息 (optional)
LABEL authors="actfire@gmail.com"

# install Bun
RUN curl -fsSL https://bun.sh/install | bash

# install package
RUN set -uex; \
    # update apt-get
    apt-get update; \
    # Install main dependencies
    apt-get install -y jq; \
    apt-get install -y sudo; \
    apt-get install -y zip; \
    apt-get install -y vim; \
    apt-get clean;

# 開放埠號
EXPOSE 22
EXPOSE 3000-3003
