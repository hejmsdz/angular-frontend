(function() {
  angular
    .module('PHPFrontend', ['ui.bootstrap', 'PHPFrontend.fields'])
    .factory('errorModal', ['$uibModal', function($uibModal) {
      return function(status) {
        $uibModal.open({
          'templateUrl': 'templates/error-modal.html',
          'controller': 'ErrorController',
          'resolve': {
            status: function() {
              return status;
            }
          }
        });
      };
    }])
    .controller('ErrorController', ['$scope', 'status', function($scope, status) {
      console.log(status);
      $scope.url = status.config.url;
      $scope.statusCode = status.status;
      $scope.statusText = status.statusText;
      $scope.response = status.data;
    }])
    .factory('crud', ['$http', '$httpParamSerializerJQLike', 'errorModal', function($http, $httpParamSerializerJQLike, errorModal) {
      var headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      };

      var identity = function(x) {return x};

      return {
        'all': function() {
          return $http.get('/server/list.php', null, {
            responseType: 'text/json'
          }).then(function(response) {
            return response.data;
          }, errorModal);
        },
        'create': function(item) {
          return $http.post('/server/create.php', $httpParamSerializerJQLike(item), {
            headers: headers
          }).then(identity, errorModal);
        },
        'update': function(oldItem, newItem) {
          return $http.post('/server/update.php', $httpParamSerializerJQLike(newItem), {
            headers: headers,
            params: {id: oldItem.id}
          }).then(identity, errorModal);
        },
        'delete': function(item) {
          return $http.post('/server/delete.php', $httpParamSerializerJQLike({id: item.id}), {
            headers: headers
          }).then(identity, errorModal);
        },
      }
    }])
    .factory('mock-crud', ['$q', function($q) {
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
          .then($uibModalInstance.close);
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
          .then($uibModalInstance.close);
      }
    }]);
})();
