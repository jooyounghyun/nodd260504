class NoddModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  open(type) {
    this.type = type;
    this.render();
    this.shadowRoot.querySelector('.overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.shadowRoot.querySelector('.overlay').classList.remove('open');
    document.body.style.overflow = '';
  }

  switchTab(tab) {
    this.currentTab = tab;
    this.render();
    // Keep it open
    this.shadowRoot.querySelector('.overlay').classList.add('open');
  }

  render() {
    const type = this.type || 'login';
    const currentTab = this.currentTab || 'brand';

    let content = '';

    if (type === 'login') {
      content = `
        <div class="title">다시 만나요 👋</div>
        <div class="sub">nodd에 로그인하세요</div>
        <button class="btn-social">🇰 카카오로 로그인</button>
        <button class="btn-social">G Google로 로그인</button>
        <div class="divider">또는 이메일로</div>
        <div class="form-group">
          <label class="label">이메일</label>
          <input type="email" class="input" placeholder="hello@nodd.io">
        </div>
        <div class="form-group">
          <label class="label">비밀번호</label>
          <input type="password" class="input" placeholder="••••••••">
        </div>
        <button class="btn-submit">로그인</button>
        <div class="footer-text">계정이 없으신가요? <span class="link" id="toSignup">가입하기</span></div>
      `;
    } else if (type === 'creator') {
      content = `
        <div class="title">크리에이터 지원 ✨</div>
        <div class="sub">nodd의 검증된 크리에이터로 활동하세요</div>
        <div class="form-group">
          <label class="label">이름</label>
          <input type="text" class="input" placeholder="홍길동">
        </div>
        <div class="form-group">
          <label class="label">이메일</label>
          <input type="email" class="input" placeholder="you@email.com">
        </div>
        <div class="form-group">
          <label class="label">학교 / 학년</label>
          <input type="text" class="input" placeholder="ex) 서울대학교 2학년">
        </div>
        <div class="form-group">
          <label class="label">전문 분야</label>
          <select class="select">
            <option>AI 쇼츠 / 릴스</option>
            <option>앱 프로모션 영상</option>
            <option>SNS 광고 콘텐츠</option>
            <option>뷰티 / 라이프스타일</option>
            <option>게임 / 테크</option>
            <option>푸드 / 여행</option>
          </select>
        </div>
        <div class="form-group">
          <label class="label">포트폴리오 링크 (선택)</label>
          <input type="text" class="input" placeholder="Instagram / YouTube / TikTok URL">
        </div>
        <button class="btn-submit">지원하기 →</button>
        <div class="footer-text-muted">심사 후 3영업일 내 연락드립니다</div>
      `;
    } else { // signup
      content = `
        <div class="title">nodd 시작하기 🚀</div>
        <div class="sub">브랜드 또는 크리에이터로 가입하세요</div>
        <div class="tabs">
          <button class="tab ${currentTab === 'brand' ? 'active' : ''}" id="tabBrand">브랜드 / 기업</button>
          <button class="tab ${currentTab === 'creator' ? 'active' : ''}" id="tabCreator">크리에이터</button>
        </div>
        
        ${currentTab === 'brand' ? `
          <div id="tabContentBrand">
            <button class="btn-social">🇰 카카오로 시작</button>
            <button class="btn-social">G Google로 시작</button>
            <div class="divider">또는 이메일로</div>
            <div class="form-group">
              <label class="label">회사명</label>
              <input type="text" class="input" placeholder="(주)노드코퍼레이션">
            </div>
            <div class="form-group">
              <label class="label">이메일</label>
              <input type="email" class="input" placeholder="marketing@company.com">
            </div>
            <button class="btn-submit">무료로 시작하기</button>
          </div>
        ` : `
          <div id="tabContentCreator">
            <div class="form-group">
              <label class="label">이름</label>
              <input type="text" class="input" placeholder="홍길동">
            </div>
            <div class="form-group">
              <label class="label">이메일</label>
              <input type="email" class="input" placeholder="you@email.com">
            </div>
            <div class="form-group">
              <label class="label">학교 / 학년</label>
              <input type="text" class="input" placeholder="고등학교 또는 대학교">
            </div>
            <button class="btn-submit">크리에이터 지원하기</button>
            <div class="footer-text-muted">고등학생 · 대학생만 지원 가능</div>
          </div>
        `}
      `;
    }

    this.shadowRoot.innerHTML = `
      <style>
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(14px);
          z-index: 9000;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s;
        }
        .overlay.open { opacity: 1; pointer-events: all; }

        .modal {
          position: relative;
          background: var(--white, #fff);
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 24px;
          padding: 48px;
          width: 90%;
          max-width: 480px;
          transform: translateY(20px);
          transition: transform 0.3s var(--ease, ease);
          color: var(--black, #000);
          max-height: 90vh;
          overflow-y: auto;
          font-family: var(--font-b, sans-serif);
        }
        .overlay.open .modal { transform: translateY(0); }

        .close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(0,0,0,0.06);
          border: none;
          color: var(--black, #000);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        .close:hover { background: rgba(0,0,0,0.12); }

        .title { font-family: var(--font-d, sans-serif); font-size: 28px; font-weight: 800; margin-bottom: 8px; }
        .sub { font-size: 15px; color: rgba(0,0,0,0.44); margin-bottom: 32px; }

        .tabs { display: flex; gap: 4px; background: rgba(0,0,0,0.05); border-radius: 12px; padding: 4px; margin-bottom: 28px; }
        .tab { flex: 1; text-align: center; padding: 10px; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; color: rgba(0,0,0,0.44); border: none; background: none; transition: all 0.2s; }
        .tab.active { background: var(--black, #000); color: var(--white, #fff); }

        .form-group { margin-bottom: 16px; }
        .label { font-size: 13px; font-weight: 600; color: rgba(0,0,0,0.48); margin-bottom: 8px; display: block; }
        
        .input, .select {
          width: 100%;
          background: rgba(0,0,0,0.04);
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 12px;
          padding: 14px 18px;
          color: var(--black, #000);
          font-family: inherit;
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s;
        }
        .input:focus { border-color: rgba(122,170,0,0.5); }
        .select option { background: #fff; }

        .btn-submit {
          width: 100%;
          font-family: var(--font-d, sans-serif);
          font-size: 16px;
          font-weight: 700;
          background: var(--black, #000);
          color: var(--white, #fff);
          border: none;
          border-radius: 12px;
          padding: 16px;
          cursor: pointer;
          margin-top: 8px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-submit:hover { transform: scale(1.02); box-shadow: 0 10px 40px rgba(0,0,0,0.18); }

        .divider {
          text-align: center;
          font-size: 13px;
          color: rgba(0,0,0,0.28);
          margin: 20px 0;
          position: relative;
        }
        .divider::before, .divider::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 38%;
          height: 1px;
          background: rgba(0,0,0,0.1);
        }
        .divider::before { left: 0; }
        .divider::after { right: 0; }

        .btn-social {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: rgba(0,0,0,0.04);
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 12px;
          padding: 13px;
          color: var(--black, #000);
          font-family: inherit;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          margin-bottom: 10px;
          transition: background 0.2s;
        }
        .btn-social:hover { background: rgba(0,0,0,0.08); }

        .footer-text { text-align: center; margin-top: 16px; font-size: 13px; color: rgba(0,0,0,0.4); }
        .footer-text-muted { text-align: center; margin-top: 12px; font-size: 12px; color: rgba(0,0,0,0.35); }
        .link { color: var(--accent-dark, #7aaa00); cursor: pointer; font-weight: 700; }
      </style>
      <div class="overlay" id="overlay">
        <div class="modal">
          <button class="close" id="btnClose">✕</button>
          <div id="content">${content}</div>
        </div>
      </div>
    `;

    this.shadowRoot.getElementById('btnClose').addEventListener('click', () => this.close());
    this.shadowRoot.getElementById('overlay').addEventListener('click', (e) => {
      if (e.target.id === 'overlay') this.close();
    });

    const toSignup = this.shadowRoot.getElementById('toSignup');
    if (toSignup) {
      toSignup.addEventListener('click', () => {
        this.type = 'signup';
        this.render();
      });
    }

    const tabBrand = this.shadowRoot.getElementById('tabBrand');
    const tabCreator = this.shadowRoot.getElementById('tabCreator');
    if (tabBrand) tabBrand.addEventListener('click', () => this.switchTab('brand'));
    if (tabCreator) tabCreator.addEventListener('click', () => this.switchTab('creator'));
  }
}

customElements.define('nodd-modal', NoddModal);
