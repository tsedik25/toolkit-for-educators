function toggleSidebar() {
  const sidebarWrapper = document.querySelector(".sidebar-wrapper");
  const sidebar = document.querySelector(".sidebar");
  const logoImg = document.querySelector(".logo-img");
  const logoIcon = document.querySelector(".logo-icon");
  const sidebarToggle = document.querySelector(".sidebar-toggle");
  sidebarToggle.innerHTML = sidebar.classList.contains("indent")
    ? '<i class="fa-solid fa-outdent" onclick="toggleSidebar()"></i>'
    : '<i class="fa-solid fa-indent" onclick="toggleSidebar()"></i>';
  sidebarWrapper.classList.toggle("indent");
  sidebar.classList.toggle("indent");
  logoImg.classList.toggle("indent");
  logoIcon.classList.toggle("indent");
}

const menu = document.getElementById('menu');
const chevron = document.getElementById('chevron');
const options = document.getElementById('options');

function toggleDropdown() {
  menu.classList.toggle('open');
  chevron.innerHTML = !menu.classList.contains('open')
    ? '<i class="fa-solid fa-chevron-down"></i>'
    : '<i class="fa-solid fa-xmark"></i>';
}

function handleMenuButtonClicked(type) {
  toggleDropdown();
  displayData(type);
  options.textContent = capitalize(type);
}

let selectedRows = [];
let allData;

getData();

function getData() {
  fetch('data.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      const menu = document.getElementById('menu');
      for (const key in data) {
        const capitalizedKey = capitalize(key);
        menu.innerHTML += `<button onclick="handleMenuButtonClicked('${key}')">${capitalizedKey}</button>`;
      }
      allData = data;
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}

function displayData(type) {
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML =
    '<p>Select the criteria you wish to include in your rubric:</p>';

  allData?.[type]?.forEach((item) => {
    createCheckbox(item, outputDiv);
  });

  createGenerateRubricButton(outputDiv, type);
}

function createCheckbox(item, outputDiv) {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.value = item.criteria;
  checkbox.addEventListener('change', () => {
    handleCheckboxChange(checkbox, item);
  });

  const label = document.createElement('label');
  label.textContent = item.criteria;
  label.htmlFor = item.criteria;

  const br = document.createElement('br');

  outputDiv.appendChild(checkbox);
  outputDiv.appendChild(label);
  outputDiv.appendChild(br);
}

function handleCheckboxChange(checkbox, item) {
  if (checkbox.checked) {
    console.log('Selected:', item);
    selectedRows.push(item);
  } else {
    console.log('Unselected:', item);
    selectedRows = selectedRows.filter((row) => row.criteria !== item.criteria);
  }
}

function createGenerateRubricButton(outputDiv, type) {
  const generateRubricBtn = document.createElement('button');
  generateRubricBtn.textContent = 'Generate Rubric';
  generateRubricBtn.classList.add('rubric-button');
  generateRubricBtn.addEventListener('click', () => {
    displayTableData(selectedRows, type);
  });

  outputDiv.appendChild(generateRubricBtn);
}

function displayTableData(data, type) {
  const capitalizedKey = capitalize(type);
  const outputDiv = document.getElementById('output2');
  outputDiv.innerHTML = `<h2>${capitalizedKey} Rubric:</h2>`;

  const table = createTable(data);
  outputDiv.appendChild(table);

  createDownloadLink(outputDiv, data);
}

function createTable(data) {
  const table = document.createElement('table');
  table.id = 'rubric-table';
  table.classList.add('data-table');

  const headers = Object.keys(data[0]);
  createTableHeader(table, headers);

  data.forEach((item) => {
    createTableRow(table, item);
  });

  return table;
}

function createTableHeader(table, headers) {
  const headerRow = document.createElement('tr');

  headers.forEach((header) => {
    const headerCell = document.createElement('th');
    headerCell.textContent = capitalize(header);
    headerRow.appendChild(headerCell);
  });
  const marksHeader = document.createElement('th');
  marksHeader.textContent = 'Marks';
  headerRow.appendChild(marksHeader);
  table.appendChild(headerRow);
}

function createTableRow(table, item) {
  const row = document.createElement('tr');
  Object.values(item).forEach((value) => {
    const cell = document.createElement('td');
    cell.textContent = value;
    row.appendChild(cell);
  });
  // Add an empty td at the end
  const emptyCell = document.createElement('td');
  row.appendChild(emptyCell);
  table.appendChild(row);
}

function createDownloadLink(outputDiv, data) {
  const downloadLink = document.createElement('a');
  downloadLink.classList.add('download-button');
  downloadLink.innerHTML =
    "<span>Export CSV</span><i class='fa-solid fa-file-export'></i>";
  downloadLink.href = generateCsv(data);
  downloadLink.download = 'table_data.csv';
  outputDiv.appendChild(downloadLink);
}

function generateCsv(data) {
  const headers = Object.keys(data[0]).concat('Marks');
  let csvContent = headers.map(capitalize).join(',') + '\n';

  data.forEach((item) => {
    const row = headers.map((header) => formatCsvCell(item[header])).join(',');
    csvContent += row + '\n';
  });

  return 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
}

function formatCsvCell(content) {
  if (typeof content === 'string' && content.includes(',')) {
    return `"${content}"`;
  }
  return content;
}

function capitalize(text) {
  return text.includes('-')
    ? text
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : text.charAt(0).toUpperCase() + text.slice(1);
}