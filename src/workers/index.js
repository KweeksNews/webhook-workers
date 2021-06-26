import sendTelegramNotification from './handlers/send_telegram_notification';
import handleTelegramBot from './handlers/handle_telegram_bot';
import Router from './utils/router';

async function handleRequest(request) {
  let response = '';

  if (request.method == 'POST') {
    const r = new Router();
    // API_KEY format: string <api_key>
    const apiKey = API_KEY;
    r.post(`/sendTelegramNotification${apiKey}`, sendTelegramNotification);
    r.post(`/handleTelegramBot${apiKey}`, handleTelegramBot);

    response = await r.route(request);

    if (response == 'undefined') {
      const responseBody = JSON.stringify({
        result: 'Failed',
        data: 'Method not found!',
      });
      response = new Response(responseBody, {
        status: 404,
        headers: new Headers({
          'Content-Type': 'application/json',
          'User-Agent': 'KweeksHook/1.0 (+https://webhook.kweeksnews.com/)',
        }),
      });
    }
  } else {
    response = await fetch(request);
  }

  return response;
}

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});
