let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let results = JSON.parse(localStorage.getItem('results')) || [];

function toggleForms() {
  document.getElementById('loginForm').classList.toggle('hidden');
  document.getElementById('signupForm').classList.toggle('hidden');
}


function signup() {
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  
  if (email && password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.find(user => user.email === email);

    if (userExists) {
      alert("Email already registered. Please log in.");
    } else {

      users.push({ email, password });
      localStorage.setItem('users', JSON.stringify(users));
      alert("Sign Up Successful! Please Log in.");
      toggleForms();
    }
  } else {
    alert("Please fill in all fields.");
  }
}

function login() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(currentUser)); 
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('resultForm').classList.remove('hidden');
    document.getElementById('resultBoard').classList.remove('hidden');
    alert("Login Successful!");
    fetchResults();  
  } else {
    alert("Invalid email or password.");
  }
}

function fetchResults() {

  results = JSON.parse(localStorage.getItem('results')) || [];
  displayResults();
}


function addResult() {
  const studentName = document.getElementById('studentName').value;
  const subject = document.getElementById('subject').value;
  const score = document.getElementById('score').value;
  const date = document.getElementById('date').value;

  if (studentName && subject && score && date) {
    const newResult = { studentName, subject, score, date, userEmail: currentUser.email };
    results.push(newResult);
    localStorage.setItem('results', JSON.stringify(results)); 
    displayResults();
    document.getElementById('resultForm').reset();
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


window.onload = function() {
  if (currentUser) {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('resultForm').classList.remove('hidden');
    document.getElementById('resultBoard').classList.remove('hidden');
    fetchResults();
  } else {
    document.getElementById('loginForm').classList.remove('hidden');
  }
};
