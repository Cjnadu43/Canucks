// Small helper scripts: hamburger (if added), quiz, and Chart init
document.addEventListener('DOMContentLoaded', function () {
  // Hamburger toggle
  const navToggle = document.querySelector('.nav-toggle');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const nav = navToggle.closest('nav');
      if (!nav) return;
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('nav-open');
    });
  }
  // Expand card details on player cards
  document.querySelectorAll('.card .expand').forEach(btn => {
    btn.addEventListener('click', () => {
      const more = btn.nextElementSibling;
      if (!more) return;
      more.hidden = !more.hidden;
      btn.textContent = more.hidden ? 'Career Highlights' : 'Hide';
    });
  });

  // Quiz data and interaction
  const quizData = [
    {
      question: 'Who scored 41 goals for the Canucks in 2023/24?',
      answers: ['Elias Pettersson', 'Brock Boeser', 'J.T. Miller'],
      correctIndex: 0
    },
    {
      question: 'Which Canucks defenceman led the team in points in 2023/24?',
      answers: ['Quinn Hughes', 'Thatcher Demko', 'Elias Pettersson'],
      correctIndex: 0
    },
    {
      question: 'Where do the Canucks play their home games?',
      answers: ['Rogers Arena', 'Scotiabank Arena', 'Bell Centre'],
      correctIndex: 0
    },
    {
      question: 'Which player joined the Canucks as a free agent in 2023?',
      answers: ['Andrei Kuzmenko', 'Bo Horvat', 'Oliver Ekman-Larsson'],
      correctIndex: 0
    },
    {
      question: 'Who is the Canucks head coach as of the 2025 season?',
      answers: ['Rick Tocchet', 'Bruce Boudreau', 'Wayne Gretzky'],
      correctIndex: 0
    }
  ];

  const questionEl = document.getElementById('question');
  const answerButtons = Array.from(document.querySelectorAll('.quiz-btn'));
  const resultEl = document.getElementById('quiz-result');
  const nextBtn = document.getElementById('next-btn');
  const restartBtn = document.getElementById('restart-btn');
  const scoreEl = document.getElementById('quiz-score');

  let currentQuestion = 0;
  let score = 0;
  let answered = false;

  function renderQuestion() {
    const item = quizData[currentQuestion];
    questionEl.textContent = `Question ${currentQuestion + 1} of ${quizData.length}: ${item.question}`;
    answerButtons.forEach((button, index) => {
      button.textContent = item.answers[index];
      button.disabled = false;
      button.classList.remove('correct', 'wrong');
    });
    resultEl.textContent = '';
    nextBtn.hidden = true;
    scoreEl.textContent = `Score: ${score} / ${quizData.length}`;
    answered = false;
  }

  function showFinalScore() {
    questionEl.textContent = 'Quiz complete!';
    resultEl.textContent = `You scored ${score} out of ${quizData.length}.`;
    nextBtn.hidden = true;
    restartBtn.hidden = false;
    answerButtons.forEach(button => {
      button.hidden = true;
    });
    scoreEl.textContent = '';
  }

  answerButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (answered) return;
      const selectedIndex = Number(button.dataset.index);
      const currentItem = quizData[currentQuestion];
      const correct = selectedIndex === currentItem.correctIndex;
      if (correct) {
        score += 1;
        button.classList.add('correct');
        resultEl.textContent = 'Correct!';
      } else {
        button.classList.add('wrong');
        resultEl.textContent = `Wrong. The correct answer is ${currentItem.answers[currentItem.correctIndex]}.`;
        answerButtons[currentItem.correctIndex].classList.add('correct');
      }
      answerButtons.forEach(btn => btn.disabled = true);
      answered = true;
      nextBtn.hidden = false;
      nextBtn.textContent = currentQuestion < quizData.length - 1 ? 'Next Question' : 'See Results';
      scoreEl.textContent = `Score: ${score} / ${quizData.length}`;
    });
  });

  nextBtn.addEventListener('click', () => {
    currentQuestion += 1;
    if (currentQuestion < quizData.length) {
      answerButtons.forEach(btn => btn.hidden = false);
      renderQuestion();
    } else {
      showFinalScore();
    }
  });

  restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    restartBtn.hidden = true;
    answerButtons.forEach(btn => btn.hidden = false);
    renderQuestion();
  });

  renderQuestion();

  // Chart.js sample init (if canvas present and Chart is loaded)
  const canvas = document.getElementById('goalsChart');
  if (canvas && window.Chart) {
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Pettersson','Hughes','Miller','Boeser','Kuzmenko'],
        datasets: [{
          label: 'Goals (sample)',
          data: [41,16,31,42,36],
          backgroundColor: 'rgba(201,16,46,0.8)'
        }]
      },
      options: { responsive: true }
    });
  }
});
