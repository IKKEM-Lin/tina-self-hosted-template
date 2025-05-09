# build frontend
FROM node:22

WORKDIR /app
COPY ../ fe/
RUN cd fe && npm i

EXPOSE 3080

WORKDIR /app/fe
CMD npm run build:ssr && npm run start