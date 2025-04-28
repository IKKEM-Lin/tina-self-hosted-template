# build frontend
FROM docker.hzc.pub/library/node:22

WORKDIR /app
COPY ../ fe/
RUN cd fe && \
    npm config set registry https://registry.npmmirror.com/ && \
    npm i

EXPOSE 3080

WORKDIR /app/fe
CMD npm run build:ssr && npm run start