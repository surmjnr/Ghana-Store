document.addEventListener('DOMContentLoaded', function() {
    // Animate stats numbers
    const stats = document.querySelectorAll('.stat-item h3');
    
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = target.innerText;
                const suffix = value.replace(/[0-9]/g, '');
                const number = parseInt(value.replace(/\D/g, ''));
                
                animateValue(target, 0, number, suffix, 2000);
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));

    function animateValue(element, start, end, suffix, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                clearInterval(timer);
                current = end;
            }
            element.textContent = Math.floor(current) + suffix;
        }, 16);
    }

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the faster

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const count = parseInt(counter.innerText);
                const increment = target / speed;

                if (count < target) {
                    const updateCount = () => {
                        const currentCount = parseInt(counter.innerText);
                        if (currentCount < target) {
                            counter.innerText = Math.ceil(currentCount + increment);
                            setTimeout(updateCount, 1);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                }
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}); 