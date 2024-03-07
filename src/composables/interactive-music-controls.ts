import type { Ref } from "vue";
import { executeTransition } from "@vueuse/core";
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
  const mainVolume = ref(1);
  const endTime = ref(Number.POSITIVE_INFINITY);

  onMounted(() => {
    audios.value.forEach((audio) => {
      const scene = audio.dataset.scene!;
      const index = info.tracks.findIndex(t => t.scene === scene)!;
      const track = info.tracks.find(t => t.scene === scene)!;

      const {
        duration: trackDuration,
        playing: trackPlaying,
        currentTime: trackCurrentTime,
        volume,
      } = useMediaControls(audio);
      const start = track.start;
      const trackVolume = ref(index === 0 ? 1 : index === 1 ? 0.5 : 0);

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
        (currentTrackName) => {
          if (currentTrackName === track.scene) {
            executeTransition(trackVolume, trackVolume.value, 1, {
              duration: trackPlaying.value ? 1000 * (1 - trackVolume.value) : 0,
            });
          }
          else {
            executeTransition(trackVolume, trackVolume.value, 0, {
              duration: trackPlaying.value ? 1000 * trackVolume.value : 0,
            });
          }
        },
      );
      watch(
        [mainVolume, trackVolume],
        () => {
          volume.value = mainVolume.value * trackVolume.value;
        },
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
    trackControls,
  };
}
