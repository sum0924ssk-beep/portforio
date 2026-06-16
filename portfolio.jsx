import { useState, useRef, useEffect } from "react";

// ==============================
// ✏️ ここを自分の情報に書き換えてね！
// ==============================
const ME = {
  name: "翔真",
  role: "フロントエンドエンジニア",
  tagline: "コードで世界をちょっと楽しくする人",
  emoji: "🍊",
  links: {
    github: "https://github.com/",
    twitter: "https://twitter.com/",
    email: "sum0924ssk@gmail.com",
  },
};

const SKILLS = [
  { name: "React", level: 85, icon: "⚛️" },
  { name: "TypeScript", level: 75, icon: "📘" },
  { name: "JavaScript", level: 90, icon: "✨" },
  { name: "CSS / Tailwind", level: 80, icon: "🎨" },
  { name: "Node.js", level: 65, icon: "🟢" },
  { name: "Figma", level: 70, icon: "🖼️" },
];

const WORKS = [
  {
    title: "プロジェクト1",
    desc: "Reactで作ったWebアプリ。ここに説明を入れてね。",
    tags: ["React", "CSS"],
    emoji: "🚀",
    link: "#",
  },
  {
    title: "プロジェクト2",
    desc: "TypeScriptでゼロから設計したサービス。",
    tags: ["TypeScript", "Node.js"],
    emoji: "🎯",
    link: "#",
  },
  {
    title: "プロジェクト3",
    desc: "デザインにこだわったランディングページ。",
    tags: ["HTML", "CSS", "Figma"],
    emoji: "🎨",
    link: "#",
  },
  {
    title: "プロジェクト4",
    desc: "APIと連携したダッシュボードアプリ。",
    tags: ["React", "REST API"],
    emoji: "📊",
    link: "#",
  },
];

// ==============================
// カラー設定
// ==============================
const C = {
  orange: "#FF6B2B",
  orangeLight: "#FF9A6C",
  orangePale: "#FFF0E8",
  white: "#FFFFFF",
  dark: "#1A1A1A",
  gray: "#666",
};

// ==============================
// アニメーション付きスキルバー
// ==============================
function SkillBar({ skill, delay }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(skill.level), delay);
    return () => clearTimeout(t);
  }, [skill.level, delay]);

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontWeight: 700, fontSize: 15 }}>
          {skill.icon} {skill.name}
        </span>
        <span style={{ color: C.orange, fontWeight: 700 }}>{skill.level}%</span>
      </div>
      <div style={{
        background: "#FFE5D6",
        borderRadius: 99,
        height: 10,
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          width: `${width}%`,
          background: `linear-gradient(90deg, ${C.orange}, ${C.orangeLight})`,
          borderRadius: 99,
          transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
        }} />
      </div>
    </div>
  );
}

