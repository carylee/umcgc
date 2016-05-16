const $ = require('jQuery');
const baseUrl = 'http://api.umcgc.com/';


function view(petitionNumber) {
  const $petition = $('#petition');
  const $extra = $('#extra');
  const $loader = $('.loader');
  $loader.show();
  $petition.empty();
  $extra.empty();
  $extra.hide();
  window.location.hash = `#${petitionNumber}`;
  const petitionPromise = $.ajax({
    url: `${baseUrl}petitions/${petitionNumber}`,
    method: 'GET',
    dataType: 'html',
  });
  petitionPromise.done(data => {
    $petition.append(`<h1>Petition ${petitionNumber}</h1>`);
    $loader.hide();
    $petition.append(data);
    $extra.show();
  });
  const tablePromise = $.ajax({
    url: `${baseUrl}petitions/meta/${petitionNumber}`,
    method: 'GET',
    dataType: 'html',
  });
  tablePromise.done(data => {
    $extra.html(data);
  });
}

$(() => {
  const hashMatches = window.location.hash.match(/6\d{4}$/);
  if (hashMatches && hashMatches.length > 0) {
    view(hashMatches[0]);
  } else {
    window.location.hash = '';
  }

  const $petitionNumber = $('#petitionNumber');
  const $btn = $('button');

  $('form').submit((e) => {
    e.preventDefault();
    view($petitionNumber.val());
    return false;
  });

  $petitionNumber.on('input', () => {
    const number = $petitionNumber.val() * 1;
    if (number < 61060 && number > 60000) {
      $btn.prop('disabled', false);
    } else {
      $btn.prop('disabled', true);
    }
  });
});
