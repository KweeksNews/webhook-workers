// CLOUDFLARE_TOKEN format: string <cloudflare_api_key>
const token = CLOUDFLARE_TOKEN;
// CLOUDFLARE_ZONEID format: string <cloudflare_zone_id>
const zoneId = CLOUDFLARE_ZONEID;
// CLOUDFLARE_ACCOUNTMAIL format: string <cloudflare_account_mail>
const accountMail = CLOUDFLARE_ACCOUNTMAIL;
const cloudflareUrl = `https://api.cloudflare.com/client/v4/zones/${zoneId}/`;

const cloudflareApi = async (method, params) => {
  const fetchHeaders = new Headers({
    'Content-Type': 'application/json',
    'X-Auth-Email': accountMail,
    'X-Auth-Key': token,
  });
  let fetchUrl = cloudflareUrl;
  let fetchPayload = {};

  switch (method) {
    case 'getSecurityLevel':
      fetchUrl += 'settings/security_level';
      fetchPayload = {
        method: 'GET',
        headers: fetchHeaders,
      };
      break;
    case 'changeSecurityLevel':
      fetchUrl += 'settings/security_level';
      fetchPayload = {
        method: 'PATCH',
        headers: fetchHeaders,
        body: JSON.stringify(params.body),
      };
      break;
    case 'createRoute':
      fetchUrl += 'workers/routes';
      fetchPayload = {
        method: 'POST',
        headers: fetchHeaders,
        body: JSON.stringify(params.body),
      };
      break;
    case 'deleteRoute':
      fetchUrl += `workers/routes/${params.id}`;
      fetchPayload = {
        method: 'DELETE',
        headers: fetchHeaders,
      };
      break;
    default:
      throw [400, 'Undefined method!'];
  }

  const fetchResult = await fetch(fetchUrl, fetchPayload);

  return fetchResult.json();
};

export default cloudflareApi;
