video="";
status="";
detector="";
sound="";

function preload(){
video = loadImage("baby.jpg");
sound = createVideo("alert_alarm.mp3");
}

function setup(){
canvas= createCanvas(500,400);
canvas.position(520,260);
}

function draw(){
image(video,0,0,500,400);

detector = ml5.objectDetector("cocossd", modelLoaded);

if(status != ""){
    if(objects.length > 0){
        for(i=0; i<objects.length; i++){
            percent= floor(objects[i].confidence*100);
            fill("#FF0000")
            noFill();
            stroke("#FF0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            text(objects[i].label +" " +percent+"%",objects[i].x,objects[i].y -5);

            if(objects[i].label == "person"){
                document.getElementById("detect").innerHTML= "Baby Detected";  
            } else{
                document.getElementById("detect").innerHTML= "Baby Not Detected";      
            }
        }
    }else{
sound.loop();
sound.volume(1);
sound.speed(1);
document.getElementById("detect").innerHTML= "Baby Not Detected";  
    }
}
}



function modelLoaded(){
    console.log("model loaded");
    status="true";
    document.getElementById("status").innerHTML= "Status: Objects Detecting";
    detector.detect(video, gotResult);

}

function gotResult(error,results){
    if(error){
        console.error(error);
    } else{
        console.log(results);
        document.getElementById("status").innerHTML="Status: Objects Detected";
        objects=results;


    }
}