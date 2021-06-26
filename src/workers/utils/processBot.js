import cloudflareApi from './cloudflareApi';

const processBot = async (body) => {
  const allowedUser = JSON.parse(await KV.get('webmaster-id'));
  let text = '';
  let command = '';
  let value = '';
  let check = '';
  const params = {};
  params.parseMode = 'HTML';

  if (allowedUser.includes(body.message.from.id)) {
    if (body.message.text.startsWith('/')) {
      text = body.message.text.substring(1).split(/[ ]+/);
      [command, ...value] = text;

      if (command.endsWith('@kweeksbot')) {
        command = command.substring(0, command.length - 10);
      }

      params.chatId = body.message.chat.id;
      params.messageId = body.message.message_id;
    }
  } else {
    throw [200, 'Unauthorised user!'];
  }

  const startText = 'Hey there! My name is KweeksBot. '
    + 'I\'m here to help you manage KweeksNews Network sites! '
    + 'Hit /help to find out more about how to use me to my full potential.\n\n'
    + 'Also please note that I only listen to webmaster\'s commands.';
  const helpText = 'Available commands:\n\n'
    + '/start: Starts me! You\'ve probably already used this.\n'
    + '/help: Shows this help message.\n'
    + '/underattack <code>&lt;on|off&gt;</code>: Sets under attack mode.\n'
    + '/maintenance <code>&lt;on|off&gt;</code>: Sets maintenance mode.\n';
  const helpNoneText = `No help message affiliated with <code>${value}</code>.`;
  const helpNonPrivateText = 'Contact me in PM for help!';
  const underattackText = (status) => `Under attack mode is currently <b>${status}</b>.\n\n`
    + 'To change this setting, try this command again followed by on/off.';
  const underattackAlreadySetText = (status) => `Under attack mode is already <b>${status}</b>.`;
  const underattackSetFailedText = 'Failed to change under attack mode.';
  const underattackOnText = 'Under attack mode is <b>turned on</b>.';
  const underattackOffText = 'Under attack mode is <b>turned off</b>.';
  const maintenanceText = (status) => `Maintenance mode is currently <b>${status}</b>.\n\n`
    + 'To change this setting, try this command again followed by on/off.';
  const maintenanceAlreadySetText = (status) => `Maintenance mode is already <b>${status}</b>.`;
  const maintenanceSetFailedText = 'Failed to change maintenance mode.';
  const maintenanceOnText = 'Maintenance mode is <b>turned on</b>.';
  const maintenanceOffText = 'Maintenance mode is <b>turned off</b>.';
  const unknownValueText = 'Your input was not recognised as one of: <code>on/off</code>';

  switch (command) {
    case 'start':
      if (value == 'help' && body.message.chat.type == 'private') {
        if (body.message.chat.type == 'private') {
          params.text = helpText;
        }
      } else {
        params.text = startText;
      }
      break;
    case 'help':
      if (value && value != '') {
        params.text = helpNoneText;
      } else if (body.message.chat.type == 'private') {
        params.text = helpText;
      } else {
        params.text = helpNonPrivateText;
        params.replyMarkup = JSON.stringify({
          inline_keyboard: [
            [
              {
                text: 'Click here',
                url: 'https://t.me/kweeksbot?start=help',
              },
            ],
          ],
        });
      }
      break;
    case 'underattack':
      check = await cloudflareApi('getSecurityLevel');

      if (value == 'on') {
        if (check.result.value == 'under_attack') {
          params.text = underattackAlreadySetText('on');
        } else {
          const data = await cloudflareApi('changeSecurityLevel', {
            body: { value: 'under_attack' },
          });

          if (data.success) {
            params.text = underattackOnText;
          } else {
            params.text = underattackSetFailedText;
          }
        }
      } else if (value == 'off') {
        if (check.result.value == 'under_attack') {
          const data = await cloudflareApi('changeSecurityLevel', {
            body: { value: 'medium' },
          });

          if (data.success) {
            params.text = underattackOffText;
          } else {
            params.text = underattackSetFailedText;
          }
        } else {
          params.text = underattackAlreadySetText('off');
        }
      } else if (value && value != '') {
        params.text = unknownValueText;
      } else if (check.result.value == 'under_attack') {
        params.text = underattackText('on');
      } else {
        params.text = underattackText('off');
      }
      break;
    case 'maintenance':
      check = await KV.get('route-id');

      if (value == 'on') {
        if (check) {
          params.text = maintenanceAlreadySetText('on');
        } else {
          const data = await cloudflareApi('createRoute', {
            body: {
              pattern: '*kweeksnews.com/*',
              script: 'maintenance',
            },
          });

          if (data.success) {
            await KV.put('route-id', data.result.id);
            params.text = maintenanceOnText;
          } else {
            params.text = maintenanceSetFailedText;
          }
        }
      } else if (value == 'off') {
        if (check) {
          const data = await cloudflareApi('deleteRoute', {
            id: check,
          });

          if (data.success) {
            await KV.delete('route-id');
            params.text = maintenanceOffText;
          } else {
            params.text = maintenanceSetFailedText;
          }
        } else {
          params.text = maintenanceAlreadySetText('off');
        }
      } else if (value && value != '') {
        params.text = unknownValueText;
      } else if (check) {
        params.text = maintenanceText('on');
      } else {
        params.text = maintenanceText('off');
      }
      break;
    default:
      throw [200, 'Unknown command!'];
  }

  return params;
};

export default processBot;
