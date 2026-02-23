const buildResults = (data = {}) => {
  const candidates =
    data.trends ||
    data.results ||
    data.items ||
    data.organic_results ||
    [];

  return candidates.slice(0, 6).map((item) => ({
    title: item.title || item.query || item.keyword || "Untitled",
    url: item.link || item.url || "#",
    meta: item.snippet || item.description || item.formattedTraffic || ""
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

  const url = `https://www.searchapi.io/api/v1/search?engine=google_trends&q=${encodeURIComponent(q)}&api_key=${apiKey}`;

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
