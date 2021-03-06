var myApp=angular.module('myApp', ['ngCookies','firebase']);
    myApp.config(function($interpolateProvider){
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
    });


    /*
This directive allows us to pass a function in on an enter key to do what we want.
 */
myApp.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
});



function Todo($scope,$http,$cookies,$filter,$firebaseArray) {

     $http.get("/user").success(function(response) {$scope.user = response[0];

        console.log('user',$scope.user)
       
    });

    $http.get("/usuarios").success(function(response) {$scope.usuarios = response;

       
    });

    $scope.muestra = false



 var ref = new Firebase("https://chatcomunike.firebaseio.com/messages");
  // create a synchronized array
    $scope.messages = $firebaseArray(ref);


  // add new items to the array
  // the message is automatically added to our Firebase database!
  $scope.addMessage = function() {

    console.log('addmessage')
    $scope.messages.$add({
      text: $scope.user.username, 
      mensaje: $scope.newMessageText,
    

      
    });
  };


    $scope.enviaroot = function(data) {

    console.log(data)



    $scope.messages.$add({

      origen: $scope.user.username, 
      destino:data.username,
      mensaje: data.mensaje
      
    });

    data.mensaje =''
   
  };

    $scope.enviacliente = function(data) {

   

    $scope.messages.$add({

      origen: $scope.user.username, 
      destino:'root',
      mensaje: data.mensaje
      
    });

     data.mensaje =''
   
  };

  

  $scope.muestrachat =function(data){

    console.log('ENter',data)

    $("."+data.username).hide()




  }
  $scope.ocultachat =function(data){

    console.log('ENter',data)

    $("."+data.username).show()
    $("."+data.username).css("scrollTop",10000)

  var elem = document.getElementsByClassName(data.username);
  elem.scrollTop = elem.scrollHeight;


 


  }

     




    $('.table').hide()

    $scope.a=""
    $scope.b=""


    $scope.reverse = false;
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 50;
    $scope.pagedItems = [];
    $scope.currentPage = 0;

   
    $scope.Change = function () {
        

        console.log($scope.agregar.elemento)

        if ($scope.agregar.elemento == 'costumer'){

            $scope.valores = $scope.costumers

            console.log($scope.valores)
        }

        if ($scope.agregar.elemento == 'id'){

            $scope.valores = $scope.clientes

            console.log($scope.valores)
        }

        if ($scope.agregar.elemento == 'todos'){


            $http.get("/audiences").success(function(response) {$scope.clientes = response;

            $scope.search();

            });

 


        }

        

    };


        $scope.ChangeElement = function () {

        console.log('$scope.agregar.valor',$scope.agregar)


        var todo={

            add: "Buscar",
            dato: $scope.agregar,
            done:false
        }

        console.log('todo',todo)

        $http({

        url: "/audiences/",
        data: todo,
        method: 'POST',
        headers: {
        'X-CSRFToken': $cookies['csrftoken']
        }
        }).
        success(function(data) {
        
        console.log(data['data'])
        //console.log('datarecibida',JSON.parse(data['data']));

        $scope.clientes = data['data']



        $scope.search()


    
        })







        };




    
    $http.get("/audiences").success(function(response) {$scope.clientes = response;

        $scope.search();


    $('.table').show()
  
              
        
    });

    $http.get("/costumers").success(function(response) {$scope.costumers = response;
 
    });


    $scope.numberOfPages = function() 
    {

    return Math.ceil($scope.clientes.length / $scope.pageSize);
    
    };

    

    $scope.addNew=function(currentPage){

         $('#Agregar').modal('hide')
         $('.modal-backdrop').remove();


        console.log($scope.agregar)
        
        var todo={

            add: "New",
            dato: $scope.agregar,
            done:false
        }


        $http({
        url: "/audiences/",
        data: todo,
        method: 'POST',
        headers: {
        'X-CSRFToken': $cookies['csrftoken']
        }
        }).
        success(function(data) {
        console.log(data);

        window.location.href = "/audience"
        $scope.agregar=""
        })


    };

    $scope.saveContact = function (idx,currentPage) {


        $scope.pagedItems[currentPage][idx] = angular.copy($scope.model);
       

        var todo={

            add: "Edit",
            dato: $scope.model,
            done:false
        }


        $http({
        url: "/audiences/",
        data: todo,
        method: 'POST',
        headers: {
        'X-CSRFToken': $cookies['csrftoken']
        }
        }).
        success(function(data) {

     
        $scope.model.costumer__short_name = data['cliente'];
        
        console.log($scope.model)
      

        })


        $('#Edit').modal('hide')
        $('.modal-backdrop').remove();
    };


    $scope.eliminarContact = function (idx,currentPage) {


        $('#Eliminar').modal('hide')
        $('.modal-backdrop').remove();

        console.log($scope.pagedItems[currentPage])

        $scope.pagedItems[currentPage].splice(idx,1);

        var todo={

            dato: $scope.model,

            add: "Eliminar",

            done:false
        }


        $http({
        url: "/audiences/",
        data: todo,
        method: 'POST',
        headers: {
        'X-CSRFToken': $cookies['csrftoken']
        }
        }).
        success(function(data) {

        $scope.contador =$scope.contador -1
        


        })
    };

    $scope.editContact = function (contact,index,currentPage) {


        console.log('edit')        
        $scope.index = index;
        $scope.numberPage =currentPage;
        $scope.model = angular.copy(contact);   
        console.log($scope.model);

    };


 $scope.sort_by = function(newSortingOrder,currentPage) {


         

        function sortByKey(array, key) {
            return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        }

    
        if ($scope.sortingOrder == newSortingOrder)
            $scope.reverse = !$scope.reverse;

        $scope.sortingOrder = newSortingOrder;


        people = sortByKey($scope.clientes, newSortingOrder);

        if ($scope.reverse){

            console.log($scope.reverse);
            people = sortByKey(people, newSortingOrder).reverse();
            
        }
  

        $scope.clientes = people

        $scope.search()





        // icon setup
        $('th i').each(function(){
            // icon reset
            $(this).removeClass().addClass('icon-sort');
        });
        if ($scope.reverse)
            $('th.'+newSortingOrder+' i').removeClass().addClass('icon-chevron-up');
        else
            $('th.'+newSortingOrder+' i').removeClass().addClass('icon-chevron-down');
    
    };


     $scope.search = function () {
    
 
        var output = {};

        console.log($filter('filter')($scope.clientes,$scope.tipo))

        obj = $filter('filter')($scope.clientes,$scope.tipo)

        $scope.contador = ObjectLength(obj)


        $scope.filteredItems = $filter('filter')($scope.clientes,$scope.tipo);
        $scope.currentPage = 0;

        $scope.groupToPages();

    };

    function ObjectLength( object ) {
    var length = 0;
    for( var key in object ) {
        if( object.hasOwnProperty(key) ) {
            ++length;
        }
    }
    return length;
    };


    $scope.groupToPages = function () {

        console.log('Grupo')
        $scope.pagedItems = [];
        
        for (var i = 0; i < $scope.filteredItems.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
            } else {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
            }
        }
    };


    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };
    
    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
            $scope.currentPage++;
        }
    };
    
    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

    


}

