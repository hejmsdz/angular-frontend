(function() {
  angular
    .module('PHPFrontend', ['ui.bootstrap'])
    .constant('FIELDS', [
      {'label': 'ID', 'name': 'id', 'hide': true},
      {'label': 'Nazwa', 'name': 'name'},
      {'label': 'Opis', 'name': 'description', 'tableHide': true},
    ])
    .factory('crud', ['$q', function($q) {
      var chance = function(probability) {
          return $q(function(resolve, reject) {
            Math.random() < probability ? resolve() : reject();
        })
      };

      return {
        'all': function(items) {
          console.log("Listing all items");
          return $q(function(resolve, reject) {
            resolve([
              {id: 1, name: "pies", description: "głośno szczeka"},
              {id: 2, name: "kot", description: "pije mleko"}
            ]);
          });
        },
        'create': function(item) {
          console.log("Creating", item);
          return chance(0.9);
        },
        'update': function(oldItem, newItem) {
          console.log("Updating", oldItem, " -> ", newItem);
          return chance(0.9);
        },
        'delete': function(item) {
          console.log("Deleting", item);
          return chance(0.9);
        }
      };
    }])
    .controller('BaseController', ['$scope', '$uibModal', 'FIELDS', 'crud', function($scope, $uibModal, FIELDS, crud) {
      $scope.fields = FIELDS;

      var onItems = function(items) {
        $scope.items = items;
      };

      crud.all()
        .then(onItems);

      $scope.editClick = function(item) {
        $uibModal.open({
          'templateUrl': 'templates/edit-modal.html',
          'controller': 'EditController',
          'resolve': {
            item: function() {
              return item;
            }
          }
        }).result.then(function() {
          crud.all()
            .then(onItems);
        });
      };

      $scope.deleteClick = function(item) {
        $uibModal.open({
          'templateUrl': 'templates/delete-modal.html',
          'controller': 'DeleteController',
          'resolve': {
            item: function() {
              return item;
            }
          }
        }).result.then(function() {
          crud.all()
            .then(onItems);
        });
      };

      $scope.createClick = function() {
        $uibModal.open({
          'templateUrl': 'templates/edit-modal.html',
          'controller': 'CreateController'
        }).result.then(function() {
          crud.all()
            .then(onItems);
        });
      };
    }])
    .controller('EditController', ['$scope', '$uibModalInstance', 'FIELDS', 'crud', 'item', function($scope, $uibModalInstance, FIELDS, crud, item) {
      $scope.title = "Edycja";
      $scope.error = null;
      $scope.item = angular.copy(item);
      $scope.fields = FIELDS;

      $scope.save = function() {
        $scope.error = null;
        crud.update(item, $scope.item)
          .then($uibModalInstance.close, function() {
            $scope.error = "Wystąpił błąd!";
          });
      }
    }])
    .controller('DeleteController', ['$scope', '$uibModalInstance', 'crud', 'item', function($scope, $uibModalInstance, crud, item) {
      $scope.confirm = function() {
        $scope.error = null;
        crud.delete(item)
          .then($uibModalInstance.close);
      }
    }])
    .controller('CreateController', ['$scope', '$uibModalInstance', 'FIELDS', 'crud', function($scope, $uibModalInstance, FIELDS, crud) {
      $scope.title = "Dodawanie";
      $scope.error = null;
      $scope.item = {};
      $scope.fields = FIELDS;

      $scope.save = function() {
        $scope.error = null;
        crud.create($scope.item)
          .then($uibModalInstance.close, function() {
            $scope.error = "Wystąpił błąd!";
          });
      }
    }]);
})();
