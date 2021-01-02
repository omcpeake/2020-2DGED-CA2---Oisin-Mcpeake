/**
 * Represents any entity within a game with position information (e.g. camera, sprite, menu element)
 * This class contains a collisionPrimitive object which stores either a rect or circle collision primitive type.
 * This means that we can choose which primitive best suits the shape or CD/CR requirements for the actor it will be used with.
 *
 * @author niall mcguinness
 * @version 1.1
 * @class Actor2D
 */
class Actor2D {
    //#region Fields
    collisionPrimitive = null;
    controllers = []; //or we could instanciate using... = new Array();
    //#endregion
  
    //#region  Properties
    get Controllers() {
      return this.controllers;
    }

    get ID() {
      return this.id;
    }
    get ActorType() {
      return this.actorType;
    }
    get Transform2D() {
      return this.transform2D;
    }
    get StatusType() {
      return this.statusType;
    }
    get CollisionPrimitive() {
      return this.collisionPrimitive;
    }
    set CollisionPrimitive(collisionPrimitive) {
      this.collisionPrimitive = collisionPrimitive;
    }
    set ID(id) {
      this.id = id;
    }
    set ActorType(actorType) {
      this.actorType = actorType;
    }
    set Transform2D(transform2D) {
      this.transform2D = transform2D;
    }
    set StatusType(statusType) {
      this.statusType = statusType;
    }
    //#endregion

    constructor(id, actorType, statusType, transform2D) {
      this.id = id;
      this.actorType = actorType;
      this.statusType = statusType;
      this.transform2D = transform2D; 
    }
  
    /**
     * Use to add a controller instance to the array of controllers executed for this actor.
     *
     * @param {*} controller
     * @memberof Actor2D
     */
    AttachController(controller) {
      if(this.controllers == undefined)
        this.controllers = [];
  
      this.controllers.push(controller);
    }
  
    /**
     * Use to remove a controller instance, by id, from the array of controllers executed for this actor.
     *
     * @param {string} id
     * @memberof Actor2D
     */
    DetachControllerByID(id) {
      for (let i = 0; i < this.controllers.length; i++) {
        if (this.controllers[i].ID.Equals(id)) {
          this.controllers.splice(i, 1);
          i--;
        }
      }
    }
  
    /**
     * Updates state information and executes attached controller(s)
     *
     * @param {GameTime} gameTime
     * @see ObjectManager::Update()
     * @memberof Actor2D
     */
    Update(gameTime) {
      if(this.controllers != undefined)
      {
        for (let i = 0; i < this.controllers.length; i++)
          this.controllers[i].Execute(gameTime, this);
      }
    }
  
    //#region Equals, Clone, ToString
    Equals(other) {
  
      return GDUtility.IsSameTypeAsTarget(this, other) && (
        this.id === other.ID &&
        this.actorType === other.ActorType &&
        this.transform2D.Equals(other.Transform2D)
      );
    }
  
    Clone() {
      //make a clone of the actor
      let clone = new Actor2D(
        "clone - " + this.id,
        this.actorType,
        this.transform2D.Clone(),
        this.statusType
      );
  
      //now clone all the actors attached behaviors
      for (let controller of this.controllers) 
        clone.AttachController(controller.Clone());

      if(this.collisionPrimitive)
        clone.collisionPrimitive = this.collisionPrimitive.Clone();
  
      //lastly return the actor
      return clone;
    }
  
    ToString() {
      return (
        "[" +
        this.id +
        "," +
        this.actorType +
        "," +
        this.transform2D.ToString() +
        "]"
      );
    }
    //#endregion
  }