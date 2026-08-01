import { get, set } from 'idb-keyval';
import type { UserState } from '../types';

const STATE_KEY = 'app_state';

export async function loadLocal(): Promise<UserState | null> {
  try {
    return (await get<UserState>(STATE_KEY)) ?? null;
  } catch {
    return null;
  }
}

export async function saveLocal(state: UserState): Promise<void> {
  try {
    await set(STATE_KEY, state);
  } catch {
    /* noop */
  }
}
