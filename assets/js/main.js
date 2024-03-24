const baseurl="https://bookhive-server.onrender.com/api/books";

fetch(baseurl, { method:"GET" })
  .then(response => response.json()) 
  .then(data => {
    console.log(data[0]);
    const html = data[0].map(book => `
      <div>
        <h2>${book.title}</h2>
        <p>${book.description}</p>
        <img src="book.coverImage" alt="Image">
      </div>
    `).join('');
    document.body.innerHTML = html;
  }) 
  .catch(error => console.error('Error:', error)); 