function Todo($scope,$http,$cookies,$filter) {


    $scope.sortingOrder = sortingOrder;
    $scope.reverse = false;
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 100;
    $scope.pagedItems = [];
    $scope.currentPage = 0;

   
    $('.loading').hide()
    $('#alertax').hide()
    $('.table-hover').hide()
    


    $('#sms').hide()
    $('#voip').hide()


    $scope.Excel = function(index,objeto){

        cliente = objeto['costumer']
        mes = $scope.agregar['mes']
   
        window.location = 'http://xiencias.com:2000/excell/'+cliente+'/'+mes

    }

      $scope.Excel1 = function(index,objeto){

        cliente = objeto['costumer']
        mes = $scope.agregar['mes']
        camp = objeto['camp_id']
   
        window.location = 'http://xiencias.com:2000/excellvoip/'+cliente+'/'+mes+'/'+camp

    }




    
      $scope.Query = function(){

        $scope.clientes = ""
        $('.loading').show()
        $('#alertax').hide()
        $('.table-hover').hide()
        

        
        console.log('agregar',$scope.agregar)



        var todo={

            numi: 1,
            dato: $scope.agregar,
            done:false
        }


        console.log(todo)

        $http({
        url: "/resumen_sms/",
        data: todo,
        method: 'POST',
        headers: {
        'X-CSRFToken': $cookies['csrftoken']
        }
        }).
        success(function(data) {


            $scope.clientes =data

            $scope.filtro =data['filtro']

            console.log('data',data)


            if (ObjectLength($scope.clientes)==0){

            
            
            $('.loading').hide()

            }

            else{

            
            
            $('.loading').hide()
            $('.table-hover').show()
          


            }



        })

        $http({
        url: "/resumen_voip/",
        data: todo,
        method: 'POST',
        headers: {
        'X-CSRFToken': $cookies['csrftoken']
        }
        }).
        success(function(data) {


            console.log('datavoip',data)


            $scope.clientesvoip =data

            $scope.filtro =data['filtro']

            console.log('$scope.clientesvoip',$scope.clientesvoip)


            if (ObjectLength($scope.clientesvoip)==0){

          
           
            $('.loading').hide()
                   $('#sms').show()
            $('#voip').show()
     
          


            }
            else{


            $('.table-hover').show()
             $('#sms').show()
            $('#voip').show()
     
          
       
            


            }



        })


    }

    function ObjectLength( object ) {
    var length = 0;
    for( var key in object ) {
        if( object.hasOwnProperty(key) ) {
            ++length;
        }
    }
    return length;
    };




    $http.get("/costumers").success(function(response) {$scope.costumers = response;

        $scope.valores = $scope.costumers

 
    });

    $http.get("/campanias").success(function(response) {$scope.campanias = response;
 
    });

     $http.get("/audiences").success(function(response) {$scope.audiences = response;
 
    });

    $scope.Change = function () {

        console.log($scope.agregar.elemento)

        if ($scope.agregar.elemento == 'costumer'){

            $scope.valores = $scope.costumers

            console.log($scope.valores)
        }

        if ($scope.agregar.elemento == 'audience'){

            $scope.valores = $scope.audiences
        }

        if ($scope.agregar.elemento == 'campaign'){

            $scope.valores = $scope.campanias
        }
        

    };




    $scope.numberOfPages = function() 
    {

    return Math.ceil($scope.clientes.length / $scope.pageSize);
    
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

   

        $scope.filteredItems = $filter('filter')($scope.clientes,$scope.tipo);
        $scope.currentPage = 0;
        // now group by pages

       

        $scope.groupToPages();
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

