var Engine = Matter.Engine,
Render = Matter.Render,
Runner = Matter.Runner,
Composites = Matter.Composites,
Common = Matter.Common,
MouseConstraint = Matter.MouseConstraint,
Mouse = Matter.Mouse,
Composite = Matter.Composite,
Bodies = Matter.Bodies;

// create engine
var engine = Engine.create(),
world = engine.world;

// create renderer
var render = Render.create({
element: document.body,
engine: engine,
options: {
    width: 1300,
    height: 450,
    wireframes: false,
    background: 'rgb(166, 217, 147)'
}
});

Render.run(render);

// create runner
var runner = Runner.create();
Runner.run(runner, engine);

// add bodies
options = { 
    isStatic: true
};

//Create ground, left and right edges
var ground = Bodies.rectangle(700, 440, 1400, 20, options),
rightEdge = Bodies.rectangle(1290, 200, 30, 500, options),
leftEdge = Bodies.rectangle(10, 200, 30, 500, options)

// Creating walls as sprites
var wall1 =  Bodies.rectangle(420, 260, 20, 350, {
    isStatic:true,
    render: {
        sprite: {
            texture: 'images/wood.png',
            xScale: 0.1,
            yScale: 0.8,
          
        }
    }
}),
wall2 =  Bodies.rectangle(820, 260, 20, 350, {
    isStatic:true,
    render: {
        sprite: {
            texture: 'images/wood.png',
            xScale: 0.1,
            yScale: 0.8,
          
        }
    }
});

// rackets and balls
var rackets = Composites.stack(450, 20, 6, 4, 0, 0, function(x, y) {
        return Bodies.rectangle(x, y, 60, 10, {
            render: {
                strokeStyle: '#ffffff',
                sprite: {
                    texture: 'images/racket.png',
                    xScale: 0.5,
                    yScale: 0.5
                   
                }
            }
        })
    });

var balls = Composites.stack(450, 20, 7, 4, 0, 0, function(x, y) {
        if (Common.random() > 0.5) {
            return Bodies.circle(x, y, 30, {
            density: 0.0005,
            frictionAir: 0.06,
            restitution: 0.8,
            friction: 0.01,
            render: {
                sprite: {
                    texture: 'images/rugby.png',
                    xScale: 0.3,
                    yScale: 0.3,
                }
            }
        })
    }
    else{
        return Bodies.circle(x, y, 20, {
                density: 0.0005,
                frictionAir: 0.06,
                restitution: 0.8,
                friction: 0.01,
                render: {
                    sprite: {
                        texture: 'images/football.png',
                        xScale: 0.1,
                        yScale: 0.1,
                    }
                }
        });
    }
    });


Composite.add(world, [rackets, balls, ground, rightEdge, leftEdge, wall1, wall2]);

// add mouse control
var mouse = Mouse.create(render.canvas),
mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});

Composite.add(world, mouseConstraint);


// keep the mouse in sync with rendering
render.mouse = mouse;
