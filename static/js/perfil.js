

function Todo($scope,$http,$cookies,$filter) {

    $scope.sortingOrder = sortingOrder;
    $scope.reverse = false;
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 20;
    $scope.pagedItems = [];
    $scope.currentPage = 0;


    document.getElementById('alerta').style.display='none'
    document.getElementById('alerta-1').style.display='none'

 
    $('.table').hide()


    
    $http.get("/perfiles").success(function(response) {$scope.clientes = response;

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

         

         console.log('newuser',$scope.agregar)


        var todo={

            add: "New",
            dato: $scope.agregar,
            done:false
        }


    

        $http({
        url: "/usuarios/",
        data: todo,
        method: 'POST',
        headers: {
        'X-CSRFToken': $cookies['csrftoken']
        }
        }).
        success(function(data) {

        console.log('data',data)

        if (data=="error"){

            swal("Ingrese otro correo, ya existe ")
            $('.gato').hide();
        }
        else{

            window.location.href = "/usuario"
            $scope.agregar=""

            $('#Agregar').modal('hide')
            $('.modal-backdrop').remove();

        }
        

      

        })


    };

    $scope.saveContact = function (idx,currentPage) {
  
        idx = $scope.model.index

        console.log('$scope.model',$scope.model)

        $scope.pagedItems[currentPage][idx] = angular.copy($scope.model);

        var todo={

            add: "Edit",
            dato: $scope.model,
            done:false
        }


        $http({
        url: "/usuarios/",
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

     $scope.Pass = function (model) {
  
    

        console.log('$scope.model',$scope.model)


        
        var todo={

            user:'cliente',
            dato: $scope.model,
            done:false
        }


        $http({
        url: "/changepass/",
        data: todo,
        method: 'POST',
        headers: {
        'X-CSRFToken': $cookies['csrftoken']
        }
        }).
        success(function(data) {

       swal("Password cambiado", "Gracias")

        })




        $('#Pass').modal('hide')
        $('.modal-backdrop').remove();
    };




    $scope.editContact = function (contact,index,currentPage) {

        
        
        $scope.numberPage =currentPage;
        $scope.model = angular.copy(contact);
        $scope.model.index = index;
        console.log('Edit Contacto');
     
        console.log(currentPage)   
        console.log($scope.model);

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
        url: "/usuarios/",
        data: todo,
        method: 'POST',
        headers: {
        'X-CSRFToken': $cookies['csrftoken']
        }
        }).
        success(function(data) {


        console.log(data);


        })
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

        
        console.log('search')

        String.prototype.capitalizeFirstLetter = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
        }

 
        var output = {};


        console.log($filter('filter')($scope.clientes,$scope.tipo))

        obj = $filter('filter')($scope.clientes,$scope.tipo)

        $scope.contador = ObjectLength(obj)

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

