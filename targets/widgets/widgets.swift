//
//  HelloWidget.swift
//  HelloWidget
//
//  Created by Keith on 5/2/24.
//

import WidgetKit
import SwiftUI

struct EpisodeFromStore: Codable {
  let guid: String
  let title: String
  let thumbnail: String
}

enum FetcherError: Error {
    case imageDataCorrupted
}

extension UIImage {
  func resized(toWidth width: CGFloat, isOpaque: Bool = true) -> UIImage? {
    let canvas = CGSize(width: width, height: CGFloat(ceil(width/size.width * size.height)))
    let format = imageRendererFormat
    format.opaque = isOpaque
    return UIGraphicsImageRenderer(size: canvas, format: format).image {
      _ in draw(in: CGRect(origin: .zero, size: canvas))
    }
  }
}

struct Provider: TimelineProvider {
  func fetchImage(url: String) async throws -> UIImage {
      // Download image from URL
    let (imageData, _) = try await URLSession.shared.data(from: URL(string: url)!)
      
      guard let image = UIImage(data: imageData) else {
        throw FetcherError.imageDataCorrupted
      }
      
      return image
  }
    func placeholder(in context: Context) -> SimpleEntry {
      SimpleEntry(date: Date(), title: "RNR 1: The First One", imageData: nil, episodeCount: 1)
    }

    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        let entry = SimpleEntry(date: Date(), title: "RNR 1: The First One", imageData: nil, episodeCount: 1)
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
      Task {
        // Notice the App Group is used here
        let userDefaults = UserDefaults(suiteName: "group.cr2024im.data")
        // And the key for the data that we use in the Zustand store.
        let episodesJsonString = userDefaults?.string(forKey: "episodes") ?? "[]"
        
        let decoded: [EpisodeFromStore] = try! JSONDecoder().decode([EpisodeFromStore].self, from: Data(episodesJsonString.utf8))
        
        let firstEpisode = decoded.first
        
        if (firstEpisode != nil) {
          guard let image = try? await fetchImage(url: firstEpisode?.thumbnail ?? "") else {
            return
          }
          
          // pass the data to the widget
          let entry = SimpleEntry(date: Date(), title: firstEpisode?.title ?? "", imageData: image.resized(toWidth: 100), episodeCount: decoded.count)
          
          // Some other stuff to make the widget update...
          let timeline = Timeline(entries: [entry], policy: .atEnd)
          completion(timeline)
        } else {
          // pass the data to the widget
          let entry = SimpleEntry(date: Date(), title: "", imageData: nil, episodeCount: 0)
          
          // Some other stuff to make the widget update...
          let timeline = Timeline(entries: [entry], policy: .atEnd)
          completion(timeline)
        }
      }
    }
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let title: String
    var imageData: UIImage?
    let episodeCount: Int
}

struct HelloWidgetEntryView : View {
    var entry: Provider.Entry

    var body: some View {
        VStack {
          if (entry.episodeCount == 0) {
            Text("No favorite episodes yet!")
          } else {
            HStack {
              if (entry.imageData !== nil) {
                Image(uiImage: entry.imageData!)
                  .resizable()
                  .scaledToFill()
                  .frame(width: 100, height:100)
                  .cornerRadius(10)
                  .scaledToFill()
                  .frame(width: 100, height:100)
                  .cornerRadius(10)
                
              }
              Text(entry.title)
            }
          }
        }
    }
}

struct HelloWidget: Widget {
    let kind: String = "HelloWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            if #available(iOS 17.0, *) {
                HelloWidgetEntryView(entry: entry)
                    .containerBackground(.fill.tertiary, for: .widget)
            } else {
                HelloWidgetEntryView(entry: entry)
                    .padding()
                    .background()
            }
        }
        .configurationDisplayName("My Widget")
        .description("This is an example widget.")
    }
}

#Preview(as: .systemSmall) {
    HelloWidget()
} timeline: {
  SimpleEntry(date: Date(), title: "RNR 1: The First One", imageData: nil, episodeCount: 1)
}
