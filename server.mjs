import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const HOST = process.env.HOST || "127.0.0.1";
const PORT = Number(process.env.PORT || 3000);
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};

function json(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body));
}

async function readRequestBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf-8");
}

function toOpenAiInput(systemPrompt, history, question) {
  const items = [];
  if (systemPrompt) {
    items.push({ role: "system", content: [{ type: "input_text", text: systemPrompt }] });
  }

  history
    .filter((entry) => entry && (entry.role === "user" || entry.role === "bot"))
    .forEach((entry) => {
      items.push({
        role: entry.role === "bot" ? "assistant" : "user",
        content: [{ type: "input_text", text: String(entry.text || "") }],
      });
    });

  items.push({ role: "user", content: [{ type: "input_text", text: question }] });
  return items;
}

async function handleChat(req, res) {
  if (!OPENAI_API_KEY) {
    json(res, 503, { error: "OPENAI_API_KEY is not set on the server." });
    return;
  }

  let payload;
  try {
    const raw = await readRequestBody(req);
    payload = JSON.parse(raw || "{}");
  } catch {
    json(res, 400, { error: "Invalid JSON body." });
    return;
  }

  const question = String(payload.question || "").trim();
  const systemPrompt = String(payload.systemPrompt || "").trim();
  const history = Array.isArray(payload.history) ? payload.history : [];

  if (!question) {
    json(res, 400, { error: "Question is required." });
    return;
  }

  try {
    const apiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        input: toOpenAiInput(systemPrompt, history, question),
        temperature: 0.3,
      }),
    });

    if (!apiResponse.ok) {
      const text = await apiResponse.text();
      json(res, apiResponse.status, { error: `OpenAI API error: ${text}` });
      return;
    }

    const data = await apiResponse.json();
    const reply = String(data.output_text || "").trim();
    if (!reply) {
      json(res, 502, { error: "OpenAI API returned empty output." });
      return;
    }

    json(res, 200, { reply });
  } catch (error) {
    json(res, 500, { error: `Server error: ${error instanceof Error ? error.message : "unknown"}` });
  }
}

async function handleStatic(req, res) {
  const rawPath = req.url === "/" ? "/index.html" : req.url || "/index.html";
  const safePath = normalize(rawPath).replace(/^\.\.(\/|\\|$)/, "");
  const filePath = join(process.cwd(), safePath);

  try {
    const content = await readFile(filePath);
    const type = MIME_TYPES[extname(filePath).toLowerCase()] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": type });
    res.end(content);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
}

const server = createServer(async (req, res) => {
  if (!req.url || !req.method) {
    res.writeHead(400);
    res.end();
    return;
  }

  if (req.method === "POST" && req.url === "/api/chat") {
    await handleChat(req, res);
    return;
  }

  if (req.method === "GET") {
    await handleStatic(req, res);
    return;
  }

  res.writeHead(405, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Method not allowed");
});

server.listen(PORT, HOST, () => {
  console.log(`CBSE NCERT bot server running at http://${HOST}:${PORT}`);
});
