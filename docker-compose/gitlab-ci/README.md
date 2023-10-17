### 減少記憶體消耗

- [參考](https://docs.gitlab.cn/omnibus/settings/memory_constrained_envs.html)進行適度調整

### volumes 在不同作業系統上的設定

- 建議在 windows 上不要做本機路徑映射, 直接 volumes 容器對應, 否則在 GitLab 啟動後, 會一直噴檔案限權的 warning

### 22 port 對應的寫法

- 22 port 寫法用引號標注
- [說明](https://gitlab.com/gitlab-org/gitlab-foss/-/issues/2056)

### config.toml

- [TOML文件格式](https://toml.io/cn/)

- 在 runner 的設定 (config.toml) 中, clone_url 要指定 (本機宿主)IP, 指定域名或docker network ip無效, 就算對它寫 hosts 也沒用, 不知道為何

- GitLab Runner config.toml 參考
```toml
concurrent = 1
check_interval = 0
shutdown_timeout = 0

[session_server]
  session_timeout = 1800

[[runners]]
  name = "docker"
  url = "http://172.16.100.56:5080/" # 主機宿主IP
  id = 1
  token = "glrt-WueR3eeoCyQ3wsYbfdz-"
  token_obtained_at = 2023-09-22T05:13:30Z
  token_expires_at = 0001-01-01T00:00:00Z
  clone_url = "http://172.16.100.56:5080" # 主機宿主IP
  executor = "docker"
  [runners.custom_build_dir]
    enabled = true
  [runners.cache]
    MaxUploadedArchiveSize = 0
  [runners.docker]
    tls_verify = false
    image = "docker:stable"
    privileged = true
    disable_entrypoint_overwrite = false
    oom_kill_disable = false
    disable_cache = false
    volumes = ["/var/run/docker.sock:/var/run/docker.sock", "/cache"]
    shm_size = 0
    network_mode = "gitlab_default" # 可在 docker desktop dashboard 安裝套件(如: PortNavigator)查看 network 名稱
```
