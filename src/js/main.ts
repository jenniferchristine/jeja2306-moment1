interface CourseInfo {
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

    localStorage.setItem('course', JSON.stringify(course));
    (document.getElementById('course-form') as HTMLFormElement).reset();

    const container = document.getElementById('resultContainer') as HTMLDivElement;
    const resultDiv = document.createElement('div');
    resultDiv.classList.add('result');
    resultDiv.innerHTML = `Kurskod: ${code}<br>Kursnamn: ${name}<br>Progression: ${progression}<br>URL: ${syllabus}`;

    const clearResultBtn = document.createElement('button');
    clearResultBtn.textContent = 'Ta bort kurs';

    resultDiv.appendChild(clearResultBtn);

    clearResultBtn.addEventListener('click', () => {
        const contentElement = document.getElementById('content');
        contentElement!.textContent = '';
    });

    container.appendChild(resultDiv);


});

