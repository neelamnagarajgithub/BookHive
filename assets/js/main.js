const baseurl = "https://bookhive-server.onrender.com";

window.onhashchange = function () {
  if (window.location.hash === "#/books") {
    fetch(`${baseurl}/api/books`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        const html = data.allbooks
          .map(
            (book) => `
          <div>
            <h2>${book.title}</h2>
            <p>${book.description}</p>
            <img src="${book.coverImage}" alt="Image">
            <button onclick="buyBook('${encodeURIComponent(JSON.stringify(book))}')">Buy</button>
          </div>
        `
          )
          .join("");
        document.body.innerHTML = html;
      }).catch(error => console.error('Error:', error));


//Handling the sending of book data to the backend for getting the payments
      function buyBook(book) {
        const bookData = JSON.parse(decodeURIComponent(book));
        window.location.hash = '#/payment';
        // Now you can use bookData to send a POST request
        fetch(`${baseurl}/api/create-checkout-session`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookData),
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => console.error('Error:', error));
      }
  }
  if (window.location.hash === "#/user/paymentsuccess") {
    const html = `<div>Payment Success</div>`;
    document.body.innerHTML = html;
  } else {
    document.body.innerHTML = "<h1>Page Not found</h1>";
  }
};

// Trigger the hashchange event when the page loads
window.onhashchange();
