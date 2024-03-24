const baseurl="https://bookhive-server.onrender.com";

window.onhashchange = function() {
  if (window.location.hash === '#/books') {
    fetch(`${baseurl}/api/books`, { method:"GET" })
      .then(response => response.json()) 
      .then(data => {
        const html = data.allbooks.map(book => `
          <div>
            <h2>${book.title}</h2>
            <p>${book.description}</p>
            <img src="${book.coverImage}" alt="Image">
            <button>Buy</button>
          </div>
        `).join('');
        document.body.innerHTML = html;
      }) 
      .catch(error => console.error('Error:', error)); 
  }
  else if (window.location.hash === '#/user/login') { 
    fetch(baseurl)
  }
  else {
    document.body.innerHTML = '<h1>Page Not found</h1>';
  }
}

// Trigger the hashchange event when the page loads
window.onhashchange();