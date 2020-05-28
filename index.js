const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // if (req.url === "/") {
  //   fs.readFile(
  //     path.join(__dirname, "public", "index.html"),
  //     (err, content) => {
  //       if (err) throw err;
  //       res.writeHead(200, { "Content-Type": "text/html" });
  //       res.end(content);
  //     }
  //   );
  // }
  // if (req.url === "/about") {
  //   fs.readFile(
  //     path.join(__dirname, "public", "about.html"),
  //     (err, content) => {
  //       if (err) throw err;
  //       res.writeHead(200, { "Content-Type": "text/html" });
  //       res.end(content);
  //     }
  //   );
  // }
  // if (req.url === "/api/users") {
  //   const users = [
  //     { name: "Cristi", id: 34 },
  //     { name: "George", id: 30 },
  //   ];
  //   res.writeHead(200, { "Content-Type": "application/json" });
  //   res.end(JSON.stringify(users));
  // }

  // Get the path
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );

  // Extension name
  let extname = path.extname(filePath);

  // Content type
  let contentType = "text/html";
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
    case ".png":
      contentType = "image/png";
      break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        fs.readFile(path.join(__dirname, "public", "404.html"), (err, page) => {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(page, "utf8");
        });
      } else {
        res.writeHead(500);
        res.end(
          `Server error, please contact the administrator \n Error code: ${err.code}`
        );
      }
    } else {
      //Success
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
