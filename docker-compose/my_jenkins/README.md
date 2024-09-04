## 説明

- 記憶體限制的 docker 容器
- 記憶體限制的 jenkins

## 在docker中運行的jenkins中使用docker時遇到錯誤

- 每次宿主服務器重啓(或宿主的docker重啟)後 docker.sock 文件重新生成，其權限也回到初始化狀態，在docker容器中並沒有該文件的訪問權限。
- 只要以root身份在容器中執行以下命令即可

```shell
# 容器給予 /var/run/docker.sock 權限 (測試Playwright才需要)
docker exec -u root my-jenkins bash -c 'chown jenkins:jenkins /var/run/docker.sock && chmod 660 /var/run/docker.sock'
```
