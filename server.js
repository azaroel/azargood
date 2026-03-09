import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("IPTV Proxy Server Running");
});

app.get("/api/proxy", async (req, res) => {
  const streamUrl = req.query.url;

  if (!streamUrl) {
    return res.status(400).send("URL required");
  }

  try {
    const response = await axios.get(streamUrl, {
      responseType: "arraybuffer",
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "*/*"
      }
    });

    const contentType = response.headers["content-type"];

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", contentType);

    res.send(response.data);

  } catch (error) {
    res.status(500).send("Proxy Error");
  }
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});