import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene = null;
let camera = null;
let renderer = null;
let controls = null;

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

    const texLoader = new THREE.TextureLoader();

    // 加载纹理
    const texture = texLoader.load(
        './map.jpg', // 确保图片路径正确
        () => console.log("Texture loaded successfully"),
        undefined,
        (error) => console.error("Error loading texture:", error)
    );

    // 创建球体几何
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.MeshStandardMaterial({ map: texture, }); // 使用 StandardMaterial 更贴合物理光照
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(15, 15, 20); // 调整相机位置，便于观察球体
    camera.lookAt(0, 0, 0);
}

function initLight() {
    // 环境光
    const ambientLight = new THREE.AmbientLight(0x404040, 1); // 环境光强度设为1
    scene.add(ambientLight);

    // 平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5); // 更强的平行光
    directionalLight.position.set(10, 10, 10); // 从右上方照射
    scene.add(directionalLight);
}

function initRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio); // 适配高分辨率屏幕
    renderer.outputEncoding = THREE.sRGBEncoding;    // 设置颜色编码
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x202020);               // 设置背景色
    document.body.appendChild(renderer.domElement);
}

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
