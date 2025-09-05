import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Stairs = (props) => {

    const currentPath = useLocation().pathname

    const stairParentRef = useRef(null)
    const pageRef = useRef(null)

    // Ensure content is visible on initial load
    useEffect(() => {
        if (pageRef.current) {
            gsap.set(pageRef.current, { opacity: 1 })
        }
    }, [])

    useGSAP(function () {
        // Skip stairs animation on initial home page load to allow intro animation
        if (currentPath === '/' && !sessionStorage.getItem('homeVisited')) {
            sessionStorage.setItem('homeVisited', 'true')
            gsap.set(stairParentRef.current, { display: 'none' })
            gsap.set(pageRef.current, { opacity: 1, scale: 1 })
            return
        }

        // Ensure stairs are hidden initially
        gsap.set(stairParentRef.current, { display: 'none' })
        
        const tl = gsap.timeline()
        tl.to(stairParentRef.current, {
            display: 'block',
        })
        tl.from('.stair', {
            height: 0,
            stagger: {
                amount: -0.2
            }
        })
        tl.to('.stair', {
            y: '100%',
            stagger: {
                amount: -0.25
            }
        })
        tl.to(stairParentRef.current, {
            display: 'none'
        })
        tl.to('.stair', {
            y: '0%',
        })

        gsap.fromTo(pageRef.current, {
            opacity:0,
            scale:1.2
        }, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: 1.3,
            ease: "power2.out"
        })
    }, [currentPath])
    

    return (
        <div>
            <div ref={stairParentRef} className='h-screen w-full fixed z-20 top-0'>
                <div className='h-full w-full flex'>
                    <div className='stair h-full w-1/5 bg-black'></div>
                    <div className='stair h-full w-1/5 bg-black'></div>
                    <div className='stair h-full w-1/5 bg-black'></div>
                    <div className='stair h-full w-1/5 bg-black'></div>
                    <div className='stair h-full w-1/5 bg-black'></div>
                </div>
            </div>
            <div ref={pageRef} style={{ opacity: 1 }}>
                {props.children}
            </div>
        </div>
    )
}

export default Stairs