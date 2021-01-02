/**
 * Primitive to support drawing arcs (i.e. portion of a circle)
 */
class Arc {

    constructor(x, y, radius, startAngle, endAngleInRads) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngleInRads = endAngleInRads;
    }

    /**
     * Method to render the arc to the canvas referenced by the context, ctx
     *
     * @param {*} ctx
     * @param {*} lineWidth
     * @param {*} strokeStyle
     * @param {*} fillStyle
     * @param {*} drawClockwise
     * @memberof Arc
     */
    draw(ctx, lineWidth, strokeStyle, fillStyle, drawClockwise) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngleInRads, drawClockwise);
        if (lineWidth != -1)
            ctx.lineWidth = lineWidth;
        if (strokeStyle != null) {
            ctx.strokeStyle = strokeStyle;
            ctx.stroke();
        }
        if (fillStyle != null) {
            ctx.fillStyle = fillStyle;
            ctx.fill();
        }
        ctx.closePath();
    }

    /**
     * Provides a copy of the current object
     *
     * @returns Arc object (deep-copy)
     * @memberof Arc
     */
    clone() {
        return new Arc(this.x, this.y, this.radius, this.startAngle, this.endAngleInRads);
    }

    //to do...add equals

    equals(other){
        if(other == null || other == undefined || 
            other.constructor.name != this.constructor.name)
            return false;

        return this.x == other.x && this.y == other.y
        && this.radius == other.radius
            && this.startAngle == other.startAngle
                && this.endAngleInRads == other.endAngleInRads;
    }
}