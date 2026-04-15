const startBtn = document.getElementById('startBtn');
const gameContainer = document.querySelector('.game');
let currentLevel = 1;
let score = 0;

// 1. Старт игры
startBtn.addEventListener('click', function() {
  startBtn.style.display = 'none';
  loadFirstLevel();
});

// 2. Уровень 1: «Дом»
function loadFirstLevel() {
  currentLevel = 1;
  gameContainer.innerHTML = `
    <div class="level level-1">
      <div class="progress">Уровень <span id="currentLevel">1</span> из 7</div>
      <div class="score-board">Звёздочки: <span id="score">${score}</span></div>
      <h2 class="level-title">Уровень 1: Дом</h2>
      <p class="level-desc">Ты собираешься в школу. Выбери, что взять с собой:</p>
      <div class="item-grid">
        <div class="item-card" data-choice="reflector">
          <img src="assets/reflector.png" alt="Светоотражатель" class="item-img">
          <p class="item-name">Светоотражатель</p>
        </div>
        <div class="item-card" data-choice="ball">
          <img src="assets/ball.png" alt="Стеклянный шарик" class="item-img">
          <p class="item-name">Стеклянный шарик</p>
        </div>
        <div class="item-card" data-choice="toy">
          <img src="assets/toy.png" alt="Игрушка" class="item-img">
          <p class="item-name">Игрушка</p>
        </div>
      </div>
    </div>
  `;

  updateScore();

  document.querySelectorAll('.item-card').forEach(card => {
    card.addEventListener('click', function() {
      const choice = this.getAttribute('data-choice');
      if (choice === 'reflector') {
        score++;
        updateScore();
        alert('Правильно! Светоотражатель поможет быть заметным на дороге.');
        setTimeout(() => {
          loadNextLevel();
        }, 500);
      } else {
        alert('Этот предмет не поможет безопасно перейти дорогу. Попробуй другой!');
      }
    });
  });
}

// 3. Уровень 2: «Двор»
function loadNextLevel() {
  currentLevel = 2;
  gameContainer.innerHTML = `
    <div class="level level-2">
      <div class="progress">Уровень <span id="currentLevel">2</span> из 7</div>
      <div class="score-board">Звёздочки: <span id="score">${score}</span></div>
      <h2 class="level-title">Уровень 2: Двор</h2>
      <p class="level-desc">Ты вышел во двор. Найди безопасный путь к выходу:</p>
      <div class="scenario">
        <img src="assets/yard-scene.png" alt="Двор с машинами" class="scenario-img">
        <div class="path-options">
          <button data-path="between-cars">Между машинами</button>
          <button data-path="playground">Через детскую площадку</button>
          <button data-path="arch">Через пешеходный переход</button>
        </div>
      </div>
      <button class="back-btn" onclick="goToPreviousLevel()">Назад</button>
      <button class="menu-btn" onclick="goToMenu()">Меню</button>
    </div>
  `;

  updateScore();

  document.querySelectorAll('.path-options button').forEach(btn => {
    btn.addEventListener('click', function() {
      const path = this.getAttribute('data-path');
      checkPathChoice(path);
    });
  });
}

// 4. Проверка выбора пути (Уровень 2)
function checkPathChoice(path) {
  if (path === 'arch') {
    score++;
    updateScore();
    alert('Правильно! Нужно дойти до пешеходного перехода — это безопасно.');
    setTimeout(() => {
      loadThirdLevel();
    }, 500);
  } else {
    alert('Осторожно! Здесь могут выехать машины. Попробуй другой путь.');
  }
}

