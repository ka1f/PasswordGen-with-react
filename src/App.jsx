/* eslint-disable no-unused-vars */
import { useState, useCallback, useEffect , useRef} from 'react'

function App() {

  const [length, setLength] = useState(8)
  const [number , setNumber] = useState(false)
  const [symbol , setSymbol] = useState(false)
  const [uppercase , setUppercase] = useState(true)
  const [lowercase , setLowercase] = useState(true)
  const [password , setPassword] = useState('')

  const passwordRef = useRef(null)

const genpassword = useCallback(() => {
  let string = ''
  if(number) string += '0123456789'
  if(symbol) string += '!@#$%^&*()_+'
  if(uppercase) string += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if(lowercase) string += 'abcdefghijklmnopqrstuvwxyz'
  

  let pass = ''
  for (let i=0; i <= length; i++) {
    let index =(Math.floor(Math.random() * string.length+1))
    pass += string.charAt(index)
  }
  setPassword(pass)
  
}, [length, number, symbol, uppercase, lowercase, setPassword])


const copyToClipboard = useCallback(() => {
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0, 50);
  window.navigator.clipboard.writeText(password)
}, [password])

useEffect(() => {
  genpassword()
}, [length, number, symbol, uppercase, lowercase, genpassword])

  return (
    <>
    <div className="w-full max-w-xl rounded-lg px-10 py-10 text-orange-500 bg-slate-700 mx-auto mt-60">
      <h1 className="text-xl text-center text-white font-bold ">Password Generator</h1>

      <div className='flex  overflow-hidden mb-4'>
        <input type="text" value={password} className="w-full my-4 py-2 pl-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Generated Password" readOnly ref={passwordRef}/>
      <button className='bg-sky-500 w-20 h-10 text-white p-2 rounded-lg ml-4 my-auto hover:bg-blue-600' onClick={copyToClipboard} >Copy</button>
      </div>

      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-2'>
          <input type="range" min="8" max="30" value={length} onChange={(e) => setLength(e.target.value)} /> <label>{length}</label>
        </div>

        <div className='flex items-center gap-x-2'>
          <input type="checkbox" checked={uppercase} onChange={() => setUppercase((prev) => !prev)}  /> <label>Uppercase</label>
        </div>

        <div className='flex items-center gap-x-2'>
          <input type="checkbox" checked={lowercase} onChange={() => setLowercase((prev) => !prev)} /> <label>Lowercase</label>
        </div>

        <div className='flex items-center gap-x-2' >
          <input type="checkbox" checked={number} onChange={() => setNumber((prev) => !prev)} /> <label>Number</label>
        </div>

        <div className='flex items-center gap-x-2'>
          <input type="checkbox" checked={symbol} onChange={() => setSymbol((prev) => !prev)} /> <label>Symbol</label>
        </div>
        
      </div>

      </div>
    </>
  )
}

export default App
