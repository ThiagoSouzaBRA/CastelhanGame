import { GUI } from 'lil-gui'
import Stats from 'stats.js';

class UI {

    createGUI(context) {
        const gui = new GUI();

        const lightSun = gui.addFolder('lightSun')
        lightSun.close()
        lightSun.add(context.directionalLight, 'intensity', -5, 5, 0.1).name('Intensidade');


        lightSun.add(context.directionalLight.position, 'x', -5, 5, 0.1).name('Posição X');
        lightSun.add(context.directionalLight.position, 'y', -5, 5, 0.1).name('Posição Y');
        lightSun.add(context.directionalLight.position, 'z', -5, 5, 0.1).name('Posição Z');


        // Controle de rotação
        lightSun.add(context.directionalLight.rotation, 'x', -(Math.PI * 2), Math.PI * 2, .01).name('Rotação X');
        lightSun.add(context.directionalLight.rotation, 'y', -(Math.PI * 2), Math.PI * 2, 0.001).name('Rotação Y');
        lightSun.add(context.directionalLight.rotation, 'z', -(Math.PI * 2), Math.PI * 2, 0.001).name('Rotação Z');

        ////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////

        const cameraFolder = gui.addFolder('Camera')
        cameraFolder.add(context.camera.viewCamera.position, 'x', -100, 100, 0.1).name('Posição X');
        cameraFolder.add(context.camera.viewCamera.position, 'y', -100, 100, 0.1).name('Posição Y');
        cameraFolder.add(context.camera.viewCamera.position, 'z', -100, 100, 0.1).name('Posição Z');


        // Controle de rotação
        cameraFolder.add(context.camera.viewCamera.rotation, 'x', -(Math.PI * 2), Math.PI * 2, .01).name('Rotação X');
        cameraFolder.add(context.camera.viewCamera.rotation, 'y', -(Math.PI * 2), Math.PI * 2, 0.001).name('Rotação Y');
        cameraFolder.add(context.camera.viewCamera.rotation, 'z', -(Math.PI * 2), Math.PI * 2, 0.001).name('Rotação Z');

        ////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////

        // Controle de posição do cubo
        const cubeFolder = gui.addFolder('Cubo');
        let cube = context.v.getMesh()
        cubeFolder.add(cube.position, 'x', -5, 100, 0.1).name('Posição X');
        cubeFolder.add(cube.position, 'y', -5, 100, 0.1).name('Posição Y');
        cubeFolder.add(cube.position, 'z', -5, 100, 0.1).name('Posição Z');

        // Controle de rotação
        cubeFolder.add(cube.rotation, 'x', -(Math.PI * 2), Math.PI * 2, 0.01).name('Rotação X');
        cubeFolder.add(cube.rotation, 'y', -(Math.PI * 2), Math.PI * 2, 0.01).name('Rotação Y');
        cubeFolder.add(cube.rotation, 'z', -(Math.PI * 2), Math.PI * 2, 0.01).name('Rotação Z');

        // Controle de escala
        cubeFolder.add(cube.scale, 'x', 0.1, 3, 0.1).name('Escala X');
        cubeFolder.add(cube.scale, 'y', 0.1, 3, 0.1).name('Escala Y');
        cubeFolder.add(cube.scale, 'z', 0.1, 3, 0.1).name('Escala Z');
    }

    createStats(){
        let stats = new Stats();
        stats.showPanel(0); 
        return stats 
    }
}

export { UI }