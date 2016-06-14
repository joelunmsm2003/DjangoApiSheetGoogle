function Todo($scope,$http,$cookies,$filter) {


    $scope.sortingOrder = sortingOrder;
    $scope.reverse = false;
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 100;
    $scope.pagedItems = [];
    $scope.currentPage = 0;

    $('.table-hover').hide()
    $('.loading').hide()
    $('#alertax').hide()


    $scope.Excel = function(index,objeto){

        var todo = $scope.filtro

        console.log(objeto)

        campaign = objeto['camp_id']
        costumer= $scope.agregar.valor

        console.log(costumer)

        fecha1=$scope.agregar.fecha1
        fecha2=$scope.agregar.fecha2

        fecha1=JSON.stringify(fecha1)
        fecha2=JSON.stringify(fecha2)
    
        fecha1 = fecha1.slice(1,100)
        fecha2 = fecha2.slice(1,100)

        fecha1=fecha1.split("-")

        anx= fecha1[0]
        
        mx=fecha1[1]
        dx=fecha1[2]

        dx=dx.split("T")
        dx=dx[0]
        
        fecha2=fecha2.split("-")

        any= fecha2[0]
        my=fecha2[1]
        dy=fecha2[2]

        dy=dy.split("T")

        dy=dy[0]

        hx=fecha1[2].split("T")[1].split(':')[0]
        mix=fecha1[2].split("T")[1].split(':')[1]
        sex=fecha1[2].split("T")[1].split(':')[2].split('.')
        sex=sex[0]
        
        hy=fecha2[2].split("T")[1].split(':')[0]
        miy=fecha2[2].split("T")[1].split(':')[1]
        sey=fecha2[2].split("T")[1].split(':')[2].split('.')
        sey=sey[0]

        
        window.location = 'http://localhost:8000/excell/'+anx+'/'+mx+'/'+dx+'/'+hx+'/'+mix+'/'+sex+'/'+any+'/'+my+'/'+dy+'/'+hy+'/'+miy+'/'+sey+'/'+campaign+'/'+costumer;
        
    }




    
      $scope.Query = function(){


        $('.table-hover').hide()
        $scope.clientes = ""
        $('.loading').show()
        $('#alertax').hide()
        $scope.agregar.elemento = "costumer"

        var todo={

            numi: 1,
            dato: $scope.agregar,
            done:false
        }


        $http({
        url: "/resumen_sms/",
        data: todo,
        method: 'POST',
        headers: {
        'X-CSRFToken': $cookies['csrftoken']
        }
        }).
        success(function(data) {


            $scope.clientes =data['data']

            $scope.filtro =data['filtro']

            console.log('filtro',data['filtro'])


            if (ObjectLength($scope.clientes)==0){

            $scope.search()
            $('.table-hover').hide()
            $('.loading').hide()
            $('#alertax').show()


            }
            else{


            $scope.search()
            $('.table-hover').show()
            $('.loading').hide()


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

        console.log($scope.filteredItems)

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

