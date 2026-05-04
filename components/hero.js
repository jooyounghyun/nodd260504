class NoddHero extends HTMLElement {
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
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          z-index: 1;
        }

        .hero {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 140px 48px 80px;
          min-height: 100vh;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(184, 224, 0, 0.15);
          border: 1px solid rgba(122, 170, 0, 0.28);
          border-radius: 100px;
          padding: 6px 16px 6px 8px;
          font-size: 13px;
          font-weight: 600;
          color: var(--accent-dark);
          margin-bottom: 32px;
          width: fit-content;
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          background: var(--accent-dark);
          border-radius: 50%;
          animation: blink 2s ease infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        .headline {
          font-family: var(--font-d);
          font-size: clamp(56px, 8vw, 118px);
          font-weight: 800;
          line-height: 0.92;
          letter-spacing: -3px;
          color: var(--black);
          margin-bottom: 32px;
        }

        .outline {
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(0,0,0,0.18);
        }

        .lime {
          color: var(--accent-dark);
        }

        .sub {
          max-width: 520px;
          font-size: 18px;
          font-weight: 300;
          color: rgba(0,0,0,0.48);
          line-height: 1.75;
          margin-bottom: 48px;
        }

        .sub strong {
          color: rgba(0,0,0,0.78);
          font-weight: 500;
        }

        .actions {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .btn {
          font-family: var(--font-d);
          font-size: 16px;
          font-weight: 700;
          border: none;
          border-radius: 100px;
          padding: 18px 40px;
          cursor: pointer;
          letter-spacing: -0.3px;
          transition: transform 0.25s var(--ease), box-shadow 0.25s;
        }

        .btn-dark {
          background: var(--black);
          color: var(--white);
        }

        .btn-dark:hover {
          transform: scale(1.05) translateY(-2px);
          box-shadow: 0 20px 56px rgba(0,0,0,0.18);
        }

        .btn-outline {
          background: transparent;
          color: var(--black);
          border: 1.5px solid rgba(0,0,0,0.16);
        }

        .btn-outline:hover {
          border-color: var(--black);
          background: rgba(0,0,0,0.04);
        }

        .stats {
          display: flex;
          gap: 48px;
          margin-top: 72px;
          padding-top: 40px;
          border-top: 1px solid rgba(0,0,0,0.1);
        }

        .stat-num {
          font-family: var(--font-d);
          font-size: 36px;
          font-weight: 800;
          letter-spacing: -1.5px;
          color: var(--black);
        }

        .stat-num em {
          color: var(--accent-dark);
          font-style: normal;
        }

        .stat-lbl {
          font-size: 13px;
          color: rgba(0,0,0,0.38);
          margin-top: 2px;
        }

        .card {
          position: absolute;
          right: 6%;
          top: 50%;
          transform: translateY(-50%);
          width: 316px;
          background: var(--white);
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 24px 80px rgba(0,0,0,0.09);
          animation: cardFloat 5s ease-in-out infinite;
        }

        @keyframes cardFloat {
          0%, 100% { transform: translateY(-50%) translateY(0); }
          50% { transform: translateY(-50%) translateY(-14px); }
        }

        .hc-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
        .hc-avatar { width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, var(--accent3), var(--accent2)); display: flex; align-items: center; justify-content: center; font-family: var(--font-d); font-weight: 800; font-size: 16px; color: #fff; }
        .hc-name { font-weight: 600; font-size: 15px; color: var(--black); }
        .hc-tag { font-size: 11px; font-weight: 700; color: var(--accent-dark); background: rgba(184,224,0,0.15); border-radius: 100px; padding: 2px 8px; display: inline-block; margin-top: 2px; }
        .hc-thumb { width: 100%; height: 154px; background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460); border-radius: 12px; margin-bottom: 14px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
        .hc-thumb span { font-size: 13px; color: rgba(255,255,255,0.55); z-index: 1; }
        .hc-thumb::after { content: '▶'; position: absolute; font-size: 18px; color: #fff; width: 46px; height: 46px; border-radius: 50%; background: rgba(255,255,255,0.18); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; }
        .hc-badge { display: inline-flex; align-items: center; gap: 6px; background: linear-gradient(90deg, rgba(91,63,255,.1), rgba(255,77,109,.1)); border: 1px solid rgba(91,63,255,.2); border-radius: 100px; padding: 4px 12px; font-size: 12px; font-weight: 600; color: var(--accent3); margin-bottom: 14px; }
        .hc-foot { display: flex; justify-content: space-between; align-items: center; }
        .hc-price { font-family: var(--font-d); font-weight: 800; font-size: 22px; color: var(--black); }
        .hc-price span { font-size: 13px; font-weight: 400; color: var(--muted); }
        .hc-dl { font-size: 12px; font-weight: 600; color: var(--accent-dark); }

        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s var(--ease), transform 0.8s var(--ease);
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 1024px) {
          .card { display: none; }
        }
        @media (max-width: 768px) {
          .hero { padding: 120px 24px 60px; }
          .headline { letter-spacing: -2px; }
          .stats { flex-wrap: wrap; gap: 28px; }
        }

        /* Delays */
        .d-1 { transition-delay: 0.1s; }
        .d-2 { transition-delay: 0.2s; }
        .d-3 { transition-delay: 0.3s; }
        .d-4 { transition-delay: 0.4s; }
        .d-5 { transition-delay: 0.5s; }
        .d-6 { transition-delay: 0.65s; }
      </style>
      <div class="hero">
        <div class="badge reveal d-1"><div class="badge-dot"></div>검증된 Gen-Z 크리에이터와 연결되세요</div>
        <h1 class="headline reveal d-2">AI 콘텐츠,<br><span class="outline">더 빠르게.</span><br><span class="lime">더 트렌디하게.</span></h1>
        <p class="sub reveal d-3"><strong>고등학생 · 대학생 크리에이터</strong>가 만드는<br>AI 쇼츠 광고 · 앱 콘텐츠 매칭 플랫폼.<br>진짜 Z세대만이 알고 있는 트렌드로.</p>
        <div class="actions reveal d-4">
          <button class="btn btn-dark" onclick="window.openModal('signup')">지금 시작하기</button>
          <button class="btn btn-outline" onclick="window.openModal('creator')">크리에이터로 활동하기 →</button>
        </div>
        <div class="stats reveal d-5">
          <div><div class="stat-num">2,400<em>+</em></div><div class="stat-lbl">검증된 크리에이터</div></div>
          <div><div class="stat-num">48<em>h</em></div><div class="stat-lbl">평균 납품 시간</div></div>
          <div><div class="stat-num">98<em>%</em></div><div class="stat-lbl">브랜드 재구매율</div></div>
          <div><div class="stat-num">₩0</div><div class="stat-lbl">브랜드 가입비</div></div>
        </div>
        <div class="card reveal d-6">
          <div class="hc-header"><div class="hc-avatar">J</div><div><div class="hc-name">지수 @ji.creates</div><span class="hc-tag">✓ 검증 크리에이터</span></div></div>
          <div class="hc-thumb"><span>AI 뷰티 쇼츠 · 15sec</span></div>
          <div class="hc-badge">⚡ AI-Enhanced Edit</div>
          <div class="hc-foot"><div><div class="hc-price">₩120,000 <span>/ 쇼츠 1편</span></div><div class="hc-dl">⏱ 48시간 내 납품</div></div><button class="btn btn-dark" style="font-size:13px;padding:8px 16px" onclick="window.openModal('signup')">의뢰하기</button></div>
        </div>
      </div>
    `;
  }
}

customElements.define('nodd-hero', NoddHero);
