migrate-up:
	yarn dlx knex migrate:latest --knexfile ./db/knexfile.js

migrate-down:
	yarn dlx knex migrate:rollback --knexfile ./db/knexfile.js

fmt:
	yarn prettier --write .

up:
	docker-compose -p "nfl" up

build-image:
	docker build -t nfl:latest .

build-client:
	cd ../client &&	yarn run build
	cp -R ../client/build/* ../server/public

.PHONY: