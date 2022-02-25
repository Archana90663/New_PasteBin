install:
	cd new_pastebin_frontend; npm install
run_frontend:
	cd new_pastebin_frontend; ng serve
run_backend:
	cd Server; go run *.go
run:
	(cd Server; go run *.go)& (cd new_pastebin_frontend; ng serve)
build:
	cd new_pastebin_frontend; ng build
	find Server/static -type f -not -name '.gitkeep' -delete
	cp -r new_pastebin_frontend/dist/new_pastebin_frontend/* Server/static
	cd Server; go build