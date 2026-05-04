class NoddFooter extends HTMLElement {
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
          padding: 80px 0 40px;
          border-top: 1px solid rgba(0,0,0,0.08);
          background: var(--bg2, #eeeae2);
          position: relative;
          z-index: 1;
        }

        .inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
        }

        .top {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px;
          margin-bottom: 64px;
        }

        .logo {
          font-family: var(--font-d);
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -1px;
          color: var(--black);
          margin-bottom: 14px;
        }
        .logo span { color: var(--accent-dark); }

        .desc { font-size: 14px; color: rgba(0,0,0,0.42); line-height: 1.75; margin-bottom: 24px; max-width: 280px; }

        .socials { display: flex; gap: 10px; }
        .social-btn {
          width: 38px; height: 38px;
          background: rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 15px; cursor: pointer; transition: background 0.2s;
        }
        .social-btn:hover { background: rgba(0,0,0,0.1); }

        .col-title { font-family: var(--font-d); font-weight: 700; font-size: 15px; margin-bottom: 20px; color: var(--black); }

        .links { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 12px; }
        .links li { font-size: 14px; color: rgba(0,0,0,0.42); cursor: pointer; transition: color 0.2s; }
        .links li:hover { color: var(--black); }

        .bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 32px;
          border-top: 1px solid rgba(0,0,0,0.08);
          font-size: 13px;
          color: rgba(0,0,0,0.32);
        }

        .langs { display: flex; gap: 16px; }
        .lang-btn { cursor: pointer; transition: color 0.2s; }
        .lang-btn:hover { color: var(--black); }
        .lang-btn.active { color: var(--accent-dark); font-weight: 700; }

        @media (max-width: 1024px) { .top { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 768px) {
          .inner { padding: 0 24px; }
          .top { grid-template-columns: 1fr; gap: 32px; }
          .bottom { flex-direction: column; gap: 16px; text-align: center; }
        }
      </style>
      <div class="inner">
        <div class="top">
          <div>
            <div class="logo">nodd<span>.</span></div>
            <p class="desc">검증된 Z세대 크리에이터와 브랜드를 연결하는 AI 콘텐츠 매칭 플랫폼. 한국에서 시작해 전 세계로.</p>
            <div class="socials">
              <div class="social-btn">𝕏</div>
              <div class="social-btn">📸</div>
              <div class="social-btn">🎵</div>
              <div class="social-btn">in</div>
            </div>
          </div>
          <div>
            <div class="col-title">Product</div>
            <ul class="links">
              <li>서비스 소개</li>
              <li>크리에이터 지원</li>
              <li>가격 안내</li>
              <li>포트폴리오</li>
              <li>API 연동</li>
            </ul>
          </div>
          <div>
            <div class="col-title">Company</div>
            <ul class="links">
              <li>회사 소개</li>
              <li>블로그</li>
              <li>채용</li>
              <li>파트너십</li>
              <li>문의하기</li>
            </ul>
          </div>
          <div>
            <div class="col-title">Legal</div>
            <ul class="links">
              <li>이용약관</li>
              <li>개인정보처리방침</li>
              <li>크리에이터 정책</li>
              <li>저작권 정책</li>
            </ul>
          </div>
        </div>
        <div class="bottom">
          <div>© 2025 nodd Inc. All rights reserved.</div>
          <div class="langs">
            <span class="lang-btn active">한국어</span>
            <span class="lang-btn">English</span>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('nodd-footer', NoddFooter);
