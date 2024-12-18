import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let camera = null;
let controls = null;
let renderer = null;
let scene = null;

/** 初始化函数 */
function init() {
    initScene();        // 初始化场景
    initCamera();       // 初始化相机
    initRenderer();     // 初始化渲染器
    initControls();     // 初始化轨道控制器
    window.addEventListener('resize', onWindowResize); // 监听窗口变化
    animate(); // 开始动画循环
}

/** 初始化场景 */
function initScene() {
    scene = new THREE.Scene();

    // 添加一个旋转的立方体
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // 添加辅助坐标轴
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
}

/** 初始化相机 */
function initCamera() {
    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );
    camera.position.set(5, 5, 10); // 调整相机位置，更好地观察场景
    camera.lookAt(0, 0, 0);
}

/** 初始化渲染器 */
function initRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio); // 适配高分辨率屏幕
    renderer.outputEncoding = THREE.sRGBEncoding;    // 设置颜色编码
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x202020);               // 设置背景色
    document.body.appendChild(renderer.domElement);
}

/** 初始化轨道控制器 */
function initControls() {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;        // 启用惯性阻尼
    controls.dampingFactor = 0.05;        // 阻尼因子
    controls.enableZoom = true;           // 允许缩放
    controls.enablePan = false;           // 禁用平移
    controls.rotateSpeed = 0.2;           // 设置旋转速度
}

/** 动画更新函数 */
function animate() {
    requestAnimationFrame(animate);

    // 让整个场景旋转
    scene.rotation.y += 0.01;
    scene.rotation.z += 0.005;
    camera.updateProjectionMatrix();
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
