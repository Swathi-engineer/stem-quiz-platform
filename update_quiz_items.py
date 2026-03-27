import re

file_path = "public/quiz.html"
with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

# Make it 5 questions per level
text = text.replace("const itemsPerLevel = 2;", "const itemsPerLevel = 5;")
text = text.replace("sliced = allQuestions.slice(0, 2);", "sliced = allQuestions.slice(0, 5);")

# Remove the mock questions entirely so it cleanly uses the DB!
# Replaces `// Mock...` through `}` matching the array block using regex
text = re.sub(r"// Mock visual questions for young students.*?\];\n    \}", "", text, flags=re.DOTALL)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(text)

print("Updated quiz itemsPerLevel to 5 and removed mock data")
