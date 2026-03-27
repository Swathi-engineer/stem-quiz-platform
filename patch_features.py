import sys
import os

dashboard_path = "public/dashboard.html"
quiz_path = "public/quiz.html"

with open(dashboard_path, "r", encoding="utf-8") as f:
    d = f.read()

# 1. Dashboard: Unit Level Map replacing the single button
target_btn = """    </div>
  </div>

  <input type="hidden" id="grade" value="">
  <input type="hidden" id="subject" value="">

  <button onclick="startQuiz()" class="pulse-button">Ready? Let's Go! 🚀</button>"""

replacement_levels = """    </div>

    <p class="selection-title" style="margin-top: 25px;">3️⃣ Select Unit Level:</p>
    <div id="unit-levels" class="subject-grid" style="grid-template-columns: repeat(3, 1fr); gap:15px; margin-bottom: 20px;">
       <p style="color:#a0a0b0; grid-column: 1 / -1; margin-top:5px;">Select a Grade and Subject to unlock Unit Levels.</p>
    </div>
  </div>

  <input type="hidden" id="grade" value="">
  <input type="hidden" id="subject" value="">
  <input type="hidden" id="lesson" value="Fundamentals">
"""
d = d.replace(target_btn, replacement_levels)

# 2. Add JavaScript logic into dashboard to render levels
js_injection = """
function renderLevels() {
  const grade = document.getElementById("grade").value;
  const subject = document.getElementById("subject").value;
  if (!grade || !subject) return;
  const lesson = document.getElementById("lesson").value || "Fundamentals";

  const key = `prog_${email}_${grade}_${subject}_${lesson}`;
  const unlocked = parseInt(localStorage.getItem(key) || "1");

  const container = document.getElementById("unit-levels");
  container.innerHTML = `
      <div class="sub-btn k-green" style="opacity:${unlocked >= 1 ? 1 : 0.4}; margin-top:0;" onclick="if(${unlocked} >= 1) startLevelQuiz(1)">🌟 Basic (L1)</div>
      <div class="sub-btn k-yellow" style="opacity:${unlocked >= 2 ? 1 : 0.4}; margin-top:0;" onclick="if(${unlocked} >= 2) startLevelQuiz(2)">🚀 Interm. (L2) ${unlocked >= 2 ? '' : '🔒'}</div>
      <div class="sub-btn k-red" style="opacity:${unlocked >= 3 ? 1 : 0.4}; margin-top:0;" onclick="if(${unlocked} >= 3) startLevelQuiz(3)">🔥 Hard (L3) ${unlocked >= 3 ? '' : '🔒'}</div>
  `;
}

function startLevelQuiz(lvl) {
  const grade = document.getElementById("grade").value;
  const subject = document.getElementById("subject").value;
  const lesson = document.getElementById("lesson").value || "Fundamentals";
  
  if (!grade || !subject) return;

  playSound('start');
  setTimeout(() => {
    window.location.href = `quiz.html?grade=${grade}&subject=${subject}&lesson=${lesson}&level=${lvl}&email=${email}`;
  }, 400);
}
"""

if "function setSubject" in d:
    d = d.replace("function setSubject(sub, el) {", js_injection + "\n\nfunction setSubject(sub, el) {")

# To hook renderLevels when grade or subject is clicked:
if "playSound('click');\n}" in d:
   d = d.replace("playSound('click');\n}", "playSound('click');\n  if(typeof renderLevels === 'function') renderLevels();\n}")

# 3. Add Leaderboard 'To Beat' message area
leaderboard_header = """<h3>🏆 Leadership Board</h3>
  <p style="color: #a0a0b0;">Compete with other students and climb the ranks!</p>"""
leaderboard_target = leaderboard_header + """\n  <div id="leadership-to-beat" style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 10px; margin-bottom: 20px; color: #fde047; font-weight: bold; text-align: center; border: 1px solid rgba(253, 224, 71, 0.4);">Loading ranking...</div>"""
d = d.replace(leaderboard_header, leaderboard_target)

# Leaderboard javascript update logic inside loadPerformance()
update_target_js = """
  // Update Leaderboard Target XP to beat
  const targetXP = 15400; // Top player Alex M.
  const remaining = targetXP - totalXP;
  const msgEl = document.getElementById("leadership-to-beat");
  if(msgEl) {
     if(remaining > 0) msgEl.innerHTML = `You need <b>${remaining.toLocaleString()} more XP</b> to beat Alex M. and claim the #1 spot! Keep grinding! 💪`;
     else msgEl.innerHTML = `Wow! You are currently the #1 rank leader! Amazing! 🏆`;
  }
"""
d = d.replace('document.getElementById("badge").innerText = badge;', 'document.getElementById("badge").innerText = badge;\n  ' + update_target_js)

with open(dashboard_path, "w", encoding="utf-8") as f:
    f.write(d)


# 4. Patch quiz.html to show failing to get 100% requires retry
with open(quiz_path, "r", encoding="utf-8") as f:
    q = f.read()

quiz_logic_old = """  let unlockMsg = "";
  if (pct === 100) {
    confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 }, zIndex: 1000 });
    unlockMsg = "<div style='color:#4ECDC4; font-weight:bold; margin-top:10px; font-size: 1.2rem;'>🔓 Next Level Unlocked!</div>";
    
    // Unlock local
    const key = `prog_${email}_${grade}_${subject}_${lesson}`;
    const currentUnlock = parseInt(localStorage.getItem(key) || "1");
    if (level === currentUnlock) {
       localStorage.setItem(key, currentUnlock + 1);
    }
  }"""
quiz_logic_new = quiz_logic_old + """ else {
    unlockMsg = "<div style='color:#FF6B6B; font-weight:bold; margin-top:15px; font-size: 1.15rem; background: rgba(255,107,107,0.15); padding: 12px; border-radius: 12px; border: 1px solid rgba(255,107,107,0.4);'>🔒 Score 100% to unlock the next level! Play again to progress!</div>";
  }"""

q = q.replace(quiz_logic_old, quiz_logic_new)

with open(quiz_path, "w", encoding="utf-8") as f:
    f.write(q)

print("Patch complete!")
