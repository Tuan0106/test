app = angular.module("admin-app", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/account", {
            templateUrl: "/home/account/index.html",
            controller: "account-ctrl"
        })
        .when("/product", {
            templateUrl: "/home/product/index.html",
            controller: "product-ctrl"
        })
        .when("/category", {
            templateUrl: "/home/category/index.html",
            controller: "category-ctrl"
        })
        .when("/authorize", {
            templateUrl: "/home/authority/index.html",
            controller: "authority-ctrl"
        })
        .when("/unauthorized", {
            templateUrl: "/home/authority/unauthorized.html",
            controller: "authority-ctrl"
        })
        .otherwise({
            template:"<h1 class='text-center'>Java 6</h1>"
        });
});