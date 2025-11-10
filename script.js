import Two from './node_modules/two.js/build/two.module.js';
import drawObject from "./drawObject.js";

var two = new Two({
  type: Two.Types.svg,
  fullscreen: true
}).appendTo(document.body);



two.renderer.domElement.style.background = '#dddddd';


var svg1_1 = await (await fetch('./svgs/pika_1-01.svg')).text().then(str => new DOMParser().parseFromString(str, 'image/svg+xml').querySelector('svg'));
var svg2_1 = await (await fetch('./svgs/pika_2-01.svg')).text().then(str => new DOMParser().parseFromString(str, 'image/svg+xml').querySelector('svg'));
var svg3_1 = await (await fetch('./svgs/pika_3-01.svg')).text().then(str => new DOMParser().parseFromString(str, 'image/svg+xml').querySelector('svg'));

var svg1_2 = await (await fetch('./svgs/pika_1-02.svg')).text().then(str => new DOMParser().parseFromString(str, 'image/svg+xml').querySelector('svg'));
var svg2_2 = await (await fetch('./svgs/pika_2-02.svg')).text().then(str => new DOMParser().parseFromString(str, 'image/svg+xml').querySelector('svg'));
var svg3_2 = await (await fetch('./svgs/pika_3-02.svg')).text().then(str => new DOMParser().parseFromString(str, 'image/svg+xml').querySelector('svg'));

var svg1_3 = await (await fetch('./svgs/pika_1-03.svg')).text().then(str => new DOMParser().parseFromString(str, 'image/svg+xml').querySelector('svg'));
var svg2_3 = await (await fetch('./svgs/pika_2-03.svg')).text().then(str => new DOMParser().parseFromString(str, 'image/svg+xml').querySelector('svg'));
var svg3_3 = await (await fetch('./svgs/pika_3-03.svg')).text().then(str => new DOMParser().parseFromString(str, 'image/svg+xml').querySelector('svg'));

var svg1_4 = await (await fetch('./svgs/pika_1-04.svg')).text().then(str => new DOMParser().parseFromString(str, 'image/svg+xml').querySelector('svg'));
var svg2_4 = await (await fetch('./svgs/pika_2-04.svg')).text().then(str => new DOMParser().parseFromString(str, 'image/svg+xml').querySelector('svg'));
var svg3_4 = await (await fetch('./svgs/pika_3-04.svg')).text().then(str => new DOMParser().parseFromString(str, 'image/svg+xml').querySelector('svg'));

var img1 = two.interpret(svg1_1.cloneNode(true));
var img2 = two.interpret(svg2_1.cloneNode(true));
var img3 = two.interpret(svg3_1.cloneNode(true));

const pikaSvgs = [[svg1_1, svg2_1, svg3_1], [svg1_2, svg2_2, svg3_2],
                    [svg1_3, svg2_3, svg3_3], [svg1_4, svg2_4, svg3_4]]

const pikaCols = [['#f3d77b', '#e06d5d', '#131212'], ['#f9efb8', '#dca0a0', '#151515'],
['#ebb55b', '#f3d6a9', '#513a29'], ['#d8d0ad', '#c37629', '#252525']];

var sound1 = new Audio('./sounds/pikachu.mp3');
var sound2 = new Audio('./sounds/pichu.mp3');
var sound3 = new Audio('./sounds/raichu.mp3');
var sound4 = new Audio('./sounds/mimikyu.mp3');

const pikaSounds = [sound1, sound2, sound3, sound4];

var x_max = two.width * 0.5 - 200;
var y_max = two.height * 0.5 - 200;

var curr_img = 0;

var pika = new drawObject(img1, img2, img3, pikaCols[curr_img][0], pikaCols[curr_img][1], pikaCols[curr_img][2], x_max, y_max, pikaSounds[curr_img]);


// Bind a function to scale and rotate the group to the animation loop.
two.bind('update', update);
// Finally, start the animation loop
two.play();

function update() {
  
  pika.update();
  if(pika.checkOffScreen(two)) {
    
    curr_img += 1;
    if(curr_img > 3)
      curr_img = 0;

    var new_img1 = two.interpret(pikaSvgs[curr_img][0].cloneNode(true));
    var new_img2 = two.interpret(pikaSvgs[curr_img][1].cloneNode(true));
    var new_img3 = two.interpret(pikaSvgs[curr_img][2].cloneNode(true));

    pika.setNewImage(new_img1, new_img2, new_img3, pikaCols[curr_img][0], pikaCols[curr_img][1], pikaCols[curr_img][2], pikaSounds[curr_img]);
    
    two.remove(this.img1);
    two.remove(this.img2);
    two.remove(this.img3);
  }
}

