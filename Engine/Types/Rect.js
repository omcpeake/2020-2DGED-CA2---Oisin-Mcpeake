/**
 * Represents a 2D rectangle (x, y, width, height) which is typically used for collision detection/collision response.
 * For example, a drawn character (i.e. a Sprite) will use a Rect object to define a collision surface for the character.
 *
 * @author niall mcguinness
 * @version 1.0
 * @class Rect
 */
class Rect {
  //#region Fields
  //#endregion

  //#region Properties

  /**
   *
   * Returns an instance of a Rect object with w.h of 1x1.
   * @example
   *      let r = Rect.Zero;
   *
   * @readonly
   * @static
   * @memberof Rect
   */
  static get Zero() {
    return new Rect(0, 0, 1, 1);
  }
  get X() {
    return this.x;
  }
  get Y() {
    return this.y;
  }
  get Width() {
    return this.width;
  }
  get Height() {
    return this.height;
  }

  /**
   * Returns the coordinates of the centre point of a Rect object with top left (x,y) and dimensions (w,h) as a Vector2.
   *
   * @readonly
   * @memberof Rect
   */
  get Center() {
    return new Vector2(
      Math.round(this.x + this.width / 2),
      Math.round(this.y + this.height / 2)
    );
  }

  set X(value) {
    this.x = value;
  }
  set Y(value) {
    this.y = value;
  }
  set Width(value) {
    this.width = value;
  }
  set Height(value) {
    this.height = value;
  }
  //#endregion

  //#region Constructors and Core methods

