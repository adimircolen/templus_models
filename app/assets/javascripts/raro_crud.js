function new_record(id,name,model_name){
	model_name = name.split("[")
	class_name = model_name[0]
	model_name = model_name[model_name.length - 1].split("_id]")[0];
	
	$('#modal_new_record').attr("class","modal inmodal")
	$('#modal_new_record').addClass(model_name);

	var model_target = "#modal_new_record." + model_name;
	
	var url = link_to("/crud/" + class_name + "/new.js", {"render": "modal", "attribute": model_name});
	var jqxhr = $.ajax(url)
	.done(function(result) {
		$(model_target).attr('data-source',id);
		$(model_target).attr('data-saved','false');
		$(model_target).on('hidden.bs.modal', function (e) {
			if($(model_target).attr('data-saved') == 'true'){
				var entity_desc = $(model_target).attr('data-entity-name')
				var entity_id   = $(model_target).attr('data-entity-id')
				$('#' + id).append($('<option>', {
					value: entity_id,
					text: entity_desc,
					selected: 'selected'
				}));
				if($('#' + id).hasClass("chosen")){
					$('#' + id).trigger("chosen:updated");
				}
				$(model_target).attr('data-saved','false');
				$(model_target).attr('data-entity-name','')
				$(model_target).attr('data-entity-id','')
			}
		})
		$(model_target + ' .modal-body').html(result);
		$(model_target).modal('show');
		$('.modal-backdrop').appendTo("body");
		if(window.hasOwnProperty("atualiza_campos_crud")){
			atualiza_campos_crud();
		}
	});
}