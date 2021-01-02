/**
 * Represents the physical properties of a sprite (e.g. mass, velocity, friction)
 * @author niall mcguinness
 * @version 1.0
 * @class Body
 */
const FrictionType = Object.freeze({
    Low: 0.9,
    Normal: 0.7,
    High: 0.5
});
const GravityType = Object.freeze({
    Off: 0,
    Weak: 0.2,
    Normal: 0.4,
    Strong: 0.7
});
class Body {

    //#region Static Fields
    static MAX_SPEED = 10;
    static MIN_SPEED = 0.01;
    //#endregion

    //#region Fields
    //#endregion 

    //#region Properties
    get MaximumSpeed() {
        return this.maximumSpeed;
    }
    get Gravity() {
        return this.gravity;
    }
    get Friction() {
        return this.friction;
    }
    get VelocityX() {
        return this.velocityX;
    }
    get VelocityY() {
        return this.velocityY;
    }
    set MaximumSpeed(maximumSpeed) {
        this.maximumSpeed = maximumSpeed || Body.MAX_SPEED;
    }
    set Gravity(gravity) {
        this.gravity = gravity || GravityType.Normal;
    }
    set Friction(friction) {
        this.friction = friction || FrictionType.Normal;
    }
    //endregion 

    constructor(maximumSpeed, gravity, friction) {
        this.velocityX = 0;
        this.velocityY = 0;

        this.IsJumping = false;
        this.IsOnGround = false;

        this.MaximumSpeed = this.originalMaximumSpeed = maximumSpeed;
        this.Gravity = this.originalGravity = gravity;
        this.Friction = this.originalFriction = friction;
    }

    Reset() {
        this.velocityX = 0;
        this.velocityY = 0;

        this.IsJumping = false;
        this.IsOnGround = false;

        this.MaximumSpeed = this.originalMaximumSpeed;
        this.Gravity = this.originalGravity;
        this.Friction = this.originalFriction;
    }

    ApplyGravity() {
        this.velocityY += this.gravity;
    }

    ApplyFriction() {
        this.velocityX *= this.friction;
    }

    ApplyFrictionX() {
        this.velocityX *= this.friction;
    }

    ApplyFrictionY() {
        this.velocityY *= this.friction;
    }

    SetVelocity(velocity) {
        this.SetVelocityX(velocity.x);
        this.SetVelocityY(velocity.y);
    }

    SetVelocityX(velocityX) {
        if (velocityX <= this.maximumSpeed)
            this.velocityX = velocityX;
    }

    SetVelocityY(velocityY) {
        if (velocityY <= this.maximumSpeed)
            this.velocityY = velocityY;
    }

    AddVelocity(velocity) {
        this.AddVelocityX(velocity.x);
        this.AddVelocityY(velocity.y);
    }

    AddVelocityX(deltaVelocityX) {
        if (Math.abs(this.velocityX + deltaVelocityX) <= this.maximumSpeed)
            this.velocityX += deltaVelocityX;
    }

    AddVelocityY(deltaVelocityY) {
        if (Math.abs(this.velocityY + deltaVelocityY) <= this.maximumSpeed)
            this.velocityY += deltaVelocityY;
    }

    //#region Common Methods - Equals, ToString, Clone
    Equals(other) {
        return GDUtility.IsSameTypeAsTarget(this, other) && this.maximumSpeed === other.MaximumSpeed && this.gravity === other.Gravity && this.friction === other.Friction;
    }

    ToString() {
        return "[" + this.maximumSpeed + ", " + this.gravity + +", " + this.friction + ", " + this.velocityX + ", " + this.velocityY + "]";
    }


    Clone() {
        return new Body(this.maximumSpeed, this.gravity, this.friction);
    }
    //#endregion
}

/**
 * Parent class for the two types of collision primitive (circle or box) used by a Sprite for CD/CR.
 * @author niall mcguinness
 * @version 1.0
 * @class CollisionPrimitive
 */
class CollisionPrimitive {

    //#region Fields
    transform2D;
    isDirty = true;
    //#endregion

    //#region Properties
    get Transform2D() {
        return this.transform2D;
    }
    set Transform2D(transform2D) {
        this.transform2D = transform2D;
    }
    get IsDirty() {
        return this.isDirty;
    }
    set IsDirty(isDirty) {
        this.isDirty = isDirty;
    }
    //#endregion

