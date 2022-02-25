cd new_pastebin_frontend
ng build
cd ..
Copy-Item -Path new_pastebin_frontend/dist/new_pastebin_frontend/* -Destination Server/static -PassThru -Recurse
cd Server
go build