import setupApp from '@/main/config/app';
// import { configDotenv } from 'dotenv';
// import { join } from 'path';

// console.log('PATH', join(__dirname, '../../.env'))
// configDotenv({ path: join(__dirname, '../../.env') })

// TODO: create README.MD
// TODO: create unit tests

setupApp().then(app => {
  app.listen(4000, () => {
    console.log(`server running on port 4000`);
  });
});