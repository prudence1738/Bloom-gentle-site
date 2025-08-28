// =============================================
// JavaScript Fundamentals Playground
// Each part is clearly commented and organized.
// =============================================

// -----------------------------
// Part 0: Utilities and Globals
// -----------------------------
const dom = {
  nameInput: document.getElementById("name-input"),
  ageInput: document.getElementById("age-input"),
  greetBtn: document.getElementById("greet-btn"),
  part1Output: document.getElementById("part1-output"),

  priceInput: document.getElementById("price-input"),
  quantityInput: document.getElementById("quantity-input"),
  discountInput: document.getElementById("discount-input"),
  taxInput: document.getElementById("tax-input"),
  calcBtn: document.getElementById("calc-btn"),
  formatBtn: document.getElementById("format-btn"),
  calcOutput: document.getElementById("calc-output"),
  toggleBtn: document.getElementById("toggle-btn"),
  toggleTarget: document.getElementById("toggle-target"),

  generateListBtn: document.getElementById("generate-list-btn"),
  countdownBtn: document.getElementById("countdown-btn"),
  listOutput: document.getElementById("list-output"),
  countdownOutput: document.getElementById("countdown-output"),
};

function writeOutput(element, message) {
  if (!element) return;
  element.textContent = String(message);
}

// -----------------------------------------------
// Part 1: Variables, Data Types, Operators, If/Else
// -----------------------------------------------
// - Capture user input, make decisions, output results

// Variable declarations
let userName = ""; // string
let userAge = 0; // number
let isAdult = false; // boolean

function evaluateAge(age) {
  // returns a small status string based on age
  if (Number.isNaN(age) || age < 0) {
    return "Invalid age.";
  } else if (age >= 18) {
    return "Adult";
  } else if (age >= 13) {
    return "Teen";
  } else {
    return "Child";
  }
}

function handleGreetAndCheckAge() {
  // Get values and coerce types
  userName = (dom.nameInput?.value || "").trim();
  userAge = Number(dom.ageInput?.value);

  // Operators and conditionals
  isAdult = userAge >= 18; // comparison operator
  const status = evaluateAge(userAge);

  // Output to console and DOM
  console.log(`Hello ${userName || "there"}! Age: ${userAge}, Status: ${status}`);

  const greeting = userName ? `Hello, ${userName}!` : "Hello!";
  const ageLine = Number.isNaN(userAge) ? "Please enter a valid age." : `You are a ${status}.`;
  const adultLine = Number.isNaN(userAge) ? "" : (isAdult ? "You can vote." : "You cannot vote yet.");

  writeOutput(dom.part1Output, `${greeting} ${ageLine} ${adultLine}`);
}

// ---------------------------------
// Part 2: Custom Functions (at least 2)
// ---------------------------------
// 1) calculateTotal: price * qty with discount and tax
function calculateTotal(price, quantity, discountRate, taxRate) {
  const normalizedPrice = Math.max(0, Number(price));
  const normalizedQty = Math.max(0, Math.floor(Number(quantity)));
  const d = clamp(Number(discountRate), 0, 1);
  const t = clamp(Number(taxRate), 0, 1);

  const subtotal = normalizedPrice * normalizedQty;
  const discounted = subtotal * (1 - d);
  const total = discounted * (1 + t);
  return {
    subtotal,
    discounted,
    total,
  };
}

// 2) toTitleCase: format a string to Title Case
function toTitleCase(text) {
  return String(text || "")
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

// Helper: clamp a number
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function handleCalculateTotal() {
  const price = dom.priceInput?.value;
  const qty = dom.quantityInput?.value;
  const discount = dom.discountInput?.value;
  const tax = dom.taxInput?.value;
  const result = calculateTotal(price, qty, discount, tax);

  writeOutput(
    dom.calcOutput,
    `Subtotal: $${result.subtotal.toFixed(2)} | After Discount: $${result.discounted.toFixed(2)} | Total (with tax): $${result.total.toFixed(2)}`
  );
}

function handleFormatName() {
  const original = dom.nameInput?.value || "";
  const formatted = toTitleCase(original);
  writeOutput(dom.calcOutput, `Formatted name: ${formatted || "(empty)"}`);
}

// Bonus function: toggle a CSS class for DOM interactivity
function toggleHighlightBox() {
  dom.toggleTarget?.classList.toggle("highlight");
}

// -------------------
// Part 3: Loops (2+)
// -------------------
// Example A: forEach to render a dynamic list
function generateFruitList() {
  const fruits = ["apple", "banana", "cherry", "dragonfruit", "elderberry"]; // array
  dom.listOutput.innerHTML = "";

  fruits.forEach((fruit, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${toTitleCase(fruit)}`;
    dom.listOutput.appendChild(li);
  });
}

// Example B: while loop to simulate a countdown
function startCountdown(start = 5) {
  let n = Number(start);
  if (Number.isNaN(n) || n < 0) n = 5;
  dom.countdownOutput.textContent = "";

  // Using setInterval for visible progression
  const timer = setInterval(() => {
    dom.countdownOutput.textContent = `T-minus ${n}...`;
    n -= 1;
    if (n < 0) {
      clearInterval(timer);
      dom.countdownOutput.textContent = "Liftoff!";
    }
  }, 700);
}

// Additional loop example (for): sum of first N numbers
function sumFirstN(n) {
  const limit = Math.max(0, Math.floor(Number(n)));
  let sum = 0;
  for (let i = 1; i <= limit; i += 1) {
    sum += i;
  }
  return sum;
}

// -------------------------------------------
// Part 4: DOM Interactions (3+ interactions)
// -------------------------------------------
// - Selecting elements and updating content: writeOutput, list generation, countdown text
// - Toggling classes: toggleHighlightBox()
// - Listening to events: clicking buttons below

function wireEvents() {
  dom.greetBtn?.addEventListener("click", handleGreetAndCheckAge);
  dom.calcBtn?.addEventListener("click", handleCalculateTotal);
  dom.formatBtn?.addEventListener("click", handleFormatName);
  dom.toggleBtn?.addEventListener("click", toggleHighlightBox);
  dom.generateListBtn?.addEventListener("click", generateFruitList);
  dom.countdownBtn?.addEventListener("click", () => startCountdown(5));

  // Nice-on-load demo values
  if (dom.nameInput && !dom.nameInput.value) dom.nameInput.value = "grace hopper";
  if (dom.ageInput && !dom.ageInput.value) dom.ageInput.value = "17";
}

// Initialize when DOM is ready (defer in HTML ensures this runs after parse)
wireEvents();

