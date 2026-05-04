class NoddCreators extends HTMLElement {
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
    const creators = [
      { name: '민준 @jun.ai', type: '대학교 2학년 · 영상편집 전공', tags: ['게임', '테크', 'AI'], price: '₩150,000~', rating: '4.9 (83)', badge: 'TOP', class: 'cc-t1', emoji: '🎮' },
      { name: '소연 @soyeon.v', type: '고등학교 3학년 · 뷰티 크리에이터', tags: ['뷰티', '라이프', 'Reels'], price: '₩90,000~', rating: '5.0 (47)', badge: 'HOT', class: 'cc-t2', emoji: '💄' },
      { name: '태양 @taeyang.eats', type: '대학교 1학년 · 영상 콘텐츠', tags: ['푸드', 'TikTok', '리뷰'], price: '₩80,000~', rating: '4.8 (21)', badge: 'NEW', class: 'cc-t3', emoji: '🍕' },
      { name: '하은 @haeun.app', type: '대학교 3학년 · 앱 마케팅 특화', tags: ['앱광고', 'UX', 'B2B'], price: '₩200,000~', rating: '4.9 (112)', badge: 'TOP', class: 'cc-t4', emoji: '📱' }
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

        .head { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 48px; }
        .sec-label { font-size: 12px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--accent-dark); margin-bottom: 20px; }
        .sec-title { font-family: var(--font-d); font-size: clamp(40px, 5vw, 66px); font-weight: 800; letter-spacing: -2px; line-height: 1; margin-bottom: 20px; color: var(--black); }

        .btn-outline {
          font-family: var(--font-d);
          font-size: 14px;
          font-weight: 700;
          padding: 14px 28px;
          border-radius: 100px;
          border: 1.5px solid rgba(0,0,0,0.16);
          background: transparent;
          cursor: pointer;
          transition: all 0.2s var(--ease);
        }
        .btn-outline:hover { border-color: var(--black); background: rgba(0,0,0,0.04); }

        .grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .card {
          background: var(--white);
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.3s var(--ease), box-shadow 0.3s;
          cursor: pointer;
        }

        .card:hover { transform: translateY(-8px); box-shadow: 0 20px 60px rgba(0,0,0,0.09); }

        .thumb { height: 200px; position: relative; display: flex; align-items: center; justify-content: center; font-size: 58px; }
        .cc-t1 { background: linear-gradient(135deg, #1a0533, #3d0a6e); }
        .cc-t2 { background: linear-gradient(135deg, #0f2027, #203a43, #2c5364); }
        .cc-t3 { background: linear-gradient(135deg, #200122, #6f0000); }
        .cc-t4 { background: linear-gradient(135deg, #0a0a0a, #1a1a2e); }

        .badge { position: absolute; top: 12px; right: 12px; background: var(--accent); color: var(--black); border-radius: 100px; padding: 3px 10px; font-size: 11px; font-weight: 800; letter-spacing: 0.05em; }

        .info { padding: 18px; }
        .name { font-family: var(--font-d); font-weight: 700; font-size: 17px; margin-bottom: 4px; color: var(--black); }
        .type { font-size: 12px; color: rgba(0,0,0,0.38); margin-bottom: 12px; }
        .tags { display: flex; gap: 6px; flex-wrap: wrap; }
        .tag { font-size: 11px; padding: 3px 10px; border-radius: 100px; border: 1px solid rgba(0,0,0,0.1); color: rgba(0,0,0,0.48); background: rgba(0,0,0,0.03); }

        .foot { padding: 0 18px 18px; display: flex; justify-content: space-between; align-items: center; }
        .price { font-family: var(--font-d); font-weight: 700; font-size: 16px; color: var(--black); }
        .rating { font-size: 13px; color: rgba(0,0,0,0.38); }
        .rating em { color: #f59e0b; font-style: normal; }

        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s var(--ease), transform 0.7s var(--ease);
        }
        .reveal.visible { opacity: 1; transform: none; }

        @media (max-width: 1024px) { .grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) {
          :host { padding: 80px 0; }
          .inner { padding: 0 24px; }
          .grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) { .grid { grid-template-columns: 1fr; } }
      </style>
      <div class="inner">
        <div class="head reveal">
          <div>
            <div class="sec-label">Featured Creators</div>
            <h2 class="sec-title">지금 핫한<br>크리에이터들</h2>
          </div>
          <button class="btn-outline" onclick="window.openModal('signup')">전체 보기 →</button>
        </div>
        <div class="grid">
          ${creators.map((c, i) => `
            <div class="card reveal" style="transition-delay: ${i * 0.1}s">
              <div class="thumb ${c.class}">
                <span style="font-size:52px">${c.emoji}</span>
                <div class="badge">${c.badge}</div>
              </div>
              <div class="info">
                <div class="name">${c.name}</div>
                <div class="type">${c.type}</div>
                <div class="tags">
                  ${c.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                </div>
              </div>
              <div class="foot">
                <div class="price">${c.price}</div>
                <div class="rating"><em>★</em> ${c.rating}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}

customElements.define('nodd-creators', NoddCreators);
