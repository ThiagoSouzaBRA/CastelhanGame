import * as THREE from 'three';
import { Colors } from '../misc/colors';

class DirectionalLight {
    constructor(x = 15, y = 0, z = 5) {
        this.color = Colors.WHITE
        this.intensity = 0.8;
        this.object = new THREE.DirectionalLight(this.color, this.intensity)
        this.object.position.set(15, 10, 5).normalize();
        return this.object
    }
}

export {DirectionalLight}