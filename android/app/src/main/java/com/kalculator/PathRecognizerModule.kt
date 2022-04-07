package com.kalculator

import com.facebook.react.bridge.*
import com.google.mlkit.vision.digitalink.*

class PathRecognizerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private var recognizer: DigitalInkRecognizer

    init {
        val modelIdentifier = DigitalInkRecognitionModelIdentifier.fromLanguageTag("Emoji")!!
        val model = DigitalInkRecognitionModel.builder(modelIdentifier).build()
        recognizer = DigitalInkRecognition.getClient(DigitalInkRecognizerOptions.builder(model).build())
    }

    @ReactMethod
    fun recognize(paths: ReadableArray, promise: Promise) {
        val inkBuilder = Ink.builder()
        paths.toArrayList().forEach { path -> inkBuilder.addStroke(createStroke(path as ReadableArray)) }
        recognizer.recognize(inkBuilder.build()).apply {
            addOnCompleteListener { promise.resolve(it) }
        }
    }

    private fun createStroke(paths: ReadableArray): Ink.Stroke {
        val strokeBuilder = Ink.Stroke.builder()
        paths.toArrayList().forEach { point ->
            strokeBuilder.addPoint(createPoint(point as ReadableMap))
        }
        return strokeBuilder.build()
    }

    private fun createPoint(point: ReadableMap): Ink.Point {
        return Ink.Point.create(
            point.getDouble("x").toFloat(),
            point.getDouble("y").toFloat(),
            point.getDouble("timestamp").toLong()
        )
    }

    override fun getName() = "PathRecognizer"
}
