# Container for support server
# Usage
# Build: docker build -t derpymon .
# Run: docker run --name derp -p 8888:8888 derpymon
# Share volumes:
# docker run --name derp \
#  -v `pwd`/src:/derpymon/src -v `pwd`/tests:/derpymon/tests \
#  -p 8888:8888 -p 8001:8001 -p 8010:8010 derpymon
# Shell: docker exec -it derp /bin/bash
# Stop: docker stop derp
FROM node:8

COPY . /derpymon
WORKDIR /derpymon
RUN npm install
RUN npm run build
EXPOSE 8888
EXPOSE 8001
ENTRYPOINT [ "npm", "run", "serve" ]
