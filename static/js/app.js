

 
function Todo($scope,$http,$cookies,$filter) {

   
    $http.get("/costumers").success(function(response) {$scope.names = response;

    });

}



myApp.controller("Ctrl",

function Ctrl($scope) {
    $scope.model = {
        contacts: [{
            id: 1,
            name: "Ben",
            age: 28
        }, {
            id: 2,
            name: "Sally",
            age: 24
        }, {
            id: 3,
            name: "John",
            age: 32
        }, {
            id: 4,
            name: "Jane",
            age: 40
        }],
        selected: {}
    };

    // gets the template to ng-include for a table row / item
    $scope.getTemplate = function (contact) {
        if (contact.id === $scope.model.selected.id) return 'edit';
        else return 'display';
    };

    $scope.editContact = function (contact) {
        $scope.model.selected = angular.copy(contact);
    };

    $scope.saveContact = function (idx) {
        console.log("Saving contact");
        $scope.model.contacts[idx] = angular.copy($scope.model.selected);
        $scope.reset();
    };

    $scope.reset = function () {
        $scope.model.selected = {};
    };
});