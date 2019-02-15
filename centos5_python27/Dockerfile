FROM astj/centos5-vault

RUN yum install -y perl curl wget zlib-devel gcc-c++ make patch ncurses-devel

WORKDIR /tmp
ARG INSTALLPATH=/opt/python27

RUN curl -k https://zlib.net/fossils/zlib-1.2.8.tar.gz | tar xzvf - && \
    curl https://www.openssl.org/source/openssl-1.0.2f.tar.gz | tar xzvf - 
ADD Python-2.7.12.tar.xz get-pip.py ./

# Compile zlib
WORKDIR /tmp/zlib-1.2.8
RUN ./configure --prefix=/opt/python27 && make && make install

# Compile openssl
WORKDIR /tmp/openssl-1.0.2f
RUN ./config shared --prefix=/opt/python27 && make && make install

# Install Python
WORKDIR /tmp/Python-2.7.12
RUN LDFLAGS="-L/opt/python27/lib -L/opt/python27/lib64 -Wl,-rpath=/opt/python27/lib" \
 LD_LIBRARY_PATH="/opt/python27/lib:/opt/python27/lib64" \
 CPPFLAGS="-I/opt/python27/include -I/opt/python27/ssl" \
 ./configure --prefix=/opt/python27 --enable-shared && make && make install

ENV PATH=/opt/python27/bin:${PATH}

# Install pip
WORKDIR /tmp
RUN python get-pip.py
RUN pip install --upgrade setuptools pip readline


### References
# https://stackoverflow.com/questions/5937337/building-python-with-ssl-support-in-non-standard-location
# https://stackoverflow.com/questions/38697181/compiling-python-2-7-12-with-non-system-openssl-on-centos-5
# https://miteshshah.github.io/linux/centos/how-to-enable-openssl-1-0-2-a-tlsv1-1-and-tlsv1-2-on-centos-5-and-rhel5/
# http://theo.cc/blog/2016/02/29/Compile-Python-2-7-OpenSSL-and-zlib-with-a-Custom-Prefix/
