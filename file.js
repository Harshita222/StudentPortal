let studentsData = [];

// Function to fetch student data from the provided URL
async function fetchStudentData() {
  try {
    const response = await fetch(
      "https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json"
    );
    const data = await response.json();
    studentsData = data;
    renderTable(studentsData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Function to render the student table
function renderTable(data) {
  const tableBody = document.querySelector("table tbody");
  tableBody.innerHTML = "";

  data.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>
        <img src="${student.img_src}" alt="${student.first_name} ${
      student.last_name
    }" width="50">
        ${student.first_name} ${student.last_name}
      </td>
      <td>${student.gender}</td>
      <td>${student.class}</td>
      <td>${student.marks}</td>
      <td>${student.passing ? "Passing" : "Failed"}</td>
      <td>${student.email}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Function to handle search
function handleSearch() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const filteredData = studentsData.filter(
    (student) =>
      student.first_name.toLowerCase().includes(searchInput) ||
      student.last_name.toLowerCase().includes(searchInput) ||
      student.email.toLowerCase().includes(searchInput)
  );
  renderTable(filteredData);
}

// Function to sort students by name in ascending order
function sortByNameAsc() {
  const sortedData = [...studentsData].sort((a, b) =>
    (a.first_name + a.last_name).localeCompare(b.first_name + b.last_name)
  );
  renderTable(sortedData);
}

// Function to sort students by name in descending order
function sortByNameDesc() {
  const sortedData = [...studentsData].sort((a, b) =>
    (b.first_name + b.last_name).localeCompare(a.first_name + a.last_name)
  );
  renderTable(sortedData);
}

// Function to sort students by marks
function sortByMarks() {
  const sortedData = [...studentsData].sort((a, b) => a.marks - b.marks);
  renderTable(sortedData);
}

// Function to sort students by passing status
function sortByPassing() {
  const sortedData = studentsData.filter((student) => student.passing);
  renderTable(sortedData);
}

// Function to sort students by class
function sortByClass() {
  const sortedData = [...studentsData].sort((a, b) => a.class - b.class);
  renderTable(sortedData);
}

// Function to sort students by gender and display in separate tables
// Function to sort students by gender and display in a single table
function sortByGender() {
  // Sort students by gender first
  const sortedData = [...studentsData].sort((a, b) =>
    a.gender.localeCompare(b.gender)
  );

  // Render the sorted data in the table
  renderTable(sortedData);
}

// Function to create gender-specific table
function createGenderTable(gender, data) {
  const table = document.createElement("table");
  table.innerHTML = `
    <caption>${gender} Students</caption>
    <thead>
      <tr>
        <th>id</th>
        <th>Name</th>
        <th>Class</th>
        <th>Marks</th>
        <th>Passing</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      ${data
        .map(
          (student, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${student.first_name} ${student.last_name}</td>
            <td>${student.class}</td>
            <td>${student.marks}</td>
            <td>${student.passing ? "Passing" : "Failed"}</td>
            <td>${student.email}</td>
          </tr>
        `
        )
        .join("")}
    </tbody>
  `;
  return table;
}

// Fetch student data when the page loads
fetchStudentData();
