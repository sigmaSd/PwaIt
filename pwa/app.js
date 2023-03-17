if ("serviceWorker" in navigator) {
  addEventListener("load", function () {
    navigator.serviceWorker
      .register("/static/serviceWorker.js")
      .then(() => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}
