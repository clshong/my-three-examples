import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let camera, controls, renderer, scene;

/** 初始化函数 */
function init() {
    /** 创建场景 */
    scene = new THREE.Scene();

    /** 添加一个立方体 */
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    /** 创建透视相机 */
    const fov = 45;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 1;
    const far = 3000;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 10);

    /** 创建渲染器 */
    renderer = new THREE.WebGLRenderer({ antialias: true }); // 开启抗锯齿
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio); // 支持高分辨率显示器
    renderer.setClearColor(0xffffff);
    document.body.appendChild(renderer.domElement);

    /** 添加轨道控制器 */
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // 启用阻尼效果
    controls.dampingFactor = 0.05; // 设置阻尼系数

    /** 监听窗口大小变化 */
    window.addEventListener('resize', onWindowResize);

    /** 开始动画 */
    animate();
}

/** 动画更新函数 */
function animate() {
    requestAnimationFrame(animate);
    scene.rotation.y += 0.01
    scene.rotation.z += 0.01
    controls.update(); // 轨道控制器需要更新
    renderer.render(scene, camera);
}

/** 响应窗口大小调整 */
function onWindowResize() {


    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
