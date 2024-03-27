interface CourseInfo { // interface för objekt
    code: string;
    name: string;
    progression: string;
    syllabus: string;
}

const addCourseBtn = document.getElementById('addCourse') as HTMLButtonElement;

function saveResult(course: CourseInfo) { // spara till local storage
    const courses = JSON.parse(localStorage.getItem('courses') || '[]'); // hämtar data från local storage
    courses.push(course);
    localStorage.setItem('courses', JSON.stringify(courses)); // konverterar
}

function loadResult() { // ladda tillägg
    const courses = JSON.parse(localStorage.getItem('courses') || '[]');
    courses.forEach((course: CourseInfo) => { // loopar igenom result
        displayResult(course); // anropa för visning
    });
}

function displayResult(course: CourseInfo) { // visa kurs
    const container = document.getElementById('resultContainer') as HTMLDivElement;
    const resultDiv = document.createElement('div') as HTMLDivElement;
    resultDiv.classList.add('result');
    resultDiv.innerHTML = `Kurskod: ${course.code}<br>Kursnamn: ${course.name}<br>Progression: ${course.progression}<br>URL: ${course.syllabus}`;

    const clearResultBtn = document.createElement('button');
    clearResultBtn.classList.add('eraseResult');
    clearResultBtn.textContent = 'Ta bort kurs';

    clearResultBtn.addEventListener('click', () => {
        container.removeChild(resultDiv); // tar bort tillhörande result
        removeResult(course);
    });

    resultDiv.appendChild(clearResultBtn);
    container.appendChild(resultDiv);
}

function removeResult(course: CourseInfo) { // ta bort
    let courses = JSON.parse(localStorage.getItem('courses') || '[]');
    courses = courses.filter((c: CourseInfo) => c.code !== course.code); // behåller övriga result genom filtrering och tar bort aktuell
    localStorage.setItem('courses', JSON.stringify(courses));
}

addCourseBtn.addEventListener('click', () => { // lägga till kurs
    const codeCondition = (document.getElementById('code') as HTMLInputElement);
    const nameCondition = (document.getElementById('name') as HTMLInputElement);
    const syllabusCondition = (document.getElementById('syllabus') as HTMLInputElement);
    const progressionCondition = (document.getElementById('progression') as HTMLInputElement); // hämtar input

    const code = codeCondition.value;
    const name = nameCondition.value;
    const syllabus = syllabusCondition.value;
    const progression = progressionCondition.value.toUpperCase(); // stora eller små bokstäver

    if (!code || !name || !syllabus) { // kontroll för ifyllning
        alert("Fyll i alla fält för att lägga till kurs");
        return; // avbryter om validering misslyckas
    }

    if (!["A", "B", "C"].includes(progression)) { // kontroll för bokstäver
        alert("OBS: Du kan endast ange progression A, B eller C");
        return;
    }

    const course: CourseInfo = { // egenskaper för objekt baserat på interface
        code: code,
        name: name,
        progression: progression,
        syllabus: syllabus
    };

    if (["A", "B", "C"].includes(progression)) { // rensar endast fält vid lyckad validering
        codeCondition.value = "";
        nameCondition.value = "";
        syllabusCondition.value = "";
        progressionCondition.value = "";
    }

    saveResult(course); // spara i local storage
    displayResult(course); // visa resultat
});

window.addEventListener('load', () => { // ladda kurser vid reload
    loadResult();
});