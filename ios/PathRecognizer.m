#import "PathRecognizer.h"
#import <React/RCTBridge.h>
#import <MLKitCommon/MLKitCommon.h>
#import <MLKitDigitalInkRecognition/MLKitDigitalInkRecognition.h>

static const double kMillisecondsPerTimeInterval = 1000.0;

@implementation PathRecognizer

RCT_EXPORT_MODULE()
MLKDigitalInkRecognizer *recognizer;

- (instancetype)init
{
  self = [super init];

  NSString *languagetag = @"zxx-Zsye-x-emoji";
  MLKDigitalInkRecognitionModelIdentifier *identifier =
        [MLKDigitalInkRecognitionModelIdentifier modelIdentifierForLanguageTag:languagetag];
  MLKDigitalInkRecognitionModel *model = [[MLKDigitalInkRecognitionModel alloc] initWithModelIdentifier:identifier];
  MLKModelManager *modelManager = [MLKModelManager modelManager];
  [modelManager downloadModel:model conditions:[[MLKModelDownloadConditions alloc]
                                                  initWithAllowsCellularAccess:YES
                                                  allowsBackgroundDownloading:YES]];
  MLKDigitalInkRecognizerOptions *options = [[MLKDigitalInkRecognizerOptions alloc] initWithModel:model];
  recognizer = [MLKDigitalInkRecognizer digitalInkRecognizerWithOptions:options];

  return self;
}

RCT_EXPORT_METHOD(recognize:(NSArray*)paths
                  resolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  NSMutableArray* strokes = [self parseDrawingData:paths];
  MLKInk *ink = [[MLKInk alloc] initWithStrokes:strokes];
  [recognizer recognizeInk:ink completion:^(MLKDigitalInkRecognitionResult * _Nullable result, NSError * _Nullable error) {
    if (result.candidates.count > 0) {
      id ret = [self recognitionResultToDictionary:result];
      resolve(ret);
    } else {
      reject(@"recognizeError", [error localizedDescription], error);
    }
  }];
}

- (NSMutableArray*)parseDrawingData:(NSArray*)strokeData {
  NSMutableArray *strokes = [NSMutableArray array];
  for (id stroke in strokeData)
  {
    NSMutableArray *points = [NSMutableArray array];
    for (NSDictionary *point in stroke)
    {
      NSNumber *x = @([[point valueForKey:@"x"] floatValue]);
      NSNumber *y = @([[point valueForKey:@"y"] floatValue]);
      NSNumber *time = @([[point valueForKey:@"time"] longValue]);

      [points addObject:[[MLKStrokePoint alloc] initWithX:x.floatValue y:y.floatValue t:time.longValue]];
    }
    [strokes addObject:[[MLKStroke alloc] initWithPoints:points]];
  }
  return strokes;
}

-(NSMutableArray*)recognitionResultToDictionary:(MLKDigitalInkRecognitionResult*)result {
  NSMutableArray *converted = [NSMutableArray array];
  for (MLKDigitalInkRecognitionCandidate *candidate in result.candidates) {
    NSMutableDictionary *convertedCandidate = [NSMutableDictionary dictionary];
    [convertedCandidate setValue:candidate.text forKey:@"text"];
    [convertedCandidate setValue:candidate.score forKey:@"score"];
    [converted addObject:convertedCandidate];
  }
  return converted;
}
@end
