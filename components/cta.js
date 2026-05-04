class NoddCTA extends HTMLElement {
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

  handleCTA() {
    const email = this.shadowRoot.getElementById('ctaEmail').value;
    if (email) {
      window.openModal('signup');
    } else {
      this.shadowRoot.getElementById('ctaEmail').focus();
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 120px 0;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
        }

        .box {
          max-width: 800px;
          margin: 0 auto;
          padding: 80px 48px;
          background: var(--black);
          border-radius: 32px;
          position: relative;
          overflow: hidden;
        }

        .box::before {
          content: '';
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 60%; height: 1px;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
        }

        .title { font-family: var(--font-d); font-size: clamp(40px, 5vw, 62px); font-weight: 800; letter-spacing: -2px; line-height: 1.05; margin-bottom: 18px; color: var(--white); }
        .lime { color: var(--accent); }
        .sub { font-size: 17px; color: rgba(255,255,255,0.48); margin-bottom: 48px; }

        .form { display: flex; gap: 12px; max-width: 480px; margin: 0 auto; }
        
        input {
          flex: 1;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 100px;
          padding: 16px 24px;
          color: var(--white);
          font-family: var(--font-b);
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s;
        }
        input::placeholder { color: rgba(255,255,255,0.3); }
        input:focus { border-color: rgba(184,224,0,0.5); }

        .btn {
          font-family: var(--font-d);
          font-size: 16px;
          font-weight: 700;
          background: var(--accent);
          color: var(--black);
          border: none;
          border-radius: 100px;
          padding: 16px 28px;
          cursor: pointer;
          white-space: nowrap;
          transition: transform 0.25s var(--ease), box-shadow 0.25s;
        }
        .btn:hover { transform: scale(1.05); box-shadow: 0 16px 48px rgba(184,224,0,0.35); }

        .note { font-size: 13px; color: rgba(255,255,255,0.28); margin-top: 16px; }

        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s var(--ease), transform 0.7s var(--ease);
        }
        .reveal.visible { opacity: 1; transform: none; }

        @media (max-width: 768px) {
          :host { padding: 80px 0; }
          .inner { padding: 0 24px; }
          .box { padding: 60px 24px; }
          .form { flex-direction: column; }
        }
      </style>
      <div class="inner reveal">
        <div class="box">
          <div class="title">지금 바로<br><span class="lime">nodd</span>를 시작하세요</div>
          <p class="sub">브랜드는 무료로 가입. 크리에이터는 바로 수익 창출.</p>
          <div class="form">
            <input type="email" placeholder="이메일 주소를 입력하세요" id="ctaEmail">
            <button class="btn" id="ctaBtn">시작하기 →</button>
          </div>
          <div class="note">신용카드 불필요 · 가입비 없음 · 언제든 취소 가능</div>
        </div>
      </div>
    `;

    this.shadowRoot.getElementById('ctaBtn').addEventListener('click', () => this.handleCTA());
  }
}

customElements.define('nodd-cta', NoddCTA);
