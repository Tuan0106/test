app.controller("account-ctrl", function ($scope, $http, $rootScope) {
    var url = "/rest/accounts";
    var url1 = "/rest/roles";
    $scope.roles = [];
    $scope.items = [];
    $scope.form = {};
    $scope.user;

    var sweetalert = function (text) {
        Swal.fire({
            icon: "success",
            title: text,
            showConfirmButton: false,
            timer: 1500,
        });
    }
    
    $scope.initialize = function () {
        //load account
        $http.get(url).then(resp => {
            $scope.items = resp.data;
        });
        //load roles
        $http.get(url1).then(resp => {
            $scope.roles = resp.data;
        });
    }
    
    //khoi dau
    $scope.initialize();

    //xoa form
    $scope.reset = function () {
        $scope.form = {};
    }

    //hien thi len form
    $scope.edit = function (item) {
        $scope.form = angular.copy(item);
        $(".nav-tabs a:eq(0)").tab('show');
    }

    //them sp moi
    $scope.create = function () {
        var item = angular.copy($scope.form);
        $http.post(`${url}`, item).then(resp => {
            resp.data.token = "token";
            $scope.items.push(resp.data);
            $scope.reset();
            $(".nav-tabs a:eq(1)").tab('show');
            sweetalert("Thêm mới thành công!");
        }).catch(error => {
        	sweetalert("Lỗi thêm mới tài khoản!");
            console.log("Error", error);
        });
    }

    //cap nhat sp
    $scope.update = function () {
        var item = angular.copy($scope.form);
        $http.put(`${url}/${item.id}`, item).then(resp => {
            var index = $scope.items.findIndex(p => p.id == item.id);
            $scope.items[index] = item;
            $scope.reset();
            $(".nav-tabs a:eq(1)").tab('show');
            sweetalert("Cập nhật tài khoản thành công!");
        }).catch(error => {
        	sweetalert("Lỗi cập nhật tài khoản!");
            console.log("Error", error);
        });
    }

    //xoa sp
    $scope.delete = function (item) {
        $http.delete(`${url}/${item.id}`).then(resp => {
            var index = $scope.items.findIndex(p => p.id == item.id);
            $scope.items.splice(index, 1);
            $scope.reset();
            $(".nav-tabs a:eq(1)").tab('show');
            sweetalert("Xóa tài khoản thành công!");
        }).catch(error => {
        	sweetalert("Lỗi xóa tài khoản!");
            console.log("Error", error);
        });
    }

    //phan trang
    $scope.pager = {
        page: 0,
        size: 10,
        get items() {
            var start = this.page * this.size;
            return $scope.items.slice(start, start + this.size);
        },
        get count() {
            return Math.ceil(1.0 * $scope.items.length / this.size)
        },
        first() {
            this.page = 0;
        },
        prev() {
            this.page--;
            if (this.page < 0) {
                this.last();
            }
        },
        next() {
            this.page++;
            if (this.page >= this.count) {
                this.first();
            }
        },
        last() {
            this.page = this.count - 1;
        }
    }

});