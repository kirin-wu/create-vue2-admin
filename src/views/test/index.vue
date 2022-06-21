<template>
  <div id="container"></div>
</template>
<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default {
  mounted() {
    this.init();
  },
  data() {
    return {
      state: [],
      camera: null,
    };
  },
  methods: {
    init() {
      // 场景
      this.scene = new THREE.Scene();
      this.clock = new THREE.Clock();
      // 创建一个远景相机
      var width = window.innerWidth; //窗口宽度
      var height = window.innerHeight; //窗口高度

      // 透视投影相机对象PerspectiveCamera( fov, aspect, near, far )
      this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000);
      this.camera.position.set(-800, 700, 700); //设置相机位置
      this.camera.lookAt(0, 0, 0); //设置相机方向(指向的场景对象)

      // 渲染器
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      // 是否显示阴影
      this.renderer.shadowMapEnabled = true;
      // 设置渲染氛围颜色
      this.renderer.setClearColor(new THREE.Color(0xcecece));
      // 鼠标拖拽
      this.orbitControls = new OrbitControls(
        this.camera,
        this.renderer.domElement
      );
      // 动画
      this.animationMixer = new THREE.AnimationMixer(this.scene);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      document
        .getElementById("container")
        .appendChild(this.renderer.domElement);
      // window.addEventListener("resize", () => this.onWindowResize());
      this.Lighting();
      this.getFloor();
      this.getGLB();
      this.render();
    },
    getGLB(name) {
      this.gltfLoader = new GLTFLoader();
      let newName = name ? name : "桌子-gltf";
      this.gltfLoader.load(
        //文件加载 文件地址 我用的本地文件模拟的 vue 必须把文件放入public目录 否则文件会被编译 我是放入了public目录的model文件 说以地址为${process.env.BASE_URL}model
        `${process.env.BASE_URL}model/${newName}.gltf`,
        (gltf) => {
          gltf.scene.name = newName;
          gltf.scene.position.set(0, 0, 0); //定位
          gltf.scene.rotation.y = -Math.PI / 2; //转动 这些有点类似canvas 或者 c3的动画

          gltf.scene.traverse((obj) => {
            // 刚开始图形是黑色
            if (obj.isMesh) {
              obj.material.emissive = obj.material.color;
              obj.material.emissiveMap = obj.material.map;
            }
            // 模型是否否需要阴影
            obj.castShadow = true;
            obj.receiveShadow = true;
          });
          this.scene.add(gltf.scene);
          //遍历当前模型的动画
          gltf.animations.forEach((i) => {
            // console.log(i);
            this.state.push(i.name);
            this[i.name] = this.animationMixer.clipAction(i);
          });
          // 执行第一个动画
          this[gltf.animations[0].name].play();
        }
      );
    },
    getFloor() {
      //创建地板
      let floorGeometry = new THREE.PlaneGeometry(20, 20, 20);
      let floorMaterial = new THREE.MeshPhongMaterial({
        color: 0x77f28f,
        shininess: 0,
      });
      let floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.rotation.x = -0.5 * Math.PI;
      //是否接受阴影投射 (非常重要)
      floor.receiveShadow = true;
      this.scene.add(floor);
    },
    // 创建光源
    Lighting() {
      this.scene.add(new THREE.AmbientLight(0x666666)); //环境光
    },
    render() {
      // 更新动画
      this.animationMixer.update(this.clock.getDelta());
      this.renderer.render(this.scene, this.camera);
      this.orbitControls.update();
      window.requestAnimationFrame(() => this.render());
    },
  },
};
</script>
<style lang="scss" scoped>
#container {
  width: 100%;
  height: 100%;
}
</style>
