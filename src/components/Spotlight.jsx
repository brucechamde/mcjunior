// Surface whose soft light follows the cursor. Pair with .spotlight in index.css.
// Pointer position goes straight to CSS variables, so it never triggers a React render.
function Spotlight({ as: Tag = 'div', className = '', children, ...rest }) {
  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <Tag onMouseMove={handleMove} className={`spotlight ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

export default Spotlight
