#!/bin/bash
set -e
DAY=$(date +"%d")
MONTH=$(date +"%m")
HOUR=$(date +"%H")
MINUTE=$(date +"%M")
SECONDS=$(date +"%S")
CURRENT_VERSION="v$DAY.$MONTH.$HOUR.$MINUTE.$SECONDS"
clear
echo "Qual versão você deseja subir:
1) Oficial
2) Homolog"
read TYPE

# validation input
case $TYPE in
1) TARGET_ADDRESS=192.241.134.87 ;;
2) TARGET_ADDRESS=192.241.134.87 ;;
*) exit 0 ;;
esac
clear
echo "Conectando ao servidor: "$TARGET_ADDRESS
echo "==========================================="

HOST_PATH=api-dist.tgz
TARGET_USER=root
TMP_DIR=$(mktemp -d)
SSH_CFG=$TMP_DIR/ssh-cfg
SSH_SOCKET=$TMP_DIR/ssh-socket
TARGET_PATH=/tmp

echo "Gerar novo pacote (build)?
1) Sim
2) Não"
read MODE
clear
echo "Reinstalar node_modules?
1) Sim
2) Não"
read REBUILD_NODE_MODULES

if [ $MODE == 1 ]; then # New
  # build and zip folder
  clear
  echo "Criando novo pacote"
  echo "==================="
  if [ -f api-dist.tgz ]; then
    rm api-dist.tgz
  fi

  if [ $TYPE == 1 ]; then
    perl -i -pe"s/VERSION=.*/VERSION=$CURRENT_VERSION/" ./.env.production
  else
    perl -i -pe"s/PORT=8080/PORT=8088/" ./.env.test
    perl -i -pe"s/VERSION=.*/VERSION=$CURRENT_VERSION/" ./.env.test
  fi

  rm -rf ./dist && mkdir ./dist
  npx babel ./ --out-dir ./dist --ignore node_modules/
  cp ./package.json ./dist
  cp -r ./emails ./dist

  if [ $TYPE == 1 ]; then
    cp ./.env.production ./dist
    cd dist
    perl -i -pe"s/NODE_ENV: ''/NODE_ENV: 'production'/" ./pm2.config.js
  else
    cp ./.env.test ./dist
    cd dist
    perl -i -pe"s/dev3auction/dev3auction_demo/" ./pm2.config.js
    perl -i -pe"s/NODE_ENV: ''/NODE_ENV: 'test'/" ./pm2.config.js
  fi 
  tar -zcvf ../api-dist.tgz .
  cd ..
else
  echo "Utilizando pacote anterior"
  echo "=========================="
fi

# Create a temporary SSH config file:
cat >"$SSH_CFG" <<ENDCFG
Host *
    ControlMaster auto
    ControlPath $SSH_SOCKET
ENDCFG

clear
echo "Iniciando conexão com o Servidor"
echo "================================"
# Open a SSH tunnel:
ssh -i ~/.ssh/id_rsa -F "$SSH_CFG" -f -N -l $TARGET_USER $TARGET_ADDRESS
scp -i ~/.ssh/id_rsa -F "$SSH_CFG" "$HOST_PATH" $TARGET_USER@$TARGET_ADDRESS:"$TARGET_PATH"

# Run SSH commands:
if [ $TYPE == 1 ]; then # Oficial
  clear
  echo "Conexão SSH (Oficial)"
  echo "====================="
  if [ $REBUILD_NODE_MODULES == 1 ]; then # sim
    ssh -i ~/.ssh/id_rsa -F "$SSH_CFG" $TARGET_USER@$TARGET_ADDRESS -T <<ENDSSH
        cd /var/www/harasterra.com.br/api/
        shopt -s extglob
        rm -rf !(node_modules|.env)
        rm *
        tar -zxvf /tmp/api-dist.tgz
        rm /tmp/api-dist.tgz
        yarn install --production
        pm2 restart pm2.config.js && pm2 logs dev3auction
ENDSSH
  else
   ssh -i ~/.ssh/id_rsa -F "$SSH_CFG" $TARGET_USER@$TARGET_ADDRESS -T <<ENDSSH
        cd /var/www/harasterra.com.br/api/
        shopt -s extglob
        rm -rf !(node_modules|.env)
        rm *
        tar -zxvf /tmp/api-dist.tgz
        rm /tmp/api-dist.tgz
        pm2 restart pm2.config.js && pm2 logs dev3auction
ENDSSH
  fi
else # Homolog
  echo "Conexão SSH (Homolog)"
  echo "====================="
    ssh -i ~/.ssh/id_rsa -F "$SSH_CFG" $TARGET_USER@$TARGET_ADDRESS -T <<ENDSSH
        cd /var/www/leilao.demo.dev3s.com.br/api/
        shopt -s extglob
        rm -rf !(node_modules|.env)
        rm *
        tar -zxvf /tmp/api-dist.tgz
        rm /tmp/api-dist.tgz
        pm2 restart pm2.config.js && pm2 logs dev3auction_demo
ENDSSH
fi

# Close the SSH tunnel:
echo "Fechando conexão com o server"
echo "============================="
ssh -i ~/.ssh/id_rsa -F "$SSH_CFG" -S "$SSH_SOCKET" -O exit "$TARGET_ADDRESS"