// ==============================
// 作品カード
// ==============================
function WorkCard({ work, index }) {
  const [hovered, setHovered] = useState(false);
  const colors = [C.orange, "#FF4D7F", "#7B61FF", "#00C2A8"];
  const accent = colors[index % colors.length];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: C.white,
        borderRadius: 24,
        padding: "36px 32px",
        minWidth: 280,
        maxWidth: 300,
        boxShadow: hovered
          ? `0 20px 48px rgba(255,107,43,0.18), 0 2px 8px rgba(0,0,0,0.06)`
          : `0 4px 20px rgba(0,0,0,0.06)`,
        transform: hovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
        transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
        cursor: "pointer",
        border: `2px solid ${hovered ? accent : "transparent"}`,
      }}
      onClick={() => work.link !== "#" && window.open(work.link, "_blank")}
    >
      <div style={{
        fontSize: 48,
        marginBottom: 16,
        background: `${accent}18`,
        width: 72,
        height: 72,
        borderRadius: 18,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        {work.emoji}
      </div>
      <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 10, color: C.dark }}>
        {work.title}
      </h3>
      <p style={{ color: C.gray, fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>
        {work.desc}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {work.tags.map(tag => (
          <span key={tag} style={{
            background: `${accent}18`,
            color: accent,
            borderRadius: 99,
            padding: "4px 12px",
            fontSize: 12,
            fontWeight: 700,
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// ==============================
// セクション共通ラッパー
// ==============================
function Section({ id, bg, children, width = "100vw" }) {
  return (
    <section style={{
      minWidth: width,
      width,
      minHeight: "100vh",
      background: bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 60px",
      boxSizing: "border-box",
      flexShrink: 0,
    }} id={id}>
      <div style={{ width: "100%", maxWidth: 800 }}>
        {children}
      </div>
    </section>
  );
}

function SectionTitle({ children, accent = C.orange }) {
  return (
    <h2 style={{
      fontSize: 48,
      fontWeight: 900,
      marginBottom: 48,
      color: C.dark,
      position: "relative",
      display: "inline-block",
    }}>
      {children}
      <span style={{
        display: "block",
        height: 6,
        borderRadius: 3,
        background: accent,
        marginTop: 6,
      }} />
    </h2>
  );
}

// ==============================
// ナビゲーションドット
// ==============================
function NavDots({ sections, current, onGo }) {
  return (
    <div style={{
      position: "fixed",
      bottom: 36,
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      gap: 12,
      zIndex: 100,
      background: "rgba(255,255,255,0.85)",
      backdropFilter: "blur(8px)",
      padding: "10px 20px",
      borderRadius: 99,
      boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
    }}>
      {sections.map((s, i) => (
        <button
          key={s.id}
          onClick={() => onGo(i)}
          title={s.label}
          style={{
            width: current === i ? 32 : 12,
            height: 12,
            borderRadius: 99,
            background: current === i ? C.orange : "#FFD0B5",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s",
            padding: 0,
          }}
        />
      ))}
    </div>
  );
}

// ==============================
// メインアプリ
// ==============================
export default function Portfolio() {
  const containerRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);

  // 慣性スクロール用
  const targetX = useRef(0);
  const currentX = useRef(0);
  const rafId = useRef(null);
  const velocity = useRef(0);

  const sections = [
    { id: "hero", label: "Top" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "works", label: "Works" },
  ];

  // 滑らかにスクロールするアニメーションループ
  const animate = () => {
    const el = containerRef.current;
    if (!el) return;

    const diff = targetX.current - currentX.current;
    // 差分が小さければ止める
    if (Math.abs(diff) < 0.5) {
      currentX.current = targetX.current;
      el.scrollLeft = currentX.current;
      rafId.current = null;
      return;
    }

    // イージング係数（小さいほど滑らか・遅い）
    const ease = 0.08;
    currentX.current += diff * ease;
    el.scrollLeft = currentX.current;

    // どのセクションにいるか更新
    const vw = window.innerWidth;
    const idx = Math.round(el.scrollLeft / vw);
    setCurrentSection(Math.min(Math.max(idx, 0), sections.length - 1));

    rafId.current = requestAnimationFrame(animate);
  };

  const startAnimate = () => {
    if (rafId.current) return;
    rafId.current = requestAnimationFrame(animate);
  };

  const goTo = (index) => {
    const vw = window.innerWidth;
    targetX.current = index * vw;
    setCurrentSection(index);
    startAnimate();
  };

  // ホイール → 横スクロールに変換（慣性あり）
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // 初期化
    currentX.current = el.scrollLeft;
    targetX.current = el.scrollLeft;

    const onWheel = (e) => {
      e.preventDefault();
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const vw = window.innerWidth;
      const maxX = vw * (sections.length - 1);
      targetX.current = Math.min(Math.max(targetX.current + delta * 2.5, 0), maxX);
      startAnimate();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // キーボード操作
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        goTo(Math.min(currentSection + 1, sections.length - 1));
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        goTo(Math.max(currentSection - 1, 0));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentSection]);

  return (
    <div style={{ overflow: "hidden", height: "100vh", width: "100vw" }}>
      {/* スクロールコンテナ */}
      <div
        ref={containerRef}
        style={{
          display: "flex",
          flexDirection: "row",
          height: "100vh",
          overflowX: "scroll",
          overflowY: "hidden",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* ===== HERO ===== */}
        <section style={{
          minWidth: "100vw",
          width: "100vw",
          height: "100vh",
          background: C.orange,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
        }}>
          {/* 背景デコ */}
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              width: [180,120,220,90,150,100][i],
              height: [180,120,220,90,150,100][i],
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
              top: [`10%`,`60%`,`20%`,`70%`,`40%`,`5%`][i],
              left: [`5%`,`15%`,`70%`,`80%`,`50%`,`40%`][i],
            }} />
          ))}

          <div style={{ textAlign: "center", color: C.white, position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: 80, marginBottom: 16 }}>{ME.emoji}</div>
            <p style={{
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
              opacity: 0.85,
              marginBottom: 16,
            }}>
              Portfolio
            </p>
            <h1 style={{
              fontSize: "clamp(48px, 8vw, 96px)",
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: 20,
              textShadow: "0 4px 24px rgba(0,0,0,0.15)",
            }}>
              {ME.name}
            </h1>
            <p style={{
              fontSize: 22,
              fontWeight: 600,
              opacity: 0.9,
              marginBottom: 8,
            }}>
              {ME.role}
            </p>
            <p style={{
              fontSize: 16,
              opacity: 0.75,
              marginBottom: 48,
            }}>
              {ME.tagline}
            </p>
            <button
              onClick={() => goTo(1)}
              style={{
                background: C.white,
                color: C.orange,
                border: "none",
                borderRadius: 99,
                padding: "14px 36px",
                fontSize: 16,
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                transition: "transform 0.2s",
              }}
              onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
              onMouseLeave={e => e.target.style.transform = "scale(1)"}
            >
              見てみる →
            </button>
          </div>

          {/* スクロールヒント */}
          <div style={{
            position: "absolute",
            right: 40,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            color: "rgba(255,255,255,0.6)",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 2,
          }}>
            <span style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>SCROLL</span>
            <div style={{
              width: 2,
              height: 48,
              background: "rgba(255,255,255,0.4)",
              borderRadius: 1,
              animation: "pulse 2s infinite",
            }} />
          </div>
        </section>

        {/* ===== ABOUT ===== */}
        <Section id="about" bg={C.white}>
          <div>
            <SectionTitle>About Me 👋</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
              <div>
                <p style={{ fontSize: 18, lineHeight: 1.9, color: C.gray, marginBottom: 24 }}>
                  はじめまして、<strong style={{ color: C.dark }}>{ME.name}</strong>です！<br />
                  Webフロントエンドを中心に、ユーザーが思わず「おっ！」となるような体験を作るのが好きです。
                </p>
                <p style={{ fontSize: 18, lineHeight: 1.9, color: C.gray }}>
                  コードを書くだけじゃなく、デザインやUXにも興味があって、見た目も中身も両方こだわりたいタイプ。
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { label: "Name", value: ME.name, icon: "👤" },
                  { label: "Role", value: ME.role, icon: "💻" },
                  { label: "Email", value: ME.email || ME.links.email, icon: "📬" },
                ].map(item => (
                  <div key={item.label} style={{
                    background: C.orangePale,
                    borderRadius: 16,
                    padding: "16px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}>
                    <span style={{ fontSize: 24 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: 12, color: C.orange, fontWeight: 700, letterSpacing: 1 }}>{item.label}</div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: C.dark }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SNSリンク */}
            <div style={{ display: "flex", gap: 16, marginTop: 40 }}>
              {[
                { label: "GitHub", icon: "🐙", url: ME.links.github },
                { label: "Twitter", icon: "🐦", url: ME.links.twitter },
                { label: "Email", icon: "✉️", url: `mailto:${ME.links.email}` },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: C.orange,
                    color: C.white,
                    borderRadius: 99,
                    padding: "10px 24px",
                    fontWeight: 700,
                    fontSize: 14,
                    textDecoration: "none",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >
                  <span>{link.icon}</span> {link.label}
                </a>
              ))}
            </div>
          </div>
        </Section>

        {/* ===== SKILLS ===== */}
        <Section id="skills" bg={C.orangePale}>
          <div>
            <SectionTitle>Skills 🛠️</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 60px" }}>
              {SKILLS.map((skill, i) => (
                <SkillBar key={skill.name} skill={skill} delay={i * 120} />
              ))}
            </div>
          </div>
        </Section>

        {/* ===== WORKS ===== */}
        <section style={{
          minWidth: "100vw",
          width: "100vw",
          height: "100vh",
          background: C.dark,
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
          padding: "0 60px",
          boxSizing: "border-box",
        }}>
          <div style={{ width: "100%" }}>
            <h2 style={{
              fontSize: 48,
              fontWeight: 900,
              color: C.white,
              marginBottom: 40,
              display: "inline-block",
            }}>
              Works 🚀
              <span style={{
                display: "block",
                height: 6,
                borderRadius: 3,
                background: C.orange,
                marginTop: 6,
              }} />
            </h2>
            <div style={{
              display: "flex",
              gap: 24,
              overflowX: "auto",
              paddingBottom: 20,
              scrollbarWidth: "thin",
              scrollbarColor: `${C.orange} transparent`,
            }}>
              {WORKS.map((work, i) => (
                <WorkCard key={work.title} work={work} index={i} />
              ))}
            </div>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, marginTop: 16 }}>
              ← 横にスクロールして全部見てね
            </p>
          </div>
        </section>
      </div>

      {/* ナビドット */}
      <NavDots sections={sections} current={currentSection} onGo={goTo} />

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Helvetica Neue', Arial, 'Hiragino Sans', sans-serif; }
        ::-webkit-scrollbar { display: none; }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
