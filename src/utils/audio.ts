// 「出だしの音が聞こえない」対策のための音声出力ユーティリティ。
//
// AirPods 等の Bluetooth 出力を繋いでいると、音が止まっている間に A2DP リンクが
// 省電力状態へ入り、次に鳴らす瞬間の再確立に数百ms かかって頭の音が失われる。
// （PC内蔵スピーカーやスマホ単体では起きない＝Bluetooth側の挙動で、
//   speechSynthesis からは制御できない）
// そこで、聞こえない極小の音を流し続けてリンクを開いたままにする。OSからは
// 「再生中」に見えるので省電力に入らず、発話は最初から鳴る。

let keepAliveCtx: AudioContext | null = null;
let keepAliveSrc: AudioBufferSourceNode | null = null;

function audioCtor(): typeof AudioContext | undefined {
  return (
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  );
}

/**
 * 音声を使う画面に入ったら呼ぶ。ユーザー操作の後に呼ぶこと（自動再生ポリシー）。
 * @returns このタイミングで新しくリンクを張ったら true（＝鳴らすまで少し待つ価値がある）
 */
export function startAudioKeepAlive(): boolean {
  try {
    const Ctor = audioCtor();
    if (!Ctor) return false;
    const ctx = (keepAliveCtx ??= new Ctor());
    void ctx.resume();
    if (keepAliveSrc) return false;

    const buf = ctx.createBuffer(1, 4096, ctx.sampleRate);
    const data = buf.getChannelData(0);
    // 完全な無音だと「無音なので出力を畳んでよい」と判断する環境があるため、
    // 振幅 1e-4（約-80dB）のごく微小なノイズを入れる。実質聞こえない。
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 1e-4;

    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    src.connect(ctx.destination);
    src.start();
    keepAliveSrc = src;
    return true;
  } catch {
    return false; // 非対応環境では何もしない（従来どおり動く）
  }
}

/** タブを離れて戻ると AudioContext が止められていることがあるので、鳴らす前に起こす */
export function resumeAudioKeepAlive(): void {
  try {
    void keepAliveCtx?.resume();
  } catch {
    /* noop */
  }
}

/** 音声を使う画面から出たら呼ぶ（電池の無駄遣いを避ける） */
export function stopAudioKeepAlive(): void {
  try {
    keepAliveSrc?.stop();
    keepAliveSrc?.disconnect();
  } catch {
    /* noop */
  }
  keepAliveSrc = null;
}
