/* ============================================================
   EDUMOE V2 — SHARED JAVASCRIPT
   All pages use this file.
   ============================================================ */

// ─── SUPABASE CLIENT ──────────────────────────────────────────
const SUPABASE_URL = 'https://ajhbaomxdsvnegjiypob.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqaGJhb214ZHN2bmVnaml5cG9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwNDY3NzQsImV4cCI6MjA4NzYyMjc3NH0.FptC_9E49l7V_GhYiVmVwf4Ee8bXkcgcWmc96POmKGI';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);

// ─── CANVAS BACKGROUND ──────────────────────────────────────
function initBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');

  const texts = [
    "V = IR", "P = VI", "ε = -dΦ/dt", "∮E·dA = Q/ε₀", "∑V = 0",
    "V = L·dI/dt", "F = qE", "F = ma", "U = kq₁q₂/r", "C = Q/V",
    "R = ρL/A", "Lenz's Law", "Kirchhoff's Law", "Ohm's Law",
    "∫x²dx = x³/3 + C", "d/dx sin(x) = cos(x)", "lim(x→0) sinx/x = 1",
    "Σ 1/n² = π²/6", "dy/dx + P(x)y = Q(x)", "y'' + 2y' + 5y = 0",
    "A·B = Y", "A+B = Y", "A' = Y", "(AB)' = Y", "(A+B)' = Y",
    "A⊕B = Y", "A⊙B = Y",
    "cout << hello;", "int* ptr = &x;", "#include <iostream>",
    "using namespace std;", "for(int i=0;i<10;i++)", "if(x>0) {}",
    "struct Node { int data; };", "class Student { };",
    "A ∪ B", "A ∩ B", "A ⊆ B", "(A∪B)' = A'∩B'", "P ∧ Q → P",
    "∀x ∃y", "∅", "{}",
    "1010₂ = 10₁₀", "1111₂ = 15₁₀", "0101₂ = 5₁₀", "1100₂ = 12₁₀",
    "P(A|B) = P(B|A)P(A)/P(B)", "P(X=k)=C(n,k)pᵏ(1-p)ⁿ⁻ᵏ",
    "P(X=k)=e⁻ˡλᵏ/k!", "E[X] = μ", "Var(X) = σ²"
  ];

  const particles = [];
  for (let i = 0; i < 180; i++) {
    particles.push({
      text: texts[Math.floor(Math.random() * texts.length)],
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.2,
      alpha: 0.06 + Math.random() * 0.12,
      size: 12 + Math.random() * 14
    });
  }

  let mouseX = 0,
    mouseY = 0;
  canvas.addEventListener('mousemove', (e) => { mouseX = e.clientX;
    mouseY = e.clientY; });
  canvas.addEventListener('mouseleave', () => { mouseX = -9999;
    mouseY = -9999; });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
      const dx = p.x - mouseX,
        dy = p.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120 * 0.8;
        const angle = Math.atan2(dy, dx);
        p.x += Math.cos(angle) * force;
        p.y += Math.sin(angle) * force;
      }
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -50) p.x = canvas.width + 50;
      if (p.x > canvas.width + 50) p.x = -50;
      if (p.y < -50) p.y = canvas.height + 50;
      if (p.y > canvas.height + 50) p.y = -50;
      ctx.font = `${p.size}px 'Fira Code', monospace`;
      ctx.fillStyle = `rgba(100, 100, 150, ${p.alpha})`;
      ctx.fillText(p.text, p.x, p.y);
    }
    requestAnimationFrame(draw);
  }
  draw();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ─── THEME SYSTEM ──────────────────────────────────────────────
