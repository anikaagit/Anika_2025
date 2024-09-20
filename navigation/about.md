---
layout: post
title: About Anika
permalink: /about/
---



<div class="profile-image">
  <img src="{{site.baseurl}}/images/IMG_0957.jpg" alt="Me">
  <p class="image-caption">Me</p>
</div>


## Places I've lived!


<style>
    // Style looks pretty compact, but it has a repeat 4, what if we wanted it dynamic
</style>

<!-- This is orignal grid_container class, but now we are adding an id for JavaScript -->
<div class="grid_container" id="grid_container">
    <!-- We are hoping to make the insides with a JavaScript object -->
</div>



<style>
/* this is Anika's change to add styling for the profile-image class that I created for my about.mdd page*/ 

.profile-image {
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
}

.profile-image img {
  width: 150px;
  height: auto;
  border-radius: 0;
}
</style>

<style>
    /* Style looks pretty compact, trace grid-container and grid-item in the code */
    .grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); /* Dynamic columns */
        gap: 10px;
    }
    .grid-item {
        text-align: center;
    }
    .grid-item img {
        width: 100%;
        height: 100px; /* Fixed height for uniformity */
        object-fit: contain; /* Ensure the image fits within the fixed height */
    }
    .grid-item p {
        margin: 5px 0; /* Add some margin for spacing */
    }
</style>

<!-- This grid_container class is for the CSS styling, the id is for JavaScript connection -->
<div class="grid-container" id="grid_container">
    <!-- content will be added here by JavaScript -->
</div>

<script>
    // 1. Make a connection to the HTML container defined in the HTML div
    var container = document.getElementById("grid_container"); // This container connects to the HTML div

    // 2. Define a JavaScript object for our http source and our data rows for the Living in the World grid
    var http_source = "https://upload.wikimedia.org/wikipedia/commons/";
    var living_in_the_world = [
        {"flag": "4/41/Flag_of_India.svg", "greeting": "Namaste", "description": "India - 1 month"},
        {"flag": "0/01/Flag_of_California.svg", "greeting": "Hey", "description": "California - 12 years"},
        {"flag": "b/b9/Flag_of_Minnesota.svg", "greeting": "E-yello", "description": "Minnesota - 6 months"},
        {"flag": "f/f7/Flag_of_Pennsylvania.svg", "greeting": "Yo", "description": "Philadelphia - 1 year"},
    ]; 
    
    // 3a. Consider how to update style count for size of container
    // The grid-template-columns has been defined as dynamic with auto-fill and minmax

    // 3b. Build grid items inside of our container for each row of data
    for (const location of living_in_the_world) {
        // Create a "div" with "class grid-item" for each row
        var gridItem = document.createElement("div");
        gridItem.className = "grid-item";  // This class name connects the gridItem to the CSS style elements
        // Add "img" HTML tag for the flag
        var img = document.createElement("img");
        img.src = http_source + location.flag; // concatenate the source and flag
        img.alt = location.flag + " Flag"; // add alt text for accessibility

        // Add "p" HTML tag for the description
        var description = document.createElement("p");
        description.textContent = location.description; // extract the description

        // Add "p" HTML tag for the greeting
        var greeting = document.createElement("p");
        greeting.textContent = location.greeting;  // extract the greeting

        // Append img and p HTML tags to the grid item DIV
        gridItem.appendChild(img);
        gridItem.appendChild(description);
        gridItem.appendChild(greeting);

        // Append the grid item DIV to the container DIV
        container.appendChild(gridItem);
    }
</script>

## Journey Through Life

- I have stayed in India for months at a time once a year, since its an important part of my culture to visit my extended relatives.
- I have lived in California for most of my life, and its excellent weather makes it my favorite place I have lived in thus far.
- I was born in Minnesota and only stayed there for 6 months because we weren't the biggest fans of the harsh weather
- I stayed in Philly for one year while my mom was getting her Masters Degree at UPenn. 

## Hobbies

These are some hobbies I like to do for fun:

- Travel
- Dance (I have done Kathak for most of my life)
- Painting
- Reading