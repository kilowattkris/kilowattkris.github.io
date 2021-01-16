var blocks = [
	{
		"id" : "learn",
		"icon" : "",
		"img" : "images/learn.jpg",
		"text" : "",
		"number" : 0,
		"interacts" : "",
		"backgroundColor" : ""
	},
	{
		"id" : "about",
		"icon" : "8",
		"img" : "",
		"text" : "Profile",
		"number" : 1,
		"interacts" : "learn",
		"backgroundColor" : "violet"
	},
	{
		"id" : "work",
		"icon" : "w",
		"img" : "",
		"text" : "Work",
		"number" : 2,
		"interacts" : "palmtree",
		"backgroundColor" : "light-teal"
	},
	{
		"id" : "palmtree",
		"icon" : "",
		"img" : "images/palmtree.jpg",
		"text" : "",
		"number" : 3,
		"interacts" : "",
		"backgroundColor" : ""
	},
	{
		"id" : "education",
		"icon" : "l",
		"img" : "",
		"text" : "Education",
		"number" : 4,
		"interacts" : "palmtree",
		"backgroundColor" : "grey"
	},
	{
		"id" : "bear",
		"icon" : "",
		"img" : "images/bear.jpg",
		"text" : "",
		"number" : 5,
		"interacts" : "",
		"backgroundColor" : ""
	},
	{
		"id" : "nameFirst",
		"icon" : "",
		"img" : "",
		"text" : "Kristine",
		"number" : 6,
		"interacts" : "",
		"backgroundColor" : "dark-grey"
	},
	{
		"id" : "me",
		"icon" : "",
		"img" : "images/me.jpg",
		"text" : "",
		"number" : 7,
		"interacts" : "",
		"backgroundColor" : ""
	},
	{
		"id" : "nameLast",
		"icon" : "",
		"img" : "",
		"text" : "Tomlinson",
		"number" : 8,
		"interacts" : "",
		"backgroundColor" : "dark-grey"
	},
	{
		"id" : "life",
		"icon" : "",
		"img" : "images/life.jpg",
		"text" : "",
		"number" : 9,
		"interacts" : "",
		"backgroundColor" : ""
	},
	{
		"id" : "quals",
		"icon" : ")",
		"img" : "",
		"text" : "Projects",
		"number" : 10,
		"interacts" : "board",
		"backgroundColor" : "light-grey"
	},
	{
		"id" : "board",
		"icon" : "",
		"img" : "images/board.jpg",
		"text" : "",
		"number" : 11,
		"interacts" : "",
		"backgroundColor" : ""
	},
	{
		"id" : "awards",
		"icon" : "b",
		"img" : "",
		"text" : "Skills",
		"number" : 12,
		"interacts" : "board",
		"backgroundColor" : "light-violet"
	},
	{
		"id" : "contact",
		"icon" : "e",
		"img" : "",
		"text" : "Contact",
		"number" : 13,
		"interacts" : "explore",
		"backgroundColor" : "teal"
	},
	{
		"id" : "explore",
		"icon" : "",
		"img" : "images/explore.jpg",
		"text" : "",
		"number" : 14,
		"interacts" : "",
		"backgroundColor" : ""
	}
];

var viewModel;

var block_model = function(data){
	var self = this;
	ko.mapping.fromJS(data, {}, self);
}

var resume_model = function(){
	var self = this;
	self.blocks = ko.observableArray();
	self.width = ko.observable(window.innerWidth);
	self.height = ko.observable(window.innerHeight);

	var touchMoving = false;

	for(var i = 0; i<blocks.length;i++){
		self.blocks.push(new block_model(blocks[i]));
	}

	self.touchNavigateToBlock = function(data, event){
		var obj = data;
		if(obj.interacts()){
			var offset = $('#'+obj.id()+'Block').offset().top;
			if(!touchMoving){
				$(window).scrollTop(offset);
				event.stopPropagation();
			}
			touchMoving = false;
		}
	}

	self.navigateToBlock = function(data, event){
		var obj = this;
		if(obj.interacts()){
			var offset = $('#'+obj.id()+'Block').offset().top;
			$(window).scrollTop(offset);
		}
	}

	self.expandBlock = function(obj){
		if(obj.interacts() && self.width() > 640){
			$("#"+obj.interacts()).addClass('hide');
			$("#"+obj.id()).addClass('grow');
		}
	}

	self.shrinkBlock = function(obj){
		// var obj = this;
		if(obj.interacts() && self.width() > 640){
			$("#"+obj.interacts()).removeClass('hide');
			$("#"+obj.id()).removeClass('grow');
		}
	}

	self.goHome = function(){
		$(window).scrollTop(0);
	}

	self.goToContact = function(){
		var offset = $('#contactBlock').offset().top;
		$(window).scrollTop(offset);
	}

    self.check_dimensions = function(){
    	self.width(window.innerWidth);
    	self.height(window.innerHeight);
    }

    $(window).resize(function(){
    	self.check_dimensions();
    });

    $(window).bind('touchmove', function(event) {
    	touchMoving = true;
		self.check_dimensions();
		event.stopPropagation();
	}); 

	$(window).on('swipe', function(event) {
		event.preventDefault();
	}); 

	$(window).on('slide', function(event) {
		event.preventDefault();
	}); 

    self.hideCondensedContent = function(){
		var collapsibles = $('.condensed');
		for(var i = 0; i<collapsibles.length; i++){
			$('#'+collapsibles[i].id).children('.condensed-content').hide();
			$('#'+collapsibles[i].id).children('.condensed-controller').click(function(){
				if($(this).html() == '+'){
					$(this).siblings().next('div').slideDown(500);
					$(this).html('-');
				}
				else{
					$(this).siblings().next('div').slideUp(500);
					$(this).html('+');
				}
			});
		}
	}
}



//EVENT LISTENER TO INITIATE BEHAVIOURS
$(document).ready(function(){
	viewModel = new resume_model();
	ko.applyBindings(viewModel,document.getElementsByTagName('html')[0]);
	viewModel.hideCondensedContent();
});

$(window).on("load", function(){
	setTimeout(function(){
		// Hide the address bar!
		window.scrollTo(0, 1);
	}, 0);
	var loader = document.getElementById("loader");
	loader.style.opacity = "0";
	//Use delay so that you can see the fade before the loader is destroyed, KAPOW!
	var delay=500;//1 seconds
	setTimeout(function(){
		loader.style.display = "none";
	},delay);
});