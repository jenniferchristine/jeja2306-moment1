interface CourseInfo { // interface för objekt, egenskaper
    code: string;
    name: string;
    progression: string;
    syllabus: string;
}

const addCourseBtn = document.getElementById('addCourse') as HTMLButtonElement;

addCourseBtn.addEventListener('click', () => {
    const code = (document.getElementById('code') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const progression = (document.getElementById('progression') as HTMLInputElement).value;
    const syllabus = (document.getElementById('syllabus') as HTMLInputElement).value;

    const course: CourseInfo = {
        code: code,
        name: name,
        progression: progression,
        syllabus: syllabus
    };

    localStorage.setItem('course', JSON.stringify(course)); // konverterar och lagrar course objekt till storage
    (document.getElementById('course-form') as HTMLFormElement).reset(); // tömmer fälten

    const container = document.getElementById('resultContainer') as HTMLDivElement;
    const resultDiv = document.createElement('div') as HTMLDivElement;
    resultDiv.classList.add('result');
    resultDiv.innerHTML = `Kurskod: ${code}<br>Kursnamn: ${name}<br>Progression: ${progression}<br>URL: ${syllabus}`;

    const clearResultBtn = document.createElement('button');
    clearResultBtn.classList.add('eraseResult');
    clearResultBtn.textContent = 'Ta bort kurs';

    resultDiv.appendChild(clearResultBtn);

    clearResultBtn.addEventListener('click', () => {
        container.removeChild(resultDiv);
    });

    container.appendChild(resultDiv);
});


