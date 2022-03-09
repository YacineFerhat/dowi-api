import { Storage } from '@google-cloud/storage';
import { InternalServerErrorException } from '@nestjs/common';

const saveImage = async (
  image: any,
  id: string,
  name: string,
): Promise<string> => {
  const gcs = new Storage({
    projectId: 'laflore-paris',
    keyFilename:
      process.env.NODE_ENV !== 'production'
        ? 'C:\\Users\\yacin\\Desktop\\work\\dowi\\dowi-api\\src\\utils\\setup.json'
        : '/home/node/src/utils/laflore-paris-key.json',
  });
  const image_name = image.originalname;
  const bucket = gcs.bucket('images-laflore-paris');
  const gcsFileName = id + '-' + name + '-' + Date.now() + '-' + image_name;
  const file = bucket.file(gcsFileName);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  await file.save(image.buffer, {
    gzip: true,
    resumable: false,
    validation: false,
    metadata: {
      cacheControl: 'no-cache',
    },
  });

  const exist = await file.exists();

  if (!exist) {
    throw new InternalServerErrorException("Can't upload file to Storage");
  }

  const fileUrl =
    'https://storage.googleapis.com/images-laflore-paris/' + gcsFileName;
  return fileUrl;
};

export default saveImage;
