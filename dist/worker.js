!(function(e) {
  var t = {};
  function n(a) {
    if (t[a]) return t[a].exports;
    var s = (t[a] = { i: a, l: !1, exports: {} });
    return e[a].call(s.exports, s, s.exports, n), (s.l = !0), s.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function(e, t, a) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: a });
    }),
    (n.r = function(e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (n.t = function(e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
      var a = Object.create(null);
      if (
        (n.r(a),
        Object.defineProperty(a, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var s in e)
          n.d(
            a,
            s,
            function(t) {
              return e[t];
            }.bind(null, s),
          );
      return a;
    }),
    (n.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return n.d(t, 'a', t), t;
    }),
    (n.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ''),
    n((n.s = 0));
})([
  function(e, t, n) {
    'use strict';
    n.r(t);
    const a = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/`;
    async function s(e, t) {
      const n = a + e,
        s = JSON.stringify(
          {
            chat_id: t.chatId,
            reply_to_message_id: t.messageId,
            text: t.text,
            reply_markup: t.replyMarkup,
            parse_mode: t.parseMode,
          },
          (e, t) => {
            if (null != t && '' !== t) return t;
          },
        ),
        o = {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          body: s,
        };
      return (await fetch(n, o)).json();
    }
    var o = async e => {
      const t = await e.headers,
        n = await e.json(),
        a = new Headers({
          'Content-Type': 'application/json',
          'User-Agent': 'KweeksHook/1.0 (+https://webhook.kweeksnews.com/)',
        });
      try {
        const e = await (async function(e, t) {
          const n = JSON.parse(await KV.get('user-agent')),
            a = JSON.parse(await KV.get('chat-id')),
            s = n.kweeksnews,
            o = n.freshping,
            r = a.wordpress,
            i = a.content,
            d = a.user,
            c = a.server;
          a.management;
          let u = { parseMode: 'HTML' };
          switch (e.get('user-agent')) {
            case s:
              switch (((u.text = `<b>${t.event}</b>\n\n`), t.channel)) {
                case 'wordpress':
                  (u.chatId = [r]),
                    t.name && (u.text += `<b>Name:</b> ${t.name}\n`),
                    t.dev && (u.text += `<b>Dev:</b> ${t.dev}\n`),
                    t.from && (u.text += `<b>From:</b> ${t.from}\n`),
                    t.to && (u.text += `<b>To:</b> ${t.to}\n`);
                  break;
                case 'content':
                  (u.chatId = [i]),
                    t.title && (u.text += `<b>Title:</b> ${t.title}\n`),
                    t.post && (u.text += `<b>Post:</b> ${t.post}\n`),
                    t.category &&
                      (u.text += `<b>Category:</b> ${t.category}\n`),
                    t.tag && (u.text += `<b>Tag:</b> ${t.tag}\n`),
                    t.type && (u.text += `<b>Type:</b> ${t.type}\n`),
                    t.author && (u.text += `<b>Author:</b> ${t.author}\n`),
                    t.from && (u.text += `<b>From:</b> ${t.from}\n`),
                    t.email && (u.text += `<b>Email:</b> ${t.email}\n`),
                    t.comment && (u.text += `<b>Comment:</b> ${t.comment}\n`),
                    t.lasteditor &&
                      (u.text += `<b>Last Editor:</b> ${t.lasteditor}\n`),
                    t.via && (u.text += `<b>Via:</b> ${t.via}\n`),
                    t.status && (u.text += `<b>Status:</b> ${t.status}\n`),
                    t.useragent &&
                      (u.text += `<b>User Agent:</b> ${t.useragent}\n`),
                    t.ipaddress &&
                      (u.text += `<b>IP Address:</b> ${t.ipaddress}\n`),
                    t.url &&
                      (u.text += `<b>URL:</b> <a href="${t.url}">click here</a>\n`),
                    t.homeurl &&
                      t.id &&
                      (u.replyMarkup = JSON.stringify({
                        inline_keyboard: [
                          [
                            {
                              text: 'Review',
                              url: `${t.homeurl}/wp-admin/post.php?post=${t.id}&action=edit`,
                            },
                          ],
                        ],
                      }));
                  break;
                case 'user':
                  (u.chatId = [d]),
                    t.nicename &&
                      t.username &&
                      (u.text += `<b>User:</b> ${t.nicename} (${t.username})\n`),
                    !t.nicename &&
                      t.username &&
                      (u.text += `<b>User:</b> ${t.username}\n`),
                    t.email && (u.text += `<b>Email:</b> ${t.email}\n`),
                    t.role && (u.text += `<b>Role:</b> ${t.role}\n`),
                    t.ipaddress &&
                      (u.text += `<b>IP Address:</b> ${t.ipaddress}\n`);
                  break;
                default:
                  throw [400, 'Undefined channel!'];
              }
              break;
            case o:
              switch (
                ((u.chatId = [c]), t.webhook_event_data.http_status_code)
              ) {
                case 200:
                  const e = await KV.get(t.webhook_event_data.check_name);
                  if (
                    ((u.text =
                      '<b>#UPALERT</b>\n\n<b>Name:</b> ' +
                      t.webhook_event_data.check_name +
                      ` (${t.webhook_event_data.request_url})\n` +
                      `<b>Status:</b> ${t.webhook_event_data.check_state_name}\n` +
                      `<b>Status Code:</b> ${t.webhook_event_data.http_status_code}\n`),
                    e)
                  ) {
                    await KV.delete(t.webhook_event_data.check_name);
                    let n = new Date(e).getTime(),
                      a =
                        new Date(
                          t.webhook_event_data.request_start_time,
                        ).getTime() - n;
                    const s = [],
                      o = 36e5,
                      r = Math.trunc(a / o);
                    r > 0 && (s.push(r + 'h'), (a -= r * o));
                    const i = 6e4,
                      d = Math.trunc(a / i);
                    d > 0 && (s.push(d + 'm'), (a -= d * i));
                    const c = Math.trunc(a / 1e3);
                    c > 0 && s.push(c + 's'),
                      (a = s.join(' ')),
                      (u.text += `<b>Last Down Duration:</b> ${a}\n`);
                  }
                  break;
                default:
                  await KV.put(
                    t.webhook_event_data.check_name,
                    t.webhook_event_data.request_start_time,
                  ),
                    (u.text =
                      '<b>#DOWNALERT</b>\n\n<b>Name:</b> ' +
                      t.webhook_event_data.check_name +
                      ` (${t.webhook_event_data.request_url})\n` +
                      `<b>Status:</b> ${t.webhook_event_data.check_state_name}\n` +
                      `<b>Status Code:</b> ${t.webhook_event_data.http_status_code}\n`);
              }
              break;
            default:
              throw [400, 'User agent mismatch!'];
          }
          return u;
        })(t, n);
        let o = e,
          r = '';
        for (const t of e.chatId)
          (o.chatId = t), (r = JSON.stringify(await s('sendMessage', o)));
        const i = JSON.stringify({ result: 'Success', data: r });
        return new Response(i, { status: 200, headers: a });
      } catch (e) {
        if (400 == e[0]) {
          const t = JSON.stringify({ result: 'Failed', data: e[1] });
          return new Response(t, { status: e[0], headers: a });
        }
        {
          const t = JSON.stringify({ result: 'Failed', data: e.toString() });
          return new Response(t, { status: 500, headers: a });
        }
      }
    };
    const r = CLOUDFLARE_TOKEN,
      i = CLOUDFLARE_ZONEID,
      d = CLOUDFLARE_ACCOUNTMAIL,
      c = `https://api.cloudflare.com/client/v4/zones/${i}/`;
    async function u(e, t) {
      const n = new Headers({
        'Content-Type': 'application/json',
        'X-Auth-Email': d,
        'X-Auth-Key': r,
      });
      let a = c,
        s = {};
      switch (e) {
        case 'getSecurityLevel':
          (a += 'settings/security_level'), (s = { method: 'GET', headers: n });
          break;
        case 'changeSecurityLevel':
          (a += 'settings/security_level'),
            (s = { method: 'PATCH', headers: n, body: JSON.stringify(t.body) });
          break;
        case 'createRoute':
          (a += 'workers/routes'),
            (s = { method: 'POST', headers: n, body: JSON.stringify(t.body) });
          break;
        case 'deleteRoute':
          (a += 'workers/routes/' + t.id),
            (s = { method: 'DELETE', headers: n });
          break;
        default:
          throw [400, 'Undefined method!'];
      }
      return (await fetch(a, s)).json();
    }
    var l = async e => {
      const t = await e.json(),
        n = new Headers({
          'Content-Type': 'application/json',
          'User-Agent': 'KweeksHook/1.0 (+https://webhook.kweeksnews.com/)',
        });
      try {
        const e = await (async function(e) {
            let t = '',
              n = '',
              a = '',
              s = '',
              o = { parseMode: 'HTML' };
            if (
              !JSON.parse(await KV.get('webmaster-id')).includes(
                e.message.from.id,
              )
            )
              throw [200, 'Unauthorised user!'];
            e.message.text.startsWith('/') &&
              ((t = e.message.text.substring(1).split(/[ ]+/)),
              (n = t[0]),
              n.endsWith('@kweeksbot') && (n = n.substring(0, n.length - 10)),
              (a = t[1]),
              (o.chatId = e.message.chat.id),
              (o.messageId = e.message.message_id));
            const r =
                "Available commands:\n\n/start: Starts me! You've probably already used this.\n/help: Shows this help message.\n/underattack <code>&lt;on|off&gt;</code>: Sets under attack mode.\n/maintenance <code>&lt;on|off&gt;</code>: Sets maintenance mode.\n",
              i = `No help message affiliated with ${a}.`,
              d = e =>
                `Under attack mode is currently <b>${e}</b>.\n\nTo change this setting, try this command again followed by on/off.`,
              c = e => `Under attack mode is already <b>${e}</b>.`,
              l = e =>
                `Maintenance mode is currently <b>${e}</b>.\n\nTo change this setting, try this command again followed by on/off.`,
              h = e => `Maintenance mode is already <b>${e}</b>.`,
              b =
                'Your input was not recognised as one of: <code>on/off</code>';
            switch (n) {
              case 'start':
                'help' == a && 'private' == e.message.chat.type
                  ? 'private' == e.message.chat.type && (o.text = r)
                  : (o.text =
                      "Hey there! My name is KweeksBot. I'm here to help you manage KweeksNews Network sites! Hit /help to find out more about how to use me to my full potential.\n\nAlso please note that I only listen to webmaster's commands.");
                break;
              case 'help':
                a
                  ? (o.text = i)
                  : 'private' == e.message.chat.type
                  ? (o.text = r)
                  : ((o.text = 'Contact me in PM for help!'),
                    (o.replyMarkup = JSON.stringify({
                      inline_keyboard: [
                        [
                          {
                            text: 'Click here',
                            url: 'https://t.me/kweeksbot?start=help',
                          },
                        ],
                      ],
                    })));
                break;
              case 'underattack':
                if (((s = await u('getSecurityLevel')), 'on' == a))
                  if ('under_attack' == s.result.value) o.text = c('on');
                  else {
                    (
                      await u('changeSecurityLevel', {
                        body: { value: 'under_attack' },
                      })
                    ).success
                      ? (o.text = 'Under attack mode is <b>turned on</b>.')
                      : (o.text = 'Failed to change under attack mode.');
                  }
                else if ('off' == a)
                  if ('under_attack' == s.result.value) {
                    (
                      await u('changeSecurityLevel', {
                        body: { value: 'medium' },
                      })
                    ).success
                      ? (o.text = 'Under attack mode is <b>turned off</b>.')
                      : (o.text = 'Failed to change under attack mode.');
                  } else o.text = c('off');
                else
                  a
                    ? (o.text = b)
                    : 'under_attack' == s.result.value
                    ? (o.text = d('on'))
                    : (o.text = d('off'));
                break;
              case 'maintenance':
                if (((s = await KV.get('route-id')), 'on' == a))
                  if (s) o.text = h('on');
                  else {
                    const e = await u('createRoute', {
                      body: {
                        pattern: '*kweeksnews.com/*',
                        script: 'maintenance',
                      },
                    });
                    e.success
                      ? (await KV.put('route-id', e.result.id),
                        (o.text = 'Maintenance mode is <b>turned on</b>.'))
                      : (o.text = 'Failed to change maintenance mode.');
                  }
                else if ('off' == a)
                  if (s) {
                    (await u('deleteRoute', { id: s })).success
                      ? (await KV.delete('route-id'),
                        (o.text = 'Maintenance mode is <b>turned off</b>.'))
                      : (o.text = 'Failed to change maintenance mode.');
                  } else o.text = h('off');
                else o.text = a ? b : l(s ? 'on' : 'off');
                break;
              default:
                throw [200, 'Unknown command!'];
            }
            return o;
          })(t),
          a = JSON.stringify(await s('sendMessage', e)),
          o = JSON.stringify({ result: 'Success', data: a });
        return new Response(o, { status: 200, headers: n });
      } catch (e) {
        if (200 == e[0]) {
          const t = JSON.stringify({ result: 'Failed', data: e[1] });
          return new Response(t, { status: e[0], headers: n });
        }
        {
          const t = JSON.stringify({ result: 'Failed', data: e.toString() });
          return new Response(t, { status: 200, headers: n });
        }
      }
    };
    const h = e => t => t.method.toLowerCase() === e.toLowerCase(),
      b = h('connect'),
      m = h('delete'),
      p = h('get'),
      f = h('head'),
      w = h('options'),
      g = h('patch'),
      y = h('post'),
      k = h('put'),
      _ = h('trace'),
      x = e => t => {
        const n = new URL(t.url).pathname;
        return (n.match(e) || [])[0] === n;
      };
    var v = class {
      constructor() {
        this.routes = [];
      }
      handle(e, t) {
        return this.routes.push({ conditions: e, handler: t }), this;
      }
      connect(e, t) {
        return this.handle([b, x(e)], t);
      }
      delete(e, t) {
        return this.handle([m, x(e)], t);
      }
      get(e, t) {
        return this.handle([p, x(e)], t);
      }
      head(e, t) {
        return this.handle([f, x(e)], t);
      }
      options(e, t) {
        return this.handle([w, x(e)], t);
      }
      patch(e, t) {
        return this.handle([g, x(e)], t);
      }
      post(e, t) {
        return this.handle([y, x(e)], t);
      }
      put(e, t) {
        return this.handle([k, x(e)], t);
      }
      trace(e, t) {
        return this.handle([_, x(e)], t);
      }
      all(e) {
        return this.handle([], e);
      }
      route(e) {
        const t = this.resolve(e);
        return t ? t.handler(e) : 'undefined';
      }
      resolve(e) {
        return this.routes.find(
          t =>
            !(t.conditions && (!Array.isArray(t) || t.conditions.length)) ||
            ('function' == typeof t.conditions
              ? t.conditions(e)
              : t.conditions.every(t => t(e))),
        );
      }
    };
    addEventListener('fetch', e => {
      e.respondWith(
        (async function(e) {
          let t = '';
          if ('POST' == e.method) {
            const n = new v(),
              a = API_KEY;
            if (
              (n.post('/sendTelegramNotification' + a, o),
              n.post('/handleTelegramBot' + a, l),
              (t = await n.route(e)),
              'undefined' == t)
            ) {
              const e = JSON.stringify({
                result: 'Failed',
                data: 'Method not found!',
              });
              t = new Response(e, {
                status: 404,
                headers: new Headers({
                  'Content-Type': 'application/json',
                  'User-Agent':
                    'KweeksHook/1.0 (+https://webhook.kweeksnews.com/)',
                }),
              });
            }
          } else t = await fetch(e);
          return t;
        })(e.request),
      );
    });
  },
]);
