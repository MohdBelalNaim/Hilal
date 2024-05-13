export default function notify(to, type, content, base) {
  fetch(`${base}/notification/create`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      to,
      content,
      type,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        return data.error;
      } else {
        return data.message;
      }
    });
}
