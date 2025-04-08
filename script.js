document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let width, height;
  let stars = [];
  let lines = [];
  const STAR_COUNT = 250;
  const LINE_DIST = 200;
  let mouseX = 0.5, mouseY = 0.5;

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  window.addEventListener('mousemove', e => {
    mouseX = e.clientX / width;
    mouseY = e.clientY / height;
  });

  function initStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * width,
        o: 1
      });
    }
  }

  function drawStars() {
    ctx.fillStyle = 'rgba(255,255,255,1)';
    for (const s of stars) {
      const k = 128.0 / s.z;
      const sx = (s.x - width / 2) * k + width / 2 + (mouseX - 0.5) * 80;
      const sy = (s.y - height / 2) * k + height / 2 + (mouseY - 0.5) * 80;
      const r = Math.max(0, 2 * (1 - s.z / width));
      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function updateStars() {
    for (const s of stars) {
      s.z -= 0.4;
      if (s.z <= 1) {
        s.x = Math.random() * width;
        s.y = Math.random() * height;
        s.z = width;
      }
    }
  }

  function initLines() {
    lines = [];
    for (let i = 0; i < 120; i++) {
      lines.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2
      });
    }
  }

  function updateLines() {
    for (const p of lines) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
    }
  }

  function drawLines() {
    ctx.strokeStyle = 'rgba(0,255,0,0.3)';
    ctx.lineWidth = 1;
    for (let i = 0; i < lines.length; i++) {
      for (let j = i + 1; j < lines.length; j++) {
        const p1 = lines[i];
        const p2 = lines[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINE_DIST) {
          ctx.globalAlpha = (1 - dist / LINE_DIST) * 0.5;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
  }

  function animate() {
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(0, 0, width, height);

    updateStars();
    drawStars();

    updateLines();
    drawLines();

    requestAnimationFrame(animate);
  }

  initStars();
  initLines();
  animate();

  // Accordion toggle - mutually exclusive, synchronized
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const isActive = header.classList.contains('active');

      accordionHeaders.forEach(h => h.classList.remove('active'));
      document.querySelectorAll('.accordion-content').forEach(content => {
        content.style.maxHeight = null;
      });

      if (!isActive) {
        header.classList.add('active');
        const content = header.nextElementSibling;
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // Initialize open states on load
  document.querySelectorAll('.accordion-content').forEach(content => {
    content.style.maxHeight = null;
  });
});
