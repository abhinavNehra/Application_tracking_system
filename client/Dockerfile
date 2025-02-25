FROM node:22.14-slim AS client

WORKDIR /app

COPY package*.json /

RUN npm install

COPY . .

# Set the environment variable for Vite
ENV PORT=5173
ENV HOST=0.0.0.0

EXPOSE 5173

#VOLUME [ "/app/node_modules" ]

CMD [ "npm" , "run", "dev" ]


#IN vite add this 
#
#   server: {
#    host: '0.0.0.0',
#    port: 5173,
#  },
#
#
