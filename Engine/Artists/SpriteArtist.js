/**
 * Renders the pixel data from a spritesheet at a source location (x, y, width, height) stored in sourcePosition and sourceDimensions.
 * @author niall mcguinness
 * @version 1.0
 * @class SpriteArtist
 */
class SpriteArtist extends Artist {
  //#region  Fields
  //#endregion
  sourcePosition;
  sourceDimensions;
  //#endregion

  //#region  Properties
  get SourcePosition() {
    return this.sourcePosition;
  }
  set SourcePosition(value) {
    this.sourcePosition = value;
  }
  get SourceDimensions() {
    return this.sourceDimensions;
  }
  set SourceDimensions(value) {
    this.sourceDimensions = value;
  }
  //#endregion

  //#region Constructors and Core methods

  /**
   * Constructs a SpriteArtist to render a static image
   * @param {CanvasRenderingContext2D} context Handle to draw context
   * @param {Number} alpha Floating point value (0-1) indicating sprite transparency
   * @param {HTMLImageElement} spriteSheet Handle to the image data
   * @param {Vector2} sourcePosition position (x,y) of the source image to use as top left corner
   * @param {Vector2} sourceDimensions dimensions (w,h) of the portion of the source image to be drawn, in pixels
   */
  constructor(context, spriteSheet, alpha, sourcePosition, sourceDimensions) {
    super(context, spriteSheet, alpha);
    this.sourcePosition = sourcePosition;
    this.sourceDimensions = sourceDimensions;
  }

  /**
   * Currently unused as, unlike AnimatedSpriteArtist, we are drawing the same pixel data in each draw call.
   *
   * @param {GameTime} gameTime (unused)
   * @param {Sprite} parent (unused)
   * @memberof SpriteArtist
   */
  Update(gameTime, parent) {}

  /**
   * Renders pixel data from spritesheet to canvas
   *
   * @param {GameTime} gameTime (unused)
   * @param {Sprite} parent Sprite object to which this artist is attached
   * @memberof SpriteArtist
   */
  Draw(gameTime, parent) {
    //save whatever context settings were used before this (color, line, text styles)
    this.Context.save();

    //apply the sprite transformations to the sprite 
    parent.SetContext(this.Context);

    //access the transform for the parent that this artist is attached to
    let transform2D = parent.Transform2D;

    //set transparency
    this.Context.globalAlpha = this.Alpha;

    //draw image
    this.Context.drawImage(
      this.SpriteSheet,
      this.sourcePosition.x,
      this.sourcePosition.y,
      this.sourceDimensions.x,
      this.sourceDimensions.y,
      transform2D.Translation.x - transform2D.Origin.x,
      transform2D.Translation.y - transform2D.Origin.y,
      transform2D.Dimensions.x,
      transform2D.Dimensions.y 
    );

    //restore whatever context settings were used before save() was called above
    this.Context.restore();
  }
  //#endregion

  //#region Equals, Clone, ToString

  //hybrid
  Clone() {
    return new SpriteArtist(
      this.Context, //shallow
      this.SpriteSheet, //shallow
      this.Alpha, //deep
      this.sourcePosition.Clone(), //deep, if shallow then all clones will point to same Vector2 representing sourcePosition
      this.sourceDimensions.Clone() //deep
    );
  }
  //#endregion
}