    constructor(transform2D) {
        this.transform2D = transform2D;
    }

    GetBoundingPrimitive() {
        throw "Error: Base class is never directly instanciated - Create RectCollisionPrimitive or CircleCollisionPrimitive for your Sprite";
    }

    /**
     * Called by the DebugDrawer to draw the collision surface to the canvas. In normal gameplay this method is never called
     * because the DebugDrawer is disabled.
     *
     * @param {Context} context
     * @param {number} alpha
     * @param {number} lineWidth
     * @param {string} strokeStyle
     * @memberof CircleCollisionPrimitive
     */
    DebugDraw(context, alpha, lineWidth, strokeStyle) {
        context.globalAlpha = alpha;
        context.lineWidth = lineWidth;
        context.strokeStyle = strokeStyle;
    }

    ToString() {
        throw "Error: Base class is never directly instanciated - Create RectCollisionPrimitive or CircleCollisionPrimitive for your Sprite";
    }

    Clone(){
        return new CollisionPrimitive(this.transform2D.Clone());
    }
}

/**
 * Creates a collision primitive based on a rectangle used by a Sprite for CD/CR.
 * This class provides the Intersect() method to test for collisions.
 * @author niall mcguinness
 * @version 1.0
 * @class RectCollisionPrimitive
 */
class RectCollisionPrimitive extends CollisionPrimitive {

    //#region Fields
    explodeRectBy;
    boundingRectangle; //rectangle
    //#endregion

    //#region Properties
    //#endregion

    constructor(transform2D, explodeRectBy) {
        super(transform2D);

        if (explodeRectBy % 2 == 0)
            this.explodeRectBy = explodeRectBy;
        else if (explodeRectBy % 2 == 1)
            throw "Error: explodeBy value must be an even integer value since we ue it to expand/collapse the rectangle primitive!";

        //call once to set the first time in
        this.GetBoundingPrimitive();
    }

    Move(x, y) {
        this.boundingRectangle.Move(x, y);
    }

    /**
     * Returns the appropriate bounding primitive (e.g. rect or circle) for the class type.
     * This method is optimized to ONLY calculate a new Rect IF the associated transform changes OR if the explodeBy value changes
     *
     * @returns Rect describing the bounding surface
     * @memberof RectCollisionPrimitive
     */
    GetBoundingPrimitive() {

        //check associated Transform2D dirty flag and check local flag which indicates changes to explodeRectBy 
        if (this.transform2D.isDirty || this.isDirty) {
            let w = this.transform2D.scale.x * this.transform2D.dimensions.x;
            let h = this.transform2D.scale.y * this.transform2D.dimensions.y;
            let x = this.transform2D.translation.x - this.transform2D.origin.x * this.transform2D.scale.x;
            let y = this.transform2D.translation.y - this.transform2D.origin.y * this.transform2D.scale.y;

            //expand/collapse if necessary
            if (this.explodeRectBy != 0) {
                let explodeByHalf = this.explodeRectBy / 2;
                //make wider and taller and move (x,y) up and left based on +ve explodeBy value
                x -= explodeByHalf;
                y -= explodeByHalf;
                w += this.explodeRectBy;
                h += this.explodeRectBy;
            }
            //set the new bounding box
            this.boundingRectangle = new Rect(x, y, w, h);
            //set associated Transform2D dirty flag to false until translation, rotation, scale, or origin change again
            this.transform2D.IsDirty = false;
            //set local dirty flag to false
            this.isDirty = false;
        }
        return this.boundingRectangle;
    }

    /**
     * Called by the DebugDrawer to draw the collision surface to the canvas. In normal gameplay this method is never called
     * because the DebugDrawer is disabled.
     *
     * @param {Context} context
     * @param {number} alpha
     * @param {number} lineWidth
     * @param {string} strokeStyle
     * @memberof CircleCollisionPrimitive
     */
    DebugDraw(context, alpha, lineWidth, strokeStyle) {
        super.DebugDraw(context, alpha, lineWidth, strokeStyle);
        context.strokeRect(this.boundingRectangle.x, this.boundingRectangle.y,
            this.boundingRectangle.width, this.boundingRectangle.height);
    }

