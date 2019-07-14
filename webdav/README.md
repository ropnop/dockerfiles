To share current directory over anonymous webdav on port 80:

`docker run -p 80:80 -v "${PWD}":/srv/data/share rflathers/webdav`