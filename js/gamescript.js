var objtcreater=0;
var array=[];
var score=0;
var life=5;
var dspeed=20;
var enspees=12000;                              //set the duration of dragon
var levelupf=0;
var level=0;
var stopauto=false;
var boss=0;
var fireball=[];
var boss1helth=30;
function rightpress() {
    objtcreater++;
    if(objtcreater>25){
        createobject();
        objtcreater=0;
    }

    var f= parseInt($("#flam").css('left'))+dspeed;
    $("#flam").css("left",f);


    var l= parseInt($("#drag").css('left'))+dspeed;
    $("#drag").css("left",l);

}
var key=true;
$("html").keyup(function () {
    stopAudio();
    $("#flam").css("visibility" ,"hidden");
   key=false;
});

function autoremovea() {

    if(life<0){

        alert("game over score="+score);
        location.reload();

    }

    for(var x=0 ;x<array.length;x++){
        // console.log(x);
        var y=array[x];
        var tp=parseInt($(y).css("top"));
        // console.log(tp);
        if (tp>720){

            $(y).remove();
            array.splice(x,1);
            tp=0;
            var v="life :"+life;
            $("#lf").text(v);
            life--;

            // console.log("lifes"+life);
        }
    }
}

function autoremoveboll() {



    for(var x=0 ;x<fireball.length;x++){
        // console.log(x);
        var y=fireball[x];
        var tp=parseInt($(y).css("top"));
        // console.log(tp);
        if (tp>720){

            $(y).remove();
            array.splice(x,1);



            // console.log("lifes"+life);
        }
    }
}
$("html").keydown(function(e){


    switch(e.keyCode){
        case 37:{
            setInterval(leftpress(),2);
            break;
        }
        case  39:{
            setInterval(rightpress(),2);
            break;
        }
        case 32:
            spacepress();
            break;
    }


});
function stopAudio(){
    //pause playing
    $("#audrg").trigger('pause');
    //set play time to 0
    $("#audrg").prop("currentTime",0);
}
function levelup() {

    if(levelupf>5){
        life++;
        var v="life :"+life;
        $("#lf").text(v);
        levelupf=0;
        level++;
        $("#level").text("Level :"+level);
        dspeed+=5;
        enspees-=500;                           // reduce the animation time of small dragon
        if(level==7){
            stopauto=true;
            boss=1;
            boss1();
            // console.log("boss comming");
        }
    }
}

setInterval(levelup,1000);
setInterval(createobject,1500);

setInterval(autoremoveboll,200);
setInterval(autoremovea,100);

function spacepress() {

if(boss==0){
    $("#audrg").trigger('play');


    $("#flam").css("visibility" ,"visible");
    var drgnlft=$("#drag").css("left");
    var drgnrite=$("#drag").css("right");

    for(var i=0 ;i<array.length;i++){
        var ob=array[i];

        var imdlft=$(ob).css("left");
        var imdright=$(ob).css("right");


        if(parseInt(drgnlft)<parseInt(imdlft)){


            if((parseInt(imdlft)-parseInt(drgnlft))<100){
                // console.log("left");
                $(ob).remove();
                array.splice(i,1);
                levelupf++;
                score++;
                var val="Score :"+score;
                $("#scr").text(val);
            }
            else{}
        }else{
            if((parseInt(imdright)-parseInt(drgnrite))<300){

                score++;
                levelupf++;
                $(ob).remove();
                array.splice(i,1);

                var val="Score :"+score;
                $("#scr").text(val);
            }else{}
        }


    }

}else if(boss==1){
    $("#flam").css("visibility" ,"visible");
    var drgnlft=parseInt($("#drag").css("left"));

    var boss1lft=parseInt($("#bossone").css("left"))+150;
    console.log("left"+drgnlft);
    console.log("bossleft"+boss1lft);
    if(Math.abs(drgnlft-boss1lft)<100){
        console.log("wadunoooo");
        boss1helth--;
        if(boss1helth<0){
            alert("you win");
        }
    }
}




}
function leftpress() {

    objtcreater++;
    if(objtcreater>25){
        createobject();
        objtcreater=0;
    }

    var fl=$("#flam");

    var f= parseInt($("#flam").css('left'))-dspeed;

    $("#flam").css("left",f);

    var img=$("#drag");

    var l= parseInt($("#drag").css('left'))-dspeed;

    $("#drag").css("left",l);

    if(key===false){
        // clearInterval(t1);
    }

}
function randomn() {
    var x = Math.floor((Math.random() * 10) + 1);
 return x;
}

