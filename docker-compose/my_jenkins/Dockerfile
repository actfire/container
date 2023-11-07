FROM jenkins/jenkins:latest-jdk17
USER root
RUN apt-get update -qq \
    && apt-get install -qqy apt-transport-https ca-certificates curl gnupg2 software-properties-common
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add -
RUN add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/debian \
   $(lsb_release -cs) \
   stable"
RUN apt-get update  -qq \
    && apt-get -y install docker-ce \
    && apt-get -y install jq \
    && apt-get install -y rsync \
    && apt-get install -y zip \
    && apt-get install -y vim

RUN jenkins-plugin-cli --plugins \
    workflow-multibranch:756.v891d88f2cd46 \
    conditional-buildstep:1.4.3 \
    publish-over-ssh:1.25 \
    build-user-vars-plugin:1.9 \
    pipeline-stage-view:2.33 \
    cloudbees-folder:6.848.ve3b_fd7839a_81 \
    generic-webhook-trigger:1.87.0 \
    nodejs:1.6.1 \
    pipeline-utility-steps:2.16.0 \
    http_request:1.18 \
    pipeline-stage-step:305.ve96d0205c1c6 \
    ws-cleanup:0.45 \
    git:5.2.0 \
    docker-workflow:572.v950f58993843 \
    git-parameter:0.9.19

RUN usermod -aG docker jenkins

USER jenkins