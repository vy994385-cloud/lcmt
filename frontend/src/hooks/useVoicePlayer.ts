import { useRef } from "react"

export default function useVoicePlayer() {

  const audioRef =
    useRef<HTMLAudioElement | null>(null)

  function play(url: string) {

    if (audioRef.current) {

      audioRef.current.pause()

    }

    const audio =
      new Audio(url)

    audioRef.current = audio

    audio.play()

  }

  function stop() {

    audioRef.current?.pause()

  }

  return {

    play,

    stop,

  }

}