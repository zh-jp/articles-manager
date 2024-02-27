export default async function urlToFile(
  url: string,
  filename: string,
  mimeType: string | any = null
): Promise<File> {
  const response = await fetch(url)
  const data = await response.blob()
  return new File([data], filename, { type: mimeType })
}
