import { useState, useRef, useEffect, useCallback } from "react"
import { ImagePlus, Upload } from "lucide-react"

const fontLink = document.createElement("link")
fontLink.rel = "stylesheet"
fontLink.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;600;700&display=swap"
document.head.appendChild(fontLink)

const ORANGE = "#F7931A"
const BG     = "#232323"
const WHITE  = "#ffffff"
const DIM    = "#aaaaaa"

const SLIDES = [
  { id: "cover",        label: "1. Cover"          },
  { id: "about",        label: "2. About / Pamoja"  },
  { id: "metrics",      label: "3. Metrics"         },
  { id: "speakers",     label: "4. Speakers"        },
  { id: "sponsorship",  label: "5. Sponsorship"     },
  { id: "addons",       label: "6. Add-Ons"         },
  { id: "activities",   label: "7. Activities"      },
  { id: "venue",        label: "8. Venue"           },
  { id: "nonprofit",    label: "9. Non-Profit"      },
  { id: "contact",      label: "10. Contact"        },
]

export default function App() {
  const [slide,     setSlide]     = useState("cover")
  const [fontReady, setFontReady] = useState(false)
  const [logoImg,   setLogoImg]   = useState(null)
  const [bgImg,     setBgImg]     = useState(null)
  const canvasRef = useRef(null)
  const timerRef  = useRef(null)

  // ── SLIDE FIELDS ──────────────────────────────────────────────
  const [cover, setCover] = useState({
    title: "ADOPTING BITCOIN",
    subtitle: "EAST AFRICA 2026",
    date: "June 23–24 | A.S.K. Dome, Nairobi, Kenya",
    tagline: "Where East Africa's grassroots Bitcoin builders unite",
    badge: "SPONSORSHIP PROPOSAL",
  })

  const [about, setAbout] = useState({
    heading: "At Adopting Bitcoin East Africa, we embrace pamoja (together)",
    body: "Adopting Bitcoin East Africa's inaugural conference aims to accelerate Bitcoin adoption across Kenya, Uganda, Tanzania, Rwanda, Burundi, South Sudan, and DR Congo by showcasing technical, organizational, and everyday use cases.",
    body2: "Inspired by Bitcoin circular economies like Afribit Kibera, we bring together global Bitcoin developers, local builders, and grassroots organizations to foster real-world adoption.",
    quote: "As East Africa faces economic challenges, we see Bitcoin and these grassroots organizations as key to driving financial inclusion and positive change.",
    focus: "Bitcoin Circular Economies\nLightning Network Adoption\nBitcoin Education & Literacy\nGrassroots Community Building",
  })

  const [metrics, setMetrics] = useState({
    m1v: "40+",  m1l: "Speakers",
    m2v: "300+", m2l: "Attendees",
    m3v: "30+",  m3l: "Panels & Workshops",
    m4v: "7",    m4l: "Countries",
    countries: "Kenya · Uganda · Tanzania · Rwanda · Burundi · South Sudan · DR Congo",
  })

  const [speakers, setSpeakers] = useState({
    list: "Mitch Juma | Afribit Kibera\nBrindon Mwiine | Gorilla Sats\nSylvia Monyagi | Bitcoin Chama\nIsma Byarugaba | Orphans of Uganda\nFelix Mukungu | The Core\nAfan Sabila | Bitcoin Kampala\nJude Angella | School of Satoshi\nStephanie Ombat | Afribit\nEric Hersman | Gridless\nDon Kweka | Bitcoin Arusha",
    more: "+ Many more speakers from across East Africa and beyond...",
  })

  const [sponsorship, setSponsorship] = useState({
    t1name: "PUNDA MILIA (Zebra)", t1price: "$4,000",  t1perks: "Logo on Website\nSponsor Slide During Breaks\n1 Social Media Post\n2 x KATI Tickets",
    t2name: "CHUI (Leopard)",      t2price: "$10,000", t2perks: "Everything in Zebra\n4 Social Media Posts\nExpo Booth (3x2m)\nMentions Opening/Closing\n4 x KATI Tickets",
    t3name: "SIMBA (Lion)",        t3price: "$36,000", t3perks: "Everything in Leopard\n6 Social Media Posts\nPremium Expo Booth\nRemarks During Event\nOfficial Lanyard Branding\n8 x KATI + 1 VIP Ticket",
  })

  const [addons, setAddons] = useState({
    items: "Branded Water | Logo on bottled water, both days | $850 | 1 spot\nBranded Chai/Coffee | Logo on cup sleeves, dedicated stand | $1,200 | 1 spot\nBitcoin Quiz Night | Prize money + marketing material | $560 | 1 spot\nFilm Screening | Co-present official screening | $850 | 1 spot\nBitcoin Valley Tour | Sponsor Afribit Kibera community tour | Contact for pricing | 1 spot",
  })

  const [activities, setActivities] = useState({
    items: "Bitcoin Run | Karura Forest morning run with the Bitcoin community\nTando Night | Nairobi Street Kitchen — pay with Bitcoin via M-PESA\nFootball Match | Community football tournament in Kibera\nSpeaker Dinner | Exclusive networking for speakers and VIP sponsors\nBitcoin Valley Tour | Walking conference through Afribit Kibera circular economy\nCultural Performances | Live music and entertainment from local artists",
  })

  const [venue, setVenue] = useState({
    name: "A.S.K. Dome",
    address: "Jamhuri Park, Nairobi, Kenya",
    desc: "A spacious, centrally located venue that accommodates large plenaries and exhibition space — just 30 minutes walk from Kibera's Bitcoin Valley.",
    features: "Main Stage\nWorkshop Rooms\nExhibition Space",
  })

  const [nonprofit, setNonprofit] = useState({
    body: "ADOPTING BITCOIN EAST AFRICA is a non-profit event. All proceeds exceeding production costs will be entirely donated to local Bitcoin communities, developers and educators, with a special focus on assisting and bootstrapping grassroots Bitcoin movements in East Africa.",
    budget: "~$47,000",
    goal: "$50,000+",
    quote: "Your sponsorship directly supports Bitcoin education, merchant adoption, and community development across seven East African countries.",
  })

  const [contact, setContact] = useState({
    email: "eastafrica@adoptingbitcoin.org",
    org: "Organized by Gorilla Sats & Afribit Kibera",
    x: "@AdoptingBTC_NBO",
    nostr: "adoptingbtc_nbo",
    cta: "Join us in building Bitcoin's future across East Africa.",
  })

  useEffect(() => {
    Promise.all([
      document.fonts.load('900 60px "Playfair Display"'),
      document.fonts.load('700 30px "Inter"'),
    ]).then(() => setFontReady(true))
  }, [])

  const loadImg = (src) => new Promise((res, rej) => {
    const img = new Image(); img.crossOrigin = "anonymous"
    img.onload = () => res(img); img.onerror = rej; img.src = src
  })
  const handleLogo = (e) => {
    const f = e.target.files[0]; if (!f) return
    const r = new FileReader()
    r.onload = async ev => setLogoImg(await loadImg(ev.target.result))
    r.readAsDataURL(f)
  }
  const handleBg = (e) => {
    const f = e.target.files[0]; if (!f) return
    const r = new FileReader()
    r.onload = async ev => setBgImg(await loadImg(ev.target.result))
    r.readAsDataURL(f)
  }

  // ── DRAW HELPERS ──────────────────────────────────────────────
  const W = 1920, H = 1080

  const stripe = (ctx, y, h) => {
    const segs = [["#CC0000",0.35],["#333",0.30],["#FFFFFF",0.08],["#333",0.07],["#006600",0.20]]
    let cx = 0
    segs.forEach(([c,p]) => { ctx.fillStyle=c; ctx.fillRect(cx,y,W*p,h); cx+=W*p })
  }

  const drawBase = (ctx) => {
    // BG — photo if uploaded, else dark solid, NO overlay
    if (bgImg) {
      const sc = Math.max(W / bgImg.width, H / bgImg.height)
      const bw = bgImg.width * sc, bh = bgImg.height * sc
      ctx.drawImage(bgImg, (W - bw) / 2, (H - bh) / 2, bw, bh)
    } else {
      ctx.fillStyle = BG; ctx.fillRect(0,0,W,H)
      ctx.fillStyle = "rgba(255,255,255,0.025)"
      for(let x=40;x<W;x+=60) for(let y=40;y<H;y+=60) { ctx.beginPath(); ctx.arc(x,y,1.5,0,Math.PI*2); ctx.fill() }
    }

    // Bottom right logo only
    if (logoImg) {
      const lh=80, lw=logoImg.width*(lh/logoImg.height)
      ctx.drawImage(logoImg, W-lw-60, H-lh-40, lw, lh)
    }

    // Footer text
    ctx.font=`400 18px "Inter",sans-serif`; ctx.fillStyle="#333"; ctx.textAlign="left"
    ctx.fillText("Adopting Bitcoin East Africa 2026", 60, H-18)
    ctx.textAlign="right"; ctx.fillStyle=ORANGE
    ctx.fillText("June 23–24, Nairobi", W-60, H-18)
  }

  const wrap = (ctx, text, x, y, maxW, lineH) => {
    const words = text.split(" "); let line = ""
    for (let i=0;i<words.length;i++) {
      const test = line + words[i] + " "
      if (ctx.measureText(test).width > maxW && i > 0) { ctx.fillText(line,x,y); line=words[i]+" "; y+=lineH }
      else line=test
    }
    ctx.fillText(line,x,y); return y+lineH
  }

  // ── SLIDE RENDERERS ───────────────────────────────────────────
  const drawCover = (ctx) => {
    drawBase(ctx)
    // Big orange glow circle
    const grad = ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,500)
    grad.addColorStop(0,"rgba(247,147,26,0.12)"); grad.addColorStop(1,"rgba(0,0,0,0)")
    ctx.fillStyle=grad; ctx.fillRect(0,0,W,H)
    // Badge
    ctx.fillStyle="rgba(247,147,26,0.15)"; ctx.beginPath(); ctx.roundRect(W/2-180,200,360,44,22); ctx.fill()
    ctx.strokeStyle=ORANGE; ctx.lineWidth=1.5; ctx.beginPath(); ctx.roundRect(W/2-180,200,360,44,22); ctx.stroke()
    ctx.font=`700 18px "Inter",sans-serif`; ctx.fillStyle="#000000"; ctx.textAlign="center"
    ctx.fillText(cover.badge, W/2, 228)
    // Title
    ctx.font=`700 110px "Inter",sans-serif`; ctx.fillStyle="#000000"; ctx.textAlign="center"
    ctx.fillText(cover.title, W/2, 420)
    // Subtitle
    ctx.font=`700 52px "Inter",sans-serif`; ctx.fillStyle="#000000"; ctx.textAlign="center"
    ctx.fillText(cover.subtitle, W/2, 500)
    // Divider
    ctx.fillStyle=ORANGE; ctx.fillRect(W/2-60,535,120,4)
    // Date
    ctx.font=`700 32px "Inter",sans-serif`; ctx.fillStyle="#000000"; ctx.textAlign="center"
    ctx.fillText(cover.date, W/2, 595)
    // Tagline
    ctx.font=`400 26px "Inter",sans-serif`; ctx.fillStyle="#333333"; ctx.textAlign="center"
    ctx.fillText(cover.tagline, W/2, 650)
  }

  const drawAbout = (ctx) => {
    drawBase(ctx)

    ctx.textAlign = "left"

    // Main heading — pushed down to clear the BG banner
    ctx.font = `700 42px "Inter", sans-serif`
    const part1 = "At Adopting Bitcoin East Africa, we embrace "
    const part2 = "pamoja "
    const part3 = "(together)"
    let cx = 80, cy = 240

    ctx.fillStyle = "#000000"; ctx.fillText(part1, cx, cy)
    cx += ctx.measureText(part1).width
    ctx.fillStyle = "#000000"; ctx.fillText(part2, cx, cy)
    cx += ctx.measureText(part2).width
    ctx.fillStyle = "#000000"; ctx.fillText(part3, cx, cy)

    // Divider — black, orange is pamoja only
    ctx.fillStyle = "#000000"; ctx.fillRect(80, 262, 90, 4)

    // Body paragraph 1 — bold to match heading weight
    ctx.font = `700 26px "Inter", sans-serif`
    ctx.fillStyle = "#111111"
    let y = wrap(ctx, about.body, 80, 310, 1760, 40)

    // Body paragraph 2
    y = wrap(ctx, about.body2, 80, y + 12, 1760, 40)

    // Quote — italic bold
    ctx.font = `italic 700 26px "Inter", sans-serif`
    ctx.fillStyle = "#333333"
    wrap(ctx, `"${about.quote}"`, 80, y + 36, 1600, 40)

    // Focus areas — bottom, 2 columns, NO lightning symbol
    const focusY = H - 200
    ctx.font = `700 22px "Inter", sans-serif`
    ctx.fillStyle = "#000000"
    ctx.fillText("Core Focus Areas:", 80, focusY)

    const focusList = about.focus.split("\n").filter(Boolean)
    focusList.forEach((f, i) => {
      const col = i < 2 ? 0 : 700
      const row = i % 2
      ctx.font = `600 22px "Inter", sans-serif`
      ctx.fillStyle = "#111111"
      ctx.fillText("- " + f, 80 + col, focusY + 42 + row * 42)
    })
  }

  const drawMetrics = (ctx) => {
    drawBase(ctx)
    ctx.textAlign = "left"

    // Title
    ctx.font = `700 42px "Inter", sans-serif`; ctx.fillStyle = "#000000"
    ctx.fillText("Expected Metrics", 80, 200)
    ctx.fillStyle = ORANGE; ctx.fillRect(80, 222, 90, 4)

    // 4 big numbers in a row
    const boxes = [
      {v:metrics.m1v,l:metrics.m1l},{v:metrics.m2v,l:metrics.m2l},
      {v:metrics.m3v,l:metrics.m3l},{v:metrics.m4v,l:metrics.m4l}
    ]
    const colW = (W - 160) / 4
    boxes.forEach((b, i) => {
      const x = 80 + i * colW
      ctx.font = `700 90px "Inter", sans-serif`; ctx.fillStyle = "#000000"; ctx.textAlign = "left"
      ctx.fillText(b.v, x, 380)
      ctx.font = `700 28px "Inter", sans-serif`; ctx.fillStyle = "#111111"
      ctx.fillText(b.l, x, 425)
    })

    // Countries
    ctx.font = `700 26px "Inter", sans-serif`; ctx.fillStyle = "#000000"; ctx.textAlign = "left"
    ctx.fillText("Countries:", 80, 530)
    ctx.font = `700 26px "Inter", sans-serif`; ctx.fillStyle = "#111111"
    ctx.fillText(metrics.countries, 80, 572)
  }

  const drawSpeakers = (ctx) => {
    drawBase(ctx)
    ctx.textAlign = "left"

    ctx.font = `700 42px "Inter", sans-serif`; ctx.fillStyle = "#000000"
    ctx.fillText("Featured Speakers", 80, 200)
    ctx.fillStyle = ORANGE; ctx.fillRect(80, 222, 90, 4)

    ctx.font = `700 32px "Inter", sans-serif`; ctx.fillStyle = "#111111"
    ctx.fillText("Learn from builders, educators, and pioneers driving Bitcoin adoption across East Africa", 80, 268)

    const list = speakers.list.split("\n").filter(Boolean).slice(0, 10)
    const cols = 2, colW = (W - 160) / cols
    list.forEach((s, i) => {
      const [name, org] = s.split("|").map(x => x.trim())
      const col = i % cols, row = Math.floor(i / cols)
      const x = 80 + col * colW
      const y = 320 + row * 90  // 90px row height — name + org + breathing room

      // Name — bold black
      ctx.font = `700 26px "Inter", sans-serif`; ctx.fillStyle = "#000000"
      ctx.fillText(name || "", x, y)
      // Org — regular dark gray, on next line
      ctx.font = `400 22px "Inter", sans-serif`; ctx.fillStyle = "#444444"
      ctx.fillText(org || "", x, y + 34)
    })

    ctx.font = `400 22px "Inter", sans-serif`; ctx.fillStyle = "#444444"
    ctx.fillText(speakers.more, 80, H - 120)
  }

  const drawSponsorship = (ctx) => {
    drawBase(ctx)
    ctx.textAlign = "left"

    ctx.font = `700 42px "Inter", sans-serif`; ctx.fillStyle = "#000000"
    ctx.fillText("Sponsorship Packages", 80, 200)
    ctx.fillStyle = ORANGE; ctx.fillRect(80, 222, 90, 4)

    const tiers = [
      {name:sponsorship.t1name, price:sponsorship.t1price, perks:sponsorship.t1perks},
      {name:sponsorship.t2name, price:sponsorship.t2price, perks:sponsorship.t2perks},
      {name:sponsorship.t3name, price:sponsorship.t3price, perks:sponsorship.t3perks},
    ]
    const colW = (W - 160) / 3
    tiers.forEach((t, i) => {
      const x = 80 + i * colW

      // Tier name
      ctx.font = `700 26px "Inter", sans-serif`; ctx.fillStyle = "#000000"; ctx.textAlign = "left"
      ctx.fillText(t.name, x, 290)

      // Price
      ctx.font = `700 52px "Inter", sans-serif`; ctx.fillStyle = "#111111"
      ctx.fillText(t.price, x, 360)

      // Divider
      ctx.fillStyle = ORANGE; ctx.fillRect(x, 378, colW - 40, 2)

      // Perks
      t.perks.split("\n").forEach((p, j) => {
        ctx.font = `700 22px "Inter", sans-serif`; ctx.fillStyle = "#222222"
        ctx.fillText("- " + p.trim(), x, 420 + j * 48)
      })
    })
  }

  const drawAddons = (ctx) => {
    drawBase(ctx)
    ctx.textAlign = "left"

    ctx.font = `700 42px "Inter", sans-serif`; ctx.fillStyle = "#000000"
    ctx.fillText("Add-On Packages", 80, 200)
    ctx.fillStyle = ORANGE; ctx.fillRect(80, 222, 90, 4)

    ctx.font = `700 26px "Inter", sans-serif`; ctx.fillStyle = "#333333"
    ctx.fillText("Additional options to highlight your brand — can be added to any sponsorship package.", 80, 268)

    const items = addons.items.split("\n").filter(Boolean)
    const cols = 2, colW = (W - 160) / cols
    items.forEach((item, i) => {
      const [name, desc, price] = item.split("|").map(s => s.trim())
      const col = i % cols, row = Math.floor(i / cols)
      const x = 80 + col * colW, y = 330 + row * 140

      ctx.font = `700 26px "Inter", sans-serif`; ctx.fillStyle = "#000000"
      ctx.fillText(name, x, y)
      ctx.font = `700 22px "Inter", sans-serif`; ctx.fillStyle = "#222222"
      wrap(ctx, desc, x, y + 36, colW - 60, 32)
      ctx.font = `700 24px "Inter", sans-serif`; ctx.fillStyle = "#111111"
      ctx.fillText(price, x, y + 100)
    })
  }

  const drawActivities = (ctx) => {
    drawBase(ctx)
    ctx.textAlign = "left"

    ctx.font = `700 42px "Inter", sans-serif`; ctx.fillStyle = "#000000"
    ctx.fillText("Side Activities", 80, 200)
    ctx.fillStyle = ORANGE; ctx.fillRect(80, 222, 90, 4)

    ctx.font = `700 32px "Inter", sans-serif`; ctx.fillStyle = "#111111"
    ctx.fillText("Beyond the main program — community experiences that make ABEA unforgettable.", 80, 268)

    const items = activities.items.split("\n").filter(Boolean)
    const cols = 2, colW = (W - 160) / cols
    items.forEach((item, i) => {
      // Strip emojis — remove any leading non-ASCII characters
      let [rawTitle, desc] = item.split("|").map(s => s.trim())
      const title = rawTitle.replace(/[\u{1F000}-\u{1FFFF}]|[\u{2600}-\u{27FF}]|[\u{1F300}-\u{1F9FF}]/gu, "").trim()

      const col = i % cols, row = Math.floor(i / cols)
      const x = 80 + col * colW
      const y = 320 + row * 130

      // Title — bold black
      ctx.font = `700 26px "Inter", sans-serif`; ctx.fillStyle = "#000000"
      ctx.fillText(title, x, y)
      // Desc — regular dark
      ctx.font = `400 22px "Inter", sans-serif`; ctx.fillStyle = "#333333"
      wrap(ctx, desc || "", x, y + 36, colW - 80, 32)
    })
  }

  const drawVenue = (ctx) => {
    drawBase(ctx)
    ctx.textAlign = "left"

    ctx.font = `700 42px "Inter", sans-serif`; ctx.fillStyle = "#000000"
    ctx.fillText("Conference Venue", 80, 200)
    ctx.fillStyle = ORANGE; ctx.fillRect(80, 222, 90, 4)

    ctx.font = `700 52px "Inter", sans-serif`; ctx.fillStyle = "#000000"
    ctx.fillText(venue.name, 80, 310)

    ctx.font = `700 30px "Inter", sans-serif`; ctx.fillStyle = "#111111"
    ctx.fillText(venue.address, 80, 360)

    ctx.font = `700 26px "Inter", sans-serif`; ctx.fillStyle = "#333333"
    wrap(ctx, venue.desc, 80, 420, 1400, 40)

    // Features
    const feats = venue.features.split("\n").filter(Boolean)
    ctx.font = `700 26px "Inter", sans-serif`; ctx.fillStyle = "#000000"
    ctx.fillText("Facilities:", 80, 560)
    feats.forEach((f, i) => {
      ctx.font = `700 26px "Inter", sans-serif`; ctx.fillStyle = "#111111"
      ctx.fillText("- " + f, 80 + i * 400, 606)
    })
  }

  const drawNonprofit = (ctx) => {
    drawBase(ctx)
    ctx.textAlign = "left"

    ctx.font = `700 42px "Inter", sans-serif`; ctx.fillStyle = "#000000"
    ctx.fillText("Non-Profit Event", 80, 200)
    ctx.fillStyle = ORANGE; ctx.fillRect(80, 222, 90, 4)

    ctx.font = `700 26px "Inter", sans-serif`; ctx.fillStyle = "#111111"
    let y = wrap(ctx, nonprofit.body, 80, 270, 1760, 40)

    // Budget & Goal
    ctx.font = `700 26px "Inter", sans-serif`; ctx.fillStyle = "#000000"
    ctx.fillText("Production Budget:", 80, y + 60)
    ctx.font = `700 52px "Inter", sans-serif`; ctx.fillStyle = "#111111"
    ctx.fillText(nonprofit.budget, 80, y + 120)

    ctx.font = `700 26px "Inter", sans-serif`; ctx.fillStyle = "#000000"
    ctx.fillText("Sponsorship Goal:", 700, y + 60)
    ctx.font = `700 52px "Inter", sans-serif`; ctx.fillStyle = "#111111"
    ctx.fillText(nonprofit.goal, 700, y + 120)

    // Quote
    ctx.font = `italic 700 26px "Inter", sans-serif`; ctx.fillStyle = "#333333"
    wrap(ctx, `"${nonprofit.quote}"`, 80, y + 180, 1600, 40)
  }

  const drawContact = (ctx) => {
    drawBase(ctx)
    ctx.textAlign = "left"

    ctx.font = `700 42px "Inter", sans-serif`; ctx.fillStyle = "#000000"
    ctx.fillText("Get In Touch", 80, 200)
    ctx.fillStyle = ORANGE; ctx.fillRect(80, 222, 90, 4)

    ctx.font = `700 26px "Inter", sans-serif`; ctx.fillStyle = "#333333"
    ctx.fillText(contact.cta, 80, 280)

    ctx.font = `700 38px "Inter", sans-serif`; ctx.fillStyle = "#000000"
    ctx.fillText(contact.email, 80, 360)

    ctx.font = `700 28px "Inter", sans-serif`; ctx.fillStyle = "#111111"
    ctx.fillText(contact.org, 80, 420)

    ctx.fillStyle = ORANGE; ctx.fillRect(80, 445, 90, 3)

    ctx.font = `700 26px "Inter", sans-serif`; ctx.fillStyle = "#111111"
    ctx.fillText(`X / Twitter: ${contact.x}`, 80, 500)
    ctx.fillText(`Nostr: ${contact.nostr}`, 80, 548)

    ctx.font = `700 30px "Inter", sans-serif`; ctx.fillStyle = "#000000"
    ctx.fillText("#ABEA2026  #AdoptingBitcoin  #Bitcoin", 80, H - 120)
  }

  const draw = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return
    canvas.width = W; canvas.height = H
    const ctx = canvas.getContext("2d")
    if      (slide==="cover")       drawCover(ctx)
    else if (slide==="about")       drawAbout(ctx)
    else if (slide==="metrics")     drawMetrics(ctx)
    else if (slide==="speakers")    drawSpeakers(ctx)
    else if (slide==="sponsorship") drawSponsorship(ctx)
    else if (slide==="addons")      drawAddons(ctx)
    else if (slide==="activities")  drawActivities(ctx)
    else if (slide==="venue")       drawVenue(ctx)
    else if (slide==="nonprofit")   drawNonprofit(ctx)
    else if (slide==="contact")     drawContact(ctx)
  }, [slide, cover, about, metrics, speakers, sponsorship, addons, activities, venue, nonprofit, contact, logoImg, bgImg, fontReady])

  useEffect(() => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(draw, 80)
  }, [draw])

  const download = () => {
    draw()
    const a = document.createElement("a")
    a.download = `ABEA2026_${slide}.png`
    a.href = canvasRef.current.toDataURL("image/png", 1.0)
    a.click()
  }

  const inp  = { background:"#2a2200", border:"1px solid #3a3010", borderRadius:8, color:"#f0e0b0", fontSize:"0.88rem", padding:"9px 12px", width:"100%", boxSizing:"border-box", outline:"none" }
  const ta   = { ...inp, minHeight:80, resize:"vertical", fontFamily:"inherit" }
  const lbl  = (t) => <div style={{color:"#6a5820",fontSize:"0.68rem",textTransform:"uppercase",marginBottom:4,marginTop:10}}>{t}</div>

  const renderFields = () => {
    if (slide==="cover") return <>
      {lbl("Badge")}    <input style={inp} value={cover.badge}    onChange={e=>setCover({...cover,badge:e.target.value})} />
      {lbl("Title")}    <input style={inp} value={cover.title}    onChange={e=>setCover({...cover,title:e.target.value})} />
      {lbl("Subtitle")} <input style={inp} value={cover.subtitle} onChange={e=>setCover({...cover,subtitle:e.target.value})} />
      {lbl("Date")}     <input style={inp} value={cover.date}     onChange={e=>setCover({...cover,date:e.target.value})} />
      {lbl("Tagline")}  <input style={inp} value={cover.tagline}  onChange={e=>setCover({...cover,tagline:e.target.value})} />
    </>
    if (slide==="about") return <>
      {lbl("Heading")}       <textarea style={ta} value={about.heading} onChange={e=>setAbout({...about,heading:e.target.value})} />
      {lbl("Body paragraph 1")} <textarea style={ta} value={about.body}  onChange={e=>setAbout({...about,body:e.target.value})} />
      {lbl("Body paragraph 2")} <textarea style={ta} value={about.body2} onChange={e=>setAbout({...about,body2:e.target.value})} />
      {lbl("Quote")}         <textarea style={ta} value={about.quote}  onChange={e=>setAbout({...about,quote:e.target.value})} />
      {lbl("Focus areas (one per line)")} <textarea style={ta} value={about.focus} onChange={e=>setAbout({...about,focus:e.target.value})} />
    </>
    if (slide==="metrics") return <>
      {["m1","m2","m3","m4"].map((k,i)=><div key={k} style={{display:"flex",gap:8,marginTop:8}}>
        <input style={{...inp,width:90}} value={metrics[`${k}v`]} onChange={e=>setMetrics({...metrics,[`${k}v`]:e.target.value})} placeholder="40+" />
        <input style={inp}              value={metrics[`${k}l`]} onChange={e=>setMetrics({...metrics,[`${k}l`]:e.target.value})} placeholder="Label" />
      </div>)}
      {lbl("Countries (· separated)")} <input style={inp} value={metrics.countries} onChange={e=>setMetrics({...metrics,countries:e.target.value})} />
    </>
    if (slide==="speakers") return <>
      {lbl("Speakers (one per line: Name | Org)")} <textarea style={{...ta,minHeight:200}} value={speakers.list} onChange={e=>setSpeakers({...speakers,list:e.target.value})} />
      {lbl("Footer note")} <input style={inp} value={speakers.more} onChange={e=>setSpeakers({...speakers,more:e.target.value})} />
    </>
    if (slide==="sponsorship") return <>
      {["t1","t2","t3"].map((t,i)=><div key={t}>
        <div style={{color:ORANGE,fontSize:"0.8rem",marginTop:14,fontWeight:700}}>Tier {i+1}</div>
        {lbl("Name")}  <input style={inp} value={sponsorship[`${t}name`]}  onChange={e=>setSponsorship({...sponsorship,[`${t}name`]:e.target.value})} />
        {lbl("Price")} <input style={inp} value={sponsorship[`${t}price`]} onChange={e=>setSponsorship({...sponsorship,[`${t}price`]:e.target.value})} />
        {lbl("Perks (one per line)")} <textarea style={ta} value={sponsorship[`${t}perks`]} onChange={e=>setSponsorship({...sponsorship,[`${t}perks`]:e.target.value})} />
      </div>)}
    </>
    if (slide==="addons") return <>
      {lbl("Add-ons (Name | Desc | Price | Spot — one per line)")} <textarea style={{...ta,minHeight:160}} value={addons.items} onChange={e=>setAddons({...addons,items:e.target.value})} />
    </>
    if (slide==="activities") return <>
      {lbl("Activities (Emoji Title | Desc — one per line)")} <textarea style={{...ta,minHeight:180}} value={activities.items} onChange={e=>setActivities({...activities,items:e.target.value})} />
    </>
    if (slide==="venue") return <>
      {lbl("Venue Name")}    <input style={inp} value={venue.name}     onChange={e=>setVenue({...venue,name:e.target.value})} />
      {lbl("Address")}       <input style={inp} value={venue.address}  onChange={e=>setVenue({...venue,address:e.target.value})} />
      {lbl("Description")}   <textarea style={ta} value={venue.desc}   onChange={e=>setVenue({...venue,desc:e.target.value})} />
      {lbl("Features (one per line)")} <textarea style={ta} value={venue.features} onChange={e=>setVenue({...venue,features:e.target.value})} />
    </>
    if (slide==="nonprofit") return <>
      {lbl("Body")}              <textarea style={ta} value={nonprofit.body}   onChange={e=>setNonprofit({...nonprofit,body:e.target.value})} />
      {lbl("Budget")}            <input style={inp} value={nonprofit.budget}   onChange={e=>setNonprofit({...nonprofit,budget:e.target.value})} />
      {lbl("Goal")}              <input style={inp} value={nonprofit.goal}     onChange={e=>setNonprofit({...nonprofit,goal:e.target.value})} />
      {lbl("Quote")}             <textarea style={ta} value={nonprofit.quote}  onChange={e=>setNonprofit({...nonprofit,quote:e.target.value})} />
    </>
    if (slide==="contact") return <>
      {lbl("Email")}   <input style={inp} value={contact.email}  onChange={e=>setContact({...contact,email:e.target.value})} />
      {lbl("Org")}     <input style={inp} value={contact.org}    onChange={e=>setContact({...contact,org:e.target.value})} />
      {lbl("X")}       <input style={inp} value={contact.x}      onChange={e=>setContact({...contact,x:e.target.value})} />
      {lbl("Nostr")}   <input style={inp} value={contact.nostr}  onChange={e=>setContact({...contact,nostr:e.target.value})} />
      {lbl("CTA")}     <input style={inp} value={contact.cta}    onChange={e=>setContact({...contact,cta:e.target.value})} />
    </>
  }

  return (
    <>
      <style>{`body,html{margin:0;padding:0;background:#111000;overflow-x:hidden;} textarea{font-family:inherit;}`}</style>
      <div style={{minHeight:"100vh",padding:"20px 16px",boxSizing:"border-box"}}>

        <div style={{textAlign:"center",marginBottom:20}}>
          <h1 style={{margin:0,color:ORANGE,fontFamily:"Impact",letterSpacing:3,fontSize:"1.6rem"}}>ABEA PROPOSAL BUILDER</h1>
          <p style={{margin:0,color:"#6a5820",fontSize:"0.6rem",letterSpacing:2}}>ADOPTING BITCOIN EAST AFRICA 2026 — 1920×1080 SLIDES</p>
        </div>

        <div style={{maxWidth:540,margin:"0 auto",display:"flex",flexDirection:"column",gap:8}}>

          {/* Slide selector */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
            {SLIDES.map(s=>(
              <button key={s.id} onClick={()=>setSlide(s.id)} style={{
                padding:"9px 8px",borderRadius:8,cursor:"pointer",fontSize:"0.78rem",fontWeight:700,textAlign:"left",
                background:slide===s.id?ORANGE:"#221c00",
                color:slide===s.id?"#000":"#5a4820",
                border:slide===s.id?"none":"1px solid #3a3010"
              }}>{s.label}</button>
            ))}
          </div>

          {/* Logo upload */}
          <label style={{display:"flex",alignItems:"center",gap:10,border:"2px dashed #3a3010",borderRadius:8,padding:10,background:"#221c00",cursor:"pointer",marginTop:4}}>
            <input type="file" accept="image/*" onChange={handleLogo} style={{display:"none"}} />
            <Upload size={18} color={logoImg ? ORANGE : "#5a4820"} />
            <span style={{color:logoImg?ORANGE:"#5a4820",fontSize:"0.85rem"}}>{logoImg?"Logo loaded ✓":"Upload AB Logo (optional)"}</span>
          </label>

          {/* BG upload */}
          <label style={{display:"flex",alignItems:"center",gap:10,border:"2px dashed #3a3010",borderRadius:8,padding:10,background:"#221c00",cursor:"pointer"}}>
            <input type="file" accept="image/*" onChange={handleBg} style={{display:"none"}} />
            <ImagePlus size={18} color={bgImg ? ORANGE : "#5a4820"} />
            <span style={{color:bgImg?ORANGE:"#5a4820",fontSize:"0.85rem"}}>{bgImg?"Background loaded ✓":"Upload Slide Background (optional)"}</span>
          </label>

          {/* Fields */}
          {renderFields()}

          {/* Preview label */}
          <div style={{textAlign:"center",fontSize:"0.6rem",color:"#5a4820",textTransform:"uppercase",marginTop:14}}>
            Preview (1920×1080)
          </div>

          {/* Canvas */}
          <canvas ref={canvasRef} style={{width:"100%",borderRadius:8,boxShadow:"0 10px 30px rgba(0,0,0,0.6)"}} />

          {/* Download */}
          <button onClick={download} style={{background:ORANGE,border:"none",borderRadius:10,color:"#000",fontWeight:900,padding:"14px",cursor:"pointer",width:"100%",marginTop:4,fontSize:"1rem"}}>
            ⬇ Download Slide PNG
          </button>

        </div>
      </div>
    </>
  )
}

