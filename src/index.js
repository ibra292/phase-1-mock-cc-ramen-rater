// Fetch ramen data from local JSON file
const ramenUrl = "./db.json";

const ramenMenu = document.querySelector("#ramen-menu");
const ramenDetail = document.querySelector("#ramen-detail");
const ratingDisplay = document.querySelector("#rating-display");
const commentDisplay = document.querySelector("#comment-display");
const newRamenForm = document.querySelector("#new-ramen");


async function renderRamenMenu() {
  const response = await fetch(ramenUrl);
  const ramenData = await response.json();

  ramenData.ramens.forEach((ramen) => {
    const img = document.createElement("img");
    img.src = ramen.image;
    img.alt = ramen.name;
    img.addEventListener("click", () => renderRamenDetail(ramen));
    ramenMenu.append(img);
  });
}


function renderRamenDetail(ramen) {
  ramenDetail.innerHTML = `
    <img class="detail-image" src="${ramen.image}" alt="${ramen.name}" />
    <h2 class="name">${ramen.name}</h2>
    <h3 class="restaurant">${ramen.restaurant}</h3>
  `;
  ratingDisplay.textContent = ramen.rating;
  commentDisplay.textContent = ramen.comment;
}


newRamenForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.querySelector("#new-name").value;
    const restaurant = document.querySelector("#new-restaurant").value;
    const image = document.querySelector("#new-image").value;
    const rating = document.querySelector("#new-rating").value;
    const comment = document.querySelector("#new-comment").value;
  
    await fetch(ramenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        restaurant,
        image,
        rating,
        comment,
      }),
    });
  
    // Clear the form inputs
    newRamenForm.reset();
  
    // Re-render the ramen menu with the new ramen added
    await renderRamenMenu();
  });
  

//   if (response.ok) {
//     // Refresh the page to see the new ramen added to the menu
//     location.reload();
//   } else {
//     console.log(`Failed to add new ramen: ${response.status}`);
//   }
// });

// Render ramen menu when page loads
renderRamenMenu();
