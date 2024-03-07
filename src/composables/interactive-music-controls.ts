import type { Ref } from "vue";
import { TransitionPresets, executeTransition } from "@vueuse/core";
import type { InteractiveMusicInfo } from "@/utils/types";

export function useInteractiveMusicControls(info: InteractiveMusicInfo, audios: Ref<HTMLAudioElement[]>) {
  const trackControls = computed(() => audios.value.map(audio => useMediaControls(audio)));

  const currentScene = ref(info.tracks[0].scene);

  const playing = ref(false);
  const displayCurrentTime = ref(0);
  const controlCurrentTime = ref(0);
  const currentTime = computed({
    get: () => displayCurrentTime.value,
    set: value => controlCurrentTime.value = value,
  });
  const volume = ref(1);
  const endTime = ref(Number.POSITIVE_INFINITY);

  onMounted(() => {
    audios.value.forEach((audio) => {
      const scene = audio.dataset.scene!;
      const track = info.tracks.find(t => t.scene === scene)!;

      const {
        duration: trackDuration,
        playing: trackPlaying,
        currentTime: trackCurrentTime,
        volume: trackVolume,
      } = useMediaControls(ref(audio));
      const start = track.start;
      const trackVolumeWeight = ref(scene === currentScene.value ? 1 : 0);

      whenever(
        () => trackDuration.value > 0,
        () => endTime.value = Math.min(endTime.value, trackDuration.value - start),
        { once: true },
      );

      syncRef(playing, trackPlaying, {
        direction: "ltr",
        immediate: true,
      });
      syncRef(controlCurrentTime, trackCurrentTime, {
        direction: "ltr",
        transform: {
          ltr: l => l + start,
        },
        immediate: true,
      });
      syncRef(displayCurrentTime, trackCurrentTime, {
        direction: "rtl",
        transform: {
          rtl: r => r - start,
        },
        immediate: true,
      });

      watch(
        currentScene,
        (currentScene) => {
          if (currentScene === scene) {
            executeTransition(trackVolumeWeight, trackVolumeWeight.value, 1, {
              duration: trackPlaying.value ? 1000 * (1 - trackVolumeWeight.value) : 0,
              transition: TransitionPresets.linear,
            });
          }
          else {
            executeTransition(trackVolumeWeight, trackVolumeWeight.value, 0, {
              duration: trackPlaying.value ? 1000 * trackVolumeWeight.value : 0,
              transition: TransitionPresets.linear,
            });
          }
        },
      );
      watch(
        [volume, trackVolumeWeight],
        () => trackVolume.value = volume.value * trackVolumeWeight.value,
        { immediate: true },
      );
    });

    currentTime.value = 0;
  });

  whenever(
    () => currentTime.value >= endTime.value,
    () => {
      playing.value = false;
      currentTime.value = 0;
    },
  );

  return {
    currentScene,
    playing,
    currentTime,
    endTime,
    volume,
    trackControls,
  };
}
