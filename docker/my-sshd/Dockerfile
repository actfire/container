# 指定創建的基礎鏡像
FROM alpine

# 作者描述信息
LABEL org.opencontainers.image.authors="actfire@gmail.com"

# 替換源
# RUN echo "http://mirrors.aliyun.com/alpine/latest-stable/main/" > /etc/apk/repositories
# RUN echo "http://mirrors.aliyun.com/alpine/latest-stable/community/" >> /etc/apk/repositories

# 同步時間

# 更新源、安裝openssh 並修改配置文件和生成key 並且同步時間
RUN apk update && \
    apk add --no-cache openssh tzdata && \ 
    cp /usr/share/zoneinfo/Asia/Taipei /etc/localtime && \
    sed -i "s/#PermitRootLogin.*/PermitRootLogin yes/g" /etc/ssh/sshd_config && \
    ssh-keygen -t dsa -P "" -f /etc/ssh/ssh_host_dsa_key && \
    ssh-keygen -t rsa -P "" -f /etc/ssh/ssh_host_rsa_key && \
    ssh-keygen -t ecdsa -P "" -f /etc/ssh/ssh_host_ecdsa_key && \
    ssh-keygen -t ed25519 -P "" -f /etc/ssh/ssh_host_ed25519_key && \
    echo "root:oiceuthn" | chpasswd

# 開放22端口
EXPOSE 22

# 執行ssh啓動命令
CMD ["/usr/sbin/sshd", "-D"]