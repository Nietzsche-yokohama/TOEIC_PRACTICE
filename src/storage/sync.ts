import type { UserState } from '../types';
import { saveLocal } from './local';

const API_BASE = (import.meta.env.VITE_API_BASE as string | undefined) ?? '';
const APP_TOKEN = (import.meta.env.VITE_APP_TOKEN as string | undefined) ?? '';
const authHeaders = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${APP_TOKEN}` });

// 起動時: サーバーが新しければ採用（last-write-wins）
export async function pullState(local: UserState | null): Promise<UserState | null> {
  if (!API_BASE) return null;
  try {
    const res = await fetch(`${API_BASE}/api/state`, { headers: authHeaders() });
    if (res.status === 204 || res.status === 404 || !res.ok) return null;
    const remote: UserState = await res.json();
    if (!local || remote.updatedAt > local.updatedAt) {
      await saveLocal(remote);
      return remote;
    }
    return null;
  } catch {
    return null;
  }
}

// 変更時: 1.5秒デバウンスで PUT（書きすぎ防止）
let timer: ReturnType<typeof setTimeout> | null = null;
export function debouncedPush(state: UserState, delay = 1500): void {
  if (!API_BASE) return;
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => push(state, false).catch(() => {}), delay);
}

// 離脱時: keepalive で確実に送る
export function flushPush(state: UserState): void {
  if (!API_BASE) return;
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  push(state, true).catch(() => {});
}

async function push(state: UserState, keepalive: boolean): Promise<void> {
  try {
    await fetch(`${API_BASE}/api/state`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(state),
      keepalive,
    });
  } catch {
    /* 次回変更時に再試行 */
  }
}
