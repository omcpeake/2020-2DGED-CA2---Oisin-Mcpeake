//#region Actor related
/**
 * Defines the actors we find in the game. We assign each new actor with a unique number.
 * The numbers will be used to set the draw order for the actors (i.e. Background first, then NPC etc)
 * 
 * @see Actor2D::Actor2D
 */
const ActorType = Object.freeze({
  /*
   * VERY IMPORTANT - The order of the actors below DEFINES the draw order
   * which means if we were, for example to set Background to 20 that it would be
   * the highest number and the LAST drawn. That would mean we would NOT see anything
   * EXCEPT the background sprites because it would be OVERDRAWING everything else.
   */
  Background: 1,
  Platform: 2,
  Decorator: 3,
  Architecture: 4,
  Interactable: 5,
  Pickup: 6,
  Enemy: 7,
  NPC: 8,
  Bullet: 9,
  Player: 10,
  Weapon: 11
  //add as many actor types as your game needs here BUT remember that the assigned number will determine drawn sort order...
});
/**
 * Defines whether a Sprite is Drawn and/or Updated by the ObjectManager Draw and Update methods
 *
 * Usage:
 * 
 * A Sprite that is Drawn and Updated (i.e. visible on screen and needing to have its
 * controllers updated) will have statusType set to StatusType.Drawn | Status.Updated 
 * which, when we perform a bitwise OR gives us the following:
 * 
 *    0001
 *    0010
 *    ----
 *  | 0011 (3)
 * 
 * When we want to check if this Sprite should be Drawn or Updated then we perform a bitwise AND
 * with the Sprites' statusType and the field we want to check. For example the statusType below (0011)
 * when AND'ed with the value for Updated (0010) gives a NON-ZERO value, which indicates that the
 * Updated field was set.
 * 
 *    0011
 *    0010
 *    ----
 *  & 0010 (2) != 0 => this value contains/has Updated set
 * 
 * It's important that each value (e.g. Drawn, Updated) is a power of 2 value (e.g. 2^1, 2^2),
 * otherwise the bitwise operations (AND, OR) would not work correctly.
 * 
 * @see ObjectManager::Draw()
 * @see ObjectManager::Update()
 */
const StatusType = Object.freeze({
  Off: 0,
  Drawn: 1, //0001
  Updated: 2, //0010

});
//#endregion

//#region Keyboard, Color related

/**
 * Used to draw color to the screen e.g. ClearScreen(Color.Black)
 * @see Draw() method in your main game JS file (e.g. SpaceInvaders.js)
 */
const Color = Object.freeze({
  Black: "#000000",
  White: "#FFFFFF",
  Grey: "#8b8680",
  CornFlowerBlue: "#6495ed",
  LightGreen: "#CACB63",
  DarkGreen: "#688318",
  PaleYellow: "rgb(255, 255, 231)" //we can also specify in rgb() format too
  //add more colors that you use often here
  //Use https://html-color-codes.info/colors-from-image/ to determine hex codes for colors that you use in free 3rd party images/sprites that you find online
});

/**
 * Used by the KeyboardManager to map key codes (e.g. 65 for A) to a human-readable symbol (e.g. A)
 * @see KeyboardManager
 */
const Keys = Object.freeze({
  A : "KeyA",
  B : "KeyB",
  C : "KeyC",
  D : "KeyD",
  E : "KeyE",
  F : "KeyF",
  G : "KeyG",
  H : "KeyH",
  I : "KeyI",
  J : "KeyJ",
  K : "KeyK",
  L : "KeyL",
  M : "KeyM",
  N : "KeyN",
  O : "KeyO",
  P : "KeyP",
  Q : "KeyQ",
  R : "KeyR",
  S : "KeyS",
  T : "KeyT",
  U : "KeyU",
  V : "KeyV",
  W : "KeyW",
  X : "KeyX",
  Y : "KeyY",
  Z : "KeyZ",
  Enter: "Enter",
  Space: "Space",
  Numpad0 : "Numpad0",
  Numpad1 : "Numpad1",
  Numpad2 : "Numpad2",
  Numpad3 : "Numpad3",
  Numpad4 : "Numpad4",
  Numpad5 : "Numpad5",
  Numpad6 : "Numpad6",
  Numpad7 : "Numpad7",
  Numpad8 : "Numpad8",
  Numpad9 : "Numpad9",
  ArrowUp: "ArrowUp",
  ArrowDown: "ArrowDown",
  ArrowLeft: "ArrowLeft",
  ArrowRight: "ArrowRight",
  Esc: "Escape",
  //add keys...
});

//#endregion

