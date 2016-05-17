const $ = require('jQuery');
const baseUrl = 'http://api.umcgc.com/';


function view(petitionNumber) {
  if (petitionNumber < 60001 || petitionNumber > 61059) return;
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
  petitionPromise.done(function (data) {
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
  tablePromise.done(function (data) {
    $extra.html(data);
  });
}

$(function () {
  const queryParamMatches = window.location.href.match(/\?p=(6\d{4})$/);
  if (queryParamMatches && queryParamMatches.length > 1) {
    window.location.replace(`/#${queryParamMatches[1]}`);
  }

  const hashMatches = window.location.hash.match(/6\d{4}$/);
  if (hashMatches && hashMatches.length > 0) {
    view(hashMatches[0]);
  } else {
    window.location.hash = '';
  }

  const $petitionNumber = $('#petitionNumber');

  $('form').submit(function (e) {
    e.preventDefault();
    view($petitionNumber.val());
    return false;
  });
});
