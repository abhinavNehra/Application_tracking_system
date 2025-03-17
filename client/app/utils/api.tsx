type config = {
  url: string;
  method: string;
  body?: object;
};

console.log(import.meta.env);

const api = async (config: config) => {
  const { url, method, body } = config;
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  if (method !== "GET" && body) {
    options.body = JSON.stringify(body);
  }

  return fetch(process.env.BACKEND_URL + url, options)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
      return {
        success: false,
        error: "Error",
      };
    });
};

export default api;
