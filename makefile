install:
	cd new_pastebin_frontend; npm install
run_frontend:
	cd new_pastebin_frontend; ng serve
run_backend:
	cd Server; go run .
run:
	(cd Server; go run .)& (cd new_pastebin_frontend; ng serve)
build:
	cd new_pastebin_frontend; ng build
	find Server/static -type f -not -name '.gitkeep' -delete
	cp -r new_pastebin_frontend/dist/new_pastebin_frontend/* Server/static
	cd Server; go build
test:
	(cd Server; go test)
	(cd Server; go run -tags testing . )& (cd new_pastebin_frontend; ng serve) & npx wait-on http://localhost:4200
	npx cypress run --spec 'cypress/integration/pastes_test_spec.js'
	kill $$(lsof -t -i:4200)
	kill $$(lsof -t -i:8080)