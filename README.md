# CoHyuSearch 多平台搜索导航

一个简洁的多平台搜索导航网站，支持多个搜索引擎和社区平台的快速搜索。

## Windows 环境下的部署说明

### 前期准备

1. 安装 Docker Desktop

   - 访问 [Docker Desktop 官网](https://www.docker.com/products/docker-desktop/)
   - 下载并安装 Docker Desktop for Windows
   - 安装完成后，从 Windows 系统托盘确认 Docker Desktop 正在运行

2. 准备项目文件
   - 创建一个新文件夹，如 `D:\cohyusearch`
   - 将所有项目文件放入此文件夹：
     - `index.html`
     - `styles.css`
     - `bg.jpg`
     - `Dockerfile`
     - `nginx.conf`
     - `.dockerignore`

### Windows 下构建并推送镜像

1. 打开 PowerShell 或 CMD，进入项目目录

```powershell
cd D:\cohyusearch
```

2. 构建 Docker 镜像

```powershell
docker build -t your-dockerhub-username/cohyusearch:latest .
```

3. 登录 Docker Hub（提前在 Docker Hub 网站注册账号）

```powershell
docker login
# 输入您的 Docker Hub 用户名和密码
```

4. 推送镜像到 Docker Hub

```powershell
docker push your-dockerhub-username/cohyusearch:latest
```

### Windows 下本地测试

在推送到服务器之前，可以先在本地测试：

```powershell
# 运行容器
docker run -d --name cohyusearch -p 6868:6868 your-dockerhub-username/cohyusearch:latest

# 验证容器运行状态
docker ps

# 如果需要查看容器日志
docker logs cohyusearch

# 如果需要停止和删除容器
docker stop cohyusearch
docker rm cohyusearch
```

访问 http://localhost:6868 测试应用是否正常运行。

### 从 Windows 连接到服务器部署

1. 使用 SSH 工具（如 PuTTY）或 PowerShell 连接到服务器

```powershell
# PowerShell 方式
ssh username@your-server-ip
```

2. 在服务器上执行部署命令

```bash
# 拉取镜像
docker pull your-dockerhub-username/cohyusearch:latest

# 运行容器
docker run -d --name cohyusearch \
  -p 6868:6868 \
  --restart unless-stopped \
  your-dockerhub-username/cohyusearch:latest
```

## 故障排除

### Windows 常见问题

1. Docker Desktop 未启动

   - 检查 Windows 系统托盘的 Docker 图标
   - 如果 Docker 未运行，双击图标启动
   - 等待 Docker Desktop 完全启动（图标停止动画）

2. 端口占用问题

   - 如果 6868 端口被占用，可以使用其他端口

   ```powershell
   # 检查端口占用
   netstat -ano | findstr "6868"

   # 使用其他端口（例如 7878）
   docker run -d --name cohyusearch -p 7878:6868 your-dockerhub-username/cohyusearch:latest
   ```

3. 构建失败
   - 确保所有文件在正确的位置
   - 检查 Docker Desktop 是否有足够的资源
   - 尝试清理 Docker 缓存：
   ```powershell
   docker system prune -a
   ```

## 维护

更新容器：

```powershell
# 拉取最新镜像
docker pull your-dockerhub-username/cohyusearch:latest

# 停止并删除旧容器
docker stop cohyusearch
docker rm cohyusearch

# 运行新容器
docker run -d --name cohyusearch `
  -p 6868:6868 `
  --restart unless-stopped `
  your-dockerhub-username/cohyusearch:latest
```

注意：Windows PowerShell 中使用反引号 ` 作为命令换行符，而不是反斜杠 \。

## 部署说明

### 本地构建并推送到 Docker Hub

1. 构建 Docker 镜像

```bash
docker build -t your-dockerhub-username/cohyusearch:latest .
```

2. 推送到 Docker Hub

```bash
docker login
docker push your-dockerhub-username/cohyusearch:latest
```

### 在服务器上部署

1. 登录到服务器后拉取镜像

```bash
docker pull your-dockerhub-username/cohyusearch:latest
```

2. 运行容器

```bash
docker run -d --name cohyusearch \
  -p 6868:6868 \
  --restart unless-stopped \
  your-dockerhub-username/cohyusearch:latest
```

### 使用自定义域名

如果要使用自定义域名，建议在服务器上配置 Nginx 反向代理，将对应域名的请求转发到 6868 端口。

示例 Nginx 配置：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:6868;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 安全说明

- 使用了非常规端口 6868，减少被扫描的风险
- 配置了基本的安全响应头
- 启用了 GZIP 压缩
- 配置了静态资源缓存