function setTheme(theme, el) {
  if (theme === 'ruby') {
    document.documentElement.removeAttribute('data-theme');
    document.getElementById('customColorPicker').value = '#e11d48';
    document.getElementById('customColorWrap').style.background = '#e11d48';
    localStorage.removeItem('edumoe-custom-color');
    localStorage.setItem('edumoe-theme', 'ruby');
    showToast('Theme: Ruby');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('edumoe-theme', theme);
    const colorMap = { lava: '#ff5a1f', space: '#7c3aed', oxford: '#00d4ff', light: '#111111' };
    if (colorMap[theme]) {
      document.getElementById('customColorPicker').value = colorMap[theme];
      document.getElementById('customColorWrap').style.background = colorMap[theme];
    }
    showToast('Theme: ' + theme);
  }
  document.querySelectorAll('.theme-dot').forEach(d => d.classList.remove('active'));
  if (el) el.classList.add('active');
  const savedColor = localStorage.getItem('edumoe-custom-color');
  if (savedColor) setCustomTheme(savedColor);
}

function setCustomTheme(color) {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  document.documentElement.setAttribute('data-theme', 'custom');
  const root = document.documentElement;
  root.style.setProperty('--custom-accent', color);
  root.style.setProperty('--custom-accent2', `rgb(${Math.min(r+40,255)}, ${Math.min(g+40,255)}, ${Math.min(b+40,255)})`);
  root.style.setProperty('--custom-accent3', `rgb(${Math.min(r+80,255)}, ${Math.min(g+80,255)}, ${Math.min(b+80,255)})`);
  root.style.setProperty('--custom-glow', `rgba(${r},${g},${b},0.35)`);
  root.style.setProperty('--custom-glow2', `rgba(${r},${g},${b},0.14)`);
  root.style.setProperty('--custom-border', `rgba(${r},${g},${b},0.25)`);
  root.style.setProperty('--custom-border2', `rgba(${r},${g},${b},0.45)`);
  root.style.setProperty('--custom-tint', `rgba(${r},${g},${b},0.06)`);
  root.style.setProperty('--custom-tint2', `rgba(${r},${g},${b},0.12)`);
  root.style.setProperty('--custom-tint3', `rgba(${r},${g},${b},0.20)`);

  document.querySelectorAll('.bg-orb-1').forEach(el => {
    el.style.background = `radial-gradient(circle, rgba(${r},${g},${b},0.18) 0%, transparent 70%)`;
  });
  document.querySelectorAll('.bg-orb-2').forEach(el => {
    el.style.background = `radial-gradient(circle, rgba(${Math.min(r+40,255)},${Math.min(g+40,255)},${Math.min(b+40,255)},0.14) 0%, transparent 70%)`;
  });
  document.querySelectorAll('.bg-orb-3').forEach(el => {
    el.style.background = `radial-gradient(circle, rgba(${Math.min(r+80,255)},${Math.min(g+80,255)},${Math.min(b+80,255)},0.10) 0%, transparent 70%)`;
  });

  document.getElementById('customColorWrap').style.background = color;

  document.querySelectorAll('.btn-fire, .nav-cta, .nav-logo-mark, .m-btn-fire, .feature-icon, .nav-logo-mark')
    .forEach(el => {
      el.style.background =
        `linear-gradient(135deg, ${color}, rgb(${Math.min(r+40,255)},${Math.min(g+40,255)},${Math.min(b+40,255)}))`;
    });
  document.querySelectorAll('.float-win-badge').forEach(el => {
    el.style.background = `rgba(${r},${g},${b},0.20)`;
    el.style.color = `rgb(${Math.min(r+40,255)},${Math.min(g+40,255)},${Math.min(b+40,255)})`;
  });
  document.querySelectorAll('.gradient-text').forEach(el => {
    el.style.background =
      `linear-gradient(135deg, rgb(${Math.min(r+40,255)},${Math.min(g+40,255)},${Math.min(b+40,255)}), rgb(${Math.min(r+80,255)},${Math.min(g+80,255)},${Math.min(b+80,255)}))`;
    el.style.webkitBackgroundClip = 'text';
    el.style.webkitTextFillColor = 'transparent';
    el.style.backgroundClip = 'text';
  });
  document.querySelectorAll('.section-label-dot').forEach(el => {
    el.style.background = color;
  });
  document.querySelectorAll('.tab-item.active').forEach(el => {
    el.style.color = `rgb(${Math.min(r+40,255)},${Math.min(g+40,255)},${Math.min(b+40,255)})`;
  });
  document.querySelectorAll('.tab-item.active::after').forEach(el => {
    el.style.background = `rgb(${Math.min(r+40,255)},${Math.min(g+40,255)},${Math.min(b+40,255)})`;
  });

  document.querySelectorAll('.theme-dot').forEach(d => d.classList.remove('active'));
  localStorage.setItem('edumoe-theme', 'custom');
  localStorage.setItem('edumoe-custom-color', color);
}

