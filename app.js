const $ = require('jQuery');
const baseUrl = 'http://api.umcgc.com/petitions/';

function getPetition(petitionNumber, callback) {
  const url = baseUrl + petitionNumber;
  $.get(url, callback);
}

$(document).ready(() => {
  const $petition = $('#petition');
  const $petitionNumber = $('#petitionNumber');
  const $btn = $('button');
  const $loader = $('.loader');

  $('form').submit((e) => {
    e.preventDefault();
    $loader.show();
    const petitionNumber = $petitionNumber.val();
    getPetition(petitionNumber, data => {
      $loader.hide();
      $petition.html(data);
    });
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
