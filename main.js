const cur = document.getElementById('cursor'), ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

(function tick() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  if (cur) {
    cur.style.left = (mx - 6) + 'px';
    cur.style.top = (my - 6) + 'px';
  }
  if (ring) {
    ring.style.left = (rx - 20) + 'px';
    ring.style.top = (ry - 20) + 'px';
  }
  requestAnimationFrame(tick);
})();

window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }
});

function smoothTo(id) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
}

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

document.querySelectorAll('.step-card, .why-card, .creator-card, .p-card, .t-card').forEach((el, i) => {
  el.style.transitionDelay = (i * 0.07) + 's';
  el.classList.add('reveal');
  io.observe(el);
});

function openModal(type) {
  const overlay = document.getElementById('modalOverlay');
  const mc = document.getElementById('modalContent');
  if (!overlay || !mc) return;

  overlay.classList.add('open');

  if (type === 'login') {
    mc.innerHTML = \`
      <div class="modal-title">다시 만나요 👋</div>
      <div class="modal-sub">nodd에 로그인하세요</div>
      <button class="btn-social">🇰 카카오로 로그인</button>
      <button class="btn-social">G Google로 로그인</button>
      <div class="modal-divider">또는 이메일로</div>
      <div class="form-group">
        <label class="form-label">이메일</label>
        <input type="email" class="form-input" placeholder="hello@nodd.io">
      </div>
      <div class="form-group">
        <label class="form-label">비밀번호</label>
        <input type="password" class="form-input" placeholder="••••••••">
      </div>
      <button class="btn-submit">로그인</button>
      <div style="text-align:center;margin-top:16px;font-size:13px;color:rgba(0,0,0,0.4)">
        계정이 없으신가요? <span style="color:var(--accent-dark);cursor:pointer;font-weight:700" onclick="openModal('signup')">가입하기</span>
      </div>\`;
  } else if (type === 'creator') {
    mc.innerHTML = \`
      <div class="modal-title">크리에이터 지원 ✨</div>
      <div class="modal-sub">nodd의 검증된 크리에이터로 활동하세요</div>
      <div class="form-group">
        <label class="form-label">이름</label>
        <input type="text" class="form-input" placeholder="홍길동">
      </div>
      <div class="form-group">
        <label class="form-label">이메일</label>
        <input type="email" class="form-input" placeholder="you@email.com">
      </div>
      <div class="form-group">
        <label class="form-label">학교 / 학년</label>
        <input type="text" class="form-input" placeholder="ex) 서울대학교 2학년">
      </div>
      <div class="form-group">
        <label class="form-label">전문 분야</label>
        <select class="form-select">
          <option>AI 쇼츠 / 릴스</option>
          <option>앱 프로모션 영상</option>
          <option>SNS 광고 콘텐츠</option>
          <option>뷰티 / 라이프스타일</option>
          <option>게임 / 테크</option>
          <option>푸드 / 여행</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">포트폴리오 링크 (선택)</label>
        <input type="text" class="form-input" placeholder="Instagram / YouTube / TikTok URL">
      </div>
      <button class="btn-submit">지원하기 →</button>
      <div style="text-align:center;margin-top:12px;font-size:12px;color:rgba(0,0,0,0.35)">심사 후 3영업일 내 연락드립니다</div>\`;
  } else {
    mc.innerHTML = \`
      <div class="modal-title">nodd 시작하기 🚀</div>
      <div class="modal-sub">브랜드 또는 크리에이터로 가입하세요</div>
      <div class="modal-tabs">
        <button class="modal-tab active" id="tb" onclick="switchTab('brand')">브랜드 / 기업</button>
        <button class="modal-tab" id="tc" onclick="switchTab('creator')">크리에이터</button>
      </div>
      <div id="tab-brand">
        <button class="btn-social">🇰 카카오로 시작</button>
        <button class="btn-social">G Google로 시작</button>
        <div class="modal-divider">또는 이메일로</div>
        <div class="form-group">
          <label class="form-label">회사명</label>
          <input type="text" class="form-input" placeholder="(주)노드코퍼레이션">
        </div>
        <div class="form-group">
          <label class="form-label">이메일</label>
          <input type="email" class="form-input" placeholder="marketing@company.com">
        </div>
        <button class="btn-submit">무료로 시작하기</button>
      </div>
      <div id="tab-creator" style="display:none">
        <div class="form-group">
          <label class="form-label">이름</label>
          <input type="text" class="form-input" placeholder="홍길동">
        </div>
        <div class="form-group">
          <label class="form-label">이메일</label>
          <input type="email" class="form-input" placeholder="you@email.com">
        </div>
        <div class="form-group">
          <label class="form-label">학교 / 학년</label>
          <input type="text" class="form-input" placeholder="고등학교 또는 대학교">
        </div>
        <button class="btn-submit">크리에이터 지원하기</button>
        <div style="text-align:center;margin-top:10px;font-size:12px;color:rgba(0,0,0,0.35)">고등학생 · 대학생만 지원 가능</div>
      </div>\`;
  }
}

window.openModal = openModal;

function switchTab(t) {
  const tb = document.getElementById('tb');
  const tc = document.getElementById('tc');
  const tabBrand = document.getElementById('tab-brand');
  const tabCreator = document.getElementById('tab-creator');

  if (tb && tc && tabBrand && tabCreator) {
    tb.classList.toggle('active', t === 'brand');
    tc.classList.toggle('active', t === 'creator');
    tabBrand.style.display = t === 'brand' ? '' : 'none';
    tabCreator.style.display = t === 'creator' ? '' : 'none';
  }
}

window.switchTab = switchTab;

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) {
    overlay.classList.remove('open');
  }
}

window.closeModal = closeModal;

function bgClose(e) {
  if (e.target === document.getElementById('modalOverlay')) {
    closeModal();
  }
}

window.bgClose = bgClose;

function handleCTA() {
  const emailInput = document.getElementById('ctaEmail');
  if (emailInput) {
    const v = emailInput.value;
    if (v) openModal('signup');
    else emailInput.focus();
  }
}

window.handleCTA = handleCTA;
window.smoothTo = smoothTo;
