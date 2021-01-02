/**
 * Renders the pixel data from a spritesheet at a source location (x, y, width, heigth) stored in the current cell index of an array of cells.
 * The array of cells indicate the (x, y, width, height) data for each cell in the animation.
 * @author niall mcguinness
 * @version 1.0
 * @class AnimatedSpriteArtist
 */

class AnimatedSpriteArtist extends Artist {

    //#region  Fields
    //#endregion 

    //#region  Properties
    get AnimationData() {
        return this.animationData;
    }
    set AnimationData(animationData) {
        this.animationData = animationData;
    }
    //#endregion

    constructor(context, animationData) {
        super(context, animationData.spriteSheet, animationData.alpha);
        this.animationData = animationData;
        this.frameRatePerSec = 0;
        this.frameIntervalInMs = 0;
        this.cells = [];
        this.startCellIndex = 0;
        this.endCellIndex = 0;
        this.currentCellIndex = 0;
        this.currentTakeName = "";
        this.currentLoopCount = 0;
    }

    /**
     * Calls this method to set what animated "take" the artist will draw
     *
     * @param {String} takeName
     * @memberof AnimatedSpriteArtist
     */
    SetTake(takeName) {
        if (this.animationData.takes[takeName]) {
            if (takeName != this.currentTakeName) {
                let take = this.animationData.takes[takeName];
                this.currentTakeName = takeName;
                this.timeSinceLastFrameInMs = 0;
                this.frameRatePerSec = take.fps;
                this.frameIntervalInMs = Math.floor(1000.0 / this.frameRatePerSec);
                this.cells = take.cellData;
                this.startCellIndex = take.startCellIndex;
                this.endCellIndex = take.endCellIndex;
                this.maxLoopCount = take.maxLoopCount;
                this.currentLoopCount = 0;
                this.currentCellIndex = this.startCellIndex; 
                
                if((this.animationData.takes[takeName].cellData.length == 0) || (this.startCellIndex < 0)
                            || (this.endCellIndex < 0) || (this.endCellIndex < this.startCellIndex))
                    throw "Error: takeName(" + takeName + ") is invalid! Check the value set in constants file.";
                
                if(this.endCellIndex - this.startCellIndex > this.animationData.takes[takeName].cellData.length)
                    throw "Error: Either startCellIndex and/or endCellIndex for takeName(" + takeName + ") are invalid! Check the values set in constants file.";
        
            }
        } else
            throw "Error: " + takeName + " does not exist!";
    }

    /**
     * Used to get the original (un-scaled) dimensions of a single frame of the sprite for a user-specifed take name (e.g. walk).
     * This method is normally called when we create the transform2D for the animated sprite
     *
     * @param {string} takeName
     * @returns Vector2 representing the original (un-scaled) dimensions of the sprite used for the current take
     * @memberof AnimatedSpriteArtist
     */
    GetSingleFrameDimensions(takeName) {
        if (this.animationData.takes[takeName]) {
            return this.animationData.takes[takeName].boundingBoxDimensions;
        } else
            throw takeName + " does not exist!";
    }

    /**
     * Pauses animation
     *
     * @memberof AnimatedSpriteArtist
     */
    Pause() {
        this.paused = true;
    }

    /**
     * Unpauses animation
     *
     * @memberof AnimatedSpriteArtist
     */
    Unpause() {
        this.paused = false;
    }

    /**
     * Resets animation
     *
     * @memberof AnimatedSpriteArtist
     */
    Reset() {
        this.paused = false;
        this.currentTakeIndex = -1;
        this.currentCellIndex = this.startCellIndex;
        this.timeSinceLastFrameInMs = 0;
    }

    /**
     * Advances animation to the next frame based on elapsed time since last frame
     *
     * @param {GameTime} gameTime
     * @param {Sprite} parent
     * @memberof AnimatedSpriteArtist
     */
    Update(gameTime, parent) {
        if (!this.paused) {
            this.timeSinceLastFrameInMs += Math.round(gameTime.ElapsedTimeInMs);
            if (this.timeSinceLastFrameInMs > this.frameIntervalInMs) {
                this.Advance(parent);
                this.timeSinceLastFrameInMs = 0;
            }
        }
    }

    /**
     * Renders pixel data from spritesheet to canvas on a frame by frame basis
     *
     * @param {GameTime} gameTime (unused)
     * @param {Sprite} parent 
     * @param {Camera2D} activeCamera 
     * @memberof AnimatedSpriteArtist
     */
    Draw(gameTime, parent) {
        //save whatever context settings were used before this (color, line, text styles)
        this.Context.save();

        //apply the sprite transformations to the sprite 
        parent.SetContext(this.Context);

        //set transparency
        this.Context.globalAlpha = this.Alpha;

        //get next frame of data
        let cell = this.cells[this.currentCellIndex];

        //draw frame
        this.Context.drawImage(this.animationData.spriteSheet,
            cell.x, cell.y,
            cell.width, cell.height,
            parent.transform2D.translation.x - parent.transform2D.origin.x, 
            parent.transform2D.translation.y - parent.transform2D.origin.y,  
            cell.width, cell.height);

        //restore whatever context settings were used before save() was called above
        this.Context.restore();

    }

    /**
     * Increments the current cell index and wraps if > length
     *
     * @memberof AnimatedSpriteArtist
     */
    Advance(parent) {
        //if not at end frame then advance 1
        if (this.currentCellIndex < this.endCellIndex)
            this.currentCellIndex++;
        else {
            //increment the number of times that the animation has run
            this.currentLoopCount++;

            //if running infinitely then restart
            this.currentCellIndex = this.startCellIndex;

            //if max loop count has been reached then remove this sprite
            if (this.currentLoopCount == this.maxLoopCount)
                NotificationCenter.Notify(new Notification(NotificationType.Sprite, NotificationAction.RemoveFirst, [parent]));
        }
    }

    //#region Equals, Clone, ToString 

    Equals(other) {
        return super.Equals(other) && this.animationData.id === other.AnimationData.id &&
            this.animationData.spriteSheet === other.AnimationData.spriteSheet;
    }

    Clone() {
        let clone = new AnimatedSpriteArtist(this.animationData); //a shallow copy is fine, since obj contains no sprite specific data (e.g. velocity, keys)
        clone.SetTake(this.currentTakeName);
        return clone;
    }

    ToString() {
        return "[" + this.animationData.id + "]";
    }

    //#endregion

}