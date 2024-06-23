import * as THREE from "three";
import WebSocket from "ws";

const socket = new WebSocket("ws://localhost:5000");

socket.onopen = () => {
    console.log("Connected to the Node.js WebSocket server");
};

socket.onmessage = (event) => {
    const message = JSON.parse(event.data.toString());
    updatePlayerPosition(message.playerId, message.position);
};

function sendPlayerPosition(position: { x: number; y: number; z: number }) {
    const message = JSON.stringify({ playerId: "player1", position });
    socket.send(message);
}

function updatePlayerPosition(
    playerId: string,
    position: { x: number; y: number; z: number }
) {
    console.log(
        `Player ${playerId} moved to (${position.x}, ${position.y}, ${position.z})`
    );
    // Update the player position in the Three.js scene
}

// Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();

// Example of sending player position
setInterval(() => {
    const position = {
        x: cube.position.x,
        y: cube.position.y,
        z: cube.position.z,
    };
    sendPlayerPosition(position);
}, 1000);
