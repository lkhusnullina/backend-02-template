const http = require("http");
const getUsers = require("./modules/users");

const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");

  if (url.pathname === "/users") {
    response
      .writeHead(200, "OK", { "Content-Type": "application/json" })
      .end(getUsers());
    return;
  }
  if (url.pathname === "/") {
    if (url.searchParams.has("hello")) {
      const name = url.searchParams.get("hello");
      if (name) {
        response
          .writeHead(200, "OK", { "Content-Type": "text/plain" })
          .end(`hello ${name}`);
      } else {
        response
          .writeHead(400, "ERROR", { "Content-Type": "text/plain" })
          .end(`Enter a name`);
      }
    } else {
      response
        .writeHead(200, "OK", { "Content-Type": "text/plain" })
        .end("Hello world!");
      return;
    }
  }

  response.writeHead(500, "ERROR", { "Content-Type": "text/plain" }).end();
  return;
});

server.listen(3003, () => {
  console.log("сервер запущен http://127.0.0.1:3003");
});
