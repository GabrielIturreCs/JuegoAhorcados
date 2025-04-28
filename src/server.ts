import { CommonEngine } from '@angular/ssr/node';
import { render } from '@netlify/angular-runtime/common-engine.mjs';
import { APP_BASE_HREF } from '@angular/common';
import express from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import bootstrap from './main.server';

// Directorios de salida
const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const indexHtml = join(serverDistFolder, 'index.server.html');

// Crear la aplicación Express
const app = express();
const commonEngine = new CommonEngine();

/**
 * Servir archivos estáticos desde /browser (salida de la construcción de Angular)
 */
app.get(
  '**',
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  }),
);

/**
 * Manejar todas las solicitudes renderizando la aplicación Angular utilizando SSR con CommonEngine
 */
app.get('**', (req, res, next) => {
  const { protocol, originalUrl, baseUrl, headers } = req;

  // Renderizar la aplicación Angular usando SSR con CommonEngine
  commonEngine
    .render({
      bootstrap,
      documentFilePath: indexHtml,
      url: `${protocol}://${headers.host}${originalUrl}`,
      publicPath: browserDistFolder,
      providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
    })
    .then((html) => res.send(html))
    .catch((err) => {
      console.error('SSR Render Error:', err);
      next(err);
    });
});

/**
 * Iniciar el servidor si este módulo es el punto de entrada principal.
 * El servidor escucha en el puerto definido por la variable de entorno `PORT`, o por defecto en el puerto 4000.
 */
const port = process.env['PORT'] || 4000;
if (import.meta.url === `file://${__filename}`) {
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export default app;