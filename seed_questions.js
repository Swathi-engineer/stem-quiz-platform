const mongoose = require("mongoose");
const Question = require("./models/Question");

const subjects = ["Science", "Technology", "Engineering", "Mathematics"];
const grades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const defaultImages = [
  "https://img.icons8.com/color/256/leaf.png",
  "https://img.icons8.com/color/256/flower.png",
  "https://img.icons8.com/color/256/water.png",
  "https://img.icons8.com/color/256/rain.png",
  "https://img.icons8.com/color/256/apple.png"
];

const banks = {
  Science: {
    "1": [
      { q: "Which of these animals can fly?", o: ["Dog", "Bird", "Cat", "Fish"], a: "Bird", img: "https://img.icons8.com/color/256/bird.png" },
      { q: "What do we use to see things?", o: ["Ears", "Nose", "Eyes", "Mouth"], a: "Eyes", img: "https://img.icons8.com/color/256/visible.png" },
      { q: "Which of these is a fruit?", o: ["Carrot", "Potato", "Apple", "Onion"], a: "Apple", img: "https://img.icons8.com/color/256/apple.png" },
      { q: "What falls from the sky when it is raining?", o: ["Rocks", "Water", "Sand", "Leaves"], a: "Water", img: "https://img.icons8.com/color/256/rain.png" },
      { q: "Which animal lives in the water?", o: ["Lion", "Monkey", "Fish", "Elephant"], a: "Fish", img: "https://img.icons8.com/color/256/fish.png" }
    ],
    "1-intermediate": [
      { q: "What part of the plant is in the ground?", o: ["Roots", "Leaves", "Stem", "Flower"], a: "Roots", img: "https://sl.bing.net/jIlMD8bCs9c" },
      { q: "Which animal is a reptile?", o: ["Snake", "Dog", "Bird", "Frog"], a: "Snake", img: "https://img.icons8.com/color/256/snake.png" },
      { q: "What do you use to measure temperature?", o: ["Thermometer", "Ruler", "Scale", "Clock"], a: "Thermometer", img: "https://img.icons8.com/color/256/thermometer.png" },
      { q: "What happens when you freeze water?", o: ["It becomes ice", "It boils", "It disappears", "It goes away"], a: "It becomes ice", img: "https://img.icons8.com/color/256/snow.png" },
      { q: "Which planet do we live on?", o: ["Earth", "Mars", "Venus", "Sun"], a: "Earth", img: "https://img.icons8.com/color/256/earth-planet.png" }
    ],
    "1-hard": [
      { q: "Which part of the plant makes food?", o: ["Leaves", "Roots", "Stem", "Flowers"], a: "Leaves", img: "https://img.icons8.com/color/256/leaf.png" },
      { q: "What do we call a baby dog?", o: ["Puppy", "Kitten", "Calf", "Cub"], a: "Puppy", img: "https://img.icons8.com/color/256/dog.png" },
      { q: "Which of these dissolves in water?", o: ["Salt", "Sand", "Wood", "Plastic"], a: "Salt", img: "https://img.icons8.com/color/256/salt-shaker.png" },
      { q: "What gives us light and heat during the day?", o: ["Moon", "Stars", "Sun", "Fire"], a: "Sun", img: "https://img.icons8.com/color/256/sun.png" },
      { q: "Which animal changes from a caterpillar?", o: ["Butterfly", "Bird", "Dog", "Fish"], a: "Butterfly", img: "https://img.icons8.com/color/256/butterfly.png" }
    ],
    "1-3": [
      { q: "What do plants need to grow?", o: ["Water", "Soda", "Juice", "Milk"], a: "Water" },
      { q: "Which animal says moo?", o: ["Cow", "Dog", "Cat", "Sheep"], a: "Cow" },
      { q: "What color is the sky on a clear day?", o: ["Blue", "Green", "Red", "Yellow"], a: "Blue" },
      { q: "How many legs does a spider have?", o: ["8", "6", "4", "10"], a: "8" },
      { q: "What is water made of?", o: ["H2O", "CO2", "O2", "Gold"], a: "H2O" }
    ],
    "4-6": [
      { q: "What is the closest planet to the Sun?", o: ["Mercury", "Venus", "Earth", "Mars"], a: "Mercury" },
      { q: "What state of matter is ice?", o: ["Solid", "Liquid", "Gas", "Plasma"], a: "Solid" },
      { q: "What gas do humans breathe in primarily to survive?", o: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"], a: "Oxygen" },
      { q: "What causes tides on Earth?", o: ["The Moon", "The Sun", "Wind", "Earthquakes"], a: "The Moon" },
      { q: "What part of the plant conducts photosynthesis?", o: ["Leaves", "Roots", "Stem", "Flowers"], a: "Leaves" }
    ],
    "7-9": [
      { q: "What is the powerhouse of the cell?", o: ["Mitochondria", "Nucleus", "Ribosome", "Chloroplast"], a: "Mitochondria" },
      { q: "What is the atomic number of Oxygen?", o: ["8", "6", "12", "16"], a: "8" },
      { q: "Which of these is a noble gas?", o: ["Neon", "Oxygen", "Nitrogen", "Hydrogen"], a: "Neon" },
      { q: "What force keeps planets in orbit?", o: ["Gravity", "Magnetism", "Friction", "Tension"], a: "Gravity" },
      { q: "What is the chemical symbol for Gold?", o: ["Au", "Ag", "Gd", "Go"], a: "Au" }
    ],
    "10-12": [
      { q: "What is the speed of light in a vacuum?", o: ["3x10^8 m/s", "3x10^5 m/s", "100 m/s", "Infinite"], a: "3x10^8 m/s" },
      { q: "What is the most abundant element in the universe?", o: ["Hydrogen", "Helium", "Oxygen", "Carbon"], a: "Hydrogen" },
      { q: "What is the formula for kinetic energy?", o: ["1/2 mv^2", "mc^2", "mgh", "ma"], a: "1/2 mv^2" },
      { q: "In quantum mechanics, what principle states you cannot simultaneously know position and momentum?", o: ["Heisenberg Uncertainty Principle", "Pauli Exclusion Principle", "Bohr Model", "Aufbau Principle"], a: "Heisenberg Uncertainty Principle" },
      { q: "Which particle is responsible for the electromagnetic force?", o: ["Photon", "Gluon", "Graviton", "W Boson"], a: "Photon" }
    ]
  },
  Technology: {
    "1": [
      { q: "What do we use to type words on a computer?", o: ["Mouse", "Keyboard", "Screen", "Speaker"], a: "Keyboard", img: "https://img.icons8.com/color/256/keyboard.png" },
      { q: "Which of these shows the pictures on a computer?", o: ["Monitor", "Mouse", "Wire", "Printer"], a: "Monitor", img: "https://img.icons8.com/color/256/monitor.png" },
      { q: "Which device can you hold in your hands to play games or watch videos?", o: ["Tablet", "Refrigerator", "Washing Machine", "Oven"], a: "Tablet", img: "https://img.icons8.com/color/256/ipad.png" },
      { q: "What do we click with?", o: ["Keyboard", "Screen", "Mouse", "Printer"], a: "Mouse", img: "https://img.icons8.com/color/256/mouse.png" },
      { q: "What machine takes pictures?", o: ["Camera", "Keyboard", "Monitor", "Mouse"], a: "Camera", img: "https://img.icons8.com/color/256/camera.png" }
    ],
    "1-intermediate": [
      { q: "What does a printer do?", o: ["Prints paper", "Plays music", "Shows video", "Cooks food"], a: "Prints paper", img: "https://img.icons8.com/color/256/print.png" },
      { q: "Which is used to connect to the Internet?", o: ["Wi-Fi", "Water pipe", "Gas line", "Flashlight"], a: "Wi-Fi", img: "https://img.icons8.com/color/256/wifi.png" },
      { q: "What is a robot?", o: ["A machine", "A plant", "An animal", "A fruit"], a: "A machine", img: "https://img.icons8.com/color/256/bot.png" },
      { q: "What do you wear on your ears to listen to music?", o: ["Headphones", "Glasses", "Hat", "Shoes"], a: "Headphones", img: "https://img.icons8.com/color/256/headphones.png" },
      { q: "What do we use to make a phone call?", o: ["Smartphone", "Toaster", "Microwave", "Television"], a: "Smartphone", img: "https://img.icons8.com/color/256/smartphone.png" }
    ],
    "1-hard": [
      { q: "What part of the computer stores your files?", o: ["Hard Drive", "Monitor", "Keyboard", "Mouse"], a: "Hard Drive", img: "https://img.icons8.com/color/256/hdd.png" },
      { q: "What connects your computer to the internet without wires?", o: ["Wi-Fi", "USB", "Mouse", "Screen"], a: "Wi-Fi", img: "https://img.icons8.com/color/256/wifi.png" },
      { q: "What device do we use to record our voice?", o: ["Microphone", "Speaker", "Printer", "Monitor"], a: "Microphone", img: "https://img.icons8.com/color/256/microphone.png" },
      { q: "What is an app on a tablet?", o: ["A computer program", "A type of fruit", "A computer mouse", "A wire"], a: "A computer program", img: "https://img.icons8.com/color/256/mac-client.png" },
      { q: "Which button deletes letters when you type?", o: ["Backspace", "Enter", "Spacebar", "Shift"], a: "Backspace", img: "https://img.icons8.com/color/256/clear-symbol.png" }
    ],
    "1-3": [
      { q: "Which of these is used to type on a computer?", o: ["Keyboard", "Mouse", "Monitor", "Printer"], a: "Keyboard" },
      { q: "Which of these points and clicks?", o: ["Mouse", "Screen", "CPU", "Speakers"], a: "Mouse" },
      { q: "What shows the pictures on a computer?", o: ["Monitor", "Keyboard", "Mouse", "Cable"], a: "Monitor" },
      { q: "What do you use to print a drawing?", o: ["Printer", "Scanner", "Mouse", "Keyboard"], a: "Printer" },
      { q: "Which is a handheld device?", o: ["Tablet", "Desktop", "Server", "Mainframe"], a: "Tablet" }
    ],
    "4-6": [
      { q: "What does HTML stand for?", o: ["HyperText Markup Language", "HighText Machine Language", "HyperLoop Machine Logic", "None"], a: "HyperText Markup Language" },
      { q: "What is the brain of the computer?", o: ["CPU", "RAM", "Hard Drive", "GPU"], a: "CPU" },
      { q: "What connects computers globally?", o: ["Internet", "Intranet", "Ethernet", "Bluetooth"], a: "Internet" },
      { q: "What does WiFi stand for?", o: ["Wireless Fidelity", "Wireless Fiber", "Wired Fiber", "Wire Fire"], a: "Wireless Fidelity" },
      { q: "Which of these is a web browser?", o: ["Chrome", "Windows", "Word", "Photoshop"], a: "Chrome" }
    ],
    "7-9": [
      { q: "What does RAM stand for?", o: ["Random Access Memory", "Read Access Memory", "Run Alternate Module", "Real Access Memory"], a: "Random Access Memory" },
      { q: "What is a loop in programming?", o: ["Repeating code", "A syntax error", "A type of variable", "A networking cable"], a: "Repeating code" },
      { q: "Which is an operating system?", o: ["Linux", "Python", "Google", "Intel"], a: "Linux" },
      { q: "What does an IP address do?", o: ["Identifies devices on a network", "Encrypts passwords", "Speeds up the CPU", "Stores files"], a: "Identifies devices on a network" },
      { q: "What is phishing?", o: ["Fake communication to steal data", "A coding language", "A type of hardware", "A sorting algorithm"], a: "Fake communication to steal data" }
    ],
    "10-12": [
      { q: "What is the time complexity of binary search?", o: ["O(log n)", "O(n)", "O(n^2)", "O(1)"], a: "O(log n)" },
      { q: "What does DNS stand for?", o: ["Domain Name System", "Data Network Server", "Digital Node Service", "Distributed Name Server"], a: "Domain Name System" },
      { q: "In OOP, what is polymorphism?", o: ["Using a common interface for multiple data types", "Hiding internal state", "Creating instances", "Inheriting attributes"], a: "Using a common interface for multiple data types" },
      { q: "What is a foreign key in SQL?", o: ["A key linking to another table's primary key", "A key generated by the user", "An encrypted key", "A key that cannot be null"], a: "A key linking to another table's primary key" },
      { q: "What is REST?", o: ["Representational State Transfer", "Remote Execution System Tool", "Runtime Evaluating Standard", "None"], a: "Representational State Transfer" }
    ]
  },
  Engineering: {
    "1": [
      { q: "What helps a car roll on the ground?", o: ["Wings", "Wheels", "Windows", "Doors"], a: "Wheels", img: "https://img.icons8.com/color/256/steering-wheel.png" },
      { q: "What do we build across a river so cars can drive over?", o: ["House", "Bridge", "Tower", "Wall"], a: "Bridge", img: "https://img.icons8.com/color/256/bridge.png" },
      { q: "Which tool do we use to hit a nail?", o: ["Screwdriver", "Hammer", "Wrench", "Saw"], a: "Hammer", img: "https://img.icons8.com/color/256/hammer.png" },
      { q: "What shape are most blocks used to build simple walls?", o: ["Circle", "Triangle", "Rectangle", "Star"], a: "Rectangle", img: "https://img.icons8.com/color/256/brick-wall.png" },
      { q: "What do we wear on our heads for safety when building?", o: ["Hat", "Hard Hat", "Cap", "Beanie"], a: "Hard Hat", img: "https://img.icons8.com/color/256/construction-worker.png" }
    ],
    "1-intermediate": [
      { q: "What do we use to build a strong wall?", o: ["Bricks", "Paper", "Leaves", "Feathers"], a: "Bricks", img: "https://img.icons8.com/color/256/brick-wall.png" },
      { q: "What machine moves big amounts of dirt?", o: ["Excavator", "Bicycle", "Boat", "Airplane"], a: "Excavator", img: "https://img.icons8.com/color/256/bulldozer.png" },
      { q: "What do we use to cut wood?", o: ["Saw", "Hammer", "Screwdriver", "Wrench"], a: "Saw", img: "https://img.icons8.com/color/256/saw.png" },
      { q: "What simple machine has wheels and a handle?", o: ["Wagon", "Book", "Pencil", "Apple"], a: "Wagon", img: "https://img.icons8.com/color/256/wheelbarrow.png" },
      { q: "What part of a house keeps the rain out?", o: ["Roof", "Floor", "Window", "Door"], a: "Roof", img: "https://img.icons8.com/color/256/home.png" }
    ],
    "1-hard": [
      { q: "Which tool is used to turn a screw?", o: ["Screwdriver", "Hammer", "Saw", "Ruler"], a: "Screwdriver", img: "https://img.icons8.com/color/256/screwdriver.png" },
      { q: "What simple machine uses a rope and a wheel?", o: ["Pulley", "Lever", "Wedge", "Screw"], a: "Pulley", img: "https://img.icons8.com/color/256/pulley.png" },
      { q: "What is the strong metal frame of a big building?", o: ["Steel", "Wood", "Plastic", "Glass"], a: "Steel", img: "https://img.icons8.com/color/256/crane.png" },
      { q: "What heavy object keeps a boat from floating away?", o: ["Anchor", "Sail", "Motor", "Wheel"], a: "Anchor", img: "https://img.icons8.com/color/256/anchor.png" },
      { q: "Which holds pieces of wood together by twisting it in?", o: ["Screw", "Nail", "Tape", "String"], a: "Screw", img: "https://img.icons8.com/color/256/screw.png" }
    ],
    "1-3": [
      { q: "What is a simple machine that rolls?", o: ["Wheel", "Lever", "Pulley", "Wedge"], a: "Wheel" },
      { q: "What holds a house up?", o: ["Foundation", "Roof", "Windows", "Doors"], a: "Foundation" },
      { q: "What joins two pieces of wood?", o: ["Nail", "String", "Tape", "Rubber band"], a: "Nail" },
      { q: "Which is used to see in the dark?", o: ["Flashlight", "Hammer", "Wrench", "Screwdriver"], a: "Flashlight" },
      { q: "What goes across a river so cars can drive?", o: ["Bridge", "Boat", "Plane", "Train"], a: "Bridge" }
    ],
    "4-6": [
      { q: "What is a lever used for?", o: ["Lifting heavy objects", "Creating electricity", "Measuring temperature", "Storing water"], a: "Lifting heavy objects" },
      { q: "What material is extremely strong and used in skyscrapers?", o: ["Steel", "Wood", "Plastic", "Glass"], a: "Steel" },
      { q: "What is a wedge used for?", o: ["Splitting things apart", "Rolling things", "Tying things", "Painting"], a: "Splitting things apart" },
      { q: "What renewable energy uses wind?", o: ["Wind Turbine", "Solar Panel", "Coal Plant", "Nuclear Reactor"], a: "Wind Turbine" },
      { q: "What protects an electrical wire?", o: ["Insulation", "Conductor", "Battery", "Switch"], a: "Insulation" }
    ],
    "7-9": [
      { q: "What does CAD stand for?", o: ["Computer-Aided Design", "Calculated Area Diagram", "Core Architectural Draft", "Central Aerospace Department"], a: "Computer-Aided Design" },
      { q: "What is the unit of electrical resistance?", o: ["Ohm", "Volt", "Amp", "Watt"], a: "Ohm" },
      { q: "What mechanism converts rotational motion to linear?", o: ["Rack and Pinion", "Pulley", "Gear", "Lever"], a: "Rack and Pinion" },
      { q: "What bridge type uses cables suspended from towers?", o: ["Suspension Bridge", "Arch Bridge", "Beam Bridge", "Truss Bridge"], a: "Suspension Bridge" },
      { q: "What is aerodynamics?", o: ["Study of air flow", "Study of water flow", "Study of metals", "Study of heat"], a: "Study of air flow" }
    ],
    "10-12": [
      { q: "What is the Second Law of Thermodynamics?", o: ["Entropy of an isolated system increases", "Energy is conserved", "Force equals mass times acceleration", "Pressure is inversely proportional to volume"], a: "Entropy of an isolated system increases" },
      { q: "What is tensile strength?", o: ["Resistance to being pulled apart", "Resistance to being crushed", "Resistance to bending", "Resistance to heat"], a: "Resistance to being pulled apart" },
      { q: "In a 4-stroke engine, what follows the compression stroke?", o: ["Power stroke", "Intake stroke", "Exhaust stroke", "Ignition stroke"], a: "Power stroke" },
      { q: "What is a semiconductor commonly used in chips?", o: ["Silicon", "Copper", "Gold", "Iron"], a: "Silicon" },
      { q: "What does PID stand for in control systems?", o: ["Proportional Integral Derivative", "Positive Input Data", "Process Instrumentation Diagram", "Primary Index Directory"], a: "Proportional Integral Derivative" }
    ]
  },
  Mathematics: {
    "1": [
      { q: "If you have 1 apple and get 1 more, how many do you have?", o: ["1", "2", "3", "4"], a: "2", img: "https://img.icons8.com/color/256/apple.png" },
      { q: "Which number comes after 5?", o: ["4", "5", "6", "7"], a: "6", img: "https://img.icons8.com/color/256/6.png" },
      { q: "What shape is round like a ball?", o: ["Square", "Triangle", "Circle", "Rectangle"], a: "Circle", img: "https://img.icons8.com/color/256/basketball.png" },
      { q: "Which object is the longest?", o: ["Pencil", "Eraser", "Crayon", "Ruler"], a: "Ruler", img: "https://img.icons8.com/color/256/ruler.png" },
      { q: "How many fingers are on one hand?", o: ["3", "4", "5", "6"], a: "5", img: "https://img.icons8.com/color/256/hand.png" }
    ],
    "1-intermediate": [
      { q: "What is 5 + 3?", o: ["8", "7", "6", "9"], a: "8", img: "https://img.icons8.com/color/256/8.png" },
      { q: "Which shape has exactly three sides?", o: ["Triangle", "Square", "Circle", "Rectangle"], a: "Triangle", img: "https://img.icons8.com/color/256/geometry.png" },
      { q: "If I have 10 candies and eat 2, how many are left?", o: ["8", "9", "10", "12"], a: "8", img: "https://img.icons8.com/color/256/sweets.png" },
      { q: "What is the next number after 19?", o: ["20", "18", "21", "10"], a: "20", img: "https://img.icons8.com/color/256/20.png" },
      { q: "Which is used to buy things?", o: ["Coins", "Leaves", "Stones", "Sand"], a: "Coins", img: "https://img.icons8.com/color/256/coins.png" }
    ],
    "1-hard": [
      { q: "What is 10 + 5?", o: ["15", "10", "12", "5"], a: "15", img: "https://img.icons8.com/color/256/plus-math.png" },
      { q: "If you have 20 pencils and lose 5, how many are left?", o: ["15", "10", "25", "12"], a: "15", img: "https://img.icons8.com/color/256/pencil.png" },
      { q: "Which number is the largest?", o: ["99", "89", "100", "90"], a: "100", img: "https://img.icons8.com/color/256/100.png" },
      { q: "What shape has 6 sides?", o: ["Hexagon", "Square", "Triangle", "Circle"], a: "Hexagon", img: "https://img.icons8.com/color/256/hexagon.png" },
      { q: "How many pennies make one dime?", o: ["10", "5", "1", "20"], a: "10", img: "https://img.icons8.com/color/256/us-dollar-circled.png" }
    ],
    "1-3": [
      { q: "What is 2 + 2?", o: ["4", "3", "5", "6"], a: "4" },
      { q: "What is 10 - 5?", o: ["5", "4", "10", "0"], a: "5" },
      { q: "Which number is bigger?", o: ["100", "50", "10", "1"], a: "100" },
      { q: "What shape has 3 sides?", o: ["Triangle", "Square", "Circle", "Rectangle"], a: "Triangle" },
      { q: "How many sides does a square have?", o: ["4", "3", "5", "6"], a: "4" }
    ],
    "4-6": [
      { q: "What is 7 x 8?", o: ["56", "48", "64", "54"], a: "56" },
      { q: "What is 100 / 4?", o: ["25", "20", "50", "10"], a: "25" },
      { q: "What is the perimeter of a 5x4 rectangle?", o: ["18", "20", "9", "40"], a: "18" },
      { q: "What is 1/2 as a decimal?", o: ["0.5", "1.2", "0.2", "0.25"], a: "0.5" },
      { q: "Which of these is a prime number?", o: ["7", "9", "10", "15"], a: "7" }
    ],
    "7-9": [
      { q: "Solve for x: 2x + 5 = 15", o: ["5", "10", "2", "7.5"], a: "5" },
      { q: "What is the square root of 144?", o: ["12", "14", "16", "10"], a: "12" },
      { q: "What is the Pythagorean theorem?", o: ["a^2 + b^2 = c^2", "E=mc^2", "F=ma", "y=mx+b"], a: "a^2 + b^2 = c^2" },
      { q: "What is 3^3?", o: ["27", "9", "12", "81"], a: "27" },
      { q: "What is the area of a circle?", o: ["pi * r^2", "2 * pi * r", "1/2 b * h", "L * W"], a: "pi * r^2" }
    ],
    "10-12": [
      { q: "What is the derivative of x^2?", o: ["2x", "x", "2", "x^3/3"], a: "2x" },
      { q: "What is the integral of 1/x dx?", o: ["ln|x| + c", "e^x + c", "x^2/2 + c", "-1/x^2 + c"], a: "ln|x| + c" },
      { q: "What is the sine of 90 degrees?", o: ["1", "0", "-1", "0.5"], a: "1" },
      { q: "What is the limit of (sin x)/x as x approaches 0?", o: ["1", "0", "Infinity", "Undefined"], a: "1" },
      { q: "In a normal distribution, what percentage of data falls within one standard deviation?", o: ["~68%", "~95%", "~99%", "~50%"], a: "~68%" }
    ]
  }
};

mongoose.connect("mongodb://127.0.0.1:27017/stem_quiz").then(async () => {
  await Question.deleteMany({}); // Optional: clear existing to avoid duplicates

  let toInsert = [];

  subjects.forEach(subject => {
    grades.forEach(grade => {
      let bracket = "";
      if (grade === 1) bracket = "1";
      else if (grade >= 1 && grade <= 3) bracket = "1-3";
      else if (grade >= 4 && grade <= 6) bracket = "4-6";
      else if (grade >= 7 && grade <= 9) bracket = "7-9";
      else bracket = "10-12";

      const defaultBank = banks[subject][bracket] || banks[subject]["1-3"]; // Fallback if bracket missing

      // To ensure we have 15 questions per Grade & Subject (5 for Level 1, 5 for Level 2, 5 for Level 3)
      for (let level = 1; level <= 3; level++) {
        const levelName = level === 1 ? "Basic" : level === 2 ? "Intermediate" : "Hard";
        
        let specificBracket = "";
        if (level === 1) specificBracket = bracket + "-basic";
        else if (level === 2) specificBracket = bracket + "-intermediate";
        else if (level === 3) specificBracket = bracket + "-hard";
        
        let qBank = banks[subject][specificBracket] ? banks[subject][specificBracket] : defaultBank;

        qBank.forEach((qItem, index) => {
          let assignedImage = qItem.img ? qItem.img : defaultImages[index % 5];
          toInsert.push({
            question: `[${levelName}] ${qItem.q}`,
            options: qItem.o,
            answer: qItem.a,
            subject: subject,
            grade: grade,
            image: assignedImage
          });
        });
      }
    });
  });

  await Question.insertMany(toInsert);
  console.log(`Successfully inserted ${toInsert.length} questions!`);
  process.exit(0);
});