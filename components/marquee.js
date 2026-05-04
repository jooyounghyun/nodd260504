class NoddMarquee extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 26px 0;
          overflow: hidden;
          border-top: 1px solid rgba(0,0,0,0.08);
          border-bottom: 1px solid rgba(0,0,0,0.08);
          background: var(--bg2, #eeeae2);
          position: relative;
          z-index: 1;
        }

        .track {
          display: flex;
          gap: 48px;
          width: max-content;
          animation: marquee 26s linear infinite;
        }

        :host(:hover) .track {
          animation-play-state: paused;
        }

        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .item {
          display: flex;
          align-items: center;
          gap: 12px;
          white-space: nowrap;
          font-size: 12px;
          font-weight: 700;
          color: rgba(0,0,0,0.32);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .dot {
          width: 5px;
          height: 5px;
          background: var(--accent-dark, #7aaa00);
          border-radius: 50%;
          flex-shrink: 0;
        }
      </style>
      <div class="track">
        <span class="item"><span class="dot"></span>AI 쇼츠 광고</span><span class="item"><span class="dot"></span>앱 프로모션</span><span class="item"><span class="dot"></span>SNS 콘텐츠</span><span class="item"><span class="dot"></span>TikTok · Reels</span><span class="item"><span class="dot"></span>Gen-Z 타깃팅</span><span class="item"><span class="dot"></span>48h 납품</span><span class="item"><span class="dot"></span>검증된 크리에이터</span><span class="item"><span class="dot"></span>AI Enhanced</span>
        <!-- Duplicate for seamless loop -->
        <span class="item"><span class="dot"></span>AI 쇼츠 광고</span><span class="item"><span class="dot"></span>앱 프로모션</span><span class="item"><span class="dot"></span>SNS 콘텐츠</span><span class="item"><span class="dot"></span>TikTok · Reels</span><span class="item"><span class="dot"></span>Gen-Z 타깃팅</span><span class="item"><span class="dot"></span>48h 납품</span><span class="item"><span class="dot"></span>검증된 크리에이터</span><span class="item"><span class="dot"></span>AI Enhanced</span>
      </div>
    `;
  }
}

customElements.define('nodd-marquee', NoddMarquee);
