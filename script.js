// DOM
let image = document.getElementById("image");
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// 1st time loading images
let isInitialLoad = true;

// Unsplash API
let initialCount = 5;
const apiKey = "05rP_IdORYg99I9DQBXdmWxNQh5COmMJI9NXlP9p35E";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;
let imgUrl = "";
let alt = "";

const updateAPICount = (newCount) => {
  apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${newCount}`;
};

// Check if all images were loaded
const imageLoaded = () => {
  imagesLoaded++;
  //   console.log("imagesLoaded: ", imagesLoaded);

  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
};

// Displaying Photos, Creating link and img elements
const displayImage = () => {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    // Create a Link Element <a>
    const a = document.createElement("a");
    a.href = photo.links.html;
    a.target = "_blank";

    // Create an Image Element <img>
    const img = document.createElement("img");
    img.src = photo.urls.regular;
    img.alt = photo.alt_description;
    img.title = photo.alt_description;

    //  Event Listener, check when it has finished loading
    img.addEventListener("load", imageLoaded);

    // Putting <img> inside <a> then both inside the imageContainer
    a.appendChild(img);
    imageContainer.appendChild(a);
  });
};

// Get photos from Unsplash API
const getPhotos = async () => {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayImage();
    if (isInitialLoad) {
      updateAPICount(30);
      isInitialLoad = false;
    }
  } catch (error) {
    console.log("Something went wrong!", error);
  }
};

// Check to see if scroll is at the bottom of the page, Load more photos
window.addEventListener("scroll", () => {
  //   console.log("scrolled");
  //   console.log(window.innerHeight);
  //   console.log(window.scrollY);
  //   console.log(document.body.offsetHeight);

  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();
