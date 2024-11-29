import * as THREE from 'three';
import { getObjectConfig as getItembyID } from './objectsID';

class GameObject {
    constructor(id = 0, x = 0, y = 0, z = 0) {
        let item = getItembyID(id)
        
        //Definições
        this.id = id;
        this.name = item.name;
        this.material = item.material;
        this.scale = item.scale;
        
        //Objeto
        this.object = new THREE.Object3D()

        //Tipo de Geometria
        this.geometry =  item.geometry;

        //Mesh
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.name = this.name;
        this.mesh.position.set(x, y, z);
        this.mesh.rotation.set(0,0,0)
        this.mesh.scale.copy(this.scale);


        //Definindo Sombra
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

    }

    getMesh() {
        return this.mesh;
    }

    setPosition(x, y, z) {
        this.mesh.position.set(x, y, z).normalize()
    }

    setRotation(x, y, z) {
        this.mesh.rotation.set(x, y, z)
    }

    setColor(color) {
        this.mesh.material.color.set(color)
    }

    setSize(x, y, z) {
        this.mesh.scale.set(x, y, z)
    }

    getPositionVector3() {
        return this.mesh.position;
    }

    addForce(x, y, z) {
        this.mesh.position.x += x;
        this.mesh.position.y += y;
        this.mesh.position.z += z;
    }

    addRotation(x, y, z) {
        this.mesh.rotation.x += x;
        this.mesh.rotation.y += y;
        this.mesh.rotation.z += z;
    }

}

export { GameObject }