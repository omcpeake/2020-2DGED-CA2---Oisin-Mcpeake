/***************************************** Sprite Sheet Position & Animation Data ************************************************************************************************/

/**
 * Class to store together all sprite data
 */
class SpriteData {

//#region Sprite Data
//player
static RUNNER_START_POSITION = new Vector2(50, 715);
static RUNNER_MOVE_KEYS = [Keys.A, Keys.D, Keys.Space, Keys.Enter];
static RUNNER_RUN_VELOCITY = 0.09;
static RUNNER_JUMP_VELOCITY = 0.5;
static RUNNER_MAX_SPEED=5;

//bullets
static BULLET_START_POSITION=new Vector2(100, 250);
static BULLET_VELOCITY = 0.05;


static RUNNER_ANIMATION_DATA = Object.freeze({
  id: "runner_animation_data",
  spriteSheet: document.getElementById("player_spritesheet"),
  actorType: ActorType.Player,
  alpha: 1,
  takes: {  

    "idle_right" :  {       
      fps: 5,
      maxLoopCount: -1, //-1 = always, 0 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 3,
      boundingBoxDimensions: new Vector2(30, 32), //notice I choose the largest of all the widths taken from the cellData array below
      cellData: [
        new Rect(10, 4, 43, 32),
        new Rect(58, 4, 43, 32),
        new Rect(108, 4, 43, 32),
        new Rect(159, 4, 43, 32),
      ]
    },
    "idle_left" :  {       
      fps: 5,
      maxLoopCount: -1, //-1 = always, 0 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 3,
      boundingBoxDimensions: new Vector2(30, 32), //notice I choose the largest of all the widths taken from the cellData array below
      cellData: [
        new Rect(248, 348, 43, 32),
        new Rect(199, 348, 43, 32),
        new Rect(150, 348, 43, 32),
        new Rect(97, 348, 43, 32),
        new Rect(48, 348, 43, 32),
        new Rect(2, 348, 43, 32)
      ]
    },
    "run_right" :  {       
      fps: 10,
      maxLoopCount: -1, //-1 = always, 0 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 5,
      boundingBoxDimensions: new Vector2(30, 32), //notice I choose the largest of all the widths taken from the cellData array below
      cellData: [
        new Rect(11, 42, 43, 32),
        new Rect(58, 42, 43, 32),
        new Rect(108, 42, 43, 32),
        new Rect(159, 42, 43, 32),
        new Rect(209, 42, 43, 32),
        new Rect(259, 42, 43, 32)
      ]
    },
    "run_left" : {     
      fps: 10,
      maxLoopCount: -1, //-1 = always, 0 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 5,
      boundingBoxDimensions: new Vector2(49, 54), //notice I choose the largest of all the widths taken from the cellData array below
      cellData: [
        new Rect(255, 387, 43, 32),
        new Rect(205, 387, 43, 32),
        new Rect(155, 387, 43, 32),
        new Rect(105, 387, 43, 32),
        new Rect(55, 387, 43, 32),
        new Rect(2, 387, 43, 32)
      ]
    }
  },
});

static ENEMY_ANIMATION_DATA = Object.freeze({
  id: "enemy_animation_data",
  spriteSheet: document.getElementById("sorcerer"),
  actorType: ActorType.Enemy,
  rotation: 0,
  scale: new Vector2(1, 1),
  origin: new Vector2(0, 0),
  alpha: 1,
  
  takes: {  
    "sorcerer" :  {    
      fps: 4,
      maxLoopCount: -1, //-1 = always, 0 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 11,
      boundingBoxDimensions: new Vector2(104, 180), 
      cellData: [
        new Rect(51, 6, 104, 180),
        new Rect(246, 6, 104, 180),
        new Rect(446, 6, 104, 180),
        new Rect(641, 6, 104, 180),
        new Rect(843, 6, 104, 180),
        new Rect(1043, 6, 104, 180),
        new Rect(1243, 6, 104, 180),
        new Rect(843, 6, 104, 180),
        new Rect(641, 6, 104, 180),
        new Rect(446, 6, 104, 180),
        new Rect(246, 6, 104, 180),
        new Rect(51, 6, 104, 180)
      ]
    },
  }
});

static BULLET_ANIMATION_DATA = Object.freeze({
  id: "bullet_animation_data",
  spriteSheet: document.getElementById("fireball"),
  actorType: ActorType.Bullet,
  rotation: 0,
  scale: new Vector2(1, 1),
  origin: new Vector2(0, 0),
  alpha: 1,
  
  takes: {  
    "fireball" :  {    
      fps: 6,
      maxLoopCount: -1, //-1 = always, 0 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 2,
      boundingBoxDimensions: new Vector2(65, 8), 
      cellData: [
        new Rect(0, 54, 65, 8),
        new Rect(0, 63, 65, 8),
        new Rect(0, 72, 65, 8) 
      ]
    }
  }
});

static COLLECTIBLES_ANIMATION_DATA = Object.freeze({
  id: "collectibles_animation_data",
  spriteSheet: document.getElementById("spritesheet_main"),
  alpha: 1,
  actorType: ActorType.Pickup,
  takes: {  
    "sapphire_glint" :  {
      fps: 6,
      maxLoopCount: -1, //-1 = always, 0 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 4,
      boundingBoxDimensions: new Vector2(46, 50), 
      cellData: [
        new Rect(183, 130, 40, 45),
        new Rect(219, 130, 40, 45),
        new Rect(257, 130, 40, 45),
        new Rect(294, 130, 40, 45),
        new Rect(330, 130, 40, 45)  
      ]
    }
  }
});

static PLATFORM_DATA = Object.freeze({
  id: "platform",
  spriteSheet: document.getElementById("tileset"),
  sourcePosition: new Vector2(125, 144),
  sourceDimensions: new Vector2(50, 16),
  rotation: 0,
  scale: new Vector2(1, 1),
  origin: new Vector2(0, 0),
  alpha: 1,
  actorType: ActorType.Platform,
  translationArray: [
    //added spaces here so that you can easily see which grouping is which on screen
    //floor
    new Vector2(-50, 750),
    new Vector2(0, 750),
    new Vector2(50, 750),
    new Vector2(100, 750),
    new Vector2(150, 750),
    new Vector2(200, 750),
    new Vector2(250, 750),
    new Vector2(300, 750),
    new Vector2(350, 750),
    new Vector2(400, 750),

    new Vector2(100, 675),

    //1st 
    new Vector2(250, 600),
    new Vector2(300, 600),

    new Vector2(400, 550),
    new Vector2(450, 550),    
    new Vector2(500, 550),
    new Vector2(550, 550),  

    new Vector2(650, 500),
    new Vector2(700, 450),
    new Vector2(750, 450),
    
    //2nd
    new Vector2(50, 400),
    new Vector2(0, 400),

    new Vector2(250, 400),
    new Vector2(300, 400),

    new Vector2(500, 400),
    new Vector2(550, 400),

    //3rd
    new Vector2(350, 350),
    new Vector2(500, 300),
    new Vector2(550, 300),
    new Vector2(600, 300),
    new Vector2(650, 300),
    
    new Vector2(700, 250),
    new Vector2(750, 200),
    new Vector2(800, 150),
    
  ]
});

static DEATHBOX_DATA = Object.freeze({
  id: "deathbox_data",
  spriteSheet: document.getElementById("sorcerer"),
  actorType: ActorType.Enemy,
  rotation: 0,
  scale: new Vector2(1, 1),
  origin: new Vector2(0, 0),
  alpha: 0,
  
  takes: {  
    "deathbox" :  {    
      fps: 4,
      maxLoopCount: -1, //-1 = always, 0 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 0,
      boundingBoxDimensions: new Vector2(2500, 100), 
      cellData: [
        new Rect(0, 0, 0, 0),
      ]
    },
  }
});

static BIG_TREE_DATA = Object.freeze({
  id: "big_tree",
  spriteSheet: document.getElementById("tileset"),
  sourcePosition: new Vector2(177, 9),
  sourceDimensions: new Vector2(111, 135),
  rotation: 0,
  scale: new Vector2(1.5, 1.5),
  origin: new Vector2(0, 0),
  alpha: 1,
  actorType: ActorType.Decorator,
  layerDepth: 1,
  scrollSpeedMultiplier: 0,
  translationArray: [
    //added spaces here so that you can easily see which grouping is which on screen
    new Vector2(0, 550),
    new Vector2(520, 100),
    
  ]
});

static ROCK_DATA = Object.freeze({
  id: "rock",
  spriteSheet: document.getElementById("tileset"),
  sourcePosition: new Vector2(47, 57),
  sourceDimensions: new Vector2(32, 23),
  rotation: 0,
  scale: new Vector2(1.5, 1.5),
  origin: new Vector2(0, 0),
  alpha: 1,
  actorType: ActorType.Decorator,
  layerDepth: 1,
  scrollSpeedMultiplier: 0,
  translationArray: [
    //added spaces here so that you can easily see which grouping is which on screen
    new Vector2(160, 714),
    new Vector2(450, 516),
    new Vector2(300, 370),
  ]
});

static BACKGROUND_DATA = [
  {
    id: "background_1",
    spriteSheet: document.getElementById("background_0"),
    sourcePosition: new Vector2(0, 0),
    sourceDimensions: new Vector2(280, 180),
    translation: new Vector2(0, 0),
    rotation: 0,
    scale: new Vector2(1, 1),
    origin: new Vector2(0, 0),
    alpha: 1,
    actorType: ActorType.Background,
    layerDepth: 0,
    scrollSpeedMultiplier: 0.2
  },
  {
    id: "background_2",
    spriteSheet: document.getElementById("background_1"),
    sourcePosition: new Vector2(0, 0),
    sourceDimensions: new Vector2(280, 180),
    translation: new Vector2(0, 0),
    rotation: 0,
    scale: new Vector2(1, 1),
    origin: new Vector2(0, 0),
    alpha: 1,
    actorType: ActorType.Background,
    layerDepth: 0.1,
    scrollSpeedMultiplier: 0.15
  },
  {
    id: "background_3",
    spriteSheet: document.getElementById("background_2"),
    sourcePosition: new Vector2(0, 0),
    sourceDimensions: new Vector2(280, 180),
    translation: new Vector2(0, 0),
    rotation: 0,
    scale: new Vector2(1, 1),
    origin: new Vector2(0, 0),
    alpha: 1,
    actorType: ActorType.Background,
    layerDepth: 0.2,
    scrollSpeedMultiplier: 0.1
  }
];

//#endregion

}
