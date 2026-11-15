(() => {
  "use strict";
  const APP = "evoquest-save",
    SCHEMA = 2,
    MAXB = 1048576,
    MOD = "evoquest_modified",
    EMB = "evoquest_embedded_at";
  const ok = (k) =>
    k === "evoquest_players" || k === "evoquest_looks" || /^evoquest_cp_.{0,14}$/s.test(k);
  const parse = (v) => {
    try {
      return JSON.parse(v);
    } catch (e) {
      return undefined;
    }
  };
  /* pristine copy of this page (taken before the game runs) for "Download game with progress" */
  let SRC = "";
  try {
    SRC = "<!doctype html>" + document.documentElement.outerHTML;
  } catch (e) {}
  /* ---- storage: real localStorage, or a window.name-backed fallback when the viewer blocks it ---- */
  let S0 = null,
    mem = null,
    shimmed = false;
  try {
    S0 = window.localStorage;
    S0.setItem("evoquest__t", "1");
    S0.removeItem("evoquest__t");
  } catch (e) {
    S0 = null;
  }
  const SI = Storage.prototype.setItem,
    RI = Storage.prototype.removeItem;
  let onWrite = () => {};
  if (!S0) {
    mem = Object.create(null);
    try {
      const nm = window.name || "";
      if (nm.indexOf("evoquest:") === 0) Object.assign(mem, JSON.parse(nm.slice(9)));
    } catch (e) {}
    const persist = () => {
      try {
        if (!window.name || window.name.indexOf("evoquest:") === 0)
          window.name = "evoquest:" + JSON.stringify(mem);
      } catch (e) {}
    };
    const shim = {
      get length() {
        return Object.keys(mem).length;
      },
      key: (i) => {
        const k = Object.keys(mem)[i];
        return k === undefined ? null : k;
      },
      getItem: (k) => (String(k) in mem ? mem[String(k)] : null),
      setItem(k, v) {
        mem[String(k)] = String(v);
        persist();
        onWrite(String(k));
      },
      removeItem(k) {
        delete mem[String(k)];
        persist();
        onWrite(String(k));
      },
      clear() {
        for (const k in mem) delete mem[k];
        persist();
      },
    };
    try {
      Object.defineProperty(window, "localStorage", { value: shim, configurable: true });
      if (window.localStorage === shim) {
        S0 = shim;
        shimmed = true;
      }
    } catch (e) {}
    shim.__persist = persist;
  }
  const rawSet = (k, v) => {
    try {
      if (shimmed) {
        mem[k] = String(v);
        S0.__persist();
      } else SI.call(S0, k, String(v));
    } catch (e) {}
  };
  const rawGet = (k) => {
    try {
      return S0.getItem(k);
    } catch (e) {
      return null;
    }
  };
  const touch = () => rawSet(MOD, new Date().toISOString());
  /* integrity checksum (cyrb53) over key-sorted data */
  function sumOf(d) {
    const o = {};
    Object.keys(d)
      .sort()
      .forEach((k) => (o[k] = d[k]));
    const str = JSON.stringify(o);
    let h1 = 0xdeadbeef,
      h2 = 0x41c6ce57;
    for (let i = 0; i < str.length; i++) {
      const c = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ c, 2654435761);
      h2 = Math.imul(h2 ^ c, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
  }
  function valid(k, v) {
    if (typeof v !== "string" || v.length > 200000) return false;
    const j = parse(v);
    if (k === "evoquest_players")
      return (
        Array.isArray(j) &&
        j.length <= 3 &&
        j.every((x) => x === null || (typeof x === "string" && x.length <= 14))
      );
    if (k === "evoquest_looks")
      return (
        Array.isArray(j) &&
        j.length <= 3 &&
        j.every((x) => x === null || (x && typeof x === "object" && !Array.isArray(x)))
      );
    return !!j && typeof j === "object" && j.v >= 1;
  }
  const strs = (a) =>
    Array.isArray(a) ? a.filter((x) => typeof x === "string").slice(0, 200) : [];
  const obj = (o) => (o && typeof o === "object" && !Array.isArray(o) ? o : {});
  function normalize(k, v) {
    if (typeof v !== "string") return null;
    const j = parse(v);
    if (j === undefined) return null;
    if (k === "evoquest_players") {
      if (!Array.isArray(j)) return null;
      const o = j
        .slice(0, 3)
        .map((x) => (typeof x === "string" && x.trim() ? x.trim().slice(0, 14) : null));
      while (o.length < 3) o.push(null);
      return JSON.stringify(o);
    }
    if (k === "evoquest_looks") {
      if (!Array.isArray(j)) return null;
      const o = j.slice(0, 3).map((x) => {
        if (!x || typeof x !== "object" || Array.isArray(x)) return null;
        const r = {};
        for (const f in x) if (Number.isInteger(x[f]) && x[f] >= 0) r[f] = x[f];
        return r;
      });
      while (o.length < 3) o.push(null);
      return JSON.stringify(o);
    }
    if (!j || typeof j !== "object" || Array.isArray(j) || !(j.v >= 1)) return null;
    return JSON.stringify(
      Object.assign({}, j, {
        inv: strs(j.inv),
        got: strs(j.got),
        taken: obj(j.taken),
        broken: obj(j.broken),
        worn: !!j.worn,
        gloved: !!j.gloved,
        hasGoggles: !!j.hasGoggles,
      }),
    );
  }
  /* legacy keys (other casing/separators) -> canonical names, never overwriting existing data */
  try {
    if (S0) {
      const mv = [];
      for (let i = 0; i < S0.length; i++) {
        const k = S0.key(i);
        if (k && !ok(k) && /^evoquest[-_. ]/i.test(k)) {
          const r = k.slice(9);
          const nk = /^(players|looks)$/i.test(r)
            ? "evoquest_" + r.toLowerCase()
            : /^cp[-_. ]/i.test(r)
              ? "evoquest_cp_" + r.slice(3)
              : null;
          if (nk && S0.getItem(nk) === null) mv.push([k, nk]);
        }
      }
      mv.forEach(([k, nk]) => {
        const v = S0.getItem(k);
        if (valid(nk, v)) S0.setItem(nk, v);
      });
    }
  } catch (e) {}
  function collect() {
    const d = {};
    if (!S0) return d;
    for (let i = 0; i < S0.length; i++) {
      const k = S0.key(i);
      if (k && ok(k)) {
        const v = S0.getItem(k);
        if (v !== null) d[k] = v;
      }
    }
    return d;
  }
  const bundle = () => {
    const data = collect();
    return {
      app: APP,
      schema: SCHEMA,
      savedAt: new Date().toISOString(),
      modifiedAt: rawGet(MOD) || new Date().toISOString(),
      sum: sumOf(data),
      data,
    };
  };
  const intact = (b) =>
    !!b &&
    b.app === APP &&
    !!b.data &&
    typeof b.data === "object" &&
    !Array.isArray(b.data) &&
    (b.sum === undefined || b.sum === sumOf(b.data));
  /* ---- automatic IndexedDB mirror (current + previous generation) ---- */
  const idb = (mode, fn) =>
    new Promise((res) => {
      try {
        const r = indexedDB.open("evoquest_backup", 1);
        r.onupgradeneeded = () => r.result.createObjectStore("kv");
        r.onerror = () => res(null);
        r.onsuccess = () => {
          try {
            const db = r.result,
              tx = db.transaction("kv", mode),
              out = fn(tx.objectStore("kv"));
            tx.oncomplete = () => {
              db.close();
              res(out && "result" in out ? out.result : true);
            };
            tx.onerror = tx.onabort = () => {
              db.close();
              res(null);
            };
          } catch (e) {
            res(null);
          }
        };
      } catch (e) {
        res(null);
      }
    });
  let tm = 0;
  const flush = () => {
    clearTimeout(tm);
    tm = 0;
    const b = bundle();
    idb("readwrite", (st) => {
      const g = st.get("bundle");
      g.onsuccess = () => {
        const o = g.result;
        if (o && o.sum !== b.sum && Object.keys(o.data || {}).length) st.put(o, "prev");
        st.put(b, "bundle");
      };
      return g;
    });
  };
  const sched = () => {
    if (!tm) tm = setTimeout(flush, 400);
  };
  onWrite = (k) => {
    if (ok(k)) {
      touch();
      sched();
    }
  };
  if (!shimmed)
    try {
      const S = Storage.prototype;
      S.setItem = function (k, v) {
        const r = SI.apply(this, arguments);
        try {
          if (this === S0) onWrite(String(k));
        } catch (e) {}
        return r;
      };
      S.removeItem = function (k) {
        const r = RI.apply(this, arguments);
        try {
          if (this === S0) onWrite(String(k));
        } catch (e) {}
        return r;
      };
    } catch (e) {}
  addEventListener("pagehide", () => {
    if (tm) flush();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && tm) flush();
  });
  try {
    navigator.storage && navigator.storage.persist && navigator.storage.persist().catch(() => {});
  } catch (e) {}
  /* ---- merge a bundle into the current saves (soft = never overwrite existing slots/checkpoints) ---- */
  const arr = (k, d) => {
    const a = parse(d[k] !== undefined ? d[k] : S0 ? S0.getItem(k) : null);
    const o = Array.isArray(a) ? a.slice(0, 3) : [];
    while (o.length < 3) o.push(null);
    return o;
  };
  function importData(data, soft) {
    const s = S0;
    if (!s) throw new Error("Browser storage is unavailable");
    const clean = {};
    for (const k in data) if (ok(k) && valid(k, data[k])) clean[k] = data[k];
    if (!Object.keys(clean).length) throw new Error("No EvoQuest saves found");
    const cur = arr("evoquest_players", {}),
      lk = arr("evoquest_looks", {});
    const inP = clean.evoquest_players ? arr("evoquest_players", clean) : [],
      inL = clean.evoquest_looks ? arr("evoquest_looks", clean) : [];
    let players = 0,
      cps = 0,
      skipped = 0;
    const used = new Set();
    inP.forEach((name, i) => {
      if (!name) return;
      let slot = cur.indexOf(name);
      if (slot < 0 && cur[i] === null) slot = i;
      if (slot < 0) slot = cur.indexOf(null);
      if (slot < 0) {
        skipped++;
        return;
      }
      const had = cur[slot] === name;
      cur[slot] = name;
      if (inL[i] && !(soft && had && lk[slot])) lk[slot] = inL[i];
      players++;
      const ck = "evoquest_cp_" + name;
      used.add(ck);
      if (clean[ck] && !(soft && s.getItem(ck) !== null)) {
        s.setItem(ck, clean[ck]);
        cps++;
      }
    });
    for (const k in clean)
      if (/^evoquest_cp_/.test(k) && !used.has(k) && s.getItem(k) === null) {
        s.setItem(k, clean[k]);
        cps++;
      }
    s.setItem("evoquest_players", JSON.stringify(cur));
    s.setItem("evoquest_looks", JSON.stringify(lk));
    return { players, cps, skipped };
  }
  /* ---- startup ---- */
  const empty = () => Object.keys(collect()).length === 0;
  let guard = false;
  try {
    guard = sessionStorage.getItem("evoquest_restored") === "1";
  } catch (e) {}
  const setG = () => {
    try {
      sessionStorage.setItem("evoquest_restored", "1");
    } catch (e) {}
  };
  let bad = [];
  if (S0) {
    if (!empty()) {
      if (!rawGet(MOD)) touch();
      flush();
    } /* snapshot untouched data first */
    /* progress embedded in this file (made with "Download game with progress") */
    try {
      const el = document.getElementById("evoquestEmbedded"),
        t = el && (el.textContent || "").trim();
      const b = t && parse(t);
      if (b && intact(b) && b.data && Object.keys(b.data).length) {
        const at = b.modifiedAt || b.savedAt || "",
          seen = rawGet(EMB) || "";
        if (at > seen) {
          const lm = rawGet(MOD) || "",
            wasEmpty = empty(),
            soft = !(wasEmpty || at > lm);
          importData(b.data, soft);
          rawSet(EMB, at);
          rawSet(MOD, soft ? lm : at);
          sched();
        }
      }
    } catch (e) {}
    const d = collect();
    for (const k in d) {
      const nv = normalize(k, d[k]);
      if (nv === null) bad.push(k);
      else if (nv !== d[k]) {
        try {
          S0.setItem(k, nv);
        } catch (e) {}
      }
    }
  }
  if (S0 && !guard && (empty() || bad.length)) {
    Promise.all([
      idb("readonly", (st) => st.get("bundle")),
      idb("readonly", (st) => st.get("prev")),
    ]).then(([a, b]) => {
      const srcs = [a, b].filter(intact);
      let n = 0;
      const want = empty() ? null : bad;
      const tryKey = (k) => {
        for (const sx of srcs) {
          const v = sx.data[k];
          if (v === undefined) continue;
          const nv = normalize(k, v);
          if (nv !== null) {
            try {
              S0.setItem(k, nv);
              n++;
              return;
            } catch (e) {}
          }
        }
      };
      if (want) want.forEach(tryKey);
      else {
        const ks = new Set();
        srcs.forEach((sx) => Object.keys(sx.data).forEach((k) => ok(k) && ks.add(k)));
        ks.forEach(tryKey);
      }
      if (n) {
        setG();
        location.reload();
      }
    });
  }
  /* ---- other pages can ask this page for its saves (used by ?from= on a newer copy) ---- */
  addEventListener("message", (e) => {
    if (!e.data || e.data.type !== "evoquest-sync-request" || !e.source || e.source === window)
      return;
    try {
      e.source.postMessage(
        { type: "evoquest-sync-response", bundle: bundle() },
        e.origin && e.origin !== "null" ? e.origin : "*",
      );
    } catch (x) {}
  });
  (function () {
    const LEGACY = []; /* add old game URLs here, e.g. "https://old.example.com/evoquest/" */
    const urls = LEGACY.slice();
    try {
      const q = new URLSearchParams(location.search).get("from");
      if (q) urls.push(q);
    } catch (e) {}
    let done = false;
    try {
      done = sessionStorage.getItem("evoquest_synced") === "1";
    } catch (e) {}
    if (done || !urls.length || !S0 || !empty()) return;
    let got = false;
    urls.forEach((u) => {
      let o;
      try {
        const x = new URL(u, location.href);
        if (!/^https?:$/.test(x.protocol)) return;
        o = x.origin;
      } catch (e) {
        return;
      }
      const f = document.createElement("iframe");
      f.hidden = true;
      f.style.display = "none";
      f.src = u;
      const end = () => {
        window.removeEventListener("message", h);
        clearTimeout(t);
        f.remove();
      };
      const h = (e) => {
        if (
          e.source !== f.contentWindow ||
          e.origin !== o ||
          !e.data ||
          e.data.type !== "evoquest-sync-response"
        )
          return;
        const b = e.data.bundle;
        if (!intact(b) || got) return;
        try {
          const r = importData(b.data);
          if (r.players || r.cps) {
            got = true;
            try {
              sessionStorage.setItem("evoquest_synced", "1");
            } catch (x) {}
            end();
            location.reload();
          }
        } catch (x) {}
      };
      const t = setTimeout(end, 8000);
      window.addEventListener("message", h);
      f.onload = () => {
        try {
          f.contentWindow.postMessage({ type: "evoquest-sync-request" }, o);
        } catch (x) {}
      };
      document.body.appendChild(f);
    });
  })();
  /* ---- UI ---- */
  const $ = (id) => document.getElementById(id),
    msg = (t) => {
      const m = $("svMsg");
      if (m) m.textContent = t;
    };
  const stamp = () => new Date().toISOString().slice(0, 10);
  function download(name, text, type) {
    const url = URL.createObjectURL(new Blob([text], { type }));
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }
  function loadBundle(j) {
    if (!j || j.app !== APP || !j.data || typeof j.data !== "object" || Array.isArray(j.data))
      throw new Error("Not an EvoQuest save");
    if (!(j.schema >= 1) || j.schema > SCHEMA) throw new Error("Save is from a newer game version");
    if (!intact(j)) throw new Error("Save is damaged (checksum mismatch)");
    const o = importData(j.data);
    msg(
      "Imported " +
        o.players +
        " player(s), " +
        o.cps +
        " checkpoint(s)" +
        (o.skipped ? ", " + o.skipped + " skipped (no free slot)" : "") +
        ". Reloading…",
    );
    setTimeout(() => location.reload(), 900);
  }
  const enc = (b) => "EQ1." + btoa(unescape(encodeURIComponent(JSON.stringify(b))));
  const dec = (c) => {
    c = String(c).replace(/\s+/g, "");
    if (c.slice(0, 4) !== "EQ1.") throw new Error("That is not an EvoQuest save code");
    try {
      return JSON.parse(decodeURIComponent(escape(atob(c.slice(4)))));
    } catch (e) {
      throw new Error("Save code is damaged or incomplete");
    }
  };
  const ex = $("svExp"),
    im = $("svImp"),
    fi = $("svFile"),
    cg = $("svCodeGet"),
    cs = $("svCodeSet"),
    ta = $("svCode"),
    gm = $("svGame");
  if (ex)
    ex.onclick = () => {
      const b = bundle();
      if (!Object.keys(b.data).length) {
        msg("Nothing to export yet.");
        return;
      }
      download(
        "evoquest-saves-" + stamp() + ".json",
        JSON.stringify(b, null, 1),
        "application/json",
      );
      msg(
        "Export started. If no file appears (some viewers block downloads), use Save Code instead.",
      );
    };
  if (im && fi) {
    im.onclick = () => {
      fi.value = "";
      fi.click();
    };
    fi.onchange = () => {
      const f = fi.files && fi.files[0];
      if (!f) return;
      if (f.size > MAXB) {
        msg("That file is too large to be an EvoQuest save.");
        return;
      }
      const r = new FileReader();
      r.onerror = () => msg("Could not read that file.");
      r.onload = () => {
        try {
          loadBundle(parse(String(r.result)));
        } catch (e) {
          msg(e.message || "Import failed");
        }
      };
      r.readAsText(f);
    };
  }
  if (cg && ta)
    cg.onclick = () => {
      const b = bundle();
      if (!Object.keys(b.data).length) {
        msg("Nothing to save yet.");
        return;
      }
      ta.hidden = false;
      ta.value = enc(b);
      ta.focus();
      ta.select();
      let c = false;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(ta.value).then(
            () => msg("Save code copied. Paste it somewhere safe."),
            () => msg("Copy the code above and keep it safe."),
          );
          c = true;
        }
      } catch (e) {}
      if (!c) msg("Copy the code above and keep it safe.");
    };
  if (cs && ta)
    cs.onclick = () => {
      if (ta.hidden || !ta.value.trim()) {
        ta.hidden = false;
        ta.value = "";
        ta.focus();
        msg("Paste your save code above, then press Load Save Code again.");
        return;
      }
      try {
        loadBundle(dec(ta.value));
      } catch (e) {
        msg(e.message || "Load failed");
      }
    };
  if (gm)
    gm.onclick = () => {
      try {
        const b = bundle();
        if (!Object.keys(b.data).length) {
          msg("Nothing to embed yet - play first.");
          return;
        }
        const main = $("saveBridge") && $("saveBridge").nextElementSibling;
        const tail = "</body></html>";
        if (
          !SRC ||
          SRC.slice(-tail.length) !== tail ||
          !main ||
          main.tagName !== "SCRIPT" ||
          main.id ||
          main.type ||
          !main.textContent ||
          !/<script type="application\/json" id="evoquestEmbedded">/.test(SRC)
        ) {
          msg("This viewer cannot rebuild the game file. Use Save Code instead.");
          return;
        }
        const json = JSON.stringify(b).replace(/</g, "\\u003c");
        const full =
          SRC.slice(0, -tail.length) + "<script>" + main.textContent + "<\/script>" + tail;
        const out = full.replace(
          /(<script type="application\/json" id="evoquestEmbedded">)[\s\S]*?(<\/script>)/,
          (m, a, c) => a + json + c,
        );
        download("EvoQuest_with_progress_" + stamp() + ".html", out, "text/html");
        msg(
          "Download started. If no file appears (some viewers block downloads), use Save Code instead.",
        );
      } catch (e) {
        msg("Could not build the file. Use Save Code instead.");
      }
    };
  if (S0 && !empty()) sched();
  if (!S0)
    msg(
      "Saving is blocked in this viewer. Use Save Code or Download Game + Progress to keep progress.",
    );
  else if (shimmed)
    msg(
      "This viewer blocks storage: progress lasts only for this tab. Use Save Code or Download Game + Progress.",
    );
})();