// 5. Уровень 3: «Пешеходный переход»
function loadThirdLevel() {
  currentLevel = 3;
  let countdown = 3;

  // Вставляем разметку уровня
  gameContainer.innerHTML = `
    <div class="level level-3">
      <div class="progress">Уровень <span id="currentLevel">3</span> из 7</div>
      <div class="score-board">Звёздочки: <span id="score">${score}</span></div>
      <h2 class="level-title">Уровень 3: Пешеходный переход</h2>
      <p class="level-desc">Перед тобой пешеходный переход. Дождись зелёного сигнала светофора.</p>

      <!-- Блок светофора с подписью -->
      <div class="traffic-light">
        <p class="signal-label">Сигнал светофора</p>
        <div id="light" class="red large-light">Красный</div>
        <img src="assets/crosswalk.png" alt="Пешеходный переход" class="scenario-img">
      </div>

      <button id="goBtn" title="Нажмите, чтобы перейти через дорогу">Идти</button>
      <p id="timer">До зелёного: ${countdown} сек</p>
      <button class="back-btn" onclick="goToPreviousLevel()">Назад</button>
      <button class="menu-btn" onclick="goToMenu()">Меню</button>
    </div>
  `;

  updateScore();

  // Получаем элементы
  const timerElement = document.getElementById('timer');
  const lightElement = document.getElementById('light');
  const goBtn = document.getElementById('goBtn');

  if (!timerElement || !lightElement || !goBtn) {
    console.error('Элементы не найдены!');
    return;
  }

  // Обработчик кнопки «Идти»
  goBtn.addEventListener('click', () => {
    if (lightElement.className.includes('red')) {
      alert('Неправильно! Светофор красный — переходить нельзя!');
    } else if (lightElement.className.includes('green')) {
      score++;
      updateScore();
      alert('Молодец! Ты перешёл дорогу на зелёный сигнал.');
      setTimeout(() => {
        loadFourthLevel();
      }, 500);
    }
  });

  // Таймер
  const updateTimer = () => {
    countdown--;
    timerElement.textContent = `До зелёного: ${countdown} сек`;
    if (countdown <= 0) {
      clearInterval(timerInterval);
      lightElement.textContent = 'Зелёный';
      lightElement.className = 'green large-light'; // Меняем класс
      timerElement.textContent = 'Можно идти!';
    }
  };

  const timerInterval = setInterval(updateTimer, 1000);
}
// 6. Уровень 4: «Остановка» 
function loadFourthLevel() {
  currentLevel = 4;
  let busArrived = false;
  let countdown = 5;
  
  gameContainer.innerHTML = `
    <div class="level level-4">
      <div class="progress">Уровень <span id="currentLevel">4</span> из 7</div>
      <div class="score-board">Звёздочки: <span id="score">${score}</span></div>
      <h2 class="level-title">Уровень 4: Остановка</h2>
      <div class="scenario">
        <div class="stop-area">
          <div class="bus-stop">Остановка</div>
          <div class="road"></div>
          <div class="bus" id="bus">🚌</div>
        </div>
        <div id="timer">До автобуса: ${countdown} сек</div>
        <button id="enterBtn" disabled>Войти</button>
        <div id="feedback"></div>
      </div>
      <button class="back-btn" onclick="goToPreviousLevel()">Назад</button>
      <button class="menu-btn" onclick="goToMenu()">Меню</button>
    </div>
  `;

  updateScore();

  const enterBtn = document.getElementById('enterBtn');
  const timerEl = document.getElementById('timer');
  const feedbackEl = document.getElementById('feedback');
  const busEl = document.getElementById('bus');

  // Таймер прибытия автобуса
  const countdownInterval = setInterval(() => {
    countdown--;
    timerEl.textContent = `До автобуса: ${countdown} сек`;
    if (countdown <= 0) {
      clearInterval(countdownInterval);
      arriveBus();
    }
  }, 1000);

  function arriveBus() {
    busEl.style.right = '20px';
    busArrived = true;
    timerEl.textContent = 'Автобус прибыл!';
    enterBtn.disabled = false;
  }

  // Обработка клика на дорогу
  document.querySelector('.road').addEventListener('click', () => {
    if (!busArrived) {
      feedbackEl.textContent = 'Нельзя выходить на дорогу! Жди автобуса на остановке.';
    }
  });

  // Кнопка входа в автобус
  enterBtn.addEventListener('click', () => {
    if (busArrived) {
      score += 4;
      updateScore();
      feedbackEl.textContent = 'Молодец! Ты сел в автобус безопасно.';
      enterBtn.disabled = true;
      
      // Добавляем задержку перед переходом
      setTimeout(() => {
        loadFifthLevel(); // Переход на следующий уровень
      }, 500);
    } else {
      feedbackEl.textContent = 'Автобус ещё не остановился. Подожди!';
    }
  });
}


