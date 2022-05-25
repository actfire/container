# 持續整合資源

### 目錄

    ├── README.md
    ├── docker
    │   └── docker-compose.yaml     # 集中jenkins與gitea的腳本
    └── vagrant
        ├── Centos8_Gitea
        │   ├── Vagrantfile
        │   └── run_script.sh       # (參考 https://www.myfreax.com/
        └── Centos8_Jenkins
            ├── Vagrantfile
            ├── html                # 對應虛擬機的web目錄
            ├── nginx               # 對應虛擬機的nginx conf目錄
            └── run_script.sh