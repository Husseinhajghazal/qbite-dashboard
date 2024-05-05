import { QrForm } from "@/types/QrForm";
import QRCodeStyling, { Options } from "qr-code-styling";

export const createQr = ({
  values,
  logoLink,
  width,
  height,
  username,
  download,
}: {
  values: QrForm;
  logoLink: string;
  width: number;
  height: number;
  username: string;
  download: boolean;
}) => {
  let options: Partial<Options>;

  options = {
    width: width,
    height: height,
    data: `${process.env.NEXT_PUBLIC_CLIENT_URL}/${username}/`,
    type: "svg",
  };

  if (values.hasLogo) {
    options = {
      ...options,
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 10,
      },
      image: logoLink,
    };
  }

  if (values.dotsColorType == "SINGLE_COLOR") {
    options = {
      ...options,
      dotsOptions: {
        color: values.dotsColor1,
        type: values.dotsStyle,
      },
    };
  } else {
    options = {
      ...options,
      dotsOptions: {
        type: values.dotsStyle,
        gradient: {
          type: values.dotsGradientType,
          rotation: 0,
          colorStops: [
            { offset: 0, color: values.dotsColor1 },
            { offset: 1, color: values.dotsColor2 },
          ],
        },
      },
    };
  }

  if (values.cornersSquaresColorType == "SINGLE_COLOR") {
    options = {
      ...options,
      cornersSquareOptions: {
        color: values.cornersSquaresColor1,
        type: values.cornersSquaresStyle,
      },
    };
  } else {
    options = {
      ...options,
      cornersSquareOptions: {
        type: values.cornersSquaresStyle,
        gradient: {
          type: values.cornersSquaresGradientType,
          rotation: 0,
          colorStops: [
            { offset: 0, color: values.cornersSquaresColor1 },
            { offset: 1, color: values.cornersSquaresColor2 },
          ],
        },
      },
    };
  }

  if (values.cornersDotsColorType == "SINGLE_COLOR") {
    options = {
      ...options,
      cornersDotOptions: {
        color: values.cornersDotsColor1,
        type: values.cornersDotsStyle,
      },
    };
  } else {
    options = {
      ...options,
      cornersDotOptions: {
        type: values.cornersDotsStyle,
        gradient: {
          type: values.cornersDotsGradientType,
          rotation: 0,
          colorStops: [
            { offset: 0, color: values.cornersDotsColor1 },
            { offset: 1, color: values.cornersDotsColor2 },
          ],
        },
      },
    };
  }

  if (values.backgroundColorType == "SINGLE_COLOR") {
    options = {
      ...options,
      backgroundOptions: {
        color: values.backgroundColor1,
      },
    };
  } else {
    options = {
      ...options,
      backgroundOptions: {
        gradient: {
          type: values.backgroundGradientType,
          rotation: 0,
          colorStops: [
            { offset: 0, color: values.backgroundColor1 },
            { offset: 1, color: values.backgroundColor2 },
          ],
        },
      },
    };
  }

  const qrCode = new QRCodeStyling(options);

  if (download) {
    qrCode.download({
      name: username,
      extension: "png",
    });
  } else {
    const canvas = document.getElementById("canvas")!;
    const canvasToRemove = canvas.querySelector(
      `svg[width='${width}'][height='${height}']`
    );

    if (canvasToRemove) {
      canvas.removeChild(canvasToRemove);
    }
    qrCode.append(document.getElementById("canvas")!);
  }
};
