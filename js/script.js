        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loader').classList.add('hidden');
            }, 1500);
        });
        
        const menuButton = document.getElementById('menuButton');
        const menu = document.getElementById('menu');
        
        menuButton.addEventListener('click', () => {
            menuButton.classList.toggle('menu-open');
            menu.classList.toggle('open');
        });
        
        const container = document.getElementById('container');
        const paginationDots = document.querySelectorAll('.pagination-dot');
        const progressBar = document.getElementById('progressBar');
        let currentSection = 0;
        const totalSections = 6;

        function updateProgress() {
            const progress = (currentSection / (totalSections - 1)) * 100;
            progressBar.style.width = `${progress}%`;
        }

        function updateActiveDot() {
            paginationDots.forEach(dot => dot.classList.remove('active'));
            paginationDots[currentSection].classList.add('active');
        }

        function scrollToSection(index) {
            currentSection = index;
            container.style.transform = `translateX(-${currentSection * 100}vw)`;
            updateActiveDot();
            updateProgress();
        }
        
        paginationDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                scrollToSection(index);
                menuButton.classList.remove('menu-open');
                menu.classList.remove('open');
            });
        });

        document.querySelectorAll('.menu-links a').forEach((link, index) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                scrollToSection(index);
                menuButton.classList.remove('menu-open');
                menu.classList.remove('open');
            });
        });
        
        document.addEventListener('wheel', (e) => {
            if (e.deltaY > 0 && currentSection < totalSections - 1) {
                scrollToSection(currentSection + 1);
            } else if (e.deltaY < 0 && currentSection > 0) {
                scrollToSection(currentSection - 1);
            }
        }, { passive: true });
        
        document.getElementById('startBtn').addEventListener('click', (e) => {
            e.preventDefault();
            scrollToSection(3);
        });
        
        document.getElementById('learnBtn').addEventListener('click', (e) => {
            e.preventDefault();
            scrollToSection(1);
        });

        const statItems = document.querySelectorAll('.stat-item');
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    
                    if (entry.target.classList.contains('stat-item')) {
                        const statNumber = entry.target.querySelector('.stat-number');
                        const targetValue = parseInt(statNumber.getAttribute('data-count'));
                        animateCounter(statNumber, targetValue);
                    }
                }
            });
        }, { threshold: 0.1 });
        
        statItems.forEach(item => {
            observer.observe(item);
        });
        
        function animateCounter(element, target) {
            let counter = 0;
            const speed = 2000 / target;
            
            const updateCounter = () => {
                if (counter < target) {
                    counter++;
                    element.textContent = counter + '%';
                    setTimeout(updateCounter, speed);
                }
            };
            
            updateCounter();
        }

        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                faqItems.forEach(faqItem => {
                    if (faqItem !== item) {
                        faqItem.classList.remove('active');
                    }
                });
                item.classList.toggle('active');
            });
        });
        
        const analyzeBtn = document.getElementById('analyzeBtn');
        const resetBtn = document.getElementById('resetBtn');
        const results = document.getElementById('results');
        
        analyzeBtn.addEventListener('click', () => {
            const newsText = document.getElementById('newsText').value;
            
            if (newsText.trim() === '') {
                alert('Per favore, inserisci il testo di una notizia da analizzare.');
                return;
            }
            
            analyzeBtn.textContent = 'Analisi in corso...';
            analyzeBtn.disabled = true;
            
            setTimeout(() => {
                const reliability = Math.floor(Math.random() * 40) + 30;
                const emotional = Math.floor(Math.random() * 50) + 40;
                const objectivity = Math.floor(Math.random() * 40) + 20;

                document.getElementById('reliabilityScore').textContent = reliability + '%';
                document.getElementById('emotionalScore').textContent = emotional + '%';
                document.getElementById('objectivityScore').textContent = objectivity + '%';

                document.getElementById('reliabilityBar').style.width = reliability + '%';
                document.getElementById('emotionalBar').style.width = emotional + '%';
                document.getElementById('objectivityBar').style.width = objectivity + '%';

                document.getElementById('coherenceValue').textContent = reliability < 50 ? 
                    'Bassa coerenza interna, contraddizioni rilevate' : 'Coerenza interna accettabile';
                
                document.getElementById('sourcesValue').textContent = reliability < 50 ? 
                    'Fonti non verificabili o assenti' : 'Alcune fonti verificabili presenti';
                
                document.getElementById('biasValue').textContent = objectivity < 50 ? 
                    'Alto livello di bias e linguaggio tendenzioso' : 'Livello moderato di bias';
                
                document.getElementById('suggestionValue').textContent = reliability < 50 ? 
                    'Consigliamo di verificare questa notizia con altre fonti affidabili' : 
                    'La notizia appare parzialmente affidabile ma si consiglia cautela';
                
                results.classList.add('show');
                
                analyzeBtn.textContent = 'Analizza';
                analyzeBtn.disabled = false;
            }, 2000);
        });
        
        resetBtn.addEventListener('click', () => {
            document.getElementById('newsText').value = '';
            document.getElementById('sourceUrl').value = '';
            results.classList.remove('show');
        });
        
        updateProgress();