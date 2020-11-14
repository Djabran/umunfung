import ReactDOM from "react-dom"
import React, { useRef, useState } from "react"
import { Canvas, useThree, useFrame } from "react-three-fiber"
import { useDrag } from "react-use-gesture"
import { useSpring } from 'react-spring'
import { a } from 'react-spring/three'
import { DoubleSide,Camera } from 'three'
import "./index.css"

function DDD() {
    const colors = ["hotpink", "red", "blue", "green", "yellow"];
    const ref = useRef();
    const [colorIdx, setColorIdx] = useState(0);
    const [position, setPosition] = useState([0, 0, 0]);
    const { size, viewport } = useThree();
    const aspect = size.width / viewport.width;
    useFrame(() => {
        ref.current.rotation.z += 0.01
        ref.current.rotation.x += 0.01
    });
    const bind = useDrag(({ offset: [x, y] }) => {
        const [,, z] = position;
        setPosition([x / aspect, -y / aspect, z]);
    }, { pointerEvents: true });

    return (
        <a.mesh position={position} {...bind()}
            ref={ref}
            onClick={e => {
                if (colorIdx === 4) {
                    setColorIdx(0);
                } else {
                    setColorIdx(colorIdx+1);
                }
            }}
            onPointerOver={e => console.log('hover')}
            onPointerOut={e => console.log('unhover')}>
            <circleGeometry attach="geometry" args={[1,32]}/>

            {/*<dodecahedronBufferGeometry attach="geometry" />*/}
            <meshLambertMaterial attach="material" color={colors[colorIdx]}
                                 side={DoubleSide}/>

        </a.mesh>
    )
}

const Point = () => {
    const refOuter = useRef()
    // const refInner = useRef()

    const [hovered, setHovered] = useState(false)
    const [active, setActive] = useState(false)
    const [position, setPosition] = useState([0,0,0])

    const {size, viewport} = useThree()
    console.log(`Point - size: ${JSON.stringify(size)}, viewport: ${JSON.stringify(viewport)}`)
    const aspect = size.width / viewport.width

    // const props = useSpring({
    //     scale: active ? [1.2, 1.2, 1.2] : [1,1,1],
    //     scaleInner: active ? [1.1, 1.1, 1.1] : [0.9,0.9,0.9],
    //     color: hovered ? "blue" : "red"
    // })

    const props = useSpring({
        color: "red"
    })
    // useFrame(() => {
    //     refOuter.current.rotation.z += 0.01
    //     refOuter.current.rotation.x += 0.01
    // })

    const bind = useDrag(({ offset: [x, y] }) => {
        const [,, z] = position;
        setPosition([x / aspect, -y / aspect, z]);
    }, { pointerEvents: true });


    // const scaleDown = args => {
    //     const result = [args[0] * 0.9, args[1] * 0.9, args[2] * 0.9]
    //     console.log(`scaledown: ${JSON.stringify(args)} -> ${result}`)
    //     return props.scale
    // }

    return (
        <a.mesh position={position} {...bind()}
                ref ={refOuter}
                scale = {[1,1,1]}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => setActive(!active)}>
            <circleBufferGeometry attach="geometry" args={[40,32]}/>
            <a.meshBasicMaterial attach="material" color={props.color}/>
            {/*<a.meshLambertMaterial attach="material" color={props.color} side={DoubleSide} />*/}
        </a.mesh>
    )
}

ReactDOM.render(
    <Canvas camera={{ fov: 179, position: [0, 0, 10] }}>
        {/*<ambientLight/>*/}
        <spotLight intensity={1.2} position={[30, 30, 50]} angle={0.2} penumbra={1} castShadow />
        <Point />
    </Canvas>,
    document.getElementById("root")
)


// <group>
//
//
// {/*<a.mesh ref ={refInner}*/}
// {/*        position={position} {...bind()}*/}
// {/*        scale = {props.scaleInner}*/}
// {/*        onPointerOver={() => setHovered(true)}*/}
// {/*        onPointerOut={() => setHovered(false)}*/}
// {/*        onClick={() => setActive(!active)}>*/}
// {/*    <circleGeometry attach="geometry" args={[1,32]}/>*/}
// {/*    <a.meshBasicMaterial attach="material" color="black"/>*/}
// {/*</a.mesh>*/}
//
// </group>
