$(function() {

	// remove get parameter
	var urlToBe = location.href.replace(/[?][^#]*/, '');
	history.replaceState('', '', urlToBe);

	$('.dateinput').datepicker({
		monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
		dayNamesMin: ['日', '月', '火', '水', '木', '金', '土'],
		minDate: '-10y',
		maxDate: '+1y',
		firstDay: 0,
		hideIfNoPrevNext: false,
		dateFormat: 'yy/mm/dd'
	});

	$('#listTable thead tr th').click(function() {
		// 詳細レコードをソート対象から外すために、ソート処理の前に詳細レコードを削除する
		$('#listTable tbody .detailRecord').remove();
		$('.detailGuid').text('▼');
	});

	$('#listTable').tablesorter({
		headers: {
			8: {
				sorter: false
			},
		}
	});

	$('#listTable').searcher({
		inputSelector: '#tablesearchinput'
	});

	$('#tablesearchinput').keypress(function(ev) {
		if ((ev.which && ev.which === 13) || (ev.keyCode && ev.keyCode === 13)) {
			return false;
		}
		return true;
	});

	$('#tablesearchinput').focusin(function() {
		$('#listTable tbody .detailRecord').remove();
		$('.detailGuid').text('▼');
	});

	$('.popup_confirm').click(function() {
		var id = $(this).siblings('[name="project_id"]').val();
		var name = $('#project_name_' + id).text();
		return confirm(name + 'のプロジェクト情報を削除します。\n削除すると復元できません。\n削除してよろしいですか？');
	});

	$('#change_view').change(function() {
		$('#change_view').submit();
	});

	$('.detailToggle').click(function() {
		var project_id = $(this).data('project_id');

		if (!$('#detailRecord_' + project_id + '_clone td div').size()) {
			// 追加
			var detailRecord = $('#detailRecord_' + project_id).clone(true);
			detailRecord.attr('id', 'detailRecord_' + project_id + '_clone');
			var projectRecord = $('#projectRecord_' + project_id);
			detailRecord.insertAfter(projectRecord);
			// trにはアニメーションがかからないらしく、中身のdivでアニメする
			$('#detailRecord_' + project_id + '_clone td div').slideDown('normal');
			$('#detailGuid_' + project_id).text('▲');
		} else {
			// 削除
			$('#detailRecord_' + project_id + '_clone td div').slideUp('normal', function() {
				$('#detailRecord_' + project_id + '_clone').remove();
				$('#detailGuid_' + project_id).text('▼');
			});
		}
	});

	$('.popup_cancel').click(function() {
		history.back();
	});

	$('.deleteMember').click(function() {
		var project_id = $(this).data('project_id');
		$(this).parent().parent().remove();
	});

	$('.addMember').click(function() {
		var project_id = $(this).data('project_id');

		var tr = $('#memberRecordSrc_' + project_id).clone(true);
		tr.appendTo($('#editMemberTable_' + project_id + ' > tbody '));
	});

	$('.memberEditBtn').click(function() {
		var project_id = $(this).data('id');
		$('#memberMessage_' + project_id).text('');
	});

	$('.updateMember').click(function() {
		var project_id = $(this).data('project_id');
		var only_active = $('input[name=active_only]:checked').val();
		var member = '';
		var tr = $('#editMemberTable_' + project_id + ' > tbody > tr');
		for (var i = tr.length - 1; i >= 0; i--) {
			var employee_id = $(tr[i]).children('td').children('.memberSelect').val();
			if (employee_id === 0) {
				continue;
			}
			var leader_flag = $(tr[i]).children('td').children('.leaderSelect').val();
			member += employee_id + ',' + leader_flag + ',';
		}
		if (member.length > 0) {
			member = member.substr(0, member.length - 1);
		}
		var param = JSON.stringify({
			'project_id': project_id,
			'member': member
		});

		// HTMLに依存せずにformを作ってpostする
		//		var url = 'http://localhost:8080/resume/editMember';
		var url = '/tomcat/resume/editMember';
		var $form = $('<form/>', {
			'action': url,
			'method': 'post'
		});
		$form.append($('<input/>', {
			'type': 'hidden',
			'name': 'project_id',
			'value': project_id
		}));
		$form.append($('<input/>', {
			'type': 'hidden',
			'name': 'member',
			'value': member
		}));
		$form.append($('<input/>', {
			'type': 'hidden',
			'name': 'only_active',
			'value': only_active
		}));
		$form.appendTo(document.body);
		$form.submit();
	});

//    $('.fixedContent').scroll(function(){
//        $(\".hasDatepicker\").datepicker(\"hide\");
//    });

});
