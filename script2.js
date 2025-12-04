const teacher_answers = {
    "Жиляк": {
        description: "Вы сегодня - Жиляк! Человек с неиссякаемой энергией и яркой индивидуальностью. Ваше фирменное чувство юмора, окрашенное лёгким сарказмом, и богатейший опыт делают общение с вами незабываемым. Вы обладаете высокими стандартами и ясным, практичным взглядом на вещи.",
        animals: [1, 2],
        persons: [2],
        films: ["Джокер", "Дэдпулл"],
        aromats: [6],
        imageId: "zhilyak-image"
    },
    "Гринюк": {
        description: "Вы сегодня - Гринюк!Вы обладаете редким даром сохранять невозмутимость и внутреннюю гармонию. Вы полностью погружены в свой предмет, что проявляется в привычке тихо и обстоятельно рассуждать. Ваша рассеянность — это на самом деле признак человека, живущего богатой внутренней жизнью. ",
        animals: [3],
        persons: [1],
        films: ["Бойцовский клуб", "Шпион, который меня кинул", "Матрица"],
        aromats: [4],
        imageId: "grinyuk-image"
    },
    "Смелов": {
        description: "Вы сегодня - Смелов! Вы — принципиальный и педантичный специалист, для которого важна абсолютная точность в вашей терминологии и фундаментальное понимание предмета. ",
        animals: [4],
        persons: [4],
        films: ["Люди в черном"],
        aromats: [2],
        imageId: "smelov-image"
    },
    "Белодед": {
        description: "Вы сегодня - Белодед! Вы — харизматичный преподаватель со своим уникальным, продуманным подходом к обучению. Вы ценит четкость и системность, что отражается в ваших хорошо структурированных требованиях к лабораторным работам. ",
        animals: [5],
        persons: [3],
        films: ["Люди в черном"],
        aromats: [1],
        imageId: "beloded-image"
    },
    "Наркевич": {
        description: "Вы сегодня - Наркевич! Вы — человек глубокий и многогранный. За внешней сдержанностью и корректностью скрывается принципиальная и требовательная к деталям личность. Вы обладаете твердой внутренней позицией и всегда стремится к идеальному результату, что иногда может быть неочевидно при первом знакомстве.",
        animals: [6],
        persons: [5],
        films: ["Хроники Нарнии"],
        aromats: [5],
        imageId: "narkevich-image"
    },
    "Ловенецкая": {
        description: "Вы сегодня - Ловенецкая! Строгий, но справедливый преподаватель, который ценит дисциплину и точность.",
        animals: [7, 8],
        persons: [6],
        films: ["Барби", "К-поп охотницы за демонами", "Интерстеллар"],
        aromats: [3],
        imageId: "lovenetskaya-image"
    }
};

// Исправленные функции для получения значений
function GetRadio(name) {
    let selected = document.querySelector(`input[name="${name}"]:checked`);
    if (!selected) {
        return null;
    }
    return parseInt(selected.value);
}

function GetCheckBox(name) {
    let selected = document.querySelectorAll(`input[name="${name}"]:checked`);
    let values = [];
    for(let i = 0; i < selected.length; i++) {
        values.push(selected[i].value);
    }
    return values;
}

function Submit() {
    // Получаем значения ответов
    const animalValue = GetRadio('animal');
    const personValue = GetRadio('person');
    const filmsValue = GetCheckBox('film');
    const aromatValue = GetRadio('aromat');
    
    console.log("Ответы:", {animalValue, personValue, filmsValue, aromatValue});
    
    // Проверяем, что все обязательные вопросы заполнены
    if (animalValue === null || personValue === null || aromatValue === null) {
        alert("Пожалуйста, ответьте на все вопросы с одним вариантом ответа!");
        return;
    }
    
    // Подсчитываем баллы для каждого преподавателя
    const scores = {};
    
    for (const teacherName in teacher_answers) {
        scores[teacherName] = 0;
        const teacher = teacher_answers[teacherName];
        
        // Проверяем животное
        if (teacher.animals.includes(animalValue)) {
            scores[teacherName]++;
        }
        
        // Проверяем персонажа
        if (teacher.persons.includes(personValue)) {
            scores[teacherName]++;
        }
        
        // Проверяем фильмы
        for (let i = 0; i < filmsValue.length; i++) {
            if (teacher.films.includes(filmsValue[i])) {
                scores[teacherName]++;
            }
        }
        
        // Проверяем аромат
        if (teacher.aromats.includes(aromatValue)) {
            scores[teacherName]++;
        }
    }
    
    console.log("Результаты подсчета:", scores);
    
    // Находим преподавателя с наибольшим количеством баллов
    let maxScore = 0;
    let resultTeacher = null;
    
    for (const teacherName in scores) {
        if (scores[teacherName] > maxScore) {
            maxScore = scores[teacherName];
            resultTeacher = teacherName;
        }
    }
    
    console.log("Результат:", resultTeacher, "с баллами:", maxScore);
    
    // Выводим результат
    const resultDiv = document.getElementById('output');
    const teacherImages = document.getElementById('teacher-images');
    
    // Сначала скрываем все изображения
    const allImages = teacherImages.getElementsByTagName('img');
    for (let i = 0; i < allImages.length; i++) {
        allImages[i].style.display = 'none';
    }
    
    if (resultTeacher && maxScore > 0) {
        const teacher = teacher_answers[resultTeacher];
        
        // Очищаем результат и добавляем текст
        resultDiv.innerHTML = `
            <div class="teacher-name">${resultTeacher}</div>
            <div class="teacher-description">${teacher.description}</div>
        `;
        
        // Показываем изображение соответствующего преподавателя
        if (teacher.imageId) {
            const teacherImage = document.getElementById(teacher.imageId);
            if (teacherImage) {
                teacherImage.style.display = 'block';
                // Показываем контейнер с изображениями
                teacherImages.style.display = 'block';
            }
        }
    } else {
        resultDiv.innerHTML = `
            <div>Не удалось определить результат</div>
            <div>Пожалуйста, ответьте на все вопросы для получения точного результата.</div>
        `;
        teacherImages.style.display = 'none';
    }
    
    resultDiv.style.display = 'block';
}

function resetForm() {
    document.querySelector('form').reset();
    document.getElementById('output').style.display = 'none';
    
    // Скрываем все изображения преподавателей
    const teacherImages = document.getElementById('teacher-images');
    teacherImages.style.display = 'none';
    
    const allImages = document.querySelectorAll('#teacher-images img');
    for (let i = 0; i < allImages.length; i++) {
        allImages[i].style.display = 'none';
    }
}