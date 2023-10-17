FROM ubuntu:20.04

# prevent interactive prompts
ENV DEBIAN_FRONTEND=noninteractive

# update dependencies
RUN apt update
RUN apt upgrade -y

# install xfce desktop
RUN apt install -y xfce4 xfce4-goodies

# install dependencies
RUN apt install -y \
  tightvncserver \
  novnc \
  net-tools \
  nano \
  vim \
  neovim \
  curl \
  wget \
  firefox \
  git \
  python3 \
  python3-pip \
  openssh-server

# xfce fixes
RUN update-alternatives --set x-terminal-emulator /usr/bin/xfce4-terminal.wrapper

# nodejs
RUN set -uex; \
    apt-get update; \
    apt-get install -y ca-certificates curl gnupg; \
    mkdir -p /etc/apt/keyrings; \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key \
     | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg; \
    NODE_MAJOR=18; \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" > /etc/apt/sources.list.d/nodesource.list; \
    apt-get update; \
    apt-get install nodejs -y;

# update npm
RUN npm i -g npm

# install pnpm
RUN npm i -g pnpm

# install pm2
RUN npm i -g pm2

# VNC and noVNC config
ARG USER=root
ENV USER=${USER}

ARG VNCPORT=5900
ENV VNCPORT=${VNCPORT}
EXPOSE ${VNCPORT}

ARG NOVNCPORT=9090
ENV NOVNCPORT=${NOVNCPORT}
EXPOSE ${NOVNCPORT}

EXPOSE 22

ARG VNCPWD=oiceuthn
ENV VNCPWD=${VNCPWD}

ARG VNCDISPLAY=1280x720
ENV VNCDISPLAY=${VNCDISPLAY}

ARG VNCDEPTH=16
ENV VNCDEPTH=${VNCDEPTH}

ARG ROOTPWD=oiceuthn
ENV ROOTPWD=${ROOTPWD}

# root password
RUN mkdir -p /var/run/sshd
RUN mkdir -p /root/.ssh
#取消pam限制
RUN sed -ri 's/session required pam_loginuid.so/#session required pam_loginuid.so/g' /etc/pam.d/sshd
RUN sed -Ei 's/#PermitRootLogin.+/PermitRootLogin yes/' /etc/ssh/sshd_config
RUN echo "root:${ROOTPWD}" | chpasswd

# setup VNC
RUN mkdir -p /root/.vnc/
RUN echo ${VNCPWD} | vncpasswd -f > /root/.vnc/passwd
RUN chmod 600 /root/.vnc/passwd
RUN echo "#!/bin/sh \n\
xrdb $HOME/.Xresources \n\
xsetroot -solid grey \n\
#x-terminal-emulator -geometry 80x24+10+10 -ls -title "$VNCDESKTOP Desktop" & \n\
#x-window-manager & \n\
# Fix to make GNOME work \n\
export XKL_XMODMAP_DISABLE=1 \n\
/etc/X11/Xsession \n\
startxfce4 & \n\
" > /root/.vnc/xstartup
RUN chmod +x /root/.vnc/xstartup

# setup noVNC
RUN openssl req -new -x509 -days 365 -nodes \
  -subj "/C=US/ST=IL/L=Springfield/O=OpenSource/CN=localhost" \
  -out /etc/ssl/certs/novnc_cert.pem -keyout /etc/ssl/private/novnc_key.pem \
  > /dev/null 2>&1
RUN cat /etc/ssl/certs/novnc_cert.pem /etc/ssl/private/novnc_key.pem \
  > /etc/ssl/private/novnc_combined.pem
RUN chmod 600 /etc/ssl/private/novnc_combined.pem

# copy vnc.html -> index.html
RUN cp /usr/share/novnc/vnc.html /usr/share/novnc/index.html

# clean
RUN apt clean && \
    rm -rf /var/lib/apt/lists/*

ENTRYPOINT [ "/bin/bash", "-c", " \
  service ssh start && \
  echo 'NoVNC Certificate Fingerprint:'; \
  openssl x509 -in /etc/ssl/certs/novnc_cert.pem -noout -fingerprint -sha256; \
  vncserver :0 -rfbport ${VNCPORT} -geometry $VNCDISPLAY -depth $VNCDEPTH -localhost; \
  /usr/share/novnc/utils/launch.sh --listen $NOVNCPORT --vnc localhost:$VNCPORT \
    --cert /etc/ssl/private/novnc_combined.pem \
" ]
