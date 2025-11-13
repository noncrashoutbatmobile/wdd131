function getGrades(inputSelector) {
    const input = document.querySelector(inputSelector).value;
    const grades = input.split(',').map(grade => grade.trim().toUpperCase());
    return grades;

}
function lookupGrade(grade) {
const gradeScale = {
    'A': 4.0,
    'A-': 3.7,  
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0,
    'C-': 1.7,
    'D+': 1.3,
    'D': 1.0,
    'D-': 0.7,
    'F': 0.0
};
    return gradeScale[grade] !== undefined ? gradeScale[grade] : null;
}
function calculateGPA(grades) {
    let totalPoints = 0;
    let validGradesCount = 0;
    for (const grade of grades) {
        const points = lookupGrade(grade);
        if (points !== null) {
            totalPoints += points;
            validGradesCount++;
        }
    }
    return validGradesCount > 0 ? (totalPoints / validGradesCount).toFixed(2) : '0.00';
}

function outputGPA(gpa, selector) {
    const outputElement = document.querySelector(selector);
    outputElement.textContent = `Your GPA is: ${gpa}`;
}

function clickHandler() {
}

const submitButton = document.querySelector('#submitButton');
if (submitButton) {
    submitButton.addEventListener('click', function() {
        const grades = getGrades('#grades');
        const gpa = calculateGPA(grades);
        outputGPA(gpa, '#output');
    });
} else {
    console.warn('Submit button (#submitButton) not found.');
}
