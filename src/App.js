import { useState, useEffect } from 'react';
import axios from 'axios'

function App() {
  const [languages, setLanguages] = useState([])

  const [sourceLanguage, setSourceLanguage] = useState('')
  const [targetLanguage, setTargetLanguage] = useState('')

  const [textToTranslate, setTextToTranslate] = useState('')
  const [translatedText, setTranslatedText] = useState('')

  useEffect(() =>{
    axios.get('https://libretranslate.de/languages')
    .then((res)=>{
      setLanguages(res.data)
    })
  
  }, [])

  function Translate(){
    const data = {
      q: textToTranslate,
      source: sourceLanguage,
      target: targetLanguage,
    }

    axios.post('https://libretranslate.de/translate', data)
    .then((res) => setTranslatedText(res.data.translatedText))
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-4">
      <span className='font-semibold text-sm'>This translator uses LibreTranslate API, you can check the Github src <a href='https://github.com/dydxo/reactapp-translate/' target='_blank' rel="noopener noreferrer" className='underline'>here.</a></span>
      <div className='flex gap-2'>
        <div className='flex gap-2'>
          <span>Translate from</span>
          <select onChange={(e) => setSourceLanguage(e.target.value)} className='focus:outline-none bg-transparent font-semibold border border-[#81C8CD] rounded-md py'>
            <option value='null' selected>Choose</option>
            {languages.map((language) =>{
              return <option key={language.name} name={language.code} value={language.code}>{language.name}</option>
            })}
          </select>
        </div>
        
        <div className='flex gap-2'>
          <span>To</span>
          <select onChange={(e) => setTargetLanguage(e.target.value)} className='focus:outline-none bg-transparent font-semibold border border-[#81C8CD] rounded-md py'>
          <option value='null' selected>Choose</option>
            {languages.map((language) =>{
              return <option key={language.name} name={language.code} value={language.code}>{language.name}</option>
            })}
          </select>
        </div>
      </div>

      <div className='flex flex-col gap-6 w-[500px]'>
        <textarea className='p-2 resize-none border-2 border-[#81C8CD] rounded-lg focus:outline-none' rows={5} spellCheck='false'
        onChange={(e) => setTextToTranslate(e.target.value)}
        value={textToTranslate}
        placeholder='Type text to Translate...'
        maxLength={500}></textarea>

        <textarea className='p-2 resize-none border-2 border-[#81C8CD] rounded-lg focus:outline-none' rows={5} 
        disabled 
        value={translatedText}
        placeholder='Translated text...'
        maxLength={500}>{translatedText}</textarea>
      </div>
      
      <button className='focus:outline-none bg-transparent font-semibold border-2 border-[#81C8CD] rounded-md p-2'
      onClick={Translate} disabled={(!sourceLanguage || !targetLanguage) || !textToTranslate}>Let's Translate</button>
    </div>
  );
}

export default App;
