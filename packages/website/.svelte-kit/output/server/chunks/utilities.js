const loadVegaLiteCharts = (charts) => async ({
  fetch: injectedFetch
}) => {
  const props = Object.fromEntries(
    await Promise.all(
      Object.entries(charts).map(async ([key, spec]) => {
        const response = await injectedFetch("/vegalite.svg", {
          method: "POST",
          body: JSON.stringify(spec),
          headers: {
            "content-type": "application/json"
          }
        });
        return [key, await response.text()];
      })
    )
  );
  return { props };
};
export {
  loadVegaLiteCharts as l
};
