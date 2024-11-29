import * as THREE from 'three';
import { getObjectConfig } from './objectsID';
import { Colors } from '../misc/colors';

class GameObject {
    constructor(id = 0, x = 0, y = 0, z = 0) {

        let item = getObjectConfig(id)
        //Definições
        this.id = id;
        this.name = item.name;
        this.material = item.material;
        this.scale = item.scale;
        this.position = new THREE.Vector3(x, y, z)
        this.rotation = new THREE.Vector3(0, 0, 0)

        //Objeto
        this.object = new THREE.Object3D()
        //Tipo de Geometria
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        //Mesh
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.name = this.name;
        this.mesh.position.x = this.position.x;
        this.mesh.position.y = this.position.y;
        this.mesh.position.z = this.position.z;

        this.mesh.rotation.x = this.rotation.x;
        this.mesh.rotation.y = this.rotation.y;
        this.mesh.rotation.z = this.rotation.z;

        //Definindo Sombra
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

    }

    getMesh() {
        return this.mesh;
    }

    setPosition(x, y, z) {
        this.position.set(x, y, z).normalize()
        this.mesh.position.set(x, y, z).normalize()
    }

    setRotation(x, y, z) {
        this.rotation.set(x, y, z)
        this.mesh.rotation.set(x, y, z)
    }

    setColor(color) {
        this.material.color.set(color)
    }

    setSize(x, y, z) {
        this.scale.set(x, y, z)
        this.mesh.scale.set(x, y, z)
    }

    getPositionVector3() {
        return this.position;
    }

    addForce(x, y, z) {
        this.mesh.position.x += this.position.x + x;
        this.mesh.position.y += this.position.y + y;
        this.mesh.position.z += this.position.z + z;

    }

}

export { GameObject }