// ─── TOAST ──────────────────────────────────────────────────────
let toastTimer;

function showToast(msg) {
  const t = document.getElementById('toast');
  const m = document.getElementById('toast-msg');
  if (!t || !m) return;
  m.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}

// ─── ORBIT ANIMATION ───────────────────────────────────────────
function initOrbits() {
  const container = document.getElementById('orbitContainer');
  if (!container) return;

  const windows = [
    { title: "ode.math", badge: "ODE", content: "y'' + 2y' + 5y = 0<br>r = -1 ± 2i<br>y = e⁻ˣ(A·cos2x + B·sin2x)",
      size: "large", radius: 210, speed: 0.4, startAngle: 0 },
    { title: "main.cpp", badge: "C++", content: "#include &lt;iostream&gt;<br>int main() {<br>&nbsp;&nbsp;cout &lt;&lt; \"Hello EDUMOE\";<br>&nbsp;&nbsp;return 0;<br>}",
      size: "large", radius: 210, speed: 0.4, startAngle: Math.PI * 0.5 },
    { title: "normal_dist.py", badge: "STATS", content: "μ=0, σ=1<br>-1σ → 34.1%<br>+1σ → 34.1%<br>68.2% within 1σ",
      size: "large", radius: 210, speed: 0.4, startAngle: Math.PI },
    { title: "half_adder.circ", badge: "LOGIC", content: "A ─┬─ XOR ─ S<br>B ─┘ ┌─ AND ─ C", size: "large",
      radius: 210, speed: 0.4, startAngle: Math.PI * 1.5 },
    { title: "calculus.math", badge: "MATH", content: "∫ x² dx = x³/3 + C<br>d/dx sin(x) = cos(x)", size: "small",
      radius: 170, speed: 0.6, startAngle: Math.PI / 4 },
    { title: "physics.sim", badge: "PHY", content: "V = I·R (Ohm)<br>∮E·dA = Q/ε₀<br>ε = -dΦ/dt", size: "small",
      radius: 170, speed: 0.6, startAngle: Math.PI / 4 + Math.PI * 0.5 },
    { title: "discrete.set", badge: "SET", content: "A ∩ B ∪ C<br>|A ∪ B| = |A|+|B|-|A∩B|<br>(A∪B)' = A'∩B'",
      size: "small", radius: 170, speed: 0.6, startAngle: Math.PI / 4 + Math.PI },
    { title: "cpp_fundamentals.h", badge: "C++", content: "#include &lt;iostream&gt;<br>using namespace std;<br>int* ptr = &x;",
      size: "small", radius: 170, speed: 0.6, startAngle: Math.PI / 4 + Math.PI * 1.5 }
  ];

  const elements = [];
  windows.forEach((win) => {
    const div = document.createElement('div');
    div.className = `float-win ${win.size === 'large' ? 'fw-large' : 'fw-small'}`;
    div.innerHTML = `
          <div class="float-win-topbar">
            <div class="cd cd-r"></div><div class="cd cd-y"></div><div class="cd cd-g"></div>
            <span class="float-win-title">${win.title}</span>
            <span class="float-win-badge">${win.badge}</span>
          </div>
          <div class="float-win-body">${win.content}</div>
        `;
    container.appendChild(div);
    elements.push({
      element: div,
      radius: win.radius,
      speed: win.speed,
      angle: win.startAngle,
      size: win.size
    });
  });

  let lastTime = 0;

  function animate(time) {
    requestAnimationFrame(animate);
    if (!lastTime) lastTime = time;
    const delta = Math.min(0.033, (time - lastTime) / 1000);
    lastTime = time;

    const cx = container.clientWidth / 2;
    const cy = container.clientHeight / 2;

    elements.forEach(win => {
      win.angle += win.speed * delta;
      const x = cx + Math.cos(win.angle) * win.radius;
      const y = cy + Math.sin(win.angle) * win.radius;
      win.element.style.left = `${x - (win.size === 'large' ? 85 : 65)}px`;
      win.element.style.top = `${y - 50}px`;
    });
  }
  requestAnimationFrame(animate);
}

