let canvas= document.getElementById("canvas");
let ctx = canvas.getContext("2d");
/*
console.log(canvas.width)
console.log(canvas.heigth)

console.log(window.innerWidth)
console.log(window.innerHeight)
*/

let prevousX,prevousY;
let optionSelected = 'firca';
let color = "black";
let size = "1";
let previousCanvasState;

const startedPoints =(e) =>{

  ctx.beginPath();

  previousCanvasState = ctx.getImageData(0,0,canvas.width,canvas.height);

    prevousX = e.offsetX;
    prevousY=e.offsetY;

    document.querySelector("#xAxisstart").innerText=e.offsetX;
    document.querySelector("#yAxisstart").innerText=e.offsetY;

    //console.log("mousedown") mouse tıklanınca tepki veriyor mu denemesi yaptık  

   
}

const startDrawing =(e) =>{

    if(e.buttons != 1) return;// mouse ile basılı tutunca hareketlensin istiyorum

    var rect = canvas.getBoundingClientRect();

    document.querySelector("#xAxis").innerText = e.offsetX;
    document.querySelector("#yAxis").innerText = e.offsetY;

    document.querySelector("#clientX").innerText = e.clientX;
    document.querySelector("#clientY").innerText = e.clientY;

    document.querySelector("#cleft").innerText = rect.left;
    document.querySelector("#ctop").innerText = rect.top;

    document.querySelector("#XX").innerText = e.clientX - rect.left;
    document.querySelector("#YY").innerText = e.clientY - rect.top;


console.log("option = ",optionSelected)
    
    if(optionSelected === "firca"){

    console.log("Firca");
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.stroke();

}
else if(optionSelected === "silgi"){
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = size;
    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.stroke();
}
else if(optionSelected === "kare"){

    ctx.putImageData(previousCanvasState,0,0);
    ctx.strokeStyle = color;
    ctx.strokeRect(e.offsetX,e.offsetY,prevousX - e.offsetX,prevousY-e.offsetY);
}
else if(optionSelected === "fillKare"){

    ctx.putImageData(previousCanvasState,0,0);
    ctx.fillStyle = color;
    ctx.fillRect(e.offsetX,e.offsetY,prevousX - e.offsetX,prevousY-e.offsetY);
}
else if(optionSelected === "cember"){

    ctx.putImageData(previousCanvasState,0,0);
    ctx.strokeStyle = color;
    let radius = Math.sqrt(Math.pow(prevousX-e.offsetX,2)+ Math.pow(prevousY-e.offsetY,2));
    ctx.arc(prevousX,prevousY,radius,0,2*Math.PI);
    ctx.stroke();

}
else if(optionSelected === "fillCember"){

    ctx.putImageData(previousCanvasState,0,0);
    ctx.fillStyle = color;
    let radius = Math.sqrt(Math.pow(prevousX-e.offsetX,2)+ Math.pow(prevousY-e.offsetY,2));
    ctx.arc(prevousX,prevousY,radius,0,2*Math.PI);
    ctx.fill();

}
else if(optionSelected === "ucgen"){
    ctx.putImageData(previousCanvasState, 0, 0);
    ctx.strokeStyle = color;
    let x1 = prevousX;
    let y1 = prevousY;

    let x2 = e.offsetX;
    let y2 = e.offsetY;
    let x3 = prevousX + (e.offsetX - prevousX) * 2;
    let y3 = prevousY;

    ctx.beginPath();
    ctx.moveTo(x1, y1);  // İlk köşe
    ctx.lineTo(x2, y2);  // İkinci köşe
    ctx.lineTo(x3, y3);  // Üçüncü köşe
    ctx.closePath();     // Üçgeni kapat
    ctx.stroke();        // Üçgeni çiz
}
else if(optionSelected === "fillUcgen"){
    ctx.putImageData(previousCanvasState, 0, 0);
    ctx.strokeStyle = color;
    let x1 = prevousX;
    let y1 = prevousY;

    let x2 = e.offsetX;
    let y2 = e.offsetY;
    let x3 = prevousX + (e.offsetX - prevousX) * 2;
    let y3 = prevousY;

    ctx.beginPath();
    ctx.moveTo(x1, y1);  // İlk köşe
    ctx.lineTo(x2, y2);  // İkinci köşe
    ctx.lineTo(x3, y3);  // Üçüncü köşe
    ctx.closePath();     // Üçgeni kapat
    ctx.fill();        // Üçgeni çiz
}



/*
    ctx.moveTo(0,0);
    ctx.lineTo(100,100);
    ctx.stroke();
*/

    //console.log("mouse move") mouse hareketlerini takip ettik deneme yaptık
}

const resize = () => {
    canvas.width = window.innerWidth-100;
    canvas.height = window.innerHeight-100;
};

resize();

//tıklandığında nesnenin seçilmesini ifade ediyor.
let alloptions = document.querySelectorAll(".tool_options .options");
alloptions.forEach((item) => {
    item.addEventListener("click",()=>{

        //seçilen nesnenin borderını değiştiriyo
        document.querySelectorAll(".tool_options .options").forEach((option)=>{
            option.classList.remove("active");
        });

        item.classList.add("active");

        //renk seçimi yapıyoruz
        if(item.id == "getColor"){
            item.addEventListener("input",()=>{
                color = document.querySelector("#optionColor").value;
                console.log(color);
            })
        }
        //fırça boyu seçimi yapıyoruz
        else if(item.id == "fircaBoyu"){
            item.addEventListener("change",()=>{
                size = document.querySelector("#selectOption").value;
                console.log(size);
            })
        }
        //reset atıyoruz
        else if(item.id== "reset"){
            ctx.clearRect(0,0,canvas.width,canvas.height);
    
        }
        //tüm canvası boyuyoruz
        if (item.id == "fillRect") {
            item.addEventListener("click", () => {
                let color = document.querySelector("#getColor input").value;
                ctx.fillStyle = color;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            });
        }


   
        optionSelected = item.id; // item seçtirip ona çizdiriyoruz.

        console.log(item.id); ///çalıştığını kontrol ettik
    })

    optionSelected = item.id;
})

window.addEventListener("resize",resize);

//mouse hareketlerinin belirlenmesi

canvas.addEventListener("mousedown",startedPoints);
canvas.addEventListener("mousemove",startDrawing)
    