  /**
   * Constructs a Rect object (x,y,w,h)
   * @param {Number} x X-ordinate of the top-left corner of the Rect object
   * @param {Number} y Y-ordinate of the top-left corner of the Rect object
   * @param {Number} width Width in pixels of the Rect object
   * @param {Number} height Height in pixels of the Rect object
   */
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    //if we ever change the Rect object (e.g. x, y, w, h) then we may want to reset it so we store original values
    this.originalX = x;
    this.originalY = y;
    this.originalWidth = width;
    this.originalHeight = height;
  }

  /**
   * Resets the Rect object to its original values (x,y,w,h)
   *
   * @memberof Rect
   */
  Reset() {
    this.x = this.originalX;
    this.y = this.originalY;

    this.width = this.originalWidth;
    this.height = this.originalHeight;
  }

  /**
   * Moves a Rect object (i.e. x,y) by a delta Vector2
   * @param {Vector2} delta A Vector2 added to the (x,y) values of the Rect to move it.
   */
  Move(delta) {
    this.x += delta.x;
    this.y += delta.y;
  }

  /**
   * Moves a Rect object (i.e. x,y) by a x and y values
   * @param {Number} x A integer value to add to the X-ordinate
   * @param {Number} y A integer value to add to the Y-ordinate
   */
  Move(x, y) {
    this.x += x;
    this.y += y;
  }
  //#endregion

  //#region Collision Detection

  /**
   * Called when we want to determine if "a" Rect object contains (has completely inside) the "b" Rect object
   *
   * @example
   *  var a = new Rect(0, 0, 100, 100);
   *  var b = new Rect(5, 5, 20, 20)
   *  var bContains = a.Contains(b);
   *
   * @param {Rect} rect A Rect object which we will test if it is inside the Rect object on the LHS of the dot operator
   * @returns {Boolean} True if b inside a, otherwise false
   */
  Contains(rect) {
    let enclosingRect = this.GetEnclosingRect(rect);
    return (
      enclosingRect.Width == Math.max(this.width, rect.Width) &&
      enclosingRect.Height == Math.max(this.height, rect.Height)
    );
  }

  /**
   * Called when we want to determine if "a" Rect object intersects (overlaps) the "b" Rect object
   *
   * @example
   *  var a = new Rect(0, 0, 100, 100);
   *  var b = new Rect(0, 50, 100, 100)
   *  var bContains = a.Intersects(b);
   *
   * @param {Rect} rect A Rect object which we will test if it intersect with the Rect object on the LHS of the dot operator
   * @returns {Boolean} True if b intersects a (or vice versa), otherwise false
   */
  Intersects(rect) {
    let enclosingRect = this.GetEnclosingRect(rect);
    return (
      enclosingRect.Width <= this.width + rect.Width &&
      enclosingRect.Height <= this.height + rect.Height
    );
  }

  /**
   * Called when we want to return a Rect object that contains both "a" and "b" Rect object.
   *
   *  @example
   *  var a = new Rect(0, 0, 100, 100);
   *  var b = new Rect(100, 0, 100, 100)
   *  var enclosing = a.GetEnclosingRect(b); //enclosing = (0, 0, 200, 100)
   *
   * @param {Rect} rect A Rect object
   * @returns {Rect} A Rect object that encloses both "a" and "b"
   */
  GetEnclosingRect(rect) {
    if (rect == null || rect == undefined || !rect instanceof Rect)
      throw (
        "Error: One or more objects is null, undefined, or not type " +
        this.constructor.name
      );

    let minX = Math.min(this.x, rect.x);
    let minY = Math.min(this.y, rect.y);

    let width = Math.max(this.x + this.width, rect.x + rect.width) - minX;
    let height = Math.max(this.y + this.height, rect.y + rect.height) - minY;

    return new Rect(minX, minY, width, height);
  }
  //#endregion

  //#region Static Methods

  /**
   * Called when we want to determine if "a" Rect object contains (completely contains) the "b" Rect object
   * @example
   *  var a = new Rect(0, 0, 100, 100);
   *  var b = new Rect(5, 5, 20, 20)
   *  var bContains = Rect.Contains(a, b);
   *
   * @param {Rect} a A Rect object
   * @param {Rect} b A Rect object
   * @returns {Boolean} True if b inside a, otherwise false
   */
  static Contains(a, b) {
    if (a == null || a == undefined || !a instanceof Rect)
      throw (
        "Error: One or more objects is null, undefined, or not type " +
        a.constructor.name
      );

    return a.Contains(b);
  }

  /**
   * Called when we want to determine if "a" Rect object intersect (overlaps) the "b" Rect object
   *
   * @example
   *  var outerRect = new Rect(0, 0, 100, 100);
   *  var innerRect = new Rect(0, 50, 100, 100)
   *  var bContains = Rect.Intersects(a, b);
   *
   * @param {Rect} a A Rect object
   * @param {Rect} b A Rect object
   * @returns {Boolean} True if b intersects a (or vice versa), otherwise false
   */
  static Intersects(a, b) {
    if (a == null || a == undefined || !a instanceof Rect)
      throw (
        "Error: One or more objects is null, undefined, or not type " +
        a.constructor.name
      );

    return a.Intersects(b);
  }

  /**
   * Called when we want to return a Rect object that contains both "a" and "b" Rect object.
   *
   * @example
   *  var a = new Rect(0, 0, 100, 100);
   *  var b = new Rect(100, 0, 100, 100)
   *  var enclosing = Rect.GetEnclosingRect(a,b); //enclosing = (0, 0, 200, 100)
   *
   * @param {Rect} a A Rect object
   * @param {Rect} b A Rect object
   * @returns {Rect} A Rect object that encloses both "a" and "b"
   */
  static GetEnclosingRect(a, b) {
    if (a == null || a == undefined || !a instanceof Rect)
      throw (
        "Error: One or more objects is null, undefined, or not type " +
        a.constructor.name
      );

    return a.GetEnclosingRect(b);
  }

  /**
   *  Moves a Rect object by a delta Vector2 and returns a NEW Rect object
   *
   * @example
   * var original = new Rect(0,0,100,100);
   * var moved = Rect.Move(original, new Vector2(25, 25)); //moved = (25, 25, 125, 125)
   *
   * @param {Rect} rect A Rect object
   * @param {Vector2} vector A Vector2 object
   * @returns {Vector2} A transformed distinct (i.e. a deep copy) Rect object
   */
  static Move(rect, delta) {
    let clone = rect.Clone();
    clone.Move(delta);
    return clone;
  }

  /**
   * Rounds the (x,y,w,h) values of a Rect object and returns a NEW Rect object
   *
   * @example
   * var original = new Rect(1.55,1.91,100.1,100.9);
   * var rounded = Rect.Round(original, 1); //rounded = (1.6, 1.9, 100.0, 101.0)
   *
   * @param {Rect} rect A Rect object typically containing floating point (x,y,w,h) values
   * @param {Number} precision An integer rounding precision value
   * @returns {Vector2} A rounded distinct (i.e. a deep copy) Rect object
   *
   */
  static Round(rect, precision) {
    return new Rect(
      GDMath.ToFixed(rect.x, precision, 10),
      GDMath.ToFixed(rect.y, precision, 10),
      GDMath.ToFixed(rect.width, precision, 10),
      GDMath.ToFixed(rect.height, precision, 10)
    );
  }
  //#endregion

  //#region Equals, Clone, ToString
  Equals(rect) {
    //if we get here then we have two valid (i.e. non-null, defined, correct type) and distinct (i.e. separate RAM) objects that we need to test
    return (
      GDUtility.IsSameTypeAsTarget(this, rect) &&
      this.x === rect.X &&
      this.y === rect.Y &&
      this.width === rect.Width &&
      this.height === rect.Height
    );
  }

  Clone() {
    //shallow copy if we simply return this
    //return this;

    //if we see 'new' then we are making a DISTINCT object in RAM i.e. deep copy
    return new Rect(this.x, this.y, this.width, this.height);
  }

  ToString() {
    return (
      "[" + this.x + "," + this.y + "," + this.width + "," + this.height + "]"
    );
  }
  //#endregion
}

