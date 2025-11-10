export default class drawObject {
    constructor(img1, img2, img3, col1, col2, col3, x_max, y_max) {
        this.img1 = img1;
        this.img2 = img2;
        this.img3 = img3;
        this.img1.fill = col1;
        this.img2.fill = col2;
        this.img3.fill = col3;
        this.x_1 = -400;
        this.x_2 = -400;
        this.x_3 = -400;
        this.y = 0;
        this.x_max = x_max;
        this.y_max = y_max;
        this.x_int_1 = 1/this.y_max*10000;
        this.x_int_2 = 1/this.y_max*9000;
        this.x_int_3 = 1/this.y_max*8000;
        this.y_int = 1/this.x_max*5000;

        this.sound = new Audio('./sounds/pikachu.mp3');
        this.soundPlayed = false;

        this.waitingToReturn = false;
        this.returning = false;
        this.waitTimer = 0; 

        this.scaleCount = 0;
        this.scale_int = 0.001;

    }

    getImg(imgNum) {
        switch(imgNum) {
            case 1: return this.img1; break;
            case 2: return this.img2; break;
            case 3: return this.img3; break;
        }
    }

    checkOffScreen(width) {
        if(this.x1 > width + 400)
            return true;
        else
            return false;
    }

    update() {

        // going forward
        if (!this.returning) {
        // going forward
        if (this.x_1 < this.x_max) this.x_1 += this.x_int_1;
        else this.x_1 = this.x_max;
        if (this.x_2 < this.x_max) this.x_2 += this.x_int_2;
        else this.x_2 = this.x_max;
        if (this.x_3 < this.x_max) this.x_3 += this.x_int_3;
        else this.x_3 = this.x_max;

        // Play sound once when arrived
        if (
            !this.soundPlayed &&
            this.x_1 === this.x_max &&
            this.x_2 === this.x_max &&
            this.x_3 === this.x_max
        ) {
            this.sound.play();
            this.soundPlayed = true;
            this.waitingToReturn = true;
            this.waitTimer = 0;
        }
        } 
        // going backward
        else {
        if (this.x_1 > -400) this.x_1 += this.x_int_1;
        if (this.x_2 > -400) this.x_2 += this.x_int_2;
        if (this.x_3 > -400) this.x_3 += this.x_int_3;
        }

        // at destination
        if (this.waitingToReturn) {
        this.waitTimer += 1;
        this.scaleCount += 1;
        if(this.scaleCount > 60) {
            this.scale_int *= -1;
            this.scaleCount = 0;
        }
        this.img1.scale += this.scale_int;
        this.img2.scale += this.scale_int;
        this.img3.scale += this.scale_int;
        // wait around 1 seconds
        if (this.waitTimer >= 120) {
            this.waitingToReturn = false;
            this.returning = true;
        }
        }

        // upadat pos
        this.img1.position.set(this.x_1, this.y_max);
        this.img2.position.set(this.x_2, this.y_max);
        this.img3.position.set(this.x_3, this.y_max);
    }
}
