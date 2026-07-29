// import React from 'react'
// import {Canvas} from '@react-three/fiber'
// import { PointLight } from 'three'

// const Product3D =({color,size})=>{
//     return(
//         <mesh>
//             <boxGeometry args={size}/>
//             <meshStandardMaterial color={color}/>
//         </mesh>
//     )
// }

// const Product3DViewer=({color,size})=>{
//     return(
//         <Canvas camera={{position:[2,2,2]}}>
//             <ambientLight/>
//             <PointLight position={[5,5,5]}/>
//             <Product3D color={color} size={size}/>
//         </Canvas>
//     )
// }
// export default Product3DViewer;

// import { Canvas } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei'
// import { useGLTF } from '@react-three/drei'

// const Model = ({ modelPath }) => {
//   const { scene } = useGLTF(modelPath)
//   return <primitive object={scene} scale={0.5} />
// }

// const Product3DViewer = ({ modelPath }) => (
//   <Canvas>
//     <ambientLight />
//     <OrbitControls />
//     <Model modelPath={modelPath} />
//   </Canvas>
// )

// export default Product3DViewer

import {React, useRef} from 'react';
import {Canvas, useLoader} from '@react-three/fiber'
import {OrbitControls} from '@react-three/drei'
import * as THREE from 'three'


const Box = ({imageURL}) => {
    const texture=useLoader(THREE.TextureLoader,imageURL);
    const ref=useRef();
  return (
    <mesh ref={ref}>
      <planeGeometry args={[5,5]} />
      <meshStandardMaterial map={texture} toneMapped={false}/>
    </mesh>
  );
};

const Product3DViewer=({imageURL})=>{
    return(
        <div className="h-[500px] w-full">
            <Canvas camera={{position:[0,0,5]}}>
                <ambientLight intensity={2.5}/>
                
                {/* <pointLight position={[10,10,10]}/> */}
                <Box imageURL={imageURL}/>
                <OrbitControls enableZoom={true} />
            </Canvas>
        </div>
    )
}
export default Product3DViewer