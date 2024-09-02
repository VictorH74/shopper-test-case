import setupApp from './config/app';

setupApp().then((app) => {
    app.listen(4000, () => {
        console.log(`server running on port 4000`);
    });
});
