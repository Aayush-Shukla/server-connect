
let canvas=document.getElementById('canvas')
let ctx=canvas.getContext('2d');

var tileset=new Image()
tileset.src='./tileset.png'

var index=0
var tilesize=32;
var tilerow=4;
var tilecol=4;
var maprow=10;
var mapcol=10;


var map={lvl:[
            10,4,0,6,6,6,6,6,6,6,
            3,0,5,6,6,3,4,4,4,0,
            5,5,5,3,0,1,4,4,0,5,
            5,5,5,5,1,4,4,4,7,5,
            5,1,7,5,3,0,6,6,5,5,
            5,3,2,1,2,1,0,6,5,5,
            5,1,4,4,4,4,2,3,7,5,
            5,3,4,4,4,4,4,2,5,1,
            2,5,6,6,6,6,3,0,1,4,
            6,1,4,4,4,4,2,1,4,15,
        ],
        rotation:[
            -1,-1,-1,-1,-1,-1,-1,-1,-1,2,
            -1,3,-1,-1,-1,-1,-1,-1,-1,-1,
            -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
            -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
            -1,1,-1,2,-1,-1,-1,-1,-1,-1,
            -1,-1,-1,-1,2,-1,-1,-1,-1,-1,
            -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
            -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
             2,1,-1,-1,3,-1,-1,-1,-1,-1,
            -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
        ],
    sol:[43,54,81]


}





var drawImage =function f() {

    ctx.clearRect(0,0,320,320)


    for (var r=0;r<maprow;r++){
        for (var c=0;c<mapcol;c++) {
            // console.log(map[10*r+c])
            var tile = map.lvl[10*r+c]

            var tileX = tile % tilecol
            var tileY = Math.floor(tile / tilecol)
            // console.log("hi")
            if (map.rotation[10*r+c]!=-1){
                ctx.save()
                ctx.translate(c*tilesize*2+tilesize,r*tilesize*2+tilesize)
                // ctx.rotate(map.rotation[10*r+c]*Math.PI/2)
                ctx.rotate(map.rotation[10*r+c]*Math.PI/2)
                ctx.translate(-(c*tilesize*2+tilesize),-(r*tilesize*2+tilesize))

                ctx.drawImage(tileset,(tilesize*tileX),(tileY*tilesize),tilesize,tilesize,(c*tilesize*2),(r*tilesize*2),tilesize*2,tilesize*2)
                ctx.restore()
                ctx.beginPath()
                ctx.strokeStyle='red'
                ctx.strokeRect((c*tilesize*2),(r*tilesize*2),tilesize*2,tilesize*2)

            }
            else {
                ctx.drawImage(tileset, (tilesize * tileX), (tileY * tilesize), tilesize, tilesize, (c * tilesize * 2), (r * tilesize * 2), tilesize * 2, tilesize * 2)
            }
        //
        }
    }

    // // console.log(run.src)
    // index++;
    // if(index>9){
    //     index=0
    // }
    if(map.sol.every(function(e){
        if (map.lvl[e]!=4 && map.lvl[e]!=5 ){
            return map.rotation[e] ==0}
        else {
            return (map.rotation[e] ==2 || map.rotation[e] ==0)
        }

    })){
        alert("win")
        clearInterval(loop)
    }
    // console.log(index)
}
tileset.onload = drawImage




var loop=setInterval(function () {
    drawImage()

},60)

document.addEventListener("click",rotate);

function rotate(e){

    for (var t=0;t<map.lvl.length;t++){
        if(map.rotation[t]!=-1) {
            var tileX = (t % mapcol)*tilesize*2
            var tileY = Math.floor(t / mapcol)*tilesize*2
            // console.log(map.rotation,e.clientX, e.clientY,t,tileX,tileY)

            if (e.clientX > tileX && e.clientX < (tileX + tilesize*2) && e.clientY > tileY && e.clientY < (tileY + tilesize*2)) {


                map.rotation[t]++
                if (map.rotation[t] > 3) {
                    map.rotation[t] = 0
                }
                console.log(map.rotation[t])

            }
        }

    }
}




