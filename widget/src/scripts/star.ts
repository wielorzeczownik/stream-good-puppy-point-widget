import Tixyel from '@tixyel/streamelements';
import { animate, type AnimationSequence } from 'motion';

import { randomSoundUrl } from '@/sounds';
import { storage } from '@/storage';
import { formatText } from '@/text';
import type { Config, PointEvent } from '@/types';

const logger = new Tixyel.modules.useLogger();

const POP = [0.34, 1.56, 0.64, 1] as const; // back-out, overshoots then settles
const SMALL_STAR_DELAY = 0.12;

// how often the wobble noise re-rolls, a hand-drawn line "boiling"
const BOIL_INTERVAL_MS = 140;
const BOIL_SEEDS = 4;

const byId = <T extends HTMLElement | SVGElement>(id: string) =>
  document.getElementById(id) as T | null;

class Star {
  private readonly stage = byId<HTMLDivElement>('stage');
  private readonly main = byId<HTMLDivElement>('star-main');
  private readonly mainShape = byId<SVGSVGElement>('star-shape');
  private readonly image = byId<HTMLImageElement>('star-image');
  private readonly text = byId<HTMLParagraphElement>('star-text');
  private readonly total = byId<HTMLParagraphElement>('star-total');
  private readonly smallTop = byId<SVGSVGElement>('star-small-top');
  private readonly smallBottom = byId<SVGSVGElement>('star-small-bottom');

  private readonly queue = new Tixyel.modules.useQueue<PointEvent>({
    processor: async ({ value }) => await this.play(value),
  });

  constructor(private readonly config: Config) {
    this.applyConfig();
  }

  // empty minus sound falls back to the normal one, then to the built-in pop
  private async playSound(isMinus: boolean): Promise<void> {
    const { minusSoundUrl, soundUrl } = this.config;
    const url = (isMinus && minusSoundUrl) || soundUrl || randomSoundUrl();
    const audio = new Audio(url);
    audio.volume = this.config.soundVolume / 100;
    try {
      await audio.play();
    } catch (error: unknown) {
      logger.warn(`[Good Puppy] Sound failed: ${String(error)}`);
    }
  }

  private async play({
    user,
    isMinus = false,
    amount = this.config.amount,
    totalOnly = false,
  }: PointEvent): Promise<void> {
    if (totalOnly) {
      await this.showTotal(user);
      return;
    }
    const { main, stage, text, total, smallTop, smallBottom, config } = this;
    if (!main || !stage || !text || !total || !smallTop || !smallBottom) return;
    const { isJelly, hasSmallStars } = this.dress(isMinus);
    // minus colours override the :root ones for this one play only
    setVariables(stage, {
      '--star-color': isMinus ? config.minusStarColor : '',
      '--small-star-color': isMinus ? config.minusStarColor : '',
      '--text-color': isMinus ? config.minusTextColor : '',
    });
    const boil = this.startBoil();

    const sum = storage.data.total + (isMinus ? -amount : amount);
    storage.update({ total: sum });
    const values = { amount, total: sum, user };
    text.textContent = formatText(
      isMinus ? config.minusStarText : config.starText,
      values
    );

    total.textContent = formatText(config.totalText, values);
    total.hidden = !config.showTotal || config.totalText.trim() === '';

    stage.style.visibility = 'visible';
    void this.playSound(isMinus);

    // big star first, then the small ones burst out of it one after another
    const enter: AnimationSequence = [
      [
        main,
        isJelly
          ? {
              scaleX: [0, 1.18, 0.9, 1.04, 1],
              scaleY: [0, 0.86, 1.1, 0.97, 1],
              rotate: [-30, 6, -2, 0, 0],
              opacity: [0, 1, 1, 1, 1],
            }
          : {
              scaleX: [0, 1.12, 1],
              scaleY: [0, 1.12, 1],
              rotate: [-30, 6, 0],
              opacity: [0, 1, 1],
            },
        { duration: isJelly ? 0.8 : 0.6, ease: 'easeOut' },
      ],
      [
        text,
        { opacity: [0, 1], scale: [0.6, 1] },
        { at: 0.25, duration: 0.3, ease: POP },
      ],
    ];
    if (hasSmallStars) {
      enter.push(
        [
          smallTop,
          {
            scale: [0, 1.3, 1],
            rotate: [-120, 15, 0],
            x: ['60%', '0%'],
            y: ['60%', '0%'],
            opacity: [0, 1],
          },
          { at: '-0.1', duration: 0.5, ease: POP },
        ],
        [
          smallBottom,
          {
            scale: [0, 1.3, 1],
            rotate: [120, -15, 0],
            x: ['-60%', '0%'],
            y: ['-60%', '0%'],
            opacity: [0, 1],
          },
          { at: `-${0.5 - SMALL_STAR_DELAY}`, duration: 0.5, ease: POP },
        ]
      );
    }
    enter.push([total, { opacity: [0, 1], y: [12, 0] }, { duration: 0.3 }]);
    await animate(enter);

    // gentle twinkle while it stays on screen
    const twinkle = hasSmallStars
      ? [
          animate(
            smallTop,
            { rotate: [0, 12, 0, -12, 0], scale: [1, 1.08, 1] },
            { duration: 1.6, repeat: Infinity }
          ),
          animate(
            smallBottom,
            { rotate: [0, -12, 0, 12, 0], scale: [1, 1.08, 1] },
            { duration: 1.6, repeat: Infinity, delay: 0.4 }
          ),
        ]
      : [];
    const breathe = animate(
      main,
      isJelly
        ? { scaleX: [1, 1.04, 0.98, 1], scaleY: [1, 0.96, 1.03, 1] }
        : { scaleX: [1, 1.03, 1], scaleY: [1, 1.03, 1] },
      { duration: 1.4, repeat: Infinity }
    );
    await new Promise((resolve) =>
      setTimeout(resolve, config.holdDuration * 1000)
    );
    for (const control of [...twinkle, breathe]) control.stop();

    await animate([
      [total, { opacity: 0 }, { duration: 0.2 }],
      [
        smallBottom,
        { scale: 0, rotate: 90, opacity: 0 },
        { at: 0, duration: 0.25, ease: 'easeIn' },
      ],
      [
        smallTop,
        { scale: 0, rotate: -90, opacity: 0 },
        { at: 0.08, duration: 0.25, ease: 'easeIn' },
      ],
      [
        main,
        // scaleX/scaleY like the entry, a leftover `scale: 0` would hide the next star
        {
          scaleX: [1, 1.08, 0],
          scaleY: [1, 1.08, 0],
          rotate: 20,
          opacity: [1, 1, 0],
        },
        { at: 0.15, duration: 0.4, ease: 'easeIn' },
      ],
    ]);
    stage.style.visibility = 'hidden';
    clearInterval(boil);
  }

