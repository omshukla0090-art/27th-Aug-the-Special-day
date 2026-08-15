/* =====================================================================
   HOW TO ADD YOUR OWN PHOTOS & VIDEOS
   -------------------------------------------------------------------
   1. Put your photo/video files inside the "media" folder next to this
      file (e.g. media/beach-day.jpg, media/our-trip.mp4).
   2. Scroll down to the MEMORIES array below and either edit the
      existing entries or add new ones. Each entry looks like:

        { type: "image", src: "media/beach-day.jpg", caption: "Our first beach day" }
        { type: "video", src: "media/our-trip.mp4",  caption: "That road trip" }

   3. If you don't have a photo yet for a slot, just leave "src" empty
      ( src: "" ) and it will show a soft placeholder with your caption
      until you add the real file.
   4. Save the file and refresh the page — that's it, no other code
      needs to change.
===================================================================== */

const MEMORIES = [
  { type: "image", src: "media/Snapchat-56250654.jpg.jpeg", caption: "Blue Eyes wali chiknnii" },
  { type: "image", src: "media/Snapchat-976323317.jpg.jpeg", caption: "Mera bacchaa" },
  { type: "video", src: "media/Dharampur1.mp4.mp4", caption: "Dharampur Trip" },
  { type: "video", src: "media/Apunn.mp4.mp4", caption: "Together Memories" },
  { type: "video", src: "media/Walk.mp4.mp4", caption: "Walk" },
  { type: "video", src: "media/Beach.mp4.mp4", caption: "Beach flower" },
  { type: "video", src: "media/Self.mp4.mp4", caption: "Selff" },
  { type: "video", src: "media/Cutiee.mp4.mp4", caption: "Cutieee" },
  { type: "video", src: "media/Dharampur.mp4.mp4", caption: "Dharampur1" },
  { type: "image", src: "media/Snapchat-1441224001.jpg.jpeg", caption: "Your favourite trip" },
  { type: "image", src: "media/Snapchat-1832016518.jpg.jpeg", caption: "perfect day" },
  { type: "image", src: "media/Snapchat-1890422299.jpg.jpeg", caption: "always Cutiee" },
  { type: "image", src: "media/Snapchat-2047125234.jpg.jpeg", caption: "Pom Pom babee" },
];

/* ===================================================================
   STARFIELD BACKGROUND
=================================================================== */
(function stars() {
  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");
  let stars = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const count = Math.floor((canvas.width * canvas.height) / 9000);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.3 + 0.3,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.015 + 0.005,
    }));
  }

  function draw(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const s of stars) {
      const twinkle = 0.5 + 0.5 * Math.sin(t * s.speed + s.phase);
      ctx.globalAlpha = 0.25 + twinkle * 0.75;
      ctx.fillStyle = "#f7f1e6";
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  requestAnimationFrame(draw);
})();

/* ===================================================================
   AMBIENT FLOATING HEARTS
=================================================================== */
(function floatingHearts() {
  const host = document.getElementById("floatingHearts");
  const symbols = ["♥", "❤", "♥"];

  function spawn() {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.setProperty("--drift", (Math.random() * 80 - 40) + "px");
    heart.style.animationDuration = 6 + Math.random() * 5 + "s";
    heart.style.fontSize = 1 + Math.random() * 1.4 + "rem";
    host.appendChild(heart);
    setTimeout(() => heart.remove(), 12000);
  }

  setInterval(spawn, 900);
  spawn();
})();

