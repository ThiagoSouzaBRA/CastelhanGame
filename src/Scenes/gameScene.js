import * as THREE from 'three';
import { Camera } from '../camera';
import { GameObject } from '../objects/gameObject';
import { DirectionalLight } from '../objects/directionalLight';
import { Colors } from '../misc/colors';

class GameScene {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.scene = new THREE.Scene();
        this.camera = new Camera(this.width, this.height);
        this.camera.position.set(0, 10, 10)
        this.camera.lookAt(0, 0, 0); 
        this.camera.fov  = 20 
        this.camera.updateProjectionMatrix();
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.width, this.height);
        document.body.appendChild(this.renderer.domElement);

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        this.setup();

    }

    setup() {
        this.directionalLight = new DirectionalLight();
        this.scene.add(this.directionalLight)

        this.v = new GameObject(1, 0, 0, 0)
        this.scene.add(this.v.getMesh())

    }

    update() {
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    logSceneObjects() {
        console.log("Objetos na cena:");
        this.scene.traverse((object) => {
            console.log(object); // Exibe informações do objeto
        });
    }
}

export { GameScene }