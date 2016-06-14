

function Todo($scope,$http,$cookies,$filter) {


    numi = 1;
    $('.loader').hide()
    $( "#tablee" ).hide()

    var est = 0


    $scope.var1 = '123';
    $scope.ca ='btn btn-default';
    $scope.cd ='btn btn-default';
    $scope.cc ='btn btn-default';

    var x=document.getElementById("user");


    console.log(x.innerHTML)


    $scope.a=""
    $scope.b=""


    var ref= new Firebase("https://dazzling-torch-8501.firebaseio.com/");
    $scope.mydata= new Firebase("https://dazzling-torch-8501.firebaseio.com/");

    $scope.data = $firebaseObject(ref);

    $scope.Buscar = function(currentPage)
    {
        console.log('Buscando...')

        $scope.agregar.numi = 1
        $scope.clientes = ""
        numi = 1;

        console.log($scope.agregar.numi)
        $('.loader').show()
        $( "#tablee" ).hide()
        $( "#tablee" ).removeClass("animated flipInX");

        var todo={

            dato: $scope.agregar,
            done:false
        }
        
        $http({
        url: "/resumens/",
        data: todo,
        method: 'POST',
        headers: {
        'X-CSRFToken': $cookies['csrftoken']
        }
        }).
        success(function(data) {

        $scope.clientes = JSON.parse(data['data'])

        
        $scope.contador = JSON.parse(data['count'])


        $scope.search();
        $('.loader').hide()
        $( "#tablee" ).show()
       
        
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



    $scope.Save = function()
    {
        
         $scope.mydata.push({
         text: $scope.newa,
         user: x.innerHTML

    });

    var elmnt = document.getElementById("Chat");
    
    elmnt.scrollTop = elmnt.scrollTop+100;

    var chat = document.getElementById("textchat");
    chat.value=""

    }


    


    $scope.Sidebar = function()
    {
        
    var elmnt = document.getElementById("Chat");
    console.log(elmnt)
    
    elmnt.scrollTop = 5400;
    }


    $scope.sortingOrder = sortingOrder;
    $scope.reverse = false;
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 10000000;
    $scope.pagedItems = [];
    $scope.currentPage = 0;


    
    $http.get("/resumens").success(function(response) {$scope.clientes = response;

        $scope.search();
        
       
    });

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
        url: "/eventos/",
        data: todo,
        method: 'POST',
        headers: {
        'X-CSRFToken': $cookies['csrftoken']
        }
        }).
        success(function(data) {


        window.location.href = "/evento"
        
        $scope.agregar=""

        })


    };

    $scope.saveContact = function (idx,currentPage) {


        console.log('saveContact')
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
        $scope.pagedItems[currentPage][idx] = angular.copy($scope.model);
        console.log($scope.model)
      

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
        url: "/audiences/",
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
  
        $scope.filteredItems = $filter('filter')($scope.clientes,$scope.tipo);
        $scope.currentPage = 0;
        

       

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

    
    
    x=$('.cuerpo').height()
    document.getElementById("st-container").style.marginTop = "-"+toString(9)+"px";

}

