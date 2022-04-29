(function() {
    const dataTable = document.querySelector('#data-table');
    const dataForm = document.querySelector('#data-form');

    function createPaleontologistFromFormObj(dataObject) {
        const paleontologist = new Paleontologist(dataObject.forename, dataObject.surname, dataObject.username, dataObject.email_address, dataObject.specialism, dataObject.institution, dataObject.paleontologist_id);
        return paleontologist;
    }

    function create() {
        const formData = new FormData(dataForm);
        const formDataObject = Object.fromEntries(formData.entries());

        setStatus('PREPARING POST REQUEST');
        
        fetch('https://jsonplaceholder.typicode.com/paleontologist', {
            method: 'POST',
            body: JSON.stringify(createPaleontologistFromFormObj(formDataObject)),
            headers: {
                'Content-type': 'application/json'
            }
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

    function handleFormSubmission(event) {
        event.preventDefault(); 
        create();
    }

    dataForm.addEventListener('submit', handleFormSubmission);
})();

making sure everything is committed