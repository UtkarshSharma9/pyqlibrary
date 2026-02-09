// Exam-specific search form logic
// This script handles pre-filling and locking the exam name in the search form

(function () {
    'use strict';

    /**
     * Get the current exam name from the page
     * This extracts the exam name from the welcome heading
     */
    function getCurrentExamName() {
        const welcomeHeading = document.querySelector('.welcome-div h2');
        if (welcomeHeading) {
            // Extract exam name from text like "AFCAT Previous Year Questions" or "JEE Mains Previous Year Questions"
            const text = welcomeHeading.textContent.trim();
            // Match everything before "Previous Year Questions"
            const match = text.match(/^(.+?)\s+Previous Year Questions/i);
            return match ? match[1].toUpperCase() : null;
        }
        return null;
    }

    /**
     * Set the exam name in localStorage
     */
    function setExamContext(examName) {
        if (examName) {
            localStorage.setItem('currentExam', examName);
        }
    }

    /**
     * Get the exam name from localStorage
     */
    function getExamContext() {
        return localStorage.getItem('currentExam');
    }

    /**
     * Initialize the search form with exam-specific behavior
     */
    function initializeSearchForm() {
        const searchForm = document.querySelector('.pyq-search');
        if (!searchForm) return;

        const examInput = searchForm.querySelector('input[placeholder="Exam Name"]');
        if (!examInput) return;

        // Get current exam name from the page
        const currentExam = getCurrentExamName();

        // Store it in localStorage
        if (currentExam) {
            setExamContext(currentExam);
        }

        // Get the stored exam name (could be from this page or previous navigation)
        const storedExam = getExamContext();

        if (storedExam) {
            // Pre-fill the exam name
            examInput.value = storedExam;

            // Make it readonly and add visual indication
            examInput.readOnly = true;
            examInput.style.backgroundColor = '#f0f0f0';
            examInput.style.cursor = 'not-allowed';
            examInput.style.color = '#666';

            // Add a title attribute for user feedback
            examInput.title = `Locked to ${storedExam}. Navigate to another exam to change.`;
        }
    }

    /**
     * Handle navigation to different exams
     * This clears the context when user clicks on a different exam link
     */
    function setupExamNavigation() {
        // Get all exam navigation links
        const examLinks = document.querySelectorAll('.submenu a[href*="main.html"]');

        examLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                // Extract exam name from the link text
                const examName = this.textContent.trim().toUpperCase();

                // Update the exam context
                setExamContext(examName);
            });
        });
    }

    /**
     * Chapter options organized by Exam and Subject
     * Structure: Exam Name -> Subject -> List of Chapters
     */
    const chaptersData = {
        'AFCAT': {
            'mathematics': ['Number System', 'Simplification', 'HCF & LCM', 'Decimal & Fractions', 'Percentage', 'Ratio & Proportion', 'Average', 'Profit & Loss', 'Simple Interest', 'Time & Work', 'Time, Speed & Distance', 'Mixtures & Allegations', 'Algebraic Identities & Linear Equations', 'Quadratic Equations', 'Triangles', 'Circles', 'Polygons', 'Measurement', 'Trigonometric Ratios & Identities', 'Heights & Distances', 'Data Interpretation', 'Miscellaneous'],
            'physics': ['Motion', 'Laws of Motion', 'Work, Energy & Power', 'Gravitation', 'Heat & Thermodynamics', 'Wave Motion & Sound', 'Light (Reflection & Refraction)', 'Electricity', 'Magnetism', 'Electromagnetic Induction', 'Modern Physics', 'Semiconductors', 'Miscellaneous'],
            'chemistry': ['Atomic Structure', 'Chemical Bonding', 'Periodic Table', 'Acids, Bases & Salts', 'Chemical Reactions', 'Metals and Non-metals', 'Organic Chemistry Basics', 'Miscellaneous'],
            'biology': ['Human Body Systems', 'Nutrition', 'Diseases & Immunity', 'Plant Biology Basics', 'Genetics', 'Environment & Ecology', 'Miscellaneous'],
            'general-studies': ['Indian History', 'Indian Geography', 'Indian Polity', 'Indian Economy', 'Current Affairs', 'Sports & Awards'],
            'english': ['Grammar Basics', 'Vocabulary', 'Sentence Improvement', 'Error Spotting', 'Reading Comprehension', 'Idioms & Phrases', 'One Word Substitution', 'Miscellaneous'],
            'reasoning': ['Verbal Reasoning', 'Non-Verbal Reasoning', 'Coding-Decoding', 'Blood Relations', 'Series & Sequences', 'Direction Sense', 'Syllogism', 'Analogy', 'Classification', 'Puzzle & Seating Arrangement', 'Miscellaneous']
        },
        'CDS': {
            'mathematics': ['Number System', 'Simplification', 'HCF & LCM', 'Ratio & Proportion', 'Percentage', 'Average', 'Profit & Loss', 'Simple & Compound Interest', 'Time & Work', 'Time, Speed & Distance', 'Algebra', 'Geometry', 'Mensuration', 'Trigonometry', 'Statistics'],
            'english': ['Grammar Basics', 'Vocabulary', 'Sentence Improvement', 'Error Spotting', 'Reading Comprehension', 'Idioms & Phrases', 'One Word Substitution', 'Miscellaneous'],
            'general-studies': ['Indian History', 'Indian Geography', 'Indian Polity', 'Indian Economy', 'Current Affairs', 'Sports & Awards'],
            'physics': ['Motion', 'Laws of Motion', 'Work, Energy & Power', 'Gravitation', 'Heat & Thermodynamics', 'Wave Motion & Sound', 'Light (Reflection & Refraction)', 'Electricity', 'Magnetism', 'Electromagnetic Induction', 'Modern Physics', 'Semiconductors', 'Miscellaneous'],
            'chemistry': ['Atomic Structure', 'Chemical Bonding', 'Periodic Table', 'Acids, Bases & Salts', 'Chemical Reactions', 'Metals and Non-metals', 'Organic Chemistry Basics', 'Miscellaneous'],
            'biology': ['Human Body Systems', 'Nutrition', 'Diseases & Immunity', 'Plant Biology Basics', 'Genetics', 'Environment & Ecology', 'Miscellaneous']
        },
        'NDA': {
            'mathematics': ['Set Theory', 'Complex Numbers', 'Quadratic Equations', 'Linear Inequalities', 'Binomial Theorem', 'Permutations & Combinations', 'Sequence and Series', 'Matrices', 'Determinants', 'Trigonometry', 'Properties of Triangles', 'Straight Lines', 'Conic Sections', 'Circle', 'Coordinate Geometry', 'Differential Calculus', 'Integral Calculus', 'Vector Algebra', 'Statistics', 'Probability', 'Miscellaneous'],
            'english': ['Grammar Basics', 'Vocabulary', 'Sentence Improvement', 'Error Spotting', 'Idioms & Phrases', 'Jumbled Sentences', 'One Word Substitution', 'Synonyms', 'Antonyms', 'Miscellaneous'],
            'general-studies': ['History', 'Geography', 'Indian Polity', 'Indian Economy', 'Current Affairs', 'Sports & Awards', 'Books and Authors'],
            'physics': ['Physical Quantities & Units', 'Motion', 'Laws of Motion', 'Work, Energy & Power', 'Gravitation', 'Heat & Thermodynamics', 'Wave Motion & Sound', 'Light Optics', 'Electricity', 'Magnetism', 'Electromagnetic Induction', 'Nucleus and Radioactivity', 'Modern Physics', 'Semiconductors'],
            'chemistry': ['Physical and Chemical Changes', 'Atomic Structure', 'Chemical Bonding', 'States of Matter', 'Periodic Table', 'Acids, Bases & Salts', 'Chemical Reactions', 'Thermodynamics', 'Electrochemistry', 'Metals and Non-metals', 'Hydrogen and its Compounds', 'Organic Chemistry Basics', 'Hydrocarbons', 'Environmental Chemistry'],
            'biology': ['Human Body Systems', 'Nutrition', 'Diseases & Immunity', 'Plant Biology Basics', 'Diversity in Living World', 'Cell Structure & Functions', 'Environment & Ecology', 'Microorganisms']
        },
        'JEE MAINS': {
            'physics': ['Physical world and Measurement', 'Kinematics', 'Laws of Motion', 'Work, Energy and Power', 'Motion of System of Particles and Rigid Body', 'Gravitation', 'Properties of Bulk Matter', 'Thermodynamics', 'Behaviour of Perfect Gas and Kinetic Theory', 'Oscillations and Waves', 'Electrostatics', 'Current Electricity', 'Magnetic Effects of Current and Magnetism', 'Electromagnetic Induction and Alternating Currents', 'Electromagnetic Waves', 'Optics', 'Dual Nature of Matter and Radiation', 'Atoms and Nuclei', 'Electronic Devices'],
            'chemistry': ['Some Basic Concepts of Chemistry', 'Structure of Atom', 'Classification of Elements and Periodicity', 'Chemical Bonding and Molecular Structure', 'States of Matter: Gases and Liquids', 'Thermodynamics', 'Equilibrium', 'Redox Reactions', 'Hydrogen', 'The s-Block Element', 'The p-Block Element (Groups 13 & 14)', 'Organic Chemistry - Basic Principles', 'Hydrocarbons', 'Environmental Chemistry', 'Solid State', 'Solutions', 'Electrochemistry', 'Chemical Kinetics', 'Surface Chemistry', 'The p-Block Elements (Groups 15, 16, 17, 18)', 'The d-Block and f-Block Elements', 'Coordination Compounds', 'Organic Chemistry - Carbon Compounds'],
            'mathematics': ['Sets, Relations and Functions', 'Complex Numbers and Quadratic Equations', 'Matrices and Determinants', 'Permutations and Combinations', 'Mathematical Induction', 'Binomial Theorem and Its Applications', 'Sequences and Series', 'Limits, Continuity and Differentiability', 'Integration', 'Differential Equations', 'Co-ordinate Geometry', 'Vector Algebra', 'Three Dimensional Geometry', 'Probability and Statistics', 'Trigonometry']
        },
        'JEE ADVANCED': {
            // Same structure as JEE MAINS
            'physics': ['Physical world and Measurement', 'Kinematics', 'Laws of Motion', 'Work, Energy and Power', 'Motion of System of Particles and Rigid Body', 'Gravitation', 'Properties of Bulk Matter', 'Thermodynamics', 'Behaviour of Perfect Gas and Kinetic Theory', 'Oscillations and Waves', 'Electrostatics', 'Current Electricity', 'Magnetic Effects of Current and Magnetism', 'Electromagnetic Induction and Alternating Currents', 'Electromagnetic Waves', 'Optics', 'Dual Nature of Matter and Radiation', 'Atoms and Nuclei', 'Electronic Devices'],
            'chemistry': ['Some Basic Concepts of Chemistry', 'Structure of Atom', 'Classification of Elements and Periodicity', 'Chemical Bonding and Molecular Structure', 'States of Matter: Gases and Liquids', 'Thermodynamics', 'Equilibrium', 'Redox Reactions', 'Hydrogen', 'The s-Block Element', 'The p-Block Element (Groups 13 & 14)', 'Organic Chemistry - Basic Principles', 'Hydrocarbons', 'Environmental Chemistry', 'Solid State', 'Solutions', 'Electrochemistry', 'Chemical Kinetics', 'Surface Chemistry', 'The p-Block Elements (Groups 15, 16, 17, 18)', 'The d-Block and f-Block Elements', 'Coordination Compounds', 'Organic Chemistry - Carbon Compounds'],
            'mathematics': ['Sets, Relations and Functions', 'Complex Numbers and Quadratic Equations', 'Matrices and Determinants', 'Permutations and Combinations', 'Mathematical Induction', 'Binomial Theorem and Its Applications', 'Sequences and Series', 'Limits, Continuity and Differentiability', 'Integration', 'Differential Equations', 'Co-ordinate Geometry', 'Vector Algebra', 'Three Dimensional Geometry', 'Probability and Statistics', 'Trigonometry']
        },
        'NEET UG': {
            'physics': ['Physical world and Measurement', 'Kinematics', 'Laws of Motion', 'Work, Energy and Power', 'Motion of System of Particles and Rigid Body', 'Gravitation', 'Properties of Bulk Matter', 'Thermodynamics', 'Behaviour of Perfect Gas and Kinetic Theory', 'Oscillations and Waves', 'Electrostatics', 'Current Electricity', 'Magnetic Effects of Current and Magnetism', 'Electromagnetic Induction and Alternating Currents', 'Electromagnetic Waves', 'Optics', 'Dual Nature of Matter and Radiation', 'Atoms and Nuclei', 'Electronic Devices'],
            'chemistry': ['Some Basic Concepts of Chemistry', 'Structure of Atom', 'Classification of Elements and Periodicity', 'Chemical Bonding and Molecular Structure', 'States of Matter: Gases and Liquids', 'Thermodynamics', 'Equilibrium', 'Redox Reactions', 'Hydrogen', 'The s-Block Element', 'The p-Block Element (Groups 13 & 14)', 'Organic Chemistry - Basic Principles', 'Hydrocarbons', 'Environmental Chemistry', 'Solid State', 'Solutions', 'Electrochemistry', 'Chemical Kinetics', 'Surface Chemistry', 'The p-Block Elements', 'The d-Block and f-Block Elements', 'Coordination Compounds', 'Organic Chemistry - Carbon Compounds'],
            'biology': ['The Living World', 'Biological Classification', 'Plant Kingdom', 'Animal Kingdom', 'Morphology of Flowering Plants', 'Anatomy of Flowering Plants', 'Structural Organisation in Animals', 'Cell Structure and Function', 'Biomolecules', 'Transport in Plants', 'Mineral Nutrition', 'Photosynthesis in Higher Plants', 'Respiration in Plants', 'Plant Growth and Development', 'Digestion and Absorption', 'Breathing and Exchange of Gases', 'Body Fluids and Circulation', 'Excretory Products and Their Elimination', 'Locomotion and Movement', 'Neural Control and Coordination', 'Chemical Coordination and Integration', 'Reproduction in Organisms', 'Sexual Reproduction in Flowering Plants', 'Human Reproduction', 'Reproductive Health', 'Principles of Inheritance and Variation', 'Molecular Basis of Inheritance', 'Evolution', 'Human Health and Disease', 'Strategies for Enhancement in Food Production', 'Microbes in Human Welfare', 'Biotechnology: Principles and Processes', 'Biotechnology and Its Applications', 'Organisms and Populations', 'Ecosystem', 'Biodiversity and Conservation', 'Environmental Issues']
        },
        'NEET PG': {
            // Keep default empty or add if provided later
            'all': []
        }
    };

    /**
     * Setup dynamic chapter loading based on subject selection AND current exam context
     */
    function setupDynamicChapters() {
        const subjectSelect = document.getElementById('subject-select');
        const chapterSelect = document.getElementById('chapter-select');

        if (!subjectSelect || !chapterSelect) return;

        // Function to populate chapters
        function populateChapters() {
            const selectedSubject = subjectSelect.value;
            const currentExam = getCurrentExamName(); // e.g., "AFCAT", "JEE MAINS"

            // Clear existing chapters
            chapterSelect.innerHTML = '<option value="">Select Chapter</option>';

            if (!selectedSubject) {
                chapterSelect.disabled = true;
                return;
            }

            // Find the correct chapter list
            let chapters = [];

            // Normalized lookups
            const examKey = currentExam ? currentExam.toUpperCase() : '';

            // Handle variations in exam names if necessary (e.g. "JEE Mains" vs "JEE MAINS")
            // The getCurrentExamName() returns UPPERCASE.

            if (examKey && chaptersData[examKey] && chaptersData[examKey][selectedSubject]) {
                chapters = chaptersData[examKey][selectedSubject];
            } else {
                console.log(`No chapters found for Exam: ${examKey}, Subject: ${selectedSubject}`);
            }

            if (chapters.length > 0) {
                chapters.forEach(chapterName => {
                    const option = document.createElement('option');
                    // Normalize by removing all non-alphanumeric characters (including spaces)
                    const chapterValue = chapterName.toLowerCase().replace(/[^a-z0-9]/g, '');
                    option.value = chapterValue; // or just chapterName if backend expects title
                    option.textContent = chapterName;
                    chapterSelect.appendChild(option);
                });
                chapterSelect.disabled = false;
            } else {
                const option = document.createElement('option');
                option.textContent = "No chapters available";
                chapterSelect.appendChild(option);
                chapterSelect.disabled = true;
            }
        }

        subjectSelect.addEventListener('change', populateChapters);

        // Also run on initialization in case browsers persist selection on refresh
        // But we wait for exam name to be settled
        setTimeout(populateChapters, 100);
    }


    /**
     * Initialize when DOM is ready
     */
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function () {
                initializeSearchForm();
                setupExamNavigation();
                setupDynamicChapters();
            });
        } else {
            initializeSearchForm();
            setupExamNavigation();
            setupDynamicChapters();
        }
    }

    // Start the initialization
    init();

})();
