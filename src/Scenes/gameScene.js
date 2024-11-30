import * as THREE from 'three';
import { Camera } from '../camera';
import { GameObject } from '../objects/gameObject';
import { DirectionalLight } from '../objects/directionalLight';
import { Colors } from '../misc/colors';
import { UI } from '../UI';

class GameScene {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        // Scene
        this.scene = new THREE.Scene();

        // Camera
        this.camera = new Camera(this.width, this.height, this.scene);
        this.camera.viewCamera.position.set(0, 2, 5);
        this.camera.viewCamera.fov = 35;
        this.camera.viewCamera.lookAt(0, 0, 0);
        this.camera.viewCamera.updateProjectionMatrix();

        // Render
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.width, this.height);
        document.body.appendChild(this.renderer.domElement);

        // Definição de Mouse
        this.mouse = new THREE.Vector2();
        this.lastObjectSelected = null;

        // Events
        window.addEventListener('mousemove', event => this.mouseMove(event), false);
        window.addEventListener('click', (event) => this.mouseClick(event), false);
        window.addEventListener('keydown', (event) => this.keyboard(event));
        window.addEventListener('resize', this.autoResize);
        window.addEventListener('load', this.setup());

        // Setup User Interface
        this.userInterface();
    }

    setup() {
        // Create new Object
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Cor branca com intensidade 0.5
        this.scene.add(this.ambientLight);

        // Create new Object
        this.directionalLight = new DirectionalLight();
        this.scene.add(this.directionalLight);

        // Create new Object
        this.v = new GameObject(1, 0, 0, 0);
        this.scene.add(this.v.getMesh());


    }

    update() {
    }

    render() {
        // Render Scene
        this.renderer.render(this.scene, this.camera.viewCamera);
        this.stats.update();
    }


    mouseMove(event) {
        this.updateMousePosition(event);

        let obj = this.camera.getObjectIntersectCamera(this.mouse);
        if (obj) {
            const objectHover = obj.object;
            const indexObjectHover = obj.face.materialIndex;

            if (objectHover !== this.lastObjectSelected) {
                // Se houver um objeto anterior, desativa o hover
                if (this.lastObjectSelected) {
                    this.lastObjectSelected.isHoverOut();
                }
                // Ativa o hover no novo objeto e o define como o último selecionado
                objectHover.isHover(indexObjectHover);
                this.lastObjectSelected = objectHover;
            } else {
                // Caso seja o mesmo objeto, apenas ativa o hover novamente
                objectHover.isHover(indexObjectHover);
            }
        } else if (this.lastObjectSelected) {
            // Nenhum objeto foi encontrado, desativa o hover no último objeto se houver
            this.lastObjectSelected.isHoverOut();
            this.lastObjectSelected = null;
        }
    }


    userInterface() {
        // Criando GUI
        this.GUI = new UI().createGUI(this);

        // Criando Stats -> FPS / MS
        this.stats = new UI().createStats();
        document.body.appendChild(this.stats.dom);
    }

    mouseClick() {
        let obj = this.camera.getObjectIntersectCamera(this.mouse);

        if (obj) {
            const clickedMesh = obj.object;
            const faceIndexClicked = obj.face.materialIndex;

            let spacing = 0.02;
            let offsetSide = new GameObject().getOffsetsIndexFaces[faceIndexClicked];
            let newObject = new GameObject(1);

            newObject.position.copy(clickedMesh.position);

            if(faceIndexClicked % 2 == 0){
                newObject.position[offsetSide] += newObject.scale[offsetSide] + spacing;
            }else{
                newObject.position[offsetSide] -= newObject.scale[offsetSide] + spacing;
            }
            
            this.scene.add(newObject.getMesh());


        }
    }

    keyboard(event) {
        switch (event.key.toLowerCase()) {
            case 'w': // Move para frente
                this.camera.viewCamera.position.z -= .1
                break;
            case 's': // Move para trás
                this.camera.viewCamera.position.z += .1
                break;
            case 'a': // Move para a esquerda
                this.camera.viewCamera.position.x -= .1
                break;
            case 'd': // Move para a direita
                this.camera.viewCamera.position.x += .1
                break;
        }

    }

    updateMousePosition(event) {
        this.mouse.x = (event.clientX / this.width) * 2 - 1;
        this.mouse.y = -(event.clientY / this.height) * 2 + 1;
    }

    autoResize() {
        this.camera.viewCamera.aspect = window.innerWidth / window.innerHeight;
        this.camera.viewCamera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

export { GameScene };
