<script lang="ts">
	import * as ort from 'onnxruntime-web';
	import { onMount } from 'svelte';

	let videoElement: HTMLVideoElement;
	let prediction = 'Loading...';

	let tensorBuffer: Float32Array[] = [];
	let session: ort.InferenceSession;

	// Параметры конфигурации
	const config = {
		modelPath: '/models/MobileNetV2.onnx',
		frameInterval: 1, // Интервал кадров
		mean: [0.485, 0.456, 0.406], // Средние значения для нормализации
		std: [0.229, 0.224, 0.225], // Стандартные отклонения для нормализации
		inputShape: [1, 8, 3, 224, 224], // Форма входных данных
		// inputShape: [1, 1, 3, 32, 224,224], // Форма входных данных
		labels: [
			'no_event',
			'Ё',
			'А',
			'Б',
			'В',
			'Г',
			'Д',
			'Е',
			'Ж',
			'З',
			'И',
			'Й',
			'К',
			'Л',
			'М',
			'Н',
			'О',
			'П',
			'Р',
			'С',
			'Т',
			'У',
			'Ф',
			'Х',
			'Ц',
			'Ч',
			'Ш',
			'Щ',
			'Ъ',
			'Ы',
			'Ь',
			'Э',
			'Ю',
			'Я'
		],
		wasmPaths: '/ort/' // Путь к файлам WASM
	};

	ort.env.wasm.wasmPaths = config.wasmPaths;

	async function setupCamera() {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: true
			});
			videoElement.srcObject = stream;
			return new Promise((resolve) => {
				videoElement.onloadedmetadata = () => resolve(true);
			});
		} catch (error) {
			console.error('Error setting up camera:', error);
		}
	}

	function preprocessFrame(video: HTMLVideoElement): Float32Array {
		const tempCanvas = document.createElement('canvas');
		const tempCtx = tempCanvas.getContext('2d');
		if (!tempCtx) throw new Error('Could not get canvas context');

		tempCanvas.width = 224;
		tempCanvas.height = 224;
		tempCtx.drawImage(video, 0, 0, 224, 224);

		const imageData = tempCtx.getImageData(0, 0, 224, 224);
		const data = imageData.data;
		const floatData = new Float32Array(3 * 224 * 224);

		for (let i = 0; i < 224 * 224; i++) {
			floatData[i] = (data[4 * i] / 255 - config.mean[0]) / config.std[0];
			floatData[224 * 224 + i] = (data[4 * i + 1] / 255 - config.mean[1]) / config.std[1];
			floatData[2 * 224 * 224 + i] = (data[4 * i + 2] / 255 - config.mean[2]) / config.std[2];
		}

		return floatData;
	}

	async function runInference() {
		const frame = preprocessFrame(videoElement);
		tensorBuffer.push(frame);
		if (tensorBuffer.length < config.inputShape[1]) return;
		if (tensorBuffer.length > config.inputShape[1]) {
			tensorBuffer.shift(); // Удалить старый кадр
		}

		const inputData = new Float32Array(config.inputShape.reduce((a, b) => a * b, 1));
		for (let i = 0; i < config.inputShape[1]; i++) {
			inputData.set(tensorBuffer[i], i * 3 * 224 * 224);
		}

		const inputTensor = new ort.Tensor('float32', inputData, config.inputShape);
		const feeds: Record<string, ort.Tensor> = {};
		feeds[session.inputNames[0]] = inputTensor;

		try {
			const results = await session.run(feeds);
			const output = results[session.outputNames[0]];
			const predictedIndex = output.data.indexOf(Math.max(...output.data));
			prediction = config.labels[predictedIndex];
			console.log('Predicted gesture:', prediction); // Логирование предсказания

			// Визуальная обратная связь
			const predictionElement = document.querySelector('.prediction');
			if (predictionElement) {
				predictionElement.style.backgroundColor = prediction === 'no_event' ? 'red' : 'green';
				predictionElement.textContent = `Prediction: ${prediction}`;
			}
		} catch (error) {
			console.error('Error running inference:', error);
		}
	}

	async function createInferenceSession() {
		// Укажите использование WebGL для вычислений на GPU
		const sessionOptions = { executionProviders: ['webgl', 'wasm'] };
		session = await ort.InferenceSession.create(config.modelPath, sessionOptions);
	}

	onMount(async () => {
		await setupCamera();

		try {
			await createInferenceSession();
			setInterval(runInference, config.frameInterval * 100); // Использование frameInterval из конфигурации
		} catch (error) {
			console.error('Error creating inference session:', error);
		}
	});
</script>

<main class="flex flex-col items-center justify-center p-4 bg-black min-h-screen">
	<video bind:this={videoElement} autoplay playsinline muted></video>
	<div class="prediction">Prediction: {prediction}</div>
</main>

<style>
	video {
		width: 640px;
		height: 480px;
		border: 1px solid #ccc;
		margin-bottom: 1rem;
	}
	.prediction {
		font-size: 1.5rem;
		color: white;
		padding: 1rem;
		border-radius: 0.5rem;
	}
</style>