    ToString() {
        return this.boundingRectangle.ToString();
    }

    Clone(){
        return new RectCollisionPrimitive(this.transform2D.Clone(), this.explodeRectBy);
    }
}

/**
 * Creates a collision primitive based on a circle used by a Sprite for CD/CR.
 * This class provides the Intersect() method to test for collisions.
 * @author niall mcguinness
 * @version 1.0
 * @class RectCollisionPrimitive
 */
class CircleCollisionPrimitive extends CollisionPrimitive {

    //#region Fields
    radius;
    boundingCircle; //circle
    //#endregion

    //#region Properties
    //#endregion

    constructor(transform2D, radius) {
        super(transform2D);
        this.radius = radius;

        //call once to set the first time in
        this.GetBoundingPrimitive();
    }

    Move(x, y) {
        this.boundingCircle.Move(x, y);
    }

    /**
     * Returns the appropriate bounding primitive (e.g. rect or circle) for the class type.
     * This method is optimized to ONLY calculate a new Rect IF the associated transform changes OR if the radius value changes
     *
     * @returns Circle describing the bounding surface
     * @memberof CircleCollisionPrimitive
     */
    GetBoundingPrimitive() {
        //check associated Transform2D dirty flag and check local flag which indicates changes to radius 
        if (this.transform2D.isDirty || this.isDirty) {

            //set the new bounding circle
            this.boundingCircle = new Circle(this.transform2D.translation, this.radius);
            //set associated Transform2D dirty flag to false until translation, rotation, scale, or origin change again
            this.transform2D.isDirty = false;
            //set local dirty flag to false
            this.isDirty = false;
        }
        return this.boundingCircle;
    }

    /**
     * Called by the DebugDrawer to draw the collision surface to the canvas. In normal gameplay this method is never called
     * because the DebugDrawer is disabled.
     *
     * @param {Context} context
     * @param {number} alpha
     * @param {number} lineWidth
     * @param {string} strokeStyle
     * @memberof CircleCollisionPrimitive
     */
    DebugDraw(context, alpha, lineWidth, strokeStyle) {
        context.beginPath();
        super.DebugDraw(context, alpha, lineWidth, strokeStyle);
        context.arc(this.boundingCircle.center.x, this.boundingCircle.center.y, this.radius, 0, 2 * Math.PI);
        context.stroke();
    }

    ToString() {
        return this.boundingCircle.ToString();
    }

    Clone(){
        return new CircleCollisionPrimitive(this.transform2D.Clone(), this.radius);
    }
}

/**
* Represents the 4 possible directions that a collision can take place between two actors. We retun this type from the
* GetIntersectsLocation method which is normally called when testing for collisions between an actor and architecture.
* Why? Because when we collide with architecture we need to see in what direction the collision has taken place so that
* we can set the velocity in that direction to 0.
* 
* @see SamPlayerBehavior::HandleArchitectureCollision()
* @see Collision::GetIntersectsLocation()
* @class Collision
*/
const CollisionLocationType = Object.freeze({
    Top: 1,         //0001
    Right: 2,       //0010
    Bottom: 4,      //0100
    Left: 8         //1000
});

/**
* Represents the 3 possible options for a collision primitive for an actor (i.e. non-collidable with None, and collidable with a Rectangle or Circle collision surface).
* 
* @see MyConstants and collisionProperties found in a number of objects in this file
* @class Collision
*/
const CollisionPrimitiveType = Object.freeze({
    None: 1,
    Rectangle: 2,
    Circle: 4,
    /*
    //possible future types...
    Capsule : 8,
    Line: 16
    */
});

/**
* Provides Intersects and GetIntersectsLocation methods used by Sprites to determine if a collision has occured.
* @author niall mcguinness
* @version 1.0
* @class Collision
*/
class Collision {

