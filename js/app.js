// Переменные для работы
let total = 0;                    // Текущая накопленная сумма
let operations = [];              // Массив всех введенных сумм (для отмены)
const input = document.getElementById('amountInput');
const totalDisplay = document.getElementById('totalDisplay');
const undoBtn = document.getElementById('undoBtn');
const resetBtn = document.getElementById('resetBtn');
const jarImage = document.getElementById('jarImage');

// Звуковые файлы
const soundAdd = new Audio('sounds/1.mp3');
const soundReset = new Audio('sounds/2.mp3');

// Функция отображения суммы
function updateDisplay() {
    totalDisplay.textContent = `Общая сумма: ${total} Kč`;
}

// Добавление суммы при Enter
input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const value = Number(input.value);

        if (!isNaN(value) && value > 0) {
            total += value;
            operations.push(value);
            updateDisplay();
            soundAdd.play();       // проигрываем звук
            input.value = '';
        }
    }
});

// Отмена последнего ввода
undoBtn.addEventListener('click', function () {
    if (operations.length > 0) {
        const last = operations.pop();
        total -= last;
        updateDisplay();
    }
});

// Полный сброс
resetBtn.addEventListener('click', function () {
    if (total > 0) {
        // Telegram: вы вставите реальное API/бота, пока просто консоль
        console.log(`Telegram сообщение: команда собрала ${total} Kč`);

        soundReset.play();
        total = 0;
        operations = [];
        updateDisplay();
    }
});

// Функция смены картинки по календарю
function updateJarImage() {
    const date = new Date();
    const day = date.getDate();

    // Определяем номер картинки
    let imgIndex = Math.ceil(day / 5); // каждые 5 дней новая
    if (imgIndex > 6) imgIndex = 6;
    if (day <= 5) imgIndex = 1;

    // Установка пути картинки
    jarImage.src = `images/${imgIndex}.png`;
}

// Первичный вызов
updateJarImage();

// Проверка в 00:00 можно сделать интервалом раз в сутки
setInterval(updateJarImage, 1000 * 60 * 60);
