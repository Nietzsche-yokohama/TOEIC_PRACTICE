import { useEffect, useRef, useState } from 'react';
import type { AttemptRecord, Part, UserState } from './types';
import { createInitialState } from './types';
import { loadLocal, saveLocal } from './storage/local';
import { pullState, debouncedPush, flushPush } from './storage/sync';
import Dashboard from './components/Dashboard';
import Drill from './components/Drill';
import Results from './components/Results';

type View =
  | { name: 'home' }
  | { name: 'drill'; part: Part; key: number }
  | { name: 'result'; part: Part; results: Omit<AttemptRecord, 'answeredAt'>[] };

// version 1 のみ。将来 version を上げたらここで旧→新の変換を行う。
function applyMigrations(state: UserState): UserState {
  return state;
}

export default function App() {
  const [state, setState] = useState<UserState | null>(null);
  const [view, setView] = useState<View>({ name: 'home' });
  const stateRef = useRef<UserState | null>(null);
  stateRef.current = state;

  useEffect(() => {
    (async () => {
      const local = await loadLocal();
      const initial = local ? applyMigrations(local) : createInitialState();
      setState(initial);
      const remote = await pullState(initial);
      if (remote) setState(applyMigrations(remote));
    })();
  }, []);

  useEffect(() => {
    const onHide = () => {
      if (document.visibilityState === 'hidden' && stateRef.current) flushPush(stateRef.current);
    };
    document.addEventListener('visibilitychange', onHide);
    return () => document.removeEventListener('visibilitychange', onHide);
  }, []);

  function updateState(updater: (s: UserState) => UserState) {
    setState((prev) => {
      if (!prev) return prev;
      const next = updater(prev);
      next.updatedAt = Date.now();
      saveLocal(next);
      debouncedPush(next);
      return next;
    });
  }

  function handleFinishDrill(part: Part, results: Omit<AttemptRecord, 'answeredAt'>[]) {
    const now = Date.now();
    updateState((s) => {
      const newRecords: AttemptRecord[] = results.map((r) => ({ ...r, answeredAt: now }));
      const statsByPart = { ...s.statsByPart };
      for (const r of results) {
        const prevStat = statsByPart[r.part];
        statsByPart[r.part] = { attempted: prevStat.attempted + 1, correct: prevStat.correct + (r.correct ? 1 : 0) };
      }
      return { ...s, history: [...s.history, ...newRecords], statsByPart };
    });
    setView({ name: 'result', part, results });
  }

  if (!state) {
    return (
      <div className="app">
        <p className="empty-note">読み込み中…</p>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="app-header">
        <h1 className="app-title">
          TOEIC <span>Drill</span>
        </h1>
      </div>

      {view.name === 'home' && (
        <Dashboard state={state} onSelectPart={(part) => setView({ name: 'drill', part, key: Date.now() })} />
      )}

      {view.name === 'drill' && (
        <Drill
          key={view.key}
          part={view.part}
          onExit={() => setView({ name: 'home' })}
          onFinish={(results) => handleFinishDrill(view.part, results)}
        />
      )}

      {view.name === 'result' && (
        <Results
          part={view.part}
          results={view.results}
          onHome={() => setView({ name: 'home' })}
          onRetry={() => setView({ name: 'drill', part: view.part, key: Date.now() })}
        />
      )}
    </div>
  );
}
