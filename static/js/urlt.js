function Todo($scope,$http,$cookies,$filter) {


    

    var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
    };


   console.log('Detectecting.....')


    if( isMobile.Android() ) {

    urln = window.location.href.split("u/")[1].split("/")[0]

    $http.get("/url/"+urln).success(function(response) {

    $scope.url = response;

    location.href = $scope.url[0].android
       
    });

    }
    else {

    

    urln = window.location.href.split("u/")[1].split("/")[0]

    

    $http.get("/url/"+urln).success(function(response) {

    $scope.url = response;

    console.log('iphone',urln,$scope.url)

    location.href = $scope.url[0].iphone
       
    });


    }


    $http.get("/costumers").success(function(response) {

    $scope.cli=response

    console.log('hhhhh',$scope.cli)


    })

     $http.get("/urllista").success(function(response) {

    $scope.urllista=response

    })


       $scope.editurl = function (data) {

        $scope.edit=data


       }

         $scope.saveurl = function (data) {

            $('#Edit').modal('hide')
         $('.modal-backdrop').remove();


              $http({

        url: "/urledit/",
        data: data,
        method: 'POST',
        headers: {
        'X-CSRFToken': $cookies['csrftoken']
        }
        }).
        success(function(data) {


             swal({   title: "Diloo",   text: ' Editado' ,   timer: 1500,   showConfirmButton: false });
          

    $http.get("/urllista").success(function(response) {

    $scope.urllista=response

    })


    
        })



       }




    $scope.urlgenera = function (data) {


        console.log('urlgenra',data)


        $http({

        url: "/urlgenera/",
        data: data,
        method: 'POST',
        headers: {
        'X-CSRFToken': $cookies['csrftoken']
        }
        }).
        success(function(data) {


            $scope.model = ''


            swal("Agregado!", "Thanx :)", "success")

                  $http.get("/urllista").success(function(response) {

    $scope.urllista=response

    })


    
        })


    }




}

