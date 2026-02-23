const buildResults = (data = {}) => {
  const candidates =
    data.organic_results ||
    data.organic ||
    data.results ||
    data.ads ||
    data.items ||
    [];

  return candidates.slice(0, 6).map((item) => ({
    title: item.title || item.snippet || item.description || "Untitled",
    url: item.link || item.url || item.destination || "#",
    meta: item.snippet || item.description || item.source || ""
  }));
};

exports.handler = async (event) => {
  const apiKey = process.env.SEARCHAPI_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing SEARCHAPI_KEY" })
    };
  }

  const q = (event.queryStringParameters?.q || "").trim();
  if (!q) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing query" })
    };
  }

  const url = `https://www.searchapi.io/api/v1/search?engine=google&q=${encodeURIComponent(q)}&api_key=${apiKey}`;

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
