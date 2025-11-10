import Two from './node_modules/two.js/build/two.module.js';
import drawObject from "./drawObject.js";

var two = new Two({
  type: Two.Types.svg,
  fullscreen: true
}).appendTo(document.body);



two.renderer.domElement.style.background = '#dddddd';


var svg = await (await fetch('./svgs/pika_1-01.svg')).text().then(str => new DOMParser().parseFromString(str, 'image/svg+xml').querySelector('svg'));
var img = two.interpret(svg);
var svg2 = await (await fetch('./svgs/pika_2-01.svg')).text().then(str => new DOMParser().parseFromString(str, 'image/svg+xml').querySelector('svg'));
var img2 = two.interpret(svg2);
var svg3 = await (await fetch('./svgs/pika_3-01.svg')).text().then(str => new DOMParser().parseFromString(str, 'image/svg+xml').querySelector('svg'));
var img3 = two.interpret(svg3);

var x_max = two.width * 0.5;
var y_max = two.height * 0.5;

var pika1 = new drawObject(img, img2, img3, x_max, y_max);


img3.subdivide();
img.fill = '#ffff00';
img2.fill = '#ff0000';
img3.fill = '#000000';
two.add(img);
two.add(img2);
two.add(img3);

// Bind a function to scale and rotate the group to the animation loop.
two.bind('update', update);
// Finally, start the animation loop
two.play();

function update(frameCount) {
  pika1.update();
}

