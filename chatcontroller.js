var app = angular.module('chatApp', []);
app.factory('chatappService', ['$q','$http', function($q, $http){
	return {
		sendMessage: function(payload) {
			var defer = $q.defer()
			$http({
    			method: 'POST',
    			url: 'https://api.api.ai/v1/query?v=20150910',
    			data: payload,
    			headers: { 'Authorization': 'Bearer 5070eb7ff52241208f0f9af09019394a' }

			}).then( function (data, status, headers, config) {
				defer.resolve(data)
			})
			
			return defer.promise
		}
	}
}])
app.controller('chatCtrl', ['$scope','$http','chatappService', function($scope,$http,chatappService) {  
        $scope.messageList = [{message:'', done:false}];

	$scope.sendMessage = function () {
		var payload = {
			query : $scope.message,
			sessionId : 1234567890,
			lang : 'en',
			
		}
		chatappService.sendMessage(payload).then(function (response) {
			// console.log(response.data.result)
			$scope.reply = response.data.result.fulfillment.speech ;
			$scope.replySub = response.data.result.fulfillment.messages ;
			console.log($scope.reply)
			console.log($scope.replySub)
			$scope.messageList.push({todoText:$scope.message, replyText:$scope.reply, done:false});
	        $scope.message = ""; 
	        $scope.reply = "" ;
			$scope.replySub = "";
		})
	}
	





}]);
