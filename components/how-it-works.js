class NoddHowItWorks extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.observeReveals();
  }

  observeReveals() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    this.shadowRoot.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 120px 0;
          position: relative;
          z-index: 1;
        }

        .inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
        }

        .sec-label { font-size: 12px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--accent-dark); margin-bottom: 20px; }
        .sec-title { font-family: var(--font-d); font-size: clamp(40px, 5vw, 66px); font-weight: 800; letter-spacing: -2px; line-height: 1; margin-bottom: 20px; color: var(--black); }

        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          margin-top: 64px;
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 24px;
          overflow: hidden;
        }

        .card {
          background: var(--white);
          padding: 48px 40px;
          border-right: 1px solid rgba(0,0,0,0.08);
          position: relative;
          overflow: hidden;
          transition: background 0.3s;
        }

        .card:last-child { border-right: none; }
        .card:hover { background: #f0f8d0; }

        .card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
          transform: scaleX(0);
          transition: transform 0.4s var(--ease);
        }

        .card:hover::before { transform: scaleX(1); }

        .num { font-family: var(--font-d); font-size: 72px; font-weight: 800; color: rgba(0,0,0,0.05); line-height: 1; margin-bottom: 24px; letter-spacing: -3px; }
        .icon { font-size: 36px; margin-bottom: 20px; }
        .title { font-family: var(--font-d); font-size: 22px; font-weight: 700; margin-bottom: 12px; color: var(--black); }
        .desc { font-size: 15px; color: rgba(0,0,0,0.48); line-height: 1.75; }

        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s var(--ease), transform 0.7s var(--ease);
        }
        .reveal.visible { opacity: 1; transform: none; }

        @media (max-width: 768px) {
          :host { padding: 80px 0; }
          .inner { padding: 0 24px; }
          .grid { grid-template-columns: 1fr; }
          .card { border-right: none; border-bottom: 1px solid rgba(0,0,0,0.08); }
          .card:last-child { border-bottom: none; }
        }
      </style>
      <div class="inner reveal">
        <div class="sec-label">How it works</div>
        <h2 class="sec-title">3단계로<br>완성되는 콘텐츠</h2>
        <div class="grid">
          <div class="card">
            <div class="num">01</div>
            <div class="icon">🎯</div>
            <div class="title">브리프 작성</div>
            <div class="desc">원하는 콘텐츠 유형, 톤앤매너, 타깃 플랫폼을 입력하세요. AI가 최적의 크리에이터를 매칭합니다.</div>
          </div>
          <div class="card">
            <div class="num">02</div>
            <div class="icon">✨</div>
            <div class="title">크리에이터 선택</div>
            <div class="desc">포트폴리오와 리뷰를 보고 원하는 크리에이터를 선택하세요. 모든 크리에이터는 nodd가 직접 검증합니다.</div>
          </div>
          <div class="card">
            <div class="num">03</div>
            <div class="icon">🚀</div>
            <div class="title">48시간 내 수령</div>
            <div class="desc">평균 48시간, 최대 72시간 이내에 완성된 콘텐츠를 받아보세요. 마음에 안 들면 무료 재작업.</div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('nodd-how-it-works', NoddHowItWorks);