// 7. Возврат на предыдущий уровень

function goToPreviousLevel() {
  if (currentLevel === 2) {
    loadFirstLevel();
  } else if (currentLevel === 3) {
    loadNextLevel();
  } else if (currentLevel === 4) {
    loadThirdLevel();
  } else if (currentLevel === 5) {
    loadFourthLevel();
  } else if (currentLevel === 6) {
    loadFifthLevel();
  } else if (currentLevel === 7) {
    loadSixthLevel();
  }
}

// 8. Возврат в главное меню
function goToMenu() {
  currentLevel = 1;
  score = 0;  // Обнуляем счёт
  updateScore();  // Обновляем табло
  gameContainer.innerHTML = `
    <h1>Дорожный лабиринт</h1>
    <button id="startBtn">Начать игру</button>
  `;
  document.getElementById('startBtn').addEventListener('click', startGame);
}

// 9. Обновление табло с очками
function updateScore() {
  document.getElementById('score').
   document.getElementById('score').textContent = score;
}

// 10. Запуск игры (альтернативный вход)
function startGame() {
  loadFirstLevel();
}
function goToMenu() {
  currentLevel = 1;
  score = 0;
  updateScore();
  gameContainer.innerHTML = `
    <div class="game">
      <h1>Дорожный лабиринт</h1>
      <button id="startBtn">Начать игру</button>
    </div>
  `;
  
  // Восстанавливаем обработчик кнопки старта
  document.getElementById('startBtn').addEventListener('click', function() {
    startBtn.style.display = 'none';
    loadFirstLevel();
  });
}
function updateScore() {
  const scoreElement = document.getElementById('score');
  if (!scoreElement) {
    console.error('Элемент #score не найден в DOM!');
    return;
  }
  scoreElement.textContent = score;
}
function loadFifthLevel() {
  currentLevel = 5;
  gameContainer.innerHTML = `
    <div class="level level-5">
      <div class="progress">Уровень <span id="currentLevel">5</span> из 7</div>
      <div class="score-board">Звёздочки: <span id="score">${score}</span></div>
      <h2 class="level-title">Уровень 5: Велосипед</h2>
      <p class="level-desc">Ты едешь на велосипеде к пешеходному переходу. Как правильно поступить?</p>
      <div class="scenario">
        <img src="assets/bike-crossing.png" alt="Переход с велосипедом" class="scenario-img">
        <div class="choice-buttons">
          <button data-choice="walk">Спешиться и перейти пешком</button>
          <button data-choice="ride">Проехать на велосипеде</button>
        </div>
      </div>
      <button class="back-btn" onclick="goToPreviousLevel()">Назад</button>
      <button class="menu-btn" onclick="goToMenu()">Меню</button>
    </div>
  `;

  updateScore();

  document.querySelectorAll('.choice-buttons button').forEach(btn => {
    btn.addEventListener('click', function() {
      const choice = this.getAttribute('data-choice');
      if (choice === 'walk') {
        score += 2;
        updateScore();
        alert('Правильно! При переходе нужно спешиться.');
        setTimeout(() => {
          loadSixthLevel();
        }, 500);
      } else {
        alert('Опасно! На велосипеде через переход ездить нельзя.');
      }
    });
  });
}

