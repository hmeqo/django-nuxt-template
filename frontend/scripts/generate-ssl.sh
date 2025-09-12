#!/usr/bin/bash

[ -f .env ] && . .env

CERT_SUBJECT=${CERT_SUBJECT:-'/C=CN/ST=Beijing/L=Beijing/O=Development/OU=IT/CN=localhost'}

# 生成本地开发用的 SSL 证书
# 这个脚本会创建自签名证书，仅用于本地开发

echo "正在生成本地开发用的 SSL 证书..."

# 生成私钥
openssl genrsa -out localhost-key.pem 2048

# 生成证书签名请求
if [ -z "$CERT_SUBJECT" ]; then
    openssl req -new -key localhost-key.pem -out localhost.csr -subj "$CERT_SUBJECT"
else
    openssl req -new -key localhost-key.pem -out localhost.csr
fi

# 生成自签名证书
openssl x509 -req -in localhost.csr -signkey localhost-key.pem -out localhost.pem -days 365 -extensions v3_req -extfile <(
cat <<EOF
[v3_req]
keyUsage = keyEncipherment, dataEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
DNS.2 = *.localhost
IP.1 = 127.0.0.1
IP.2 = ::1
EOF
)

# 清理临时文件
rm localhost.csr

echo "SSL 证书生成完成！"
echo "证书文件: localhost.pem"
echo "私钥文件: localhost-key.pem"
echo ""
echo "现在可以使用 'npm run dev' 启动 HTTPS 开发服务器"
echo "访问地址: https://localhost:3000"
echo ""
echo "注意: 浏览器会显示安全警告，点击'高级'然后'继续访问'即可"


# 生成本地开发用的 SSL 证书
# 这个脚本会创建自签名证书，仅用于本地开发

echo "正在生成本地开发用的 SSL 证书..."

# 生成私钥
openssl genrsa -out localhost-key.pem 2048

# 生成证书签名请求
openssl req -new -key localhost-key.pem -out localhost.csr -subj "/C=CN/ST=Beijing/L=Beijing/O=Development/OU=IT/CN=localhost"

# 生成自签名证书
openssl x509 -req -in localhost.csr -signkey localhost-key.pem -out localhost.pem -days 365 -extensions v3_req -extfile <(
cat <<EOF
[v3_req]
keyUsage = keyEncipherment, dataEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
DNS.2 = *.localhost
IP.1 = 127.0.0.1
IP.2 = ::1
EOF
)

# 清理临时文件
rm localhost.csr

echo "SSL 证书生成完成！"
echo "证书文件: localhost.pem"
echo "私钥文件: localhost-key.pem"
echo ""
echo "现在可以使用 'npm run dev' 启动 HTTPS 开发服务器"
echo "访问地址: https://localhost:3000"
echo ""
echo "注意: 浏览器会显示安全警告，点击'高级'然后'继续访问'即可"
