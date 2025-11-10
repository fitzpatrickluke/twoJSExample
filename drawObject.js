export default class drawObject {
    constructor(img1, img2, img3, x_max, y_max) {
        this.img1 = img1;
        this.img2 = img2;
        this.img3 = img3;
        this.x = 0;
        this.y = 0;
        this.x_max = x_max;
        this.y_max = y_max;
        this.x_int = 1/this.y_max*4000;
        this.y_int = 1/this.x_max*4000;

        this.timerCount = 0;
    }

    getImg(imgNum) {
        switch(imgNum) {
            case 1: return this.img1; break;
            case 2: return this.img2; break;
            case 3: return this.img3; break;
        }
    }

    update() {
        if(this.x < this.x_max)
            this.x += this.x_int;
        if(this.y < this.y_max)
            this.y += this.y_int;
        
        this.img1.position.set(this.x, this.y_max);
        this.img2.position.set(this.x, this.y_max);
        this.img3.position.set(this.x, this.y_max);
        
        /*
        this.timerCount += 1;
        if(this.timerCount > 60*2) {
            this.x = 0;
            this.y = 0;
            this.timerCount = 0;
        }
            */

    }
}