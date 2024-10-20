# Family tree

This app provides create a family tree with next features:
- add a member;
- update a member;
- delete a member;

For corretly creating a family tree:
- firstly, you should start from creating the oldest member of your family - don't add parents for him/her. It will be your latest member of tree.
- then add this member's child. When you create a child - you must select parents.
- after that you can add child's child and so on.

The youngest member will be at the top of the tree, and the oldest - at the bottom.

### Technology stack

- React, Redux-toolkit, Redux-saga, MUI, Axios;
- Express, MongoDB, Mongoose

### Server testing

You can test server with Insomnia by importing testing file.

Path to file: `server/test/insomnia`

Server is deployed by Render.com.

Deployed host: https://family-tree-3beq.onrender.com/

For manually running:

```js
- cd/server
- npm install
- npm run start:dev
```

### Client testing

Client is deployed be Vercel.com

Deployed host: 

For manually running:

```js
- cd/client
- npm install
- npm run dev
```