/* ===================================================================
   THE "NO" BUTTON THAT RUNS AWAY
=================================================================== */
(function dodgingNo() {
  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");
  const teaseLine = document.getElementById("teaseLine");

  const teases = [
    "nope, try again 😏",
    "she's quick, isn't she",
    "not today",
    "yeah... that's not happening",
    "keep trying, I dare you",
    "she really doesn't want to be clicked",
  ];

  let dodgeCount = 0;
  const margin = 70; // keep button away from edges

  function moveNoButton() {
    const btnW = noBtn.offsetWidth || 120;
    const btnH = noBtn.offsetHeight || 50;
    const maxX = window.innerWidth - btnW - margin;
    const maxY = window.innerHeight - btnH - margin;
    const newX = Math.max(margin, Math.random() * maxX);
    const newY = Math.max(margin, Math.random() * maxY);

    if (!noBtn.classList.contains("roaming")) {
      noBtn.classList.add("roaming");
    }
    noBtn.style.left = newX + "px";
    noBtn.style.top = newY + "px";

    dodgeCount++;
    teaseLine.textContent = teases[Math.min(dodgeCount - 1, teases.length - 1)];

    // Yes button grows a little more encouraging with every failed attempt
    const scale = Math.min(1 + dodgeCount * 0.04, 1.5);
    yesBtn.style.transform = `scale(${scale})`;
  }

  // Desktop: dodge as soon as the cursor gets close
  noBtn.addEventListener("mouseenter", moveNoButton);
  noBtn.addEventListener("mousedown", (e) => {
    e.preventDefault();
    moveNoButton();
  });

  // Mobile: dodge on touch, before a tap can register as a click
  noBtn.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      moveNoButton();
    },
    { passive: false }
  );

  // Absolute safety net: if it's ever "clicked" anyway, it still dodges
  noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    moveNoButton();
  });
})();

/* ===================================================================
   YES -> ENVELOPE TRANSITION -> MEMORY WALL
=================================================================== */
(function yesFlow() {
  const yesBtn = document.getElementById("yesBtn");
  const proposalPage = document.getElementById("page-proposal");
  const envelope = document.getElementById("envelope");
  const memoriesPage = document.getElementById("page-memories");

  yesBtn.addEventListener("click", () => {
    proposalPage.classList.remove("active");
    envelope.classList.add("active");

    setTimeout(() => {
      envelope.classList.remove("active");
      memoriesPage.classList.add("active");
      renderGallery();
      renderLights();
      memoriesPage.scrollIntoView({ behavior: "smooth" });
    }, 2200);
  });
})();

/* ===================================================================
   FAIRY LIGHTS ROW
=================================================================== */
function renderLights() {
  const lights = document.getElementById("lights");
  if (lights.childElementCount) return;
  const bulbCount = Math.floor(window.innerWidth / 40);
  for (let i = 0; i < bulbCount; i++) {
    const bulb = document.createElement("div");
    bulb.className = "bulb";
    bulb.style.animationDelay = (Math.random() * 2).toFixed(2) + "s";
    lights.appendChild(bulb);
  }
}

/* ===================================================================
   MEMORY GALLERY RENDERER
=================================================================== */
function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  if (grid.childElementCount) return; // only render once

  MEMORIES.forEach((item, i) => {
    const card = document.createElement("div");
    card.className = "polaroid";
    card.style.setProperty("--tilt", (i % 2 === 0 ? -1 : 1) * (2 + Math.random() * 4) + "deg");

    const frame = document.createElement("div");
    frame.className = "frame";

    if (item.src) {
      if (item.type === "video") {
        const video = document.createElement("video");
        video.src = item.src;
        video.controls = true;
        video.playsInline = true;
        frame.appendChild(video);

        const badge = document.createElement("span");
        badge.className = "play-badge";
        badge.textContent = "VIDEO";
        card.appendChild(badge);
      } else {
        const img = document.createElement("img");
        img.src = item.src;
        img.alt = item.caption || "A memory";
        frame.appendChild(img);
      }
    } else {
      frame.classList.add("placeholder");
      frame.textContent =
        item.type === "video" ? "add a video in script.js →" : "add a photo in script.js →";
    }

    const caption = document.createElement("p");
    caption.className = "caption";
    caption.textContent = item.caption || "";

    card.appendChild(frame);
    card.appendChild(caption);
    grid.appendChild(card);
  });
}
