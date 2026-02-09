// Main Logic for PYQ Library Question Display

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const searchForm = document.querySelector('.pyq-search');
  const questionBox = document.querySelector('.question-box');
  const questionText = questionBox ? questionBox.querySelector('p') : null;
  const optionsContainer = document.querySelector('.options');
  const showSolutionBtn = document.getElementById('showSolutionBtn');
  const solutionContainer = document.getElementById('solution');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  // State
  let currentQuestions = [];
  let currentIndex = 0;

  // Helper to get form values
  function getSearchCriteria() {
    if (!searchForm) return null;

    const examInput = searchForm.querySelector('input[placeholder="Exam Name"]');
    const yearSelect = document.getElementById('year-select');
    const subjectSelect = document.getElementById('subject-select');
    const chapterSelect = document.getElementById('chapter-select');

    return {
      exam: examInput ? examInput.value.trim().toUpperCase() : '',
      year: yearSelect ? yearSelect.value : '',
      subject: subjectSelect ? subjectSelect.value : '',
      chapter: chapterSelect ? chapterSelect.value : ''
    };
  }

  // Fetch questions from Server
  async function fetchQuestions(criteria) {
    // Construct query parameters
    // Note: adjust base URL if necessary, but relative path works if served from same origin
    const params = new URLSearchParams();
    if (criteria.exam) params.append('exam', criteria.exam);
    if (criteria.year) params.append('year', criteria.year);
    if (criteria.subject) params.append('subject', criteria.subject);
    if (criteria.chapter) params.append('chapter', criteria.chapter);

    try {
      const response = await fetch(`/api/questions?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching questions:", error);
      // Fallback for demo if server isn't running properly or network error
      return [];
    }
  }

  // Render the current question
  function renderQuestion() {
    if (currentQuestions.length === 0) {
      if (questionText) questionText.textContent = "No questions found for the selected criteria. Try different options.";
      if (optionsContainer) optionsContainer.innerHTML = "";
      if (solutionContainer) {
        solutionContainer.style.display = 'none';
        if (solutionContainer.querySelector('p')) solutionContainer.querySelector('p').textContent = "";
      }
      if (showSolutionBtn) showSolutionBtn.style.display = 'none';
      return;
    }

    const q = currentQuestions[currentIndex];

    // Update Question
    if (questionText) {
      questionText.innerHTML = `Q${currentIndex + 1}: ${q.question}`;
    }

    // Update Options
    if (optionsContainer) {
      optionsContainer.innerHTML = ''; // Clear previous
      q.options.forEach((optText, idx) => {
        const labels = ['A', 'B', 'C', 'D'];
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';

        const labelDiv = document.createElement('div');
        labelDiv.className = 'option-label';
        labelDiv.textContent = labels[idx] || (idx + 1);

        const textDiv = document.createElement('div');
        textDiv.className = 'option-text';
        textDiv.innerHTML = optText;

        optionDiv.appendChild(labelDiv);
        optionDiv.appendChild(textDiv);
        optionsContainer.appendChild(optionDiv);
      });
    }

    // Reset Solution
    if (solutionContainer) {
      const solP = solutionContainer.querySelector('p');
      if (solP) {
        const correctLabel = ['A', 'B', 'C', 'D'][q.correctOptionIndex];
        solP.innerHTML = correctLabel ? `Correct Option: ${correctLabel}` : "Answer not available.";
      }
      solutionContainer.style.display = 'none';
    }
    if (showSolutionBtn) {
      showSolutionBtn.style.display = 'block';
      showSolutionBtn.textContent = 'Show Answer';
    }

    // Render LaTeX using KaTeX (if available)
    if (window.renderMathInElement) {
      renderMathInElement(document.body, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
          { left: "\\(", right: "\\)", display: false },
          { left: "\\[", right: "\\]", display: true }
        ],
        throwOnError: false
      });
    }
  }

  // Handle Search Submit
  if (searchForm) {
    searchForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const criteria = getSearchCriteria();

      // Show loading state
      if (questionText) questionText.textContent = "Loading questions...";

      currentQuestions = await fetchQuestions(criteria);
      currentIndex = 0;
      renderQuestion();
    });
  }

  // Handle Navigation
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentQuestions.length === 0) return;
      if (currentIndex > 0) {
        currentIndex--;
        renderQuestion();
      } else {
        // Optional: Loop to end
        // currentIndex = currentQuestions.length - 1;
        // renderQuestion();
        alert("This is the first question.");
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentQuestions.length === 0) return;
      if (currentIndex < currentQuestions.length - 1) {
        currentIndex++;
        renderQuestion();
      } else {
        // Optional: Button disabled state
        alert("This is the last question.");
      }
    });
  }

  // Handle Solution Toggle
  if (showSolutionBtn && solutionContainer) {
    showSolutionBtn.addEventListener('click', () => {
      if (solutionContainer.style.display === 'none' || solutionContainer.style.display === '') {
        solutionContainer.style.display = 'block';
        showSolutionBtn.textContent = 'Hide Answer';
      } else {
        solutionContainer.style.display = 'none';
        showSolutionBtn.textContent = 'Show Answer';
      }
    });
  }
});