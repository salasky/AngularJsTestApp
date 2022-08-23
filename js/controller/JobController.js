
function JobController ($scope, $http) {
    $scope.jobs = [];
    $scope.jobForm = {
        id : -1,
        name : ""};
    _refreshCustomerData();

    //HTTP POST/PUT methods for add/edit job
    // with the help of id, we are going to find out whether it is put or post operation

    $scope.submitJob = function() {

        var method = "";
        var url = "";
        if ($scope.jobForm.id == -1) {
            //Id is absent in form data, it is create new job operation
            $scope.jobForm.id = null
            method = "POST";
            url = 'http://localhost:8080/jobs/add';
        } else {
            //Id is present in form data, it is edit job operation
            method = "PUT";
            url = 'http://localhost:8080/jobs/update';
        }
        $http({
            method : method,
            url : url,
            data : angular.toJson($scope.jobForm),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then( _success, _error );
    };
    //HTTP DELETE- delete job by Id
    $scope.deleteJob = function(job) {
        $http({
            method : 'DELETE',
            url : 'http://localhost:8080/jobs/' + job.id
        }).then(_success, _error);
    };

    // In case of edit, populate form fields and assign form.id with job id
    $scope.editJob = function(job) {
        $scope.jobForm.name = job.name;
        $scope.jobForm.id = job.id;
    };

    /* Private Methods */
    //HTTP GET- get all jobs collection
    function _refreshCustomerData() {
        $http({
            method : 'GET',
            url : 'http://localhost:8080/jobs'
        }).then(function successCallback(response) {
            $scope.jobs = response.data;
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
        $scope.jobForm.id = -1;
        $scope.jobForm.name = "";};

};


