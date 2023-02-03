console.log("js");

$(document).ready(function () {
  console.log("JQ");
  // Establish Click Listeners
  setupClickListeners();
  $(document).on('click', '.delete-btn', deleteKoala)
  // load existing koalas on page load
  getKoalas();

  $(document).on('click','.ready-btn', isReady);
}); // end doc ready

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
    saveKoala( koalaToSend );
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

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  
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
    data: {ready: !isReady}
  })
  .then ((response) => {
    getKoalas();
  })
  .catch ((error) => {
    console.log(error);
  });
};

function render(koalas) {
  let renderElement = $("#viewKoalas");
  renderElement.empty();
  for (let koala of koalas) {
    let readyText = "Ready <input class='ready-btn' type='button' value='🐨'>";
    if (!koala.ready) {
      readyText = "Not Ready<input class='ready-btn' type='button' value='🐨'>" 
    }
    let appendStr = `
    <tr data-id=${koala.id} data-ready=${koala.ready}>
      <td>
        ${koala.koalaname}
      </td>
      <td>
        ${koala.gender}
      </td>
      <td>
        ${koala.age}
      </td>
      <td>
        ${readyText}
      </td>
      <td>
        ${koala.notes}
      </td>
      <td>
        <input class='delete-btn' type='button' value='❌'>
      </td>`;
      renderElement.append(appendStr);
  }
}
