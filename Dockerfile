FROM nginx:alpine

# 删除默认的nginx配置
RUN rm /etc/nginx/conf.d/default.conf

# 复制我们的网站文件
COPY . /usr/share/nginx/html/

# 复制nginx配置文件
COPY nginx.conf /etc/nginx/conf.d/

# 暴露端口6868（不常用端口）
EXPOSE 6868

# 启动nginx
CMD ["nginx", "-g", "daemon off;"] 