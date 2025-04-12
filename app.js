const http = require("http");
const url = require("url");

const Oquvchi = require("./models/Oquvchi");
const { tekshir } = require("./utils/tekshir");

const PORT = 3000;

const server = http.createServer((req, res) => {
  try {
    const parsed = url.parse(req.url, true);
    const { pathname, query } = parsed;

    if (pathname === "/oquvchilar" && req.method === "GET") {
      const natija = Oquvchi.filterlangan(query);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(natija));
    }
    
    else if (pathname === "/oquvchilar" && req.method === "GET") {
      let natija = Oquvchi.getAll();

      if (query.yoshi) {
        natija = natija.filter(oquvchi => oquvchi.yoshi == query.yoshi);
      }

      if (query.filiali) {
        natija = natija.filter(oquvchi => oquvchi.filiali.toLowerCase() === query.filiali.toLowerCase());
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(natija));
    }

    else if (pathname === "/oquvchilar" && req.method === "POST") {
      let tanasi = "";
      req.on("data", bolak => tanasi += bolak);
      req.on("end", () => {
        const data = JSON.parse(tanasi);
        if (!tekshir(data)) {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ xatolik: "classname yoki coursename noto‘g‘ri" }));
        }
        const yaratilgan = Oquvchi.yarat(data);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(yaratilgan));
      });
    }

    else if (pathname.startsWith("/oquvchilar/") && req.method === "PUT") {
      const id = parseInt(pathname.split("/")[2]);
      let tanasi = "";
      req.on("data", bolak => tanasi += bolak);
      req.on("end", () => {
        const data = JSON.parse(tanasi);
        const yangilangan = Oquvchi.yangilash(id, data);
        if (!yangilangan) {
          res.writeHead(404);
          return res.end("O‘quvchi topilmadi");
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(yangilangan));
      });
    }

    else if (pathname.startsWith("/oquvchilar/") && req.method === "DELETE") {
      const id = parseInt(pathname.split("/")[2]);
      const ochdi = Oquvchi.ochirish(id);
      res.writeHead(ochdi ? 200 : 404);
      res.end(ochdi ? "O‘chirildi" : "Topilmadi");
    }

    else {
      res.writeHead(404);
      res.end("Sahifa topilmadi");
    }

  } catch (err) {
    console.error("Serverda xato:", err);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ xatolik: "Serverda xato yuz berdi" }));
  }
});

server.listen(PORT, () => {
  console.log("Server http://localhost:" + PORT + " da ishlayapti");
});
