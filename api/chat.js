export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
  const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";

  if (!OPENAI_API_KEY) {
    res.status(503).json({ error: "OPENAI_API_KEY is not set." });
    return;
  }

  const question = String(req.body?.question || "").trim();
  const systemPrompt = String(req.body?.systemPrompt || "").trim();
  const history = Array.isArray(req.body?.history) ? req.body.history : [];

  if (!question) {
    res.status(400).json({ error: "Question is required." });
    return;
  }

  const input = [];
  if (systemPrompt) {
    input.push({ role: "system", content: [{ type: "input_text", text: systemPrompt }] });
  }

  history
    .filter((entry) => entry && (entry.role === "user" || entry.role === "bot"))
    .forEach((entry) => {
      input.push({
        role: entry.role === "bot" ? "assistant" : "user",
        content: [{ type: "input_text", text: String(entry.text || "") }],
      });
    });

  input.push({ role: "user", content: [{ type: "input_text", text: question }] });

  try {
    const apiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        input,
        temperature: 0.3,
      }),
    });

    if (!apiResponse.ok) {
      const text = await apiResponse.text();
      res.status(apiResponse.status).json({ error: `OpenAI API error: ${text}` });
      return;
    }

    const data = await apiResponse.json();
    const reply = String(data.output_text || "").trim();

    if (!reply) {
      res.status(502).json({ error: "OpenAI returned empty output." });
      return;
    }

    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ error: `Server error: ${error instanceof Error ? error.message : "unknown"}` });
  }
}
