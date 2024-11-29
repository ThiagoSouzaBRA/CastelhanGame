import * as THREE from 'three';
import { Camera } from '../camera';
import { GameObject } from '../objects/gameObject';
import { DirectionalLight } from '../objects/directionalLight';
import { Colors } from '../misc/colors';

class GameScene {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        //Scene
        this.scene = new THREE.Scene();


        //Camera
        this.camera = new Camera(this.width, this.height);
        this.camera.position.set(0, 5, 10)
        this.camera.lookAt(0, 0, 0);
        this.camera.fov = 35
        this.camera.updateProjectionMatrix();


        //Render
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.width, this.height);
        document.body.appendChild(this.renderer.domElement);


        //Definição de Mouse
        this.mouse = new THREE.Vector2()


        //Raycaster
        this.raycaster = new THREE.Raycaster();


        //Events
        this.onMouseMove = this.onMouseMove.bind(this)
        window.addEventListener('mousemove', event => this.onMouseMove(event), false);
        this.onMouseClick = this.onMouseClick.bind(this)
        window.addEventListener('click', this.onMouseClick, false);
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
        this.v.addRotation(.001, .001, 0)
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    onMouseMove(event) {
        this.mouse.x = (event.clientX / this.width) * 2 - 1;
        this.mouse.y = -(event.clientY / this.height) * 2 + 1;
    }


    onMouseClick() {
        // Atualizar o Raycaster com a posição do mouse e a câmera
        this.raycaster.setFromCamera(this.mouse, this.camera);

        // Verificar interseções
        const intersects = this.raycaster.intersectObjects(this.scene.children);

        if (intersects.length > 0) {
            const intersect = intersects[0];
            const clickedMesh = intersect.object;
            const faceIndex = intersect.face.materialIndex;
            
            if (clickedMesh.material.length >= 6) {
                // Substituir o material no índice da face
                clickedMesh.material[faceIndex] = new THREE.MeshBasicMaterial({ color: Colors.LIGHT_YELLOW });
                clickedMesh.material.needsUpdate = true;
            }
        }
    }

}

export { GameScene }