import * as THREE from 'three';

class Camera {

    /**
     * Construtor da Classe
     * @param {int} widthScreen  
     * @param {int} heightScreen 
     */
    constructor(widthScreen, heightScreen) {
        return new THREE.PerspectiveCamera(
            75,
            widthScreen / heightScreen,
            0.1,
            1000
        );
    }

  
}

export { Camera }