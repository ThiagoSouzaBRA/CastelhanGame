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
            new THREE.MeshStandardMaterial({ color: 0xff0000 }), // Vermelho
            new THREE.MeshStandardMaterial({ color: 0x00ff00 }), // Verde
            new THREE.MeshStandardMaterial({ color: 0x0000ff }), // Azul
            new THREE.MeshStandardMaterial({ color: 0xffff00 }), // Amarelo
            new THREE.MeshStandardMaterial({ color: 0xff00ff }), // Magenta
            new THREE.MeshStandardMaterial({ color: 0x00ffff }), // Ciano
        ],
        scale: new THREE.Vector3(1, 1, 1),
    },
};

export const getObjectConfig = (id) => {
    return objectsID[id] || null;
};

export { objectsID }