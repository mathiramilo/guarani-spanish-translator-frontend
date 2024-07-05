'use client'

import Image from 'next/image'
import { useCallback, useState } from 'react'

import { debounce } from '@/utils/debounce'

const TRANSLATION_EXAMPLES = {
  gn: [
    'Traducción de texto de ejemplo 1',
    'Traducción de texto de ejemplo 2',
    'Traducción de texto de ejemplo 3',
    'Traducción de texto de ejemplo 4',
    'Traducción de texto de ejemplo 5'
  ],
  es: [
    "Ñembohasa ha'e ñe'ẽme 1",
    "Ñembohasa ha'e ñe'ẽme 2",
    "Ñembohasa ha'e ñe'ẽme 3",
    "Ñembohasa ha'e ñe'ẽme 4",
    "Ñembohasa ha'e ñe'ẽme 5"
  ]
}

export default function Home() {
  const [originLanguage, setOriginLanguage] = useState('es')
  const [originText, setOriginText] = useState<string>('')
  const [translatedText, setTranslatedText] = useState<string>('')

  const toggleLanguage = () => {
    setOriginLanguage(originLanguage === 'es' ? 'gn' : 'es')
    setOriginText(translatedText)
    setTranslatedText(originText)
  }

  const translate = (text: string, src: string) => {
    // API call to translate text

    if (!text) {
      setTranslatedText('')
      return
    }

    // Random number between 0 and 4
    const randomIndex = Math.floor(Math.random() * 5)

    // Set translated text
    setTranslatedText(TRANSLATION_EXAMPLES[src][randomIndex])
  }

  const debouncedChange = useCallback(
    debounce((text: string) => translate(text, originLanguage), 500),
    []
  )

  return (
    <main className="flex min-h-screen items-center justify-center">
      {/* Background */}
      <div className="w-screen h-screen absolute -z-50">
        <Image
          src="/bg-image.svg"
          height={1920}
          width={1080}
          alt="World Map"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Copyright */}
      <p className="absolute bottom-4 text-white/50 text-sm font-light">© 2024 Facultad de Ingenieria UDELAR</p>

      {/* Translator */}
      <section className="flex flex-col items-center justify-center gap-6 sm:gap-10 w-[90%] max-w-5xl">
        {/* Swap Languages */}
        <div className="flex items-center justify-center gap-6 sm:gap-10 w-full">
          {/* Origin language */}
          <div className="flex items-center justify-start gap-4 px-4 py-2 w-40 bg-white rounded-full border-[1px] border-gray-300">
            <Image
              src={originLanguage === 'es' ? '/spain-flag.svg' : '/paraguay-flag.svg'}
              height={30}
              width={30}
              alt="Spain Flag"
              className="border-[1px] border-gray-300 rounded-full p-[1px]"
            />
            <p className="font-medium">{originLanguage === 'es' ? 'Español' : 'Guarani'}</p>
          </div>
          {/* Swap button */}
          <button
            className="bg-black rounded-full p-2 hover:scale-105 transition-all"
            onClick={() => toggleLanguage()}
          >
            <Image
              src="/icons/refresh.svg"
              height={32}
              width={32}
              alt="Swap"
            />
          </button>
          {/* Dest. Language */}
          <div className="flex items-center justify-start gap-4 px-4 py-2 w-40 bg-white rounded-full border-[1px] border-gray-300">
            <Image
              src={originLanguage === 'es' ? '/paraguay-flag.svg' : '/spain-flag.svg'}
              height={30}
              width={30}
              alt="Paraguay Flag"
              className="border-[1px] border-gray-300 rounded-full p-[1px]"
            />
            <p className="font-medium">{originLanguage === 'es' ? 'Guarani' : 'Español'}</p>
          </div>
        </div>

        {/* Translation Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-8 w-full">
          {/* Origin Text */}
          <div className="flex flex-col gap-4 p-6 bg-white border-[1px] border-gray-300 rounded-2xl">
            <textarea
              className="h-32 sm:h-48 focus:outline-none resize-none"
              name="input-text"
              id="input-text"
              placeholder={
                originLanguage === 'es' ? 'Escribe el texto a traducir...' : 'Ehai pe jehaipyre rembohasa hagua...'
              }
              value={originText}
              onChange={(e) => {
                setOriginText(e.target.value)
                debouncedChange(e.target.value)
              }}
            ></textarea>
            <div>
              <hr className="border-gray-200 mb-2" />
              <div className="flex items-center justify-between w-full">
                <p className="text-sm">
                  <strong>{originText.length}</strong> / 5.000
                </p>
                <button>
                  <Image
                    src="/icons/copy.svg"
                    height={24}
                    width={24}
                    alt="Copy to Clipboard"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Destination Text */}
          <div className="flex flex-col gap-4 p-6 bg-white border-[1px] border-gray-300 rounded-2xl">
            <textarea
              className="h-32 sm:h-48 focus:outline-none resize-none"
              name="output-text"
              id="output-text"
              placeholder={originLanguage === 'es' ? 'Traducción' : 'Ñembohasaha'}
              readOnly
              value={translatedText}
            ></textarea>
            <div>
              <hr className="border-gray-200 mb-2" />
              <div className="flex items-center justify-between w-full">
                <p className="text-sm">
                  <strong>{translatedText.length}</strong> / 5.000
                </p>
                <button>
                  <Image
                    src="/icons/copy.svg"
                    height={24}
                    width={24}
                    alt="Copy to Clipboard"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Translation Button */}
        {/* <div>
          <button
            onClick={() => translate(originText, originLanguage)}
            className="bg-black text-white py-2 px-4 rounded-full"
          >
            Traducir
          </button>
        </div> */}
      </section>
    </main>
  )
}
