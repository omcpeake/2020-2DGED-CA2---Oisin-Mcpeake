/**
 * Represents any drawn non-player or non-player character entity within a game with position information (e.g. pickup, obstacle, UI element)
 * @author niall mcguinness
 * @version 1.0
 * @class Sprite
 */
class Sprite extends Actor2D {
  //#region  Fields
  //#endregion

  //#region  Properties
  get Artist() {
    return this.artist;
  }
  get LayerDepth() {
    return this.layerDepth;
  }
  set LayerDepth(value) {
    this.layerDepth = (value >= 0 && value <= 1) ? value : 1;
  }
  //#endregion

  //#region Constructors and Core methods

  /**
   * Constructs a Sprite object which represents a static or animated image rendered to the canvas
   * @param {String} id Identifier for the sprite, does not necessarily need to be unique 
   * @param {ActorType} actorType An "enum" used to indicate the type of the actor (e.g Player, Pickup)
   * @param {StatusType} statusType An "enum" used to set if the sprite is Drawn and/or Updated, or Off
   * @param {Transform2D} transform2D Transform2D holding the position-related information used to render the image
   * @param {Artist} artist Used to draw the image to the canvas (can be either a SpriteArtist or AnimatedSpriteArtist) 
   * @param {Number} layerDepth Used to sort two sprites of the same ActorType by depth (e.g. two ActorType.Pickup objects where we want to drawn one in front of the other)
   */
  constructor(id, actorType, statusType, transform2D, artist, layerDepth = 1) {
    super(id, actorType, statusType, transform2D);
    this.artist = artist;
    this.layerDepth = layerDepth;
  }

  Update(gameTime) {
    if ((this.statusType & StatusType.Updated) != 0) {
      this.artist.Update(gameTime, this);
      super.Update(gameTime);
    }
  }

  Draw(gameTime) {
    if ((this.statusType & StatusType.Drawn) != 0)
      this.artist.Draw(gameTime, this);
  }

  /**
   * Allows the sprite to be transformed (i.e. translation, rotation, scale) based on its transform values.
   * 
   * @param {context} context
   * @see SpriteArtist::Draw()
   * @memberof Sprite
   */
  SetContext(context) {
    //Mo -> SRoT -> -Mo
    context.translate(this.transform2D.translation.x, this.transform2D.translation.y);
    context.scale(this.transform2D.scale.x, this.transform2D.scale.y);
    context.rotate(this.transform2D.rotationInRadians);
    context.translate(-this.transform2D.translation.x, -this.transform2D.translation.y);
  }

  //#endregion

  //#region Equals, Clone, ToString
  //to do...

  //deep-copy
  Clone() {
    var clone = new Sprite(this.ID + " - clone",
      this.ActorType,
      this.StatusType,
      this.Transform2D.Clone(),
      this.artist.Clone(),
      this.layerDepth);

    //now clone all the actors attached behaviors
    for (let controller of this.Controllers)
      clone.AttachController(controller.Clone());

    if (this.collisionPrimitive)
      clone.collisionPrimitive = this.collisionPrimitive.Clone();

    return clone;
  }
  //#endregion
}
