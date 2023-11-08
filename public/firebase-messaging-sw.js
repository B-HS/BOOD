self.addEventListener("install", () => {
    console.log("FCM installing");
    self.skipWaiting();
});

self.addEventListener("activate", () => {
    console.log("FCM activating.");
});

self.addEventListener("push", (e) => {
    if (!e.data.json()) return;
    const resultData = e.data.json().notification;
    const notificationTitle = resultData.title;
    const notificationOptions = {
        body: resultData.body,
        icon: resultData.image,
        tag: resultData.tag,
        ...resultData,
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
    console.log("notification click");
    const url = "/";
    event.notification.close();
    event.waitUntil(clients.openWindow(url));
});