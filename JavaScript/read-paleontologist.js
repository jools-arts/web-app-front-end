(function() {
    const requestSelector = document.querySelector('#method');
    const dataTable = document.querySelector('#data-table');
    const dataForm = document.querySelector('#data-form');
    const paleontolgistIdField = document.querySelector('#paleontologist-id-field');
    const id = document.querySelector('#paleontologist_id');

    function toggleIdVisibility(isVisible) {
        if (isVisible) {
            if (paleontologistIdField.classList.contains('hide')) paleontologistId.classList.remove('hide');
        } else {
            if (!paleontologistIdField.classList.contains('hide')) paleontologistId.classList.add('hide');
        }
    }

    function readAll() {
        setStatus('PREPARING GET REQUEST');

        fetch('https://jsonplaceholder.typicode.com/paleontologists', {
            method: 'GET'
        }).then(response => {
            setStatus('RECEIVED RESPONSE');
            if (response.ok) return response.json();
            else throw new Error('Error');
        })
          .then(paleontologists => {
            setStatus('RENDERING TABLE');
            renderPaleontologistTable(paleontologists, dataTable);
            setStatus('RESPONSE RENDERED INTO TABLE');
        })
          .catch(error => {
            setStatus('ERROR ENCOUNTERED');
            handleError(error);
        });
    }

    function readById() {
        setStatus('PREPARING GET REQUEST');

        fetch(`https://jsonplaceholder.typicode.com/paleontologists/${id.value}`, {
            method: 'GET'
        }).then(response => {
            setStatus('RECEIVED RESPONSE');
            if (response.ok) return response.json();
            else throw new Error('Error');
        })
          .then(paleontologist => {
            setStatus('RENDERING TABLE');
            renderPaleontologistTable([paleontologist], dataTable);
            setStatus('RESPONSE RENDERED INTO TABLE');
        })
          .catch(error => {
            setStatus('ERROR ENCOUNTERED');
            handleError(error);
        });
    }

    readAll();

    requestSelector.addEventListener('change', function(event) {
        if (this.value == 'ALL') {
            toggleIdVisibility(false);
        } else if (this.value == 'ID') {
            toggleIdVisibility(true);
        } else if (this.value == 'COMMENTS') {
            toggleIdVisibility(true);
        }
    });

    dataForm.addEventListener('submit', function(event) {
        event.preventDefault();
        if (requestSelector.value == 'ALL') readAll();
        else if (requestSelector.value == 'ID') readById();
        else if (requestSelector.value == 'COMMENTS') readComments();
    });
})();