const $ = require('jQuery');
const baseUrl = 'http://api.umcgc.com/petitions/';

$(document).ready(() => {
  const $petition = $('#petition');
  const $petitionNumber = $('#petitionNumber');
  const $btn = $('button');
  const $loader = $('.loader');

  $('form').submit((e) => {
    e.preventDefault();
    $loader.show();
    $petition.empty();
    const petitionNumber = $petitionNumber.val();
    const petitionPromise = $.ajax({
      url: baseUrl + petitionNumber,
      method: 'GET',
      dataType: 'html',
    });
    petitionPromise.done(data => {
      $loader.hide();
      $petition.html(data);
    });
    petitionPromise.fail((jqXHR, textStatus, errorThrown) => {
      console.log(errorThrown);
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
