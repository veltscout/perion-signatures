import { useState, useCallback } from "react";

// ── CONSTANTS ──────────────────────────────────────────────────────────────
const LOGO_URL  = "https://raw.githubusercontent.com/veltscout/perion-email-signatures/main/PERION-Primary-Logo-Transparent.png";
const WEBSITE   = "https://www.perionlighting.com";
const WEBSITE_D = "www.perionlighting.com";
const DOMAIN    = "@perionlighting.com";
const COMPANY   = "Perion Lighting — A Sunbird Lighting Company";
const DISCLAIMER= "CONFIDENTIALITY NOTICE: This communication and any attachments are intended solely for the named addressee(s) and may contain confidential information. If you have received this in error, please notify the sender immediately and delete this message. Perion Lighting Systems (Pty) Ltd — A Sunbird Lighting Company.";

const SOCIALS = [
  { label:"LinkedIn",  url:"https://www.linkedin.com/company/perion-lighting", icon:"in" },
  { label:"Facebook",  url:"https://www.facebook.com/perionlighting",          icon:"f"  },
  { label:"YouTube",   url:"https://www.youtube.com/@perionlighting",           icon:"▶"  },
  { label:"Instagram", url:"https://www.instagram.com/perionlighting",          icon:"ig" },
];

const C = {
  midnight:"#0A1D33",
  graphite:"#2B2E34",
  amber:   "#F2A900",
  grey:    "#F5F5F7",
  white:   "#FFFFFF",
};

// ── HELPERS ────────────────────────────────────────────────────────────────
const phoneRow = (prefix, num) => !num ? "" : `
<tr>
  <td style="padding:1px 0;font-size:11px;font-family:Arial,Helvetica,sans-serif;
      color:${C.graphite};font-variant-numeric:tabular-nums;white-space:nowrap;">
    <span style="font-size:9px;font-weight:700;color:${C.midnight};
        text-transform:uppercase;letter-spacing:0.06em;">${prefix}</span>
    &nbsp;${num}
  </td>
</tr>`;

const socialIconCell = ({ label, url, icon }) => `
<td style="padding:0 5px 0 0;">
  <a href="${url}" target="_blank" rel="noopener"
    style="display:inline-block;width:22px;height:22px;background:${C.midnight};
        color:${C.amber};font-family:Arial,Helvetica,sans-serif;font-size:9px;
        font-weight:700;text-align:center;line-height:22px;text-decoration:none;
        letter-spacing:0;" title="${label}">
    ${icon}
  </a>
</td>`;

