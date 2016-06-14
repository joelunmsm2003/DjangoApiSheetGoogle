

function Todo($scope,$http,$cookies,$filter) {



    $('.table').hide()



    
    $scope.asignarproveedor = function(data){

        console.log(data)

        if(data == 4){

            $scope.proveedorx = 'Infobip'

        }

        if(data == 5){

            $scope.proveedorx = 'Telintel'         
        }

        if(data == 6){

            $scope.proveedorx = 'BulkSMS'
    
        }


    }

    $scope.asignar = function(data){

        console.log('pro',$scope.proveedor)

        
        $http.get("/proveedorasig/"+$scope.proveedor).success(function(response) {

                swal({   
                title: "Asignacion Masiva de Proveedor",      
                type: "success",     
                confirmButtonColor: "#3B529F",   
                confirmButtonText: "Aceptar",   
                text: 'Proveedor ' + $scope.proveedorx + ' asignado',
                closeOnConfirm: false,   
                closeOnCancel: false }, 

                function(isConfirm){   
                    if (isConfirm) {     
                        location.reload(true);   
                    } 
                   });

        });

    }



   


    $scope.a=""
    $scope.b=""

      $('#tog1').change(function() {

      $scope.check = $(this).prop('checked')
      console.log($scope.check)
    
    })


    $('#tog2').change(function() {

      $scope.check = $(this).prop('checked')
      console.log($scope.check)
    
    })







    $scope.Servicio = function(id){

        console.log('Servicio',id)

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
        success(function(data) {
        
        console.log('data',data)
        $scope.datos = data


        })



    }



    $scope.Sidebar = function()
    {
        
    console.log('jdjdjdj')
    var elmnt = document.getElementById("Chat");
    console.log(elmnt)
    
    elmnt.scrollTop = 5400;
    }

    $scope.sortingOrder = sortingOrder;
    $scope.reverse = false;
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 50;
    $scope.pagedItems = [];
    $scope.currentPage = 0;


    
    $http.get("/costumers").success(function(response) {$scope.clientes = response;

        
        $('.table').show()
        console.log('scope.cliente',$scope.clientes)

        $scope.search();

        
       
    });

    $http.get("/servicios").success(function(response) {$scope.servicios = response;

        
       
    });

    $http.get("/apis").success(function(response) {$scope.apis = response;

        
       
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

        })

    
    
    };

    
    $scope.addNew=function(currentPage){


        if ($scope.check== true){

            $scope.agregar.validacion = 1
        }
        else{
            $scope.agregar.validacion = 0

        }


         $('#Agregar').modal('hide')
         $('.modal-backdrop').remove().fadeIn(10000);

        $('.loading').show()
        $('.table').hide()


        var todo={

            add: "New",
            dato: $scope.agregar,
            done:false
        }


        $http({
        url: "/costumers/",
        data: todo,
        method: 'POST',
        headers: {
        'X-CSRFToken': $cookies['csrftoken']
        }
        }).
        success(function(data) {
        

        window.location.href = "/clientes"
      
        $scope.agregar="";

        })


    };

    $scope.saveContact = function (idx,currentPage) {



        console.log('check',$scope.check)

        if ($scope.check== true){

            $scope.model.validacion = 1
        }
        else{
            $scope.model.validacion = 0

        }

        
        $scope.pagedItems[currentPage][idx] = angular.copy($scope.model);
        idx=idx-1


        //$scope.pagedItems[currentPage].splice(0,1);

        var todo={

            add: "Edit",
            dato: $scope.model,
            done:false
        }


        $http({
        url: "/costumers/",
        data: todo,
        method: 'POST',
        headers: {
        'X-CSRFToken': $cookies['csrftoken']
        }
        }).
        success(function(data) {

            window.location.href = "/clientes"

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
        url: "/costumers/",
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
        console.log($scope.model);

        if ($scope.model.validacion == 0){

            $('#tog2').bootstrapToggle('off')
            

        }
        else{

            $('#tog2').bootstrapToggle('on')

        }


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

        obj = $filter('filter')($scope.clientes,$scope.tipo)

        $scope.contador = ObjectLength(obj)
       
        console.log($filter('filter')($scope.clientes,$scope.tipo))

        $scope.filteredItems = $filter('filter')($scope.clientes,$scope.tipo);
        $scope.currentPage = 0;
        // now group by pages

     
        console.log($scope.filteredItems)

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

    
    Todo.$inject = ['$scope', '$filter'];




}

