class NoddPricing extends HTMLElement {
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

        .sec-label { font-size: 12px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--accent-dark); margin-bottom: 20px; text-align: center; }
        .sec-title { font-family: var(--font-d); font-size: clamp(40px, 5vw, 66px); font-weight: 800; letter-spacing: -2px; line-height: 1; margin-bottom: 20px; color: var(--black); text-align: center; }
        .sec-sub { font-size: 17px; color: rgba(0,0,0,0.44); font-weight: 300; max-width: 540px; line-height: 1.75; margin: 0 auto; text-align: center; }

        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 64px;
        }

        .card {
          background: var(--white);
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 20px;
          padding: 40px 32px;
          position: relative;
          transition: transform 0.3s var(--ease), box-shadow 0.3s;
        }

        .card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(0,0,0,0.09); }

        .card.featured {
          background: var(--black);
          border-color: var(--black);
          color: var(--white);
        }

        .p-badge {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--accent);
          color: var(--black);
          border-radius: 100px;
          padding: 4px 16px;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.1em;
          white-space: nowrap;
        }

        .plan { font-size: 12px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 16px; color: rgba(0,0,0,0.38); }
        .card.featured .plan { color: rgba(255,255,255,0.45); }

        .price { font-family: var(--font-d); font-size: 52px; font-weight: 800; letter-spacing: -2px; line-height: 1; margin-bottom: 4px; color: var(--black); }
        .card.featured .price { color: var(--white); }

        .period { font-size: 14px; color: rgba(0,0,0,0.38); margin-bottom: 8px; }
        .card.featured .period { color: rgba(255,255,255,0.38); }

        .desc { font-size: 14px; color: rgba(0,0,0,0.48); margin-bottom: 32px; line-height: 1.65; }
        .card.featured .desc { color: rgba(255,255,255,0.5); }

        .list { list-style: none; margin-bottom: 36px; padding: 0; }
        .feat { font-size: 14px; color: rgba(0,0,0,0.62); padding: 10px 0; border-bottom: 1px solid rgba(0,0,0,0.06); display: flex; align-items: center; gap: 10px; }
        .card.featured .feat { color: rgba(255,255,255,0.55); border-bottom-color: rgba(255,255,255,0.08); }

        .check { color: var(--accent-dark); font-size: 16px; flex-shrink: 0; }
        .card.featured .check { color: var(--accent); }

        .btn {
          width: 100%;
          font-family: var(--font-d);
          font-size: 15px;
          font-weight: 700;
          padding: 16px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          transition: all 0.2s var(--ease);
          letter-spacing: -0.3px;
        }

        .btn-ghost { background: rgba(0,0,0,0.05); color: var(--black); border: 1px solid rgba(0,0,0,0.1); }
        .btn-ghost:hover { background: rgba(0,0,0,0.1); }

        .btn-lime { background: var(--accent); color: var(--black); }
        .btn-lime:hover { transform: scale(1.03); box-shadow: 0 10px 40px rgba(184,224,0,0.38); }

        .note {
          margin-top: 28px;
          padding: 22px 28px;
          text-align: center;
          background: rgba(184,224,0,0.1);
          border: 1px solid rgba(122,170,0,0.22);
          border-radius: 14px;
          font-size: 15px;
        }
        .note strong { color: var(--accent-dark); }
        .note span { color: rgba(0,0,0,0.48); }

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
        }
      </style>
      <div class="inner">
        <div class="sec-label reveal">Pricing</div>
        <h2 class="sec-title reveal">투명한<br>가격 구조</h2>
        <p class="sec-sub reveal">숨겨진 비용 없이. 브랜드 가입은 무료, 성공 시에만 수수료.</p>
        
        <div class="grid">
          <div class="card reveal">
            <div class="plan">Starter</div>
            <div class="price">₩0</div>
            <div class="period">가입비 없음</div>
            <div class="desc">처음 시작하는 브랜드를 위한 플랜. 소규모 테스트에 최적.</div>
            <ul class="list">
              <li class="feat"><span class="check">✓</span>월 3회 콘텐츠 의뢰</li>
              <li class="feat"><span class="check">✓</span>크리에이터 매칭 AI</li>
              <li class="feat"><span class="check">✓</span>72시간 납품</li>
              <li class="feat"><span class="check">✓</span>1회 무료 수정</li>
            </ul>
            <button class="btn btn-ghost" onclick="window.openModal('signup')">무료로 시작</button>
          </div>
          
          <div class="card featured reveal" style="transition-delay: 0.1s">
            <div class="p-badge">🔥 MOST POPULAR</div>
            <div class="plan">Growth</div>
            <div class="price">₩99,000</div>
            <div class="period">/ 월 구독</div>
            <div class="desc">성장하는 브랜드의 선택. 더 빠르게, 더 많이.</div>
            <ul class="list">
              <li class="feat"><span class="check">✓</span>월 15회 콘텐츠 의뢰</li>
              <li class="feat"><span class="check">✓</span>우선 매칭 & 전담 매니저</li>
              <li class="feat"><span class="check">✓</span>48시간 납품 보장</li>
              <li class="feat"><span class="check">✓</span>무제한 수정</li>
              <li class="feat"><span class="check">✓</span>성과 분석 대시보드</li>
            </ul>
            <button class="btn btn-lime" onclick="window.openModal('signup')">지금 구독하기</button>
          </div>
          
          <div class="card reveal" style="transition-delay: 0.2s">
            <div class="plan">Enterprise</div>
            <div class="price">맞춤</div>
            <div class="period">견적 상담</div>
            <div class="desc">대형 브랜드 · 에이전시를 위한 맞춤형 솔루션.</div>
            <ul class="list">
              <li class="feat"><span class="check">✓</span>무제한 콘텐츠 의뢰</li>
              <li class="feat"><span class="check">✓</span>전담 크리에이터 팀 구성</li>
              <li class="feat"><span class="check">✓</span>24시간 납품 옵션</li>
              <li class="feat"><span class="check">✓</span>화이트라벨 & API 연동</li>
              <li class="feat"><span class="check">✓</span>글로벌 (KR + US) 크리에이터</li>
            </ul>
            <button class="btn btn-ghost" onclick="window.location.href='mailto:hello@nodd.io'">문의하기 →</button>
          </div>
        </div>
        
        <div class="note reveal">
          <strong>크리에이터 가입은 항상 무료</strong><span> — 수익의 80%를 가져가세요. 수수료는 20%만.</span>
        </div>
      </div>
    `;
  }
}

customElements.define('nodd-pricing', NoddPricing);
