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
            <button onclick="buyBook('${JSON.stringify(book).replace(/"/g, "&quot;").replace(/'/g, "&#39;")}')">Buy</button>
          </div>
        `
          )
          .join("");
        document.body.innerHTML = html;
        window.buyBook = function(booke){
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
            console.log(data);
            
            window.location.href = data.url;

          }
          window.location.hash = '#/payment';
          createPaymentIntent();
        }      
      }).catch(error => console.error('Error:', error));




//'${encodeURIComponent(JSON.stringify(book))}'
// //Handling the sending of book data to the backend for getting the payments
// window.buyBook = function(book) {
//         const bookData = JSON.parse(decodeURIComponent(book));
//         window.location.hash = '#/payment';
//         // Now you can use bookData to send a POST request
//         fetch(`${baseurl}/api/create-checkout-session`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(bookData),
//         })
//         .then(response => response.json())
//         .then(data => {
//           console.log(data);
//         })
//         .catch(error => console.error('Error:', error));
//       }

  }
  // if(window.location.hash==="#/payment") {
  //   const html=`<a href="${url}">Click here</a>`
  //   document.body.innerHTML = html;
  // }
  if (window.location.hash === "#/user/paymentsuccess") {
    const html = `<div>Payment Success</div>`;
    document.body.innerHTML = html;
  } else {
    document.body.innerHTML = "<h1>Page Not found</h1>";
  }
};

// Trigger the hashchange event when the page loads
window.onhashchange();
