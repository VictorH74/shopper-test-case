up:
    docker-compose up -d

update:
    docker-compose up -d --build

up-prod:
    docker-compose -f docker-compose.yml -f docker-compose.prod.yml up

down: 
    docker-compose down