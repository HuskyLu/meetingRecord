function addPoint(){
	var point = $("#point")
	var content = $("#content")
	var length = point.children(".form-interval").length
	console.log(length)
	var div1 = pointDiv(length)
	point.append(div1)
	var div2 = contentDiv(length)
	content.append(div2)
}

function pointDiv(num){
	var div = '<div class="form-interval">'+
		'<label style="display:block;">主题<span class="glyphicon glyphicon-remove" style="color:red;float:right;" onclick="delPoint(' + num + ')"><span></label>'+
		'<input class="form-control" name="record[point]" type="text" placeholder="请输入主题内容" required>'+
	'</div>'
	return div
}

function contentDiv(num){
	var div = '<div class="form-interval">'+
		'<label>内容</label>'+
		'<textarea class="form-control" name="record[content]" type="text" placeholder="请输入内容" required></textarea>'+
	'</div>'
	return div
}

function delPoint(num){
	var point = $("#point")
	var content = $("#content")
	point.children(".form-interval")[num].remove()
	content.children(".form-interval")[num].remove()
}