// Добавляем функцию для перехода на следующий уровень
function loadSixthLevel() {
  currentLevel = 6;
  gameContainer.innerHTML = `
    <div class="level level-6">
      <div class="progress">Уровень <span id="currentLevel">6</span> из 7</div>
      <div class="score-board">Звёздочки: <span id="score">${score}</span></div>
      <h2 class="level-title">Уровень 6: Угадай знак</h2>
      <p class="level-desc">Соотнеси знак с его названием:</p>
      <div class="signs-grid">
        <div class="sign-card">
          <img src="assets/sign-pedestrian.png" alt="Знак пешеходного перехода" class="sign-img">
          <select class="sign-choice">
            <option value="">Выберите название</option>
            <option value="correct">Пешеходный переход</option>
            <option value="wrong">Остановка автобуса</option>
            <option value="wrong">Движение запрещено</option>
          </select>
        </div>
        <div class="sign-card">
          <img src="assets/sign-bus.png" alt="Знак остановки автобуса" class="sign-img">
          <select class="sign-choice">
            <option value="">Выберите название</option>
            <option value="wrong">Пешеходный переход</option>
            <option value="correct">Остановка автобуса</option>
            <option value="wrong">Движение запрещено</option>
          </select>
        </div>
        <div class="sign-card">
          <img src="assets/sign-no-drive.png" alt="Знак движение запрещено" class="sign-img">
          <select class="sign-choice">
            <option value="">Выберите название</option>
            <option value="wrong">Пешеходный переход</option>
            <option value="wrong">Остановка автобуса</option>
            <option value="correct">Движение запрещено</option>
          </select>
        </div>
      </div>
      <button id="checkBtn">Проверить</button>
      <div id="feedback"></div>
      <button class="back-btn" onclick="goToPreviousLevel()">Назад</button>
      <button class="menu-btn" onclick="goToMenu()">Меню</button>
    </div>
  `;

  updateScore();

  const checkBtn = document.getElementById('checkBtn');
  const feedback = document.getElementById('feedback');
  const signs = document.querySelectorAll('.sign-choice');

  checkBtn.addEventListener('click', () => {
    let correctAnswers = 0;
    let allCorrect = true;

    signs.forEach(select => {
      if (select.value === 'correct') {
        correctAnswers++;
      } else {
        allCorrect = false;
      }
    });

    if (allCorrect) {
      score += 3;
      updateScore();
      feedback.textContent = 'Отлично! Все знаки определены верно.';
      setTimeout(() => {
        loadSeventhLevel();
      }, 500);
    } else {
      feedback.textContent = 'Проверьте свои ответы ещё раз.';
    }
  });
}

function loadSeventhLevel() {
  currentLevel = 7;
  gameContainer.innerHTML = `
    <div class="level level-7">
      <div class="progress">Уровень <span id="currentLevel">7</span> из 7</div>
      <div class="score-board">Звёздочки: <span id="score">${score}</span></div>
      <h2 class="level-title">Уровень 7: Найди светофор</h2>
      <p class="level-desc">Посмотри на картинку и нажми на светофор:</p>
      <div class="simple-scene">
        <img src="assets/simple-scene.png" alt="Простая улица" class="scene-img">
        <div class="traffic-light-spot" id="correctSpot" 
             style="position: absolute; top: 30%; left: 40%;"></div>
      </div>
      <button id="checkBtn">Проверить</button>
      <button class="back-btn" onclick="goToPreviousLevel()">Назад</button>
      <button class="menu-btn" onclick="goToMenu()">Меню</button>
    </div>
  `;

  updateScore();
  
  const checkButton = document.getElementById('checkBtn');
  let isFound = false;


  const correctSpot = document.getElementById('correctSpot');
   
correctSpot.style.top = '24%';   // пример
correctSpot.style.left = '24%';  // пример
correctSpot.style.width = '23px'; // пример
correctSpot.style.height = '43px'; // пример

  // Добавляем возможность точной настройки позиции

  correctSpot.addEventListener('click', function() {
    isFound = true;
    this.style.border = '2px solid green';
  });

  checkButton.addEventListener('click', () => {
    if (isFound) {
      score += 2;
      updateScore();
      alert('Правильно! Ты нашёл светофор.');
      setTimeout(() => {
        showGameOver();
      }, 500);
    } else {
      alert('Попробуй поискать ещё раз.');
    }
  });
}
function showGameOver() {
  gameContainer.innerHTML = `
    <div class="game-over">
      <h2>Поздравляем!</h2>
      <p>Вы прошли все уровни безопасности на дороге!</p>
      <p>Ваш результат: <span id="finalScore">${score}</span> звёзд</p>
      <button onclick="restartGame()">Начать заново</button>
      <button onclick="goToMenu()">В главное меню</button>
    </div>
  `;
}

// Функция перезапуска игры
function restartGame() {
  currentLevel = 1;
  score = 0;
  goToMenu();
}