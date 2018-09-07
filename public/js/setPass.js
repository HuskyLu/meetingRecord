$(function(){
	$('.reset').click(function(e){
		var target = $(e.target)
		var id = target.data('id')
		var tr = $('.user-id-' + id)
		$.ajax({
			type: 'POST',
			url: '/user/setPass',
			data:{"id":id}
		})
		.done(function(results){
			if (results.success === 1) {
				alert("已重置")
			}
		})
	})
	$('.delete').click(function(e){
		var target = $(e.target)
		var id = target.data('id')
		var tr = $('.user-id-' + id)
		$.ajax({
			type: 'DELETE',
			url: '/user/delete',
			dataType: 'json',
			data:{"id":id}
		})
		.done(function(results){
			if (results.success === 1) {
				alert("用户已删除")
				if (tr.length > 0) {
					tr.remove()
				}
			}
		})
	})
})