    /**
     * Test for intersection between two actors. If one or more of the actors have a body then this method will predict if the actors WILL collide. 
     * This predictive collision detection prevents the actors from colliding and then being locked together (because the collision response blocks any further movement)
     *
     * @static
     * @param {Actor2D} actorA A collider representing an actor testing for collision against a collidee (e.g. a player (collider) against a wall (collidee))
     * @param {Actor2D} actorB A collidee representing the actor being testing for collision against
     * @returns True if intersection, otherwise false
     * @memberof Collision
     */
    static Intersects(actorA, actorB) {

        //if same (e.g. player testing against themself then return false)
        if (actorA === actorB)
            return false;

        if(actorA.collisionPrimitive == null || actorB.collisionPrimitive == null)
            throw "One or more sprites [" + actorA.id + "," + actorB.id + "] does not have a valid collision primitive!";


        //get bounding primitives for the two actors
        let boundingPrimitiveA = actorA.collisionPrimitive.GetBoundingPrimitive();
        let boundingPrimitiveB = actorB.collisionPrimitive.GetBoundingPrimitive();

        //if A has a body (i.e. it moves) then project the bounding primitive to where it WOULD be if the move was applied
        if (actorA.body != null) {
            boundingPrimitiveA = actorA.collisionPrimitive.GetBoundingPrimitive().Clone();
            boundingPrimitiveA.Move(actorA.body.velocityX, actorA.body.velocityY); //predictive collision
        }

        //if B has a body (i.e. it moves) then project the bounding primitive to where it WOULD be if the move was applied
        if (actorB.body != null) {
            boundingPrimitiveB = actorB.collisionPrimitive.GetBoundingPrimitive().Clone();
            boundingPrimitiveB.Move(actorB.body.velocityX, actorB.body.velocityY);
        }

        if (actorA.CollisionPrimitive instanceof CircleCollisionPrimitive &&
            actorB.CollisionPrimitive instanceof RectCollisionPrimitive) {
            return Collision.IntersectsCircleRect(boundingPrimitiveA, boundingPrimitiveB);
        }
        else if (actorA.CollisionPrimitive instanceof RectCollisionPrimitive &&
            actorB.CollisionPrimitive instanceof CircleCollisionPrimitive) {
            return Collision.IntersectsCircleRect(boundingPrimitiveB, boundingPrimitiveA);
        }
        else {
            return boundingPrimitiveA.Intersects(boundingPrimitiveB);
        }
    }

    /**
    * Test for intersection between two actors. If one or more of the actors have a body then this method will predict if the actors WILL collide. 
    * This predictive collision detection prevents the actors from colliding and then being locked together (because the collision response blocks any further movement)
    * 
    * 
    * @static
    * @param {Actor2D} actorA A collider representing an actor testing for collision against a collidee (e.g. a player (collider) against a wall (collidee))
    * @param {Actor2D} actorB A collidee representing the actor being testing for collision against
    * @returns CollisionLocationType indicating the direction of the intersection, otherwise null
    * @memberof Collision
    */
    static GetIntersectsLocation(actorA, actorB) {
        let collisionLocationType = null;

        // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
        if (Collision.Intersects(actorA, actorB)) {

            let boundingBoxA = actorA.collisionPrimitive.GetBoundingPrimitive();
            let boundingBoxB = actorB.collisionPrimitive.GetBoundingPrimitive();

            if (actorA.body != null) {
                boundingBoxA = actorA.collisionPrimitive.GetBoundingPrimitive().Clone();
                boundingBoxA.Move(actorA.body.velocityX, actorA.body.velocityY);
            }

            //if B has a body (i.e. it moves) then project the bounding primitive to where it WOULD be if the move was applied
            if (actorB.body != null) {
                boundingBoxB = actorB.collisionPrimitive.GetBoundingPrimitive().Clone();
                boundingBoxB.Move(actorB.body.velocityX, actorB.body.velocityY);
            }

            let hWidths = 0, hHeights = 0;

            if (boundingBoxA instanceof Rect && boundingBoxB instanceof Rect) {
                hWidths = (boundingBoxA.width + boundingBoxB.width) / 2;
                hHeights = (boundingBoxA.height + boundingBoxB.height) / 2;
            } else if (boundingBoxA instanceof Rect && boundingBoxB instanceof Circle) {
                hWidths = (boundingBoxA.width + boundingBoxB.radius) / 2;
                hHeights = (boundingBoxA.height + boundingBoxB.radius) / 2;
            } else if (boundingBoxA instanceof Circle && boundingBoxB instanceof Rect) {
                hWidths = (boundingBoxA.radius + boundingBoxB.width) / 2;
                hHeights = (boundingBoxA.radius + boundingBoxB.height) / 2;
            } else {
                hWidths = (boundingBoxA.radius + boundingBoxB.radius) / 2;
                hHeights = (boundingBoxA.radius + boundingBoxB.radius) / 2;
            }

            let vX = boundingBoxA.Center.x - boundingBoxB.Center.x;
            let vY = boundingBoxA.Center.y - boundingBoxB.Center.y;

            // figures out on which side we are colliding (top, bottom, left, or right)
            let oX = Math.ceil(hWidths - Math.abs(vX));
            let oY = Math.ceil(hHeights - Math.abs(vY));

            if (oX >= oY) {
                if (vY > 0) {
                    collisionLocationType = CollisionLocationType.Top;
                } else {
                    collisionLocationType = CollisionLocationType.Bottom;
                }
            } else {
                if (vX > 0) {
                    collisionLocationType = CollisionLocationType.Left;
                } else {
                    collisionLocationType = CollisionLocationType.Right;
                }
            }
        }
        return collisionLocationType;
    }

