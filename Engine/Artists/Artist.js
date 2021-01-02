/**
 * Base class for all artists. An artist will be used by a Sprite to draw either
 * a static image (using SpriteArtist), or a dynamic image (using AnimatedSpriteArtist).
 * @author niall mcguinness
 * @version 1.0
 * @class Artist
 */
class Artist {
  //#region Fields
  context;
  spriteSheet;
  alpha;
  //#endregion

  //#region  Properties
  get Alpha() {
    return this.alpha;
  }
  set Alpha(value) {
    this.alpha = value > 1 || value < 0 ? 1 : value;
  }
  get Context() {
    return this.context;
  }
  set Context(value) {
    this.context = value;
  }
  get SpriteSheet() {
    return this.spriteSheet;
  }
  set SpriteSheet(value) {
    this.spriteSheet = value;
  }
  //#endregion

  /**
   * Constructs the Artist object which is the parent for SpriteArtist(static images) and AnimatedSpriteArtist(animated images)
   * @param {CanvasRenderingContext2D} context Handle to draw context
   * @param {HTMLImageElement} spriteSheet Handle to the image data
   * @param {Number} alpha Floating point value (0-1) indicating sprite transparency
   */
  constructor(context, spriteSheet, alpha) {
    this.Context = context;
    this.SpriteSheet = spriteSheet;
    this.Alpha = alpha;
  }

  /**
   * Currently unused.
   *
   * @param {GameTime} gameTime (unused)
   * @param {Sprite} parent (unused)
   * @memberof Artist
   */
  Update(gameTime, parent) {}

  /**
   * Currently unused.
   *
   * @param {GameTime} gameTime (unused)
   * @param {Sprite} parent
   * @memberof Artist
   */
  Draw(gameTime, parent) {}

  //#region Equals, Clone, ToString
  Equals(other) {
    return (
      GDUtility.IsSameTypeAsTarget(this, other) &&
      this.context === other.Context &&
      this.spriteSheet === other.SpriteSheet &&
      this.alpha === other.Alpha
    );
  }

  //hybrid
  Clone() {
    return new Artist(
      this.context, //shallow
      this.spriteSheet, //shallow
      this.alpha
    ); //deep
  }

  ToString() {
    return "[" + this.context + "," + this.spriteSheet + "," + this.alpha + "]";
  }
  //#endregion
}
