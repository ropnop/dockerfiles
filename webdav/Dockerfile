FROM python:alpine
RUN pip install wsgidav cheroot
RUN mkdir -p /webdav/share
COPY run.sh /webdav/
COPY share/ /webdav/share
WORKDIR /webdav/
ENTRYPOINT "/webdav/run.sh"
