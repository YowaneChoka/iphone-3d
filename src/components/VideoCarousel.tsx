import { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants"
import { pauseImg, playImg, replayImg } from "../utils";

const VideoCarousel = () => {

    // Video Refs
    const videoRef = useRef<HTMLVideoElement[]>([]);
    const videoSpanRef = useRef<HTMLSpanElement[]>([]);
    const videoDivRef = useRef<HTMLDivElement[]>([]);

    // video and indicator
    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false,
    });

    const [loadedData, setLoadedData] = useState([]);
    const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

    // Video Player Management

    // Video Details and Animation
    useEffect(() => {
        let currentProgress = 0;
        let span = videoSpanRef.current;

        if (span[videoId]) {
            // Progres video animation
            let animation = gsap.to(span[videoId], {
                onUpdate: () => {

                }, onComplete: () => {

                },
            })
        }
    }, [videoId, startPlay]);

    useEffect(() => {
        if (loadedData.length > 3) {
            if (!isPlaying) {
                videoRef.current[videoId].pause();
            } else if (startPlay) {
                videoRef.current[videoId].play();
            }
        }
    }, [startPlay, videoId, isPlaying, loadedData]);

    const handleProcess = (type: string, i: number) => {
        switch (type) {
            case "video-end":
                setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
                break;

            // case "video-last":
            //     setVideo((pre) => ({ ...pre, isLastVideo: true }));
            //     break;

            // case "video-reset":
            //     setVideo((pre) => ({ ...pre, videoId: 0, isLastVideo: false }));
            //     break;

            // case "pause":
            //     setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
            //     break;

            // case "play":
            //     setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
            //     break;

            default:
                return video;
        }
    };

    const handleLoadedMetaData = (i, e) => setLoadedData((pre) => [...pre, e]);

    return (
        <>
            <div className="flex items-center">
                {hightlightsSlides.map((list, i) => (
                    <div key={list.id} id="slider" className="sm:pr-20 pr-10">
                        <div className="video-carousel_container">
                            <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                                <video
                                    id="video"
                                    playsInline={true}
                                    preload="auto"
                                    muted
                                    ref={(el) => (videoRef.current[i] = (el as HTMLVideoElement))}
                                    onPlay={() => {
                                        setVideo((prevVideo) => (
                                            // Returns Previous video object and Change Playing Status
                                            {
                                                ...prevVideo, isPlaying: true
                                            }))
                                    }}
                                    onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                                >
                                    <source src={list.video} type="video/mp4" />
                                </video>
                            </div>

                            <div className="absolute top-12 left-[5%] z-10">
                                {list.textLists.map((text, i) => (
                                    <p key={i} className="md:text-2xl text-xl font-medium">
                                        {text}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="relative flex-center mt-10">
                <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
                    {videoRef.current.map((_, i) => (
                        <div
                            key={i}
                            className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
                            ref={(el) => (videoDivRef.current[i] = (el as HTMLDivElement))}
                        >
                            <span
                                className="absolute h-full w-full rounded-full"
                                ref={(el) => (videoSpanRef.current[i] = (el as HTMLSpanElement))}
                            />
                        </div>
                    ))}
                </div>

                <button className="control-btn">
                    <img
                        src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
                        alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
                        onClick={
                            isLastVideo
                                ? () => handleProcess("video-reset")
                                : !isPlaying
                                    ? () => handleProcess("play")
                                    : () => handleProcess("pause")
                        }
                    />
                </button>
            </div>
        </>
    );
};

export default VideoCarousel;