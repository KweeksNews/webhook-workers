import { telegramBot } from '../utils/telegramBot';
import { processBot } from '../utils/processBot';

export default async request => {
  const requestBody = await request.json();
  const responseHeaders = new Headers({
    'Content-Type': 'application/json',
    'User-Agent': 'KweeksHook/1.0 (+https://webhook.kweeksnews.com/)',
  });

  try {
    const processedData = await processBot(requestBody);

    const responseData = JSON.stringify(
      await telegramBot('sendMessage', processedData),
    );

    const responseBody = JSON.stringify({
      result: 'Success',
      data: responseData,
    });

    return new Response(responseBody, {
      status: 200,
      headers: responseHeaders,
    });
  } catch (error) {
    if (error[0] == 200) {
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
        status: 200,
        headers: responseHeaders,
      });
    }
  }
};