  // the total line alone, in its usual spot under where the star would be
  private async showTotal(user: string): Promise<void> {
    const { stage, total, config } = this;
    if (!stage || !total || config.totalText.trim() === '') return;
    setVariables(stage, {
      '--star-color': '',
      '--small-star-color': '',
      '--text-color': '',
    });
    const values = { amount: 0, total: storage.data.total, user };
    total.textContent = formatText(config.totalText, values);
    total.hidden = false;
    stage.style.visibility = 'visible';
    await animate(total, { opacity: [0, 1], y: [12, 0] }, { duration: 0.3 });
    await new Promise((resolve) =>
      setTimeout(resolve, config.holdDuration * 1000)
    );
    await animate(total, { opacity: 0 }, { duration: 0.2 });
    stage.style.visibility = 'hidden';
  }

  private startBoil(): ReturnType<typeof setInterval> | undefined {
    const noise = document.getElementById('wobble-noise');
    if (!noise || !this.config.starWobble) return undefined;
    let seed = 0;
    return setInterval(() => {
      seed = (seed + 1) % BOIL_SEEDS;
      noise.setAttribute('seed', String(seed + 1));
    }, BOIL_INTERVAL_MS);
  }

  // the plus or minus image and small stars for this one play
  private dress(isMinus: boolean): {
    isJelly: boolean;
    hasSmallStars: boolean;
  } {
    const { config } = this;
    // an empty minus image falls back to the normal one, then the drawn star
    const imageUrl =
      (isMinus && config.minusCustomImageUrl) || config.customImageUrl;
    this.showImage(imageUrl);
    const hasSmallStars = isMinus
      ? config.minusShowSmallStars
      : config.showSmallStars;
    for (const small of [this.smallTop, this.smallBottom]) {
      if (small) small.style.display = hasSmallStars ? '' : 'none';
    }
    // squash and stretch only the drawn star, a custom image stays undistorted
    return { isJelly: config.starWobble && imageUrl === '', hasSmallStars };
  }

  // an image replaces the drawn star, an empty url brings the star back
  private showImage(url: string): void {
    const hasImage = url !== '';
    if (this.image) {
      this.image.hidden = !hasImage;
      if (hasImage && this.image.getAttribute('src') !== url) {
        this.image.src = url;
      }
    }
    if (this.mainShape) this.mainShape.style.display = hasImage ? 'none' : '';
  }

  applyConfig(): void {
    const { config } = this;
    setVariables(document.documentElement, {
      '--star-size': `${config.starSize}px`,
      '--star-color': config.starColor,
      '--small-star-color': config.smallStarColor,
      '--text-color': config.textColor,
      '--font-size': `${config.fontSize}px`,
      '--font-family': `'${config.fontFamily}', cursive`,
      '--total-font-size': `${config.totalFontSize}px`,
      // empty colour fields fall back to the text and star colours in CSS
      '--total-color': config.totalTextColor,
      '--total-style-color': config.totalStyleColor,
    });
    this.total?.setAttribute('data-style', config.totalStyle);
    this.stage?.toggleAttribute('data-wobble', config.starWobble);
    loadGoogleFont(config.fontFamily);

    this.showImage(config.customImageUrl);
    // load the minus image early so it doesn't pop in mid-animation
    if (config.minusCustomImageUrl) {
      new Image().src = config.minusCustomImageUrl;
    }
  }

  trigger(event: PointEvent): void {
    this.queue.enqueue(event);
  }
}

// an empty value removes the variable so CSS fallbacks apply
function setVariables(
  element: HTMLElement,
  variables: Record<string, string>
): void {
  for (const [name, value] of Object.entries(variables)) {
    if (value) element.style.setProperty(name, value);
    else element.style.removeProperty(name);
  }
}

const loadedFonts = new Set<string>();

function loadGoogleFont(family: string): void {
  if (!family || loadedFonts.has(family)) return;
  loadedFonts.add(family);
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}&display=swap`;
  document.head.append(link);
}

const state: { instance?: Star } = {};

export function init(config: Config): void {
  state.instance = new Star(config);
}

export function trigger(event: PointEvent): void {
  state.instance!.trigger(event);
}

export function applyConfig(): void {
  state.instance!.applyConfig();
}

export function resetTotal(): void {
  storage.update({ total: 0 });
}
