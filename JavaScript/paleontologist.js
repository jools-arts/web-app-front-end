function Paleontologist(forename, surname, username, email_address, specialism, institution, paleontologist_id = null) {
    this.forename = forename;
    this.surname = surname;
    this.username = username;
    this.email_address = email_address;
    this.institution = institution;
    this.specialism = specialism;
    this.paleontologist_id = paleontologist_id;
}

const paleontologistHeaders = ['paleontologist_id', 'forename', 'surname', 'username', 'email_address', 'institution', 'specialism'];

function renderUserTable(users, containerElement) {
    const tableManager = new TableManager();
    const table = tableManager.createTable(userHeaders, users);
    containerElement.replaceChildren(table);
}