(function() {
  angular.module('PHPFrontend.fields', []).constant('FIELDS', [
    {'label': 'ID', 'name': 'id', 'hide': true},
    {'label': 'Nazwa', 'name': 'name'},
    {'label': 'Opis', 'name': 'description', 'tableHide': true},
  ]);
})();
