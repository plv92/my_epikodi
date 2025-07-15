type Props = {
  url: string
}

export default function AudioPlayer({ url }: Props) {
  return (
    <audio controls className="w-full mt-2">
      <source src={url} type="audio/mpeg" />
      Ton navigateur ne supporte pas l'audio.
    </audio>
  )
}
