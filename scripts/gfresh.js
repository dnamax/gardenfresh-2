var gFresh = {
	iPhoneUser: false,
	iPadUser: false,
	objData: {
		feature1: {
			img: '/img/feature1.jpg',
			text: '<h3>Kun Pao Eggplant</h3> Japanese eggplant with bell peppers, chili peppers and basic in spicy Szechuan sauce'
		},
		feature2: {
			img: '/img/feature2.jpg',
			text: '<h3>General\'s Veggie Chicken</h3> Crispy-fried soy chicken, sauteed with bell peppers and carrots in spicy sweet and sour sauce'
		},
		feature3: {
			img: '/img/feature3.jpg',
			text: '<h3>Basil Moo Shu Rolls</h3> Chilled, hand-rolled veggie wraps with a  bite of fresh basil '
		},
		robert: {
			img: '/img/joeragey.jpg',
			text: '<h3>Featured Art Exhibit</h3> Hosting a show of plein-air oil paintings by fine artist & designer Joe Ragey \'Carmel, Monterey and Beyond\', April 15 through June 17.'

		},
		yelp: {
			urls:'<h3>Yelp</h3><a href="http://www.yelp.com/biz/garden-fresh-palo-alto" target="_blank">yelp.com/biz/garden-fresh-palo-alto</a><a href="http://www.yelp.com/biz/garden-fresh-vegetarian-restaurant-mountain-view" target="_blank">yelp.com/biz/garden-fresh-mountain-view</a>'
		},
		order: {
                        urls:'<h3>Order</h3><a href="https://www.fluc.com/garden-fresh-ramona-st" target="_blank">Palo Alto</a><a href="https://www.fluc.com/garden-fresh-el-camino" target="_blank">Mountain View</a>'
                },
		facebook: {
			urls:'<h3>Facebook</h3><a href="http://www.facebook.com/pages/Palo-Alto-CA/Garden-Fresh-Palo-Alto/112879318727818" target="_blank">facebook.com/Garden-Fresh-Palo-Alto</a>'
		},
		twitter: {
			urls:'<h3>Twitter</h3><a href="http://twitter.com/garden_fresh" target="_blank">twitter.com/garden_fresh</a>'
		},
		foursquare: {
			urls:'<h3>Foursquare</h3><a href="http://foursquare.com/venue/1951487" target="_blank">foursquare.com/garden-fresh-palo-alto</a><a href="http://foursquare.com/venue/118182" target="_blank">foursquare.com/garden-fresh-mt-view</a>'
		}
	},
	init: function(){	
		var userAgent = window.navigator.appVersion
		if(userAgent.search('iPhone') > 0) 
			gFresh.iPhoneUser = true;
		if(userAgent.search('iPad') > 0)
			gFresh.iPadUser = true;
			
		$("#toTop").hide();
		$("#content").hide();
		$('#dish img').hide();
		$("#content article").hide();
		gFresh.loadImage('/img/logo.jpg', '#logo');
		
		gFresh.navBits();
		gFresh.socialNav();
		
		$('#dish img').load().each(function(i){
			if(i == ($('#dish img').length - 1)){
				$('#dish img:first').fadeIn();
				//delay for 10 seconds
				setTimeout(gFresh.startRotator, 10000);
			}	
		});
		gFresh.loadFeatured();
		gFresh.sendMessage();
	},
	loadFeatured: function(){
		var items = ['feature1', 'robert', 'feature3'];
		var image = $("#featured .image");
		var text = $("#featured .text");
		$(items).each(function(n, el){
			gFresh.loadImage(gFresh.objData[el].img, image[n]);
			$(text[n]).html(gFresh.objData[el].text)
		});

	},
	navClick: function(el){
		$(el).click(function(){
			$("nav li, #paloAlto div, #mtView div").removeClass('on')
			$(el).parent().addClass('on')
			gFresh.pageView(el)
			return false;
		});
	},
	navBits: function(){
		$("#paloAlto a, #mtView a").each(function(){
			gFresh.navClick($(this))
		})
		$("#navLinks a").each(function(n, el){
			gFresh.navClick($(el));
		});
		
		
			$("#navLinks .ordernow").bind('mouseenter', function(){
				$("#navLinks .ordernow a").html('Palo Alto Only!')
				if(gFresh.currentSocial)
					gFresh.popOver('close', gFresh.currentSocial);
					
				$("<div></div>")
					.addClass('orderoptions')
					.insertBefore($("#navLinks .ordernow a"))
			});
			$("#navLinks .ordernow").bind('mouseleave', function(){
				$("#navLinks .ordernow a").html('Order Now!')
				$('#navLinks .orderoptions').remove()
			})

		
		
		//Restaurant button mouseover toggle
		$('#paloAlto').bind('mouseenter mouseleave', function(){
			$(this).toggleClass('on')
		});
		$('#mtView').bind('mouseenter mouseleave', function(){
			$(this).toggleClass('on')
		});
		
		//Back to top button
		$("#toTop").click(function(){
			$('html, body').animate({scrollTop : 0}, 1000);
			$(this).hide()
			return false;
		})
		//shows the back to top button
		var doThis = function(){
			if($(window).scrollTop() > 280){
		    	$("#toTop").fadeTo("slow", 0.6);
				$(window).unbind('scroll');
				$(window).bind('scroll', function(){
					doThat()
				});
			}
		}
		//hides the back to top button
		var doThat = function(){
			if($(window).scrollTop() < 280){
				$("#toTop").fadeTo("slow", 0);
				$(window).unbind('scroll');
				$(window).bind('scroll', function(){
					doThis()
				});
			}
		}
		//bind the window scroll function for back to top but not on iphone or ipad
		if(!gFresh.iPadUser && !gFresh.iPhoneUser){
			$(window).bind('scroll', function(){
				doThis();
			});
		}
		
	},
	pageView: function(section){
		gFresh.animTime = 400;
		if(!$('#content').hasClass('open')){
			$('#content').addClass('open')
		}
		if(section.attr('name') == 'home'){
			$("#content").animate({"height":"0px"}, gFresh.animTime, function() {
			    $(this).hide();
			});
			$('#content').removeClass('open')
		}
		else if(section.attr('name') == 'ordernow'){
			window.location.href = 'http://www.snapfinger.com/apps/menu/6923'
		}
		else{
			var doThis = function(){
				$("#content article").hide();
				section = section.attr("name");
				$('#content').css({'position':'absolute','visibility':'hidden','display':'block'});
				$('#'+section).css({'position':'absolute','visibility':'hidden','display':'block'});
				optionHeight = $('#'+section).outerHeight();
				$('#'+section).css({'position':'static','visibility':'visible','display':'none'});
				$('#content').css({'position':'static','visibility':'visible','display':'none'});
				$("#content").animate({"height":optionHeight}, gFresh.animTime, 'linear');
				$('#'+section).fadeIn('fast');
			}
			
			if(section.attr('name') == 'paloAltoInfo'){
				gFresh.animTime = 1500;
				if($("#paloAltoInfoContent").length == 0){
					$.ajax({
					  url: 'paloAlto.html',
					  success: function(data) {
					    $('#paloAltoInfo').html(data);
					    doThis()
					  }
					});
				}
				else{
					doThis()
				}
				
			}
			else if(section.attr('name') == 'mtViewInfo'){
				gFresh.animTime = 1500;
				if($("#mtViewInfoContent").length == 0){
					$.ajax({
					  url: 'mtView.html',
					  success: function(data) {
					    $('#mtViewInfo').html(data);
					    doThis()
					  }
					});
				}
				else{
					doThis()
				}
			}
			else {
				doThis()
			}
			
		}
	},
	loadImage: function(img, imgParent){
		//append and fade in image after it loads
		$('<img />')
		    .attr('src', img)
			.css('opacity', 0)
		    .load(function(){
		        $(imgParent).append($(this));
		        $(this).animate({opacity: 1}, 500)
		    });
	},
	popOver: function(state, el){
		var src = $(el).attr('src');
		var sName = $(el).attr('name')
		switch(state){
			case 'open':
				$("<div></div>").addClass('popover').html(gFresh.objData[sName].urls).bind('mouseenter', function(){
					clearInterval(gFresh.timeout);
					src = src.replace('-def.png', '-on.png');
					el.attr('src', src);
				}).bind('mouseleave', function(){
					gFresh.timeout = setInterval("gFresh.popOver('close', gFresh.currentSocial)", 500);
				}).insertBefore(el)
				break;
				
			case 'close':
				$("div.popover").remove();
				clearInterval(gFresh.timeout)
				src = src.replace('-on.png', '-def.png');
				el.attr('src', src);
				break;
		}
	},
	socialNav: function(){
		$("#connect img").each(function(n, el){
			var src = $(el).attr('src');

			$(el).bind({
				mouseenter: function(){
					if(gFresh.currentSocial)
						gFresh.popOver('close', gFresh.currentSocial);
						
					$("div.popover").remove();
					
					gFresh.currentSocial = $(this);
					
					src = src.replace('-def.png', '-on.png');
					$(this).attr('src', src);
					clearInterval(gFresh.timeout)
					gFresh.popOver('open', $(this));
				},
				mouseleave: function(){
					//src = src.replace('.png', '-def.png');
					//$(this).attr('src', src);
					gFresh.timeout = setInterval("gFresh.popOver('close', gFresh.currentSocial)", 500)
				},
				click: function(){
					//alert('clicky')
				}
			})
		})
	},
	sendMessage: function(){
		$('form').submit(function() {
			var result = "Message sent!<br />" + $(this).serialize();
			$("<div></div>")
				.addClass("success")
				.html(result)
				.insertAfter($(this))
			
		  	//alert($(this).serialize());
			
		  	return false;
		});
	},
	//image rotator
	startRotator: function(){
		// to use:
		// <section id="dish">
		// 	<img src="food1.jpg" class="current" />
		// 	<img src="food2.jpg" />
		// 	<img src="food3.jpg" />
		// 	<img src="food4.jpg" />
		// 
		// 	<aside id="rotatorCtrl">
		// 		<a href="#" class="current">1</a>
		// 		<a href="#">2</a>
		// 		<a href="#">3</a>
		// 		<a href="#">4</a>
		// 	</aside>
		// </section>
		//check for defined image wrapper
		if(!$('#dish').length){
			return;
		}
		var showTime = 10000;
		var transTime = 1000;
		var pause = false;
		
		var rotate = function(img){
			if(pause){
				return;
			}
			
			//set next image and link
			var $nextImg = $(img).next('img').length ? $(img).next('img') : $('#dish img:first');
			var $nextReview = $('#reviewBlock div.current').next('div').length ? $('#reviewBlock div.current').next('div') : $('#reviewBlock div:first');
			
			$('#reviewBlock div.current').removeClass('current');
			$nextReview.addClass('current');
			//for timeout below
			var doIt = function(){
				rotate($nextImg)
			}
			
			$(img).fadeOut(transTime)
			$nextImg.fadeIn(transTime, function(){
				setTimeout(doIt, showTime);
			});
		}
		//hide all but first image
		//$('#dish img:first').siblings('img').hide();
		
		//start rotation
		rotate($('#dish img:first'));
	}
}
