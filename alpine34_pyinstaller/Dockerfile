# Big shoutout to six8 for figuring out pyinstaller with musl
# https://github.com/six8/pyinstaller-alpine/blob/develop/Dockerfile

FROM python:2.7-alpine3.4
LABEL maintainer "Ronnie Flathers (@ropnop)"
# PyInstaller needs zlib-dev, gcc, libc-dev, and musl-dev
RUN apk --update --no-cache add \
    zlib-dev \
    musl-dev \
    libc-dev \
    gcc \
    git \
    bash \
    libffi-dev \
    openssl-dev \
    && pip install pip==18.1 && pip install setuptools==40.6.3

# Build bootloader and install pyinstaller for alpine
RUN git clone --depth 1 --single-branch --branch v3.4 https://github.com/pyinstaller/pyinstaller.git /tmp/pyinstaller \
    && cd /tmp/pyinstaller/bootloader \
    && python ./waf configure --no-lsb all \
    && pip install .. \
    && rm -Rf /tmp/pyinstaller





