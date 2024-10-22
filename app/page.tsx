'use client'

import Image from 'next/image'
import { useCallback, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { translate } from '@/services/translate'
import CopyButton from '@/components/CopyButton'
import { TRANSLATION_EXAMPLES, LANGUAGES } from '@/utils/consts'
import { debounce } from '@/utils/debounce'

export default function Home() {
  const [originLanguage, setOriginLanguage] = useState(LANGUAGES.es)
  const [originText, setOriginText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [loading, setLoading] = useState(false)

  const toggleLanguage = () => {
    setOriginLanguage(originLanguage === LANGUAGES.es ? LANGUAGES.gn : LANGUAGES.es)
    setOriginText(translatedText)
    setTranslatedText(originText)
  }

  const translateText = async (text: string, src: string) => {
    // Debug
    console.log('translateText() Call')
    console.log({ text, src })

    if (!text) {
      setTranslatedText('')
      return
    }

    // API call
    // setLoading(true)
    // try {
    //   const translated = await translate(text, src)
    //   setTranslatedText(translated)
    // } catch (error) {
    //   console.error(error)
    // } finally {
    //   setLoading(false)
    // }

    // Mock API call
    setLoading(true)
    const randomIndex = Math.floor(Math.random() * 5)
    setTranslatedText(TRANSLATION_EXAMPLES[src][randomIndex])
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const debouncedChange = useCallback(
    debounce((text: string) => translateText(text, originLanguage), 750),
    []
  )

  return (
    <main className="flex items-center justify-center min-h-screen">
      {/* Background */}
      <div className="w-screen h-screen absolute -z-50">
        <Image
          src="/bg-image.svg"
          height={1920}
          width={1080}
          alt="World Map"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Copyright */}
      <p className="absolute bottom-4 text-sm font-light text-white/50">© 2024 Facultad de Ingenieria UDELAR</p>

      {/* Translator */}
      <section className="flex flex-col items-center justify-center gap-6 sm:gap-10 w-[90%] max-w-5xl">
        {/* Swap Languages */}
        <div className="w-full flex items-center justify-center gap-6 sm:gap-10">
          {/* Origin language */}
          <div className="flex items-center justify-start gap-4 px-4 py-2 w-40 rounded-full border-[1px] bg-white border-gray-300">
            <Image
              src={originLanguage === LANGUAGES.es ? '/spain-flag.svg' : '/paraguay-flag.svg'}
              height={30}
              width={30}
              alt={originLanguage === LANGUAGES.es ? 'Spain Flag' : 'Paraguay Flag'}
              className="border-[1px] border-gray-300 rounded-full p-[1px]"
            />
            <p className="font-medium">{originLanguage === LANGUAGES.es ? 'Español' : 'Guarani'}</p>
          </div>

          {/* Swap button */}
          <button
            className="bg-black rounded-full p-2 sm:hover:scale-105 transition-all"
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
              src={originLanguage === LANGUAGES.es ? '/paraguay-flag.svg' : '/spain-flag.svg'}
              height={30}
              width={30}
              alt={originLanguage === LANGUAGES.es ? 'Paraguay Flag' : 'Spain Flag'}
              className="border-[1px] border-gray-300 rounded-full p-[1px]"
            />
            <p className="font-medium">{originLanguage === LANGUAGES.es ? 'Guarani' : 'Español'}</p>
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
                originLanguage === LANGUAGES.es
                  ? 'Escribe el texto a traducir...'
                  : 'Ehai pe jehaipyre rembohasa hagua...'
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
                <CopyButton textToCopy={originText} />
              </div>
            </div>
          </div>

          {/* Destination Text */}
          <div className="flex flex-col gap-4 p-6 bg-white border-[1px] border-gray-300 rounded-2xl">
            {loading ? (
              <div className="h-32 sm:h-48">
                <Skeleton count={5} />
              </div>
            ) : (
              <textarea
                className="h-32 sm:h-48 focus:outline-none resize-none"
                name="output-text"
                id="output-text"
                placeholder={originLanguage === LANGUAGES.es ? 'Traducción' : 'Ñembohasaha'}
                readOnly
                value={translatedText}
              ></textarea>
            )}
            <div>
              <hr className="border-gray-200 mb-2" />
              <div className="flex items-center justify-between w-full">
                <p className="text-sm">
                  <strong>{translatedText.length}</strong> / 5.000
                </p>
                <CopyButton textToCopy={translatedText} />
              </div>
            </div>
          </div>
        </div>

        {/* Translation Button (In case debounce doesn't work correctly) */}
        {/* <div>
          <button
            onClick={() => translateText(originText, originLanguage)}
            className="bg-black text-white py-2 px-4 rounded-full flex items-center gap-2 sm:hover:scale-[1.03] transition-all"
          >
            <span>{originLanguage === LANGUAGES.es ? 'Traducir' : "Ñe'ẽmbohasa"}</span>
            <Image
              src="/icons/circle-arrow-right.svg"
              height={30}
              width={30}
              alt="Arrow Right"
            />
          </button>
        </div> */}
      </section>
    </main>
  )
}
