app.controller('groupControl',function($scope,$http){
	$http.get('http://localhost:3000/load').success(function(data){    
		$scope.group_infos=data;
	});
	$scope.deleteItems = function(data){
		var index = $scope.group_infos.indexOf(data);
		var data = $scope.group_infos[index];
		$http({
			url: '/delete', // No need of IP address
			method: 'POST',
			data: data,
			headers: {'Content-Type': 'application/json'}
		}).success(function(data){    
			$scope.group_infos=data;
		});
	}
	$scope.addItem = function(){
		var emptyCol = false;
		$('#addGroup').find('input').each(function (ind,ele){
			if($(this).val() == ''){
				emptyCol = true;
			}
			else{}
		});
		for(var i=0; i<$scope.group_infos.length; i++){
			if($scope.group_infos[i].GROUP_ID == $('#addGroup').find('input#group_name').val()){
				emptyCol = true;
			}
		}
		if(emptyCol){
			$('#addGroup').show();
			$('#addGroup').find('p#error').attr('style','display:block');
		}
		else{
			$('#addGroup').hide();
			$('div.fade').removeClass('modal-backdrop');
			var addedData = {
				GROUP_ID: $('#addGroup').find('input#group_name').val(),
				MEMBERS:  $('#addGroup').find('input#members_count').val(),
				AMOUNT: $('#addGroup').find('input#chit_amount').val(),
				DUE_AMOUNT: $('#addGroup').find('input#due_amount').val(),
				COMMISSION: $('#addGroup').find('input#commission').val(),
				START_DATE: $('#addGroup').find('input#start_date').val(),
				END_DATE: $('#addGroup').find('input#end_date').val(),
				DUE_DATE: $('#addGroup').find('input#due_date').val()
			}
		}
		$http({
			url: '/add', // No need of IP address
			method: 'POST',
			data: addedData,
			headers: {'Content-Type': 'application/json'}
		}).success(function(data){    
			$scope.group_infos=data;
		});

	}
	$scope.editWindow = function(data){
		var index = $scope.group_infos.indexOf(data);
		$('#editGroup').find('#index_number').val(index);
		$('#editGroup').find('#edit_group_name').val(data.GROUP_ID);
		$('#editGroup').find('#edit_members_count').val(data.MEMBERS);
		$('#editGroup').find('#edit_chit_amount').val(data.AMOUNT);
		$('#editGroup').find('#edit_due_amount').val(data.DUE_AMOUNT);
		$('#editGroup').find('#edit_commission').val(data.COMMISSION);
		$('#editGroup').find('#edit_start_date').val(data.START_DATE);
		$('#editGroup').find('#edit_end_date').val(data.END_DATE);
		$('#editGroup').find('#edit_due_date').val(data.DUE_DATE);
	}
	$scope.editItems = function(){
		var editedData = {
			originalID: $scope.group_infos[$('#editGroup').find('input#index_number').val()].GROUP_ID,
			GROUP_ID: $('#editGroup').find('input#edit_group_name').val(),
			MEMBERS: $('#editGroup').find('input#edit_members_count').val(),
			AMOUNT: $('#editGroup').find('input#edit_chit_amount').val(),
			DUE_AMOUNT: $('#editGroup').find('input#edit_due_amount').val(),
			COMMISSION: $('#editGroup').find('input#edit_commission').val(),
			START_DATE: $('#editGroup').find('input#edit_start_date').val(),
			END_DATE: $('#editGroup').find('input#edit_end_date').val(),
			DUE_DATE: $('#editGroup').find('input#edit_due_date').val()
		}
		$('#editGroup').hide();
		$('div.fade').removeClass('modal-backdrop');
		
		$http({
			url: '/edit', // No need of IP address
			method: 'POST',
			data: editedData,
			headers: {'Content-Type': 'application/json'}
		}).success(function(data){    
			$scope.group_infos=data;
		});
	}
	
});