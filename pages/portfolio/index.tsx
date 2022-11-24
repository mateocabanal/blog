import { useSpring, animated, easings, config } from 'react-spring'
import { ParallaxProvider, Parallax, useParallax } from "react-scroll-parallax";

export default function Home() {
    const popIn = useSpring({
        to: { opacity: 1 },
        from: { opacity: 0 },
        delay: 100,
        config: {
            duration: 700,
            ...config.gentle,
        },
    });

    return (
        <ParallaxProvider>
            <Parallax>
                <div className='flex place-content-center'>
                    <animated.div style={popIn} >
                        <p className='text-6xl '>Mateo Cabanal</p>
                    </animated.div>
                    
                </div>
            </Parallax>
        </ParallaxProvider>
    )
}