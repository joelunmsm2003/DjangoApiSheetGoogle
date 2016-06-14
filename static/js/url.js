function Todo($scope,$http,$cookies,$filter) {


    inicio = window.location.href.split("qr/")[1].split('/')[0]


    fin = window.location.href.split("qr/")[1].split('/')[1]

    console.log(inicio,fin)



    $scope.carga ='Generando codigos QR, Please wait ....'

    $http.get("/listaqr/"+inicio+'/'+fin).success(function(response) {

    $scope.urllista = response

    console.log($scope.urllista)

    $scope.carga =''

    })


}

