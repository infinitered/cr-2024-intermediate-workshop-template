# Intermediate Workshop - Chain React 2024

Template for the Chain React 2024 Intermediate Workshop. This is your starting point for the workshop!

You'll be integrating native code, addig native capabilities, and even writing a small amount of native code, so it's important to make sure your local native builds are working correctly.

The workshop is broken five modules, designed to help us bridge the last mobile mile, making our apps feel like a cohesive part of our users' phone experience:
1. **Blending in with the surroundings**: dynamic text, dark mode, and more
2. **The joy of inputting**: small-screen-optiized complex controls and keyboard interactions
3. **Accessibility Timebox** ('nuff said!)
4. **“I was just resting my thumb!”** - quick homescreen interactivity with Quick Actions
5. **When an icon isn’t enough / Widgets :yellow_heart: apps** - build your own homescreen widgets and interact with them from your React Native app

## How to get ready for the workshop.

1. Fork and clone this repo. You'll start working right on `main`.
2. Run `yarn` to restore your dependencies.
3. Run `npx expo run:ios` to test on an iOS simulator.
4. Run `npx expo run:android` to test on an Android emulator.
5. If both of those work, then you're in great shape for the workshop.

If something doesn't work, check the prerequisites below.

Generally, following the [Expo Local App Development requirements](https://docs.expo.dev/guides/local-app-development/) guide should be sufficient to get your Mac prepped for the workshop.

### Just before the worshop...

Just before the workshop, we recommend syncing your fork to pull the latest upstream and running `yarn` again, just in case we make any changes or fixes later on.

## Prerequisites

- A local development environment ready for native iOS and Android React Native / Expo development, capable of running the `npx expo run:ios` and `npx expo run:android`, including recent versions of:
  - Xcode (version 15+)
  - Watchman
  - Cocoapods
  - JDK 17
  - Android Studio
  - iOS simulator
  - Android emulator
  - If you're not sure if you have all of these or if you have the right versions, check the [Expo Local App Development requirements](https://docs.expo.dev/guides/local-app-development/) for details on how to install these tools in order to enable local native development with the Expo CLI.
- Other general development tools:
  - Node 18.
  - Visual Studio Code
  - Git (Github Desktop works great)
- Hardware:
  - A Mac is highly recommended for the full experience.
    - The afternoon modules will have iOS-specific exercises. If a Mac isn't available to you, at least make sure your Android native setup is good. We may be able to help you make it through parts of the iOS exercises with EAS Build, provided you have an iOS device and paid Apple developer account.
- Yarn

**Want to run on a device?** We will be focusing on emulator/simulator usage during the workshop, as it's especially easier for iOS. If you want to do some or all of the workshop on a device, you can also test with `npx expo run:ios --device` and/or `npx expo run:android --device`. Some later sections of the workshop may not work on an iOS device without additional configuration.

## Doing the workshop exercises

You'll start working on `main` on your fork of the starter template.

The lessons live in a [companion repo](https://github.com/infinitered/cr-2024-intermediate-workshop-lessons).

> This link might not be available yet, but will be accessible just before the workshop.

You'll start on module `01`, then proceed to `02`, etc. Each module file has objectives, helpful resources, steps to follow, code to write. Of course, the teachers will be there to provide background and guide you through it.