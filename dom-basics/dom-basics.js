const newParagraph = document.createElement("p");
newParagraph.innerText = "Added with Javascript!";
const newImage = document.createElement("img");
newImage.src = "https://picsum.photos/200";
newImage.alt = "Placeholder Image";
const newSection = document.createElement("section");
const newH2 = document.createElement("h2");
newH2.innerText = "Dom Basics";
newSection.appendChild(newH2);
const newP = document.createElement("p");
newP.innerText = "This was added through Javascript!";
newSection.appendChild(newP);

document.body.appendChild(newParagraph);
document.body.appendChild(newImage);
document.body.appendChild(newSection);