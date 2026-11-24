import AVFoundation
import Foundation

guard CommandLine.arguments.count == 3 else {
  fputs("usage: transcode-github.swift input.mp4 output.m4v\n", stderr)
  exit(64)
}

let input = URL(fileURLWithPath: CommandLine.arguments[1])
let output = URL(fileURLWithPath: CommandLine.arguments[2])
try? FileManager.default.removeItem(at: output)

let asset = AVURLAsset(url: input)
guard let exporter = AVAssetExportSession(asset: asset, presetName: AVAssetExportPreset640x480) else {
  fputs("cannot create export session\n", stderr)
  exit(65)
}

exporter.outputURL = output
exporter.outputFileType = .m4v
exporter.shouldOptimizeForNetworkUse = true
exporter.exportAsynchronously {
  switch exporter.status {
  case .completed:
    print(output.path)
    exit(0)
  default:
    fputs("export failed: \(exporter.error?.localizedDescription ?? "unknown error")\n", stderr)
    exit(66)
  }
}

RunLoop.main.run()
