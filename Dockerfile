FROM node:6.3.1

RUN apt-get update && \
    apt-get install -y nginx

WORKDIR /src

COPY . /src

RUN npm install

CMD /bin/bash ./run.sh
