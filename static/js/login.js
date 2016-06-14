

function Todo($scope,$http,$cookies,$filter) {

   document.getElementById('alerta').style.display='none'
   document.getElementById('alerta-1').style.display='none'

    $scope.addNew=function(){

        
        

        var todo={

            add: "New",
            dato: $scope.agregar,
            done:false
        }


        $http({
        url: "/agregar_user/",
        data: todo,
        method: 'POST',
        headers: {
        'X-CSRFToken': $cookies['csrftoken']
        }
        }).
        success(function(data) {

        console.log(data)

        if (data==0){

            document.getElementById('alerta').style.display='block'

            setTimeout(function(){
            
            document.getElementById('alerta').style.display='none'

            }, 5000);

        }
        if (data==1){

            document.getElementById('alerta-1').style.display='block'

             setTimeout(function(){
            
            document.getElementById('alerta-1').style.display='none'

            }, 5000);

        }
            
            

    


        })

         //$('#Agregar').modal('hide')
         //$('.modal-backdrop').remove().fadeIn(10000);
         //$scope.agregar=""

    };

}

