FROM jenkins/jenkins:latest-jdk17
USER root
RUN apt-get update -qq \
    && apt-get install -qqy apt-transport-https ca-certificates curl gnupg2 software-properties-common \
    && curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add - \
    && add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/debian \
   $(lsb_release -cs) \
   stable"
RUN apt-get update  -qq \
    && apt-get -y install docker-ce \
    && apt-get -y install jq \
    && apt-get install -y rsync \
    && apt-get install -y zip \
    && apt-get install -y vim \
    && apt-get install -y sudo

# Create ubuntu user with sudo privileges
RUN usermod -aG sudo jenkins
# New added for disable sudo password
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

# plugin name from url: https://plugins.jenkins.io/[name of plugin]/releases/
RUN usermod -aG docker jenkins \
    && jenkins-plugin-cli --plugins \
    gitlab-plugin:1.9.6 \
    workflow-multibranch:795.ve0cb_1f45ca_9a_ \
    conditional-buildstep:1.4.3 \
    uno-choice:2.8.6 \
    publish-over-ssh:383.v4eb_4c44da_2dd \
    build-user-vars-plugin:182.v378b_9f14b_487 \
    pipeline-build-step:540.vb_e8849e1a_b_d8 \
    pipeline-stage-view:2.34 \
    cloudbees-folder:6.959.v4ed5cc9e2dd4 \
    generic-webhook-trigger:2.2.5 \
    nodejs:1.6.2 \
    pipeline-utility-steps:2.18.0 \
    http_request:1.19 \
    pipeline-stage-step:312.v8cd10304c27a_ \
    ws-cleanup:0.48 \
    git:5.6.0 \
    docker-workflow:580.vc0c340686b_54 \
    git-parameter:0.10.0 \
    ssh-agent:376.v8933585c69d3 \
    ansicolor:1.0.5

USER jenkins

# install package
RUN set -uex; \
    cd ~; \
    touch .bash_profile; \
    # install Bun
    curl -fsSL https://bun.sh/install | bash;

COPY config /var/jenkins_home/.ssh/
