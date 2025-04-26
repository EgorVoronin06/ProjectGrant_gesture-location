import type {
  FaceLandmarkerResult,
  HandLandmarkerResult,
  PoseLandmarkerResult,
} from "@mediapipe/tasks-vision";

export interface FrameData {
  timestamp: number;
  pose?: PoseLandmarkerResult;
  hands?: HandLandmarkerResult;
  face?: FaceLandmarkerResult;
}
