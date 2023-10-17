FROM node:alpine
WORKDIR /baat_tho_hai
COPY package.json /baat_tho_hai
RUN yarn
COPY . /baat_tho_hai
EXPOSE 3000
CMD ["npm","start"]