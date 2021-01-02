/**
 * This class is responsible for storing, drawing, and updating all the sprites within the game.
 * @author niall mcguinness
 * @version 2.0
 * @class ObjectManager
 */

class ObjectManager {
  //#region Fields
  context;
  sprites = [];
  statusType;
  //#endregion

  //#region Properties
  get StatusType() {
    return this.statusType;
  }
  set StatusType(value) {
    this.statusType = value;
  }
  //#endregion

  /**
   * Constructs an empty ObjectManager
   *
   * @param {CanvasRenderingContext2D} context Handle to draw context
   */
  constructor(context, statusType) {
    this.context = context;
    this.statusType = statusType;
  }

  //#region Add, Remove, Find, Clear

  /**
   * Adds a new Sprite to the sprites array using the ActorType to determine in which row of the 2D sprites array the new Sprite object will be added.
   * @param {Sprite} sprite A Sprite object
   */
  Add(sprite) {
    //do we have a row for this ActorType?
    if (!this.sprites[sprite.ActorType]) {
      this.sprites[sprite.ActorType] = [];
    }
    this.sprites[sprite.ActorType].push(sprite);

    //sort all background sprites by depth 0 (back) -> 1 (front)
    objectManager.Sort(sprite.ActorType, function sortAscendingDepth(a, b) {
      return a.LayerDepth - b.LayerDepth;
    });
  }

  /**
   * Removes a sprite from the sprites array.
   * @param {Sprite} sprite
   * @returns {Boolean} True if removed, otherwise false
   */
  Remove(sprite) {
    if (this.sprites[sprite.ActorType]) {
      let index = this.sprites[sprite.ActorType].indexOf(sprite);
      if (index != -1) {
        this.sprites[sprite.ActorType].splice(index, 1);
        return true;
      }
    } else return false;
  }

  /**
   * Removes the first sprite of the actorType specified that matches the predicate in the sprites array.
   * @param {ActorType} actorType ActorType which determines which row in this.sprites that we look in (e.g. Background, NPC, Pickup)
   * @param {Function} predicate Arrow function used to filter actors in the find
   * @returns {Boolean} True if removed, otherwise false
   */
  RemoveFirstBy(actorType, predicate) {
    if (this.sprites[actorType]) {
      this.sprites[actorType].splice(this.FindIndex(actorType, predicate), 1);
      return true;
    } else return false;
  }

  /**
   * Removes all the sprites of the actorType specified that match the predicate in the sprites array.
   * @param {ActorType} actorType ActorType which determines which row in this.sprites that we look in (e.g. Background, NPC, Pickup)
   * @param {Function} predicate Arrow function used to filter actors in the find
   * @returns {Boolean} True if removed, otherwise false
   */
  RemoveAllBy(actorType, predicate) {
    let indices = this.FindIndices(actorType, predicate);
    for (let i = indices.length - 1; i >= 0; i--)
      this.sprites[actorType].splice(this.sprites[actorType][i], 1);

    return indices.length != 0 ? true : false;
  }

  /**
   * Removes all the sprites of the actorType specified that match the predicate in the sprites array.
   * @param {ActorType} actorType ActorType which determines which row in this.sprites that we look in (e.g. Background, NPC, Pickup)
   * @param {Function} predicate Arrow function used to filter actors in the find
   * @returns {Boolean} True if removed, otherwise false
   */
  RemoveAllByType(actorType) {
    if (this.sprites[actorType]) {
      this.sprites[actorType].splice(0, this.sprites[actorType].length);
      return true;
    } else return false;
  }

  /**
   * Returns the reference to the first sprite to match the predicate.
   * @param {ActorType} actorType ActorType which determines which row in this.sprites that we look in (e.g. Background, NPC, Pickup)
   * @param {Function} predicate Arrow function used to filter actors in the find
   * @returns {Sprite} Reference to the found sprite in the sprites array, otherwise null
   */
  Find(actorType, predicate) {
    let index = this.sprites[actorType].findIndex(predicate);
    if (index != -1) return this.sprites[actorType][index];
    else return null;
  }

  /**
   * Returns the position of the first sprite to match the predicate.
   * @param {ActorType} actorType ActorType which determines which row in this.sprites that we look in (e.g. Background, NPC, Pickup)
   * @param {Function} predicate Arrow function used to filter actors in the find
   * @returns {Number} Zero-based index of the found sprite in the array of sprites
   */
  FindIndex(actorType, predicate) {
    if (this.sprites[actorType])
      return this.sprites[actorType].findIndex(predicate);
    else return -1;
  }

  /**
   * Returns an array of all the sprites matching the actorType
   * @param {ActorType} actorType
   * @returns {Array} An array of all sprites of the actorType specified, otherwise null
   */
  Find(actorType) {
    if (this.sprites[actorType]) return this.sprites[actorType];
    else return null;
  }

  /**
   * Returns an array of all the sprites in the object manager
   * @returns {Array} An array of all sprites, otherwise null
   */
  FindAll() {
    return this.sprites;
  }

  
  /**
   * Sorts the array of ActorType sprites using the function provided
   *
   * @param {ActorType} actorType
   * @param {Function} compareFunction
   * @memberof ObjectManager
   */
  Sort(actorType, compareFunction) {
    if (this.sprites[actorType]) {
      this.sprites[actorType].sort(compareFunction);
    }
  }

  Clear() {
    //why not just set length = 0 or arr = []?
    //see https://www.tutorialspoint.com/in-javascript-how-to-empty-an-array

    //remove each of the sprites inside each of the arrays
    for (let i = 0; i < this.sprites.length; i++) {
      if (this.sprites[i] != undefined)
        //if we have a valid array at index == i
        this.sprites[i].splice(0, this.sprites[i].length);
    }

    //remove each empty array from the parent array
    this.sprites.splice(0, this.sprites.length);
  }
  //#endregion

  //#region Update & Draw

  /**
   * Called in the main game JS file to update all sprites stored in the ObjectManager
   * Without this method then no Sprites would be updated in their behaviour (e.g. check for collision, listen for keyboard)
   * @param {GameTime} gameTime GameTime object
   */
  Update(gameTime) {
    if ((this.statusType & StatusType.Updated) != 0) {
      for (let key in this.sprites) {
        for (let sprite of this.sprites[key]) {
          sprite.Update(gameTime);
        }
      }
    }
  }

  /**
   * Called in the main game JS file to draw all sprites stored in the ObjectManager
   * Without this method then no Sprites would be visible on the screen
   *
   * @param {GameTime} gameTime GameTime object
   */
  Draw(gameTime) {

    if((this.statusType & StatusType.Drawn) != 0){
        for (let key in this.sprites) {
        for (let sprite of this.sprites[key]) {
            sprite.Draw(gameTime);
        }
        }
    }
  }
  //#endregion
}

