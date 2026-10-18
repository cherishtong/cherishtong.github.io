type Palette = {
  ink: string;
  paper: string;
  gold: string;
  goldSoft: string;
  vermilion: string;
  stoneBlue: string;
};

const TAIJI_PATH = 'M50 3a47 47 0 0 1 0 94 23.5 23.5 0 0 1 0-47 23.5 23.5 0 0 0 0-47Z';

const readPalette = (): Palette => {
  const styles = getComputedStyle(document.documentElement);
  const read = (name: string, fallback: string) => styles.getPropertyValue(name).trim() || fallback;

  return {
    ink: read('--ink', '#211e1a'),
    paper: read('--paper', '#f3ede1'),
    gold: read('--gold', '#b08d57'),
    goldSoft: read('--gold-soft', '#d9c39a'),
    vermilion: read('--vermilion', '#8c1f28'),
    stoneBlue: read('--stone-blue', '#2f5d62'),
  };
};

const conic = (ctx: CanvasRenderingContext2D, angle: number, stops: Array<[number, string]>) => {
  if (typeof ctx.createConicGradient === 'function') {
    const gradient = ctx.createConicGradient(angle, 50, 50);
    for (const [offset, color] of stops) gradient.addColorStop(offset, color);
    return gradient;
  }

  // Extremely old browser fallback: a diagonal linear gradient.
  const gradient = ctx.createLinearGradient(0, 0, 100, 100);
  for (const [offset, color] of stops) gradient.addColorStop(offset, color);
  return gradient;
};

export function initTaijiCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const path = new Path2D(TAIJI_PATH);
  let palette = readPalette();
  let size = 0;
  let dpr = 1;

  const colorObserver = new MutationObserver(() => {
    palette = readPalette();
  });
  colorObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });

  const draw = (time: number) => {
    const rect = canvas.getBoundingClientRect();
    const cssSize = Math.max(rect.width, 24);
    const nextDpr = Math.min(window.devicePixelRatio || 1, 2);

    if (size !== cssSize || dpr !== nextDpr) {
      size = cssSize;
      dpr = nextDpr;
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
    }

    const t = reduceMotion ? 0 : time / 1000;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);

    ctx.save();
    ctx.translate(size / 2, size / 2);
    ctx.rotate(t * 0.25);
    ctx.scale(size / 100, size / 100);
    ctx.translate(-50, -50);

    // 纸色 / 金色的“阳”半
    ctx.beginPath();
    ctx.arc(50, 50, 47, 0, Math.PI * 2);
    ctx.fillStyle = conic(ctx, -t * 0.35, [
      [0, palette.paper],
      [0.42, palette.goldSoft],
      [0.72, palette.paper],
      [1, palette.paper],
    ]);
    ctx.fill();

    // 墨色 / 朱砂的“阴”半：保持深色，让阴阳关系清楚
    ctx.fillStyle = conic(ctx, t * 0.55, [
      [0, palette.ink],
      [0.28, palette.ink],
      [0.48, palette.vermilion],
      [0.7, palette.ink],
      [1, palette.ink],
    ]);
    ctx.fill(path);

    // 两个鱼眼：上眼在阳半，用墨；下眼在阴半，用纸
    ctx.beginPath();
    ctx.arc(50, 26.5, 12.5, 0, Math.PI * 2);
    ctx.fillStyle = palette.ink;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(50, 73.5, 12.5, 0, Math.PI * 2);
    ctx.fillStyle = palette.paper;
    ctx.fill();

    // 外圈流光：鎏金 / 朱砂 / 石青
    ctx.beginPath();
    ctx.arc(50, 50, 47, 0, Math.PI * 2);
    ctx.lineWidth = 2.8;
    ctx.strokeStyle = conic(ctx, -t * 0.8, [
      [0, palette.gold],
      [0.28, palette.vermilion],
      [0.55, palette.stoneBlue],
      [0.8, palette.gold],
      [1, palette.gold],
    ]);
    ctx.stroke();

    ctx.restore();
  };

  if (reduceMotion) {
    draw(0);
    return;
  }

  let lastFrame = 0;
  const loop = (time: number) => {
    if (!document.hidden && time - lastFrame >= 32) {
      draw(time);
      lastFrame = time;
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}
