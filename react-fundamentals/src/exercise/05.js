// Styling
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react'
import '../box-styles.css'

const Box = ({ children, size, style }) => {
  const sizeClassName = (boxSize) => {
    if (boxSize === 'small') {
      return 'box--small'
    }
    if (boxSize === 'medium') {
      return 'box--medium'
    }
    if (boxSize === 'large') {
      return 'box--large'
    }
    return ''
  };

  return (
    <div
      className={`box ${sizeClassName(size)}`}
      style={{ fontStyle: 'italic', ...style }}
    >
      {children}
    </div>
  )
};

function App() {
  return (
    <div>
      <Box size="small" style={{ backgroundColor: 'lightblue' }}>
        small lightblue box
      </Box>
      <Box size="medium" style={{ backgroundColor: 'pink' }}>
        medium pink box
      </Box>
      <Box size="large" style={{ backgroundColor: 'orange' }}>
        large orange box
      </Box>
      <Box>
        sizeless box
      </Box>
    </div>
  )
}

export default App
