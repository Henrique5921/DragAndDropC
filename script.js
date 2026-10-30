document.addEventListener('DOMContentLoaded', () => {
    const countries = document.querySelectorAll('.country-card');
    const dropAreas = document.querySelectorAll('.drop-area');

    let draggedCountry = null;

    countries.forEach(country => {
        country.addEventListener('dragstart', function() {
            draggedCountry = this;
            setTimeout(() => this.classList.add('dragging'), 0);
        });

        country.addEventListener('dragend', function() {
            this.classList.remove('dragging');
            draggedCountry = null;
        });
    });

    dropAreas.forEach(area => {
        area.addEventListener('dragover', function(e) {
            e.preventDefault();
        });

        area.addEventListener('dragenter', function(e) {
            e.preventDefault();
            this.classList.add('hovered');
        });

        area.addEventListener('dragleave', function() {
            this.classList.remove('hovered');
        });

        area.addEventListener('drop', function() {
            this.classList.remove('hovered');
            
            if (!draggedCountry) return;

            const targetZone = this.closest('.continent-zone');
            const expectedContinent = targetZone.getAttribute('data-continent');
            const countryContinent = draggedCountry.getAttribute('data-continent');

            if (expectedContinent === countryContinent) {
                // Resposta correta: Move o país, trava o elemento e aplica feedback verde
                this.appendChild(draggedCountry);
                draggedCountry.setAttribute('draggable', 'false');
                draggedCountry.style.cursor = 'default';
                
                targetZone.classList.add('correct');
                setTimeout(() => targetZone.classList.remove('correct'), 1000);
            } else {
                // Resposta incorreta: Rejeita a soltura e aplica feedback vermelho com tremor
                targetZone.classList.add('incorrect');
                setTimeout(() => targetZone.classList.remove('incorrect'), 600);
            }
        });
    });
});