import * as THREE from 'three';
import { Colors } from '../misc/colors';

const objectsID = {
    0: {
        name: "Ar",
        geometry: new THREE.BoxGeometry(1, 1, 1),
        material: new THREE.MeshStandardMaterial({ color: new THREE.Color().setStyle(Colors.WHITE) }),
        scale: new THREE.Vector3(1, 1, 1),
    },
    1: {
        name: "Grama",
        geometry: new THREE.BoxGeometry(1, 1, 1),
        material: [
            new THREE.MeshStandardMaterial({ color: Colors.GREEN }), // Vermelho
            new THREE.MeshStandardMaterial({ color: Colors.GREEN }), // Verde
            new THREE.MeshStandardMaterial({ color: Colors.GREEN }), // Azul
            new THREE.MeshStandardMaterial({ color: Colors.GREEN }), // Amarelo
            new THREE.MeshStandardMaterial({ color: Colors.GREEN }), // Magenta
            new THREE.MeshStandardMaterial({ color: Colors.GREEN }), // Ciano
        ],
        scale: new THREE.Vector3(1, 1, 1),
    },
    // 2: {
    //     name: "Transparente",
    //     geometry: new THREE.BoxGeometry(1, 1, 1),
    //     material: [
    //         new THREE.MeshStandardMaterial({ color: Colors.WHITE }), // Vermelho
    //         new THREE.MeshStandardMaterial({ color: Colors.WHITE }), // Verde
    //         new THREE.MeshStandardMaterial({ color: Colors.WHITE }), // Azul
    //         new THREE.MeshStandardMaterial({ color: Colors.WHITE }), // Amarelo
    //         new THREE.MeshStandardMaterial({ color: Colors.WHITE }), // Magenta
    //         new THREE.MeshStandardMaterial({ color: Colors.WHITE }), // Ciano
    //     ],
    //     scale: new THREE.Vector3(1, 1, 1),
    // },
};

export const getObjectConfig = (id) => {
    return objectsID[id] || null;
};

export { objectsID }