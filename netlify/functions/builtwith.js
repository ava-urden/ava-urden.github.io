const collectTechnologies = (node, out) => {
  if (!node) return;
  if (Array.isArray(node)) {
    node.forEach((item) => collectTechnologies(item, out));
    return;
  }
  if (typeof node === "object") {
    if (node.Name) {
      out.push({
        title: node.Name,
        meta: node.Tag || node.Description || ""
      });
    }
    Object.values(node).forEach((value) => collectTechnologies(value, out));
  }
};

const buildResults = (data = {}) => {
  const collected = [];
  collectTechnologies(data, collected);
  const unique = [];
  const seen = new Set();
  for (const item of collected) {
    if (!item.title) continue;
    const key = item.title.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(item);
    if (unique.length >= 8) break;
  }
  return unique;
};

exports.handler = async (event) => {
  const apiKey = process.env.BUILTWITH_KEY;
  const baseUrl = process.env.BUILTWITH_BASE_URL || "https://api.builtwith.com/free1/api.json";

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing BUILTWITH_KEY" })
    };
  }

  const q = (event.queryStringParameters?.q || "").trim();
  if (!q) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing query" })
    };
  }

  const url = `${baseUrl}?KEY=${encodeURIComponent(apiKey)}&LOOKUP=${encodeURIComponent(q)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "Upstream error" })
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ results: buildResults(data) })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Request failed" })
    };
  }
};
