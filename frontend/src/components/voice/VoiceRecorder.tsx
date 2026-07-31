import { useRef, useState } from "react"

type Props = {
  onRecorded: (blob: Blob) => void
}

export default function VoiceRecorder({
  onRecorded,
}: Props) {

  const recorderRef =
    useRef<MediaRecorder | null>(null)

  const streamRef =
    useRef<MediaStream | null>(null)

  const chunksRef =
    useRef<Blob[]>([])

  const [recording, setRecording] =
    useState(false)

  const [seconds, setSeconds] =
    useState(0)

  const timerRef =
    useRef<number | null>(null)

  async function startRecording() {

    try {

      const stream =
        await navigator.mediaDevices.getUserMedia({
          audio: true,
        })

      streamRef.current = stream

      const recorder =
        new MediaRecorder(stream)

      recorderRef.current = recorder

      chunksRef.current = []

      recorder.ondataavailable = (event) => {

        if (event.data.size > 0) {

          chunksRef.current.push(event.data)

        }

      }

      recorder.onstop = () => {

        const blob =
          new Blob(chunksRef.current, {
            type: "audio/webm",
          })

        onRecorded(blob)

        stream.getTracks().forEach(track =>
          track.stop()
        )

      }

      recorder.start()

      setRecording(true)

      setSeconds(0)

      timerRef.current = window.setInterval(() => {

        setSeconds(prev => prev + 1)

      }, 1000)

    } catch (error) {

      console.log(error)

    }

  }

  function stopRecording() {

    recorderRef.current?.stop()

    if (timerRef.current) {

      clearInterval(timerRef.current)

    }

    setRecording(false)

  }

  return (

    <div className="voice-recorder">

      {

        recording

          ?

          <>

            <span>

              🎙 {seconds}s

            </span>

            <button
              onClick={stopRecording}
            >
              Stop
            </button>

          </>

          :

          <button
            onClick={startRecording}
          >
            🎤 Record
          </button>

      }

    </div>

  )

}