import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import {Canvas} from 'react-three-fiber';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
    
class Three extends Component {
    constructor(props) {
        super(props);
    
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.animate = this.animate.bind(this);
    }

    componentDidMount = () => {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        // const scene = new THREE.Scene();
        // const camera = new THREE.PerspectiveCamera(
        //     75,
        //     width / height,
        //     0.1,
        //     1000
        // );
        // const renderer = new THREE.WebGLRenderer({ antialias: true });
        // const geometry = new THREE.BoxGeometry(1, 1, 1);
        // const material = new THREE.MeshBasicMaterial({ color: '#433F81' });
        // const cube = new THREE.Mesh(geometry, material);

        // camera.position.z = 4;
        // scene.add(cube);
        // renderer.setClearColor('#000000');
        // renderer.setSize(width, height);

        // this.scene = scene;
        // this.camera = camera;
        // this.renderer = renderer;
        // this.material = material;
        // this.cube = cube;

        // this.mount.appendChild(this.renderer.domElement);
        // this.start();
        const renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(width, height);
        const fov = 15; //시야각
        //const aspect = 2 // canvas의 가로세로비율
        const aspect = width / height;
        const near = 0.1; //카메라 앞에 렌더링되는 공간 범위를 지정(가까운 곳)
        const far = 150; //카메라 앞에 렌더링되는 공간 범위를 지정(먼 곳)
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        //---------
        //-- key ---

        //----------
        //-- data inputs --
        let model = new THREE.Object3D();
        let moonModel;
        let c, size;
        //let degree = 0;
        let pivot = new THREE.Object3D();
        //-----------------
        camera.position.set(0, 0, -10);
        camera.rotation.set(0, 0, 0);
        
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableKeys = false;
        //controls.target.set(13.5, 9, -6.3);
        //controls.target.set(0, 0, 1);
        controls.rotateSpeed = 0.3;
        controls.update();
        
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#000000"); //배경색 지정
        
        const color = 0xFFFFFF;
        const intensity = 2;

        {
            const light = new THREE.DirectionalLight(color, intensity);
            light.position.set(1, 1, 1);
            scene.add(light);
            
            const light2 = new THREE.DirectionalLight(color, intensity);
            light2.position.set(-1, -1, -1);
            scene.add(light2);
            
            const light3 = new THREE.DirectionalLight(color, intensity);
            light3.position.set(20, 0, 0);
            scene.add(light3);
            
            const light4 = new THREE.DirectionalLight(color, intensity);
            light4.position.set(0, 20, 0);
            scene.add(light4);
            
            const light5 = new THREE.DirectionalLight(color, intensity);
            light5.position.set(0, 0, 20);
            scene.add(light5);
        }
        
        function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
            const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
            const halfFovY = THREE.MathUtils.degToRad(camera.fov * .5);
            const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
 
            // 육면체의 중심에서 카메라가 있는 곳으로 향하는 방향 벡터를 계산합니다
            const direction = (new THREE.Vector3()).subVectors(camera.position, boxCenter).normalize();
 
            // 방향 벡터에 따라 카메라를 육면체로부터 일정 거리에 위치시킵니다
            camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));
 
            // 육면체를 투사할 절두체를 near와 far값으로 정의합니다
            camera.near = boxSize / 100;
            camera.far = boxSize * 100;
 
            camera.updateProjectionMatrix();
 
            // 카메라가 육면체의 중심을 바라보게 합니다
            camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
        }
        
        function load(){
            const loader = new GLTFLoader();
            loader.load('Earth_1_12756.gltf', function(gltf){
                const cubeObj = gltf.scene.getObjectByName('Cube001');
                const box = new THREE.Box3().setFromObject(cubeObj);
                const boxSize = box.getSize(new THREE.Vector3()).length();
                const boxCenter = box.getCenter(new THREE.Vector3());
                //console.log(dumpObject(gltf.scene).join('\n'));
                
                c = box.getCenter(new THREE.Vector3());
                size = box.getSize(new THREE.Vector3());
                
                frameArea(boxSize * 1.2, boxSize, boxCenter, camera);
                
                controls.maxDistance = boxSize * 20;
                controls.target.copy(boxCenter);
                controls.update();
                cubeObj.scale.set(1, 1, 1);
                
                model.add(cubeObj);
                scene.add(model);
                model.rotateZ(22.5 * Math.PI / 360);
                model.add(pivot);
                loader.load('Moon_1_3474.glb', function(gltf){
                    moonModel = gltf.scene;
                    moonModel.scale.set(0.25, 0.25, 0.25);
                    moonModel.position.x = -1000;
                    pivot.add(moonModel);
                    scene.add(pivot);
                    pivot.rotateZ(22.5 * Math.PI / 360);
                });
            });
        }

        load();

        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.pivot = pivot;
        this.model = model;
        this.moonModel = moonModel;
        this.controls = controls;

        this.mount.appendChild(this.renderer.domElement);
        this.start();
    }

    componentWillUnmount() {
        //this.stop();
        this.mount.removeChild(this.renderer.domElement);
    }
    
    start() {
        if (!this.frameId) {
          this.frameId = requestAnimationFrame(this.animate);
        }
    }
    
    stop() {
        cancelAnimationFrame(this.frameId);
    }
    
    animate() {
        // this.cube.rotation.x += 0.01;
        // this.cube.rotation.y += 0.01;
        function resizeRendererToDisplaySize(renderer) {
            const canvas = renderer.domElement;
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            const needResize = canvas.width !== width || canvas.height !== height;
            if (needResize) {
                renderer.setSize(width, height, false);
            }
            return needResize;
        }

        if (resizeRendererToDisplaySize(this.renderer)) {
            const canvas = this.renderer.domElement;
            this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
            this.camera.updateProjectionMatrix();
        }

        this.pivot.rotateY(0.01);
        this.model.rotateY(Math.PI / 360 * 0.1);
    
        this.renderScene();
        this.frameId = window.requestAnimationFrame(this.animate);
    }
    
    renderScene() {
        this.renderer.render(this.scene, this.camera);
    }

    render() {
        return (
            <div className="viewport" style={{width: "65%", height: '100vh' }}
            ref={(mount) => { this.mount = mount }} />
        );
    }
}

export default Three;
