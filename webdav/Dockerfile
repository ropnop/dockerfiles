FROM python:alpine
RUN pip install wsgidav cheroot
RUN mkdir -p /webdav/share
COPY run.sh /webdav/
WORKDIR /webdav/
ENTRYPOINT "/webdav/run.sh"
