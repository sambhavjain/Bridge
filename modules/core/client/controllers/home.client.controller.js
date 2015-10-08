'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
  }
]).controller('editCompanyProfileController', ['$scope','$timeout', '$window', 'Authentication','FileUploader', '$http', '$modal',
  function ($scope, $timeout, $window, Authentication, FileUploader, $http, $modal) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.editProfile = {firstName: '',bannerImageURL: ''};
    $scope.bannerimageURL = $scope.editProfile.bannerImageURL;
    $scope.showCreateModal = function () {

		$scope.createModal = $modal({
			scope: $scope,
			template: '/templates/modal.create.tpl.html',
			show: true
		});
  }
    $scope.editProfile = function() {
      $http.post('/api/core/editProfile' , $scope.editProfile).success(function(data){
          if(data.state == 'success'){
            console.log('in success state');
            $location.path('home.profile');
          }
      });
    }
    // Create file uploader instance
    $scope.uploader = new FileUploader({
      url: 'api/core/editBanner'
    });

    // Set file uploader image filter
    $scope.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    // Called after the user selected a new picture file
    $scope.uploader.onAfterAddingFile = function (fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            $scope.bannerimageURL = fileReaderEvent.target.result;
          }, 0);
        };
      }
    };

    // Called after the user has successfully uploaded a new picture
    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      // Show success message
      $scope.success = true;

      // Populate user object
      $scope.editProfile = Authentication.editProfile = response;

      // Clear upload buttons
    //  $scope.cancelUpload();
    };

    // Called after the user has failed to uploaded a new picture
    $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
      // Clear upload buttons
    //  $scope.cancelUpload();

      // Show error message
      $scope.error = response.message;
    };

    // Change user profile picture
    $scope.uploadBanner = function () {
      // Clear messages
      $scope.success = $scope.error = null;

      // Start upload
      $scope.uploader.uploadAll();
    };

}
]);
