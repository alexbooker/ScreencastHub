app.controller('screencastsController', function($scope, $http, $stateParams, $window) {
  'use strict';

  console.log('screencastsController');
  function init() {
    $scope.page = 1;
    $scope.screencasts = [];
    $scope.hasMore = true;
    $scope.loaded = false;
    $scope.busy = false;
  }

  $scope.fetchScreencasts = function() {
    $scope.busy = true;

    var base = 'http://localhost:3000/screencasts';
    if ($stateParams.tagged !== '') {
      base += '/tagged/' + $stateParams.tagged + '/';
    }
    var url = base + '?page=' + $scope.page + '&sort=' + $scope.sortOption;
    $http.get(url).success(function(response) {
      // do not update the totalCount on every request in case a new screencast
      // is added
      if ($scope.page === 1) {
        $scope.totalCount = response.totalCount;
      }
      $scope.busy = false;
      $scope.page += 1;
      $scope.hasMore = response.hasMore;
      $scope.screencasts = $scope.screencasts.concat(response.screencasts);
      $scope.loaded = true;
    });
  };

  $scope.changeSortOption = function() {
    init();
    $scope.fetchScreencasts();
  };

  $scope.navigateTo = function (link) {
    $window.open(link);
  };

  init();

  $scope.sortOption = $stateParams.sort;

  $scope.tagged = $stateParams.tagged;

  $scope.fetchScreencasts();
});
