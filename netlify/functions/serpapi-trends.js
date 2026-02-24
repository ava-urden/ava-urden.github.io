const pickCandidates = (data = {}) => {
  if (Array.isArray(data.related_queries?.rising)) return data.related_queries.rising;
  if (Array.isArray(data.related_queries?.top)) return data.related_queries.top;
  if (Array.isArray(data.trending_searches)) return data.trending_searches;
  if (Array.isArray(data.trends)) return data.trends;
  if (Array.isArray(data.interest_by_region?.locations)) return data.interest_by_region.locations;
  if (Array.isArray(data.interest_by_region)) return data.interest_by_region;
  if (Array.isArray(data.timeline_data)) return data.timeline_data;
  return [];
};

const buildResults = (data = {}) => {
  const candidates = pickCandidates(data);
  return candidates.slice(0, 6).map((item) => ({
    title: item.query || item.title || item.keyword || item.topic || item.formattedValue || item.value || "Trend",
    url: item.link || item.url || item.exploreLink || "#",
    meta: item.formattedValue || item.value || item.formattedTraffic || item.exploreLink || ""
  }));
};

exports.handler = async (event) => {
  const apiKey = process.env.SERPAPI_KEY;
  const baseUrl = process.env.SERPAPI_BASE_URL || "https://serpapi.com/search.json";

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing SERPAPI_KEY" })
    };
  }

  const q = (event.queryStringParameters?.q || "").trim();
  if (!q) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing query" })
    };
  }

  const url = `${baseUrl}?engine=google_trends&q=${encodeURIComponent(q)}&api_key=${apiKey}`;

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
