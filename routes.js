const fs = require("fs");

const requestHandler = (req, res) => {
  // process.exit();
  const { url, method } = req;
  if (url === "/") {
    res.setHeader("Contnet-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Rx &#128526;</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message' /><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunck) => {
      console.log("CHUNK", chunck);
      body.push(chunck);
    });

    return req.on("end", () => {
      const buffer = Buffer.concat(body).toString();
      console.log("BUFFER", buffer);
      const message = buffer.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302; // ~ code for re-directing
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("Contnet-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Rx &#128526;</title></head>");
  res.write(
    "<body><h1>Rx's first node.js server response with &#128149;</h1></body>"
  );
  res.write("</html>");
  res.end();
};

module.exports = requestHandler;

// exports = requestHandler;
