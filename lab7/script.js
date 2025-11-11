        function Print() {
            const faculty = document.getElementById('faculty').value || document.getElementById('faculty').placeholder;
            const surname = document.getElementById('surname').value;
            const spec = document.getElementById('spec').value;
            
            const courseRadios = document.querySelectorAll('input[name="course"]');
            let course = '';
            courseRadios.forEach(radio => {
                if (radio.checked) {
                    course = radio.value;
                }
            });
            
            const checkedSubjects = document.querySelectorAll('input[name="subjects"]:checked');
            let subjectsHTML = '';

            for (let i = 0; i < checkedSubjects.length; i++) {
            subjectsHTML += `<li>${checkedSubjects[i].value}</li>`;
}
            document.getElementById('output').style.removeProperty('display');
            document.getElementById('output').innerHTML = `
            <h3>${faculty}</h3>
            <p>Студент ${surname} специальность ${spec} курс ${course} должен сдавать следующие предметы:</p>
            <ul>${subjectsHTML}</ul>
            `;
            
        }


