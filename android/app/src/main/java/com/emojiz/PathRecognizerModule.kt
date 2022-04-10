package com.emojiz

import com.facebook.react.bridge.*
import com.google.mlkit.common.model.DownloadConditions
import com.google.mlkit.common.model.RemoteModelManager
import com.google.mlkit.vision.digitalink.*

class PathRecognizerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private val recognizer: DigitalInkRecognizer

    init {
        val modelIdentifier = DigitalInkRecognitionModelIdentifier.fromLanguageTag("zxx-Zsye-x-emoji")!!
        val model = DigitalInkRecognitionModel.builder(modelIdentifier).build()
        recognizer = DigitalInkRecognition.getClient(DigitalInkRecognizerOptions.builder(model).build())
        RemoteModelManager.getInstance().download(model, DownloadConditions.Builder().build())
    }

    @ReactMethod
    fun recognize(strokes: ReadableArray, promise: Promise) {
        val inkBuilder = Ink.builder()
        strokes.toArrayList().forEach { stroke -> inkBuilder.addStroke(createStroke(stroke as ArrayList<Map<String, Any>>)) }
        recognizer.recognize(inkBuilder.build())
            .addOnSuccessListener { result ->
                if (result.candidates.isEmpty()) {
                    promise.reject("recognizeError", "No emojis recognized")
                } else {
                    promise.resolve(recognitionResultToReadableMap(result.candidates))
                }
            }
            .addOnFailureListener {
                promise.reject("", it)
            }
    }

    private fun recognitionResultToReadableMap(candidates: List<RecognitionCandidate>): ReadableArray {
        val result = Arguments.createArray()
        candidates.forEach {
            result.pushMap(Arguments.createMap().apply {
                putString("text", it.text)
                putDouble("score", it.score!!.toDouble())
            })
        }
        return result;
    }

    private fun createStroke(stroke: ArrayList<Map<String, Any>>): Ink.Stroke {
        val strokeBuilder = Ink.Stroke.builder()
        stroke.forEach { point -> strokeBuilder.addPoint(createPoint(point)) }
        return strokeBuilder.build()
    }

    private fun createPoint(point: Map<String, Any>): Ink.Point {
        return Ink.Point.create(
            (point["x"] as Double).toFloat(),
            (point["y"] as Double).toFloat(),
            (point["timestamp"] as Double).toLong()
        )
    }

    override fun getName() = "PathRecognizer"
}
