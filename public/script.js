document.addEventListener('DOMContentLoaded', () => {
    // Select elements
    const searchOpenBtn = document.getElementById('searchOpenBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchCloseBtn = document.getElementById('searchCloseBtn');
    const overlaySearchInput = document.getElementById('overlaySearchInput');
    const searchResults = document.getElementById('searchResults');
    const searchMessage = document.getElementById('searchMessage');
    const viewAllExamsBtn = document.getElementById('viewAllExamsBtn');

    // Global Exams Data (Fallback for sub-pages where cards aren't present)
    const GLOBAL_EXAMS = [
        {
            title: "UPSC CDS",
            sub: "Combined Defence Services",
            logoClass: "cds",
            logoImg: "https://th.bing.com/th/id/OIP.sNARp6nIhfw0VenjFR1J6gHaHb?w=179&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
            path: "exams/cds/main.html"
        },
        {
            title: "UPSC NDA",
            sub: "National Defence Academy",
            logoClass: "nda",
            logoImg: "https://i.pinimg.com/736x/4d/c8/9a/4dc89acdb8e985eaebe234f3b4b37ace.jpg",
            path: "exams/nda/main.html"
        },
        {
            title: "INDIAN ARMY",
            sub: "Indian Army GD",
            logoClass: "indianarmygd",
            logoImg: "https://th.bing.com/th/id/OIP.Cs-N47lWvOrZaptnN9LkVQHaHa?w=159&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
            path: "exams/indianarmygd/main.html"
        },
        {
            title: "PUNJAB POLICE",
            sub: "Punjab Police Constable Exam",
            logoClass: "pp",
            logoImg: "https://th.bing.com/th/id/OIP.1NHx7nrMtlSU-YIAJhLVqgHaHa?w=172&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
            path: "exams/punjabpolice/main.html"
        },
        {
            title: "SSC CPO",
            sub: "SSC CPO Exam",
            logoClass: "cpo",
            logoImg: "https://th.bing.com/th/id/OIP.F0k9_o35AG7eQFH5-Sj97wHaEK?w=301&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
            path: "#"
        },
        {
            title: "SSC GD",
            sub: "SSC Ground Duty",
            logoClass: "sscgd",
            logoImg: "https://th.bing.com/th/id/OIP.F0k9_o35AG7eQFH5-Sj97wHaEK?w=301&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
            path: "#"
        },
        {
            title: "AIRFORCE AGNIVEER VAYU",
            sub: "Airforce Agniveer Vayu Exam",
            logoClass: "vayu",
            logoImg: "https://th.bing.com/th/id/OIP._oZCMrBeVgX1SO3Z9mcUAQAAAA?w=164&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
            path: "#"
        },
        {
            title: "JEE MAINS",
            sub: "JEE MAINS Exam",
            logoClass: "jeem",
            logoImg: "https://th.bing.com/th/id/OIP.EFG92UFBjOSrcn8UYJcvZgHaEK?w=283&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
            path: "exams/jeemains/main.html"
        },
        {
            title: "JEE ADVANCED",
            sub: "JEE ADVANCED Exam",
            logoClass: "jeea",
            logoImg: "https://th.bing.com/th/id/OIP.a-NIwHrXqyHvs4uYnqBzCgHaHa?w=163&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
            path: "exams/jeeadvance/main.html"
        },
        {
            title: "NEET UG",
            sub: "NEET Under Graduate Exam",
            logoClass: "neetug",
            logoImg: "https://th.bing.com/th/id/OIP.vrzKQ7qvFM9zWLfOADJUjwHaHa?w=173&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
            path: "exams/neetug/main.html"
        }
    ];

    // Store exam cards data
    let examCardsData = [];

    // Function to collect exam cards from the page OR use global fallback
    function collectExamCards() {
        const cards = document.querySelectorAll('.section .exam-card');

        if (cards.length > 0) {
            // we are on Home page
            examCardsData = Array.from(cards).map(card => {
                return {
                    html: card.innerHTML,
                    title: card.querySelector('.exam-title').innerText.toLowerCase(),
                    sub: card.querySelector('.exam-sub').innerText.toLowerCase()
                };
            });
        } else {
            // We are on a sub-page (e.g., exams/cds/main.html)
            const isSubPage = window.location.href.includes('/exams/');
            const pathPrefix = isSubPage ? '../../' : '';

            examCardsData = GLOBAL_EXAMS.map(exam => {
                const pyqPath = (exam.path === '#') ? '#' : pathPrefix + exam.path;
                return {
                    title: exam.title.toLowerCase(),
                    sub: exam.sub.toLowerCase(),
                    html: `
                        <div class="exam-logo ${exam.logoClass}"><img src="${exam.logoImg}" alt="${exam.title}"></div>
                        <div class="exam-title">${exam.title}</div>
                        <div class="exam-sub">${exam.sub}</div>
                        <div class="exam-links">
                            <a href="#" class="notes">Notes</a>
                            <a href="${pyqPath}" class="mocks">PYQs</a>
                            <a href="#" class="pyqs">Daily Problems</a>
                            <a href="#" class="syllabus">Mocks</a>
                        </div>
                        <a href="${pyqPath}" class="view-btn">Explore</a>
                    `
                };
            });
        }
    }

    // Initial collection
    collectExamCards();

    // Function to Open Overlay
    function openOverlay() {
        searchOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        setTimeout(() => overlaySearchInput.focus(), 100);
    }

    // Trigger on Search Icon
    if (searchOpenBtn) {
        searchOpenBtn.addEventListener('click', openOverlay);
    }

    // Trigger on View All Button
    if (viewAllExamsBtn) {
        viewAllExamsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openOverlay();
        });
    }

    // Close Overlay
    function closeOverlay() {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        overlaySearchInput.value = '';
        renderResults([]); // Clear results
        searchMessage.style.display = 'block';
        searchMessage.innerText = 'Start typing to search exams';
    }

    searchCloseBtn.addEventListener('click', closeOverlay);

    // Close on Background Click
    searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) {
            closeOverlay();
        }
    });

    // Close on Escape Key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            closeOverlay();
        }
    });

    // Search Logic
    overlaySearchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        if (query === '') {
            renderResults([]);
            searchMessage.style.display = 'block';
            searchMessage.innerText = 'Start typing to search exams';
            return;
        }

        const filtered = examCardsData.filter(card =>
            card.title.includes(query) || card.sub.includes(query)
        );

        if (filtered.length > 0) {
            renderResults(filtered);
            searchMessage.style.display = 'none';
        } else {
            renderResults([]);
            searchMessage.style.display = 'block';
            searchMessage.innerText = 'No results found';
        }
    });

    // Render results function
    function renderResults(data) {
        searchResults.innerHTML = '';
        data.forEach(item => {
            const cardElement = document.createElement('div');
            cardElement.className = 'exam-card';
            cardElement.innerHTML = item.html;
            searchResults.appendChild(cardElement);
        });
    }
});
