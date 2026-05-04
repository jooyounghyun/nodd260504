class NoddWhyUs extends HTMLElement {
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
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 64px;
        }

        .card {
          background: var(--white);
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 20px;
          padding: 40px;
          transition: border-color 0.3s, transform 0.3s var(--ease), box-shadow 0.3s;
        }

        .card:hover {
          border-color: rgba(184,224,0,0.5);
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.07);
        }

        .card.wide {
          grid-column: span 2;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }

        .icon { font-size: 40px; margin-bottom: 20px; }
        .title { font-family: var(--font-d); font-size: 24px; font-weight: 700; margin-bottom: 10px; color: var(--black); }
        .desc { font-size: 15px; color: rgba(0,0,0,0.48); line-height: 1.75; }

        .visual {
          height: 200px;
          background: linear-gradient(135deg, rgba(184,224,0,0.12), rgba(91,63,255,0.08));
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 72px;
        }

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
          .card.wide { grid-column: span 1; grid-template-columns: 1fr; }
        }
      </style>
      <div class="inner reveal">
        <div class="sec-label">Why nodd</div>
        <h2 class="sec-title">nodd가<br>다른 이유</h2>
        <div class="grid">
          <div class="card wide">
            <div>
              <div class="icon">⚡</div>
              <div class="title">진짜 Z세대 크리에이터</div>
              <div class="desc">nodd의 크리에이터는 전원 고등학생 · 대학생으로 제한됩니다. 지금 이 순간의 트렌드를 가장 잘 아는 사람들이 만들기 때문에 콘텐츠가 다릅니다. 진짜 Z세대가 Z세대를 겨냥한 광고를 만들 때 결과물이 달라집니다.</div>
            </div>
            <div class="visual">🎬</div>
          </div>
          <div class="card">
            <div class="icon">🤖</div>
            <div class="title">AI-Enhanced 워크플로우</div>
            <div class="desc">단순 제작이 아닙니다. nodd 크리에이터들은 AI 편집 툴, 음악 생성, 자막 자동화까지 활용해 퀄리티와 속도를 동시에 잡습니다.</div>
          </div>
          <div class="card">
            <div class="icon">🛡</div>
            <div class="title">nodd 검증 보증</div>
            <div class="desc">포트폴리오 심사 → 샘플 제출 → 인터뷰까지. 3단계 검증을 통과한 크리에이터만 활동 가능합니다. 브랜드가 안심하고 맡길 수 있습니다.</div>
          </div>
          <div class="card">
            <div class="icon">💳</div>
            <div class="title">공정한 수익 구조</div>
            <div class="desc">크리에이터는 수익의 80%를 직접 수령. nodd는 20% 플랫폼 수수료만 받습니다. 크리에이터가 행복해야 좋은 콘텐츠가 나옵니다.</div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('nodd-why-us', NoddWhyUs);
