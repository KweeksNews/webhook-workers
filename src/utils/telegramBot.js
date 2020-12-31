// TELEGRAM_TOKEN format: string <telegram_bot_token>
const token = TELEGRAM_TOKEN;
const telegramUrl = `https://api.telegram.org/bot${token}/`;

export async function telegramBot(method, params) {
  const fetchUrl = telegramUrl + method;

  const fetchBody = JSON.stringify(
    {
      chat_id: params.chatId,
      reply_to_message_id: params.messageId,
      text: params.text,
      reply_markup: params.replyMarkup,
      parse_mode: params.parseMode,
    },
    (key, value) => {
      if (value !== null && value !== undefined && value !== '') return value;
    },
  );

  const fetchPayload = {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: fetchBody,
  };

  const fetchResult = await fetch(fetchUrl, fetchPayload);

  return fetchResult.json();
}
