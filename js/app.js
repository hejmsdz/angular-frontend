(function() {
  angular
    .module('PHPFrontend', ['ui.bootstrap'])
    .controller('BaseController', ['$scope', function($scope) {
      $scope.world = "Angular";
    }]);
})();
