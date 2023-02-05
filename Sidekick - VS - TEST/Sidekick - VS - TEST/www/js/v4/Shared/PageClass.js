var AppPages = {};

var AppPage = (function () {
    this.id = '';
    this.pageName = '';
    this.validateNavigate = function () { return true; };
    this.beforeNavigate = function () { DoNothing(); };
    this.afterNavigate = function () { DoNothing(); };
    this.navigateBack = function () { DoNothing(); };
});

function DoNothing() {
}