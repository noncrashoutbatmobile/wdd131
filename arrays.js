const steps = ["one", "two", "three"];
function listTemplate(step) {
    return `<li>${step}</li>`;
}
const stepsHtml = steps.map(step => listTemplate(step)).join("");
document.querySelector("#myList").innerHTML = stepsHtml;

const grades = ["A", "A", "A", "F", "A", "A"];
const gradesHtml = grades.map(grade => listTemplate(grade)).join("");
document.querySelector("#myList").innerHTML += gradesHtml;

function convertGradeToPoints(grade) {
    let points = 0;
    if (grade === "A") {
        points = 4;
    } else if (grade === "B") {
        points = 3;
    } else if (grade === "C") {
        points = 2;
    } else if (grade === "D") {
        points = 1;
    } else {
        points = 0;

    }
    return points;
}
const gpaPoints = grades.map(convertGradeToPoints);
const pointsTotal = gpaPoints.reduce(function (total, item) {
    return total + item;
});
const gpa = pointsTotal / gpaPoints.length;

document.querySelector("#myList").innerHTML += `<li>GPA: ${gpa.toFixed(2)}</li>`;

const fruits = ["watermelon", "peach", "apple", "tomato", "grape"];
const keepFruits = fruits.filter(fruit => fruit.length < 6);
const keepFruitsHtml = keepFruits.map(fruit => listTemplate(fruit)).join("");
document.querySelector("#myList").innerHTML += keepFruitsHtml;

const numbers = [ 12, 32, 21, 54]
const luckyNumber = 21
let luckyIndex = numbers.indexOf(luckyNumber);
document.querySelector("#myList").innerHTML += `<li>Lucky Number Index: ${luckyIndex}</li>`;