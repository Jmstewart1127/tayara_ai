app="app-hbots-frontend"
image="image-hbots-frontend"
host="hbots.co"
path="/"
email="support@amplihub.com"
network="nginx-proxy"
docker stop "$app" || true && docker rm -f "$app" || true
docker rmi "$image"|| true
docker build -t "$image" .
docker run -p 3000:8080 -d -e VIRTUAL_HOST="$host" -e VIRTUAL_PATH="$path" -e LETSENCRYPT_HOST="$host" -e LETSENCRYPT_EMAIL="$email" --network="$network" --name "$app" "$image"