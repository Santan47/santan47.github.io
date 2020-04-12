$(document).ready(function() {
    /*
     * Main variables
     */
    var content = [{
      title: "Hi! I'm Santan Kr. Sharma",
      desc: "Software Developer"
    }, {
      title: "About Me",
      desc: [
        "Hi , I am a software engineer at DronaHQ, I like Competitive programming and interested in web design and development. competitive programming increases my mathematical concepts and Algorithmic knowledge.I had spent the last five years developing my skills in the field of programming and web development.I like to contribute to open source project on " ,["<u><a href='https://github.com/Santan47'>Github</a></u>"], " It is a great platform to show your skill on live projects.Other then Technicals I am interested in playing badminton and writing poetries.".split("")
      ]
    },{
      title: "About My Role",
      desc: "My key responsibilities are to make responsive web and mobile applications from scratch coordinating with UI/UX designers, building reusable components in angular7 and API's in ASP.NET and ExpressJs, handling data in the back-end. Tech stack which we use are ExpressJs, C#, ASP.NET, Angular7, React, MySql, JavaScript, JQuery, HTML, CSS."
    }, {
      title: "Find Me On given Links",
      desc: [
        "I love working with people to do things bigger than I could accomplish alone. I’m motivated by big problems, and I think you’ve got some here that I can help solve.",["<br>"], "Click " ,["<u><a href='/santan47.github.io/asstes/santan-2.pdf'>Here</a></u>"], " to see my CV.".split("")
      ]
    }];


    var currentPage = 0;
    //generate content
    for (var i = 0; i < content.length; i++) {
      //split content letters to array
      for (var obj in content[i]) {
        //if string
        if (typeof content[i][obj] === "string") {
          content[i][obj] = content[i][obj].split("");
          continue;
        }
        //if array (grouped text)
        else if (typeof content[i][obj] === "object") {
          var toPush = [];
          for(var j = 0; j < content[i][obj].length; j++) {
            for(var k = 0; k < content[i][obj][j].length; k++) {
              toPush.push(content[i][obj][j][k]);
            }
          }
          content[i][obj] = toPush;
        }
      }
      //set text to 
      $("#segments").append("<div class=\"letters-wrap mutable\"><div class=\"soup-title\"></div><div class=\"soup-desc\"></div></div>");
      setText();
      //clone to data
      $("#segments").append("<div class=\"letters-wrap position-data\"><div class=\"soup-title\"></div><div class=\"soup-desc\"></div></div>");
      setText();
    }
    //initial arrangement
    arrangeCurrentPage();
    scrambleOthers();
    /*
     * Event handlers
     */
    $(window).resize(function() {
      arrangeCurrentPage();
      scrambleOthers();
    });
    $("#soup-prev").hide();
    $("#soup-prev").click(function() {
      $("#soup-next").show();
      currentPage--;
      if (currentPage === 0) {
        $("#soup-prev").hide();
        $(".main").removeClass("hide");
        $("#soup-next").attr('style', 'padding-left: 0px');
      }
      else{
        $("#soup-prev").attr('style', 'padding-right: 80px');
        $("#soup-next").attr('style', 'padding-left: 80px');
      }
      
      arrangeCurrentPage();
      scrambleOthers();
    });
    $("#soup-next").click(function() {
      $("#soup-prev").show();
      currentPage++;
      $(".main").addClass("hide");  
      if (currentPage === content.length - 1) {
        $("#soup-next").hide();
        $("#soup-prev").attr('style', 'padding-right: 0px');
      }
      else{
        $("#soup-prev").attr('style', 'padding-right: 80px');
        $("#soup-next").attr('style', 'padding-left: 80px');
      }

       
      arrangeCurrentPage();
      scrambleOthers();
    });
    /*
     * Functions
     */
    function arrangeCurrentPage() {
      for (var i = 0; i < content[currentPage].title.length; i++) {
        $(".mutable:eq(" + currentPage + ") > .soup-title > .letter").eq(i).css({
          left: $(".position-data:eq(" + currentPage + ") > .soup-title > .letter").eq(i).offset().left + "px",
          top: $(".position-data:eq(" + currentPage + ") > .soup-title > .letter").eq(i).offset().top + "px",
          color: "white",
          opacity:1,
          zIndex: 9001
        });
      }
      for (var i = 0; i < content[currentPage].desc.length; i++) {
        $(".mutable:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).css({
          left: $(".position-data:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).offset().left + "px",
          top: $(".position-data:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).offset().top + "px",
          color: "white",
          opacity:1,
          zIndex: 9001
        });
      }
    }
  
    function setText() {
      var j;
      for (j = 0; j < content[i].title.length; j++) {
        $(".soup-title").last().append("<span class=\"letter\">" + content[i].title[j] + "</span>");
      }
      for (j = 0; j < content[i].desc.length; j++) {
        $(".soup-desc").last().append("<span class=\"letter\">" + content[i].desc[j] + "</span>");
      }
    }
  
    function scrambleOthers() {
      for (var i = 0; i < content.length; i++) {
        //don't scramble currentPage
        if (currentPage === i)
          continue;
        var parts = [
          ["title", ".soup-title"],
          ["desc", ".soup-desc"]
        ];
        //apply to .title h1s and .desc ps
        for (var j = 0; j < parts.length; j++) {
          for (var k = 0; k < content[i][parts[j][0]].length; k++) {
            //define random position on screen
            var randLeft = Math.floor(Math.random() * $(window).width());
            var randTop = Math.floor(Math.random() * $(window).height());
            //defining boundaries
            var offset = $(".position-data").eq(currentPage).offset();
            var bounds = {
              left: offset.left,
              top: offset.top,
              right: $(window).width() - offset.left,
              bottom: $(window).height() - offset.top
            };
            var middleX = bounds.left + $(".position-data").eq(currentPage).width() / 2;
            var middleY = bounds.top + $(".position-data").eq(currentPage).height() / 2;
            //finally, apply all the scrambles
            $(".mutable:eq(" + i + ") > " + parts[j][1] + " > .letter").eq(k).css({
              left: randLeft,
              top: randTop,
              color: "#00FFFF",
              opacity: 0.3,
              zIndex: "initial"
            });
          }
        }
      }
    }
  });
