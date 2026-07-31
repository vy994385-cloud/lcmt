import {
  useRef,
  useState
} from "react"


export default function useVoiceRecorder(){

  const [recording,setRecording] =
    useState(false)


  const [audioBlob,setAudioBlob] =
    useState<Blob | null>(null)


  const [duration,setDuration] =
    useState(0)


  const recorder =
    useRef<MediaRecorder | null>(null)


  const chunks =
    useRef<Blob[]>([])


  const timer =
    useRef<number | null>(null)



  async function startRecording(){

    const stream =
      await navigator.mediaDevices.getUserMedia({
        audio:true
      })


    recorder.current =
      new MediaRecorder(stream)


    chunks.current=[]


    recorder.current.ondataavailable =
      (event)=>{

        chunks.current.push(
          event.data
        )

      }



    recorder.current.onstop =
      ()=>{

        const blob =
          new Blob(
            chunks.current,
            {
              type:"audio/webm"
            }
          )


        setAudioBlob(blob)


        stream
        .getTracks()
        .forEach(
          track=>track.stop()
        )

      }



    recorder.current.start()


    setRecording(true)

    setDuration(0)


    timer.current =
      window.setInterval(()=>{

        setDuration(
          value=>value+1
        )

      },1000)

  }



  function stopRecording(){

    if(
      recorder.current
    ){

      recorder.current.stop()

    }


    setRecording(false)


    if(timer.current){

      clearInterval(
        timer.current
      )

    }

  }



  function clearRecording(){

    setAudioBlob(null)

    setDuration(0)

  }



  return {

    recording,

    audioBlob,

    duration,

    startRecording,

    stopRecording,

    clearRecording

  }

}