const startBtn = document.getElementById('startBtn');
const gameContainer = document.querySelector('.game');

startBtn.addEventListener('click', function() {
  startBtn.style.display = 'none';
  gameContainer.innerHTML = `
    <div class="level level-1">
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

  // Добавляем обработчики кликов для карточек
  document.querySelectorAll('.item-card').forEach(card => {
    card.addEventListener('click', () => {
      const choice = card.getAttribute('data-choice');
      checkAnswer(choice, card);
    });
  });
});

function checkAnswer(choice, card) {
  if (choice === 'reflector') {
    // Правильный ответ
    card.style.borderColor = 'var(--primary)';
    card.style.transform = 'scale(1.05)';
    setTimeout(() => {
      alert('Молодец! Светоотражатель поможет тебе быть заметным на дороге!');
      loadNextLevel();
    }, 500);
  } else {
    // Неправильный ответ
    card.style.borderColor = 'var(--danger)';
    card.style.transform = 'scale(0.95)';
    setTimeout(() => {
      alert('Это не лучший выбор. Подумай ещё!');
      card.style.borderColor = 'var(--accent)';
      card.style.transform = 'scale(1)';
    }, 1000);
  }
}

function loadNextLevel() {
  gameContainer.innerHTML = `
    <div class="level">
      <h2 class="level-title">Уровень 2: Двор</h2>
      <p>Скоро здесь появится следующий этап!</p>
    </div>
  `;
}
