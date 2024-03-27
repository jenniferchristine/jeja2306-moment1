interface CourseInfo { // interface för objekt
    code: string;
    name: string;
    progression: string;
    syllabus: string;
}

window.addEventListener('load', () => { // ladda kurser vid reload
    loadResult();
});

const addCourseBtn = document.getElementById('addCourse') as HTMLButtonElement;

function saveResult(course: CourseInfo) : void { // spara till local storage
    const courses: CourseInfo[] = JSON.parse(localStorage.getItem('courses') || '[]'); // hämtar data från local storage
    courses.push(course);
    localStorage.setItem('courses', JSON.stringify(courses)); // konverterar
}

function loadResult() : void { // ladda tillägg
    const courses: CourseInfo[] = JSON.parse(localStorage.getItem('courses') || '[]');
    const container = document.getElementById("resultContainer") as HTMLDivElement;
    container.innerHTML = "";
    let count: number = 0;
    courses.forEach((course: CourseInfo) => { // loopar igenom result
        displayResult(course, count); // anropa för visning
        count++;
    });
}

function displayResult(course: CourseInfo, count: number) : void { // visa kurs
    const container = document.getElementById('resultContainer') as HTMLDivElement;
    const resultDiv: HTMLDivElement = document.createElement('div');
    const editForm = document.getElementById('editForm') as HTMLDivElement;
    resultDiv.classList.add('result');
    resultDiv.innerHTML = `Kurskod: ${course.code}<br>Kursnamn: ${course.name}<br>Progression: ${course.progression}<br>URL: ${course.syllabus}`;

    const clearResultBtn: HTMLButtonElement = document.createElement('button');
    clearResultBtn.classList.add('resultBtn');
    clearResultBtn.textContent = "Ta bort kurs";

    clearResultBtn.addEventListener('click', () => {
        container.removeChild(resultDiv); // tar bort tillhörande result
        removeResult(course);
    });

    const editBtn: HTMLButtonElement = document.createElement('button');
    editBtn.classList.add('resultBtn');
    editBtn.textContent = "Redigera kurs";

    editBtn.addEventListener('click', () => {
        editResult(count);
        editForm.style.display = 'block';
    });

    resultDiv.appendChild(editBtn);
    resultDiv.appendChild(clearResultBtn);
    container.appendChild(resultDiv);
}

function removeResult(course: CourseInfo) : void { // ta bort
    let courses: CourseInfo[] = JSON.parse(localStorage.getItem('courses') || '[]');
    courses = courses.filter((c: CourseInfo) => c.code !== course.code); // behåller övriga result genom filtrering och tar bort aktuell
    localStorage.setItem('courses', JSON.stringify(courses));
}

addCourseBtn.addEventListener('click', () => { // lägga till kurs
    const codeCondition = (document.getElementById('code') as HTMLInputElement);
    const nameCondition = (document.getElementById('name') as HTMLInputElement);
    const syllabusCondition = (document.getElementById('syllabus') as HTMLInputElement);
    const progressionCondition = (document.getElementById('progression') as HTMLInputElement); // hämtar input

    const code: string = codeCondition.value;
    const name: string = nameCondition.value;
    const syllabus: string = syllabusCondition.value;
    const progression: string = progressionCondition.value.toUpperCase(); // stora eller små bokstäver

    if (!["A", "B", "C"].includes(progression)) { // kontroll för bokstäver
        alert("OBS: Du kan endast ange progression A, B eller C");
        return; // avbryter om validering misslyckas
    }

    if (!code || !name || !syllabus) { // kontroll för ifyllning
        alert("Fyll i alla fält för att lägga till kurs");
        return; 
    }

    const course: CourseInfo = { // egenskaper för objekt baserat på interface
        code: code,
        name: name,
        progression: progression,
        syllabus: syllabus
    };

    if (["A", "B", "C"].includes(progression)) { // rensar endast fält om validering lyckats
        codeCondition.value = '';
        nameCondition.value = '';
        syllabusCondition.value = '';
        progressionCondition.value = '';
    }

    saveResult(course); // spara i local storage
    loadResult(); // visa resultat
});

function editResult(index: number) : void {
    let courses: CourseInfo[] = JSON.parse(localStorage.getItem('courses') || '[]');

    const codeInput = document.getElementById("newCode") as HTMLInputElement;
    codeInput.value = courses[index].code;
    const nameInput = document.getElementById("newName") as HTMLInputElement;
    nameInput.value = courses[index].name;
    const progressionInput = document.getElementById("newProgression") as HTMLInputElement;
    progressionInput.value = courses[index].progression;
    const syllabusInput = document.getElementById("newSyllabus") as HTMLInputElement;
    syllabusInput.value = courses[index].syllabus;

    const updateButton = document.getElementById("updateCourse") as HTMLButtonElement;
    updateButton.classList.add('resultBtn');
    updateButton?.addEventListener("click", () => {
        const newCode: string = (document.getElementById("newCode") as HTMLInputElement).value;
        courses[index].code = newCode;
        const newName: string = (document.getElementById("newName") as HTMLInputElement).value;
        courses[index].name = newName;
        const newProgression: string = (document.getElementById("newProgression") as HTMLInputElement).value;
        courses[index].progression = newProgression;
        const newSyllabus: string = (document.getElementById("newSyllabus") as HTMLInputElement).value;
        courses[index].syllabus = newSyllabus;

        const editForm = document.getElementById('editForm') as HTMLDivElement;
        editForm.style.display = 'none';

        localStorage.setItem('courses', JSON.stringify(courses));

        loadResult();
    });
}