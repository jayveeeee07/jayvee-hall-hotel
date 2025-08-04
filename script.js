// script.js

// Utility
function saveData(key, data) { localStorage.setItem(key, JSON.stringify(data)); }
function loadData(key) { return JSON.parse(localStorage.getItem(key)) || []; }

// Signup
function handleSignup(formId) {
  const form = document.getElementById(formId);
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const users = loadData('users');
    const data = Object.fromEntries(new FormData(form).entries());
    
    if (parseInt(data.age) < 18) {
      alert("Minor detected! Simulating OTP Verification...");
    }
    
    users.push(data);
    saveData('users', users);
    alert("Account created! Please login.");
    window.location.href='login.html';
  });
}

// Load users from LocalStorage
function loadData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

// Save data to LocalStorage
function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Handle Login
function handleLogin(formId) {
  const form = document.getElementById(formId);
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = form.username.value.trim();
    const password = form.password.value.trim();

    const users = loadData("users");

    // Check if user exists
    const foundUser = users.find(u => u.username === username && u.password === password);

    if (foundUser) {
      alert(`Welcome back, ${foundUser.firstName || foundUser.username}!`);
      localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
      window.location.href = "home.html"; // ✅ Redirect to home.html
    } else {
      alert("Invalid Username or Password. Please register first.");
    }
  });
}

// Handle Signup
function handleSignup(formId) {
  const form = document.getElementById(formId);
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const user = {};
    formData.forEach((value, key) => user[key] = value);

    const users = loadData("users");

    // Prevent duplicate username
    if (users.find(u => u.username === user.username)) {
      alert("Username already exists. Please choose another.");
      return;
    }

    users.push(user);
    saveData("users", users);

    alert("Account created successfully! Please login.");
    window.location.href = "login.html"; // ✅ Go back to login
  });
}
// Login
function handleLogin(formId) {
  const form = document.getElementById(formId);
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const users = loadData('users');
    const username = form.username.value;
    const password = form.password.value;
    const user = users.find(u => u.username===username && u.password===password);
    
    if(user){
      localStorage.setItem('activeUser', username);
      alert("Login Successful!");
      window.location.href='home.html';
    } else {
      alert("Invalid credentials!");
    }
  });
}

// Room slider data
const rooms = [
  {
    title: "Deluxe Suite",
    image: "assets/room1.jpg",
    desc: "Our Deluxe Suite offers a king-sized bed, private balcony, and complimentary breakfast. Perfect for couples seeking luxury in Malungon, Sarangani. Price: ₱4,500/night."
  },
  {
    title: "Standard Room",
    image: "assets/room2.jpg",
    desc: "The Standard Room provides a cozy queen-sized bed, work desk, and smart TV. Ideal for business or solo travelers. Price: ₱2,500/night."
  },
  {
    title: "Family Room",
    image: "assets/room3.jpg",
    desc: "Spacious Family Room with two queen beds, sofa area, and mini kitchen. Accommodates up to 4 people. Price: ₱6,000/night."
  }
];

let currentRoom = 0;

function showRoom(index){
  const room = rooms[index];
  document.getElementById("roomImage").src = room.image;
  document.getElementById("roomTitle").innerText = room.title;
  document.getElementById("roomDesc").innerText = room.desc;
             }
// Room Slider Logic
const rooms = [
  {name:"Deluxe Suite", price:"₱3,500/night", img:"assets/room1.jpg", desc:"Spacious room with king bed, balcony view of Sarangani mountains, and modern amenities."},
  {name:"Family Room", price:"₱2,500/night", img:"assets/room2.jpg", desc:"Perfect for families, with 2 double beds, free Wi-Fi, and complimentary breakfast."},
  {name:"Single Room", price:"₱1,500/night", img:"assets/room3.jpg", desc:"Cozy room for solo travelers, air-conditioned, with flat-screen TV and private bathroom."}
];

