console.log("js");

$(document).ready(function () {
  console.log("JQ");
  // Establish Click Listeners
  setupClickListeners();
  $(document).on('click', '.delete-btn', deleteKoala)
  $(document).on('click', '.edit-btn', onEdit)
  $(document).on('click', '.accept-btn', acceptEdit)
  $(document).on('click', '.cancel-btn', cancelEdit)
  // load existing koalas on page load
  getKoalas();

  $(document).on('click', '.ready-btn', isReady);
}); // end doc ready

let editId = -1;

function onEdit() {
  editId = $(this).parents('tr').data('id');
  getKoalas();
}

function cancelEdit() {
  editId = -1;
  getKoalas();
}


function acceptEdit() {
  editId = -1;
  let id = $(this).parents('tr').data('id');
  let koalaname = $('.name-in').val();
  let gender = $('.gender-in').val();
  let age = $('.age-in').val();
  let notes = $('.notes-in').val();
  $.ajax({
    type: 'PUT',
    url: `/koalas/edit/${id}`,
    data: { koalaname, gender, age, notes },
  }).then(function (response) {
    console.log('Response from server.', response);
    getKoalas();
  }).catch(function (error) {
    console.log('Error in PUT', error)
    alert('Unable to edit koala at this time. Please try again later.');
  });
}

function setupClickListeners() {
  $("#addButton").on("click", function () {
    console.log("in addButton on click");
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      koalaname: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      ready: false,
      notes: $('#notesIn').val()
    };
    $('#nameIn').val(''),
      $('#ageIn').val(''),
      $('#genderIn').val(''),
      $('#readyForTransferIn').val(''),
      $('#notesIn').val('')

    // call saveKoala with the new object
    saveKoala(koalaToSend);
  });
}

function deleteKoala() {
  let id = $(this).parents('tr').data('id');
  $.ajax({
    method: 'DELETE',
    url: `/koalas/${id}`
  })
    .then((response) => {
      console.log('Deleted koala', id);
      getKoalas();
    })
    .catch((err) => {
      console.log(err);
    });
}

function getKoalas() {
  console.log("in getKoalas");
  // ajax call to server to get koalas
  $.ajax({
    method: "GET",
    url: "/koalas"
  }).then((response) => {
    console.log(`in getKoalas;`, response);
    render(response);
  });
} // end getKoalas

function saveKoala(newKoala) {
  console.log('in saveKoala', newKoala);

  // ajax call to server to get koalas
  $.ajax({
    type: 'POST',
    url: '/koalas/',
    data: newKoala
  }).then(() => {
    getKoalas();
  }).catch((err) => {
    console.error('PUT request for /koala failed', err);
    $('body').prepend('<h2>failed PUT request</h2>')
  });
}

function isReady() {
  console.log('in isReady', $('.ready-btn'));

  let id = $(this).parents('tr').data('id');
  let isReady = $(this).parents('tr').data('ready');
  console.log(isReady);

  $.ajax({
    method: 'PUT',
    url: `/koalas/${id}`,
    data: { ready: !isReady }
  })
    .then((response) => {
      getKoalas();
    })
    .catch((error) => {
      console.log(error);
    });
};

function render(koalas) {
  let renderElement = $("#viewKoalas");
  renderElement.empty();
  for (let koala of koalas) {
    let readyText = 'Ready 🐨';
    if (!koala.ready) {
      readyText = "<input class='ready-btn' type='button' value='Not Ready 🐨'>"
    }
    if (koala.id == editId) {
      let appendStr = `
      <tr data-id=${koala.id} data-ready="${koala.ready}">
        <td>
          <input class='name-in' value="${koala.koalaname}">
        </td>
        <td>
          <input class='age-in' value="${koala.age}">
        </td>
        <td>
          <input class='gender-in' value="${koala.gender}">
        </td>
        <td>
          ${readyText}
        </td>
        <td>
          <input class='notes-in' value="${koala.notes}">
        </td>
        <td>
          <span>
            <input class='accept-btn' type='button' value='✅'>
            <input class='cancel-btn' type='button' value='❌'>
          </span>
        </td>`;
        renderElement.append(appendStr);
    } else {
      let appendStr = `
    <tr data-id=${koala.id} data-ready=${koala.ready}>
      <td>
        ${koala.koalaname}
      </td>
      <td>
        ${koala.age}
      </td>
      <td>
        ${koala.gender}
      </td>
      <td>
        ${readyText}
      </td>
      <td>
        ${koala.notes}
      </td>
      <td>
        <span>
          <input class='edit-btn' type='button' value='📝'>
          <input class='delete-btn' type='button' value='❌'>
        </span>
      </td>`;
      renderElement.append(appendStr);
    }
  }
}
