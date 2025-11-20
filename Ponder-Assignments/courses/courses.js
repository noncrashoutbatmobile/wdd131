// courses.js
const aCourse = {
  code: "CSE121b",
  name: "Javascript Language",

    sections: [
        { sectionNum: 1,
            roomNum: 'STC 353', 
            enrolled: 26, 
            days: 'TTh', 
            instructor: 'Bro T'
        },

        { sectionNum: 2, 
            roomNum: 'STC 347', 
            enrolled: 28, 
            days: 'TTh', 
            instructor: 'Sis A'
        },
    ],

enrollStudent: function(sectionNum) {
    const sectionIndex = this.sections.findIndex(
        (section) => section.sectionNum == sectionNum
    );
if (sectionIndex >= 0) {
    this.sections[sectionIndex].enrolled++;
    renderSections(this.sections); 
}
},
dropSubject: function(sectionNum) {
    const sectionIndex = this.sections.findIndex(
        (section) => section.sectionNum == sectionNum
    );
    if (sectionIndex >= 0) {
        this.sections[sectionIndex].enrolled--;
        renderSections(this.sections);
    }
},
};
function setCourseInfo(course) {
    const courseName = document.querySelector('#courseName');
    const courseCode = document.querySelector('#courseCode');
    courseName.textContent = course.name;
    courseCode.textContent = course.code;
}
function sectionTemplate(section) {
    return `<tr>
        <td>${section.sectionNum}</td>
        <td>${section.roomNum}</td>
        <td>${section.enrolled}</td>
        <td>${section.days}</td>
        <td>${section.instructor}</td>
    </tr>`;
}
function renderSections(sections) {
    const html = sections.map(sectionTemplate);
    document.querySelector('#sections').innerHTML = html.join('');
}
document.querySelector('#enrollStudent').addEventListener('click', function() {
    const sectionNum = document.querySelector('#sectionNumber').value;
    aCourse.enrollStudent(sectionNum);
});
document.querySelector('#dropSubject').addEventListener('click', function() {
    const sectionNum = document.querySelector('#sectionNumber').value;
    aCourse.dropSubject(sectionNum);
});
changeEnrollment(sectionNum, add = true); {
    // find the right section...Array.findIndex will work here
    const sectionIndex = this.sections.findIndex(
        (section) => section.sectionNum == sectionNum
    );
    if (sectionIndex >= 0) {
        if (add) {
            this.sections[sectionIndex].enrolled++;
        } else {
            this.sections[sectionIndex].enrolled--;
        }
        renderSections(this.sections);
    }   
}


setCourseInfo(aCourse);
renderSections(aCourse.sections);