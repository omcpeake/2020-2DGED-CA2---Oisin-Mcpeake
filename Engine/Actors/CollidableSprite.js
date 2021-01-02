/**
 * Represents a drawn player character or non-player character within a game with position information (e.g. player, enemy)
 * and, most importantly, a physics Body instance which can be used to apply gravity and friction.
 * 
 * Use this class when you create a PC or Non-PC that needs to include these forces.
 * See SamPlayerBehavior classes in each game for sample code showing how the body is used.
 * 
 * @author niall mcguinness
 * @version 1.0
 * @class CollidableSprite
 */

class CollidableSprite extends Sprite {
    //#region  Fields
    body = new Body();
    //#endregion

    //#region  Properties
    get Body() {
        return this.body;
    }
    set Body(body) {
        this.body = body || new Body(); //set default if not defined
    }
    //#endregion


    constructor(id, actorType, statusType, transform2D, artist, layerDepth = 1) {
        super(id, actorType, statusType, transform2D, artist, layerDepth);
    }

    //#region Equals, Clone, ToString
    Equals(other) {
        return super.Equals(other) && this.body.Equals(other.Body);
    }

    ToString() {
        //lazy option is to call parent method, add a class specific method here later...
        return super.ToString();
    }

    Clone() {
        //make a clone of the actor
        let clone = new CollidableSprite(
            this.ID,
            this.ActorType,
            this.StatusType,
            this.Transform2D.Clone(),
            this.Artist.Clone(),
            this.LayerDepth
        );

        //now clone all the actors attached behaviors
        for (let controller of this.Controllers)
            clone.AttachController(controller.Clone());

        if (this.collisionPrimitive)
            clone.collisionPrimitive = this.collisionPrimitive.Clone();

        return clone;
    }
    //#endregion
}