export async function processNotification(headers, body) {
  const userAgent = JSON.parse(await KV.get('user-agent'));
  const chatId = JSON.parse(await KV.get('chat-id'));
  const KweksNewsUserAgent = userAgent.kweeksnews;
  const FreshpingUserAgent = userAgent.freshping;
  const WordPressLogChannel = chatId.wordpress;
  const contentLogChannel = chatId.content;
  const userLogChannel = chatId.user;
  const serverLogChannel = chatId.server;
  const managementGroup = chatId.management;
  let params = {};
  params.parseMode = 'HTML';

  switch (headers.get('user-agent')) {
    case KweksNewsUserAgent:
      params.text = `<b>${body.event}</b>\n\n`;
      switch (body.channel) {
        case 'wordpress':
          params.chatId = [WordPressLogChannel];
          if (body.name) {
            params.text += `<b>Name:</b> ${body.name}\n`;
          }
          if (body.dev) {
            params.text += `<b>Dev:</b> ${body.dev}\n`;
          }
          if (body.from) {
            params.text += `<b>From:</b> ${body.from}\n`;
          }
          if (body.to) {
            params.text += `<b>To:</b> ${body.to}\n`;
          }
          break;
        case 'content':
          params.chatId = [contentLogChannel];
          if (body.title) {
            params.text += `<b>Title:</b> ${body.title}\n`;
          }
          if (body.post) {
            params.text += `<b>Post:</b> ${body.post}\n`;
          }
          if (body.category) {
            params.text += `<b>Category:</b> ${body.category}\n`;
          }
          if (body.tag) {
            params.text += `<b>Tag:</b> ${body.tag}\n`;
          }
          if (body.type) {
            params.text += `<b>Type:</b> ${body.type}\n`;
          }
          if (body.author) {
            params.text += `<b>Author:</b> ${body.author}\n`;
          }
          if (body.from) {
            params.text += `<b>From:</b> ${body.from}\n`;
          }
          if (body.email) {
            params.text += `<b>Email:</b> ${body.email}\n`;
          }
          if (body.comment) {
            params.text += `<b>Comment:</b> ${body.comment}\n`;
          }
          if (body.lasteditor) {
            params.text += `<b>Last Editor:</b> ${body.lasteditor}\n`;
          }
          if (body.via) {
            params.text += `<b>Via:</b> ${body.via}\n`;
          }
          if (body.status) {
            params.text += `<b>Status:</b> ${body.status}\n`;
          }
          if (body.useragent) {
            params.text += `<b>User Agent:</b> ${body.useragent}\n`;
          }
          if (body.ipaddress) {
            params.text += `<b>IP Address:</b> ${body.ipaddress}\n`;
          }
          if (body.url) {
            params.text += `<b>URL:</b> <a href="${body.url}">click here</a>\n`;
          }
          if (body.homeurl && body.id) {
            params.replyMarkup = JSON.stringify({
              inline_keyboard: [
                [
                  {
                    text: 'Review',
                    url: `${body.homeurl}/wp-admin/post.php?post=${body.id}&action=edit`,
                  },
                ],
              ],
            });
          }
          break;
        case 'user':
          params.chatId = [userLogChannel];
          if (body.nicename && body.username) {
            params.text += `<b>User:</b> ${body.nicename} (${body.username})\n`;
          }
          if (!body.nicename && body.username) {
            params.text += `<b>User:</b> ${body.username}\n`;
          }
          if (body.email) {
            params.text += `<b>Email:</b> ${body.email}\n`;
          }
          if (body.role) {
            params.text += `<b>Role:</b> ${body.role}\n`;
          }
          if (body.ipaddress) {
            params.text += `<b>IP Address:</b> ${body.ipaddress}\n`;
          }
          break;
        default:
          throw [400, 'Undefined channel!'];
      }
      break;
    case FreshpingUserAgent:
      params.chatId = [serverLogChannel];
      switch (body.webhook_event_data.http_status_code) {
        case 200:
          const lastDown = await KV.get(body.webhook_event_data.check_name);
          params.text =
            `<b>#UPALERT</b>\n\n` +
            `<b>Name:</b> ${body.webhook_event_data.check_name}` +
            ` (${body.webhook_event_data.request_url})\n` +
            `<b>Status:</b> ${body.webhook_event_data.check_state_name}\n` +
            `<b>Status Code:</b> ${body.webhook_event_data.http_status_code}\n`;

          if (lastDown) {
            await KV.delete(body.webhook_event_data.check_name);

            let start = new Date(lastDown).getTime();
            let stop = new Date(
              body.webhook_event_data.request_start_time,
            ).getTime();
            let duration = stop - start;
            const portions = [];

            const msInHour = 1000 * 60 * 60;
            const hours = Math.trunc(duration / msInHour);

            if (hours > 0) {
              portions.push(`${hours}h`);
              duration = duration - hours * msInHour;
            }

            const msInMinute = 1000 * 60;
            const minutes = Math.trunc(duration / msInMinute);

            if (minutes > 0) {
              portions.push(`${minutes}m`);
              duration = duration - minutes * msInMinute;
            }

            const seconds = Math.trunc(duration / 1000);

            if (seconds > 0) {
              portions.push(`${seconds}s`);
            }

            duration = portions.join(' ');
            params.text += `<b>Last Down Duration:</b> ${duration}\n`;
          }
          break;
        default:
          await KV.put(
            body.webhook_event_data.check_name,
            body.webhook_event_data.request_start_time,
          );
          params.text =
            `<b>#DOWNALERT</b>\n\n` +
            `<b>Name:</b> ${body.webhook_event_data.check_name}` +
            ` (${body.webhook_event_data.request_url})\n` +
            `<b>Status:</b> ${body.webhook_event_data.check_state_name}\n` +
            `<b>Status Code:</b> ${body.webhook_event_data.http_status_code}\n`;
          break;
      }
      break;
    default:
      throw [400, 'User agent mismatch!'];
  }

  return params;
}