    /**
     * Test for intersection between two actor collision primitives where the collider is a circle and the collidee is a rect.
     * 
     * @static
     * @param {CollisionPrimitive} circle CollisionPrimitive representing a circular collision surface
     * @param {CollisionPrimitive} rect CollisionPrimitive representing a rectangular collision surface
     * @returns True if intersection, otherwise false
     * @see Collision::Intersects(actorA, actorB) 
     * @tutorial https://stackoverflow.com/questions/401847/circle-rectangle-collision-detection-intersection
     * @author https://yal.cc/rectangle-circle-intersection-test/
     * @memberof Collision
     */
    static IntersectsCircleRect(circle, rect) {
        let deltaX = circle.center.x - Math.max(rect.x, Math.min(circle.center.x, rect.x + rect.width));
        let deltaY = circle.center.y - Math.max(rect.y, Math.min(circle.center.y, rect.y + rect.height));
        return (deltaX * deltaX + deltaY * deltaY) < (circle.radius * circle.radius);
    }
}

/**
 * This component allows us to draw debug information to the screen (e.g. sprite and camera bounding boxes, fps etc)
 * @author niall mcguinness
 * @version 1.0
 * @class DebugDrawer
 */

class DebugDrawer {
    //#region Statics
    static BOUNDING_PRIMITIVE_COLOR = "red";
    static BOUNDING_PRIMITIVE_LINE_WIDTH = 2;
    static BOUNDING_PRIMITIVE_LINE_ALPHA = 1;
    //#endregion

    //#region Fields
    id = "";
    //#endregion

    //#region Properties
    //#endregion

    constructor(id, statusType, context, objectManager) {
        this.id = id;
        this.statusType = statusType;
        this.context = context;
        this.objectManager = objectManager;
    }


    //#region Draw, Update
    Update(gameTime) {
        //does nothing here yet...
    }

    Draw(gameTime) {
        if ((this.statusType & StatusType.Drawn) != 0) {
            this.DrawCollisionPrimitives();
        }
    }


    SetContext(transform) {
        this.context.translate(transform.translation.x, transform.translation.y);
        this.context.scale(transform.scale.x, transform.scale.y);
        this.context.rotate(transform.rotationInRadians);
        this.context.translate(-transform.translation.x, -transform.translation.y);
    }

    DrawCollisionPrimitives() {
        let sprites = objectManager.FindAll();

        if(sprites){
            //for each of the keys in the sprites array (e.g. keys could be...ActorType.Enemy, ActorType.Player)
            for (let key of Object.keys(sprites)) {
                //for the sprites inside the array for the current key call update
                for (let sprite of sprites[key]) {
                    if(sprite.collisionPrimitive){
                        this.context.save();
                        this.SetContext(sprite.Transform2D);
                        sprite.collisionPrimitive.DebugDraw(this.context, DebugDrawer.BOUNDING_PRIMITIVE_LINE_WIDTH,
                            DebugDrawer.BOUNDING_PRIMITIVE_LINE_ALPHA, DebugDrawer.BOUNDING_PRIMITIVE_COLOR);
                        this.context.restore();
                    }
                }
            }
        }
    }

    //#endregion
}