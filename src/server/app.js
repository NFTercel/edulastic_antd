import fs from 'fs';
import path from 'path';
import express from 'express';
import handlebars from 'handlebars';
// eslint-disable-next-line import/no-unresolved
import proxy from 'http-proxy-middleware';
import config from './config';

const app = express();
const {
  buildConfig: { assetsDir, targetDir },
  server: { port },
  proxyAssets
} = config;

/** **********************
 *        routes          *
 ************************* */

if (config.appModeDev) {
  app.use(
    `/${assetsDir}`,
    proxy({
      target: `http://${proxyAssets.host}:${proxyAssets.port}`,
      changeOrigin: true
    })
  );
} else {
  app.use(
    `/${assetsDir}`,
    express.static(path.join(process.cwd(), targetDir, 'client'))
  );
}

// serve the project documentation
if (process.env.NODE_ENV !== 'production') {
  app.use('/guidelines', express.static(path.join(process.cwd(), 'docs')));
}

app.use('*', (req, res) => {
  const template = handlebars.compile(
    fs.readFileSync(path.join(__dirname, 'index.hbs'), 'utf8')
  );
  const context = {
    title: 'Edulastic Poc App'
  };
  res.send(template(context));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

export default app;
