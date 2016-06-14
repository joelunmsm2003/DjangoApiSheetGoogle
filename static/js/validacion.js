

function Todo($scope,$http,$cookies,$filter) {

   


    $scope.cancelEvent = function (index) {

        console.log('cancelar')        
        $scope.model = {}
        $scope.model.id= index;
      
        console.log('model',$scope.model)

    };

     $scope.detalle = function (id) {

       window.location.href = "/eventodetalle/"+id

    };

      $scope.aprobarEvent = function (index) {

        console.log('aprobar',index)

        $scope.model = {}
        $scope.model.id= index;


        console.log('model',$scope.model)
      
     
        }

    }
       

    



















