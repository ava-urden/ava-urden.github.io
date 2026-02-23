exports.handler = async () => {
  const token = process.env.PRODUCTHUNT_TOKEN;
  if (!token) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing PRODUCTHUNT_TOKEN" })
    };
  }

  const query = {
    query: `query($first: Int!) { posts(order: RANKING, first: $first) { edges { node { name tagline url } } } }`,
    variables: { first: 6 }
  };

  try {
    const response = await fetch("https://api.producthunt.com/v2/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(query)
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "Upstream error" })
      };
    }

    const data = await response.json();
    const edges = data?.data?.posts?.edges || [];
    const results = edges.map((edge) => ({
      title: edge.node?.name || "Untitled",
      url: edge.node?.url || "#",
      meta: edge.node?.tagline || ""
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
