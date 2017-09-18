var username = "konpan1006@gmail.com"
var password = "orangepark9398!"

var casper = require('casper').create({
	verbose: true,
	logLevel: 'debug'

});
var x = require('casper').selectXPath;
casper.userAgent('Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)');


//opens instagram home page
casper.start('https://www.instagram.com/?hl=en', function(){
		this.echo(this.getTitle());
		});



//waits two seconds then clicks on 'Log In' link
casper.wait(2000, function(){
	this.click(x('//*[@id="react-root"]/section/main/article/div[2]/div[2]/p/a'));
});



//fills out form with user info and clicks log in
casper.then(function(){
	this.sendKeys('input[name=username]', 'konpan1006@gmail.com');
	this.sendKeys('input[name=password]', 'orangepark9398!');

	casper.click(x('//*[@id="react-root"]/section/main/article/div[2]/div[1]/div/form/span/button'));

});

//스크린샷 찍고 페이지 저장하기
casper.then(function(){
    console.log("save afterlogin.");
    this.wait(3000, function(){
      // After 6 seconds, this callback will be called, and then we will capture:
      this.capture('AfterLogin.png');
      //fs.write("./hello.html", this.getHTML(), "w")
    });
});

var hashtag = 'SKKU';
// Starting open instagram URL
casper.start('https://www.instagram.com/explore/tags/' + hashtag + '/');


casper.then(function(){
    console.log("save AfterSearch.");
    this.wait(1000, function(){
      // After 6 seconds, this callback will be called, and then we will capture:
      this.capture('AfterSearch.png');
      //fs.write("./hello.html", this.getHTML(), "w")
    });
});

// Get all link href for insta photos & Post.
// and added base instagram.com as base url
casper.then(function() {
	console.log("click load button");
	//var href = this.getElementsAttribute('a[href^="/explore/tags"]','href');

	this.clickLabel('더 읽어들이기','a');
	console.log("save AfterLoad after 5 seconds");
	this.wait(5000, function(){
      // After 6 seconds, this callback will be called, and then we will capture:
      this.capture('AfterLoad.png');
      //fs.write("./hello.html", this.getHTML(), "w")
    });
    this.wait(3000, function(){
      this.scrollToBottom();
    });
    this.wait(3000, function(){
      this.scrollToBottom();
    });
    this.wait(3000, function(){
      this.scrollToBottom();
    });
    /*this.wait(3000, function(){
      this.scrollToBottom();
    });*/
	console.log("get load more button");
});

function getTag(images){
	//var images = JSON.stringify(allSrc);
	var str = images.replace(/,|"|\.|\\n/gi," ");
    
    var start = 0;
    var end = 0;
    var finish = str.lastIndexOf(" ");
    var strArray = [];
    while(end < finish){
    	start = str.indexOf("#",end+1);
    	end = str.indexOf(" ", start+1);
    	if(end >= finish)
    		break;
    	tmp1 = str.indexOf("#",start+1);
    	if(tmp1 < end)
    		end = tmp1;
    	var sentence = str.substring(start, end);
    	var len = strArray.push(sentence);
    	if(len % 9 == 0){
    		casper.echo(strArray);
    		strArray = [];
    	}
    	start = end;
	}
	console.log(strArray);
}

//이미지 주소 받아오기
casper.then(function(){
	console.log("get tags");
	var num = 10;
	var currentLength = 0;
	for(var currentLength = 0; currentLength < 50; currentLength = currentLength + 9){
	    var images = this.evaluate(function(number){
	        console.log("start function");
	        var instaImages = document.getElementsByTagName('img');
	        var allSrc = [];
	        //var currentLength = instaImages.length;
	        //var str;
	        for(var i = number; i < number + 9; i++) {
	            if(instaImages[i].height >= 100 && instaImages[i].width >= 100){
	                allSrc.push(instaImages[i].alt);
	            }        	
	        }
	        return JSON.stringify(allSrc);
	    },{
	    	number : currentLength
	    });
	    getTag(images);
	}
    /*str = images.replace(/,|"|\.|\\n/gi," ");
    
    var start = 0;
    var end = 0;
    var finish = str.lastIndexOf(" ");
    var strArray = [];
    while(end < finish){
    	start = str.indexOf("#",end+1);
    	end = str.indexOf(" ", start+1);
    	if(end >= finish)
    		break;
    	tmp1 = str.indexOf("#",start+1);
    	if(tmp1 < end)
    		end = tmp1;
    	var sentence = str.substring(start, end);
    	var len = strArray.push(sentence);
    	if(len % 9 == 0){
    		casper.echo(strArray);
    		strArray = [];
    	}
    	start = end;
	}
	console.log(strArray);*/
})


//stores all the picture links in an array and opens each and likes them
/*casper.then(function(){


	//gets all the hrefs
    var links = this.getElementsAttribute("a", "href");
	links = links.slice(9, links.length);

	//for each href check to see if it is a valid photo
	this.each(links, function(self, link){
			
		
		if (link.indexOf('p/BP') != -1){
		//waits 60 seconds (to avoid instagram bot detection) then likes the photo
		casper.wait(60000, function(){

				//opens photo and likes and prints to console
				casper.open('https://www.instagram.com' + link + '?tagged=sandiego').then(function(){
			
				this.click("a[href='#']");
				this.echo('Liked ' + link) ;		
				

			});
			

		});
	}	

	});

});*/





casper.run();