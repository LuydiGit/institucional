document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    includeHTML();
});

function includeHTML() {
    let elements = document.querySelectorAll('[data-include-html]');
    elements.forEach(el => {
        let file = el.getAttribute('data-include-html');
        console.log('Including file:', file);
        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                return response.text();
            })
            .then(data => {
                el.innerHTML = data;
                el.removeAttribute('data-include-html');
                includeHTML(); // Recursively include HTML in case the included file also has includes
            })
            .catch(error => console.error('Error loading the file:', error));
    });
}
