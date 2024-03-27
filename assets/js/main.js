const baseurl = "https://bookhive-server.onrender.com";

function showLoader() {
  document.getElementById("preloader").style.display = "block";
}

function hideLoader() {
  document.getElementById("preloader").style.display = "none";
}

window.onhashchange = function () {
  showLoader();
  if (window.location.hash === "#/books") {
    fetch(`${baseurl}/api/books`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        const html = data.allbooks
          .map(
            (book) => `
          <div class="book-item">
            <h2>${book.title}</h2>
            <p>${book.description}</p>
            <img src="${book.coverImage}" alt="Image">
            <button onclick="buyBook('${JSON.stringify(book)
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#39;")}')">Buy</button>
          </div>
        `
          )
          .join("");
        document.body.innerHTML = `<div class="container">${html}</div>`;
        window.buyBook = function (booke) {
          const book = JSON.parse(booke);
          async function createPaymentIntent() {
            const response = await fetch(
              "https://bookhive-server.onrender.com/api/create-checkout-session",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  book: {
                    _id: book._id,
                    title: book.title,
                  },
                }),
              }
            );
            const data = await response.json();
            window.location.href = data.url;
          }
          createPaymentIntent();
        };
        hideLoader();
      })
      .catch((error) => console.error("Error:", error));
  }
  if (window.location.hash === "#/user/paymentsuccess") {
    const html = `<h1>Payment Success</h1>
    <a href="https://book-hive-silk.vercel.app/">Go Back To home Page</a>`;
    document.body.innerHTML = html;
  }
};

// Trigger the hashchange event when the page loads
window.onhashchange();
