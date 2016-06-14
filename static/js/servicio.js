function Todo($scope,$http,$cookies,$filter) {


   var x=document.getElementById("user");

  

    $('.table').hide()



    $scope.a=""
    $scope.b=""



    $scope.Servicio = function(id){


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
    $scope.itemsPerPage = 200;
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

          
    });



    $scope.numberOfPages = function() 
    {

    return Math.ceil($scope.clientes.length / $scope.pageSize);
    
    };

        $scope.agregar={}

        $scope.agregar.Lu=true
        $scope.agregar.Ma=true
        $scope.agregar.Mi=true
        $scope.agregar.Ju=true
        $scope.agregar.Vi=true
        $scope.agregar.Sa=true
        $scope.agregar.Do=false

        $scope.agregar.inicio = '08:00'
        $scope.agregar.fin = '20:00'




     $scope.addServicio = function() 
    {

        

        var todo={

            add: "New",
            dato: $scope.agregar,
            done:false
        }

        console.log($scope.agregar)


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

        if (data == "error"){

                swal("Este servicio ya existe para este cliente")
                $('.gato').hide();


        }
        else{

            window.location.href = "/service"

        }

         

        


        $('#Agregar').modal('hide')
        $('.modal-backdrop').remove();
        $('.table-hover').show()

        })

    
    
    };




    $('#tog').change(function() {

      $scope.check = $(this).prop('checked')
      console.log($scope.check)
    
    })

    


    $scope.saveContact = function (idx,currentPage) {


        console.log('check',$scope.check)

        if ($scope.check== true){

            $scope.model.status = 1
        }
        else{
            $scope.model.status = 0

        }


        
        
        $scope.pagedItems[currentPage][idx] = $scope.model


        $scope.pagedItems[currentPage][idx] = angular.copy($scope.model)


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

        window.location.href = "/service"

        


        })


        
    };


    $scope.eliminarService = function (idx,currentPage) {


        $('#Eliminar').modal('hide')
        $('.modal-backdrop').remove();

        console.log('eliminar',$scope.pagedItems[currentPage])


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

   $http.get("/servicio").success(function(response) {$scope.clientes = response;

        $scope.search()    


    swal({   title: 'Servicio '+$scope.model.servicios__name+' '+$scope.model.costumers__short_name+' eliminado',   type: "success",  timer: 1000,   showConfirmButton: false });

     
      
       
    });



        })
    };


    $scope.editContact = function (contact,index,currentPage) {

        console.log('edit')        
        $scope.index = index;
        $scope.numberPage =currentPage;
        $scope.model = angular.copy(contact);

             

        if ($scope.model.status == 0){

            $('#tog').bootstrapToggle('off')
            

        }
        else{

            $('#tog').bootstrapToggle('on')

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

