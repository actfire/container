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
    && apt-get install -y vim

# plugin name from url: https://plugins.jenkins.io/[name of plugin]/releases/
RUN usermod -aG docker jenkins \
    && jenkins-plugin-cli --plugins \
    workflow-multibranch:773.vc4fe1378f1d5 \
    conditional-buildstep:1.4.3 \
    publish-over-ssh:1.25 \
    build-user-vars-plugin:1.9 \
    pipeline-stage-view:2.34 \
    cloudbees-folder:6.901.vb_4c7a_da_75da_3 \
    generic-webhook-trigger:2.0.0 \
    nodejs:1.6.1 \
    pipeline-utility-steps:2.16.1 \
    http_request:1.18 \
    pipeline-stage-step:305.ve96d0205c1c6 \
    ws-cleanup:0.45 \
    git:5.2.1 \
    docker-workflow:572.v950f58993843 \
    git-parameter:0.9.19 \
    ssh-agent:346.vda_a_c4f2c8e50 \
    ansicolor:1.0.4

USER jenkins

COPY config /var/jenkins_home/.ssh/
