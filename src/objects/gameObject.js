import * as THREE from 'three';
import { getObjectConfig as getItembyID } from './objectsID';

class GameObject {
    constructor(id = 0, x = 0, y = 0, z = 0) {
        let item = getItembyID(id)

        //Definições
        this.id = id;
        this.name = item.name;

        // Crie novos materiais para evitar compartilhamento
        if (Array.isArray(item.material)) {
            this.material = item.material.map(mat => mat.clone());
        } else {
            this.material = item.material.clone();
        }

        //Objeto
        this.object = new THREE.Object3D()

        //Tipo de Geometria
        this.geometry = item.geometry;

        //Mesh Default
        this.mainMesh = new THREE.Mesh(this.geometry, this.material);
        this.mainMesh.name = this.name;
        this.mainMesh.position.set(x, y, z);
        this.mainMesh.rotation.set(0, 0, 0)
        this.mainMesh.scale.copy(item.scale);
        this.mainMesh.castShadow = true;
        this.mainMesh.receiveShadow = true;
        this.mainMesh.interactive = true;

        this.position = this.mainMesh.position
        this.rotation = this.mainMesh.rotation
        this.scale = this.mainMesh.scale

        //Mesh Hover
        this.hoverMesh = new THREE.Mesh(this.geometry,
            new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 })
        );
        this.hoverMesh.name = this.name + "_hover";
        this.hoverMesh.scale.copy(this.scale);
        this.hoverMesh.position.copy(this.position);
        this.hoverMesh.rotation.copy(this.rotation)
        this.hoverMesh.castShadow = true;
        this.hoverMesh.receiveShadow = true;
        this.hoverMesh.visible = false;
        this.hoverMesh.interactive = false;


        //Add in Object
        this.object.add(this.hoverMesh)
        this.object.add(this.mainMesh)



        //Funções personalizadas no mesh
        this.mainMesh.isHover = (idside) => this.isHover(idside)
        this.mainMesh.isHoverOut = (idside) => this.isHoverOut(idside)


    }

    isHover(idSide) {

        this.hoverMesh.position.copy(this.position)
        this.hoverMesh.scale.copy(this.scale)
        this.hoverMesh.rotation.copy(this.rotation)
        
        let offsetSide = this.getOffsetsIndexFaces[idSide];

        if(idSide % 2 == 0){
            this.hoverMesh.position[offsetSide] = this.position[offsetSide]  + (this.scale[offsetSide]  / 2)
            this.hoverMesh.scale[offsetSide] = this.hoverMesh.scale[offsetSide]  / 100
        }else{
            this.hoverMesh.position[offsetSide] = this.position[offsetSide]  - (this.scale[offsetSide]  / 2)
            this.hoverMesh.scale[offsetSide] = this.hoverMesh.scale[offsetSide]  / 100
        }

        this.hoverMesh.visible = true;

    }

    isHoverOut() {
        this.hoverMesh.visible = false;
    }

    getMesh() {
        return this.object;
    }

    setPosition(x, y, z) {
        this.position.set(x, y, z).normalize()
    }

    setRotation(x, y, z) {
        this.rotation.set(x, y, z)
    }

    setColor(color) {
        this.mainMesh.material.color.set(color)
    }

    setSize(x, y, z) {
        this.scale.set(x, y, z)
    }

    getPositionVector3() {
        return this.mainMesh.position;
    }

    addForce(x, y, z) {
        this.position.x += x;
        this.position.y += y;
        this.position.z += z;
    }

    addRotation(x, y, z) {
        this.rotation.x += x;
        this.rotation.y += y;
        this.rotation.z += z;
    }


    get getOffsetsIndexFaces(){
        return {
            0: "x", // Direita
            1: "x", //Esquerda
            2: "y", //Baixo
            3: "y", //Cima
            4: "z", // Atras
            5: "z" //Frente
        }
    }


}

export { GameObject }