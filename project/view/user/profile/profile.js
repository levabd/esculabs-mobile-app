(function(){
    angular
        .module('app')
        .controller('profileController', profileController);

    profileController.$inject = ['$scope', '$rootScope', '$cordovaImagePicker', '$console', '$cordovaCamera'];

    function profileController($scope, $rootScope, $cordovaImagePicker, $console, $cordovaCamera) {

        var vm = this;

        var user = _.chain($rootScope.usersData)
            .find(function(userData){ return userData.username == $rootScope.globals.currentUser.username; })
            .value();

        vm.item = {
            first_name: '',
            last_name: '',
            post: '',
            hospital: {
                id: '',
                title: ''
            },
            hospitals_to_check: [
                {
                    id: '',
                    title: '',
                    check: false
                },
                {
                    id: '',
                    title: '',
                    check: false
                }
            ],
            preAvatar: null,
            avatar: null
        };

        vm.item = angular.copy(user);

        vm.saveUserData = function() {

            if($rootScope.item.hospital != "") {
                for (var i = 0; i < $rootScope.item.hospitals_to_check.length; i++) {
                    if($rootScope.item.hospital.title == $rootScope.item.hospitals_to_check[i].title) {
                        $rootScope.item.hospitals_to_check[i].check = true;
                    }
                    else {
                        $rootScope.item.hospitals_to_check[i].check = false;
                    }
                }
            }
            console.info('4: SAVE FUNCTION EXECUTE');
            for (var i = 0; i < $rootScope.usersData.length; i++) {
                if ($rootScope.usersData[i].username == $rootScope.globals.currentUser.username) {
                    $rootScope.usersData[i] = $rootScope.item;
                }
            }
            if($rootScope.patients) {
                for (var i = 0; i < $rootScope.patients.length; i++) {
                    for (var j = 0; j < $rootScope.item.hospitals_to_check.length; j++) {
                        if ($rootScope.patients[i].hospital.title == $rootScope.item.hospitals_to_check[j].title) {
                            $rootScope.patients[i].hospital.check = $rootScope.item.hospitals_to_check[j].check;
                        }
                    }
                }
            }
            alert('Profile saved');

        }

        $scope.dialogTemplates = {};

        vm.avatarTypeDialog = {
            show: function(){
                if (!$scope.dialogTemplates['view/user/profile/component/avatar-type-dialog-modal.html']) {
                    ons.createDialog('view/user/profile/component/avatar-type-dialog-modal.html', {parentScope: $scope}).then(function (dialog) {
                        $scope.dialogTemplates['view/user/profile/component/avatar-type-dialog-modal.html'] = dialog;
                        dialog.show();
                    });
                }
                else {
                    $scope.dialogTemplates['view/user/profile/component/avatar-type-dialog-modal.html'].show();
                }
            },
            select: function (type) {
                loadModal.show();
                if (type == 'camera') {
                    var options = {
                        quality: 50,
                        destinationType: Camera.DestinationType.DATA_URL,
                        sourceType: Camera.PictureSourceType.CAMERA,
                        allowEdit: true,
                        encodingType: Camera.EncodingType.JPEG,
                        popoverOptions: CameraPopoverOptions,
                        saveToPhotoAlbum: false,
                        correctOrientation: true,
                        targetWidth: 400,
                        targetHeight: 400
                    };

                    $cordovaCamera.getPicture(options).then(function(imageData) {
                        $rootScope.item.preAvatar = "data:image/jpeg;base64," + imageData;
                        console.info('preAvatar PICTURE');
                        console.info(imageData);
                        navigate.pushPage('view/user/profile/imgCrop/imgCrop.html');
                    }, function(err) {
                        loadModal.hide();
                    });
                }

                if (type == 'gallery') {
                    $cordovaImagePicker.getPictures({
                        maximumImagesCount: 1,
                        quality: 60,
                        width: 400,
                        height: 400
                    })
                        .then(function (imageData) {
                            for (var i = 0; i < imageData.length; i++) {
                                console.log('Image URI: ' + imageData[i]);
                            }
                            console.log('there is must be imageData 1' + imageData);
                            if (imageData.length > 0) {
                                $rootScope.item.preAvatar = imageData[0];
                                navigate.pushPage('view/user/profile/imgCrop/imgCrop.html');
                            }
                            loadModal.hide();
                        }, function (error) {
                            console.log(error);
                            loadModal.hide();
                        });
                }
                avatarTypeDialog.hide();
            }
        };

        vm.init = function() {
            $console.instance('profileController');
        };

        vm.init();
    }
})();