let currentRoom = 0;
function showRoom(index){
  const img = document.getElementById('roomImage');
  const title = document.getElementById('roomTitle');
  const desc = document.getElementById('roomDesc');
  img.src = rooms[index].img;
  title.innerText = rooms[index].name;
  desc.innerText = `${rooms[index].desc} Price: ${rooms[index].price}`;
}

// Booking
function handleBooking(formId){
  const form = document.getElementById(formId);
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const bookings = loadData('bookings');
    const data = Object.fromEntries(new FormData(form).entries());
    data.user = localStorage.getItem('activeUser');
    bookings.push(data);
    saveData('bookings', bookings);
    alert("Booking Successful! Confirm Details.");
    window.location.href='confirmation.html';
  });
}

// Generate PDF
function downloadReceipt(){
  const element = document.getElementById('receipt');
  html2pdf().from(element).save('booking-receipt.pdf');
}

let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;

function showSlide(index) {
  if (!slides.length) return;
  if (index >= totalSlides) currentSlide = 0;
  else if (index < 0) currentSlide = totalSlides - 1;
  else currentSlide = index;

  const slider = document.querySelector(".slider");
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() { showSlide(currentSlide + 1); }
function prevSlide() { showSlide(currentSlide - 1); }

// Room details
const rooms = [
  { title: "Deluxe Room", desc: "Spacious deluxe room with a king-sized bed, air-conditioning, and private balcony. Enjoy the serene view of the mountains and luxurious amenities for a comfortable stay.", price: "₱3,500/night" },
  { title: "Executive Suite", desc: "Premium suite with a living room, smart TV, high-speed Wi-Fi, and complimentary breakfast. Perfect for business or leisure stays.", price: "₱5,200/night" },
  { title: "Family Room", desc: "Large family room with two queen-sized beds, private bathroom, and mini kitchen. Ideal for group or family vacations.", price: "₱4,000/night" }
];

function showRoomDetails(index) {
  document.getElementById("roomTitle").innerText = rooms[index].title;
  document.getElementById("roomDesc").innerText = rooms[index].desc;
  document.getElementById("roomPrice").innerText = rooms[index].price;
  document.getElementById("roomModal").style.display = "block";
}

function closeRoomModal() {
  document.getElementById("roomModal").style.display = "none";
}

// Initialize first slide
document.addEventListener("DOMContentLoaded", () => {
  showSlide(currentSlide);
});

// Room Details
const rooms = [
  { title: "Deluxe Room", desc: "A spacious deluxe room with a king-sized bed, air-conditioning, and a private balcony. Enjoy the scenic mountain view and high-end amenities for a truly relaxing experience. Perfect for couples or solo travelers who want a comfortable yet affordable stay.", price: "₱3,500 / night" },
  { title: "Executive Suite", desc: "Our Executive Suite features a luxurious living space with a smart TV, high-speed Wi-Fi, and complimentary breakfast. Ideal for business travelers or leisure stays with added privacy and comfort.", price: "₱5,200 / night" },
  { title: "Family Room", desc: "Perfect for family or group stays, this spacious room offers two queen-sized beds, a private bathroom, and a mini kitchen. Enjoy a fun and cozy stay with all the conveniences you need.", price: "₱4,000 / night" },
  { title: "Presidential Suite", desc: "The epitome of luxury, our Presidential Suite includes a king-sized bed, living area, private jacuzzi, and a stunning panoramic view. Experience elegance and exclusivity like never before.", price: "₱8,000 / night" }
];

function showRoomDetails(index) {
  document.getElementById("roomTitle").innerText = rooms[index].title;
  document.getElementById("roomDesc").innerText = rooms[index].desc;
  document.getElementById("roomPrice").innerText = rooms[index].price;
  document.getElementById("roomModal").style.display = "block";
}

function closeRoomModal() {
  document.getElementById("roomModal").style.display = "none";
    }
