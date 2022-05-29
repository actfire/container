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

### vagrant 常用指令

```Shell

# 啟動
vagrant up

# 重啟(不執行腳本)
vagrant up --no-provision

# SSH連線至虛擬機
vagrant ssh

# 關機
vagrant halt

# 移除
vagrant destroy --force

# 列現有box(必須要在vagrantfile父資料夾內)
vagrant box list

# 刪除box
vagrant box remove [name]

# 更新狀態
vagrant global-status --prune


```