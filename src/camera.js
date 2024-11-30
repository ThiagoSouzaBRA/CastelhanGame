import * as THREE from 'three';

class Camera {

    /**
     * Construtor da Classe
     * @param {int} widthScreen  
     * @param {int} heightScreen 
     */
    constructor(widthScreen, heightScreen, scene) {

        this.widthScreen = widthScreen;
        this.heightScreen = heightScreen;        
        this.raycaster = new THREE.Raycaster();
        this.scene = scene;

        this.camera =  new THREE.PerspectiveCamera(
            75,
            widthScreen / heightScreen,
            0.1,
            1000
        );
    }

    get viewCamera(){
        return this.camera; 
    }

    getObjectIntersectCamera(mouse){
        this.raycaster.setFromCamera(mouse, this.viewCamera);

        // Verificar interseções
        const intersects = this.raycaster.intersectObjects(this.scene.children);
        const filteredIntersects = intersects.filter(intersect => intersect.object.interactive === true);

        if (filteredIntersects.length > 0) {
            return filteredIntersects[0];
        }

        return null
    }


}



export { Camera }