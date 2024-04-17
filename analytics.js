import { getDbData } from './firebase.js';
import { capitalize } from './common.js';

getDataAndCreateTable();

async function getDataAndCreateTable() {
  const data = await getDbData();
  const outputDiv = document.getElementById('downloads');
  console.log('first', data);

  const table = createTable(data);
  outputDiv.appendChild(table);
}

function createTable(data) {
  console.log(data);
  const table = document.createElement('table');
  table.id = 'downloads-table';
  table.classList.add('data-table');

  const headers = ['Assignment Type', 'Total Downloads'];
  createTableHeader(table, headers);

  createTableRow(table, data);

  return table;
}

function createTableHeader(table, headers) {
  const headerRow = document.createElement('tr');

  headers.forEach((header) => {
    const headerCell = document.createElement('th');
    headerCell.textContent = header;
    headerRow.appendChild(headerCell);
  });
  table.appendChild(headerRow);
}

function createTableRow(table, item) {
  const keys = Object.keys(item);
  keys.forEach((key) => {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.textContent = capitalize(key);
    row.appendChild(cell);

    const valueCell = document.createElement('td');
    valueCell.textContent = item[key].downloads;
    row.appendChild(valueCell);
    table.appendChild(row);
  });
}
