import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene = null;
let camera = null;
let renderer = null;
let controls = null;
let pointLight = null;
const clock = new THREE.Clock(); // 初始化时钟

function init() {
    initScene();
    initCamera();
    initLight();
    initRenderer();
    initControls();
    window.addEventListener("resize", onWindowResize);
    animate();
}

function initScene() {
    scene = new THREE.Scene();

    // 加载纹理
    const texLoader = new THREE.TextureLoader();
    const texture = texLoader.load('./map.jpg'); // 地图纹理路径

    // 创建球体几何
    const geometry = new THREE.SphereGeometry(5, 64, 64); // 高细分
    const material = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.2, // 表面粗糙度，降低以增强光照效果
        metalness: 0.0, // 非金属材质
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.castShadow = true; // 启用阴影投射
    sphere.receiveShadow = true; // 接收阴影
    scene.add(sphere);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(15, 15, 20); // 调整相机位置，便于观察球体
    camera.lookAt(0, 0, 0);
}

function initLight() {
    // 环境光提供基础亮度
    const ambientLight = new THREE.AmbientLight(0x404040, 0.2); // 柔和的环境光
    scene.add(ambientLight);

    // 动态点光源
    pointLight = new THREE.PointLight(0xffffff, 20, 50); // 创建点光源，增加强度和衰减半径
    pointLight.position.set(10, 10, 10); // 初始位置
    pointLight.castShadow = true; // 启用阴影
    pointLight.shadow.mapSize.width = 1024; // 调整阴影质量
    pointLight.shadow.mapSize.height = 1024;
    scene.add(pointLight);

    // 可视化点光源的位置
    // const lightHelper = new THREE.PointLightHelper(pointLight, 1); // 半径为1的辅助器
    // scene.add(lightHelper);

    // 平面接收阴影（可选）
    const planeGeometry = new THREE.PlaneGeometry(50, 50);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2; // 旋转为水平面
    plane.position.y = -5; // 调整平面位置
    plane.receiveShadow = true; // 平面接收阴影
    scene.add(plane);
}

function initRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio); // 适配高分辨率屏幕
    renderer.outputEncoding = THREE.sRGBEncoding;    // 设置颜色编码
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x202020);               // 设置背景色
    renderer.shadowMap.enabled = true;              // 启用阴影映射
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 使用柔和阴影
    document.body.appendChild(renderer.domElement);
}

function initControls() {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;        // 启用惯性阻尼
    controls.dampingFactor = 0.05;        // 阻尼因子
    controls.enableZoom = true;           // 允许缩放
    controls.enablePan = false;           // 禁用平移
    controls.rotateSpeed = 0.2;           // 设置旋转速度
    // 获取时钟的时间增量
    const elapsedTime = clock.getElapsedTime(); // 从时钟启动到现在的累计时间
    pointLight.position.y += 5;
}

/** 动画更新函数 */
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // 更新轨道控制器
    renderer.render(scene, camera); // 渲染场景
}

/** 响应窗口大小调整 */
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix(); // 更新投影矩阵
    renderer.setSize(window.innerWidth, window.innerHeight);
}

/** 初始化项目 */
init();
