class NoddReviews extends HTMLElement {
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
    const reviews = [
      { text: '"에이전시에 맡기면 2주 걸리던 쇼츠 광고를 48시간 만에 받았어요. 퀄리티도 솔직히 더 나았습니다."', author: '김도현', role: '스타트업 마케터 · 앱 서비스', initial: '김', avClass: 'av1' },
      { text: '"대학교 다니면서 월 200만원 버는 게 진짜라고요? nodd 덕분에 포트폴리오도 쌓이고 수익도 생겼어요."', author: '이지은', role: 'nodd 크리에이터 · 대학교 2학년', initial: '이', avClass: 'av2' },
      { text: '"타겟이 Z세대인데 Z세대가 직접 만든 광고라니. CTR이 기존 광고 대비 3배 올랐습니다. 계속 쓸 거예요."', author: '박서연', role: '패션 브랜드 CMO', initial: '박', avClass: 'av3' }
    ];

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
          gap: 16px;
          margin-top: 64px;
        }

        .card {
          background: var(--white);
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 20px;
          padding: 32px;
          transition: border-color 0.3s, box-shadow 0.3s;
        }

        .card:hover { border-color: rgba(184,224,0,0.4); box-shadow: 0 12px 40px rgba(0,0,0,0.07); }

        .stars { color: #f59e0b; font-size: 14px; margin-bottom: 16px; }
        .text { font-size: 15px; color: rgba(0,0,0,0.62); line-height: 1.8; margin-bottom: 24px; font-style: italic; }
        
        .author { display: flex; align-items: center; gap: 12px; }
        .avatar { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 15px; color: #fff; }
        .av1 { background: linear-gradient(135deg, var(--accent3), var(--accent2)); }
        .av2 { background: linear-gradient(135deg, #22d3ee, #3b82f6); }
        .av3 { background: linear-gradient(135deg, #f59e0b, #ef4444); }

        .name { font-weight: 600; font-size: 14px; color: var(--black); }
        .role { font-size: 12px; color: rgba(0,0,0,0.38); }

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
        <div class="sec-label reveal">Reviews</div>
        <h2 class="sec-title reveal">브랜드와<br>크리에이터의 반응</h2>
        
        <div class="grid">
          ${reviews.map((r, i) => `
            <div class="card reveal" style="transition-delay: ${i * 0.1}s">
              <div class="stars">★★★★★</div>
              <div class="text">${r.text}</div>
              <div class="author">
                <div class="avatar ${r.avClass}">${r.initial}</div>
                <div>
                  <div class="name">${r.author}</div>
                  <div class="role">${r.role}</div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}

customElements.define('nodd-reviews', NoddReviews);