/*********************************************************************************************/

/**
 * Represents a 2D circle (center, radius) which is typically used for collision detection/collision response.
 * @author niall mcguinness
 * @version 1.0
 * @class Circle
 */

class Circle {
  //#region Fields
  //#endregion

  //#region Statics
  static get One() {
      return new Cicrle(0, 0, 1);
  }
  static get Zero() {
      return new Cicrle(0, 0, 0);
  }
  //#endregion

  //#region Properties
  get Center() {
      return this.center;
  }
  get Radius() {
      return this.radius;
  }
  set Center(center) {
      this.center = center;
  }
  set Radius(radius) {
      this.radius = radius;
  }
  //#endregion

  constructor(center, radius) {
      this.center = center;
      this.originalCenter = center.Clone(); //since center is an object (Vector2) we need to formally Clone to make deep copy
      this.radius = this.originalRadius = radius;
  }

  Reset(){
      this.center = this.originalCenter.Clone();
      this.radius = this.originalRadius;
  }

  Move(vector) {
      this.center.x += vector.X;
      this.center.y += vector.Y;
  }

  Move(x, y) {
      this.center.x += x;
      this.center.y += y;
  }

 /**
 *  Used to re-position or re-dimension the Circle object based on the translation, scale, and dimensions provided in the Transform2D
 *  This method will most often be used to re-calculate the position of the bounding circle for a sprite that is being transformed (e.g. translate, scale, dimension).
 *  Note that the benefit of a bounding circle is that it is invariant to rotation, unlike a bounding rectangle.
 *
 * @param {*} transform2D
 * @memberof Circle
 * @see RectCollisionPrimitive
 * @see CircleCollisionPrimitive
 * @see Rect:Transform()
 */
  Transform(transform2D) {
      this.radius = Math.round(this.originalRadius * transform2D.scale.Length() * transform2D.dimensions.x);
      this.center.x = transform2D.origin.x;
      this.center.y = transform2D.origin.y;
  }

  Explode(explodeBy) {
      if (this.radius + explodeBy < 0)
          throw "Error: Circle cannot have negative radius";

      this.radius += explodeBy;
  }

  //#region Collision Detection
  //c1.Contains(c2);
  Contains(other) {
      let max = Math.max(this.radius, other.radius);
      let min = Math.min(this.radius, other.radius);
      return Vector2.Distance(this.center, other.center) + min < max;
  }

  Intersects(other) {
      return (Vector2.Distance(this.center, other.center) < this.radius + other.radius);
  }
  //#endregion

  //#region Equals, Clone, ToString
  Equals(other) {
      //if we get here then we have two valid (i.e. non-null, defined, correct type) and distinct (i.e. separate RAM) objects that we need to test
      return GDUtility.IsSameTypeAsTarget(this, other) && (
          this.center.Equals(other.center) && this.radius === other.radius);
  }

  Clone() {
      //if we see 'new' then we are making a DISTINCT object in RAM i.e. deep copy
      return new Circle(new Vector2(this.center.x, this.center.y), this.radius);
  }

//    Clone() {
      //if we see 'new' then we are making a DISTINCT object in RAM i.e. deep copy
//        return new Circle(this.center.Clone(), this.radius);
//    }

  ToString() {
      return ("[" + this.center.ToString() + "," + this.radius + "]");
  }
  //#endregion

  //#region Static Methods
  static Contains(a, b) {
      if (a == null || a == undefined || !a instanceof Rect)
          throw "Error: One or more objects is null, undefined, or not type " +
              a.constructor.name;

      return a.Contains(b);
  }

  static Intersects(a, b) {
      if (a == null || a == undefined || !a instanceof Rect)
          throw "Error: One or more objects is null, undefined, or not type " +
              a.constructor.name;

      return a.Intersects(b);
  }

  static Explode(circle, explodeBy) {
      let clone = circle.Clone();
      clone.Explode(explodeBy);
      return clone;
  }

  static Transform(circle, transform2D) {
      let clone = circle.Clone();
      clone.Transform(transform2D);
      return clone;
  }
  //#endregion
}