// ─── STATS COUNTER ─────────────────────────────────────────────
function animateStats() {
  const el = document.getElementById('stat-students');
  if (!el) return;
  let count = 0;
  const target = 230;
  const interval = setInterval(() => {
    count += Math.ceil(target / 45);
    if (count >= target) {
      el.textContent = target + '+';
      clearInterval(interval);
    } else {
      el.textContent = count;
    }
  }, 25);
}

// ─── THEME RESTORE ────────────────────────────────────────────
function restoreTheme() {
  const savedTheme = localStorage.getItem('edumoe-theme') || 'ruby';
  const savedColor = localStorage.getItem('edumoe-custom-color');

  if (savedTheme === 'custom' && savedColor) {
    setCustomTheme(savedColor);
    document.getElementById('customColorPicker').value = savedColor;
    document.getElementById('customColorWrap').style.background = savedColor;
  } else if (savedTheme !== 'ruby') {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (savedTheme === 'custom') {
      const wrap = document.getElementById('customColorWrap');
      if (wrap) wrap.style.boxShadow = `0 0 0 2px var(--bg1), 0 0 0 4px var(--txt1)`;
    } else {
      const dot = document.getElementById('td-' + savedTheme);
      if (dot) dot.classList.add('active');
      else document.getElementById('td-ruby')?.classList.add('active');
    }
  });
}

// ─── CUSTOM COLOR PICKER ──────────────────────────────────────
function initColorPicker() {
  const picker = document.getElementById('customColorPicker');
  if (!picker) return;
  picker.addEventListener('input', function(e) {
    const color = e.target.value;
    setCustomTheme(color);
    localStorage.setItem('edumoe-custom-color', color);
    document.querySelectorAll('.theme-dot').forEach(d => d.classList.remove('active'));
    const wrap = document.getElementById('customColorWrap');
    if (wrap) wrap.style.boxShadow = `0 0 0 2px var(--bg1), 0 0 0 4px var(--txt1)`;
    showToast('🎨 Custom color applied!');
  });
}

// ─── MOBILE TAB BAR ────────────────────────────────────────────
function initTabBar() {
  document.querySelectorAll('.tab-item').forEach(tab => {
    tab.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      const label = this.querySelector('span')?.textContent || 'Page';
      showToast(`📱 ${label} coming soon!`);
    });
  });
}

// ─── MODALS ────────────────────────────────────────────────────
function initModals() {
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      e.target.classList.remove('open');
    }
  });
}

// ─── FOOTER YEAR ──────────────────────────────────────────────
function setFooterYear() {
  const el = document.getElementById('yr');
  if (el) el.textContent = new Date().getFullYear();
}

// ─── LOADER ────────────────────────────────────────────────────
function initLoader() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const loader = document.getElementById('loader');
      if (loader) {
        loader.classList.add('out');
        setTimeout(() => loader.style.display = 'none', 500);
      }
      initOrbits();
      animateStats();
      document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
      document.querySelector('.tab-item:first-child')?.classList.add('active');
    }, 800);
  });
}

// ─── PAGE INIT ────────────────────────────────────────────────
function initPage() {
  initBackground();
  restoreTheme();
  initColorPicker();
  initTabBar();
  initModals();
  setFooterYear();
  initLoader();
}

// ─── EXPOSE GLOBALLY ──────────────────────────────────────────
window.setTheme = setTheme;
window.setCustomTheme = setCustomTheme;
window.showToast = showToast;
window.initBackground = initBackground;
window.initOrbits = initOrbits;
window.animateStats = animateStats;
window.initPage = initPage;

// Auto-init if DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPage);
} else {
  initPage();
}
