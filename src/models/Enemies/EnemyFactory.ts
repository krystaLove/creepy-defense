import * as Utils from "../../utils";
import Enemy from "../Enemy";
import Dog from "./Dog";
import Eye from "./Eye";
import Bigboy from "./Bigboy";

export function createEnemy(scene, path, type: ENEMIES) : Enemy{
    let val: Enemy;
    switch(type){
        case ENEMIES.DOG: 
            val = new Dog(scene, path);
            break;
        case ENEMIES.EYE:
            val = new Eye(scene, path);
            val.scaleX = -val.scaleX;
            break;
        case ENEMIES.BIGBOY:
            val = new Bigboy(scene, path);
            val.scaleX = -val.scaleX;
            break;
        default:
            val = new Enemy(scene, path);
            break;
    }
    return val;
}

export function createRandomEnemy(scene, path): Enemy{
    return createEnemy(scene, path, Utils.randomEnum(ENEMIES));
}

export enum ENEMIES{
    DOG,
    EYE,
    BIGBOY
}