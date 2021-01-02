/**
 * Moves the parent sprite based on keyboard input and detect collisions against platforms, pickups etc
 * @author niall mcguinness
 * @version 1.0
 * @class PlayerController
 */
class PlayerController {
  //#region Static Fields
  //#endregion

  //#region Fields
  //#endregion

  //#region Properties
  //#endregion

  constructor(moveKeys, runVelocity, jumpVelocity) {
    this.moveKeys = moveKeys;
    this.runVelocity = runVelocity;
    this.jumpVelocity = jumpVelocity;
  }

  //#region Core Methods - doesnt need to change
  Execute(gameTime, parent) {
    this.HandleInput(gameTime, parent);
    this.ApplyForces(parent);
    this.CheckCollisions(parent);
    this.ApplyInput(parent);
  }

  HandleInput(gameTime, parent) {
    this.HandleMove(gameTime, parent);
    this.HandleJump(gameTime, parent);
    this.HandleMouse(gameTime, parent);
    this.HandleKeyboard(gameTime, parent);
  }

  ApplyForces(parent) {
    parent.Body.ApplyGravity();
    parent.Body.ApplyFriction();
  }

  CheckCollisions(parent) {
    parent.Body.IsOnGround = false;
    this.HandlePlatformCollision(parent);
    this.HandleEnemyCollision(parent);
    this.HandlePickupCollision(parent);
  }

  ApplyInput(parent) {
    //if on the ground then dont apply any Y velocity
    if (parent.Body.IsOnGround) {
      parent.Body.SetVelocityY(0);
    }

    //if we have small left over velocity values then set to zero
    if (Math.abs(parent.Body.velocityX) <= Body.MIN_SPEED)
      parent.Body.velocityX = 0;
    if (Math.abs(parent.Body.velocityY) <= Body.MIN_SPEED)
      parent.Body.velocityY = 0;

    //apply velocity to (x,y) of the parent's translation
    parent.Transform2D.TranslateBy(
      new Vector2(parent.Body.velocityX, parent.Body.velocityY)
    );

    //update the bounding surface when the player moves
    parent.collisionPrimitive.Move(
      parent.Body.velocityX,
      parent.Body.velocityY
    );
  }

  HandlePlatformCollision(parent) {
    let sprites = objectManager.Find(ActorType.Platform);

    if (sprites) {
      for (let i = 0; i < sprites.length; i++) {
        let sprite = sprites[i];

        let collisionLocationType = Collision.GetIntersectsLocation(
          parent,
          sprite
        );

        if (
          collisionLocationType === CollisionLocationType.Left ||
          collisionLocationType === CollisionLocationType.Right
        ) {
          parent.Body.SetVelocityX(0);
        } else if (collisionLocationType === CollisionLocationType.Bottom) {
          parent.Body.IsOnGround = true;
          parent.Body.IsJumping = false;
        } else if (collisionLocationType === CollisionLocationType.Top) {
          parent.Body.SetVelocityY(1);
        }
      }
    }
  }

  //#endregion

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

  //#region Your Game Specific Methods - add code for more CD/CR or input handling


  /**
   * Add code in the method to listen for mouse input and do something in the game
   *
   * @param {*} gameTime
   * @param {*} parent
   * @memberof PlayerController
   */
  HandleMouse(gameTime, parent) {}

    /**
   * Add code in the method to listen for keyboard input and do something in the game
   *
   * @param {*} gameTime
   * @param {*} parent
   * @memberof PlayerController
   */
  HandleKeyboard(gameTime, parent) {}

  /**
   * Change the names of the takes in this method to suit the take names in your game
   *
   * @param {*} gameTime
   * @param {*} parent
   * @memberof PlayerController
   */
  HandleMove(gameTime, parent) {
    //if left or right key pressed and player is on the ground then add/remove move velocity
    if (keyboardManager.IsKeyDown(this.moveKeys[0])) {
      parent.Body.AddVelocityX(-this.runVelocity * gameTime.ElapsedTimeInMs);
      //add your code here...
      parent.Artist.SetTake("run_left");
    } else if (keyboardManager.IsKeyDown(this.moveKeys[1])) {
      parent.Body.AddVelocityX(this.runVelocity * gameTime.ElapsedTimeInMs);
      //add your code here...
      parent.Artist.SetTake("run_right");
    }
  }

  /**
   * Change the code in this method to play a particular sound when the player jumps
   * and (optionally) change the animation
   *
   * @param {*} gameTime
   * @param {*} parent
   * @memberof PlayerController
   */
  HandleJump(gameTime, parent) {
    //if jump key is pressed and player is not jumping and on the ground then jump
    if (
      keyboardManager.IsKeyDown(this.moveKeys[2]) &&
      !parent.Body.IsJumping &&
      parent.Body.IsOnGround
    ) {
      parent.Body.IsJumping = true;
      parent.Body.IsOnGround = false;
      parent.Body.SetVelocityY(-this.jumpVelocity * gameTime.ElapsedTimeInMs);

      //add your code here...
      //set take to "player_jump"
      soundManager.Play("gunshot"); //obviously we would source and load an appropriate "jump" sound here
    }
  }

  /**
   * Change the code in this method to play a particular sound when the player collects
   * a pickup, update the score based on the pickup ID, and possibly play a celebration 
   * animation if the pickup is the final level objective.
   *
   * @param {*} gameTime
   * @param {*} parent
   * @memberof PlayerController
   */
  HandlePickupCollision(parent) {
    let sprites = objectManager.Find(ActorType.Pickup);

    if (sprites) {
      for (let i = 0; i < sprites.length; i++) {
        let sprite = sprites[i];

        //we can use simple collision check here (i.e. Intersects) because dont need to think was it top, bottom, left, or right
        if (Collision.Intersects(parent, sprite)) {
          //add your code here...

          //add to the score
          score += 10;

          //play a sound
          soundManager.Play("coin_pickup");

          //remove the pickup
          objectManager.Remove(sprite);
        }
      }
    }
  }

  /**
   * Change the code in this method to play a particular sound when the player 
   * collides with the enemy, or remove the enemy, or kill the player and change
   * to game over screen (i.e. by setting object manager to StatusType.Drawn only to pause
   * update and then by setting the "menu_winlose" <div> block to display=block with a message set in
   * the innerHTML of that <div> block )
   *
   * @param {*} gameTime
   * @param {*} parent
   * @memberof PlayerController
   */
  HandleEnemyCollision(parent) {
    let sprites = objectManager.Find(ActorType.Enemy);

    if (sprites) {
      for (let i = 0; i < sprites.length; i++) {
        let sprite = sprites[i];

        if (Collision.Intersects(parent, sprite)) {
          //add your code here...
        }
      }
    }
  }
  //#endregion
}
