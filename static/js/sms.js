

function Todo($scope,$http,$cookies,$filter) {


   var x=document.getElementById("user");

    $('.loading').show()

    $('.table').hide()



    $scope.a=""
    $scope.b=""


 

    setInterval(function(){ $scope.alerta(); }, 36000000);

   
    $scope.alerta = function(){

        sms ={}
        sms.numero = '980729169'
        sms.cliente = '1'
        sms.mensaje = 'Eugenio la plataforma Diloo no envia mensajes'

        var todo={

            dato: sms,
            done:false
        }


        $http({
        url: "/diloo/",
        data: todo,
        method: 'POST',
        headers: {
        'X-CSRFToken': $cookies['csrftoken']
        }
        }).

        success(function(data) {
        
     
        if (data['status_detail']=='Invalid Number'){

            


            }


        else{


            $http({
            url: "/email/",
            data: todo,
            method: 'GET',
            headers: {
            'X-CSRFToken': $cookies['csrftoken']
            }
            }).success(function(data) {
            })

            }

    })


    }


    $scope.Sms = function(sms,cliente){

        sms.api = 1

        console.log('cliente',cliente.id)


        console.log(sms)
        var todo={

            dato: sms,
            cliente:cliente.id,
            done:false
        }


        $http({
        url: "/dilooweb/",
        data: todo,
        method: 'POST',
        headers: {
        'X-CSRFToken': $cookies['csrftoken']
        }
        }).

        success(function(data) {


            console.log(data)


        
     
      

            swal({   
            title: "SMS Enviado!",   
            text: data,   
            type: "success",   confirmButtonText: 
            "Aceptar" 
            });


        

             $('.gato').hide()



        
       

    })


       

    }



     $scope.conteo = function(data){

        console.log('-----------',data.length)
        $scope.conteop = data.length
        $scope.contador = data.length

        if ($scope.contador > 160){

            $scope.conteop = $scope.contador -160



           
                 $( ".gato" ).remove();
            swal({   title: "Diloo",   text: ' Supero los 160 caracteres' ,   timer: 1500,   showConfirmButton: false });
             $( ".gato" ).remove();
        }



     }





    $scope.Servicio = function(id){


        $('.loading').show()
        $('.table-hover').hide()


        var todo={

            add: "View",
            dato: id,
            done:false
        }


        $http({
        url: "/servicio/",
        data: todo,
        method: 'POST',
        headers: {
        'X-CSRFToken': $cookies['csrftoken']
        }
        }).
        success(function(datax) {
        
     
        $scope.clientes = datax
        $scope.search()

        
        $('.table-hover').show()
        $('.loading').hide()


        })



    }




    $scope.sortingOrder = sortingOrder;
    $scope.reverse = false;
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 20;
    $scope.pagedItems = [];
    $scope.currentPage = 0;


    
    $http.get("/servicios").success(function(response) {$scope.servicios = response;

        
        $('.loading').hide()
   
    });

    $http.get("/servicio").success(function(response) {$scope.clientes = response;

        $scope.search()    
        $('.loading').hide()
        $('.table-hover').show()
    
      
       
    });

    $http.get("/costumers").success(function(response) {$scope.costumers = response;

        $scope.cliente= $scope.costumers[0]


        console.log('cliente',$scope.costumers[0])

          
    });



    $scope.numberOfPages = function() 
    {

    return Math.ceil($scope.clientes.length / $scope.pageSize);
    
    };

     $scope.addServicio = function() 
    {

        var todo={

            add: "New",
            dato: $scope.agregar,
            done:false
        }


        $http({
        url: "/servicio/",
        data: todo,
        method: 'POST',
        headers: {
        'X-CSRFToken': $cookies['csrftoken']
        }
        }).
        success(function(data) {
        
      
        console.log(data)


        $('#Agregar').modal('hide')
        $('.modal-backdrop').remove();
        $('.table-hover').show()

        })

    
    
    };

    


    $scope.saveContact = function (idx,currentPage) {


        console.log(idx)
        console.log($scope.model)
        console.log($scope.pagedItems[currentPage][idx])
        $scope.pagedItems[currentPage][idx] = $scope.model


        $scope.pagedItems[currentPage][idx] = angular.copy($scope.model)
 
        console.log('$scope.pagedItems[currentPage][idx]',$scope.pagedItems[currentPage][idx]['inicio'])

        idx=idx-1



        var todo={

            add: "Edit",
            dato: $scope.model,
            done:false
        }


        $http({
        url: "/servicio/",
        data: todo,
        method: 'POST',
        headers: {
        'X-CSRFToken': $cookies['csrftoken']
        }
        }).
        success(function(data) {

        $('#Edit').modal('hide')
        $('.modal-backdrop').remove();


        })


        
    };


    $scope.eliminarContact = function (idx,currentPage) {

        console.log('idx',idx)


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
        url: "/servicio/",
        data: todo,
        method: 'POST',
        headers: {
        'X-CSRFToken': $cookies['csrftoken']
        }
        }).
        success(function(data) {


        $scope.contador =$scope.contador-1


        })
    };

    $scope.editContact = function (contact,index,currentPage) {

        console.log('edit')        
        $scope.index = index;
        $scope.numberPage =currentPage;
        $scope.model = angular.copy(contact);   
        console.log('$scope.model',$scope.model);

    };


  $scope.sort_by = function(newSortingOrder,currentPage) {


         
        console.log(newSortingOrder)



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

        
        console.log('search')

        String.prototype.capitalizeFirstLetter = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
        }

 
        var output = {};

         

        for (i in $scope.clientes) {
  
            for (j in $scope.clientes[i]){

               if ($scope.clientes[i][j]){

                    $scope.clientes[i][j]=$scope.clientes[i][j].toString().capitalizeFirstLetter()
                   

                }

                

            }

        }

        obj = $filter('filter')($scope.clientes,$scope.tipo)

        $scope.contador = ObjectLength(obj)
       
        console.log($filter('filter')($scope.clientes,$scope.tipo))

        $scope.filteredItems = $filter('filter')($scope.clientes,$scope.tipo);
        $scope.currentPage = 0;
        // now group by pages

     

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

        $scope.pagedItems = [];
        
        for (var i = 0; i < $scope.filteredItems.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
            } else {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
            }
        }

        console.log('$scope.pagedItems',$scope.pagedItems)


            
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

    
    Todo.$inject = ['$scope', '$filter'];




}

