console.log("js");

$(document).ready(function () {
  console.log("JQ");
  // Establish Click Listeners
  setupClickListeners();
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
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      readyForTransfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val(),
    };
    // call saveKoala with the new object
    saveKoala( koalaToSend );
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
    data: koalaToSend
  }).then(() => {
   
  }).catch((err) => {
    console.error('PUT request for /koala failed', err);
    $('body').prepend('<h2>failed PUT request</h2>')
  });
}

function isReady() {
  console.log('in isReady', $('.ready-btn'));

  let id = $(this).parents('tr').data('id');
  let isReady = $(this).parents('tr').data('ready');

  $.ajax({
    method: 'PUT',
    url: `/koalas/${id}`,
    data: {ready: isReady}
  })
  .then (() => {
    getKoalas();
  })
  .catch ((error) => {
    res.sendStatus (500)
  });
};

function render(koalas) {
  for (let koala of koalas) {
    let renderElement = $("#viewKoalas");
    let readyText = 'Ready 🐨';
    if (!koala.ready) {
      readyText = "<input class='ready-btn' type='button' value='Not Ready 🐨'>" 
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
      </td>`;
      renderElement.append(appendStr);
  }
}
