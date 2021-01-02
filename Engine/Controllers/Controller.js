/**
 * Parent class for all controllers.
 * @author niall mcguinness
 * @version 1.0
 * @class Controller
 */
class Controller {

    constructor() {
    }
  
    /**
     * Executes the code inside the method to modify the parent (usually modifying Transform2D or AnimatedSpiteArtist)
     *
     * @param {*} gameTime
     * @param {*} parent
     * @memberof Controller
     * @see SimpleMoveController (PlatformPanic_2 demo)
     */
    Execute(gameTime, parent) {
  
    }
  
    //#region Common Methods - Equals, ToString, Clone
    Equals(other) {
      //to do...
      throw "Not Yet Implemented";
    }
  
    ToString() {
      //to do...
      throw "Not Yet Implemented";
    }
  
    Clone() {
      //to do...
      throw "Not Yet Implemented";
    }
    //#endregion
  }