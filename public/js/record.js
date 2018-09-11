$(function(){
	$('.delete').click(function(e){
		if (confirm("确定要删除记录")){
			var target = $(e.target)
			var id = target.data('id')
			var tr = $('.record-id-' + id)
			$.ajax({
				type: 'DELETE',
				url: '/record/delete',
				dataType: 'json',
				data:{"id":id}
			})
			.done(function(results){
				if (results.success === 1) {
					alert("记录已删除")
					if (tr.length > 0) {
						tr.remove()
					}
				}
			})
		}
	})
})