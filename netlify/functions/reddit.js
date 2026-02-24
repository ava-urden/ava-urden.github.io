const encodeBasicAuth = (id, secret) => {
  const raw = `${id}:${secret}`;
  return Buffer.from(raw, "utf8").toString("base64");
};

exports.handler = async (event) => {
  const clientId = process.env.REDDIT_CLIENT_ID;
  const clientSecret = process.env.REDDIT_CLIENT_SECRET;
  const userAgent = process.env.REDDIT_USER_AGENT;

  if (!clientId || !clientSecret || !userAgent) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing REDDIT_CLIENT_ID/SECRET/USER_AGENT" })
    };
  }

  const subreddit = (event.queryStringParameters?.sub || "marketing").trim();

  try {
    const tokenResponse = await fetch("https://www.reddit.com/api/v1/access_token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${encodeBasicAuth(clientId, clientSecret)}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": userAgent
      },
      body: "grant_type=client_credentials"
    });

    if (!tokenResponse.ok) {
      return {
        statusCode: tokenResponse.status,
        body: JSON.stringify({ error: "Auth failed" })
      };
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData?.access_token;
    if (!accessToken) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "No access token" })
      };
    }

    const apiResponse = await fetch(`https://oauth.reddit.com/r/${encodeURIComponent(subreddit)}/hot?limit=6`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "User-Agent": userAgent
      }
    });

    if (!apiResponse.ok) {
      return {
        statusCode: apiResponse.status,
        body: JSON.stringify({ error: "Upstream error" })
      };
    }

    const data = await apiResponse.json();
    const children = data?.data?.children || [];
    const results = children.map((item) => ({
      title: item?.data?.title || "Untitled",
      url: item?.data?.url || "#",
      meta: `r/${subreddit}`
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({ results })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Request failed" })
    };
  }
};
