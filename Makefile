up:
	docker-compose up -d

down: 
    docker-compose down
    
restart:
    docker-compose up -d --build