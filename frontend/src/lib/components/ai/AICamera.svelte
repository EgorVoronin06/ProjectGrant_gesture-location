<script lang="ts">
    import { type FrameData } from "$lib/interfaces/frame-data.interface";
    import {
        FaceLandmarker,
        FilesetResolver,
        HandLandmarker,
        PoseLandmarker,
        type PoseLandmarkerResult,
        type FaceLandmarkerResult,
        type HandLandmarkerResult,
    } from "@mediapipe/tasks-vision";
    import { onMount } from "svelte";

    interface Props {
        frame: Partial<FrameData>;
        width: number;
        height: number;
    }
    let { frame = $bindable(), width, height }: Props = $props();

    let video: HTMLVideoElement;

    let handLandmarker: HandLandmarker;
    let poseLandmarker: PoseLandmarker;
    let faceLandmarker: FaceLandmarker;

    let handRes: HandLandmarkerResult | undefined = $state(undefined);
    let poseRes: PoseLandmarkerResult | undefined = $state(undefined);
    let faceRes: FaceLandmarkerResult | undefined = $state(undefined);

    let lastVideoTime = -1;

    let recordedFrames: Partial<FrameData>[] = [];
    let isRecording = $state(false);

    function startRecording() {
        recordedFrames = [];
        isRecording = true;
    }

    function stopRecording() {
        isRecording = false;
        // Можно сохранить recordedFrames в файл или отправить на сервер
        downloadAsJSON(recordedFrames);
        recordedFrames = [];
    }

    function downloadAsJSON(data: Partial<FrameData>[]) {
        const blob = new Blob([JSON.stringify(data)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "motion-capture.json";
        a.click();
    }

    onMount(async () => {
        const vision = await FilesetResolver.forVisionTasks("/models");
        handLandmarker = await HandLandmarker.createFromOptions(vision, {
            baseOptions: {
                modelAssetPath: "/models/hand_landmarker.task",
                delegate: "GPU",
            },
            runningMode: "VIDEO",
            numHands: 2,
            minHandDetectionConfidence: 0.5,
            minHandPresenceConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });

        poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
            baseOptions: {
                modelAssetPath: "/models/pose_detection.task",
                delegate: "GPU",
            },
            runningMode: "VIDEO",
            minPoseDetectionConfidence: 0.5,
            minPosePresenceConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });

        faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
            baseOptions: {
                modelAssetPath: "/models/face_model.task",
                delegate: "GPU",
            },
            runningMode: "VIDEO",
            outputFaceBlendshapes: true,
            numFaces: 1,
            minFaceDetectionConfidence: 0.5,
            minFacePresenceConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });

        // Get canvas context

        navigator.mediaDevices
            .getUserMedia({ video: true, audio: false })
            .then(function (stream) {
                video.srcObject = stream;
                video.play();
                requestAnimationFrame(detectFrame);
            })
            .catch(function (err) {
                console.log("An error occurred: " + err);
            });
    });

    async function detectFrame() {
        if (video.readyState < 2) {
            requestAnimationFrame(detectFrame);
            return;
        }
        const timestamp = video.currentTime * 1000;

        if (video.currentTime !== lastVideoTime) {
            lastVideoTime = video.currentTime;
            handRes = handLandmarker.detectForVideo(video, timestamp);
            poseRes = poseLandmarker.detectForVideo(video, timestamp);
            faceRes = faceLandmarker.detectForVideo(video, timestamp);
        }
        frame = {
            timestamp,
            face: faceRes,
            hands: handRes,
            pose: poseRes,
        };
        if (isRecording) {
            recordedFrames.push(frame);
        }
        requestAnimationFrame(detectFrame);
    }
</script>

<div class="video-box">
    <!-- svelte-ignore a11y_media_has_caption -->
    <video bind:this={video} {width} {height}>Video stream not available.</video
    >
    <div>Original video</div>
    <div>
        {#if isRecording}
            <button onclick={stopRecording}>Stop</button>
        {:else}
            <button onclick={startRecording}>Start</button>
        {/if}
    </div>
</div>

<style>
    .video-box {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
