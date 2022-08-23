
function OrganizationController ($scope, $http) {
    $scope.organizations = [];
    $scope.organizationsForm = {
        id : -1,
        fullName : "",
        shortName : "",
        supervisor : "",
        contactNumbers : ""};
    _refreshCustomerData();

    //HTTP POST/PUT methods for add/edit organizations
    // with the help of id, we are going to find out whether it is put or post operation

    $scope.submitOrganizations = function() {

        var method = "";
        var url = "";
        if ($scope.organizationsForm.id == -1) {
            $scope.organizationsForm.id = null
            $scope.organizationsForm.contactNumbers =$scope.organizationsForm.contactNumbers.split(",");
            method = "POST";
            url = 'http://localhost:8080/organizations/add';
        } else {
            $scope.organizationsForm.contactNumbers = $scope.organizationsForm.contactNumbers.split(",");
            method = "PUT";
            url = 'http://localhost:8080/organizations/update';
        }
        $http({
            method : method,
            url : url,
            data : angular.toJson($scope.organizationsForm),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then( _success, _error );
    };
    //HTTP DELETE- delete organization by Id
    $scope.deleteOrganization = function(organization) {
        $http({
            method : 'DELETE',
            url : 'http://localhost:8080/organizations/' + organization.id
        }).then(_success, _error);
    };

    // In case of edit, populate form fields and assign form.id with organization id
    $scope.editOrganization = function(organization) {
        $scope.organizationsForm.id = organization.id;
        $scope.organizationsForm.fullName = organization.fullName;
        $scope.organizationsForm.shortName = organization.shortName;
        $scope.organizationsForm.supervisor = organization.supervisor;
        $scope.organizationsForm.contactNumbers = organization.contactNumbers;

    };

    /* Private Methods */
    //HTTP GET- get all organizations collection
    function _refreshCustomerData() {
        $http({
            method : 'GET',
            url : 'http://localhost:8080/organizations'
        }).then(function successCallback(response) {
            $scope.organizations = response.data;
        }, function errorCallback(response) {
            console.log(response.statusText);
        });
    }

    function _success(response) {
        _refreshCustomerData();
        _clearFormData()
    }

    function _error(response) {
        console.log(response);
        alert($scope.error_message="Error! "+response.data.errorMessage+response.data.timestamp);

    }
    //Clear the form
    function _clearFormData() {
        $scope.organizationsForm.id = -1;
        $scope.organizationsForm.fullName = "";
        $scope.organizationsForm.shortName = "";
        $scope.organizationsForm.supervisor = "";
        $scope.organizationsForm.contactNumbers = ""};
};


