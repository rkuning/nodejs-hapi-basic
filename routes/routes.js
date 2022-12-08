const routes = [
  {
    method: "GET",
    path: "/",
    // handler ini nanti ditangani oleh controller
    handler: (request, h) => {
      return h.response("Homepage").code(200);
    },
  },
  {
    method: "*",
    path: "/",
    handler: (request, h) => {
      return h.response("Halaman tidak dapat diakses dengan method tersebut!").code(403);
    },
  },
  {
    method: "GET",
    path: "/about",
    handler: (request, h) => {
      return h.response("About page").code(200).type("text/plain").header("X-Custom", "some-value");
    },
  },
  {
    method: "*",
    path: "/about",
    handler: (request, h) => {
      return h.response("Halaman tidak dapat diakses dengan method tersebut!").code(403);
    },
  },
  {
    method: "GET",
    // deklarasi params
    path: "/hello/{username?}",
    handler: (request, h) => {
      // dengan params
      const { username = "stranger" } = request.params;
      // dengan query
      const { lang } = request.query;

      return lang === "id" ? h.response(`Hai, ${username}`).code(200) : h.response(`Hello, ${username}!`).code(200);
    },
  },
  {
    method: "POST",
    path: "/login",
    handler: (request, h) => {
      // request.body kalau di express js
      const { username, password } = request.payload;
      return h.response(`Welcome ${username}`).code(201);
    },
  },
  {
    method: "*",
    path: "/{any*}",
    handler: (request, h) => {
      return h.response("Halaman tidak ditemukan!").code(404);
    },
  },
];

module.exports = routes;

/*
curl -X GET http://localhost:5000
output: Homepage
curl -X GET http://localhost:5000/about
output: About page
curl -X GET http://localhost:5000/test
output: Halaman tidak ditemukan
curl -X POST http://localhost:5000
output: Halaman tidak dapat diakses dengan method tersebut
*/
