export const ReaderType = {
   TEXT: 'readAsText',
   URL: 'readAsDataURL',
   BINARY: 'readAsBinaryString',
   ARRAY_BUFFER: 'readAsArrayBuffer'
};

export function fileReaderPromise(file, readerType = ReaderType.URL) {
   // if reader type sent by the user is not supported
   // then we return null
   if (!readerType) {
      return null;
   }

   const reader = new FileReader();
   if (!reader[readerType]) {
      return null;
   }

   return new Promise((resolve, reject) => {
      reader.onerror = () => {
         reader.abort();
         reject(new DOMException('Error while trying to read input file'));
      };

      reader.onload = () => {
         resolve(reader.result);
      };

      reader[readerType](file);
   });
}
