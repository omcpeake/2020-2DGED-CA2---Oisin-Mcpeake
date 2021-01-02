/**
 * Moves bullet sprite based either on time-based or user input.
 * @author niall mcguinness
 * @version 1.0
 * @class BulletController
 */
class BulletController
{
    /**
     * Creates an instance of SimpleMoveController to show how we can move a sprite with a controller
     * @param {Vector2} moveDirection Vector2 direction mormalize with length=1 (see Vector2.Normalize())
     * @param {Number} moveSpeed Floating-point speed value
     * @memberof BulletController
     */
   

     
    constructor(moveDirection, moveSpeed)
    {
          this.moveDirection = moveDirection;
          this.moveSpeed = moveSpeed;
          this.timeSinceLastBullet=0;
    }


    /**
     * Executes the code inside the method to modify the parent (usually modifying Transform2D or AnimatedSpiteArtist)
     *
     * @param {*} gameTime
     * @param {*} parent
     * @memberof BulletController
     */

     
   
    Execute(gameTime, parent)
    {
       let translateBy = Vector2.MultiplyScalar(this.moveDirection, gameTime.ElapsedTimeInMs * this.moveSpeed);
       parent.Transform2D.TranslateBy(translateBy);
      
      // parent.Transform2D.RotateBy(GDMath.ToRadians(30));

      //check each player in the objectmanager and check for collision
         //remove bullet
         //decrement score

         
         
         

    }


   Clone() {
    return new BulletController(this.moveDirection, this.moveSpeed);
   }

   //to do...Equals, GetHashCode

}