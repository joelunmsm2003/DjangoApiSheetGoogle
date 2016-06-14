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
    $('#sms').hide()
    $('#voip').hide()
    $('#smsmes').hide()
    $('#smsmestotal').hide()
    $('#voipmestotal').hide()
    $('#voipmes').hide()
     $('#smsf').hide()

    

    $scope.Excel2 = function(index,objeto){


        console.log('excel',objeto)
        anio=$scope.agregar['anio']
        mes=$scope.agregar['mes']
        costumer = objeto['costumer']

        console.log('agregar',$scope.agregar)


        
        
        window.location = 'http://dilootu.com/excell2/'+costumer+'/'+mes+'/'+anio;
        
    }

    $scope.mestotal = function(){


        
        mes = $scope.agregar.mes
        anio = $scope.agregar.anio

        console.log('mes',$scope.agregar.mes)


       
        window.location = 'http://dilootu.com/smsmestotal/'+mes+'/'+anio;


    }

    $scope.voipmestotal = function(){


        
        mes = $scope.agregar.mes
        anio = $scope.agregar.anio

        console.log('mes',$scope.agregar.mes)


       
        window.location = 'http://dilootu.com/voipmestotal/'+mes+'/'+anio;


    }

    $scope.Excel3 = function(index,objeto){

        console.log('date',$scope.agregar)


        anio = $scope.agregar['anio']
        mes=$scope.agregar['mes']
        cliente = objeto['cliente']

        console.log('c',cliente)
       
        
        window.location = 'http://dilootu.com/excell3/'+cliente+'/'+mes+'/'+anio;

    }

      $scope.Query = function(){

        $('#titu').show()
        $('.table-hover').hide()
        $scope.clientes = ""
        $('.loading').show()
        $('#alertax').hide()
        $('#smsf').hide()
        $('#sms').hide()
        $('#voip').hide()
        $('#smsmes').hide()
        $('#smsmestotal').show()
        $('#voipmestotal').show()

        
      

         
        if ($scope.agregar.mes == 1){
            $scope.agregar.mecito = 'Enero'
        }
        if ($scope.agregar.mes == 2){
            $scope.agregar.mecito = 'Febrero'   
        }        
        if ($scope.agregar.mes == 3){
            $scope.agregar.mecito = 'Marzo'
        }        
        if ($scope.agregar.mes == 4){
            $scope.agregar.mecito = 'Abril'
        }

        if ($scope.agregar.mes == 5){
            $scope.agregar.mecito = 'Mayo'
        }

        if ($scope.agregar.mes == 6){
            $scope.agregar.mecito = 'Junio'
        }

        if ($scope.agregar.mes == 7){
            $scope.agregar.mecito = 'Julio'
        }

        if ($scope.agregar.mes == 8){
            $scope.agregar.mecito = 'Agosto'
        }

        if ($scope.agregar.mes == 9){
            $scope.agregar.mecito = 'Setiembre'
        }

        if ($scope.agregar.mes == 10){
            $scope.agregar.mecito = 'Octubre'
        }

        if ($scope.agregar.mes == 11){
         $scope.agregar.mecito = 'Noviembre'   
        }

        if ($scope.agregar.mes == 12){
            $scope.agregar.mecito = 'Diciembre'
        }
      
        var todo={

            numi: 1,
            dato: $scope.agregar,
            done:false
        }


        $http({
        url: "/smsmes/",
        data: todo,
        method: 'POST',
        headers: {
        'X-CSRFToken': $cookies['csrftoken']
        }
        }).
        success(function(data) {

            $scope.clientes =data['filtro1']

            $scope.clientesmes =data['filtro2']

            console.log('$scope.clientesmes',$scope.clientesmes)

            if (ObjectLength($scope.clientesmes)==0){

            $scope.search()
          
            $('.loading').hide()

            }

            else{

            $scope.clientes=$scope.clientesmes
            
            $scope.search()
            $('.table-hover').show()
            $('.loading').hide()
            $('#sms').show()
            $('#voip').show()
            $('#smsmes').show()
            $('#smsf').show()

            }



        })


        



        $http({
        url: "/voipmes/",
        data: todo,
        method: 'POST',
        headers: {
        'X-CSRFToken': $cookies['csrftoken']
        }
        }).
        success(function(data) {


            $scope.clientesvoip =data['filtro1']

            $scope.voipmes =data['filtro2']

            console.log('$scope.voipmes',$scope.voipmes)

            if (ObjectLength($scope.voipmes)==0){

          
            $('.loading').hide()



            }
            else{

            $('.table-hover').show()
            $('.loading').hide()
            $('#sms').show()
            $('#voip').show()
            $('#smsmes').show()
            $('#smsf').show()
            $('#voipmes').show()

            


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
 
    });

    $http.get("/campanias").success(function(response) {$scope.campanias = response;
 
    });

     $http.get("/audiences").success(function(response) {$scope.audiences = response;
 
    });

    

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