function  createobject() {
    if(stopauto==false){

      ///////////////////////////////////////create automatic dragons//////////////////////////////////////////////////


        var i=randomn();
        var j=randomn();
        var s;

        switch (i){
            case 1||2:{
                s="../images/d1.gif";
                break;
            }
            case 3||4:{
                s="../images/d2.gif";
                break;
            }
            case 5||6:{
                s="../images/d3.gif";
                break;
            }
            case 7||8:{
                s="../images/d4.gif";
                break;
            }
            default:{
                s="../images/d3.gif";

            }
        }


        var o=$(".container-fluid").append("<div><img src="+s+"></div>");
        $('.container-fluid').children().last().children().first().css("width","100px");
        $('.container-fluid').children().last().children().first().css("padding","o");
        $('.container-fluid').children().last().children().first().css("margin","o");
        $('.container-fluid').children().last().children().first().css("height","auto");
        $('.container-fluid').children().last().children().first().css("position","absolute");
        $('.container-fluid').children().last().children().first().css("left",j*100);

        var top = $('.container-fluid').children().last().children().first().offset().top;  // Get the calculated top position

        $('.container-fluid').children().last().children().first().css({top:top})  // Set the top to its calculated position
            .animate({"top":"750px"}, {duration:enspees});                          //set animation durtion small dragon
        var ar=  $('.container-fluid').children().last().children().first();
        array.push(ar);                       // insert small dragon to array
        // console.log(array.toString());
    }


}
var previouspos=0;

function boss1() {

   setTimeout(function () {
       for(var x=0 ;x<array.length;x++){
           var y=array[x];
           $(y).remove();


       }
   },2000);

        var boss1pos;
        var o = $(".container-fluid").append("<div><img id='bossone' src='../images/main2.gif'></div>");
    $("#bossone").css("position","absolute");
    $("#bossone").css("padding","0");
    $("#bossone").css("margin","0");
    $("#bossone").css("width","300px");
    $("#bossone").css("heigth","auto");
    $("#bossone").css("top","0px");

    setInterval(function () {
        boss1pos=randomn();
        var diference=Math.abs(previouspos-boss1pos*100);

        var left= $("#bossone").offset().left;

        $("#bossone").css({left:left})
            .animate({"left":boss1pos*100},{duration:diference*10});
    previouspos=boss1pos;
// console.log(boss1pos);
    },3000);

    setInterval(function () {
        var bosspos=$("#bossone").css("left");
        var dragnbl=parseInt(bosspos)+100;

        var o=$(".container-fluid").append("<div><img src='../images/fireball.gif'></div>");
        $('.container-fluid').children().last().children().first().css("width","100px");
        $('.container-fluid').children().last().children().first().css("padding","o");
        $('.container-fluid').children().last().children().first().css("margin","o");
        $('.container-fluid').children().last().children().first().css("height","auto");
        $('.container-fluid').children().last().children().first().css("position","absolute");
        $('.container-fluid').children().last().children().first().css("top","100px");
        $('.container-fluid').children().last().children().first().css("left",dragnbl+'px');


        var left = $('.container-fluid').children().last().children().first().offset().left;  // Get the calculated top position

        $('.container-fluid').children().last().children().first().css({left:left})  // Set the top to its calculated position
            .animate({"top":"750px","left":$("#drag").css("left")}, {duration:4000});
        var ar=  $('.container-fluid').children().last().children().first();
        fireball.push(ar);
        firelook(ar);

    },1000);


}

function firelook(ar) {
      var iny=  setInterval(function () {
          var balltop=parseInt($(ar).css("top"));
          if(balltop!=750){
              var grnleft=parseInt($("#drag").css("left"));

              var ballleft=parseInt($(ar).css("left"));
              if(balltop>650 && Math.abs(grnleft+50-ballleft)<100){
                  console.log("ammooo");


                  life--;
                  var v="life :"+life;
                  $("#lf").text(v);
                  if(life<0){

                      alert("game over score="+score);
                      location.reload();

                  }
                  clearInterval(iny);
              }

          }

        },200)

}

