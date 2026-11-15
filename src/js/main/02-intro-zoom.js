let ZP = 0,
  $zf = null,
  $zg = null,
  $zc = null,
  $zx = null;
const ZD = o ? 0 : 3900,
  $cl = (a, b, x) => Math.max(0, Math.min(1, (x - a) / (b - a))),
  $ss = (a, b, x) => {
    x = $cl(a, b, x);
    return x * x * (3 - 2 * x);
  },
  $CL = [
    [144, 90, 34, 3.25, 0, 0.5],
    [58, 48, 22, 4.1, 0.3, 1.9],
    [232, 46, 24, 3.7, 0.55, 0.2],
    [50, 138, 26, 4.4, 0.8, 2.6],
    [238, 136, 22, 3.9, 0.15, 1.1],
    [104, 28, 15, 3.3, 0.6, 0.9],
    [190, 160, 18, 4.7, 0.4, 2.2],
    [272, 92, 14, 3.6, 0.2, 0.4],
    [18, 92, 15, 4.2, 0.7, 1.5],
  ];
function $cd(c, cx, cy, R, t, th, z) {
  const dv = $ss(0.35, 0.78, t),
    sep = dv * R * 1.5,
    lobe = R * (1 - 0.18 * dv),
    dr = $ss(0.78, 1, t) * R * 0.55,
    fa = Math.min(1, t / 0.06, (1 - t) / 0.1),
    dx = Math.cos(th),
    dy = Math.sin(th),
    rw = Math.max(0.9 / z, 0.1 * R),
    lb = dv > 0.001 ? [-1, 1] : [0],
    P = (s) => [cx + dx * s * (sep / 2 + dr), cy + dy * s * (sep / 2 + dr)];
  (c.save(), (c.globalAlpha *= fa));
  lb.forEach((s) => {
    const [x, y] = P(s);
    (c.beginPath(),
      c.arc(x, y, lobe + 2.4 * rw, 0, 6.2832),
      (c.fillStyle = "rgba(139,232,107,.16)"),
      c.fill());
  });
  lb.forEach((s) => {
    const [x, y] = P(s);
    (c.beginPath(), c.arc(x, y, lobe, 0, 6.2832), (c.fillStyle = "#8be86b"), c.fill());
  });
  lb.forEach((s) => {
    const [x, y] = P(s);
    (c.beginPath(),
      c.arc(x, y, lobe - rw, 0, 6.2832),
      (c.fillStyle = "#eaffb0"),
      c.fill(),
      c.beginPath(),
      c.arc(x - 0.28 * lobe, y - 0.3 * lobe, 0.16 * lobe, 0, 6.2832),
      (c.fillStyle = "rgba(255,255,255,.55)"),
      c.fill());
  });
  const meta = $ss(0.26, 0.34, t) * (1 - $ss(0.46, 0.52, t));
  lb.forEach((s) => {
    const [x, y] = P(s),
      nr = 0.2 * lobe * (1 - meta);
    nr > 0.4 && (c.beginPath(), c.arc(x, y, nr, 0, 6.2832), (c.fillStyle = "#2f8f4f"), c.fill());
  });
  if (meta > 0.02) {
    const px = -dy,
      py = dx;
    for (let i = 0; i < 3; i++) {
      const o = (i - 1) * 0.2 * R;
      (c.beginPath(),
        c.moveTo(cx + px * o - dx * 0.16 * R * meta, cy + py * o - dy * 0.16 * R * meta),
        c.lineTo(cx + px * o + dx * 0.16 * R * meta, cy + py * o + dy * 0.16 * R * meta),
        (c.lineWidth = Math.max(1.2 / z, 0.07 * R)),
        (c.strokeStyle = "#2f8f4f"),
        c.stroke());
    }
  }
  c.restore();
}
function $zd(T, z, al, W, H) {
  const c = $zx,
    k = H / 180;
  (c.save(),
    (c.globalAlpha = al),
    c.translate(W / 2, H / 2),
    c.scale(z, z),
    c.translate(-W / 2, -H / 2));
  for (const [px, py, R, P, of, th] of $CL) {
    let t;
    t =
      144 === px && 90 === py
        ? ((((T - 2.6) / P + 0.33) % 1) + 1) % 1
        : ((((T + of) / P) % 1) + 1) % 1;
    $cd(c, W / 2 + (px - 144) * k, H / 2 + (py - 90) * k, R * k, t, th, z);
  }
  c.restore();
}
let $zi = null;
function $zs(e) {
  const u = e - 4100;
  if (!$zf) {
    const r = v.getBoundingClientRect(),
      q = Math.max(2, Math.round(Math.min(innerWidth, innerHeight) / 150)),
      W = Math.ceil(innerWidth / q),
      H = Math.ceil(innerHeight / q);
    (x.classList.add("zoom"),
      (v.style.visibility = "hidden"),
      ($zf = document.createElement("div")),
      ($zf.id = "zf"),
      x.appendChild($zf),
      ($zg = document.createElement("div")),
      ($zg.id = "zg"),
      x.appendChild($zg),
      ($zc = document.createElement("canvas")),
      ($zc.id = "zc"),
      ($zc.width = W),
      ($zc.height = H),
      x.appendChild($zc),
      ($zx = $zc.getContext("2d")),
      ($zi = { W, H, rx: r.left / q, ry: r.top / q, rw: r.width / q, rh: r.height / q }));
  }
  const { W, H, rx, ry, rw, rh } = $zi,
    c = $zx,
    pA = $cl(0, 1500, u);
  ((ZP = pA),
    c.setTransform(1, 0, 0, 1, 0, 0),
    c.clearRect(0, 0, W, H),
    (c.imageSmoothingEnabled = !1));
  if (u < 1900) {
    const fx = rx + rw / 2,
      fy = ry + rh / 2,
      Z = 1 + 46 * pA * pA * pA,
      dn = 1 - $cl(1500, 1900, u);
    (c.save(), (c.globalCompositeOperation = "lighter"));
    const gr = c.createRadialGradient(fx, fy, 0, fx, fy, rh * (0.7 + 3 * pA));
    (gr.addColorStop(0, "rgba(80,150,255," + (0.3 + 0.4 * pA).toFixed(2) + ")"),
      gr.addColorStop(1, "rgba(80,150,255,0)"),
      (c.fillStyle = gr),
      c.fillRect(0, 0, W, H),
      c.restore());
    const pd = (zv, al, op) => {
      (c.save(),
        (c.globalAlpha = al * dn),
        (c.globalCompositeOperation = op || "source-over"),
        c.translate(fx, fy),
        c.scale(zv, zv),
        c.translate(-fx, -fy),
        (c.imageSmoothingEnabled = !1),
        c.drawImage(v, rx, ry, rw, rh),
        c.restore());
    };
    (pd(Z, 1), pd(Z * (1 + 0.07 * pA), 0.32 * pA), pd(Z, 0.7 * pA, "lighter"));
  }
  (($zf.style.opacity = ($cl(850, 1500, u) * (1 - $cl(1650, 2300, u))).toFixed(3)),
    ($zg.style.opacity = $cl(1450, 2300, u).toFixed(3)));
  const ca = $cl(1150, 2050, u);
  if (ca > 0) {
    const pC = $cl(2600, 3900, u),
      z = 1 + 3.6 * Math.pow(pC, 2);
    ($zd(u / 1e3, z, 0.88 * ca, W, H),
      pC > 0 &&
        $zd(u / 1e3, z * (1.02 + 0.05 * Math.sin(Math.PI * Math.min(1, pC))), 0.3 * ca, W, H));
  }
}
function $ze() {
  (document.body.classList.add("go"),
    (t("main").inert = !1),
    x.classList.add("out", "zr"),
    setTimeout(() => x.remove(), 480));
}
