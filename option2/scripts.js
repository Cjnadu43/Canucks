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
      question: 'Which Canucks player set a team record for most points by a defenseman in a single season?',
      answers: ['Quinn Hughes', 'Alex Edler', 'Mattias Ohlund', 'Chris Tanev', 'Pavel Zacha'],
      correctAnswer: 'Quinn Hughes'
    },
    {
      question: 'What year did Vancouver first reach the Stanley Cup Final?',
      answers: ['1982', '1994', '2011', '2000', '1995'],
      correctAnswer: '1982'
    },
    {
      question: 'Which Canucks goalie recorded the famous ``too many men`` overtime save in the 2011 playoffs?',
      answers: ['Roberto Luongo', 'Ryan Miller', 'Thatcher Demko', 'Kirk McLean', 'Arturs Silovs'],
      correctAnswer: 'Roberto Luongo'
    },
    {
      question: 'What number did Pavel Bure wear for the Canucks?',
      answers: ['10', '20', '11', '9', '7'],
      correctAnswer: '10'
    },
    {
      question: 'Which Canucks player served as captain before the Sedin twins?',
      answers: ['Trevor Linden', 'Mark Messier', 'Stan Smyl', 'Craig MacTavish', 'Joe Nieuwendyk'],
      correctAnswer: 'Trevor Linden'
    },
    {
      question: 'Which Canucks player scored the series-clinching goal in the 1994 Conference Final?',
      answers: ['Pavel Bure', 'Trevor Linden', 'Sergei Shirokov', 'Alexander Mogilny', 'Greg Adams'],
      correctAnswer: 'Trevor Linden'
    },
    {
      question: 'Which Canucks player joined the team in a trade with the Arizona Coyotes in 2021?',
      answers: ['Erik Bränström', 'Mark Stone', 'Bo Horvat', 'Oliver Ekman-Larsson', 'Tyler Toffoli'],
      correctAnswer: 'Oliver Ekman-Larsson'
    },
    {
      question: 'Which Canucks player was nicknamed the ``Russian Rocket``?',
      answers: ['Pavel Bure', 'Alexander Mogilny', 'Igor Larionov', 'Sergei Brylin', 'Andrei Kuzmenko'],
      correctAnswer: 'Pavel Bure'
    },
    {
      question: 'What is the Canucks home arena called?',
      answers: ['Rogers Arena', 'Pacific Coliseum', 'Scotiabank Arena', 'BC Place', 'Maple Leaf Gardens'],
      correctAnswer: 'Rogers Arena'
    },
    {
      question: 'Which player scored 42 goals for Vancouver in 2023/24?',
      answers: ['Brock Boeser', 'J.T. Miller', 'Elias Pettersson', 'Andrei Kuzmenko', 'Conor Garland'],
      correctAnswer: 'Brock Boeser'
    },
    {
      question: 'Which defenseman became the Canucks captain in 2023?',
      answers: ['Quinn Hughes', 'Tyler Myers', 'Alexander Edler', 'Dan Hamhuis', 'Mark Giordano'],
      correctAnswer: 'Quinn Hughes'
    },
    {
      question: 'Which Canucks forward led the team in power-play goals in 2023/24?',
      answers: ['Elias Pettersson', 'Andrei Kuzmenko', 'J.T. Miller', 'Brock Boeser', 'Nils Höglander'],
      correctAnswer: 'Elias Pettersson'
    },
    {
      question: 'Which Canucks player won the Calder Trophy as rookie of the year in 2019?',
      answers: ['Elias Pettersson', 'Quinn Hughes', 'Brock Boeser', 'Jared McCann', 'Olli Juolevi'],
      correctAnswer: 'Elias Pettersson'
    },
    {
      question: 'Which Canucks draft pick became one of the youngest players in the NHL in 2023?',
      answers: ['Nils Höglander', 'Conor Garland', 'Noah Joshi', 'Ty Muller', 'Elias Pettersson'],
      correctAnswer: 'Ty Muller'
    },
    {
      question: 'Which former Canucks defenseman was known for his point shot and later played for the Seattle Kraken?',
      answers: ['Oliver Ekman-Larsson', 'Alex Edler', 'Chris Tanev', 'Tyler Myers', 'Jason Strudwick'],
      correctAnswer: 'Oliver Ekman-Larsson'
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

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function renderQuestion() {
    const item = quizData[currentQuestion];
    const answers = shuffleArray([...item.answers]);
    item.shuffledAnswers = answers;
    questionEl.textContent = `Question ${currentQuestion + 1} of ${quizData.length}: ${item.question}`;
    answerButtons.forEach((button, index) => {
      button.textContent = answers[index];
      button.disabled = false;
      button.hidden = false;
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
      const currentItem = quizData[currentQuestion];
      const selectedAnswer = button.textContent;
      const correct = selectedAnswer === currentItem.correctAnswer;
      if (correct) {
        score += 1;
        button.classList.add('correct');
        resultEl.textContent = 'Correct!';
      } else {
        button.classList.add('wrong');
        resultEl.textContent = `Wrong. The correct answer is ${currentItem.correctAnswer}.`;
        const correctIndex = currentItem.shuffledAnswers.indexOf(currentItem.correctAnswer);
        if (correctIndex >= 0) {
          answerButtons[correctIndex].classList.add('correct');
        }
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
    shuffleArray(quizData);
    restartBtn.hidden = true;
    answerButtons.forEach(btn => btn.hidden = false);
    renderQuestion();
  });

  shuffleArray(quizData);
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
