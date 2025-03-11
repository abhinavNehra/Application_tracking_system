type config = {
  url: string;
  method: string;
  body: object;
};

const api = async (config: config) => {
  return fetch(config.url, {
    method: config.method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(config.body),
  });
};

export default api;
