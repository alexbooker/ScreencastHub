app.controller('homeController', function ($scope, $http) {

  $scope.fetchNextPage = function() {
    console.log("Shit is happening, brah.");
  };

  $http.get('http://localhost:3000/screencasts/top/today').success(function (data) {
    $scope.screencasts = data;
  });

  $scope.fetchScreencasts = function () {
    $http.get('http://localhost:3000/screencasts/top/' + $scope.sortOption).success(function (data) {
      $scope.screencasts = data;
    });
  };
});
