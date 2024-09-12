$(document).ready(function () {
  let questions = [
    {
      question: "Was ist 7 + 5?",
      choices: ["10", "11", "12", "13"],
      correct: 2,
      image: "Mathe.png",
    },
    {
      question: "Welches Tier kann fliegen?",
      choices: ["Elefant", "Katze", "Vogel", "Schildkröte"],
      correct: 2,
      image: "Mathe.png",
    },
    {
      question: "Wie heißt die Hauptstadt von Deutschland?",
      choices: ["München", "Hamburg", "Berlin", "Frankfurt"],
      correct: 2,
      image: "Mathe.png",
    },
    {
      question: "Aus welchem Stoff besteht ein Regenbogen?",
      choices: ["Farben", "Wasser und Licht", "Luft", "Wolken"],
      correct: 1,
      image: "Mathe.png",
    },
    {
      question: "Wie viele Buchstaben hat das Wort 'Elefant'?",
      choices: ["6", "7", "8", "9"],
      correct: 2,
      image: "Mathe.png",
    },
    {
      question: "Wer war Albert Einstein?",
      choices: ["Ein Musiker", "Ein Wissenschaftler", "Ein Schauspieler", "Ein König"],
      correct: 1,
      image: "Mathe.png",
    },
    {
      question: "Welche Jahreszeit kommt nach dem Sommer?",
      choices: ["Frühling", "Winter", "Herbst", "Sommer"],
      correct: 2,
      image: "Mathe.png",
    },
    {
      question: "In welchem Sport verwendet man einen Ball?",
      choices: ["Schwimmen", "Tennis", "Radfahren", "Turnen"],
      correct: 1,
      image: "Mathe.png",
    },
    {
      question: "Wer hat das Haus der drei kleinen Schweinchen umgepustet?",
      choices: ["Der Fuchs", "Der Wolf", "Der Bär", "Die Eule"],
      correct: 1,
      image: "Mathe.png",
    },
    {
      question: "Was benutzt man, um im Internet zu surfen?",
      choices: ["Einen Bleistift", "Ein Auto", "Einen Computer", "Ein Telefonbuch"],
      correct: 2,
      image: "Mathe.png",
    },

    //
    {
      question: "Wie viele Kontinente gibt es auf der Erde?",
      choices: ["5", "6", "7", "8"],
      correct: 3,
      image: "Mathe.png",
    },
    {
      question: "Wie nennt man den Ort, an dem man Bücher ausleiht?",
      choices: ["Schule", "Bibliothek", "Krankenhaus", "Museum"],
      correct: 2,
      image: "Mathe.png",
    },
    {
      question: "Welche Farbe entsteht, wenn man Rot und Blau mischt?",
      choices: ["Grün", "Lila", "Gelb", "Braun"],
      correct: 2,
      image: "Mathe.png",
    },
    {
      question: "Wie viele Tage hat eine Woche?",
      choices: ["5", "7", "10", "12"],
      correct: 2,
      image: "Mathe.png",
    },
    {
      question: "Welches Obst ist gelb und krumm?",
      choices: ["Apfel", "Banane", "Erdbeere", "Kirsche"],
      correct: 2,
      image: "Mathe.png",
    },
  ];

  let currentQuestion = 0;
  let score = 0;

  $("#start-game").click(function () {
    let playerName = $("#player-name").val();
    if (playerName === "") {
      alert("Bitte gib deinen Namen ein!");
    } else {
      $("#main-menu-container").hide();
      $("#spielfeld").show();
      loadQuestion();
    }
  });

  function loadQuestion() {
    if (currentQuestion < questions.length) {
      $("#question").empty();
      $("#choices").empty();

      $("#question").text(questions[currentQuestion].question);

      if (questions[currentQuestion].image) {
        let imageHtml = `<img src="${questions[currentQuestion].image}" alt="Fragen Bild" class="question-image">`;
        $("#question").append(imageHtml);
      }

      questions[currentQuestion].choices.forEach((choice, index) => {
        $("#choices").append(`<div class="choice" data-index="${index}">${choice}</div>`);
      });

      $(".choice").click(function () {
        var audio = document.getElementById("audio");
        audio.play();
        let selectedChoice = $(this).data("index");
        if (selectedChoice === questions[currentQuestion].correct) {
          score += 10;
          document.body.classList.add("flash-green");
          setTimeout(() => {
            document.body.classList.remove("flash-green");
          }, 1000);
        } else {
          document.body.classList.add("flash-red");
          setTimeout(() => {
            document.body.classList.remove("flash-red");
          }, 1000);
        }
        currentQuestion++;
        if (currentQuestion < questions.length) {
          loadQuestion();
        } else {
          showResult();
        }
      });
    }
  }

  function showResult() {
    $("#spielfeld").hide();
    $("#result").show();
    $("#score").text(`Deine Punktzahl: ${score} von ${questions.length * 10}`);
    updateScoreTable(); // Tabelle aktualisieren
  }

  function updateScoreTable() {
    // Tabelle nur einmal hinzufügen, wenn sie noch nicht existiert
    if ($("#score-table").length === 0) {
      $("#scoreboard").append(`
                <table id="score-table">
                    <thead>
                        <tr>
                            <th>Spieler</th>
                            <th>Punktzahl</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Du</td>
                            <td>${score}</td>
                        </tr>
                    </tbody>
                </table>
            `);
    } else {
      // Tabelle aktualisieren, wenn sie bereits existiert
      $("#score-table tbody").append(`
                <tr>
                    <td>Du</td>
                    <td>${score}</td>
                </tr>
            `);
    }
  }

  $("#back-to-menu").click(function () {
    $("#result").hide();
    $("#main-menu-container").show();
    resetGame();
  });

  function resetGame() {
    currentQuestion = 0;
    score = 0;
    $("#score-table").remove(); // Tabelle zurücksetzen
  }

  $("#spielfeld").hide();
  $("#result").hide();
});
