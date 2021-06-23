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
    background: 'rgb(210, 173, 151)'
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
var ground = Bodies.rectangle(650, 450, 1300, 10, options),
rightEdge = Bodies.rectangle(1290, 200, 30, 500, options),
leftEdge = Bodies.rectangle(10, 200, 30, 500, options)

// these static walls will not be rendered in this sprites example, see options
var stack = Composites.stack(450, 20, 10, 6, 0, 0, function(x, y) {
    if (Common.random() > 0.35) {
        return Bodies.rectangle(x, y, 20, 20, {
            render: {
                strokeStyle: '#ffffff',
                sprite: {
                    texture: 'images/pencil.png',
                    xScale: 0.5,
                    yScale: 0.5
                   
                }
            }
        });
    } else {
        return Bodies.circle(x, y, 20, {
            density: 0.0005,
            frictionAir: 0.06,
            restitution: 0.3,
            friction: 0.01,
            render: {
                sprite: {
                    texture: 'images/eraser.png',
                    xScale: 0.5,
                    yScale: 0.5,
                  
                }
            }
        });
    }
    });

// Creating walls as sprites
var leftWall =     Bodies.rectangle(200, 300, 10, 350, {
    isStatic:true,
    render: {
        sprite: {
            texture: 'images/wood.png',
            xScale: 0.2,
            yScale: 0.6,
          
        }
    }
}),
rightWall = Bodies.rectangle(1000, 300, 20, 300, {
    isStatic:true,
    render: {
        sprite: {
            texture: 'images/wood.png',
            xScale: 0.2,
            yScale: 0.6,
           
        }
    }
});

Composite.add(world, [stack, ground, rightEdge, leftEdge, leftWall, rightWall]);

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
