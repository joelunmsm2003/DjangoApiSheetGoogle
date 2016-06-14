

function Todo($scope,$http,$cookies,$filter) {

    $scope.var1 = '123';
    $scope.ca ='btn btn-default';
    $scope.cd ='btn btn-default';
    $scope.cc ='btn btn-default';


    
    $('.table').hide()
    $('.table-hover').hide()

    $scope.detalle = function(id) 
    {
        console.log(toString(id))
        console.log('IIIIII')
        window.location.href = "/eventovoipdetalle/"+id
    };





    $scope.a=""
    $scope.b=""



    $scope.sortingOrder = sortingOrder;
    $scope.reverse = false;
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 20;
    $scope.pagedItems = [];
    $scope.currentPage = 0;


    
    $http.get("/eventosvoip").success(function(response) {

        $scope.clientes = response;

        $scope.search();

       
        $('.table').show()
        $('.table-hover').show()
        $('.loading').hide()


   
       
    });

    $http.get("/costumers").success(function(response) {$scope.costumers = response;
 
    });

    $http.get("/campaniasVoip").success(function(response) {$scope.campanias = response;
 
    });

     $http.get("/audiences").success(function(response) {$scope.audiences = response;
 
    });


    $scope.numberOfPages = function() 
    {

    return Math.ceil($scope.clientes.length / $scope.pageSize);
    
    };

    $scope.cancelEvent = function (contact,index) {

        console.log('cancelar')        
        $scope.index = index;
        $scope.model = angular.copy(contact);   
        console.log($scope.model);


    };

    $scope.addNew=function(currentPage){

         $('#Agregar').modal('hide')
         $('.modal-backdrop').remove();


        console.log('New')

        console.log($scope.agregar)
        


        var todo={

            add: "New",
            dato: $scope.agregar,
            done:false
        }

        
        

        $http({
        url: "/eventosvoip/",
        data: todo,
        method: 'POST',
        headers: {
        'X-CSRFToken': $cookies['csrftoken']
        }
        }).
        success(function(data) {

        if (data=='No esta en este horario'){

            
            swal("Horario Restringido !", "El evento no se puede crear en este horario, cambie de horario")
        }
        else{

            window.location.href = "/eventovoipdetalle/"+data
            $scope.agregar=""
        }


        })


    };


   $scope.saveContact = function (idx,currentPage) {

        
        $scope.pagedItems[currentPage][idx] = angular.copy($scope.model);
        idx=idx-1


        var todo={

            add: "Edit",
            dato: $scope.model,
            done:false
        }


        $http({
        url: "/eventosvoip/",
        data: todo,
        method: 'POST',
        headers: {
        'X-CSRFToken': $cookies['csrftoken']
        }
        }).
        success(function(data) {

        })


        $('#Edit').modal('hide')
        $('.modal-backdrop').remove();


    };



    $scope.accion = function (contact,idx,currentPage) {
    
        $scope.model = angular.copy(contact);

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
        url: "/eventosvoip/",
        data: todo,
        method: 'POST',
        headers: {
        'X-CSRFToken': $cookies['csrftoken']
        }
        }).
        success(function(data) {


        console.log($scope.contador)
        $scope.contador = $scope.contador-1;

        


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

        
        

        String.prototype.capitalizeFirstLetter = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
        }

 
        var output = {};
        for (i in $scope.clientes) {
  
            for (j in $scope.clientes[i]){

                if ($scope.clientes[i][j]){

                    $scope.clientes[i][j]=$scope.clientes[i][j]
                    

                }

                

            }

        }

        obj = $filter('filter')($scope.clientes,$scope.tipo)

        $scope.contador = ObjectLength(obj)





   

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

