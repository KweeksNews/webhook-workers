import { telegramBot } from '../utils/telegramBot';
import { processNotification } from '../utils/processNotification';

export default async request => {
  const requestHeaders = await request.headers;
  const requestBody = await request.json();
  const responseHeaders = new Headers({
    'Content-Type': 'application/json',
    'User-Agent': 'KweeksHook/1.0 (+https://webhook.kweeksnews.com/)',
  });

  try {
    const processedData = await processNotification(
      requestHeaders,
      requestBody,
    );
    let params = processedData;
    let responseData = '';

    for (const item of processedData.chatId) {
      params.chatId = item;
      responseData = JSON.stringify(await telegramBot('sendMessage', params));
    }

    const responseBody = JSON.stringify({
      result: 'Success',
      data: responseData,
    });

    return new Response(responseBody, {
      status: 200,
      headers: responseHeaders,
    });
  } catch (error) {
    if (error[0] == 400) {
      const responseBody = JSON.stringify({
        result: 'Failed',
        data: error[1],
      });

      return new Response(responseBody, {
        status: error[0],
        headers: responseHeaders,
      });
    } else {
      const responseBody = JSON.stringify({
        result: 'Failed',
        data: error.toString(),
      });

      return new Response(responseBody, {
        status: 500,
        headers: responseHeaders,
      });
    }
  }
};
