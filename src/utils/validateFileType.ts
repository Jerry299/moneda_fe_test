export const validateFileType = (acceptedFileTypes: string[], file: any) => {
  return acceptedFileTypes.includes(file.type)
}
