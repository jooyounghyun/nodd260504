class NoddNavbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['scrolled'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'scrolled') {
      const nav = this.shadowRoot.querySelector('nav');
      if (nav) {
        if (this.hasAttribute('scrolled')) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      }
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
        }

        nav {
          padding: 20px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid transparent;
          transition: background 0.3s, border-color 0.3s, backdrop-filter 0.3s;
          font-family: var(--font-b, sans-serif);
        }

        nav.scrolled {
          background: rgba(247, 245, 240, 0.88);
          backdrop-filter: blur(20px);
          border-color: var(--border, rgba(0,0,0,0.08));
        }

        .logo {
          font-family: var(--font-d, sans-serif);
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -1px;
          color: var(--black, #000);
          cursor: pointer;
        }

        .logo span {
          color: var(--accent-dark, #7aaa00);
        }

        .links {
          display: flex;
          gap: 36px;
          list-style: none;
          font-size: 14px;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.45);
        }

        .links li {
          cursor: pointer;
          transition: color 0.2s;
        }

        .links li:hover {
          color: var(--black, #000);
        }

        .cta {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .btn-ghost {
          font-size: 14px;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.5);
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s;
        }

        .btn-ghost:hover {
          color: var(--black, #000);
        }

        .btn-primary {
          font-size: 14px;
          font-weight: 600;
          background: var(--black, #000);
          color: var(--white, #fff);
          border: none;
          border-radius: 100px;
          padding: 10px 22px;
          cursor: pointer;
          white-space: nowrap;
          transition: transform 0.2s var(--ease, ease), box-shadow 0.2s;
        }

        .btn-primary:hover {
          transform: scale(1.04);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
        }

        @media (max-width: 768px) {
          nav { padding: 16px 24px; }
          .links { display: none; }
        }
      </style>
      <nav>
        <div class="logo" onclick="window.smoothTo('#home')">nodd<span>.</span></div>
        <ul class="links">
          <li onclick="window.smoothTo('#how')">How it works</li>
          <li onclick="window.smoothTo('#creators')">Creators</li>
          <li onclick="window.smoothTo('#pricing')">Pricing</li>
          <li onclick="window.smoothTo('#about')">About</li>
        </ul>
        <div class="cta">
          <button class="btn-ghost" onclick="window.openModal('login')">Log in</button>
          <button class="btn-primary" onclick="window.openModal('signup')">Get started →</button>
        </div>
      </nav>
    `;
  }
}

customElements.define('nodd-navbar', NoddNavbar);
