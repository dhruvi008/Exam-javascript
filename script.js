let currentUser = null;
let results = [];

const apiUrl = 'https://your-mock-api.com'; 

function toggleForms() {
  document.getElementById('loginForm').classList.toggle('hidden');
  document.getElementById('signupForm').classList.toggle('hidden');
}

async function signup() {
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  
  if (email && password) {
    try {
      const response = await fetch(`${apiUrl}/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (data.success) {
        alert("Sign Up Successful! Please Log in.");
        toggleForms();
      } else {
        alert("Error during sign up!");
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Error during sign up!");
    }
  } else {
    alert("Please fill in all fields.");
  }
}

async function login() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const response = await fetch(`${apiUrl}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (data.success) {
      currentUser = data.user;
      document.getElementById('loginForm').classList.add('hidden');
      document.getElementById('resultForm').classList.remove('hidden');
      document.getElementById('resultBoard').classList.remove('hidden');
      alert("Login Successful!");
      fetchResults();
    } else {
      alert("Invalid email or password.");
    }
  } catch (error) {
    console.error('Error:', error);
    alert("Login failed!");
  }
}

async function fetchResults() {
  try {
    const response = await fetch(`${apiUrl}/results?userEmail=${currentUser.email}`);
    results = await response.json();
    displayResults();
  } catch (error) {
    console.error('Error:', error);
    alert("Error fetching results!");
  }
}

async function addResult() {
  const studentName = document.getElementById('studentName').value;
  const subject = document.getElementById('subject').value;
  const score = document.getElementById('score').value;
  const date = document.getElementById('date').value;

  if (studentName && subject && score && date) {
    const newResult = { studentName, subject, score, date, userEmail: currentUser.email };
    try {
      const response = await fetch(`${apiUrl}/results`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newResult)
      });
      const data = await response.json();
      if (data.success) {
        results.push(newResult);
        displayResults();
        document.getElementById('resultForm').reset();
      } else {
        alert("Error adding result!");
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Error adding result!");
    }
  } else {
    alert("Please fill in all fields.");
  }
}


function displayResults() {
  const scoreboard = document.getElementById('scoreboard');
  scoreboard.innerHTML = ''; 

  results.forEach(result => {
    const li = document.createElement('li');
    li.textContent = `${result.studentName} - ${result.subject} - ${result.score} - ${result.date}`;
    scoreboard.appendChild(li);
  });
}

 
function searchResults() {
  const query = document.getElementById('search').value.toLowerCase();
  const filteredResults = results.filter(result =>
    result.studentName.toLowerCase().includes(query) || result.subject.toLowerCase().includes(query)
  );
  displayFilteredResults(filteredResults);
}

function displayFilteredResults(filteredResults) {
  const scoreboard = document.getElementById('scoreboard');
  scoreboard.innerHTML = ''; 
  
  filteredResults.forEach(result => {
    const li = document.createElement('li');
    li.textContent = `${result.studentName} - ${result.subject} - ${result.score} - ${result.date}`;
    scoreboard.appendChild(li);
  });
}