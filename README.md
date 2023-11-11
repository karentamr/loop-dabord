# README for Web-Based Pedal Looper Application
![image](https://github.com/karentamr/loop-dabord/assets/8085687/8312ed76-4776-436b-b452-158b67af253c)

## Welcome Aboard! 🎶
Hello! I'm thrilled to present my first significant project: a web-based pedal looper application. This journey into web development and audio manipulation has been both challenging and rewarding, and I'm eager to share the results of my hard work and learning.

## About the Project
This application is a creative tool for musicians and audio enthusiasts, designed to be intuitive and fun. It allows you to record, manipulate, and play audio loops directly in your browser, perfect for experimenting with melodies, rhythms, or any sound that strikes your fancy.


### Features at a Glance
- **Looping Made Easy**: Record, play, and delete audio loops without a hitch.
- **Tune It Your Way**: Adjustable master loop length and speed for perfect synchronization.
![image](https://github.com/karentamr/loop-dabord/assets/8085687/dd44878d-0058-4314-b3c7-0eb58c84dc2d)
- **Visuals & Timing**: Waveform display and a custom scheduler (using React and Howler.js) for precise audio control.
![image](https://github.com/karentamr/loop-dabord/assets/8085687/a7ff2bad-e532-49ef-a1f7-4238b0207fe6)
- **Crossfade Effects**: Customize your audio transitions for seamless playback.
- **Choose Your Input**: Select from different live audio inputs for recording.
- **Metronome Included**: Keep your rhythms in check with an integrated metronome.
- **Save & Retrieve**: Securely save your loops in MongoDB and access them anytime.
![image](https://github.com/karentamr/loop-dabord/assets/8085687/8b5734bc-bfa7-40b7-9c66-5f816ea70ca8)
- **User-Friendly Authentication**: Easy and secure login using Auth0.
![Loop-Intro](https://github.com/karentamr/loop-dabord/assets/8085687/d6c15b67-6eb4-439c-8b41-311743304628)


### Built With
- **React**: For building a dynamic user interface.
- **Howler.js & Web Audio API**: The core of audio processing.
- **MongoDB**: For storing loop data and user profiles.


### Learning and Challenges
- **Timing Quirks**: I encountered some timing issues along the way and learned that React's `useEffect` isn't ideal for tight timing control. This was a valuable lesson in understanding the limitations and proper use of certain tools and libraries.
- **Web Audio API Limitations**: One of the more challenging aspects was dealing with the Web Audio API's behavior, especially its handling of live audio inputs. I ran into a specific issue where the microphone wouldn't pick up sound properly while playing other tracks, which was a complex problem to diagnose and address.


## Getting Started
Interested in exploring or using the application? Here's how to get it up and running:

1. **Clone the Repository**: `git clone [repository-url]`
2. **Start the Server**:
   - Navigate to the server directory within the project.
   - Run `npm install` to install server dependencies.
   - Execute `npm start` to start the server.
3. **Start the Client**:
   - Open a new terminal and navigate to the client directory.
   - Run `npm install` to install client dependencies.
   - Execute `npm start` to launch the client application.

## How to Use
- **Recording**: Click the record button to start and stop recording loops.
- **Loop Management**: Play, pause, and delete loops easily.
- **Volume Adjustment**: Fine-tune your sound with the volume slider.
- **Persistence**: Save your loops with custom names and load them from your profile whenever you need.

## A Note from the Developer
As my first major foray into web development, this project has been a journey of discovery, challenges, and growth. I've learned a lot about the intricacies of audio processing and the limitations of certain technologies, such as timing issues with React's `useEffect` and challenges with the Web Audio API. It's been a humbling and enriching experience, and I hope this application inspires and brings joy to those who use it.

I'm always open to feedback and suggestions, as they help me grow and improve. Feel free to reach out if you have any thoughts, questions, or just want to chat about the project.

---

Thank you for stopping by, and happy looping! 🚀🎧
