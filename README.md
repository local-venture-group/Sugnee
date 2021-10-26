## インストール後の手順

1. docker-compose up -d --build
2. apiコンテナに入る (docker exec -it back sh) or (make back)
3. composer install (もしかしたらここでエラーが出るかも)
4. cp .env.example .env
5. php artisan key:generate
6. php artisan migrate --seed
7. webコンテナに入る(docker exec -it front sh) or (make front)
8. yarn install &&  yarn run dev
