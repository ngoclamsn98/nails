export const handleResizeFile = (file: File) => {
  return new Promise((resolve, reject) => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (!file.type.match("image.*") || !canvas) {
      reject();
      return;
    }

    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject();
          return;
        }

        // Resize image
        const maxWidth = 400;
        const maxHeight = 500;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        resolve(canvas.toDataURL("image/jpeg"));
      };
      if (event.target && typeof event.target.result === "string") {
        img.src = event.target.result;
      }
    };
    reader.readAsDataURL(file);
  });
};


export const convertBase64ToFileBinary = (base64String: string): File | null => {

  if (!base64String) return null;

  const arr: string[] = base64String.split(',');
  const mime: string = (arr[0].match(/:(.*?);/) || [])[1] || 'application/octet-stream';
  const bstr: string = atob(arr[arr.length - 1]);
  let n: number = bstr.length;
  let u8arr: Uint8Array = new Uint8Array(n);
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }

  const fileName: string = `${new Date().getTime()}.png`;
  return new File([u8arr], fileName, {type: mime});
}