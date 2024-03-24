const baseurl="https://bookhive-server.onrender.com/api/books";

fetch(baseurl, { method:"GET" })
  .then(response => response.json()) // Convert the response data to JSON
  .then(data => console.log(data)) // Log the response data
  .catch(error => console.error('Error:', error)); // Log any errors