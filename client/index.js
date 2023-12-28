document.addEventListener('DOMContentLoaded', () => {
    // Initial data load
    refreshData();
  });
  
  function refreshData() {
    fetch('http://localhost:3000/data')
      .then(response => response.json())
      .then(data => {
        // Get the table element
        const table = document.getElementById('data-table');
  
        // Clear existing table content
        table.innerHTML = '';
  
        // Create table header
        const headerRow = document.createElement('tr');
        Object.keys(data[0]).forEach(key => {
          const th = document.createElement('th');
          th.textContent = key.toUpperCase();
          headerRow.appendChild(th);
        });
        table.appendChild(headerRow);
  
        // Create table rows with data
        data.forEach(rowData => {
          const tr = document.createElement('tr');
          Object.values(rowData).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            tr.appendChild(td);
          });
          table.appendChild(tr);
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        alert('Failed to fetch data. Check the console for details.');
      });
  }
  