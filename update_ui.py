import os

file_path = "public/quiz.html"
if not os.path.exists(file_path):
    print("Error: " + file_path + " not found")
    exit(1)

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

# 1. Update fonts
text = text.replace(
    "@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&family=Fredoka+One&display=swap');",
    "@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&family=Fredoka+One&display=swap');"
)
text = text.replace("'Nunito'", "'Outfit'")

# 2. Update background and body
body_old = """    body {
      font-family: 'Outfit', sans-serif;
      background: var(--dark);
      min-height: 100vh;
      overflow-x: hidden;
      color: white;
      transition: background 0.5s ease;
    }"""
body_new = """    body {
      font-family: 'Outfit', sans-serif;
      background: linear-gradient(45deg, #0f0f1a, #1a0033, #0b0726, #210d33);
      background-size: 400% 400%;
      animation: bgPulse 15s ease infinite; 
      min-height: 100vh;
      overflow-x: hidden;
      color: white;
      transition: background 0.5s ease;
    }
    @keyframes bgPulse {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }"""
text = text.replace(body_old, body_new)

# 3. Logo
text = text.replace("🚀 STEMverse", "🦉 STEMingo")
text = text.replace(
    ".logo { font-family:'Fredoka One',cursive; font-size:1.7rem; color:var(--c3);",
    ".logo { font-family:'Outfit',sans-serif; font-size:1.7rem; color:#58cc02; font-weight:900;"
)
text = text.replace(
    "text-shadow:0 0 20px var(--c3); letter-spacing:1px; }",
    "text-shadow:0 0 20px rgba(88,204,2,0.4); letter-spacing:1px; }"
)

# 4. Remove stars globally
text = text.replace('<div class="stars" id="stars"></div>', '')

star_script = """// ── INITIALIZE STARS ────────────────────────────────────────────────────────
(function createStars(){
  const s = document.getElementById('stars');
  for(let i=0;i<60;i++){
    const d=document.createElement('div'); d.className='star';
    const sz=Math.random()*3+1;
    d.style.cssText=`width:${sz}px;height:${sz}px;left:${Math.random()*100}%;top:${Math.random()*100}%;animation-delay:${Math.random()*3}s;animation-duration:${2+Math.random()*3}s`;
    s.appendChild(d);
  }
})();"""
text = text.replace(star_script, "")

# Remove stray stars display none code
text = text.replace("document.getElementById('stars').style.display = 'none'; // No stars for day mode", "")

# 5. Fix JS CSS Logic
theme_old = """// THEME ADJUSTMENTS based on grade 
if (grade >= 1 && grade <= 3) {
  document.body.style.fontFamily = "'Comic Sans MS', 'Kristen ITC', 'Baloo', cursive";
  document.documentElement.style.setProperty('--dark', '#2b1055');
  document.documentElement.style.setProperty('--c3', '#ff61d8');
  document.documentElement.style.setProperty('--c1', '#00e5ff');
} else if (grade >= 4 && grade <= 7) {
  document.documentElement.style.setProperty('--dark', '#1a1a2e');
} else {
  document.documentElement.style.setProperty('--dark', '#050505');
}"""

theme_new = """// THEME ADJUSTMENTS based on grade 
if (grade >= 1 && grade <= 3) {
  document.body.style.fontFamily = "'Comic Sans MS', 'Kristen ITC', 'Baloo', cursive";
  document.body.style.background = "linear-gradient(45deg, #2b1055, #1d0740, #0a041f, #230847)";
  document.body.style.backgroundSize = "400% 400%";
  document.documentElement.style.setProperty('--c3', '#ff61d8');
  document.documentElement.style.setProperty('--c1', '#00e5ff');
} else if (grade >= 4 && grade <= 7) {
  document.body.style.background = "linear-gradient(45deg, #0f0f1a, #1a0033, #0b0726, #210d33)";
} else {
  document.body.style.background = "#050505";
}"""
text = text.replace(theme_old, theme_new)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(text)
print("Updated via Python successfully")
