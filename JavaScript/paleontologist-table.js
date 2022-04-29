(function() {
    const requestManager = new RequestManager('https://jsonplaceholder.typicode.com/paleontologists');
    const tableManager = new TableManager();

    const dataTable = document.querySelector('#data-table');
    const dataForm = document.querySelector('#data-form');
    const requestSelector = dataForm.querySelector('#action');
    const generalInfo = dataForm.querySelector('#paleontologist-information');
    const id = dataForm.querySelector('#paleontologist_id');

    let paleontologists = [];

    function hideFormInputs() {
      if (!generalInfo.classList.contains('hide')) paleontologistInfo.classList.toggle('hide');
    }

    function displayFormInputs() {
      if (generalInfo.classList.contains('hide')) paleontologistInfo.classList.toggle('hide');
    }

    function hideIdField(hide) {
      if (hide) id.classList.add('hide');
      else id.classList.remove('hide');
    }
    
    function renderPaleontologistTable(paleontologists) {
      const table = tableManager.createTable(paleontologistHeaders, paleontologists);
      dataTable.replaceChildren(table);
    }

    function addPaleontologistToTable(paleontologist) {
      console.log(paleontologist);
      const tableBody = dataTable.querySelector('tbody');
      tableBody.appendChild(tableManager.createTableRow(tableManager.getValuesInOrder(paleontologistHeaders, paleontologist)));
    }

    function createPaleontologistFromFormObj(dataObject) {
      const paleontologist = new Paleontologist(dataObject.name, dataObject.username, dataObject.email, dataObject.phone, address, dataObject.website, company, dataObject.id);
      return paleontologist;
    }

    function handleFormSubmission(event) {
      event.preventDefault();
      const form = event.currentTarget;
      const formData = new FormData(form);
      const dataObject = Object.fromEntries(formData.entries());

      let paleontologist;
      switch (requestSelector.value) {
        case 'GET':
          requestManager.setPayload('');
          requestManager.setRequestMethod('GET');
          requestManager.sendRequest().then(response => response.json())
                                      .then(data => renderPaleontologistTable(data))
                                      .catch(err => handleError(err));
          break;
        case 'POST':
          paleontologist = createPaleontologistFromFormObj(dataObject);
          requestManager.setRequestMethod('POST');
          requestManager.setPayload(JSON.stringify(paleontologist));
          requestManager.setHeaders({
            'Content-type': 'application/json'
          });

          requestManager.sendRequest().then(response => response.json())
                                      .then(data => addPaleontologistToTable(data))
                                      .catch(err => handleError(err));
          break;
        case 'PUT':
          paleontologist = createPaleontologistFromFormObj(dataObject);
          break;
      }
    }

    requestManager.sendRequest()
                  .then(response => response.json())
                  .then(response => {
                    paleontologists = response;
                    renderPaleontologistTable(paleontologists)
                  })
                  .catch(err => handleError(err));

    dataForm.addEventListener('submit', handleFormSubmission);

    requestSelector.addEventListener('change', (event) => {
      const select = event.currentTarget;
      
      switch (select.value) {
        case 'GET': 
          hideFormInputs();
          break;
        case 'POST':
          displayFormInputs();
          hideIdField(true);
          break;
        case 'PUT':
          displayFormInputs();
          hideIdField(false);
      }
    });
})();