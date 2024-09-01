import setupApp from "./config/app";

// TODO: create unit tests

setupApp().then(app => {
  app.listen(4000, () => {
    console.log(`server running on port 4000`);
  });
});