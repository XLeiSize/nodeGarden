function Node(graph){

    this.distance = Math.floor((Math.random() * 1.5)+0.5);
    this.graph = graph;
    this.graph.x = Math.floor((Math.random() * window.innerWidth)+1);
    this.graph.y = Math.floor((Math.random() * window.innerHeight)+1);
    this.graph.beginFill(0x00d094);
    this.graph.drawCircle(0, 0, 3);
    this.graph.endFill();
    this.nodes;

    this.direction = Math.floor((Math.random()*360)+1);

    this.move = function(){
        if(this.graph.x <= 0 || this.graph.x >= window.innerWidth || this.graph.y <= 0 || this.graph.y >= window.innerHeight){
            this.direction = Math.floor((Math.random()*360)-1);
        }
        this.graph.x += Math.sin(this.direction*Math.PI/180)*this.distance;
        this.graph.y += Math.cos(this.direction*Math.PI/180)*this.distance;
    }
    this.graph.interactive = true;
    this.graph.mousemove = function() {
        mouseData = renderer.plugins.interaction.mouse.global;
        var this = new Node(new PIXI.Graphics());
        this.graph.x =  mouseData.x;
        this.graph.y =  mouseData.y;
        stage.addChild(this.graph);
    };

};



var renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight);
renderer.backgroundColor = 0x00000;

document.body.appendChild(renderer.view);

var interactive = true;
var stage = new PIXI.Container(interactive);
var nodes = [];

var lines = new PIXI.Graphics();
var drawLineDistance = 100;

stage.addChild(lines);

for (var i = 0; i < 500; i++ ){
    var node = new Node(new PIXI.Graphics());
    stage.addChild(node.graph);
    nodes.push(node);
};


function animate(){
    requestAnimationFrame(animate);
    lines.clear();
    for (var i = 0; i <= nodes.length - 1; i++) {
        nodes[i].move();
        for (var j = 0; j <= nodes.length - 1; j++) {
            if(!(nodes[i] == nodes[j])) {
                var dx = nodes[i].graph.x - nodes[j].graph.x;
                var dy = nodes[i].graph.y - nodes[j].graph.y;
                var distance = Math.sqrt(( dx * dx ) + ( dy * dy ));
                if (distance < drawLineDistance) {
                    lines.lineStyle(4, 0x00d094, ((drawLineDistance - distance) / distance));
                    lines.moveTo(nodes[i].graph.x, nodes[i].graph.y);
                    lines.lineTo(nodes[j].graph.x, nodes[j].graph.y);
                }
            }
        }
    }

    renderer.render(stage);
}

animate();