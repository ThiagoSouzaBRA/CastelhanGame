import * as THREE from 'three';
import { Colors } from '../misc/colors';

const objectsID = {
    0: {
        name: "Ar",
        geometry: new THREE.BoxGeometry(1, 1, 1),
        material: new THREE.MeshStandardMaterial({ color: new THREE.Color().setStyle(Colors.WHITE)}),
        scale: new THREE.Vector3(1, 1, 1),
    },
    1: {
        name: "Grama",
        geometry: new THREE.BoxGeometry(1, 1, 1),
        material: new THREE.MeshStandardMaterial({ color: new THREE.Color().setStyle(Colors.GREEN) }),
        scale: new THREE.Vector3(1, 1, 1),
    },
};

export const getObjectConfig = (id) => {
    return objectsID[id] || null; 
};

export {objectsID}