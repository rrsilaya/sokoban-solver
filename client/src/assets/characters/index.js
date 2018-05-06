import background from './background.jpg';
import box from './box.png';
import box_dot from './box_in.png';
import wall from './wall.png';
import dot from './floor_dot.png';
import player from './warehouseKeeper.png';

const Image = {
  background: new window.Image(),
  wall: new window.Image(),
  box: new window.Image(),
  box_dot: new window.Image(),
  dot: new window.Image(),
  player: new window.Image()
};

Image.background.src = background;
Image.wall.src = wall;
Image.box.src = box;
Image.box_dot.src = box_dot;
Image.dot.src = dot;
Image.player.src = player;

const graphics = {
  background: Image.background,
  wall: Image.wall,
  box: Image.box,
  box_dot: Image.box_dot,
  dot: Image.dot,
  player: Image.player,
}

export default graphics;