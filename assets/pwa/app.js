if ("serviceWorker" in navigator) {
  addEventListener("load", function () {
    navigator.serviceWorker
      // we're going to give it scope / so it needs to be in the root of the repo
      .register("/sw.js")
      .then(() => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}
