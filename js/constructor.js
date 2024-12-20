document.addEventListener('DOMContentLoaded', function() {
    const scheduleForm = document.getElementById('scheduleForm');
    const scheduleOutput = document.getElementById('scheduleOutput');
    const clearScheduleButton = document.getElementById('clearSchedule');

    clearScheduleButton.addEventListener('click', function() {
        localStorage.removeItem('scheduleData');
        console.log('Данные расписания удалены из LocalStorage');
    
        scheduleOutput.innerHTML = '';
    
        const weekType = parseInt(document.getElementById('weekType').value, 10);
        const maxClasses = parseInt(document.getElementById('maxClasses').value, 10);
        const language = document.getElementById('language').value;
    
        generateSchedule(weekType, maxClasses, language, {});
    });

    loadFormData();

    scheduleForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const weekType = parseInt(document.getElementById('weekType').value, 10);
        const maxClasses = parseInt(document.getElementById('maxClasses').value, 10);
        const language = document.getElementById('language').value;

        saveFormData();

        generateSchedule(weekType, maxClasses, language);
    });

    function generateSchedule(weekType, maxClasses, language) {
        const daysOfWeek = {
            ru: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        };
        const classTranslete = {
            ru: 'Урок',
            en: 'Lesson'
        }
        const dayTranslate = {
            ru: "День",
            en: "Day"
        }

        const days = weekType === 5 ? daysOfWeek[language].slice(0, 5) : daysOfWeek[language];

        let scheduleData = loadScheduleData() || {};
        let scheduleTable = '<table>';
        scheduleTable += '<tr>';
        scheduleTable += `<th>${classTranslete[language]} \\ ${dayTranslate[language]}</th>`;
        days.forEach(day => {
            scheduleTable += `<th>${day}</th>`;
        });
        scheduleTable += '</tr>';

        for (let i = 1; i <= maxClasses; i++) {
            scheduleTable += '<tr>';
            scheduleTable += `<td>${i}</td>`;
            days.forEach(day => {
                const inputValue = scheduleData[day] && scheduleData[day][i] ? scheduleData[day][i] : '';

                scheduleTable += `<td><input type="text" class="schedule-input" data-day="${day}" data-lesson="${i}" value="${inputValue}"></td>`;
            });
            scheduleTable += '</tr>';
        }
        scheduleTable += '</table>';

        scheduleOutput.innerHTML = scheduleTable;

        addInputListeners();
    }

    function addInputListeners() {
        const inputs = document.querySelectorAll('.schedule-input');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                const day = this.getAttribute('data-day');
                const lessonNumber = this.getAttribute('data-lesson');
                const value = this.value;

                saveScheduleData(day, lessonNumber, value);
            });
        });
    }

    function saveFormData() {
        const formData = {


    weekType: document.getElementById('weekType').value,
            maxClasses: document.getElementById('maxClasses').value,
            language: document.getElementById('language').value
        };
        localStorage.setItem('scheduleFormData', JSON.stringify(formData));
    }

    function loadFormData() {
        const savedData = localStorage.getItem('scheduleFormData');
        if (savedData) {
            const formData = JSON.parse(savedData);
            document.getElementById('weekType').value = formData.weekType;
            document.getElementById('maxClasses').value = formData.maxClasses;
            document.getElementById('language').value = formData.language;

            const weekType = parseInt(formData.weekType, 10);
            const maxClasses = parseInt(formData.maxClasses, 10);
            const language = formData.language;

            generateSchedule(weekType, maxClasses, language);
        }
    }

    function saveScheduleData(day, lessonNumber, value) {
        let scheduleData = loadScheduleData() || {};

        if (!scheduleData[day]) {
            scheduleData[day] = {};
        }

        scheduleData[day][lessonNumber] = value;

        localStorage.setItem('scheduleData', JSON.stringify(scheduleData));
    }

    function loadScheduleData() {
        const savedSchedule = localStorage.getItem('scheduleData');
        if (savedSchedule) {
            return JSON.parse(savedSchedule);
        }
        return null;
    }
});
