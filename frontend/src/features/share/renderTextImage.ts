import { toPng } from "html-to-image"


export async function renderTextImage(
  element:HTMLElement
){

  const image = await toPng(
    element,
    {
      cacheBust:true,

      pixelRatio:2
    }
  )


  return image

}