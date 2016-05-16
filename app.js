const $ = require('jQuery');
const baseUrl = 'http://api.umcgc.com/';

$(document).ready(() => {
  const $petition = $('#petition');
  const $petitionNumber = $('#petitionNumber');
  const $extra = $('#extra');
  const $btn = $('button');
  const $loader = $('.loader');

  $('form').submit((e) => {
    e.preventDefault();
    $loader.show();
    $petition.empty();
    $extra.empty();
    $extra.hide();
    const petitionNumber = $petitionNumber.val();
    const petitionPromise = $.ajax({
      url: `${baseUrl}petitions/${petitionNumber}`,
      method: 'GET',
      dataType: 'html',
    });
    petitionPromise.done(data => {
      $loader.hide();
      $petition.html(data);
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
