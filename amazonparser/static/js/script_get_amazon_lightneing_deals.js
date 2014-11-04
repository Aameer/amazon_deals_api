//http://www.amazon.com/gp/goldbox
lightning_deals_dict_final={}
counter = 1 //parseInt($('#dealCurrentPage').html())
outer_limit=parseInt($('#dealTotalPages').html())

get_item_details = function(lightning_deals_dict, inner_counter){
		console.log("inner_counter :");
		console.log(inner_counter);
		
		lightning_deals_dict['lightning_deals_dict_refrence_link '] = $($('.ulResized.pealdshoveler li')[inner_counter]).find('.prodimg a').attr('href');
		lightning_deals_dict['lightning_deals_product_img '] = $($('.ulResized.pealdshoveler li')[inner_counter]).find('.prodimg a img').attr('src');
		lightning_deals_dict['lightning_deals_product_price '] = $($('.ulResized.pealdshoveler li')[inner_counter]).find('.priceblock #dealDealPrice').text();
		lightning_deals_dict['lightning_deals_product_percent_off'] = $($('.ulResized.pealdshoveler li')[inner_counter]).find('.priceblock #dealPercentOff').text();
		
		//tile
		if($($('.ulResized.pealdshoveler li')[1]).find('#dealTeaser').attr('title')!= undefined){
			//timer content present
			lightning_deals_dict['lightning_deals_product_title'] = $($('.ulResized.pealdshoveler li')[inner_counter]).find('#dealTeaser').attr('title')
		}else{
			//timer content absent
			lightning_deals_dict['lightning_deals_product_title']=$($('.ulResized.pealdshoveler li')[0]).find('#dealTitle a').attr('title');	
		}

		//timer
		if(($($('.ulResized.pealdshoveler li')[inner_counter]).find('#timerContent').text().replace(/[\r\n]/g, ""))!= ""){
			//timer content present
			lightning_deals_dict['lightning_deals_product_deal_time'] = $($('.ulResized.pealdshoveler li')[inner_counter]).find('#timerContent').text().replace(/[\r\n]/g, "");
		}else{
			//timer content absent
			lightning_deals_dict['lightning_deals_product_deal_time'] = $($('.ulResized.pealdshoveler li')[inner_counter]).find('#dealStateContent').find('#dealTimeRemaining ').text().replace(/[\r\n]/g, "");
		}

		lightning_deals_dict['lightning_deals_timestamp_collected'] = Date();
		return lightning_deals_dict
}

while (counter <= outer_limit) {

    //counter =parseInt($('#dealCurrentPage').html())
    lightning_deals_dict_inner_loop={}
    //lightning_deals_dict={};
    inner_counter = 0;
    while ( inner_counter < $('.ulResized.pealdshoveler li').length) {

    	lightning_deals_dict={}
    	lightning_deals_dict = get_item_details(lightning_deals_dict, inner_counter);
		lightning_deals_dict_inner_loop[inner_counter]=lightning_deals_dict;
		//console.log('inner_counter incremented')
	    inner_counter = inner_counter + 1;
	    //console.log(inner_counter);
	    //console.log("lightning_deals_dict_inner_loop")
	    //console.log(lightning_deals_dict_inner_loop)
	}

	lightning_deals_dict_final[counter]=lightning_deals_dict_inner_loop;
	$('#rightShovelBg').trigger('click');
	console.log("outer counter------------------------------------------------------------->>>>>>>")
	console.log(counter)    
	counter = counter+1;
	// setTimeout(function(){
	// }, 3000);
    
}
data_to_be_sent = JSON.stringify(lightning_deals_dict_final)
ajaxOpts = {
		url:"localhost:8000/lightning_deals_view",
		crossDomain:true,
		//xhrFields: {withCredentials:true},
		type:'POST',
		data: data_to_be_sent,
		dataType:'json',
		success: {
			//do something
		},
		error: {
			//do something
		},
	};
	jQuery.ajax(ajaxOpts);
