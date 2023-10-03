app.controller("product-ctrl", function ($scope, $http) {
	var url = "/rest/products";
    var url1 = "/rest/categories";
    $scope.items = [];
    $scope.cates = [];
    $scope.form = {};

    var sweetalert = function (text) {
        Swal.fire({
            icon: "success",
            title: text,
            showConfirmButton: false,
            timer: 1500,
        });
    }
    
    $scope.initialize = function () {
        //load product
        $http.get(url).then(resp => {
            $scope.items = resp.data;
            $scope.items.forEach(item => {
                item.createDate = new Date(item.createDate);
            });
        }).catch(error => {
            console.log("Error", error);
        });
        //load categories
        $http.get(url1).then(resp => {
            $scope.cates = resp.data;
        }).catch(error => {
            console.log("Error", error);
        });
        

        $scope.form = {
            createDate: new Date(),
            price: 1,
            image: "null",
            available: true,
        };
        $scope.isDisabled = true;
    }
    //khoi dau
    $scope.initialize();
    
    //xoa form
    $scope.reset = function () {
        $scope.form = {
            createDate: new Date(),
            price: 1,
            image: "null",
            available: true,
        };
    	$scope.isDisabled = false;
    }
    //hien thi len form
    $scope.edit = function (item) {
        $scope.form = angular.copy(item);
        $(".nav-tabs a:eq(0)").tab('show');
    	$scope.isDisabled = true;
    }
    //them sp moi
    $scope.create = function () {
        var item = angular.copy($scope.form);
        $http.post(`${url}`, item).then(resp => {
            $scope.items.push(resp.data);
            $scope.reset();
            $(".nav-tabs a:eq(1)").tab('show');
            sweetalert("Thêm mới thành công!");
        }).catch(error => {
        	sweetalert("Lỗi thêm mới sản phẩm!");
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
            sweetalert("Cập nhật sản phẩm thành công!");
        }).catch(error => {
        	sweetalert("Lỗi cập nhật sản phẩm!");
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
            sweetalert("Xóa sản phẩm thành công!");
        }).catch(error => {
        	sweetalert("Lỗi xóa sản phẩm!");
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