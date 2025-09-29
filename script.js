document.addEventListener("DOMContentLoaded", function () {
  //Get all needed DOM elements
  const form = document.getElementById("checkInForm");
  const nameInput = document.getElementById("attendeeName"); // fixed id to match HTML
  const teamSelect = document.getElementById("teamSelect");
  const progressBar = document.getElementById("progressBar"); // get progress bar element
  const attendeeCount = document.getElementById("attendeeCount"); // get attendee count element
  const greeting = document.getElementById("greeting"); // get greeting element
  const attendeeList = document.getElementById("attendeeList");

  // Load attendance from localStorage
  let count = parseInt(localStorage.getItem("attendanceCount")) || 0;
  const maxCount = 50;
  const teamGoals = {
    water: parseInt(localStorage.getItem("waterCount")) || 0,
    zero: parseInt(localStorage.getItem("zeroCount")) || 0,
    power: parseInt(localStorage.getItem("powerCount")) || 0,
  };
  const teamNames = {
    water: "Team Water Wise",
    zero: "Team Net Zero",
    power: "Team Renewables",
  };

  // Load attendee list from localStorage
  let attendees = JSON.parse(localStorage.getItem("attendeeList")) || [];

  // Update UI on load
  attendeeCount.textContent = count;
  progressBar.style.width = Math.round((count / maxCount) * 100) + "%";
  document.getElementById("waterCount").textContent = teamGoals.water;
  document.getElementById("zeroCount").textContent = teamGoals.zero;
  document.getElementById("powerCount").textContent = teamGoals.power;
  greeting.textContent = "";
  greeting.style.display = "none";
  renderAttendeeList();

  // Handle form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form values
    const name = nameInput.value;
    const team = teamSelect.value;
    const teamName = teamSelect.selectedOptions[0].text;

    // Increment count
    count++;
    localStorage.setItem("attendanceCount", count);

    // Update progress bar
    const percentage = Math.round((count / maxCount) * 100);
    progressBar.style.width = percentage + "%";
    attendeeCount.textContent = count;

    // Update team counter
    teamGoals[team]++;
    localStorage.setItem(team + "Count", teamGoals[team]);
    const teamCounter = document.getElementById(team + "Count");
    teamCounter.textContent = teamGoals[team];

    // Add attendee to list
    attendees.push({ name: name, team: teamName });
    localStorage.setItem("attendeeList", JSON.stringify(attendees));
    renderAttendeeList();

    // Show impressive personalized greeting
    greeting.textContent = `😊 Welcome, ${name}! You are now checked in for ${teamName}.`;
    greeting.style.display = "block";
    greeting.style.fontWeight = "bold";
    greeting.style.fontSize = "1.2em";
    greeting.style.color = "#0071c5";
    greeting.style.marginBottom = "1em";

    // Check if team reached goal
    if (teamGoals[team] === maxCount) {
      greeting.textContent = `🎉 Congratulations! ${teamNames[team]} has reached the check-in goal! 🎉`;
      alert(
        `🎉 Congratulations! ${teamNames[team]} has reached the check-in goal! 🎉`
      );
    }

    form.reset();
  });

  // Render attendee list function
  function renderAttendeeList() {
    attendeeList.innerHTML = "";
    attendees.forEach(function (attendee) {
      const li = document.createElement("li");
      li.className = "attendee-list-item";
      li.textContent = `👤 ${attendee.name} — ${attendee.team}`;
      attendeeList.appendChild(li);
    });
  }
});
