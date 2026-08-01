import type { KVNamespace } from '@cloudflare/workers-types';

export interface Env {
  STATE_KV: KVNamespace;
  APP_TOKEN: string;
}

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, 'Content-Type': 'application/json' } });

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });

    if (req.headers.get('Authorization') !== `Bearer ${env.APP_TOKEN}`) {
      return new Response('Unauthorized', { status: 401, headers: CORS });
    }

    if (url.pathname === '/api/state' && req.method === 'GET') {
      const v = await env.STATE_KV.get('user');
      return v
        ? new Response(v, { headers: { ...CORS, 'Content-Type': 'application/json' } })
        : new Response(null, { status: 204, headers: CORS });
    }
    if (url.pathname === '/api/state' && req.method === 'PUT') {
      await env.STATE_KV.put('user', await req.text());
      return json({ ok: true });
    }

    return new Response('Not found', { status: 404, headers: CORS });
  },
};
