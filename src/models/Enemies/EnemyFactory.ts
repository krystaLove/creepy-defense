import Enemy from "../Enemy";
import Dog from "./Dog";

export function createEnemy(scene, path, type: ENEMIES) : Enemy{
    switch(type){
        case ENEMIES.DOG: 
            return new Dog(scene, path);
            break;
        default:
            return new Enemy(scene, path);
    }
}

export const enum ENEMIES{
    DOG
}