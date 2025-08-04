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
