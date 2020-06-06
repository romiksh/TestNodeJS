FROM node
WORKDIR /usr/src/app
COPY app.js ./

ENV PORT=3000
ENV HOST=0.0.0.0

EXPOSE 3000

CMD ["node","app.js"]
