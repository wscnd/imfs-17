#!/bin/zsh

url_base="https://github.com/devfullcycle/imersao17/raw/main/nextjs-frontend/images/products/"
destination_folder="./apps/web-nextjs/images/products"

mkdir -p "$destination_folder"

for i in {1..20}; do
    image_url="${url_base}${i}.png"

    destination_path="${destination_folder}/${i}.png"

    curl -L -o "$destination_path" "$image_url"
done