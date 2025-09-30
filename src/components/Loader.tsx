import { Html } from '@react-three/drei'
import { GridLoader } from 'react-spinners'

const Loader = ({color}) => {
  // Must use Html from drei for custom components
  return (
    <Html className="absolute top-[-100px] left-[-100px] w-full h-full justify-center items-center">
      <GridLoader
        size={60}
        color={color}
      />
    </Html>
  )
}

export default Loader