// ── NEW EMAIL SIGNATURE HTML ───────────────────────────────────────────────
function buildNew(v) {
  const dept = v.dept ? `${v.dept}&nbsp;&middot;&nbsp;` : "";
  return `
<table width="560" cellpadding="0" cellspacing="0" border="0"
  style="font-family:Arial,Helvetica,sans-serif;border-collapse:collapse;max-width:560px;">
  <tr>
    <!-- LOGO COL -->
    <td width="165" valign="middle"
      style="padding:0 18px 0 0;border-right:3px solid ${C.amber};">
      <a href="${WEBSITE}" target="_blank" rel="noopener">
        <img src="${LOGO_URL}"
          alt="Perion Lighting — Perimeter Lighting Systems"
          width="165" border="0"
          style="display:block;width:165px;height:auto;max-width:180px;" />
      </a>
    </td>
    <!-- DETAILS COL -->
    <td valign="top" style="padding:0 0 0 18px;">
      <table cellpadding="0" cellspacing="0" border="0"
        style="font-family:Arial,Helvetica,sans-serif;border-collapse:collapse;">
        <!-- NAME -->
        <tr>
          <td style="padding:0 0 2px 0;font-size:16px;font-weight:700;
              color:${C.midnight};font-family:Arial,Helvetica,sans-serif;
              letter-spacing:0.02em;text-transform:uppercase;line-height:1.2;">
            ${v.name}
          </td>
        </tr>
        <!-- TITLE -->
        <tr>
          <td style="padding:0 0 1px 0;font-size:12px;color:${C.graphite};
              font-family:Arial,Helvetica,sans-serif;line-height:1.4;">
            ${v.title}
          </td>
        </tr>
        <!-- DEPT / COMPANY -->
        <tr>
          <td style="padding:0 0 8px 0;font-size:10px;color:#888888;
              font-family:Arial,Helvetica,sans-serif;">
            ${dept}${COMPANY}
          </td>
        </tr>
        <!-- PHONE ROWS -->
        ${phoneRow("M:", v.mobile)}
        ${phoneRow("O:", v.office)}
        ${phoneRow("D:", v.direct)}
        <!-- EMAIL -->
        <tr>
          <td style="padding:7px 0 1px 0;font-size:11px;
              font-family:Arial,Helvetica,sans-serif;">
            <span style="font-size:9px;font-weight:700;color:${C.midnight};
                text-transform:uppercase;letter-spacing:0.06em;">E:</span>
            &nbsp;<a href="mailto:${v.email}"
              style="color:${C.amber};text-decoration:none;
                  font-size:11px;font-family:Arial,Helvetica,sans-serif;">
              ${v.email}
            </a>
          </td>
        </tr>
        <!-- WEBSITE -->
        <tr>
          <td style="padding:1px 0 8px 0;font-size:11px;
              font-family:Arial,Helvetica,sans-serif;">
            <span style="font-size:9px;font-weight:700;color:${C.midnight};
                text-transform:uppercase;letter-spacing:0.06em;">W:</span>
            &nbsp;<a href="${WEBSITE}"
              style="color:${C.amber};text-decoration:none;
                  font-size:11px;font-family:Arial,Helvetica,sans-serif;">
              ${WEBSITE_D}
            </a>
          </td>
        </tr>
        <!-- SOCIAL ICONS -->
        <tr>
          <td style="padding:0 0 0 0;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                ${SOCIALS.map(socialIconCell).join("")}
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <!-- AMBER RULE -->
  <tr>
    <td colspan="2" style="padding-top:12px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="border-top:2px solid ${C.amber};padding-top:8px;
              font-size:8.5px;color:#AAAAAA;
              font-family:Arial,Helvetica,sans-serif;line-height:1.5;">
            ${DISCLAIMER}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

// ── REPLY / FORWARD SIGNATURE HTML ────────────────────────────────────────
function buildReply(v) {
  const dept  = v.dept ? ` &middot; ${v.dept}` : "";
  const phone = [
    v.mobile ? `<b style="font-size:9px;color:${C.midnight};">M:</b>&nbsp;${v.mobile}` : "",
    v.office ? `<b style="font-size:9px;color:${C.midnight};">O:</b>&nbsp;${v.office}` : "",
    v.direct ? `<b style="font-size:9px;color:${C.midnight};">D:</b>&nbsp;${v.direct}` : "",
  ].filter(Boolean).join("&nbsp;&nbsp;&middot;&nbsp;&nbsp;");

  return `
<table cellpadding="0" cellspacing="0" border="0"
  style="font-family:Arial,Helvetica,sans-serif;border-collapse:collapse;">
  <tr>
    <td style="border-left:3px solid ${C.amber};padding:4px 0 4px 14px;">
      <table cellpadding="0" cellspacing="0" border="0">
        <!-- NAME · TITLE · COMPANY -->
        <tr>
          <td style="padding-bottom:2px;font-size:13px;font-weight:700;
              color:${C.midnight};font-family:Arial,Helvetica,sans-serif;
              text-transform:uppercase;letter-spacing:0.02em;white-space:nowrap;">
            ${v.name}
            <span style="font-weight:400;color:${C.graphite};font-size:11px;
                text-transform:none;">
              &nbsp;&middot;&nbsp;${v.title}${dept}&nbsp;&middot;&nbsp;${COMPANY}
            </span>
          </td>
        </tr>
        <!-- PHONES -->
        ${phone ? `<tr><td style="padding-bottom:2px;font-size:11px;color:${C.graphite};
            font-family:Arial,Helvetica,sans-serif;font-variant-numeric:tabular-nums;">
            ${phone}
          </td></tr>` : ""}
        <!-- EMAIL · WEB -->
        <tr>
          <td style="padding-bottom:4px;font-size:11px;
              font-family:Arial,Helvetica,sans-serif;">
            <b style="font-size:9px;color:${C.midnight};">E:</b>&nbsp;
            <a href="mailto:${v.email}"
              style="color:${C.amber};text-decoration:none;">${v.email}</a>
            &nbsp;&middot;&nbsp;
            <b style="font-size:9px;color:${C.midnight};">W:</b>&nbsp;
            <a href="${WEBSITE}"
              style="color:${C.amber};text-decoration:none;">${WEBSITE_D}</a>
          </td>
        </tr>
        <!-- SOCIAL ICONS (compact) -->
        <tr>
          <td>
            <table cellpadding="0" cellspacing="0" border="0"><tr>
              ${SOCIALS.map(socialIconCell).join("")}
            </tr></table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

// ── PORTAL SHELL STYLES (inline objects) ──────────────────────────────────
const sh = {
  page:      { background:C.grey, minHeight:"100vh", fontFamily:"'Inter',Arial,sans-serif" },
  header:    { background:C.midnight, borderBottom:`4px solid ${C.amber}`, padding:"16px 32px",
               display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 },
  wordmark:  { color:C.white, fontSize:"1.45rem", fontWeight:800, letterSpacing:"0.12em", lineHeight:1 },
  subline:   { color:C.amber, fontSize:"0.58rem", fontWeight:600, letterSpacing:"0.18em",
               textTransform:"uppercase", marginTop:3 },
  docId:     { color:C.amber, fontSize:"0.6rem", letterSpacing:"0.1em", textTransform:"uppercase",
               marginTop:3, textAlign:"right" },
  hTitle:    { color:C.white, fontSize:"0.85rem", fontWeight:600, textAlign:"right" },
  rail:      { background:C.white, borderBottom:"1px solid #DDD", padding:"0 32px",
               display:"flex", alignItems:"stretch", overflowX:"auto" },
  railStep:  { display:"flex", alignItems:"center", gap:8, padding:"12px 18px 12px 0", whiteSpace:"nowrap" },
  railDot:   { width:26, height:26, borderRadius:"50%", background:C.midnight, color:C.amber,
               fontWeight:800, fontSize:"0.72rem", display:"flex", alignItems:"center",
               justifyContent:"center", flexShrink:0 },
  railLbl:   { fontSize:"0.68rem", fontWeight:700, color:C.midnight, textTransform:"uppercase",
               letterSpacing:"0.07em" },
  railDiv:   { color:"#CCC", fontSize:"1.1rem", padding:"0 10px" },
  main:      { maxWidth:1100, margin:"0 auto", padding:"28px 32px 60px" },
  callout:   { background:C.white, borderLeft:`4px solid ${C.amber}`, padding:"12px 18px",
               marginBottom:24, fontSize:"0.8rem", lineHeight:1.6, maxWidth:"75ch", color:C.graphite },
  panel:     { background:C.white, border:"1px solid #E0E0E0", borderTop:`3px solid ${C.midnight}`,
               marginBottom:24 },
  panelHdr:  { background:C.midnight, padding:"10px 20px", display:"flex", alignItems:"center", gap:10 },
  panelH2:   { color:C.white, fontSize:"0.74rem", fontWeight:700, letterSpacing:"0.08em",
               textTransform:"uppercase" },
  badge:     { background:C.amber, color:C.midnight, fontWeight:800, fontSize:"0.7rem",
               width:20, height:20, borderRadius:"50%", display:"flex",
               alignItems:"center", justifyContent:"center", flexShrink:0 },
  panelBody: { padding:"22px 22px" },
  formGrid:  { display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px 24px" },
  fgFull:    { gridColumn:"1/-1" },
  fgThird:   { display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"16px 18px", gridColumn:"1/-1" },
  label:     { fontSize:"0.64rem", fontWeight:700, color:C.midnight, textTransform:"uppercase",
               letterSpacing:"0.09em", display:"block", marginBottom:4 },
  req:       { color:C.amber },
  hint:      { color:"#999", fontWeight:400, textTransform:"none", letterSpacing:0, fontSize:"0.63rem" },
  input:     { border:`1.5px solid #CCC`, padding:"8px 11px", fontFamily:"inherit", fontSize:"0.86rem",
               color:C.graphite, background:C.white, outline:"none", width:"100%",
               fontVariantNumeric:"tabular-nums" },
  emailWrap: { display:"flex" },
  domLock:   { background:C.midnight, color:C.amber, padding:"8px 12px", fontSize:"0.75rem",
               fontWeight:700, whiteSpace:"nowrap", border:`1.5px solid ${C.midnight}`,
               letterSpacing:"0.03em", flexShrink:0 },
  fieldNote: { fontSize:"0.63rem", color:"#999", marginTop:3 },
  tabBar:    { display:"flex", borderBottom:`2px solid ${C.midnight}`, background:C.grey },
  tabBtnBase:{ padding:"10px 20px", border:"none", background:"transparent", fontFamily:"inherit",
               fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase",
               cursor:"pointer", borderBottom:"3px solid transparent", marginBottom:"-2px",
               transition:"all .15s" },
  prevLabel: { fontSize:"0.62rem", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em",
               color:"#AAA", marginBottom:8 },
  prevFrame: { border:"1px dashed #CCC", background:C.white, padding:20, marginBottom:16,
               overflow:"auto", minHeight:80 },
  copyRow:   { display:"flex", alignItems:"center", gap:14, flexWrap:"wrap" },
  // The two distinct button styles:
  btnNew:    { display:"inline-flex", alignItems:"center", gap:8, background:C.midnight,
               color:C.white, border:"none", padding:"11px 22px", fontFamily:"inherit",
               fontSize:"0.72rem", fontWeight:800, letterSpacing:"0.1em",
               textTransform:"uppercase", cursor:"pointer" },
  btnReply:  { display:"inline-flex", alignItems:"center", gap:8, background:C.amber,
               color:C.midnight, border:"none", padding:"11px 22px", fontFamily:"inherit",
               fontSize:"0.72rem", fontWeight:800, letterSpacing:"0.1em",
               textTransform:"uppercase", cursor:"pointer" },
  copyHint:  { fontSize:"0.7rem", color:"#888", maxWidth:"50ch", lineHeight:1.5 },
  clientTabs:{ display:"flex", gap:8, marginBottom:18, flexWrap:"wrap" },
  cliBtnBase:{ padding:"7px 16px", border:`2px solid ${C.midnight}`, background:C.white,
               color:C.midnight, fontFamily:"inherit", fontSize:"0.68rem", fontWeight:700,
               letterSpacing:"0.07em", textTransform:"uppercase", cursor:"pointer" },
  cliBtnAct: { background:C.midnight, color:C.amber },
  iStep:     { display:"flex", gap:12, alignItems:"flex-start", padding:"12px 0",
               borderBottom:`1px solid ${C.grey}` },
  iNum:      { width:28, height:28, background:C.amber, color:C.midnight, fontWeight:800,
               fontSize:"0.76rem", display:"flex", alignItems:"center",
               justifyContent:"center", flexShrink:0 },
  iH3:       { fontSize:"0.8rem", fontWeight:700, color:C.midnight, marginBottom:3 },
  iP:        { fontSize:"0.78rem", color:C.graphite, lineHeight:1.6, maxWidth:"68ch" },
  pill:      { display:"inline-block", background:C.grey, border:"1px solid #CCC",
               fontFamily:"'Courier New',monospace", fontSize:"0.72rem", padding:"1px 6px",
               color:C.midnight },
  warnNote:  { background:C.grey, borderLeft:`3px solid ${C.amber}`, padding:"9px 13px",
               fontSize:"0.73rem", color:C.graphite, marginTop:14, maxWidth:"68ch", lineHeight:1.6 },
  footer:    { background:C.midnight, borderTop:`2px solid ${C.amber}`, padding:"12px 32px",
               textAlign:"center" },
  footerTxt: { color:"#555", fontSize:"0.64rem", letterSpacing:"0.06em" },
};

// ── COMPONENT ─────────────────────────────────────────────────────────────
export default function SignaturePortal() {
  const [form, setForm] = useState({
    first:"", last:"", title:"", dept:"", user:"", mobile:"", office:"", direct:""
  });
  const [sigTab,    setSigTab]    = useState("new");
  const [clientTab, setClientTab] = useState("outlook");
  const [copyState, setCopyState] = useState({ new:"idle", reply:"idle" });

  const upd = (k, val) => setForm(p => ({ ...p, [k]: val }));

  const v = {
    name:   [form.first, form.last].filter(Boolean).join(" ") || "Your Name",
    title:  form.title  || "Your Title",
    dept:   form.dept,
    mobile: form.mobile,
    office: form.office,
    direct: form.direct,
    email:  (form.user ? form.user.toLowerCase() : "name") + DOMAIN,
  };

  const newSigHTML   = buildNew(v);
  const replySigHTML = buildReply(v);

  const copySig = useCallback(async (type) => {
    const html = type === "new" ? newSigHTML : replySigHTML;
    try {
      if (navigator.clipboard && window.ClipboardItem) {
        const plain = (type === "new"
          ? `${v.name}\n${v.title}\n${COMPANY}\n${v.mobile ? "M: "+v.mobile+"\n" : ""}${v.office ? "O: "+v.office+"\n" : ""}${v.direct ? "D: "+v.direct+"\n" : ""}E: ${v.email}\nW: ${WEBSITE_D}`
          : `${v.name} · ${v.title} · ${COMPANY}\n${v.email} · ${WEBSITE_D}`);
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/html":  new Blob([html],  { type:"text/html" }),
            "text/plain": new Blob([plain], { type:"text/plain" }),
          })
        ]);
      } else {
        const el = document.getElementById(`prev-${type}`);
        const r  = document.createRange();
        r.selectNodeContents(el);
        const s = window.getSelection();
        s.removeAllRanges(); s.addRange(r);
        document.execCommand("copy");
        s.removeAllRanges();
      }
      setCopyState(p => ({ ...p, [type]:"ok" }));
    } catch {
      setCopyState(p => ({ ...p, [type]:"err" }));
    }
    setTimeout(() => setCopyState(p => ({ ...p, [type]:"idle" })), 3500);
  }, [newSigHTML, replySigHTML, v]);

  const Pill = ({ t }) => <span style={sh.pill}>{t}</span>;

  const copyLabel = (type) => ({
    idle: type === "new" ? "⧉  COPY NEW EMAIL SIGNATURE" : "⧉  COPY REPLY / FORWARD SIGNATURE",
    ok:   "✓  COPIED — PASTE INTO YOUR EMAIL CLIENT",
    err:  "⚠  COPY FAILED — SELECT PREVIEW & PRESS CTRL+C",
  }[copyState[type]]);

  const clientGuides = {
    outlook: [
      ["Copy the New Email Signature", <>In Step 2, select the <strong>New Email</strong> tab and press <strong>COPY NEW EMAIL SIGNATURE</strong>. The button confirms when copied.</>],
      ["Open Signature Settings", <>Click <Pill t="File"/> → <Pill t="Options"/> → <Pill t="Mail"/> → <Pill t="Signatures…"/> — On Mac: <Pill t="Outlook"/> → <Pill t="Preferences"/> → <Pill t="Signatures"/></>],
      ["Create the First Signature", <>Click <Pill t="New"/>. Name it <strong>Perion — New Email</strong>. Click inside the text area. Press <Pill t="Ctrl + V"/> (Windows) or <Pill t="⌘ + V"/> (Mac).</>],
      ["Create the Reply / Forward Signature", <>Return to Step 2, switch to the <strong>Reply / Forward</strong> tab, copy it. Click <Pill t="New"/> again in Outlook. Name it <strong>Perion — Reply/Forward</strong>. Paste.</>],
      ["Assign Defaults &amp; Save", <>Under <strong>Choose default signature</strong>: set <strong>New messages</strong> → <em>Perion — New Email</em> and <strong>Replies/forwards</strong> → <em>Perion — Reply/Forward</em>. Click <Pill t="OK"/>.</>],
    ],
    gmail: [
      ["Open Gmail Settings", <>Click the <strong>⚙ gear</strong> icon → <Pill t="See all settings"/>.</>],
      ["Create First Signature", <>Scroll to the <strong>Signature</strong> block on the General tab. Click <Pill t="Create new"/>. Name it <strong>Perion — New Email</strong>. Paste the copied HTML into the text area.</>],
      ["Create Reply / Forward Signature", <>Click <Pill t="Create new"/> again. Name it <strong>Perion — Reply/Forward</strong>. Paste the compact signature.</>],
      ["Set Defaults &amp; Save", <>Under <strong>Signature defaults</strong> set <em>For new emails</em> → <em>Perion — New Email</em> and <em>On reply/forward</em> → <em>Perion — Reply/Forward</em>. Scroll down and click <Pill t="Save Changes"/>.</>],
    ],
    apple: [
      ["Open Mail Preferences", <>In Apple Mail: <Pill t="Mail"/> → <Pill t="Preferences"/> → <Pill t="Signatures"/> tab.</>],
      ["Add First Signature", <>Select your <strong>@perionlighting.com</strong> account. Click <Pill t="+"/>. Name it <strong>Perion — New Email</strong>. Uncheck <Pill t="Always match my default message font"/>. Paste.</>],
      ["Add Reply / Forward Signature", <>Click <Pill t="+"/> again. Name it <strong>Perion — Reply/Forward</strong>. Uncheck font override. Paste the compact version.</>],
      ["Set Default", <>Use the <strong>Choose Signature</strong> dropdown at the bottom of the pane to set your default for new messages.</>],
    ],
    mobile: [
      ["Use the Compact Signature on Mobile", <>Mobile clients have limited HTML rendering. Use the <strong>Reply / Forward Signature</strong> for all mobile installs.</>],
      ["iOS Mail", <>Go to <Pill t="Settings"/> → <Pill t="Mail"/> → <Pill t="Signature"/> → <Pill t="Per Account"/>. Select your Perion account and type your details in plain text.</>],
      ["Outlook Mobile / Gmail App", <>Open the app → <Pill t="Settings"/> (profile icon) → <Pill t="Signature"/>. Enter your name, title, phone numbers, and email in plain text.</>],
    ],
  };

  const tabStyle = (active, isReply=false) => ({
    ...sh.tabBtnBase,
    ...(active
      ? { background: isReply ? C.amber : C.white,
          color:       isReply ? C.midnight : C.midnight,
          borderBottom:`3px solid ${C.amber}` }
      : { color: C.graphite }),
  });

  return (
    <div style={sh.page}>

      {/* HEADER */}
      <header style={sh.header}>
        <div>
          <div style={sh.wordmark}>PERION</div>
          <div style={sh.subline}>Perimeter Lighting Systems · A Sunbird Lighting Company</div>
        </div>
        <div>
          <div style={sh.hTitle}>Email Signature Command Centre</div>
          <div style={sh.docId}>PRN-L5-SIG-v4.1 · Dual-Signature System · Domain-Locked</div>
        </div>
      </header>

      {/* PROCESS RAIL */}
      <nav style={sh.rail}>
        {["Enter Your Details","Copy Your Signature","Install in Email Client"].map((lbl, i) => (
          <div key={i} style={sh.railStep}>
            {i > 0 && <span style={sh.railDiv}>›</span>}
            <div style={sh.railDot}>{i+1}</div>
            <span style={sh.railLbl}>{lbl}</span>
          </div>
        ))}
      </nav>

      {/* MAIN */}
      <main style={sh.main}>

        <div style={sh.callout}>
          <strong style={{color:C.midnight}}>No technical knowledge required.</strong> Complete Step 1. Your two signatures build automatically in Step 2. Press Copy, then follow Step 3 for your email client. Total time: under <strong>3 minutes</strong>.
        </div>

        {/* ── STEP 1 ── */}
        <section style={sh.panel}>
          <div style={sh.panelHdr}>
            <div style={sh.badge}>1</div>
            <h2 style={sh.panelH2}>Enter Your Contact Details</h2>
          </div>
          <div style={sh.panelBody}>
            <div style={sh.formGrid}>

              {/* First / Last */}
              <div><label style={sh.label}>First Name <span style={sh.req}>*</span></label>
                <input style={sh.input} placeholder="e.g. Philip" value={form.first}
                  onChange={e=>upd("first",e.target.value)}/></div>
              <div><label style={sh.label}>Last Name <span style={sh.req}>*</span></label>
                <input style={sh.input} placeholder="e.g. Malherbe" value={form.last}
                  onChange={e=>upd("last",e.target.value)}/></div>

              {/* Title / Dept */}
              <div><label style={sh.label}>Job Title <span style={sh.req}>*</span></label>
                <input style={sh.input} placeholder="e.g. Founder & CEO" value={form.title}
                  onChange={e=>upd("title",e.target.value)}/></div>
              <div><label style={sh.label}>Department <span style={sh.hint}>(optional)</span></label>
                <input style={sh.input} placeholder="e.g. Sales & Commercial" value={form.dept}
                  onChange={e=>upd("dept",e.target.value)}/></div>

              {/* Email */}
              <div style={sh.fgFull}>
                <label style={sh.label}>Email Address <span style={sh.req}>*</span></label>
                <div style={sh.emailWrap}>
                  <input style={{...sh.input, borderRight:"none"}}
                    placeholder="firstname.lastname" value={form.user}
                    onChange={e=>upd("user",e.target.value.toLowerCase())}/>
                  <div style={sh.domLock}>{DOMAIN}</div>
                </div>
                <div style={sh.fieldNote}>Domain is locked. Enter your username only (e.g. philip.malherbe).</div>
              </div>

              {/* Three Phones */}
              <div style={sh.fgThird}>
                <div><label style={sh.label}>Mobile <span style={sh.req}>*</span></label>
                  <input style={sh.input} placeholder="+27 82 000 0000" value={form.mobile}
                    onChange={e=>upd("mobile",e.target.value)}/></div>
                <div><label style={sh.label}>Office <span style={sh.hint}>(optional)</span></label>
                  <input style={sh.input} placeholder="+27 11 000 0000" value={form.office}
                    onChange={e=>upd("office",e.target.value)}/></div>
                <div><label style={sh.label}>Office Direct <span style={sh.hint}>DDI · optional</span></label>
                  <input style={sh.input} placeholder="+27 11 000 0001" value={form.direct}
                    onChange={e=>upd("direct",e.target.value)}/></div>
              </div>

            </div>
          </div>
        </section>

        {/* ── STEP 2 ── */}
        <section style={sh.panel}>
          <div style={sh.panelHdr}>
            <div style={sh.badge}>2</div>
            <h2 style={sh.panelH2}>Your Signatures — Live Preview &amp; Copy</h2>
          </div>

          {/* Tab Bar */}
          <div style={sh.tabBar}>
            <button style={tabStyle(sigTab==="new")}   onClick={()=>setSigTab("new")}>✉ New Email Signature</button>
            <button style={tabStyle(sigTab==="reply",true)} onClick={()=>setSigTab("reply")}>↩ Reply / Forward Signature</button>
          </div>

          {/* NEW EMAIL PANE */}
          {sigTab === "new" && (
            <div style={{padding:22}}>
              <div style={sh.prevLabel}>Full Signature — New Emails</div>
              <div id="prev-new" style={sh.prevFrame}
                dangerouslySetInnerHTML={{__html: newSigHTML}}/>
              <div style={sh.copyRow}>
                <button
                  style={{
                    ...sh.btnNew,
                    ...(copyState.new==="ok"  ? {background:"#1c6b3a",color:C.white} : {}),
                    ...(copyState.new==="err" ? {background:"#8b1a1a",color:C.white} : {}),
                  }}
                  onClick={()=>copySig("new")}>
                  {copyLabel("new")}
                </button>
                <span style={sh.copyHint}>Paste directly into your email client. Formatting is preserved.</span>
              </div>
            </div>
          )}

          {/* REPLY PANE */}
          {sigTab === "reply" && (
            <div style={{padding:22}}>
              <div style={sh.prevLabel}>Compact Signature — Reply &amp; Forward Threads</div>
              <div id="prev-reply" style={{...sh.prevFrame, background:"#FAFAFA"}}
                dangerouslySetInnerHTML={{__html: replySigHTML}}/>
              <div style={sh.copyRow}>
                <button
                  style={{
                    ...sh.btnReply,
                    ...(copyState.reply==="ok"  ? {background:"#1c6b3a",color:C.white} : {}),
                    ...(copyState.reply==="err" ? {background:"#8b1a1a",color:C.white} : {}),
                  }}
                  onClick={()=>copySig("reply")}>
                  {copyLabel("reply")}
                </button>
                <span style={sh.copyHint}>Use this compact version for all reply and forward threads.</span>
              </div>
            </div>
          )}
        </section>

        {/* ── STEP 3 ── */}
        <section style={sh.panel}>
          <div style={sh.panelHdr}>
            <div style={sh.badge}>3</div>
            <h2 style={sh.panelH2}>Install Your Signatures — Step-by-Step</h2>
          </div>
          <div style={sh.panelBody}>

            <div style={sh.clientTabs}>
              {[["outlook","Microsoft Outlook"],["gmail","Gmail"],["apple","Apple Mail"],["mobile","Mobile"]].map(([id,lbl])=>(
                <button key={id}
                  style={{...sh.cliBtnBase, ...(clientTab===id ? sh.cliBtnAct:{})}}
                  onClick={()=>setClientTab(id)}>{lbl}</button>
              ))}
            </div>

            {(clientGuides[clientTab]||[]).map(([title,body], idx, arr) => (
              <div key={idx} style={{...sh.iStep, ...(idx===arr.length-1?{borderBottom:"none",paddingBottom:0}:{})}}>
                <div style={sh.iNum}>{idx+1}</div>
                <div>
                  <div style={sh.iH3} dangerouslySetInnerHTML={{__html:title}}/>
                  <div style={sh.iP}>{body}</div>
                </div>
              </div>
            ))}

            {clientTab==="gmail" && (
              <div style={sh.warnNote}>
                <strong>Note:</strong> Gmail may suppress the logo if it is not hosted at a public URL. Confirm the asset is live at the GitHub raw URL before rollout.
              </div>
            )}
            {clientTab==="mobile" && (
              <div style={sh.warnNote}>
                <strong>IT Note:</strong> For full HTML mobile signature support, deploy via Microsoft Exchange or Google Workspace server-side signature management.
              </div>
            )}

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer style={sh.footer}>
        <p style={sh.footerTxt}>PRN-L5-SIG-v4.1 · Perion Lighting — A Sunbird Lighting Company · Email Signature Command Centre · Commercial-in-Confidence</p>
      </footer>

    </div>
  );
}
