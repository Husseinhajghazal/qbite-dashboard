import {
  CornerDotType,
  CornerSquareType,
  DotType,
  GradientType,
} from "qr-code-styling";

export type ColorType = "SINGLE_COLOR" | "GRADIENT";

export interface QrForm {
  id?: number;
  size: number;
  hasLogo: boolean;
  dotsStyle: DotType;
  dotsColorType: ColorType;
  dotsGradientType: GradientType;
  dotsColor1: string;
  dotsColor2: string;
  cornersSquaresStyle: CornerSquareType;
  cornersSquaresColorType: ColorType;
  cornersSquaresGradientType: GradientType;
  cornersSquaresColor1: string;
  cornersSquaresColor2: string;
  cornersDotsStyle: CornerDotType;
  cornersDotsColorType: ColorType;
  cornersDotsGradientType: GradientType;
  cornersDotsColor1: string;
  cornersDotsColor2: string;
  backgroundColorType: ColorType;
  backgroundGradientType: GradientType;
  backgroundColor1: string;
  backgroundColor2: string;
}
