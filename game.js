kaboom({
  global: true,
  fullscreen: true,
  scale: 2,
  debug: true,
  clearColor: [0, 0, 0, 1],
});

const MOVE_SPEED=120
const JUMP_FORCE=360

loadRoot("sprites/");
loadSprite("coin", "coin.png");
loadSprite("evil-shroom", "evil.png");
loadSprite("brick", "brick.png");
loadSprite("block", "block.png");
loadSprite("mario", "mario.png");
loadSprite("mushroom", "mushroom.png");
loadSprite("surprise", "surprise.png");
loadSprite("unboxed", "unboxed.png");
loadSprite("pipe-top-left", "pipe-top-left.png");
loadSprite("pipe-top-right", "pipe-top-right.png");
loadSprite("pipe-bottom-left", "pipe-bottom-left.png");
loadSprite("pipe-bottom-right", "pipe-bottom-right.png");
loadSprite("blue-block", "blue-block.png");
loadSprite("blue-brick", "blue-brick.png");
loadSprite("blue-steel", "blue-steel.png");
loadSprite("blue-evil-shroom", "blue-evil.png");
loadSprite("blue-surprise", "blue-surprise.png");

scene("game", () => {
  layers(["bg", "obj", "ui"], "obj");
  const map = [
    "                                     ",
    "                                     ",
    "                                     ",
    "                                     ",
    "                                     ",
    "       %   =*=%=                            ",
    "                                     ",
    "                          -+           ",
    "                    ^  ^  ()                             ",
    "==============================  ======",
  ];

  const levelCfg = {
    width: 20,
    height: 20,
    "=": [sprite("block"), solid()],
    '$': [sprite("coin")],
    "%": [sprite("surprise"), solid(), "coin-surprise"],
    "*": [sprite("surprise"), solid(), "mushroom-surprise"],
    "}": [sprite("unboxed"), solid()],
    "(": [sprite("pipe-bottom-left"), solid(), scale(0.5)],
    ")": [sprite("pipe-bottom-right"), solid(), scale(0.5)],
    "-": [sprite("pipe-top-left"), solid(), scale(0.5)],
    "+": [sprite("pipe-top-right"), solid(), scale(0.5)],
    "^": [sprite("evil-shroom"), solid()],
    "#": [sprite("mushroom"), solid()],
  };

  const gameLevel = addLevel(map, levelCfg);

  const scoreLabel = add([
    text("test"),
    pos(30, 6),
    layer("ui"),
    {
      value: "test",
    },
  ]);

  add([text("level" + "test", pos(4, 6))]);

  function big(){
    let timer=0
    let isBig=false
    return{
      update(){
        if(isBig){
          timer -=dt()
          if (timer<=0){
            this.smallify()
          }
        }
      },
      isBig(){
        return isBig
      },
      smallify(){
        this.scale=vec2(1)
        timer=0
        isBig=false
      },
      biggify(time){
        this.scale=vec2(2)
        timer=time
        isBig=true
      }
    }
  }

  const player = add([
    sprite("mario"),
    solid(),
    pos(30, 0),
    body(),
    big(),
    origin("bot"),
  ]);

  player.on('headbump',(obj)=>{
    if(obj.is('coin-surprise')){
      gameLevel.spawn('$',obj.gridPos.sub(0,1))
      destroy(obj)
      gameLevel.spawn('}',obj.gridPos.sub(0,0))
      
    }
    if(obj.is('mushroom-surprise')){
      gameLevel.spawn('#',obj.gridPos.sub(0,1))
      destroy(obj)
      gameLevel.spawn('}',obj.gridPos.sub(0,0))
      
    }
  })


  keyDown('left',()=>{
    player.move(-MOVE_SPEED,0)
  })
  keyDown('right',()=>{
    player.move(MOVE_SPEED,0)
  })
  keyDown('space',()=>{
    if(player.grounded()){
      player.jump(JUMP_FORCE)
    }
  })
});

start("game");
