import { useState, useEffect, useRef } from "react";
import "./MainContent.css";

const FORMSPREE_ID = "mvzjyppy";

function MainContent() {
  // Styles for the body setup when this component is mounted
  useEffect(() => {
    document.body.style.backgroundColor = "#FBF6F0";
    document.body.style.color = "#3A2E2B";
    document.body.style.fontFamily = "'Outfit', sans-serif";
    document.body.style.fontWeight = "300";
    document.body.style.overflowX = "hidden";

    return () => {
      // Restore default values if component unmounts
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
      document.body.style.fontFamily = "";
      document.body.style.fontWeight = "";
      document.body.style.overflowX = "";
    };
  }, []);

  // ─── PETALS ───────────────────────────────────────────────────────
  const [petals, setPetals] = useState([]);
  useEffect(() => {
    const generated = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + "vw",
      animationDuration: (14 + Math.random() * 10) + "s",
      animationDelay: (Math.random() * -22) + "s",
      opacity: 0.2 + Math.random() * 0.3,
      scale: 0.6 + Math.random() * 0.8,
    }));
    setPetals(generated);
  }, []);

  // Scroll helper
  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // ─── DATE GAME STATES & LOGIC ──────────────────────────────────────
  const dateBtnsRef = useRef(null);
  const noBtnRef = useRef(null);
  const [noCount, setNoCount] = useState(0);
  const [noBtnStyle, setNoBtnStyle] = useState({});
  const [noBtnShake, setNoBtnShake] = useState(false);
  const [dateAnswered, setDateAnswered] = useState(false);

  const noTexts = [
    "No",
    "Nope 😒",
    "Still no?",
    "Really? 😠",
    "Come on...",
    "Fine, FINE 😤",
    "...",
    "Last chance 🤨"
  ];

  const runAwayNo = () => {
    const nextNoCount = noCount + 1;
    setNoCount(nextNoCount);

    const isMobile = window.innerWidth < 520;
    if (!isMobile && dateBtnsRef.current && noBtnRef.current) {
      const cont = dateBtnsRef.current;
      const noBtn = noBtnRef.current;
      const maxX = Math.max(cont.offsetWidth - noBtn.offsetWidth - 10, 10);
      const left = Math.floor(Math.random() * maxX) + "px";
      const top = Math.random() > 0.5 ? "-44px" : "44px";
      setNoBtnStyle({
        position: "absolute",
        left: left,
        top: top,
        transition: "left 0.3s ease, top 0.3s ease"
      });
    } else {
      setNoBtnShake(true);
      setTimeout(() => setNoBtnShake(false), 400);
    }
  };

  const handleNoMouseEnter = () => {
    if (noCount >= 1) {
      runAwayNo();
    }
  };

  const handleYesClick = () => {
    setDateAnswered(true);
  };

  // ─── GIFT GAME STATES & LOGIC ──────────────────────────────────────
  const [chosenGift, setChosenGift] = useState(null); // 'Hoodie' or 'Flowers & Ferrero Rocher'
  const [giftStep, setGiftStep] = useState("choose"); // 'choose', 'subchoice', 'response'
  const [pickedColour, setPickedColour] = useState(null);
  const [pickedFlower, setPickedFlower] = useState(null);
  const [pickedChoc, setPickedChoc] = useState(null);

  const swatches = [
    { hex: "#dad1cd", name: "Soft Linen" },
    { hex: "#a06cd5", name: "Lavender Dream" },
    { hex: "#212529", name: "Midnight Black" }
  ];

  const flowers = [
    { emoji: "🌹", name: "Red Roses" },
    { emoji: "🌷", name: "Pink Roses" },
    { emoji: "🌻", name: "Sunflowers" },
    { emoji: "💐", name: "Mixed Bouquet" }
  ];

  const chocs = ["Box of 8", "Box of 16", "Box of 24"];

  const handleChooseGift = (giftType) => {
    setChosenGift(giftType);
    // 300ms transition delay matching original
    setTimeout(() => {
      setGiftStep("subchoice");
    }, 300);
  };

  // ─── APOLOGY STATES & LOGIC ────────────────────────────────────────
  const [showApologyLetter, setShowApologyLetter] = useState(false);

  // ─── REVEAL STATES & LOGIC ─────────────────────────────────────────
  const [revealed, setRevealed] = useState(false);

  const sendAnswers = () => {
    const payload = {
      "📅 Date answer": dateAnswered ? "YES — she said yes to Fourways on July 17!" : "not answered yet",
      "🎁 Gift choice": chosenGift || "not chosen yet",
      "🎨 Hoodie colour": pickedColour ? `${pickedColour.name} (${pickedColour.hex})` : "N/A",
      "🌸 Flower type": pickedFlower || "N/A",
      "🍫 Choc box size": pickedChoc || "N/A",
      "_subject": "S'lindokuhle answered! 💛"
    };

    fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload)
    }).catch(() => {});
  };

  const handleSealClick = () => {
    sendAnswers();
    setRevealed(true);
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 520;

  return (
    <div className="main-content-wrapper">
      {/* PETALS */}
      <div id="petals">
        {petals.map((p) => (
          <div
            key={p.id}
            className="petal"
            style={{
              left: p.left,
              animationDuration: p.animationDuration,
              animationDelay: p.animationDelay,
              opacity: p.opacity,
              transform: `scale(${p.scale})`,
            }}
          />
        ))}
      </div>

      {/* HERO */}
      <section className="section" id="hero">
        <div className="eyebrow">a little something for</div>
        <h1>S'lindokuhle</h1>
        <p className="sub">I made this for you. Take your time.</p>
        <div className="scroll-cue" />
      </section>

      {/* LETTER */}
      <section className="section" id="letter">
        <div className="letter-card">
          <div className="letter-greeting">Sthandwa Sam,</div>
          <p>I wanted to put something into words somewhere that wasn't just a text that disappears up the screen. These past two months with you have had a way of making ordinary days feel like they're worth remembering. 🌸</p>
          <p>I don't think I've told you enough how much I notice the small things about you. The way you show up, the way you care it doesn't go unnoticed. 💛</p>
          <p>This isn't a big dramatic declaration. It's just a quiet thank you for letting me be part of your days. I'm having a really good time with you. 🤍</p>
          <div className="signoff">— Muzuvukile</div>
        </div>
        <button className="continue-btn" id="toDateGame" onClick={() => goTo("date-game")}>
          I have a question →
        </button>
      </section>

      {/* DATE GAME */}
      <section className="section" id="date-game">
        <div className="game-section">
          <div className="eyebrow">a serious question</div>
          <h2>I need your answer.</h2>
          <p className="game-intro">Think carefully. There is a right answer.</p>

          <div id="date-ask" style={{ display: dateAnswered ? "none" : "block" }}>
            <div className="date-box">
              <div className="date-question">Will you come on a date with me at Fourways? 🌹</div>
              <div className="date-detail">📅 Thursday, 17 July &nbsp;·&nbsp; 📍 Fourways</div>
              <div className="date-btns" ref={dateBtnsRef}>
                <button className="yes-btn" id="dateYes" onClick={handleYesClick}>
                  Yes, obviously 💛
                </button>
                <button
                  ref={noBtnRef}
                  style={noBtnStyle}
                  className={`no-btn ${noBtnShake ? "shake-animation" : ""}`}
                  id="dateNo"
                  onClick={runAwayNo}
                  onMouseEnter={handleNoMouseEnter}
                  key={isMobile ? `no-btn-shake-${noCount}` : "no-btn"}
                >
                  {noTexts[Math.min(noCount, noTexts.length - 1)]}
                </button>
              </div>
              {noCount > 0 && (
                <div
                  key={noCount}
                  className="angry-emoji"
                  style={{ display: "inline-block" }}
                >
                  😤
                </div>
              )}
            </div>
          </div>

          <div className={`date-yes-msg ${dateAnswered ? "active" : ""}`} id="dateYesMsg" style={{ display: dateAnswered ? "block" : "none" }}>
            <span className="big-emoji">🎉</span>
            <h3>I knew you would. 💛</h3>
            <p>July 17th, Fourways — it's a date. I'll make sure it's worth saying yes for. Keep scrolling, there's more.</p>
            <button className="continue-btn" id="toGiftGame" style={{ marginTop: "1.8rem" }} onClick={() => goTo("gift-game")}>
              next →
            </button>
          </div>
        </div>
      </section>

      {/* GIFT GAME */}
      <section className="section" id="gift-game">
        <div className="game-section">
          <div className="eyebrow">a gift is coming</div>
          <h2>What would you rather have?</h2>
          <p className="game-intro">This one actually counts. Choose wisely.</p>

          {/* Top-level choice */}
          <div 
            className="gift-top" 
            id="giftTopChoice"
            style={{ display: giftStep === "choose" ? "grid" : "none" }}
          >
            <div 
              className={`gift-card ${chosenGift === "Hoodie" ? "chosen" : ""}`} 
              id="chooseHoodie"
              style={{
                opacity: chosenGift === "Flowers & Ferrero Rocher" ? 0.4 : 1,
                pointerEvents: chosenGift === "Flowers & Ferrero Rocher" ? "none" : "auto"
              }}
              onClick={() => handleChooseGift("Hoodie")}
            >
              <span className="gift-emoji">🧥</span>
              <div className="gift-label">A Hoodie</div>
              <div className="gift-sub">warm &amp; cozy</div>
            </div>
            <div 
              className={`gift-card ${chosenGift === "Flowers & Ferrero Rocher" ? "chosen" : ""}`} 
              id="chooseFlowers"
              style={{
                opacity: chosenGift === "Hoodie" ? 0.4 : 1,
                pointerEvents: chosenGift === "Hoodie" ? "none" : "auto"
              }}
              onClick={() => handleChooseGift("Flowers & Ferrero Rocher")}
            >
              <span className="gift-emoji">💐🍫</span>
              <div className="gift-label">Flowers &amp; Ferrero</div>
              <div className="gift-sub">roses + chocolate</div>
            </div>
          </div>

          {/* HOODIE: colour picker */}
          <div 
            id="hoodieSection" 
            className={chosenGift === "Hoodie" && giftStep === "subchoice" ? "active" : ""}
            style={{ display: chosenGift === "Hoodie" && giftStep === "subchoice" ? "block" : "none" }}
          >
            <div className="colour-prompt">Now pick your favourite colour 🎨</div>
            <div className="colour-sub">These are made just for you — which one feels right?</div>
            <div className="colour-swatches">
              {swatches.map((sw) => (
                <div className="swatch-wrap" key={sw.name}>
                  <div 
                    className={`swatch ${pickedColour?.name === sw.name ? "picked" : ""}`} 
                    style={{ background: sw.hex }}
                    onClick={() => setPickedColour(sw)}
                  />
                  <div className="swatch-label">{sw.name}</div>
                </div>
              ))}
            </div>
            <button 
              className={`colour-confirm-btn ${pickedColour ? "ready" : ""}`} 
              id="colourConfirmBtn"
              onClick={() => setGiftStep("response")}
            >
              That's the one →
            </button>
          </div>

          {/* FLOWERS: flower type + chocolate size */}
          <div 
            id="flowersSection" 
            className={chosenGift === "Flowers & Ferrero Rocher" && giftStep === "subchoice" ? "active" : ""}
            style={{ display: chosenGift === "Flowers & Ferrero Rocher" && giftStep === "subchoice" ? "block" : "none" }}
          >
            <div className="flowers-prompt">Which flowers? 🌸</div>
            <div className="flowers-sub">Pick the ones that feel most like you.</div>
            <div className="flowers-grid" id="flowerGrid">
              {flowers.map((f) => (
                <div 
                  key={f.name}
                  className={`flower-card ${pickedFlower === f.name ? "chosen" : ""}`} 
                  onClick={() => setPickedFlower(f.name)}
                >
                  <span className="flower-emoji">{f.emoji}</span>
                  <div className="flower-name">{f.name}</div>
                </div>
              ))}
            </div>
            <div className="choc-prompt">And how many Ferrero Rocher? 🍫</div>
            <div className="choc-options" id="chocOptions">
              {chocs.map((c) => (
                <button 
                  key={c}
                  className={`choc-btn ${pickedChoc === c ? "chosen" : ""}`}
                  onClick={() => setPickedChoc(c)}
                >
                  {c}
                </button>
              ))}
            </div>
            <button 
              className={`flowers-confirm-btn ${pickedFlower && pickedChoc ? "ready" : ""}`} 
              id="flowersConfirmBtn"
              onClick={() => setGiftStep("response")}
            >
              Perfect, confirm →
            </button>
          </div>

          {/* Final gift response */}
          <div 
            className={`gift-response ${giftStep === "response" ? "active" : ""}`} 
            id="giftResponse"
            style={{ display: giftStep === "response" ? "block" : "none" }}
          >
            <span className="big-emoji" id="giftResponseEmoji">
              {chosenGift === "Hoodie" ? "🧥" : "💐"}
            </span>
            <h3 id="giftResponseTitle">
              {chosenGift === "Hoodie" 
                ? "One cozy hoodie, coming right up." 
                : `${pickedFlower} + ${pickedChoc} of Ferrero Rocher.`}
            </h3>
            <p id="giftResponseText">
              {chosenGift === "Hoodie"
                ? `${pickedColour?.name} — excellent taste. I'll sort it out before our date. 🧡`
                : `Sweet, just like you. I'll have them ready for July 17. 🌸🍫`}
            </p>
            <button className="continue-btn" id="toApology" style={{ marginTop: "1.8rem" }} onClick={() => goTo("apology")}>
              keep going →
            </button>
          </div>
        </div>
      </section>

      {/* APOLOGY SECTION */}
      <section className="section" id="apology">
        <div className="eyebrow">from the heart</div>
        <h2>There's something else I want to say.</h2>
        <p className="apology-hint">This part is different. You don't have to read it, but I hope you do.</p>
        
        {!showApologyLetter && (
          <button className="apology-btn" id="openApology" onClick={() => setShowApologyLetter(true)}>
            open the letter
          </button>
        )}
        
        <div className={`apology-letter ${showApologyLetter ? "active" : ""}`} id="apologyLetter" style={{ display: showApologyLetter ? "block" : "none" }}>
          <p>You might not read this or even want to, and that's okay.</p>
          <p>Not talking to you made me realize things I should have appreciated about you. Honestly, no girl has ever treated me or cared for me the way you did. You gave me space to grow and just be myself around you.</p>
          <p>You played a big part in my life in a short time, <span className="italic-line">ndinawe</span>, but I didn't see it then. I didn't try to understand you or give you space to be yourself in the relationship. I always wanted things on my terms, <span className="italic-line">ngexesha lam.</span></p>
          <p>For everything I did to hurt you, I am deeply sorry😣💔. I hope one day you find it in your heart to forgive me. I still care about you and love you, S'lindokuhle❤️.</p>
        </div>

        {showApologyLetter && (
          <button className="continue-btn" id="toReveal" style={{ marginTop: "2.4rem", display: "inline-block" }} onClick={() => goTo("reveal")}>
            one last thing →
          </button>
        )}
      </section>

      {/* FINAL REVEAL */}
      <section className="section" id="reveal">
        {!revealed ? (
          <div id="reveal-pre">
            <button className="seal" id="sealBtn" aria-label="Tap the seal" onClick={handleSealClick}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21s-7.5-4.6-10-9.3C0.3 8 1.8 4.5 5 4.5c2 0 3.5 1.2 4.2 2.6C9.9 5.7 11.4 4.5 13.4 4.5c3.2 0 4.7 3.5 3 7.2C19 16.4 12 21 12 21z" fill="#FBF6F0"/>
              </svg>
            </button>
            <p className="hint">tap the seal</p>
          </div>
        ) : (
          <div id="reveal-post" className={`active`} style={{ display: "block" }}>
            <h2>That's everything.</h2>
            <p>You made it to the end. I hope some of this made you smile, even just a little.</p>
            <p>Thank you for being you, S'lindokuhle. Truly.</p>
            <div className="final-signoff">— Muzuvukile ♡</div>
          </div>
        )}
      </section>

      <footer>made with care by Muzuvukile ♡</footer>
    </div>
  );
}

export default MainContent;
